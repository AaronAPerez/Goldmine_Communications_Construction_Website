import { useState } from 'react';
import { useAceternityAnimation } from '@/hooks/useAceternityAnimation';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delayMs?: number;
  animationType?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'flip';
}

export default function AnimatedCard({
  children,
  className = '',
  hoverEffect = true,
  delayMs = 0,
  animationType = 'fade-up'
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, style } = useAceternityAnimation(animationType, { delay: delayMs });

  return (
    <div
      ref={ref}
      style={style}
      className={`
        relative overflow-hidden rounded-xl bg-gradient-to-br
        ${hoverEffect ? 'transition-all duration-300 ease-in-out' : ''}
        ${isHovered ? 'scale-[1.02] shadow-xl' : 'shadow-md'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      role="article"
      tabIndex={0}
    >
      {/* Animated border gradient */}
      {hoverEffect && (
        <div
          className={`
            absolute inset-0 bg-gradient-to-r from-gold-400/50 via-primary-500/50 to-gold-400/50
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
          aria-hidden="true"
        />
      )}

      {/* Card content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}