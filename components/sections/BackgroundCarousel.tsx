// import { AnimatePresence, motion } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useEffect } from "react";

// // Background images for carousel
// const heroImages = [
//   {
//     id: 1,
//     url: '/images/communications.jpg',
//     alt: 'Communications infrastructure installation',
//     title: 'Advanced Communications',
//     subtitle: 'Cutting-edge telecommunications solutions'
//   },
//   {
//     id: 2,
//     url: '/images/PouringConcrete.jpg',
//     alt: 'Construction project in progress',
//     title: 'Professional Construction',
//     subtitle: 'Quality construction and development'
//   },
//   // {
//   //   id: 3,
//   //   url: '/images/hero/healthcare-hero.jpg',
//   //   alt: 'Healthcare facility construction',
//   //   title: 'Healthcare Facilities',
//   //   subtitle: 'Specialized healthcare construction experts'
//   // },
//   {
//     id: 4,
//     url: '/images/OregonWorkPics/AvStatations.jpg',
//     alt: 'Technology infrastructure',
//     title: 'Smart Technology',
//     subtitle: 'IoT and intelligent building systems'
//   }
// ];

// // Background carousel component
// const BackgroundCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   // Auto-advance carousel
//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % heroImages.length);
//     }, 6000); // Change every 6 seconds

//     return () => clearInterval(interval);
//   }, [isAutoPlaying]);

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//     setIsAutoPlaying(false);
//     // Resume auto-play after user interaction
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % heroImages.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   return (
//     <div className="absolute inset-0 w-full h-full">
//       {/* Background images */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//           className="absolute inset-0 w-full h-full"
//         >
//           <OptimizedImage
//             src={heroImages[currentIndex].url}
//             alt={heroImages[currentIndex].alt}
//             fill
//             className="object-cover"
//             priority={currentIndex === 0}
//             quality={90}
//             sizes="100vw"
//           />
//           {/* Dark overlay for text readability */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation dots */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="flex space-x-3">
//           {heroImages.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentIndex
//                   ? 'bg-gold-400 scale-125'
//                   : 'bg-white/50 hover:bg-white/75'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Navigation arrows - only visible on hover */}
//       <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={prevSlide}
//           className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white 
//                    hover:bg-white/30 transition-colors border border-white/30"
//           aria-label="Previous image"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={nextSlide}
//           className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white 
//                    hover:bg-white/30 transition-colors border border-white/30"
//           aria-label="Next image"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </motion.button>
//       </div>

//       {/* Slide info - subtle display of current slide info */}
//       <div className="absolute bottom-20 left-6 z-20">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//             transition={{ duration: 0.5 }}
//             // className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
//           >
//             <h3 className="text-white font-semibold text-lg">
//               {heroImages[currentIndex].title}
//             </h3>
//             <p className="text-white/80 text-sm">
//               {heroImages[currentIndex].subtitle}
//             </p>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };




// export default BackgroundCarousel;