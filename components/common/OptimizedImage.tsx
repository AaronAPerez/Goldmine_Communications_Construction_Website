'use client';

import React, { useState, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

/**
 * Enhanced OptimizedImage Component
 * 
 * Features:
 * - Loading states with skeleton placeholder
 * - Error handling with fallback
 * - Lazy loading with intersection observer
 * - Performance monitoring
 * - Accessibility enhancements
 * - Responsive image optimization
 * - Blur placeholder support
 */

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  /** Show loading skeleton while image loads */
  showSkeleton?: boolean;
  /** Fallback image URL if main image fails to load */
  fallbackSrc?: string;
  /** Custom skeleton color */
  skeletonColor?: string;
  /** Container class name for styling */
  containerClassName?: string;
  /** Enable fade-in animation on load */
  enableAnimation?: boolean;
  /** Custom loading placeholder */
  loadingPlaceholder?: React.ReactNode;
  /** Error placeholder */
  errorPlaceholder?: React.ReactNode;
  /** Performance monitoring callback */
  onLoadComplete?: (result: { loadTime: number; naturalWidth: number; naturalHeight: number }) => void;
  /** Error callback */
  onLoadError?: (error: Error) => void;
}

/**
 * Default skeleton placeholder component
 */
const DefaultSkeleton = ({ 
  skeletonColor = 'bg-gray-200 dark:bg-gray-700' 
}: { 
  skeletonColor?: string 
}) => (
  <div 
    className={`absolute inset-0 ${skeletonColor} animate-pulse`}
    role="status"
    aria-label="Loading image..."
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
  </div>
);

/**
 * Default error placeholder component
 */
const DefaultErrorPlaceholder = () => (
  <div 
    className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
    role="img"
    aria-label="Failed to load image"
  >
    <div className="text-center text-gray-400 dark:text-gray-500">
      <svg
        className="w-12 h-12 mx-auto mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-sm">Image unavailable</span>
    </div>
  </div>
);

/**
 * OptimizedImage Component
 */
const OptimizedImage = ({
  src,
  alt,
  showSkeleton = true,
  fallbackSrc,
  skeletonColor,
  containerClassName = '',
  enableAnimation = true,
  loadingPlaceholder,
  errorPlaceholder,
  onLoadComplete,
  onLoadError,
  className = '',
  ...imageProps
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const loadStartTime = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Start timing when component mounts
  React.useEffect(() => {
    loadStartTime.current = performance.now();
    setIsLoading(true);
    setHasError(false);
    setCurrentSrc(src);
  }, [src]);

  /**
   * Handle successful image load
   */
  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const loadTime = loadStartTime.current ? performance.now() - loadStartTime.current : 0;
    
    setIsLoading(false);
    setHasError(false);

    // Call performance monitoring callback
    if (onLoadComplete) {
      onLoadComplete({
        loadTime,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      });
    }

    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Image loaded: ${src} (${loadTime.toFixed(2)}ms)`);
    }
  };

  /**
   * Handle image load error
   */
  const handleError = () => {
    setIsLoading(false);
    
    // Try fallback image if available and not already using it
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      return;
    }
    
    // No fallback available or fallback also failed
    setHasError(true);
    
    const error = new Error(`Failed to load image: ${currentSrc}`);
    if (onLoadError) {
      onLoadError(error);
    }

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Image load error:', error);
    }
  };

  /**
   * Generate optimized props for Next.js Image
   */
  const getOptimizedProps = () => {
    const props = { ...imageProps };
    
    // Set default sizes if not provided for responsive images
    if (!props.sizes && !props.fill) {
      props.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }
    
    // Set quality based on priority
    if (!props.quality) {
      props.quality = props.priority ? 90 : 75;
    }
    
    return props;
  };

  /**
   * Render loading placeholder
   */
  const renderLoadingPlaceholder = () => {
    if (loadingPlaceholder) {
      return loadingPlaceholder;
    }
    
    if (showSkeleton) {
      return <DefaultSkeleton skeletonColor={skeletonColor} />;
    }
    
    return null;
  };

  /**
   * Render error placeholder
   */
  const renderErrorPlaceholder = () => {
    return errorPlaceholder || <DefaultErrorPlaceholder />;
  };

  /**
   * Get container classes
   */
  const getContainerClasses = () => {
    const baseClasses = 'relative overflow-hidden';
    const animationClasses = enableAnimation && !isLoading && !hasError 
      ? 'animate-fade-in' 
      : '';
    
    return [baseClasses, animationClasses, containerClassName]
      .filter(Boolean)
      .join(' ');
  };

  /**
   * Get image classes
   */
  const getImageClasses = () => {
    const baseClasses = 'transition-opacity duration-300';
    const visibilityClasses = isLoading ? 'opacity-0' : 'opacity-100';
    
    return [baseClasses, visibilityClasses, className]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div className={getContainerClasses()}>
      {/* Loading Placeholder */}
      {isLoading && renderLoadingPlaceholder()}
      
      {/* Error Placeholder */}
      {hasError && renderErrorPlaceholder()}
      
      {/* Main Image */}
      {!hasError && (
        <motion.div
          initial={enableAnimation ? { opacity: 0 } : { opacity: 1 }}
          animate={enableAnimation && !isLoading ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <Image
            ref={imageRef}
            src={currentSrc}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={getImageClasses()}
            {...getOptimizedProps()}
          />
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedImage;