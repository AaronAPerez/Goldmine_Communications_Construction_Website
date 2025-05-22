// Declare gtag as a global function with proper types
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: GtagConfigParams | GtagEventParams
    ) => void;
  }
}

// Define proper types for gtag parameters
interface GtagConfigParams {
  page_title?: string;
  page_location?: string;
  custom_map?: Record<string, string>;
  send_page_view?: boolean;
  [key: string]: unknown;
}

interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  non_interaction?: boolean;
  custom_parameter_1?: number;
  custom_parameter_2?: string;
  custom_parameter_3?: string;
  [key: string]: unknown;
}

// Define Web Vitals metric type
interface WebVitalMetric {
  id: string;
  name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';
  value: number;
  delta?: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  entries?: PerformanceEntry[];
}

/**
 * Report Web Vitals to Google Analytics and custom analytics endpoint
 */
export function reportWebVitals(metric: WebVitalMetric): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Google Analytics 4 - only if gtag is available
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
    
    // Custom analytics endpoint
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: metric.id,
        name: metric.name,
        value: metric.value,
        delta: metric.delta,
        rating: metric.rating,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
      keepalive: true, // Ensure request completes even if page unloads
    }).catch((error) => {
      // Silently handle fetch errors to avoid impacting user experience
      console.warn('Failed to send analytics data:', error);
    });
  } catch (error) {
    console.warn('Error in reportWebVitals:', error);
  }
}

/**
 * Track custom events
 */
interface CustomEventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export function trackEvent(params: CustomEventParams): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (window.gtag) {
      window.gtag('event', params.action, {
        event_category: params.category,
        event_label: params.label,
        value: params.value,
      });
    }

    // Send to custom analytics
    fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...params,
        timestamp: Date.now(),
        url: window.location.href,
      }),
      keepalive: true,
    }).catch((error) => {
      console.warn('Failed to track custom event:', error);
    });
  } catch (error) {
    console.warn('Error in trackEvent:', error);
  }
}

/**
 * Track page views
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_title: title,
        page_location: url,
        send_page_view: true,
      });
    }

    // Send to custom analytics
    fetch('/api/analytics/pageviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        title,
        timestamp: Date.now(),
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      }),
      keepalive: true,
    }).catch((error) => {
      console.warn('Failed to track page view:', error);
    });
  } catch (error) {
    console.warn('Error in trackPageView:', error);
  }
}

/**
 * Initialize Google Analytics
 */
export function initializeAnalytics(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  if (!gaId) {
    console.warn('Google Analytics ID not configured');
    return;
  }

  try {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || function(...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer = (window as any).dataLayer || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer.push(args);
    };

    window.gtag('js', new Date().toISOString());
    window.gtag('config', gaId, {
      send_page_view: false, // We'll handle page views manually
    });
  } catch (error) {
    console.warn('Failed to initialize Google Analytics:', error);
  }
}

// Export types for use in other files
export type { WebVitalMetric, CustomEventParams, GtagEventParams, GtagConfigParams };