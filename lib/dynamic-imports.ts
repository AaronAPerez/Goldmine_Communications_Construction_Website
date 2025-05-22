import React from 'react';
import dynamic from 'next/dynamic';

/**
 * Dynamic component imports for code splitting
 * Implements lazy loading for heavy components
 * Includes loading states and error boundaries
 */

// Loading component for dynamic imports
export const ComponentLoader = ({ name }: { name: string }) => (`{
  <div className="flex items-center justify-center min-h-[200px]"            role="status" 
  aria-label={Loading ${name} component}
  >
    <LoadingSpinner size="lg" />
    <span className="sr-only">
        Loading {name}...
    </span>
  </div>
}`);

// Error fallback for failed dynamic imports - Removed unused error parameter
export const ErrorFallback = ({ }: { name: string }) => (`{
  <div className="flex items-center justify-center min-h-[200px] bg-red-50 border border-red-200 rounded-lg" role="alert">
    <div className="text-center">
      <p className="text-red-600 font-medium">Failed to load {name}</p>
      <p className="text-red-500 text-sm mt-1">Please try refreshing the page</p>
    </div>
  </div>
}`);

export const ContactForm = dynamic(
  () => import('@/components/Contact/ContactForm'),
  {
    loading: () => {return `<ComponentLoader name="Contact Form" />`},
    ssr: true, // Keep SSR for SEO benefits
  }
);


export const ServicesSection = dynamic(
  () => import('@/components/Services/ServicesSection'),
  {
    loading: () => {return `<ComponentLoader name="Services Section" />`},
    ssr: true,
  }
);

// Advanced dynamic import with retry logic
export const createDynamicComponent = <P = unknown, T extends React.ComponentType<P> = React.ComponentType<P>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    name: string;
    ssr?: boolean;
    retries?: number;
  }
) => {
  let retryCount = 0;
  const maxRetries = options.retries || 3;

  const loadComponent = async (): Promise<{ default: T }> => {
    try {
      return await importFn();
    } catch (error) {
      if (retryCount < maxRetries) {
        retryCount++;
        // Exponential backoff for retries
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        return loadComponent();
      }
      throw error;
    }
  };

  return dynamic(loadComponent, {
    loading: () => {return `<ComponentLoader name={options.name} />`},
    ssr: options.ssr ?? true,
  });
};

// Preload critical components for better performance
export const preloadComponents = () => {
  // Preload components that will likely be needed
  const components = [
    () => import('@/components/Contact/ContactForm'),
    () => import('@/components/Services/ServicesSection'),
  ];

  components.forEach(component => {
    component().catch(() => {
      // Silently handle preload failures
    });
  });
};