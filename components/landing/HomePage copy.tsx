// 'use client';

// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import ProjectShowcase from '../Projects/ProjectShowcase';
// import AboutServicesSection from '../sections/AboutServicesSection';
// import ServicesOverview from '../sections/ServicesOverview';
// import CommunicationsSection from '../sections/CommunicationsSection';
// import ConstructionSection from '../sections/ConstructionSection';
// import CTASection from '../sections/CTASection';
// import FloatingAccessibilityButton from '../sections/FloatingAccesabilityButton';
// import ProgressIndicator from '../sections/ProgressIndicator';
// import SectionWrapper from '../sections/SectionWrapper';
// import FloatingElements from '../ui/FloatingElements';
// import HeroCarousel from '../Hero/HeroCarousel';
// import ContactSection from '../Contact/ContactSection';
// import Image from 'next/image';


// /**
//  * Enhanced HomePage Component with Rich Visual Styling
//  * 
//  * Features:
//  * - Dynamic background patterns and decorative elements
//  * - Rich color gradients from color scheme
//  * - Supporting imagery and icons
//  * - Visual dividers and accents
//  * - Themed section transitions
//  */
// const HomePage = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"]
//   });


//   // Parallax effect for background elements
//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
//   const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

//   // Smooth scroll to section utility
//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }
//   };


//   // Skip links for accessibility
//   const SkipLinks = () => (
//     <div className="sr-only focus-within:not-sr-only">

//       <a href="#main-content"
//         className="absolute top-4 left-4 z-50 px-4 py-2 bg-gold-400 text-white 
//                    rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-gold"
//       >
//         Skip to main content
//       </a>

//       <a href="#about-services"
//         className="absolute top-4 left-32 z-50 px-4 py-2 bg-gold-400 text-white 
//                    rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-gold"
//       >
//         Skip to services
//       </a>
//     </div>
//   );

//   // Section Divider Component - adds visual separation between sections
//   const SectionDivider = ({ type = 'wave', inverted = false, color = 'white' }:
//     { type?: 'wave' | 'angle' | 'curve'; inverted?: boolean; color?: 'white' | 'gray' }) => {

//     const baseClass = "absolute left-0 right-0 h-16 pointer-events-none";
//     const positionClass = inverted ? "-bottom-1 rotate-180" : "-top-1";
//     const colorClass = color === 'white' ? "text-white" : "text-gray-50";

//     let divider;

//     switch (type) {
//       case 'angle':
//         divider = (
//           <svg className={`${baseClass} ${positionClass} ${colorClass}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
//             <path fill="currentColor" d="M1200 0L0 0 598.97 114.72 1200 0z"></path>
//           </svg>
//         );
//         break;
//       case 'curve':
//         divider = (
//           <svg className={`${baseClass} ${positionClass} ${colorClass}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
//             <path fill="currentColor" d="M600,112.77C268.63,112.77,0,65.52,0,7.23V0H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"></path>
//           </svg>
//         );
//         break;
//       default: // wave
//         divider = (
//           <svg className={`${baseClass} ${positionClass} ${colorClass}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
//             <path fill="currentColor" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
//           </svg>
//         );
//     }

//     return divider;
//   };

//   return (
//     <>
//       <SkipLinks />
//       <FloatingAccessibilityButton />
//       <ProgressIndicator />

//       <div
//         ref={containerRef}
//         className="flex flex-col min-h-screen overflow-hidden"
//         role="main"
//         id="main-content"
//       >
//         {/* Hero Section with Enhanced Parallax */}
//         <section
//           id="hero"
//           className="relative min-h-screen overflow-hidden bg-gray-900 pt-12"
//           aria-labelledby="hero-heading"
//         >
//           <FloatingElements />
//           <motion.div
//             className="absolute inset-0"
//           >
//             <HeroCarousel />
//           </motion.div>

//           {/* Trust Indicators */}
//           {/* <div className="absolute bottom-20 left-0 right-0 z-10">
//             <div className="container-max px-4 sm:px-2">
//               <div className="trust-indicators flex justify-center gap-4 flex-wrap">
//                 {[
//                   { icon: <Shield className="w-4 h-4 text-gold-400" />, text: "Licensed & Insured" },
//                   { icon: <Award className="w-4 h-4 text-gold-400" />, text: "15+ Years Experience" },
//                   { icon: <Target className="w-4 h-4 text-gold-400" />, text: "Quality Guarantee" },
//                   { icon: <Clock className="w-4 h-4 text-gold-400" />, text: "On-Time Delivery" }
//                 ].map((indicator, index) => (
//                   <div
//                     key={index}
//                     className="trust-indicator bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full 
//                                border border-white/20 text-white/90 text-sm flex items-center gap-2 sm:text-xs"
//                   >
//                     {indicator.icon}
//                     <span>{indicator.text}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div> */}

//           {/* Scroll indicator */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 2 }}
//             className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10"
//           >
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               className="text-white/70 cursor-pointer scroll-indicator"
//               onClick={() => scrollToSection('about-services')}
//               role="button"
//               tabIndex={0}
//               aria-label="Scroll to about section"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   scrollToSection('about-services');
//                 }
//               }}
//             >
//               <div className="flex flex-col items-center">
//                 <span className="text-sm mb-2">Scroll to explore</span>
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                 </svg>
//               </div>
//             </motion.div> 
//           </motion.div> 

//           {/* Curved divider at bottom of hero */}
//           <SectionDivider type="wave" color="white" />
//         </section>

//         {/* About & Services Combined Section */}
//         <SectionWrapper
//           id="about-services"
//           className="py-24 bg-white relative"
//         >
//           {/* Background pattern */}
//           <div className="absolute inset-0 opacity-5"
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B3995D' fill-opacity='0.4'%3E%3Cpath d='M30 30h30v30H30zM0 0h30v30H0z'/%3E%3C/g%3E%3C/svg%3E")`,
//               backgroundSize: '60px 60px'
//             }}
//           />

//           {/* Gold accent bar */}
//           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-gold rounded-b-lg shadow-gold" />

//           <AboutServicesSection />

//           {/* Angle divider at bottom */}
//           <SectionDivider type="angle" color="gray" inverted={true} />
//         </SectionWrapper>

//         {/* Services Overview Section */}
//         <SectionWrapper
//           id="services-overview"
//           className="py-24 bg-white relative"
//         >
//           <div className="absolute inset-0 opacity-5"
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B3995D' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
//               backgroundSize: '40px 40px'
//             }}
//           />

//           <motion.div
//             style={{ y: foregroundY }}
//             className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
//           >
//             <div className="absolute top-20 right-20 w-40 h-40">
//               <Image
//                 src="/images/shape-circle.svg" 
//                 alt="circle-shape-icon" 
//                 width={160} 
//                 height={160} 
//                 className="opacity-10" />
//             </div>
//             <div className="absolute bottom-40 left-10 w-64 h-64">
//               <Image 
//                 src="/images/shape-grid.svg" 
//                 alt="grid shape icon" 
//                 width={256} 
//                 height={256} 
//                 className="opacity-5" />
//             </div>
//           </motion.div>

//           <ServicesOverview />

//           {/* Curve divider at bottom */}
//           <SectionDivider type="angle" color="gray" />
//         </SectionWrapper>

//         {/* Communications Section */}
//         <SectionWrapper
//           id="communications"
//           className="py-24 bg-gray-900 relative overflow-hidden"
//         >
//           {/* Particle effects */}
//           <div className="absolute inset-0 hero-particles">
//             {Array.from({ length: 15 }).map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-1 h-1 bg-gold-400 rounded-full hero-particle"
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 6}s`,
//                 }}
//               />
//             ))}
//           </div>

//           {/* Gradient orbs */}
//           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />

//           <CommunicationsSection />

//           {/* Wave divider at bottom */}
//           <SectionDivider type="angle" color="white" />
//         </SectionWrapper>

//         {/* Construction Section */}
//         <SectionWrapper
//           id="construction"
//           className="py-24 bg-gradient-to-b from-white to-gray-50 relative"
//         >
//           {/* Decorative elements */}
//           <div className="absolute top-20 right-20 h-40 w-40 border-8 border-gold-200/40 rounded-full" />
//           <div className="absolute bottom-40 left-10 h-64 w-64 border-2 border-dashed border-gold-300/30 rounded-2xl transform rotate-12" />

//           <div className="absolute inset-0 opacity-5"
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B3995D' fill-opacity='0.4'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
//               backgroundSize: '20px 20px'
//             }}
//           />

//           <ConstructionSection />

//           {/* Angle divider at bottom */}
//           <SectionDivider type="curve" color="white" inverted={true} />
//         </SectionWrapper>

//         {/* Projects Showcase with Blueprint Grid Background */}
//         <SectionWrapper
//           id="projects"
//           className="py-24 relative overflow-hidden"
//         >
//           {/* Blueprint Grid Paper Background */}
//           <div className="absolute inset-0 bg-blue-50/70">
//             {/* Main grid */}
//             <div className="absolute inset-0"
//               style={{
//                 backgroundImage: `
//                   linear-gradient(to right, rgba(179, 153, 93, 0.07) 1px, transparent 1px),
//                   linear-gradient(to bottom, rgba(179, 153, 93, 0.07) 1px, transparent 1px)
//                 `,
//                 backgroundSize: '20px 20px'
//               }}
//             />

