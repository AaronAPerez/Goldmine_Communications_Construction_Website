import { useEffect, useState } from 'react';
import OptimizedImage from './OptimizedImage';

interface ResponsiveImageProps {
  mobileImage: string;
  tabletImage: string;
  desktopImage: string;
  alt: string;
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  mobileImage,
  tabletImage,
  desktopImage,
  alt,
  className
}) => {
  const [currentImage, setCurrentImage] = useState(mobileImage);
  
  useEffect(() => {
    const updateImage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCurrentImage(desktopImage);
      } else if (width >= 768) {
        setCurrentImage(tabletImage);
      } else {
        setCurrentImage(mobileImage);
      }
    };
    
    // Initial call
    updateImage();
    
    // Update on resize
    window.addEventListener('resize', updateImage);
    return () => window.removeEventListener('resize', updateImage);
  }, [mobileImage, tabletImage, desktopImage]);
  
  return (
    <OptimizedImage
      src={currentImage}
      alt={alt}
      className={className}
      sizes="100vw" // Since we're handling the responsiveness ourselves
    />
  );
};

export default ResponsiveImage