// import { Pool } from 'pg';

// // Connection pooling for better performance
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   max: 20, // Maximum number of clients in the pool
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// // Simple in-memory cache for demonstration purposes
// const cache: Record<string, { data: any; expires: number }> = {};

// async function getCachedResult<T>(key: string): Promise<T[] | null> {
//   const entry = cache[key];
//   if (entry && entry.expires > Date.now()) {
//     return entry.data;
//   }
//   return null;
// }

// async function setCachedResult<T>(key: string, data: T[], ttl: number): Promise<void> {
//   cache[key] = {
//     data,
//     expires: Date.now() + ttl * 1000,
//   };
// }

// // Optimized query function with caching
// export async function queryWithCache<T>(
//   query: string,
//   params: any[] = [],
//   cacheKey?: string,
//   ttl: number = 300 // 5 minutes default TTL
// ): Promise<T[]> {
//   // Check cache first
//   if (cacheKey) {
//     const cached = await getCachedResult<T>(cacheKey);
//     if (cached) return cached;
//   }
  
//   // Execute query
//   const client = await pool.connect();
//   try {
//     const result = await client.query(query, params);
//     const data = result.rows;
    
//     // Cache the result
//     if (cacheKey) {
//       await setCachedResult<T>(cacheKey, data, ttl);
//     }
    
//     return data;
//   } finally {
//     client.release();
//   }
// }