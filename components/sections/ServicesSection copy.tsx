// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Network, 
//   Building2, 
//   Wrench, 
//   Shield, 
//   CheckCircle2 
// } from 'lucide-react';



// const services = [
//   {
//     title: "Communications Infrastructure",
//     description: "Complete communications solutions including fiber optics, network infrastructure, and wireless systems.",
//     icon: <Network className="w-10 h-10" />,
//     features: [
//       "Fiber Optic Installation",
//       "Network Design & Planning",
//       "Wireless Infrastructure",
//       "Data Center Connectivity"
//     ]
//   },
//   {
//     title: "Construction Services",
//     description: "Professional construction services for healthcare facilities and commercial projects.",
//     icon: <Building2 className="w-10 h-10" />,
//     features: [
//       "Healthcare Facility Construction",
//       "Commercial Construction",
//       "ADA Compliance Implementation",
//       "Site Development"
//     ]
//   },
//   {
//     title: "Safety & Security",
//     description: "Comprehensive safety and security system installations for healthcare and commercial facilities.",
//     icon: <Shield className="w-10 h-10" />,
//     features: [
//       "Access Control Systems",
//       "Security Cameras",
//       "Emergency Response Systems",
//       "Fire Safety Integration"
//     ]
//   },
//   {
//     title: "Maintenance & Support",
//     description: "24/7 maintenance and support services for all your infrastructure needs.",
//     icon: <Wrench className="w-10 h-10" />,
//     features: [
//       "24/7 Emergency Services",
//       "Preventive Maintenance",
//       "System Upgrades",
//       "Technical Support"
//     ]
//   }
// ];

// export default function ServicesSection() {
//   return (
//     <section className="relative py-24 overflow-hidden">

    
//     <div className="relative z-10 max-w-7xl mx-auto px-4">
//       {/* Section Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="text-center mb-16"
//       >
//         <h2 className="text-4xl font-bold text-white mb-4">
//           Our Services
//         </h2>
//         <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//           Comprehensive solutions for your communications and construction needs, 
//           delivered with expertise and precision.
//         </p>
//       </motion.div>
//       <div className="absolute inset-0 border-2 border-gold-400/0 
//                             rounded-2xl transition-all duration-300
//                             group-hover:border-gold-400/20" />

//       {/* Services Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {services.map((service, index) => (
//           <motion.div
//             key={service.title}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.2 }}
//             className="group relative"
//           >
//             <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 
//                           backdrop-blur-sm p-8 hover:bg-gray-800/70 
//                           transition-colors duration-300">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-3 rounded-xl bg-gold-400/10 text-gold-400">
//                   {service.icon}
//                 </div>
//                 <h3 className="text-2xl font-semibold text-white">
//                   {service.title}
//                 </h3>
//               </div>

//               <p className="text-gray-300 mb-6">
//                 {service.description}
//               </p>

//               <ul className="space-y-3">
//                 {service.features.map((feature) => (
//                   <li 
//                     key={feature}
//                     className="flex items-center gap-2 text-gray-300"
//                   >
//                     <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-8">
//                 <a
//                   href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
//                   className="inline-flex items-center text-gold-400 hover:text-gold-300 
//                            transition-colors"
//                 >
//                   Learn More →
//                 </a>
//               </div>

//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* CTA Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="mt-16 text-center"
//       >
//         <div className="inline-block bg-gradient-to-r from-gold-400/20 
//                        to-gold-400/0 backdrop-blur-sm rounded-2xl p-8">
//           <h3 className="text-2xl font-bold text-white mb-4">
//             Ready to Get Started?
//           </h3>
//           <p className="text-gray-300 mb-6">
//             Contact us today to discuss your project needs and receive a free consultation.
//           </p>
//           <a
//             href="/contact"
//             className="inline-flex items-center px-8 py-3 bg-gold-400 
//                      text-white rounded-lg hover:bg-gold-500 transition-colors"
//           >
//             Request a Quote
//           </a>
//         </div>
//       </motion.div>
//     </div>
//   </section>

//   );
// }