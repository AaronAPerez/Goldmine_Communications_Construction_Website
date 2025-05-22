'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Users, Calendar, Award } from 'lucide-react';

const stats = [
  {
    id: 'projects',
    label: 'Projects Completed',
    value: 500,
    suffix: '+',
    icon: <Target className="w-8 h-8" />,
    description: 'Successful projects delivered',
    color: 'text-blue-400'
  },
  {
    id: 'clients',
    label: 'Satisfied Clients',
    value: 150,
    suffix: '+',
    icon: <Users className="w-8 h-8" />,
    description: 'Long-term partnerships',
    color: 'text-green-400'
  },
  {
    id: 'experience',
    label: 'Years of Experience',
    value: 15,
    suffix: '+',
    icon: <Calendar className="w-8 h-8" />,
    description: 'Industry expertise',
    color: 'text-gold-400'
  },
  {
    id: 'certifications',
    label: 'Certifications',
    value: 25,
    suffix: '+',
    icon: <Award className="w-8 h-8" />,
    description: 'Professional qualifications',
    color: 'text-purple-400'
  }
];

// Animated counter component
const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  duration = 2000 
}: { 
  value: number; 
  suffix?: string; 
  duration?: number; 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * value);
        
        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, value, duration, isVisible]);

  return (
    <span ref={counterRef} className="font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Stat card component
const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="relative group"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 
                    hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent 
                      rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform" />
        
        <div className="relative">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className={`inline-flex items-center justify-center w-16 h-16 rounded-xl 
                      bg-white/20 mb-6 ${stat.color}`}
          >
            {stat.icon}
          </motion.div>

          {/* Number */}
          <div className="mb-2">
            <div className="text-4xl md:text-5xl font-bold text-white">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
          </div>

          {/* Label and description */}
          <h3 className="text-xl font-semibold text-white mb-2">
            {stat.label}
          </h3>
          <p className="text-gray-300 text-sm">
            {stat.description}
          </p>
        </div>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/10 to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
    </motion.div>
  );
};

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gray-900 overflow-hidden"
      aria-labelledby="stats-heading"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            id="stats-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Proven 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Track Record
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Numbers that speak to our commitment to excellence and client satisfaction
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Add Your Project to Our Success Stories?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have trusted us with their most important projects.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-gold-400 hover:bg-gold-500 
                       text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <a href="/contact" className="flex items-center">
                Start Your Project
                <motion.svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </a>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
