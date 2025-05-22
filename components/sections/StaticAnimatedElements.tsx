import { motion } from "framer-motion";

// Static animated background elements (no hydration issues)
const StaticAnimatedElements = () => {
  const particles = [
    { id: 1, x: 15, y: 25, color: 'bg-gold-400/30', size: 'w-2 h-2', delay: 0 },
    { id: 2, x: 75, y: 15, color: 'bg-white/20', size: 'w-1 h-1', delay: 1 },
    { id: 3, x: 45, y: 80, color: 'bg-gold-400/20', size: 'w-3 h-3', delay: 2 },
    { id: 4, x: 85, y: 60, color: 'bg-white/15', size: 'w-1 h-1', delay: 0.5 },
    { id: 5, x: 25, y: 45, color: 'bg-gold-400/25', size: 'w-2 h-2', delay: 1.5 },
    { id: 6, x: 90, y: 85, color: 'bg-white/25', size: 'w-1 h-1', delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.color} ${particle.size}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

export default StaticAnimatedElements;