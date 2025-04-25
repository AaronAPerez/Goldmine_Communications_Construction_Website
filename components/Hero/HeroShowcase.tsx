'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroShowcase = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [, setIsLoaded] = useState(false);

  const images = [
    '/images/communications.jpg',
    '/images/PouringConcrete.jpg',
    '/images/construction-site-2.jpg',
    '/images/construction-site-3.jpg',
    '/images/TractorConcrete.jpg',
    '/products/maintenance.jpg'
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ images.length ]);

  return (
    <div className="relative h-screen w-full overflow-hidden pt-8">
    {/* Background Image Carousel */}
    <div className="absolute inset-0">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000
            ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={src}
            alt="Construction site showcase"
            width={'100'}
            height={'100'}
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />



      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Company Logo */}
          <div className="mb-0 z-20">
            <Image
              src="/images/logo-circular.png"
              alt="Goldmine Communications and Construction Logo"
              width={180}
              height={180}
              className="w-auto h-auto"
              priority
            />
          </div>

          {/* Hero Text */}
          <div className="relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Building Tomorrow&apos;s
              <span className="block text-gold-400 mt-2">Infrastructure Today</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Excellence in Communications and Construction Services
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link 
                href="/services"
                className="bg-gold-400 hover:bg-gold-500 text-black px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105"
              >
                Explore Our Services
              </Link>
              <Link 
                href="/projects"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* Safety Badge */}
          <div className="absolute bottom-2 right-2 bg-black/30 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2 z-20">
            <Image
              src="/icons/OrangeSafetyVest-Icon.png"
              width={50}
              height={50}
              className="safety-logo"
              alt="Safety First Orange Vest Icon"
            />
            <div className="text-left">
              <p className="text-white font-semibold">Safety First</p>
              <p className="text-white/80 text-sm">at Goldmine C&C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default HeroShowcase;

{/* Scroll Indicator */ }
<motion.div 
 initial = {{ opacity: 0 }}
 animate = {{ opacity: 1 }}
 transition = {{ delay: 1.1, duration: 0.5 }}
 className = "absolute bottom-8 left-1/2 transform -translate-x-1/2"
>
<div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center">
  <motion.div
    animate={{
      y: [0, 8, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
    }}
    className="w-2 h-2 bg-white rounded-full mt-2"
  />
</div>
</motion.div>
