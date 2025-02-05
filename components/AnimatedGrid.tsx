import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAceternityAnimation } from '@/hooks/useAceternityAnimation';

interface GridItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface AnimatedGridProps {
  items: GridItem[];
  columns?: number;
  gap?: number;
  className?: string;
}

export default function AnimatedGrid({
  items,
  columns = 3,
  gap = 8,
  className = '',
}: AnimatedGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);
  const { ref: animationRef, style: animationStyle } = useAceternityAnimation('fade-up');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={animationRef}
      style={animationStyle}
      className={`relative ${className}`}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gold-400/20 via-primary-500/20 to-gold-400/20 rounded-xl opacity-0"
        animate={{
          opacity: hoveredId ? 0.1 : 0,
          background: hoveredId ? 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(212,175,55,0.15), transparent 40%)' : '',
        }}
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        } as React.CSSProperties}
      />

      {/* Grid Container */}
      <div
        ref={gridRef}
        className={`grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredId(null)}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => setHoveredId(item.id)}
            className="relative group"
          >
            <div
              className={`
                relative overflow-hidden rounded-xl bg-white shadow-lg
                transition-all duration-300 ease-out
                ${hoveredId === item.id ? 'scale-[1.02] shadow-xl' : ''}
              `}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm text-gold-400 font-medium">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </motion.div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-xl"
                  animate={{
                    borderColor: hoveredId === item.id ? 'rgba(212,175,55,0.5)' : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}