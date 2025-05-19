// 'use client';

// import React, { useEffect, useState, useRef } from 'react';
// import { motion, AnimatePresence, useInView } from 'framer-motion';
// import { ArrowRight, Phone, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
// import Image from 'next/image';

// /**
//  * Hero Section with Background Image Carousel
//  * 
//  * Features:
//  * - Automatic slideshow with manual controls
//  * - Smooth transitions with optimized performance
//  * - Proper spacing for top contact bar and navigation
//  * - Accessibility features including play/pause controls
//  * - Responsive design with mobile optimization
//  * - Updated with new color scheme: Primary Gold (#B3995D) and Accent Red (#AA0000)
//  */

// interface HeroSlide {
//   id: string;
//   image: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   priority?: boolean; // For Next.js Image optimization
// }

// // Carousel slides with project showcase images
// const heroSlides: HeroSlide[] = [
//   {
//     id: 'communications',
//     image: '/images/WorkOregonPics/image14.jpeg',
//     title: 'Advanced Communications',
//     subtitle: 'Network Infrastructure Solutions',
//     description: 'Cutting-edge telecommunications and fiber optic systems for the connected world.',
//     priority: true // First image loads with priority
//   },
//   {
//     id: 'construction',
//     image: '/images/WorkOregonPics/image9.jpeg',
//     title: 'Professional Construction',
//     subtitle: 'Healthcare & Commercial Projects',
//     description: 'Expert construction services with 15+ years of specialized healthcare experience.',
//   },
//   {
//     id: 'av-systems',
//     image: '/images/WorkOregonPics/image15.jpeg',
//     title: 'Audio Visual Systems',
//     subtitle: 'Smart Building Integration',
//     description: 'Professional AV solutions for corporate boardrooms and mission-critical environments.',
//   },
//   {
//     id: 'charging-stations',
//     image: '/images/WorkOregonPics/image16.jpeg',
//     title: 'EV Charging Solutions',
//     subtitle: 'Clean Energy Technology',
//     description: 'Future-ready electric vehicle charging infrastructure and IoT solutions.',
//   }
// ];

// /**
//  * Text Animation Component
//  * Implements staggered text animation for enhanced visual appeal
//  */
// interface AnimatedTextProps {
//   text: string;
//   className?: string;
//   delay?: number;
// }

// const AnimatedText = ({ text, className = '', delay = 0 }: AnimatedTextProps) => {
//   const words = text.split(' ');
  
//   return (
//     <div className={className}>
//       {words.map((word, index) => (
//         <motion.span
//           key={index}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.6,
//             delay: delay + (index * 0.1),
//             ease: [0.22, 1, 0.36, 1]
//           }}
//           className="inline-block mr-2"
//         >
//           {word}
//         </motion.span>
//       ))}
//     </div>
//   );
// };

// /**
//  * Carousel Navigation Dots Component
//  */
// interface CarouselDotsProps {
//   slides: HeroSlide[];
//   currentIndex: number;
//   onDotClick: (index: number) => void;
// }

// const CarouselDots = ({ slides, currentIndex, onDotClick }: CarouselDotsProps) => (
//   <div className="flex space-x-3 justify-center">
//     {slides.map((_, index) => (
//       <button
//         key={index}
//         onClick={() => onDotClick(index)}
//         className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black/50 ${
//           index === currentIndex
//             ? 'bg-gold-400 scale-110'
//             : 'bg-white/50 hover:bg-white/70'
//         }`}
//         aria-label={`Go to slide ${index + 1}: ${slides[index].title}`}
//       />
//     ))}
//   </div>
// );

// /**
//  * Main Hero Carousel Component
//  */
// const HeroCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const heroRef = useRef<HTMLElement>(null);
//   const isInView = useInView(heroRef, { once: true });

//   // Auto-advance carousel
//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 6000); // 6 seconds per slide

//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   // Initialize component
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoaded(true), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Navigation functions
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const currentSlideData = heroSlides[currentSlide];

