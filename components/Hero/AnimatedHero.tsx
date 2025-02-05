import React from 'react'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Building2, Shield, PenTool } from 'lucide-react';

const backgroundImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
];

const features = [
  {
    icon: Network,
    title: 'Communications',
    description: 'Advanced network infrastructure solutions',
  },
  {
    icon: Building2,
    title: 'Construction',
    description: 'Professional construction services',
  },
  {
    icon: PenTool,
    title: 'Maintenance',
    description: '24/7 support and maintenance',
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Comprehensive security solutions',
  },
];

const AnimatedHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {backgroundImages.map((src, index) => (
        <div
          key={src}
          className={`
            absolute inset-0 transition-opacity duration-1000
            ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <img
            src={src}
            alt=""
            className="object-cover w-full h-full"
            onLoad={() => setIsLoaded(true)}
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full pt-16">
          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Building Tomorrow's
              <span className="text-gold-400"> Infrastructure</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Leading provider of communications and construction solutions,
              delivering excellence through innovation and expertise.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gold-400 text-white rounded-lg font-medium 
                         hover:bg-gold-500 transition-colors duration-200"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg 
                         font-medium hover:bg-white/10 transition-colors duration-200"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <Icon className="w-10 h-10 text-gold-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              )}
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
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
export default AnimatedHero;