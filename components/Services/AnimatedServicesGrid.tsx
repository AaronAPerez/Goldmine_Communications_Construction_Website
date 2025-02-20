'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ServiceIcon } from './ServiceIcon';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Service } from '@/types/service';

interface AnimatedServicesGridProps {
  services: Service[];
}

export default function AnimatedServicesGrid({ services }: AnimatedServicesGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  const trackMouseMovement = (e: React.MouseEvent) => {
    if (!gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update CSS variables for gradient effect
    gridRef.current.style.setProperty('--mouse-x', `${x}px`);
    gridRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gray-50"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[200%] h-full">
          <div 
            className="w-full h-full rotate-12 opacity-20"
            style={{
              background: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  rgba(212,175,55,0.1) 20px,
                  rgba(212,175,55,0.1) 40px
                )
              `
            }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions for communications and construction needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          onMouseMove={trackMouseMovement}
          onMouseLeave={() => setHoveredId(null)}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 20 
              }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(service.id)}
              className="relative group"
            >
              <div className={`
                relative overflow-hidden rounded-2xl bg-white p-8
                transition-all duration-300 ease-out transform-style-3d
                ${hoveredId === service.id ? 'scale-[1.02] shadow-xl' : 'shadow-lg'}
              `}>
                {/* Animated border gradient */}
                <div 
                  className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  `}
                  style={{
                    background: `
                      radial-gradient(
                        600px circle at var(--mouse-x) var(--mouse-y),
                        rgba(212,175,55,0.1),
                        transparent 40%
                      )
                    `
                  }}
                />

                {/* Service Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gold-400/10 flex items-center justify-center">
                    <ServiceIcon 
                      icon={service.icon} 
                      className="w-8 h-8 text-gold-400"
                    />
                  </div>
                </div>

                {/* Service Content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: hoveredId === service.id ? 1 : 0,
                          x: hoveredId === service.id ? 0 : -20
                        }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center text-gray-600"
                      >
                        <svg
                          className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}