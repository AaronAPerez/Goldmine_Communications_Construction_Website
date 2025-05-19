interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Loading Spinner Component
 * Provides consistent loading indicators across the application
 */
export default function LoadingSpinner({ 
  size = 'md', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]}
          border-4 border-gold-400/30 rounded-full
          animate-spin
        `}
      >
        <div 
          className="
            absolute top-0 left-0 right-0 bottom-0
            border-4 border-gold-400 rounded-full
            border-t-transparent
          "
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}