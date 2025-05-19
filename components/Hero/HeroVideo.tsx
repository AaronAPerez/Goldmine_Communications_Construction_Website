'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '@/components/common/OptimizedImage';

interface VideoClip {
  src: string;
  webmSrc?: string;
  poster: string;
}

const videoClips: VideoClip[] = [
  {
    src: '/videos/Tesla-Tractor.mp4',
    webmSrc: '/videos/TeslaClip.mp4',
    poster: '/images/PouringConcrete.jpg'
  },
  // {
  //   src: '/videos/construction-work.mp4',
  //   webmSrc: '/videos/communicationsWork.mp4',
  //   poster: '/images/construction-site-3.jpg'
  // },
];

export default function HeroVideo() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Handle video transitions
  const transitionToNextVideo = () => {
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '1';
      
      setTimeout(() => {
        setCurrentVideoIndex((prev) => 
          prev === videoClips.length - 1 ? 0 : prev + 1
        );
        
        if (overlayRef.current) {
          overlayRef.current.style.opacity = '0';
        }
      }, 1000);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(transitionToNextVideo, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden" aria-label="Hero section">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          poster={videoClips[currentVideoIndex].poster}
          onCanPlay={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(console.error);
            }
          }}
        >
          <source
            src={videoClips[currentVideoIndex].src}
            type="video/mp4"
          />
          {videoClips[currentVideoIndex].webmSrc && (
            <source
              src={videoClips[currentVideoIndex].webmSrc}
              type="video/webm"
            />
          )}
          Your browser does not support the video tag.
        </video>

        {/* Transition Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-0 transition-opacity duration-1000"
          aria-hidden="true"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative pt-20 px-2 z-10 h-full min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Building Tomorrow&apos;s
                <span className="text-gold-400"> Infrastructure Today.</span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Excellence in construction and communications infrastructure,
                delivering innovative solutions with unmatched expertise.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
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

            {/* Circular Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <OptimizedImage
                  src="/images/logo-circular.png"
                  alt="Goldmine Communications and Construction"
                  fill
                  className="object-contain"
                  priority // Above-the-fold image
                  sizes="(max-width: 768px) 288px, 384px"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}