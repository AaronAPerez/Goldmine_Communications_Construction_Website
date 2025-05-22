export default function imageLoader({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) {
  // For images already in Cloudinary
  if (src.startsWith('https://res.cloudinary.com/')) {
    // Use Cloudinary's URL transformation API
    return `${src}/f_auto,q_${quality || 75},w_${width}`;
  }
  
  // For local images, you could use Cloudinary Upload API in a serverless function
  // This is a simplified example
  if (src.startsWith('/')) {
    return `https://res.cloudinary.com/your-account/image/fetch/f_auto,q_${quality || 75},w_${width}/${process.env.NEXT_PUBLIC_SITE_URL}${src}`;
  }
  
  // Default case
  return src;
}