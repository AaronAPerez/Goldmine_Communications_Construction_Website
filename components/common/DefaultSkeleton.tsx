
/**
 * Default skeleton placeholder component
 */
const DefaultSkeleton = ({ 
  skeletonColor = 'bg-gray-200 dark:bg-gray-700' 
}: { 
  skeletonColor?: string 
}) => (
  <div 
    className={`absolute inset-0 ${skeletonColor} animate-pulse`}
    role="status"
    aria-label="Loading image..."
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
  </div>
);

export default DefaultSkeleton;