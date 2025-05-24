'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  CheckCircle,
  NetworkIcon,
  ConstructionIcon,
  Clock
} from 'lucide-react';
import Image from 'next/image';


/**
 * Service Category interface for better organization
 */
interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  services: string[];
  image: string;
  color: string;
}


/**
 * Service categories with improved organization
 */
const serviceCategories: ServiceCategory[] = [
  {
    id: 'communications',
    title: 'Communications & Technology',
    description: 'Advanced telecommunications infrastructure and smart technology solutions for the connected world.',
    icon: <NetworkIcon className="w-8 h-8" />,
    services: [
      'Fiber Optic Installation & Splicing',
      '5G & RF Network Infrastructure',
      'Smart Building Integration',
      'IoT & EV Charging Solutions',
      'Data Center Construction',
      'Wireless Communication Systems'
    ],
    image: '/images/communications-tower2.png',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'construction',
    title: 'Construction & Infrastructure',
    description: 'Professional construction services delivering durable infrastructure with uncompromising safety standards.',
    icon: <ConstructionIcon className="w-8 h-8" />,
    services: [
      'Site Development & Grading',
      'Structural & Site Concrete',
      'Public Works Projects',
      'Specialized Cutting & Drilling',
      'Demolition Services',
      'Project Management'
    ],
    image: '/images/concrete/grading.png',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'support',
    title: 'Support & Maintenance',
    description: 'Comprehensive support services ensuring optimal performance and reliability of all installations.',
    icon: <Clock className="w-8 h-8" />,
    services: [
      '24/7 Emergency Response',
      'Preventive Maintenance',
      'System Testing & Certification',
      'Performance Monitoring',
      'Training & Consultation',
      'Asset Management'
    ],
    image: '/images/concrete/site-concrete.png',
    color: 'from-green-500 to-green-600'
  }
];

/**
 * Animation variants for consistent animations
 */
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay * 0.1,
      ease: [0.21, 1.11, 0.81, 0.99]
    }
  })
};



/**
 * Service Category Card Component
 */
interface ServiceCardProps {
  category: ServiceCategory;
  index: number;
  isInView: boolean;
}

const ServiceCategoryCard = ({ category, index, isInView }: ServiceCardProps) => {
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
      custom={index}
      className="group rounded-2xl shadow-xl overflow-hidden border border-gray-100
               hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
    >
      {/* Image Header */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Icon overlay */}
        <div className="absolute top-4 right-4">
          <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl text-white
                         group-hover:scale-110 transition-transform duration-300`}>
            {category.icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
          {category.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {category.description}
        </p>

        {/* Services List */}
        <ul className="space-y-3 mb-6">
          {category.services.map((service, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.5 + (idx * 0.1) }}
              className="flex items-start text-sm text-gray-600"
            >
              <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span>{service}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-6 bg-gradient-to-r ${category.color} text-white 
                     font-semibold rounded-lg hover:shadow-lg transition-all duration-300`}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};

/**
 * Main About Services Section Component
 */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1
  });

  return (
    <section 
      ref={sectionRef} 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-services-heading"
    >



      {/* Service Categories Section */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={3}
        className="mb-20"
      >
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Portfolio
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From cutting-edge communications to precision construction, we deliver 
            integrated solutions that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceCategories.map((category, index) => (
            <ServiceCategoryCard
              key={category.id}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>
      </section>
  )};

