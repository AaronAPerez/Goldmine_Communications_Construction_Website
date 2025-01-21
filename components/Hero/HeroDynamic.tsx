'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const HeroDynamic = () => {
  // Animation states for text fade-in
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      <Image
        src="/images/hero-poster.jpg"
        alt="Hero Poster"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        className="object-cover"
        quality={75}
      />
      {/* Video Background */}
      {/* <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          poster="/images/hero-poster.jpg" // Fallback image while video loads
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay gradient 
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"
          aria-hidden="true"
        />
      </div> */}

      {/* Animated Particles/Lines Background (optional) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4))',
          opacity: 0.8
        }}
      >
        {/* Add animated lines or particles*/}
        <div className="lines">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute h-px bg-gold-400/20
                animate-[lineMove_3s_infinite]
                opacity-0
              `}
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 100}px`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 180}deg)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className={`
          relative z-20 text-center px-4 sm:px-6 lg:px-8
          transform transition-all duration-1000
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Building Tomorrow's
          <span className="text-gold-400 block mt-2">
            Infrastructure Today
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Excellence in Communications and Construction Services
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="
              bg-gold-400 hover:bg-gold-500 text-black
              px-8 py-3 rounded-full font-medium
              transform transition-all duration-200
              hover:scale-105 focus:outline-none focus:ring-2
              focus:ring-gold-400 focus:ring-offset-2
              focus:ring-offset-black
            "
          >
            Get Started
          </button>
          <button
            className="
              border-2 border-white text-white
              hover:bg-white hover:text-black
              px-8 py-3 rounded-full font-medium
              transform transition-all duration-200
              hover:scale-105 focus:outline-none focus:ring-2
              focus:ring-white focus:ring-offset-2
              focus:ring-offset-black
            "
          >
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
}
export default HeroDynamic;