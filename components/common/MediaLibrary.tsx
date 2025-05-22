// import OptimizedVideo from './OptimizedVideo';

// interface MediaProps {
//   src: string;
//   alt: string;
//   type?: 'image' | 'video' | 'auto';
//   className?: string;
//   width?: number;
//   height?: number;
//   priority?: boolean;
//   [key: string]: any | null; // For additional props
// }

// /**
//  * Unified media component that automatically selects image or video
//  * and applies the best format and loading strategy
//  */
// const MediaLibrary: React.FC<MediaProps> = ({
//   src,
//   alt,
//   type = 'auto',
//   className,
//   width,
//   height,
//   priority = false,
//   ...props
// }) => {
//   // Determine if this is a video based on extension or explicitly provided type
//   const isVideo = type === 'video' || 
//     (type === 'auto' && /\.(mp4|webm|ogg|mov)$/i.test(src));
  
//   // Handle video media
//   if (isVideo) {
//     return (
//       <OptimizedVideo
//         src={src}
//         poster={props.poster}
//         className={className}
//         width={width}
//         height={height}
//         autoPlay={props.autoPlay}
//         muted={props.muted !== undefined ? props.muted : true}
//         loop={props.loop}
//         controls={props.controls !== undefined ? props.controls : true}
//         loadingStrategy={priority ? 'eager' : 'lazy'}
//         {...props}
//       />
//     );
//   }
  
//   // Handle image media
//   return (
//     <OptimizedImage
//       src={src}
//       alt={alt}
//       className={className}
//       width={width}
//       height={height}
//       priority={priority}
//       loadingStrategy={priority ? 'eager' : 'progressive'}
//       {...props}
//     />
//   );
// };

// export default MediaLibrary;