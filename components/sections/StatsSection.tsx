'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Stats Section Component
 * 
 * Displays company statistics with animated counters
 * and visual appeal
 */
interface Stat {
  id: string;
  value: string;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    id: 'experience',
    value: '15',
    label: 'Years of Excellence',
    suffix: '+',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'projects',
    value: '500',
    label: 'Projects Completed',
    suffix: '+',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
      </svg>
    )
  },
  {
    id: 'coverage',
    value: '100',
    label: 'Coverage Area (sq mi)',
    suffix: '+',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    id: 'satisfaction',
    value: '99',
    label: 'Client Satisfaction',
    suffix: '%',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
      </svg>
    )
  }
];

/**
 * Animated Counter Component
 */
interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ value, suffix = '', duration = 2 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value);
      let start = 0;
      const end = numericValue;
      const timer = setInterval(() => {
        start += Math.ceil(end / (duration * 30)); // 30fps
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 30);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-gold-400">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Track Record Speaks
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Delivering excellence across every project with proven results
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center group"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 
                          bg-gold-400/10 text-gold-400 rounded-full mb-4 
                          group-hover:bg-gold-400/20 transition-colors">
              {stat.icon}
            </div>
            <div className="space-y-2">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;