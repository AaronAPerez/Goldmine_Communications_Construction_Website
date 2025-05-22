// 'use client';

// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import {
//   Network,
//   Radio,
//   Zap,
//   Smartphone,
//   ArrowRight,
//   CheckCircle
// } from 'lucide-react';
// import SectionParticles from './SectionParticles';

// /**
//  * Enhanced Communications Section - The Technology Showcase
//  * 
//  * Emphasizes cutting-edge technology and future-ready solutions
//  * Focuses on benefits and outcomes rather than technical details
//  */

// interface TechSolution {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   outcomes: string[];
//   color: string;
//   badge?: string;
// }

// const techSolutions: TechSolution[] = [
//   {
//     id: 'fiber-networks',
//     title: '5G-Ready Fiber Networks',
//     description: 'Ultra-fast, ultra-reliable connectivity that powers California\'s digital economy',
//     icon: <Network className="w-8 h-8" />,
//     outcomes: [
//       '10x faster than traditional copper',
//       '99.99% uptime with redundant systems',
//       'Future-proof for next 20 years',
//       'Energy efficient design'
//     ],
//     color: 'from-blue-500 to-blue-600',
//     badge: 'Industry Leading'
//   },
//   {
//     id: 'wireless-infrastructure',
//     title: 'Advanced Wireless Infrastructure',
//     description: 'Seamless coverage that keeps California connected, everywhere, all the time',
//     icon: <Radio className="w-8 h-8" />,
//     outcomes: [
//       'Complete carrier compatibility',
//       'Small cell optimization',
//       'Edge computing integration',
//       'Minimal environmental impact'
//     ],
//     color: 'from-green-500 to-green-600',
//     badge: 'Next-Gen Ready'
//   },
//   {
//     id: 'smart-systems',
//     title: 'Intelligent Building Systems',
//     description: 'AI-powered infrastructure that learns, adapts, and optimizes itself',
//     icon: <Zap className="w-8 h-8" />,
//     outcomes: [
//       'Up to 40% energy cost reduction',
//       'Predictive maintenance alerts',
//       'Automated optimization',
//       'Integration with existing systems'
//     ],
//     color: 'from-purple-500 to-purple-600',
//     badge: 'AI-Powered'
//   }
// ];

// const TechCard = ({ solution, index }: { solution: TechSolution; index: number }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(cardRef, { once: true });

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       className="group relative"
//     >
//       <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl 
//                     transition-all duration-500 hover:-translate-y-2 overflow-hidden 
//                     border border-gray-100">

//         {/* Header with Badge */}
//         <div className={`p-6 bg-gradient-to-r ${solution.color} text-white relative overflow-hidden`}>
//           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />

//           <div className="relative">
//             <div className="flex items-start justify-between mb-4">
//               <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm
//                             group-hover:scale-110 transition-transform duration-300">
//                 {solution.icon}
//               </div>

//               {solution.badge && (
//                 <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full 
//                                text-xs font-semibold border border-white/30">
//                   {solution.badge}
//                 </span>
//               )}
//             </div>

//             <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
//             <p className="text-white/90 text-sm">{solution.description}</p>
//           </div>
//         </div>

//         {/* Outcomes */}
//         <div className="p-6">
//           <h4 className="font-semibold text-gray-900 mb-4">Key Outcomes</h4>
//           <ul className="space-y-3">
//             {solution.outcomes.map((outcome, idx) => (
//               <motion.li
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
//                 transition={{ delay: (index * 0.1) + (idx * 0.05) }}
//                 className="flex items-center gap-3"
//               >
//                 <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                 <span className="text-gray-700 text-sm">{outcome}</span>
//               </motion.li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const CommunicationsSection = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

//   return (
    
//     // Inside your component's return statement:
//     <section id="communications" className="py-16 bg-gray-900" tabIndex={-1} aria-label="communications">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Background Effects */}
//         <div className="absolute inset-0">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
//           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


//      {/* Section Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-16"
//       >
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//           Comprehensive Solutions for
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
//             {' '}Modern Infrastructure
//           </span>
//         </h2>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//           From cutting-edge communications to specialized construction, we deliver 
//           integrated solutions that drive your business forward.
//         </p>
//       </motion.div>
//           {/* Section Header */}
//           {/* <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2
//               id="communications-heading"
//               className="text-4xl md:text-5xl font-bold text-white mb-6"
//             >
//               The Future of
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
//                 {' '}Communication
//               </span>
//               {' '}is Here
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Experience the most advanced communication technologies in California—
//               designed to keep you ahead of tomorrow's demands.
//             </p>
//           </motion.div> */}

//           {/* Technology Solutions Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
//             {techSolutions.map((solution, index) => (
//               <TechCard key={solution.id} solution={solution} index={index} />
//             ))}
//           </div>

//           {/* Innovation Promise */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="text-center"
//           >
//             <div className="max-w-4xl mx-auto">
//               <h3 className="text-3xl font-bold text-white mb-6">
//                 Don't Just Keep Up—Stay Ahead
//               </h3>
//               <p className="text-xl text-gray-300 mb-8">
//                 While others catch up to today's technology, we're already building
//                 tomorrow's infrastructure. Your competitive advantage starts here.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <motion.a
//                   href="/communications"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center px-8 py-4 bg-gradient-to-r 
//                          from-gold-400 to-gold-500 text-black font-semibold rounded-lg 
//                          transition-colors shadow-xl hover:shadow-2xl"
//                 >
//                   Explore Our Technology
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </motion.a>

//                 <motion.a
//                   href="/contact"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center px-8 py-4 border-2 border-white 
//                          text-white hover:bg-white hover:text-gray-900 font-semibold 
//                          rounded-lg transition-colors"
//                 >
//                   <Smartphone className="w-5 h-5 mr-2" />
//                   Get Your Tech Assessment
//                 </motion.a>
//               </div>
//             </div>
//           </motion.div>
//         </div>  {/* Client-only particles */}
//         <SectionParticles />
//       </div>
//     </section>
//   );
// };

// export default CommunicationsSection;