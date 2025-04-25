'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Network, Building2, Wrench, ClipboardList, ChevronRight } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  href: string;
}

// Services data
const services: Service[] = [
  {
    id: 'communications',
    title: 'Communications Infrastructure',
    description: 'Complete communications solutions for modern connectivity needs.',
    icon: <Network className="w-10 h-10 text-gold-400" />,
    features: [
      'Fiber Optic Installation',
      'Network Infrastructure',
      'Wireless Solutions',
      'Data Center Construction',
      'Telecommunications Equipment'
    ],
    href: '/services/communications'
  },
  {
    id: 'construction',
    title: 'Construction Services',
    description: 'Professional construction services for commercial and industrial projects.',
    icon: <Building2 className="w-10 h-10 text-gold-400" />,
    features: [
      'Commercial Construction',
      'Site Development',
      'Infrastructure Development',
      'Project Management',
      'Equipment Installation'
    ],
    href: '/services/construction'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: '24/7 maintenance and support services for all installations.',
    icon: <Wrench className="w-10 h-10 text-gold-400" />,
    features: [
      'Preventive Maintenance',
      'Emergency Repairs',
      'System Upgrades',
      'Performance Monitoring',
      'Technical Support'
    ],
    href: '/services/maintenance'
  },
  {
    id: 'consulting',
    title: 'Consulting & Design',
    description: 'Expert consultation and design services for your projects.',
    icon: <ClipboardList className="w-10 h-10 text-gold-400" />,
    features: [
      'Project Planning',
      'Technical Design',
      'Feasibility Studies',
      'Cost Analysis',
      'Regulatory Compliance'
    ],
    href: '/services/consulting'
  }
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleCardHover = (id: string) => {
    setActiveService(id);
  };

  const handleCardLeave = () => {
    setActiveService(null);
  };

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            id="services-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Comprehensive Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Providing cutting-edge communications and construction solutions with quality and expertise.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className={`
                bg-white rounded-xl shadow-lg overflow-hidden
                transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                ${activeService === service.id ? 'ring-2 ring-gold-400' : ''}
              `}
              onMouseEnter={() => handleCardHover(service.id)}
              onMouseLeave={handleCardLeave}
              onFocus={() => handleCardHover(service.id)}
              onBlur={handleCardLeave}
              tabIndex={0}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Icon with hover animation */}
                <div 
                  className="mb-4 transition-transform duration-300 hover:scale-110"
                  aria-hidden="true"
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                {/* Features list with staggered animation */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600"
                      style={{
                        opacity: activeService === service.id ? 1 : 0.7,
                        transform: activeService === service.id ? 'translateX(0)' : 'translateX(-10px)',
                        transition: `all 0.3s ease-out ${featureIndex * 100}ms`
                      }}
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-gold-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <Link
                  href={service.href}
                  className="
                    mt-auto inline-flex items-center text-gold-400 hover:text-gold-500
                    transition-colors duration-200 font-medium
                  "
                >
                  Learn More
                  <ChevronRight className="ml-1 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team of experts can design and implement tailored solutions to meet your specific requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-gold-400 text-white px-6 py-3 rounded-lg 
                      font-medium hover:bg-gold-500 transition-colors shadow-lg hover:shadow-xl"
            >
              Contact Us Today
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// 'use client';

// import React, { useState, useRef } from 'react';
// import Link from 'next/link';
// import { motion, useInView } from 'framer-motion';
// import { Network, Building2, Wrench, Shield, ClipboardList, ChevronRight } from 'lucide-react';

// interface Service {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   features: string[];
//   href: string;
// }

// // Services data
// const services: Service[] = [
//   {
//     id: 'communications',
//     title: 'Communications Infrastructure',
//     description: 'Complete communications solutions for modern connectivity needs.',
//     icon: <Network className="w-10 h-10 text-gold-400" />,
//     features: [
//       'Fiber Optic Installation',
//       'Network Infrastructure',
//       'Wireless Solutions',
//       'Data Center Construction',
//       'Telecommunications Equipment'
//     ],
//     href: '/services/communications'
//   },
//   {
//     id: 'construction',
//     title: 'Construction Services',
//     description: 'Professional construction services for commercial and industrial projects.',
//     icon: <Building2 className="w-10 h-10 text-gold-400" />,
//     features: [
//       'Commercial Construction',
//       'Site Development',
//       'Infrastructure Development',
//       'Project Management',
//       'Equipment Installation'
//     ],
//     href: '/services/construction'
//   },
//   {
//     id: 'maintenance',
//     title: 'Maintenance & Support',
//     description: '24/7 maintenance and support services for all installations.',
//     icon: <Wrench className="w-10 h-10 text-gold-400" />,
//     features: [
//       'Preventive Maintenance',
//       'Emergency Repairs',
//       'System Upgrades',
//       'Performance Monitoring',
//       'Technical Support'
//     ],
//     href: '/services/maintenance'
//   },
//   {
//     id: 'consulting',
//     title: 'Consulting & Design',
//     description: 'Expert consultation and design services for your projects.',
//     icon: <ClipboardList className="w-10 h-10 text-gold-400" />,
//     features: [
//       'Project Planning',
//       'Technical Design',
//       'Feasibility Studies',
//       'Cost Analysis',
//       'Regulatory Compliance'
//     ],
//     href: '/services/consulting'
//   }
// ];

// export default function ServicesSection() {
//   const [activeService, setActiveService] = useState<string | null>(null);
//   const ref = useRef<HTMLDivElement>(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const handleCardHover = (id: string) => {
//     setActiveService(id);
//   };

//   const handleCardLeave = () => {
//     setActiveService(null);
//   };

//   return (
//     <section className="py-20 bg-gray-50" aria-labelledby="services-heading">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 
//             id="services-heading"
//             className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
//           >
//             Our Comprehensive Services
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Providing cutting-edge communications and construction solutions with quality and expertise.
//           </p>
//         </motion.div>

//         {/* Services Grid */}
//         <motion.div
//           ref={ref}
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//         >
//           {services.map((service, index) => (
//             <motion.div
//               key={service.id}
//               variants={cardVariants}
//               className={`
//                 bg-white rounded-xl shadow-lg overflow-hidden
//                 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1
//                 ${activeService === service.id ? 'ring-2 ring-gold-400' : ''}
//               `}
//               onMouseEnter={() => handleCardHover(service.id)}
//               onMouseLeave={handleCardLeave}
//               onFocus={() => handleCardHover(service.id)}
//               onBlur={handleCardLeave}
//               tabIndex={0}
//             >
//               <div className="p-6 flex flex-col h-full">
//                 {/* Icon with hover animation */}
//                 <div 
//                   className="mb-4 transition-transform duration-300 hover:scale-110"
//                   aria-hidden="true"
//                 >
//                   {service.icon}
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-xl font-bold mb-3 text-gray-900">
//                   {service.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-gray-600 mb-6">
//                   {service.description}
//                 </p>

//                 {/* Features list with staggered animation */}
//                 <ul className="space-y-2 mb-6 flex-grow">
//                   {service.features.map((feature, featureIndex) => (
//                     <li
//                       key={featureIndex}
//                       className="flex items-center text-sm text-gray-600"
//                       style={{
//                         opacity: activeService === service.id ? 1 : 0.7,
//                         transform: activeService === service.id ? 'translateX(0)' : 'translateX(-10px)',
//                         transition: `all 0.3s ease-out ${featureIndex * 100}ms`
//                       }}
//                     >
//                       <svg
//                         className="w-4 h-4 mr-2 text-gold-400"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Learn More Link */}
//                 <Link
//                   href={service.href}
//                   className="
//                     mt-auto inline-flex items-center text-gold-400 hover:text-gold-500
//                     transition-colors duration-200 font-medium
//                   "
//                 >
//                   Learn More
//                   <ChevronRight className="ml-1 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-16 text-center"
//         >
//           <div className="bg-white p-8 rounded-xl shadow-lg">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">
//               Need a Custom Solution?
//             </h3>
//             <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//               Our team of experts can design and implement tailored solutions to meet your specific requirements.
//             </p>
//             <Link
//               href="/contact"
//               className="inline-flex items-center bg-gold-400 text-white px-6 py-3 rounded-lg 
//                       font-medium hover:bg-gold-500 transition-colors shadow-lg hover:shadow-xl"
//             >
//               Contact Us Today
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }