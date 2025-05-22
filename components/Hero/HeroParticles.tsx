'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroParticles() {
  // State to track if we're on the client
  const [isMounted, setIsMounted] = useState(false);
  
  // Only run once on client after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't render anything during SSR
  if (!isMounted) return null;
  
  // Generate particles only on client
  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      {Array.from({ length: 15 }).map((_, i) => {
        // Generate random positions
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1"
            style={{
              left,
              top,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            <div 
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-gold-400/60' : i % 3 === 1 ? 'bg-red-600/40' : 'bg-white/40'
              }`}
              style={{
                animationDelay: `${delay}s`
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}