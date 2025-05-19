import { useEffect, useRef, useState } from 'react';

interface ImageMetrics {
  loadTime: number;
  size: {
    width: number;
    height: number;
  };
  isLazy: boolean;
  isOptimized: boolean;
}

interface UseImagePerformanceProps {
  src: string;
  lazy?: boolean;
  onLoad?: (metrics: ImageMetrics) => void;
}

/**
 * Image Performance Monitoring Hook
 * Tracks loading times, lazy loading behavior, and optimization status
 * Helps identify performance bottlenecks in image loading
 */
export function useImagePerformance({ 
  src, 
  lazy = false, 
  onLoad 
}: UseImagePerformanceProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Record start time when image begins loading
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }
  }, [src]);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const endTime = performance.now();
    const startTime = startTimeRef.current || endTime;
    const loadDuration = endTime - startTime;
    
    setLoadTime(loadDuration);
    setIsLoaded(true);
    
    const img = event.currentTarget;
    const metrics: ImageMetrics = {
      loadTime: loadDuration,
      size: {
        width: img.naturalWidth,
        height: img.naturalHeight,
      },
      isLazy: lazy,
      isOptimized: src.includes('/_next/image') || src.includes('.webp') || src.includes('.avif'),
    };
    
    onLoad?.(metrics);
    
    // Report to analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'image_load', {
        custom_parameter_1: loadDuration,
        custom_parameter_2: lazy ? 'lazy' : 'eager',
        custom_parameter_3: metrics.isOptimized ? 'optimized' : 'standard',
      });
    }
  };

  const handleError = () => {
    setHasError(true);
    console.warn(`Failed to load image: ${src}`);
  };

  const imageProps = {
    ref: imageRef,
    onLoad: handleLoad,
    onError: handleError,
  };

  return {
    isLoaded,
    hasError,
    loadTime,
    imageProps,
  };
}