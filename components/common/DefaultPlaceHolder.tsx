
/**
 * Default error placeholder component
 */
const DefaultErrorPlaceholder = () => (
  <div 
    className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
    role="img"
    aria-label="Failed to load image"
  >
    <div className="text-center text-gray-400 dark:text-gray-500">
      <svg
        className="w-12 h-12 mx-auto mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-sm">Image unavailable</span>
    </div>
  </div>
);

export default DefaultErrorPlaceholder;