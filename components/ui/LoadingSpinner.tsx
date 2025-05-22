'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

const LoadingSpinner = ({
  size = 24,
  color = 'currentColor',
  className = '',
}: LoadingSpinnerProps) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.25"
        />
        <motion.path
          d="M12 2C6.47715 2 2 6.47715 2 12"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
};

export default LoadingSpinner;