//             {/* Larger grid lines */}
//             <div className="absolute inset-0"
//               style={{
//                 backgroundImage: `
//           linear-gradient(to right, rgba(179, 153, 93, 0.12) 1px, transparent 1px),
//           linear-gradient(to bottom, rgba(179, 153, 93, 0.12) 1px, transparent 1px)
//         `,
//                 backgroundSize: '100px 100px'
//               }}
//             />

//             {/* Blueprint-style decorative elements */}
//             <div className="absolute left-10 top-20 w-40 h-40 border-2 border-gold-300/20 rounded-full"></div>
//             <div className="absolute right-20 bottom-40 w-60 h-60 border border-dashed border-gold-400/20 rounded-lg"></div>
//             <div className="absolute left-1/4 bottom-20 w-20 h-20 border border-gold-300/20 rounded-sm rotate-45"></div>

//             {/* Compass decoration */}
//             <div className="absolute right-10 top-10 w-32 h-32 opacity-10">
//               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <circle cx="50" cy="50" r="48" stroke="#B3995D" strokeWidth="2" />
//                 <path d="M50 2V98" stroke="#B3995D" strokeWidth="1" />
//                 <path d="M2 50H98" stroke="#B3995D" strokeWidth="1" />
//                 <path d="M26 50L50 26L74 50L50 74L26 50Z" stroke="#B3995D" strokeWidth="2" />
//                 <circle cx="50" cy="50" r="5" stroke="#B3995D" strokeWidth="2" />
//                 <path d="M18 18L82 82" stroke="#B3995D" strokeWidth="1" />
//                 <path d="M18 82L82 18" stroke="#B3995D" strokeWidth="1" />
//               </svg>
//             </div>

//             {/* "DRAFT" watermark */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-gold-300/10 text-9xl font-bold rotate-[-30deg] select-none">
//                 DRAFT
//               </div>
//             </div>
//           </div>

//           {/* Content overlay with subtle glass effect to ensure readability */}
//           <div className="relative">
//             <div className="absolute backdrop-blur-sm z-0"></div>
//             <div className="relative z-10">
//               <ProjectShowcase />
//             </div>
//           </div>

//           {/* Curve divider at bottom */}
//         <SectionDivider type="curve" color="white" /> 
//         </SectionWrapper>

//         {/* Enhanced Contact Section */}
//         <SectionWrapper
//           id="contact"
//           className="bg-gold-600 relative"
//         >
//           {/* Gradient spot */}
//           <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-gold-100/30 to-gold-200/10 rounded-full blur-3xl -z-10" />
//           <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-gold-200/20 to-gold-300/5 rounded-full blur-3xl -z-10" />

//           <ContactSection />
          
//         </SectionWrapper>

//         {/* Final CTA Section */}
//         <SectionWrapper
//           id="final-cta"
//           className="relative"
//         >
//           {/* Overlay pattern */}
//           <div className="absolute inset-0 opacity-10"
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20zM20 0h20v20H20V0zM0 20h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`,
//               backgroundSize: '40px 40px'
//             }}
//           />

//           {/* Animated gradient border effect */}
//           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/0 via-white/80 to-white/0 animate-shimmer" />

//           <CTASection />
//         </SectionWrapper>
//       </div>
//     </>
//   );
// };

// export default HomePage;