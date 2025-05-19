import { useState, useEffect } from 'react';

interface ResponsiveConfig {
  // Breakpoint definitions (in pixels)
  breakpoints?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
  // Default screen size for SSR
  defaultSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ResponsiveState {
  screenSize: ScreenSize;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  orientation: 'portrait' | 'landscape';
}

/**
 * Responsive design hook
 * Provides screen size detection, breakpoint utilities, and device information
 * Handles SSR hydration gracefully
 */
export function useResponsive(config: ResponsiveConfig = {}) {
  const {
    breakpoints = {
      xs: 480,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    defaultSize = 'lg',
  } = config;

  const [state, setState] = useState<ResponsiveState>({
    screenSize: defaultSize,
    width: typeof window !== 'undefined' ? window.innerWidth : breakpoints[defaultSize],
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    orientation: 'landscape',
  });

  // Get screen size based on width
  const getScreenSize = (width: number): ScreenSize => {
    if (width < breakpoints.sm) return 'xs';
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    if (width < breakpoints.xl) return 'lg';
    if (width < breakpoints['2xl']) return 'xl';
    return '2xl';
  };

  // Get device type based on screen size and touch capability
  const getDeviceInfo = (width: number, isTouch: boolean) => {
    const isMobile = width < breakpoints.md;
    const isTablet = width >= breakpoints.md && width < breakpoints.lg && isTouch;
    const isDesktop = width >= breakpoints.lg || (!isTouch && width >= breakpoints.md);

    return { isMobile, isTablet, isDesktop };
  };

  // Update state based on current window dimensions
  const updateState = () => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenSize = getScreenSize(width);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const deviceInfo = getDeviceInfo(width, isTouch);
    const orientation = height > width ? 'portrait' : 'landscape';

    setState({
      screenSize,
      width,
      height,
      isTouch,
      orientation,
      ...deviceInfo,
    });
  };

  // Setup event listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initial update
    updateState();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateState, 150);
    };

    // Orientation change handler
    const handleOrientationChange = () => {
      // Delay to allow browser to update dimensions
      setTimeout(updateState, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      clearTimeout(timeoutId);
    };
  }, []);

  // Utility functions
  const isSize = (size: ScreenSize) => state.screenSize === size;
  const isAtLeast = (size: ScreenSize) => state.width >= breakpoints[size];
  const isAtMost = (size: ScreenSize) => state.width <= breakpoints[size];
  const isBetween = (minSize: ScreenSize, maxSize: ScreenSize) => 
    state.width >= breakpoints[minSize] && state.width <= breakpoints[maxSize];

  // Responsive values helper
  const getValue = <T>(values: Partial<Record<ScreenSize, T>>, fallback: T): T => {
    const sizes: ScreenSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    
    // Find the largest breakpoint that has a value and is <= current screen size
    for (let i = sizes.indexOf(state.screenSize); i >= 0; i--) {
      if (values[sizes[i]] !== undefined) {
        return values[sizes[i]]!;
      }
    }
    
    return fallback;
  };

  // CSS classes helper
  const getResponsiveClasses = (classes: Partial<Record<ScreenSize, string>>) => {
    return Object.entries(classes)
      .map(([size, className]) => {
        const prefix = size === 'xs' ? '' : `${size}:`;
        return `${prefix}${className}`;
      })
      .join(' ');
  };

  return {
    ...state,
    breakpoints,
    isSize,
    isAtLeast,
    isAtMost,
    isBetween,
    getValue,
    getResponsiveClasses,
  };
}