//   return (
//     <section
//       ref={heroRef}
//       className="relative min-h-screen overflow-hidden"
//       style={{
//         // Updated spacing calculation:
//         // Top contact bar: ~32px (h-8)
//         // Top navigation: ~80px (h-20) 
//         // Total: ~112px, but we use pt-28 (112px) to accommodate both
//         paddingTop: '2rem', // 112px - ensures content doesn't hide behind fixed headers
//       }}
//       aria-labelledby="hero-heading"
//     >
//       {/* Background Image Carousel */}
//       <div className="absolute inset-0">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//             className="absolute inset-0"
//           >
//             <Image
//               src={currentSlideData.image}
//               alt={`${currentSlideData.title} - ${currentSlideData.subtitle}`}
//               fill
//               className="object-cover"
//               priority={currentSlideData.priority}
//               quality={90}
//               sizes="100vw"
//             />
//             {/* Enhanced overlay gradient for better text readability */}
//             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
//             {/* Additional pattern overlay for depth */}
//             <div 
//               className="absolute inset-0 opacity-10"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                 backgroundSize: '60px 60px'
//               }}
//             />
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Content Container */}
//       <div className="relative z-10 flex items-center min-h-screen">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//           {/* Mobile Logo - Positioned with proper spacing */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="lg:hidden flex justify-center mb-8 mt-8"
//           >
//             <div className="relative">
//               {/* Mobile decorative rings with updated colors */}
//               <motion.div
//                 className="absolute inset-0 border-2 border-gold-400/30 rounded-full"
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                 style={{ transform: 'scale(1.1)' }}
//               />
//               <motion.div
//                 className="absolute inset-0 border border-gold-400/20 rounded-full"
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//                 style={{ transform: 'scale(1.2)' }}
//               />
              
//               {/* Mobile Logo with backdrop blur for better visibility */}
//               <div className="relative w-40 h-40 sm:w-48 sm:h-48 p-4">
//                 <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-gold-400/50 bg-white/10 backdrop-blur-sm">
//                   <Image
//                     src="/images/logo-circular.png"
//                     alt="Goldmine Communications and Construction"
//                     fill
//                     className="object-contain p-4"
//                     priority
//                   />
//                 </div>
//                 {/* Enhanced glow effect */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-gold-400/30 to-gold-600/30 rounded-full blur-xl -z-10" />
//               </div>
//             </div>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//             {/* Content Column - Full width on mobile, left column on desktop */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="text-white text-center lg:text-left"
//             >
//               {/* Animated Badge with updated colors */}
//               {/* <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//                 className="inline-flex items-center px-4 py-2 mt-4 bg-gold-400/20 backdrop-blur-sm 
//                          rounded-full border border-gold-400/30 mb-6"
//               >
//                 <span className="text-gold-400 text-sm font-medium">
//                   Licensed & Insured #1099543
//                 </span>
//               </motion.div>

//               {/* Company Name - Enhanced with better hierarchy 
//               <div className="mb-8">
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-400 mb-2">
//                   Goldmine Communications
//                 </h1>
//                 <div className="text-xl sm:text-2xl md:text-3xl text-gray-100">
//                   & Construction
//                 </div>
//               </div> */}

//               {/* Main Heading - Responsive text sizing */}
//               <h2 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//                 <AnimatedText
//                   text="Building"
//                   className="text-white text-shadow-lg"
//                   delay={0.7}
//                 />
//                 <AnimatedText
//                   text="Tomorrow's"
//                   className="text-gold-400 text-shadow-lg"
//                   delay={0.9}
//                 />
//                 <AnimatedText
//                   text="Infrastructure"
//                   className="text-white text-shadow-lg"
//                   delay={1.1}
//                 />
//               </h2>

