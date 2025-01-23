'use client';

interface SafetyIconProps {
    className?: string;
    size?: number;
  }
  
  export const SafetyIcon = ({ className = "", size = 100 }: SafetyIconProps) => {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
      >
        {/* Construction Hard Hat */}
        <path 
          d="M20 60 Q20 40 50 40 Q80 40 80 60 L80 65 Q80 75 50 75 Q20 75 20 65 Z" 
          fill="currentColor"
          className="text-gold-400"
          stroke="#1a1a1a"
          strokeWidth="2"
        />
        <path 
          d="M35 40 Q50 35 65 40 Q65 30 50 30 Q35 30 35 40" 
          fill="#1a1a1a"
        />
        
        {/* Safety Shield */}
        <path 
          d="M50 25 L65 30 Q65 50 50 70 Q35 50 35 30 Z" 
          fill="none"
          stroke="currentColor"
          className="text-gold-400"
          strokeWidth="2"
        />
        
        {/* Exclamation Mark */}
        <circle 
          cx="50" 
          cy="45" 
          r="2" 
          className="text-gold-400"
          fill="currentColor"
        />
        <rect 
          x="48" 
          y="50" 
          width="4" 
          height="12" 
          className="text-gold-400"
          fill="currentColor"
        />
        
        {/* Safety Stars */}
        <g className="text-gold-400" fill="currentColor">
          <circle cx="30" cy="25" r="2" />
          <circle cx="70" cy="25" r="2" />
          <circle cx="25" cy="45" r="2" />
          <circle cx="75" cy="45" r="2" />
        </g>
      </svg>
    );
  };
  
  export default SafetyIcon;