import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  
  // Other important metrics
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  
  // Custom metrics
  navigationStart: number;
  domContentLoaded: number;
  loadComplete: number;
}

interface PerformanceConfig {
  enableReporting?: boolean;
  reportEndpoint?: string;
  sampleRate?: number; // Percentage of users to monitor (0-100)
}

/**
 * Performance monitoring hook
 * Tracks Core Web Vitals and custom performance metrics
 * Provides real-time performance insights for optimization
 */
export function usePerformanceMonitor(config: PerformanceConfig = {}) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    navigationStart: performance.now(),
    domContentLoaded: 0,
    loadComplete: 0,
  });

  const [isSupported, setIsSupported] = useState(false);
  const observerRef = useRef<PerformanceObserver | null>(null);
  const reportedMetrics = useRef(new Set<string>());

  const {
    enableReporting = false,
    reportEndpoint = '/api/analytics/performance',
    sampleRate = 10,
  } = config;

  // Check if user should be included in monitoring sample
  const shouldMonitor = Math.random() * 100 < sampleRate;

  // Report metrics to analytics endpoint
  const reportMetric = async (name: string, value: number, additionalData?: any) => {
    if (!enableReporting || !shouldMonitor || reportedMetrics.current.has(name)) {
      return;
    }

    try {
      const data = {
        metric: name,
        value,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...additionalData,
      };

      // Use sendBeacon for reliability, fallback to fetch
      if ('sendBeacon' in navigator) {
        navigator.sendBeacon(reportEndpoint, JSON.stringify(data));
      } else {
        fetch(reportEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          keepalive: true,
        }).catch(() => {
          // Silently handle reporting errors
        });
      }

      reportedMetrics.current.add(name);
    } catch (error) {
      console.warn('Failed to report performance metric:', error);
    }
  };

  // Initialize performance monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for Performance Observer support
    const supported = 'PerformanceObserver' in window;
    setIsSupported(supported);

    if (!supported || !shouldMonitor) return;

    // Track navigation timing
    const updateNavigationMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.startTime;
        const loadComplete = navigation.loadEventEnd - navigation.startTime;
        
        setMetrics(prev => ({
          ...prev,
          domContentLoaded,
          loadComplete,
          ttfb: navigation.responseStart - navigation.requestStart,
        }));

        reportMetric('dom-content-loaded', domContentLoaded);
        reportMetric('load-complete', loadComplete);
        reportMetric('ttfb', navigation.responseStart - navigation.requestStart);
      }
    };

    // Set up Performance Observer for Web Vitals
    try {
      observerRef.current = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          switch (entry.entryType) {
            case 'largest-contentful-paint':
              const lcpValue = entry.startTime;
              setMetrics(prev => ({ ...prev, lcp: lcpValue }));
              reportMetric('lcp', lcpValue);
              break;

            case 'first-input':
              const fidValue = (entry as PerformanceEventTiming).processingStart - entry.startTime;
              setMetrics(prev => ({ ...prev, fid: fidValue }));
              reportMetric('fid', fidValue);
              break;

            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                const clsValue = (entry as any).value;
                setMetrics(prev => ({ ...prev, cls: (prev.cls || 0) + clsValue }));
                reportMetric('cls', clsValue);
              }
              break;

            case 'paint':
              if (entry.name === 'first-contentful-paint') {
                const fcpValue = entry.startTime;
                setMetrics(prev => ({ ...prev, fcp: fcpValue }));
                reportMetric('fcp', fcpValue);
              }
              break;
          }
        }
      });

      // Observe different performance entry types
      observerRef.current.observe({ type: 'largest-contentful-paint', buffered: true });
      observerRef.current.observe({ type: 'first-input', buffered: true });
      observerRef.current.observe({ type: 'layout-shift', buffered: true });
      observerRef.current.observe({ type: 'paint', buffered: true });

      // Update navigation metrics when DOM is ready
      if (document.readyState === 'complete') {
        updateNavigationMetrics();
      } else {
        window.addEventListener('load', updateNavigationMetrics);
      }
    } catch (error) {
      console.warn('Failed to initialize performance monitoring:', error);
    }

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('load', updateNavigationMetrics);
    };
  }, [enableReporting, reportEndpoint, shouldMonitor]);

  // Get performance score (0-100)
  const getPerformanceScore = (): number => {
    let score = 100;
    
    // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (metrics.lcp !== null) {
      if (metrics.lcp > 4000) score -= 25;
      else if (metrics.lcp > 2500) score -= 15;
    }

    // FID scoring (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
    if (metrics.fid !== null) {
      if (metrics.fid > 300) score -= 25;
      else if (metrics.fid > 100) score -= 15;
    }

    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (metrics.cls !== null) {
      if (metrics.cls > 0.25) score -= 25;
      else if (metrics.cls > 0.1) score -= 15;
    }

    return Math.max(0, score);
  };

  // Check if all Core Web Vitals are good
  const areWebVitalsGood = (): boolean => {
    return (
      (metrics.lcp === null || metrics.lcp <= 2500) &&
      (metrics.fid === null || metrics.fid <= 100) &&
      (metrics.cls === null || metrics.cls <= 0.1)
    );
  };

  return {
    metrics,
    isSupported,
    performanceScore: getPerformanceScore(),
    areWebVitalsGood: areWebVitalsGood(),
    reportMetric,
  };
}