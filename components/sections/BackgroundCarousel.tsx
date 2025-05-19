'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

/**
 * Background Image Carousel Component
 * Professional background images with smooth transitions
 */
const BackgroundCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Background images for the carousel
  const backgroundImages = [
    {
      src: '/images/WorkOregonPics/AvStations.jpeg',
      alt: 'Healthcare facility construction',
      overlay: 'from-gray-900/80 via-gray-900/70 to-gray-900/80'
    },
    {
      src: '/images/WorkOregonPics/image14.jpeg',
      alt: 'Network infrastructure installation',
      overlay: 'from-gray-900/80 via-gray-900/70 to-gray-900/80'
    },
    {
      src: '/images/WorkOregonPics/image15.jpeg',
      alt: 'AV system installation',
      overlay: 'from-gray-900/80 via-gray-900/70 to-gray-900/80'
    },
    {
      src: '/images/WorkOregonPics/image16.jpeg',
      alt: 'EV charging station installation',
      overlay: 'from-gray-900/80 via-gray-900/70 to-gray-900/80'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length, isPlaying]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
  };

  const prevSlide = () => {
    setCurrentImage((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={backgroundImages[currentImage].src}
              alt={backgroundImages[currentImage].alt}
              fill
              className="object-cover"
              priority={currentImage === 0}
              sizes="100vw"
            />
            {/* Dark overlay with gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${backgroundImages[currentImage].overlay}`} />
            
            {/* Additional overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators */}
        <div className="absolute bottom-8 right-8 flex space-x-2 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage 
                  ? 'bg-gold-400 ring-2 ring-white/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`View background image ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
            key={currentImage} // Reset animation on image change
          />
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 border border-white/20 
                     text-white hover:bg-white/20 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-white/10 border border-white/20 
                     text-white hover:bg-white/20 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/10 border border-white/20 
                     text-white hover:bg-white/20 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BackgroundCarousel;