//               {/* Dynamic Slide Content */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentSlide}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.6 }}
//                   className="space-y-4 mb-8"
//                 >
//                   <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gold-400 text-shadow">
//                     {currentSlideData.title}
//                   </h3>
//                   <h4 className="text-lg sm:text-xl md:text-2xl text-gray-200 text-shadow-sm">
//                     {currentSlideData.subtitle}
//                   </h4>
//                   <p className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-shadow-sm">
//                     {currentSlideData.description}
//                   </p>
//                 </motion.div>
//               </AnimatePresence>

//               {/* Call-to-Action Buttons with enhanced styling */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//                 transition={{ duration: 0.8, delay: 1.5 }}
//                 className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//               >
//                 <motion.a
//                   href="/contact"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 
//                            bg-gradient-to-r from-gold-400 to-gold-600 text-white
//                            rounded-lg font-semibold text-base sm:text-lg transition-all duration-300
//                            shadow-lg hover:shadow-xl hover:shadow-gold-400/25 backdrop-blur-sm"
//                 >
//                   Get Free Consultation
//                   <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
//                 </motion.a>

//                 <motion.a
//                   href="tel:+19253055980"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 
//                            border-2 border-white/80 text-white rounded-lg font-semibold text-base sm:text-lg
//                            hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
//                 >
//                   <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
//                   (925) 305-5980
//                 </motion.a>

//                 {/* Emergency Services Button with accent red */}
//                 {/* <motion.a
//                   href="/emergency"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 
//                            bg-gradient-to-r from-red-600 to-red-700 text-white
//                            rounded-lg font-semibold text-base sm:text-lg
//                            hover:from-red-700 hover:to-red-800 transition-all duration-300 
//                            shadow-lg hover:shadow-xl hover:shadow-red-600/25 backdrop-blur-sm"
//                 >
//                   <span className="flex items-center">
//                     <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
//                     24/7 Emergency
//                   </span>
//                 </motion.a> */}
//               </motion.div>

//               {/* Trust Indicators - Enhanced with backdrop blur and responsive layout */}
//               {/* <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//                 transition={{ duration: 0.8, delay: 2 }}
//                 className="mt-8 sm:mt-12 grid grid-cols-2 lg:flex lg:flex-wrap gap-3 sm:gap-6 text-gray-100 justify-center lg:justify-start"
//               >
//                 {[
//                   { text: '15+ Years Experience', color: 'bg-gold-400' },
//                   { text: '24/7 Emergency Services', color: 'bg-red-600' },
//                   { text: 'We Beat Estimates', color: 'bg-gold-400' },
//                   { text: 'Fully Bonded & Insured', color: 'bg-gold-400' }
//                 ].map(({ text, color }) => (
//                   <div key={text} className="flex items-center bg-black/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2">
//                     <div className={`w-2 h-2 ${color} rounded-full mr-2 sm:mr-3 flex-shrink-0`} />
//                     <span className="text-xs sm:text-sm font-medium text-center lg:text-left">{text}</span>
//                   </div>
//                 ))}
//               </motion.div> */}
//             </motion.div>

//             {/* Desktop Logo Column - Hidden on mobile, enhanced styling */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//               className="hidden lg:flex justify-center items-center"
//             >
              
//               <div className="relative text-center">
//                 {/* Desktop decorative rings with updated colors */}
                
//                 <motion.div
//                   className="absolute inset-0 border-2 border-gold-400/30 rounded-full"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                   style={{ transform: 'scale(1.1)' }}
//                 />
//                 <motion.div
//                   className="absolute inset-0 border border-gold-400/20 rounded-full"
//                   animate={{ rotate: -360 }}
//                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//                   style={{ transform: 'scale(1.2)' }}
//                 />
//                 <motion.div
//                   className="absolute inset-0 border border-red-600/10 rounded-full"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//                   style={{ transform: 'scale(1.3)' }}
//                 />
//                    {/* Animated Badge with updated colors */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//                 className="inline-flex items-center px-4 py-2 mt-4 bg-gold-400/20 backdrop-blur-sm 
//                          rounded-full border border-gold-400/30 mb-6"
//               >
//                   <span className="text-gold-400 text-sm font-medium">
//                     Licensed & Insured #1099543
//                 </span>
//               </motion.div>

