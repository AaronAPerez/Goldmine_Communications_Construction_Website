import { useRef, useEffect, useState } from 'react';

interface AnimationOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  amount?: number;
  delay?: number;
}

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'flip';

export function useAceternityAnimation(
  type: AnimationType = 'fade-up',
  options: AnimationOptions = {}
) {
  const {
    threshold = 0.2,
    root = null,
    rootMargin = '0px',
    amount = 50,
    delay = 0
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, root, rootMargin]);

  const getAnimationStyles = () => {
    if (!isVisible) {
      switch (type) {
        case 'fade-up':
          return {
            opacity: 0,
            transform: `translateY(${amount}px)`,
          };
        case 'fade-down':
          return {
            opacity: 0,
            transform: `translateY(-${amount}px)`,
          };
        case 'fade-left':
          return {
            opacity: 0,
            transform: `translateX(${amount}px)`,
          };
        case 'fade-right':
          return {
            opacity: 0,
            transform: `translateX(-${amount}px)`,
          };
        case 'zoom':
          return {
            opacity: 0,
            transform: `scale(${1 - amount / 100})`,
          };
        case 'flip':
          return {
            opacity: 0,
            transform: `perspective(500px) rotateX(${amount}deg)`,
          };
        default:
          return {};
      }
    }

    return {
      opacity: 1,
      transform: 'none',
      transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms`,
    };
  };

  return { ref: elementRef, style: getAnimationStyles() };
}