import { useState } from 'react';

/**
 * Resolves an image path to the best available format
 * Checks if webp/avif versions exist, falls back to original
 */
export function useImagePathResolver() {
  // Cache to avoid repeated checks for the same path
  const [pathCache, setPathCache] = useState<Record<string, string>>({});
  
  const resolveImagePath = async (originalPath: string): Promise<string> => {
    // If we've already resolved this path, return from cache
    if (pathCache[originalPath]) {
      return pathCache[originalPath];
    }
    
    // Extract file info
    const pathParts = originalPath.split('.');
    const basePath = pathParts.join('.');
    
    // Potential optimized paths to check
    const webpPath = `/images/optimized/webp${basePath}.webp`;
    const avifPath = `/images/optimized/avif${basePath}.avif`;
    
    // Check if optimized versions exist (Client-side only)
    if (typeof window !== 'undefined') {
      try {
        // Try AVIF first (best compression)
        const avifResponse = await fetch(avifPath, { method: 'HEAD' });
        if (avifResponse.ok) {
          setPathCache(prev => ({ ...prev, [originalPath]: avifPath }));
          return avifPath;
        }
        
        // Then try WebP
        const webpResponse = await fetch(webpPath, { method: 'HEAD' });
        if (webpResponse.ok) {
          setPathCache(prev => ({ ...prev, [originalPath]: webpPath }));
          return webpPath;
        }
      } catch (error) {
        console.warn('Error checking for optimized images:', error);
      }
    }
    
    // Fall back to original path
    setPathCache(prev => ({ ...prev, [originalPath]: originalPath }));
    return originalPath;
  };
  
  return { resolveImagePath };
}