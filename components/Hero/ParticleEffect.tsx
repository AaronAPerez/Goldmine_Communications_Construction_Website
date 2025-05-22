'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Create a component with client-side only rendering for the particles
const ParticleEffect = () => {
  // Add state to avoid rendering particles on the server
  const [isMounted, setIsMounted] = useState(false);
  
  // Generate consistent initial particle positions
  const particles = [
    { id: 1, left: '26.4%', top: '20.1%', color: 'bg-gold-400/60' },
    { id: 2, left: '58.6%', top: '81.0%', color: 'bg-red-600/40' },
    { id: 3, left: '97.7%', top: '17.0%', color: 'bg-white/40' },
    { id: 4, left: '33.5%', top: '47.6%', color: 'bg-gold-400/60' },
    { id: 5, left: '18.6%', top: '82.3%', color: 'bg-red-600/40' },
  ];

  // Only render particles after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          <div className={`absolute w-1 h-1 rounded-full ${particle.color}`} />
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleEffect;