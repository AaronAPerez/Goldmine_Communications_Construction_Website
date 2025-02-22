'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Shield, Construction, PaintBucket } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

// Updated services data based on the provided image
const services: Service[] = [
  {
    id: 'general-construction',
    icon: <Building2 className="w-8 h-8 text-gold-400" />,
    title: 'General Construction',
    description: 'Trust in our quality construction services for peace of mind. With unwavering dedication, we deliver excellence from start to finish.',
    features: [
      'Commercial Construction',
      'Industrial Facilities',
      'Healthcare Facilities',
      'Over 15 years of hospital construction experience',
      'Project Management'
    ]
  },
  {
    id: 'remodeling',
    icon: <PaintBucket className="w-8 h-8 text-gold-400" />,
    title: 'Remodeling & Renovation',
    description: 'Comprehensive remodeling and renovation services with attention to detail and quality craftsmanship.',
    features: [
      'Paint & Carpentry',
      'Drywall Installation',
      'T-Bar Installation',
      'Insulation Services',
      'Flooring Solutions',
      'Electrical Work'
    ]
  },
  {
    id: 'ada-compliance',
    icon: <Shield className="w-8 h-8 text-gold-400" />,
    title: 'ADA Compliance',
    description: 'Expert implementation of ADA compliance solutions and accessibility improvements.',
    features: [
      'ADA Compliance Assessment',
      'Accessibility Modifications',
      'Minor Works & Adjustments',
      'Compliance Documentation',
      'Regular Inspections'
    ]
  },
  {
    id: 'specialty-services',
    icon: <Construction className="w-8 h-8 text-gold-400" />,
    title: 'Specialty Services',
    description: 'Specialized construction and safety services for unique project requirements.',
    features: [
      'Ligature Resistant Installation',
      'Suicide Prevention Material Installation',
      'Safety System Implementation',
      'Custom Solutions'
    ]
  }
];

export default function AnimatedServicesGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gray-50"
      aria-labelledby="services-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[200%] h-full">
          <div 
            className="w-full h-full rotate-12 opacity-20"
            style={{
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 20px,
                rgba(212,175,55,0.1) 20px,
                rgba(212,175,55,0.1) 40px
              )`
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
          <h2 
            id="services-heading"
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive construction and specialty services with over 15 years of experience
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
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
                transition-all duration-300 ease-out
                ${hoveredId === service.id ? 'scale-[1.02] shadow-xl' : 'shadow-lg'}
              `}>
                {/* Service Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gold-400/10 flex items-center justify-center">
                    {service.icon}
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

                {/* Hover Effect Gradient */}
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-r from-gold-400/5 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  `}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 mb-6">
              Lic# 1099543 | Bonded & Insured
            </p>
            <div className="space-y-2 text-gray-600">
              <p>946 Lincoln Ave, San Jose, CA 95125</p>
              <p>
                <a 
                  href="tel:5106953177" 
                  className="text-gold-400 hover:text-gold-500 transition-colors"
                >
                  Call Victor Valles: (510) 695-3177
                </a>
              </p>
              <p className="text-sm">Already have an estimate? Forward it & we&aptos;ll beat it!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}