'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SectionParticles() {
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
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => {
        // Generate random positions
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute w-1"
            style={{ left, top }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div 
              className="absolute w-1 h-1 bg-gold-400 rounded-full hero-particle"
              style={{ animationDelay: `${delay}s` }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}