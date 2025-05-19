import { useEffect, useState, useCallback, useRef } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  screenReaderMode: boolean;
  keyboardNavigation: boolean;
  focusVisible: boolean;
}

interface AccessibilityConfig {
  persistSettings?: boolean;
  storageKey?: string;
  enableAnnouncements?: boolean;
}

/**
 * Comprehensive accessibility hook
 * Manages user preferences, keyboard navigation, and screen reader support
 * Provides tools for creating more inclusive web experiences
 */
export function useAccessibility(config: AccessibilityConfig = {}) {
  const {
    persistSettings = true,
    storageKey = 'goldmine-accessibility',
    enableAnnouncements = true,
  } = config;

  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReaderMode: false,
    keyboardNavigation: false,
    focusVisible: true,
  });

  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const announcementRef = useRef<HTMLDivElement | null>(null);
  const lastAnnouncementRef = useRef<string>('');

  // Load saved settings from localStorage
  useEffect(() => {
    if (!persistSettings || typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const savedSettings = JSON.parse(saved);
        setSettings(prev => ({ ...prev, ...savedSettings }));
      }
    } catch (error) {
      console.warn('Failed to load accessibility settings:', error);
    }

    // Detect system preferences
    const detectSystemPreferences = () => {
      // Detect reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setSettings(prev => ({ ...prev, reducedMotion: true }));
      }

      // Detect high contrast preference
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
      if (prefersHighContrast) {
        setSettings(prev => ({ ...prev, highContrast: true }));
      }
    };

    detectSystemPreferences();
  }, [persistSettings, storageKey]);

  // Save settings to localStorage
  useEffect(() => {
    if (!persistSettings || typeof window === 'undefined') return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save accessibility settings:', error);
    }
  }, [settings, persistSettings, storageKey]);

  // Apply accessibility styles to document
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Large text
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Keyboard navigation mode
    if (settings.keyboardNavigation || isKeyboardUser) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }
  }, [settings, isKeyboardUser]);

  // Keyboard detection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Detect tab navigation
      if (event.key === 'Tab') {
        setIsKeyboardUser(true);
        setSettings(prev => ({ ...prev, keyboardNavigation: true }));
      }
    };

    const handleMouseDown = () => {
      // User switched to mouse navigation
      if (isKeyboardUser) {
        setIsKeyboardUser(false);
        setSettings(prev => ({ ...prev, keyboardNavigation: false }));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isKeyboardUser]);

  // Screen reader announcement function
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!enableAnnouncements || !message || message === lastAnnouncementRef.current) return;

    // Create announcement element if not exists
    if (!announcementRef.current) {
      const element = document.createElement('div');
      element.setAttribute('aria-live', priority);
      element.setAttribute('aria-atomic', 'true');
      element.className = 'sr-only';
      element.style.position = 'absolute';
      element.style.left = '-10000px';
      element.style.width = '1px';
      element.style.height = '1px';
      element.style.overflow = 'hidden';
      document.body.appendChild(element);
      announcementRef.current = element;
    }

    // Update announcement
    announcementRef.current.setAttribute('aria-live', priority);
    announcementRef.current.textContent = message;
    lastAnnouncementRef.current = message;

    // Clear announcement after delay to allow for new announcements
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = '';
      }
    }, 1000);
  }, [enableAnnouncements]);

  // Toggle setting function
  const toggleSetting = useCallback((setting: keyof AccessibilitySettings) => {
    setSettings(prev => {
      const newValue = !prev[setting];
      
      // Announce setting change
      announce(`${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${newValue ? 'enabled' : 'disabled'}`);
      
      return { ...prev, [setting]: newValue };
    });
  }, [announce]);

  // Reset all settings
  const resetSettings = useCallback(() => {
    setSettings({
      highContrast: false,
      reducedMotion: false,
      largeText: false,
      screenReaderMode: false,
      keyboardNavigation: false,
      focusVisible: true,
    });
    announce('Accessibility settings reset to defaults');
  }, [announce]);

  // Skip to main content function
  const skipToMain = useCallback(() => {
    const mainElement = document.querySelector('main') || document.querySelector('#main');
    if (mainElement) {
      (mainElement as HTMLElement).focus();
      announce('Skipped to main content');
    }
  }, [announce]);

  // Focus management utilities
  const focusUtils = {
    // Focus first focusable element in container
    focusFirst: (container: HTMLElement) => {
      const focusable = container.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (focusable) {
        focusable.focus();
        return true;
      }
      return false;
    },

    // Focus last focusable element in container
    focusLast: (container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (lastFocusable) {
        lastFocusable.focus();
        return true;
      }
      return false;
    },

    // Trap focus within container
    trapFocus: (container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      if (focusableElements.length === 0) return () => {};

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      container.addEventListener('keydown', handleKeyDown);

      // Focus first element
      firstElement.focus();

      // Return cleanup function
      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    },
  };

  return {
    settings,
    isKeyboardUser,
    toggleSetting,
    resetSettings,
    announce,
    skipToMain,
    focusUtils,
  };
}