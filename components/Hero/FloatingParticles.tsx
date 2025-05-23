// SSR-Safe Particle Generation Approach
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * SSR-Safe Floating Particles Component
 * Generates consistent particles between server and client
 */
const FloatingParticles = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Only run on client after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!isMounted) return null;

  // Generate particles only on client
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    color: i % 3 === 0 ? 'bg-gold-400/40' : i % 3 === 1 ? 'bg-white/30' : 'bg-gold-600/20'
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full ${particle.color}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;