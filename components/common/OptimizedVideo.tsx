import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  containerClassName?: string;
  preload?: 'auto' | 'metadata' | 'none';
  playbackRate?: number;
  enableAnimation?: boolean;
  onLoadStart?: () => void;
  onLoadComplete?: (result: { loadTime: number }) => void;
  onError?: (error: Error) => void;
  loadingStrategy?: 'eager' | 'lazy';
  loadDistance?: number;
  playsInline?: boolean;
}

/**
 * OptimizedVideo Component
 * 
 * Enhances video playback with:
 * - Progressive loading
 * - Performance monitoring
 * - Lazy loading with IntersectionObserver
 * - Loading indicators
 */
const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  width,
  height,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  className = '',
  containerClassName = '',
  preload = 'metadata',
  playbackRate = 1,
  enableAnimation = true,
  onLoadStart,
  onLoadComplete,
  onError,
  loadingStrategy = 'lazy',
  loadDistance = 200,
  playsInline = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(loadingStrategy === 'eager');
  const loadStartTime = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup intersection observer for progressive loading
  useEffect(() => {
    // Skip if already loading or using eager loading
    if (shouldLoad || loadingStrategy === 'eager') return;
    
    const options = {
      rootMargin: `${loadDistance}px`,
      threshold: 0.01
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, options);
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [shouldLoad, loadingStrategy, loadDistance]);

  // Start timing when component mounts or src changes
  useEffect(() => {
    if (shouldLoad) {
      loadStartTime.current = performance.now();
      setIsLoading(true);
      setHasError(false);
      
      // Call load start callback
      if (onLoadStart) {
        onLoadStart();
      }
    }
  }, [src, shouldLoad, onLoadStart]);

  // Set playback rate when video is loaded
  useEffect(() => {
    if (videoRef.current && !isLoading) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, isLoading]);

  /**
   * Handle video loaded event
   */
  const handleCanPlayThrough = () => {
    const loadTime = loadStartTime.current ? performance.now() - loadStartTime.current : 0;
    
    setIsLoading(false);

    // Call performance monitoring callback
    if (onLoadComplete) {
      onLoadComplete({ loadTime });
    }

    // Auto play if enabled
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn('Auto-play was prevented:', error);
      });
    }

    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Video loaded: ${src} (${loadTime.toFixed(2)}ms)`);
    }
  };

  /**
   * Handle video error
   */
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    
    const error = new Error(`Failed to load video: ${src}`);
    if (onError) {
      onError(error);
    }

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Video load error:', error);
    }
  };

  /**
   * Get container classes
   */
  const getContainerClasses = () => {
    const baseClasses = 'relative overflow-hidden';
    
    return [baseClasses, containerClassName]
      .filter(Boolean)
      .join(' ');
  };

  /**
   * Get video classes
   */
  const getVideoClasses = () => {
    const baseClasses = 'transition-opacity duration-300';
    const visibilityClasses = isLoading ? 'opacity-0' : 'opacity-100';
    
    return [baseClasses, visibilityClasses, className]
      .filter(Boolean)
      .join(' ');
  };

  // Render the video component
  return (
    <div 
      ref={containerRef} 
      className={getContainerClasses()}
      style={{ width, height }}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/20 backdrop-blur-sm">
          <div className="p-2 bg-white/80 rounded-full">
            <svg 
              className="animate-spin w-6 h-6 text-gold-400" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      )}

      {/* Error message */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
          <div className="p-4 bg-white/90 rounded-lg text-red-500 text-center">
            <svg 
              className="w-8 h-8 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Failed to load video</p>
          </div>
        </div>
      )}

      {/* Video element */}
      {shouldLoad && (
        <motion.div
          initial={enableAnimation ? { opacity: 0 } : { opacity: 1 }}
          animate={enableAnimation && !isLoading ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', height: '100%' }}
        >
          <video
            ref={videoRef}
            className={getVideoClasses()}
            poster={poster}
            preload={preload}
            muted={muted}
            loop={loop}
            controls={controls}
            playsInline={playsInline}
            onCanPlayThrough={handleCanPlayThrough}
            onError={handleError}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={src} type={src.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedVideo;