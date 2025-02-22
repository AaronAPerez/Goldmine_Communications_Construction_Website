'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Network, Building2, Wrench, Shield } from 'lucide-react';

const backgroundImages = [
  '/images/communications.jpg',
  '/images/PouringConcrete.jpg',
  '/images/WorkOreganPics/image9.jpeg',
  '/images/construction-site-3.jpg',
  '/images/TractorConcrete.jpg',
  '/products/maintenance.jpg'
];

const features = [
  {
    icon: <Network className="w-8 h-8 text-gold-400" />,
    title: 'Communications',
    description: 'Network infrastructure solutions',
    details: [
      'Fiber optic installations',
      'Network design and planning',
      'Wireless infrastructure',
      'Data center connectivity'
    ]
  },
  {
    icon: <Building2 className="w-8 h-8 text-gold-400" />,
    title: 'Construction',
    description: 'Professional construction services',
    details: [
      'Commercial construction',
      'Infrastructure development',
      'Project management',
      'Site development'
    ]
  },
  {
    icon: <Wrench className="w-8 h-8 text-gold-400" />,
    title: 'Maintenance',
    description: '24/7 support and maintenance',
    details: [
      'Preventive maintenance',
      'Emergency repairs',
      'System upgrades',
      'Regular inspections'
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-gold-400" />,
    title: 'Security',
    description: 'Comprehensive security solutions',
    details: [
      'Access control systems',
      'Surveillance solutions',
      'Network security',
      'Security audits'
    ]
  }
];

export default function AnimatedHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [, setIsLoaded ] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Images Carousel */}
      {backgroundImages.map((src, index) => (
        <div
          key={src}
          className={`
            absolute inset-0 transition-opacity duration-1000
            ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            onLoad={() => setIsLoaded(true)}
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 pt-20 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Circular Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-56 mb-4 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-72 lg:h-72"
            // className="w-40 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 mb-8 md:mb-12"
          >
            <Image
              src="/images/logo-circular.png"
              alt="Goldmine Communications and Construction"
              width={200}
              height={200}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mb-8 md:mb-12"
        >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Building Tomorrow&apos;s
            <span className="text-gold-400"> Infrastructure</span>
          </h1>
            <p className="text-lg sm:text-xl text-gray-300">
            Leading provider of communications and construction solutions,
            delivering excellence through innovation and expertise.
          </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12 md:mb-16"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 bg-gold-400 text-white rounded-lg font-medium 
                       hover:bg-gold-500 transition-colors duration-200"
            >
              Get Started
            </motion.a>
            <motion.a
              href="/services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 border-2 bg-black/40 border-white text-white rounded-lg 
                       font-medium hover:bg-white/10 transition-colors duration-200"
            >
              Our Services
            </motion.a>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                    {feature.icon}
                  <div className="text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
              </motion.div>
                    ))}
            </div> 
        </div>
      </div>

      {/* Image Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${currentImageIndex === index 
                ? 'w-8 bg-gold-400' 
                : 'bg-white/50 hover:bg-white/75'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}