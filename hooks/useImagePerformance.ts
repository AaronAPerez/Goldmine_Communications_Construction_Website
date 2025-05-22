interface ImageMetrics {
  url: string;
  loadTime: number;
  size: {
    width: number;
    height: number;
  };
}

const metrics: ImageMetrics[] = [];

export function useImagePerformance() {
  // Track a new image load
  const trackImageLoad = (data: ImageMetrics) => {
    metrics.push(data);
    
    // Optionally send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to analytics service
      // sendToAnalytics('image_load', data);
    }
  };
  
  // Get performance stats
  const getPerformanceStats = () => {
    if (metrics.length === 0) return null;
    
    const totalLoadTime = metrics.reduce((sum, m) => sum + m.loadTime, 0);
    const averageLoadTime = totalLoadTime / metrics.length;
    const slowestImage = metrics.reduce((prev, curr) => 
      prev.loadTime > curr.loadTime ? prev : curr
    );
    
    return {
      totalImages: metrics.length,
      averageLoadTime,
      slowestImage,
      totalLoadTime
    };
  };
  
  return {
    trackImageLoad,
    getPerformanceStats
  };
}