'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Wrench, Shield, Network } from 'lucide-react';
import Image from 'next/image';

// Define interfaces for type safety
interface HeroImage {
  src: string;
  alt: string;
}

interface HeroFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Hero section images with proper alt text
const heroImages: HeroImage[] = [
  {
    src: '/images/WorkOregonPics/AvStation.jpg',
    alt: 'Construction site with workers and equipment'
  },
  {
    src: '/images/communications.jpg',
    alt: 'Communications infrastructure installation'
  },
  {
    src: '/images/maintenance.jpg',
    alt: 'Maintenance team performing repairs'
  }
];

// Key features with descriptive content
const heroFeatures: HeroFeature[] = [
  {
    icon: <Building2 className="w-8 h-8 text-gold-400" />,
    title: 'Construction Excellence',
    description: 'Professional construction services with quality craftsmanship'
  },
  {
    icon: <Network className="w-8 h-8 text-gold-400" />,
    title: 'Advanced Communications',
    description: 'State-of-the-art communication infrastructure solutions'
  },
  {
    icon: <Shield className="w-8 h-8 text-gold-400" />,
    title: 'Certified Safety',
    description: 'Industry-leading safety standards and protocols'
  },
  {
    icon: <Wrench className="w-8 h-8 text-gold-400" />,
    title: '24/7 Support',
    description: 'Round-the-clock maintenance and emergency services'
  }
];

export default function EnhancedHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Automatic image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden" aria-label="Hero section">
      {/* Background Image Carousel */}
      <AnimatePresence mode="popLayout">
        {heroImages.map((image, index) => (
          index === currentImageIndex && (
            <motion.div
              key={image.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // transition={{ duration: 1 }}
              className="absolute inset-0 transition-opacity duration-1000"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Building Tomorrow&apos;s
              <span className="text-gold-400"> Infrastructure</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Excellence in construction and communications infrastructure, 
              delivering innovative solutions with unmatched expertise.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gold-400 text-white rounded-lg font-medium 
                         hover:bg-gold-500 transition-colors"
              >
                Get Started
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg 
                         font-medium hover:bg-white/10 transition-colors"
              >
                Our Services
              </motion.a>
            </div>
          </motion.div>
          

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {heroFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <div className="flex items-center gap-4 mb-3">
                  {feature.icon}
                  <h2 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-white/80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
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
            aria-current={currentImageIndex === index}
          />
        ))}
      </div>
    </section>
  );
}