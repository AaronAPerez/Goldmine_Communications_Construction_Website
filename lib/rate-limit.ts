// lib/rate-limit.ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate Limiter Implementation
 * 
 * Uses a token bucket algorithm to limit requests:
 * - Each client gets a token bucket with a maximum capacity
 * - Tokens are consumed with each request
 * - Tokens are replenished over time at a configurable rate
 */

// Global store for tracking client request rates
// In production, you would use Redis or another external store
const tokenBuckets = new Map<string, {
  tokens: number;
  lastRefill: number;
}>();

export interface RateLimitConfig {
  /** Maximum requests per window */
  maxRequests: number;
  
  /** Time window in seconds */
  windowSizeInSeconds: number;
  
  /** Cache expiry time in seconds (defaults to 2x window size) */
  cacheExpiryInSeconds?: number;
  
  /** IP header to use (useful behind reverse proxies) */
  ipHeader?: string;
  
  /** Response status for rate limited requests */
  limitExceededStatus?: number;
  
  /** Custom message when rate limit is exceeded */
  limitExceededMessage?: string;
}

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

/**
 * Rate limit middleware for Next.js API routes
 * @param req The incoming request
 * @param config Rate limiting configuration
 * @returns Object containing success status and rate limit info
 */
export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  // Default configuration
  const {
    maxRequests,
    windowSizeInSeconds,
    cacheExpiryInSeconds = windowSizeInSeconds * 2,
    ipHeader
  } = config;

  // Get client identifier (IP address or custom header)
  let clientId: string;

  if (ipHeader && req.headers.get(ipHeader)) {
    clientId = req.headers.get(ipHeader) || 'unknown';
  } else {
    // Get IP from NextRequest
    // Try to get IP from common headers, fallback to 'unknown'
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    clientId = (forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown');
  }

  // Add a unique identifier for the specific route
  const routeId = new URL(req.url).pathname;
  const bucketKey = `${clientId}:${routeId}`;

  // Get the current timestamp
  const now = Date.now();

  // Create or retrieve the token bucket for this client
  let bucket = tokenBuckets.get(bucketKey);
  
  if (!bucket) {
    // New client - create a full bucket
    bucket = {
      tokens: maxRequests,
      lastRefill: now,
    };
    tokenBuckets.set(bucketKey, bucket);
  } else {
    // Calculate token refill based on time elapsed
    const timeSinceLastRefill = now - bucket.lastRefill;
    const refillRate = maxRequests / (windowSizeInSeconds * 1000); // tokens per millisecond
    const tokensToAdd = timeSinceLastRefill * refillRate;
    
    bucket.tokens = Math.min(maxRequests, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  // Calculate reset time
  const tokensNeededForReset = maxRequests - bucket.tokens;
  const msUntilReset = tokensNeededForReset > 0 
    ? Math.ceil(tokensNeededForReset / (maxRequests / (windowSizeInSeconds * 1000)))
    : 0;
  
  const resetTime = now + msUntilReset;

  // Check if request is allowed
  if (bucket.tokens >= 1) {
    // Consume a token
    bucket.tokens -= 1;
    
    // Clean up expired entries periodically to prevent memory leaks
    if (Math.random() < 0.01) { // 1% chance to run cleanup
      cleanupExpiredBuckets(now, cacheExpiryInSeconds * 1000);
    }
    
    return {
      success: true,
      limit: maxRequests,
      remaining: Math.floor(bucket.tokens),
      reset: resetTime,
    };
  } else {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: resetTime,
    };
  }
}

/**
 * Create a rate limit handler for a Next.js API route
 * @param config Rate limiting configuration
 * @returns Handler function for use in API routes
 */
export function createRateLimitHandler(config: RateLimitConfig) {
  return async (req: NextRequest): Promise<NextResponse | null> => {
    const result = await rateLimit(req, config);
    
    if (!result.success) {
      const { 
        limitExceededStatus = 429, 
        limitExceededMessage = 'Too many requests, please try again later.'
      } = config;
      
      return NextResponse.json(
        { success: false, message: limitExceededMessage },
        { 
          status: limitExceededStatus,
          headers: {
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.toString(),
            'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
          }
        }
      );
    }
    
    return null; // No rate limit exceeded, continue to the API handler
  };
}

/**
 * Clean up expired token buckets
 * @param now Current timestamp
 * @param expiryMs Expiry time in milliseconds
 */
function cleanupExpiredBuckets(now: number, expiryMs: number) {
  for (const [key, bucket] of tokenBuckets.entries()) {
    if (now - bucket.lastRefill > expiryMs) {
      tokenBuckets.delete(key);
    }
  }
}

/**
 * Example usage in a Next.js API route:
 * 
 * import { NextRequest, NextResponse } from 'next/server';
 * import { createRateLimitHandler } from '@/lib/rate-limit';
 * 
 * // Create a rate limiter: 5 requests per 10 seconds
 * const rateLimitHandler = createRateLimitHandler({
 *   maxRequests: 5,
 *   windowSizeInSeconds: 10,
 * });
 * 
 * export async function POST(req: NextRequest) {
 *   // Check rate limit
 *   const rateLimitResult = await rateLimitHandler(req);
 *   if (rateLimitResult) return rateLimitResult;
 *   
 *   // Rate limit not exceeded, continue with the API logic
 *   try {
 *     // Process request...
 *     return NextResponse.json({ success: true });
 *   } catch (error) {
 *     return NextResponse.json(
 *       { success: false, message: 'An error occurred' },
 *       { status: 500 }
 *     );
 *   }
 * }
 */