//               {/* Company Name - Enhanced with better hierarchy */}
//               <div className="text-center">
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-400 mb-2">
//                   Goldmine Communications
//                 </h1>
//                 <div className="text-xl sm:text-2xl md:text-3xl text-gray-100">
//                   & Construction
//                 </div>
//               </div>
//                 {/* Desktop Logo with enhanced effects */}
//                 <div className="relative w-72 h-72">
//                   <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-gold-400/50 bg-white/10 backdrop-blur-sm">
//                     <Image
//                       src="/images/logo-circular.png"
//                       alt="Goldmine Communications and Construction"
//                       fill
//                       className="object-contain p-6 mx-auto text-center"
//                       priority
//                     />
//                   </div>
//                   {/* Enhanced glow effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-gold-400/40 to-gold-600/40 rounded-full blur-2xl -z-10" />
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Carousel Controls */}
//       <div className="absolute bottom-8 left-0 right-0 z-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             {/* Navigation Dots */}
//             <div className="flex-1 flex justify-center">
//               <CarouselDots
//                 slides={heroSlides}
//                 currentIndex={currentSlide}
//                 onDotClick={setCurrentSlide}
//               />
//             </div>

//             {/* Control Buttons with updated colors */}
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={prevSlide}
//                 className="p-2 rounded-full bg-white/10 border border-white/20 
//                          text-white hover:bg-white/20 transition-all duration-300
//                          focus:outline-none focus:ring-2 focus:ring-gold-400"
//                 aria-label="Previous slide"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
              
//               <button
//                 onClick={togglePlayPause}
//                 className="p-2 rounded-full bg-white/10 border border-white/20 
//                          text-white hover:bg-white/20 transition-all duration-300
//                          focus:outline-none focus:ring-2 focus:ring-gold-400"
//                 aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
//               >
//                 {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
//               </button>
              
//               <button
//                 onClick={nextSlide}
//                 className="p-2 rounded-full bg-white/10 border border-white/20 
//                          text-white hover:bg-white/20 transition-all duration-300
//                          focus:outline-none focus:ring-2 focus:ring-gold-400"
//                 aria-label="Next slide"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 3 }}
//         className="absolute bottom-24 left-1/2 transform -translate-x-1/2 hidden md:block"
//       >
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ 
//             duration: 2, 
//             repeat: Infinity, 
//             ease: "easeInOut" 
//           }}
//           className="text-white/70 cursor-pointer text-center"
//           onClick={() => {
//             const aboutSection = document.getElementById('about');
//             aboutSection?.scrollIntoView({ behavior: 'smooth' });
//           }}
//           role="button"
//           tabIndex={0}
//           aria-label="Scroll to about section"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' || e.key === ' ') {
//               const aboutSection = document.getElementById('about');
//               aboutSection?.scrollIntoView({ behavior: 'smooth' });
//             }
//           }}
//         >
//           <div className="flex flex-col items-center">
//             <span className="text-sm mb-2">Scroll to explore</span>
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//             </svg>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Floating Particles */}
//       <div className="absolute inset-0 pointer-events-none z-5">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <motion.div
//             key={i}
//             className={`absolute w-1 h-1 rounded-full ${
//               i % 3 === 0 ? 'bg-gold-400' : i % 3 === 1 ? 'bg-red-600' : 'bg-white'
//             }`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -100, 0],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: Math.random() * 3 + 2,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       {/* Screen reader live region for slide changes */}
//       <div
//         aria-live="polite"
//         aria-atomic="true"
//         className="sr-only"
//       >
//         Currently showing: {currentSlideData.title} - {currentSlideData.subtitle}
//       </div>
//     </section>
//   );
// };

// export default HeroCarousel;