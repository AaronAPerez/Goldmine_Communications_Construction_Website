'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoClip {
  src: string;
  webmSrc?: string; // Optional WebM source for better browser support
  poster: string;
}

const videoClips: VideoClip[] = [
  {
    src: '/videos/communications-work.mp4',
    webmSrc: '/videos/communications-work.webm',
    poster: '/images/video-poster-1.jpg'
  },
  {
    src: '/videos/construction-work.mp4',
    webmSrc: '/videos/construction-work.webm',
    poster: '/images/video-poster-2.jpg'
  },
];

const HeroDynamic = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle video transitions
  const transitionToNextVideo = () => {
    if (overlayRef.current) {
      // Fade out current video
      overlayRef.current.style.opacity = '1';
      
      setTimeout(() => {
        setCurrentVideoIndex((prev) => 
          prev === videoClips.length - 1 ? 0 : prev + 1
        );
        
        // Fade in new video
        if (overlayRef.current) {
          overlayRef.current.style.opacity = '0';
        }
      }, 1000); // Match this with CSS transition duration
    }
  };

  // Auto-advance videos
  useEffect(() => {
    const interval = setInterval(transitionToNextVideo, 8000); // Change video every 8 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
          className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"
          aria-hidden="true"
        />
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
          Building Tomorrow&apos;s
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

        {/* Video Controls (Optional) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {videoClips.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${currentVideoIndex === index ? 'bg-gold-400 w-4' : 'bg-white/50'}
              `}
              aria-label={`Switch to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroDynamic;