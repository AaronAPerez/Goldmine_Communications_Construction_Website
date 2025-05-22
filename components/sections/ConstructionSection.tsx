'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  HardHat, 
  Hammer, 
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  TractorIcon
} from 'lucide-react';

/**
 * Construction Section Component for Homepage
 * 
 * Professional showcase of construction services with:
 * - Service categorization based on reference image
 * - Visual emphasis on safety and quality
 * - Clean, professional presentation
 */

interface ConstructionService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

const constructionServices: ConstructionService[] = [
  {
    id: 'public-works',
    title: 'Public Works',
    description: 'High-quality infrastructure solutions that enhance community safety and connectivity.',
    icon: <HardHat className="w-8 h-8" />,
    features: [
      'Site Development & Preparation',
      'Infrastructure Enhancement',
      'Public Safety Integration',
      'Community-Focused Solutions'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  // {
  //   id: 'emergency-services',
  //   title: 'Emergency Services',
  //   description: '24/7 rapid response and expert solutions for urgent infrastructure needs.',
  //   icon: <AlertTriangle className="w-8 h-8" />,
  //   features: [
  //     'Rapid Response Team',
  //     'Emergency Infrastructure Repair',
  //     'Safety-Critical Solutions',
  //     'Efficient Problem Resolution'
  //   ],
  //   color: 'from-red-500 to-red-600'
  // },
  {
    id: 'specialized-services',
    title: 'Specialized Services',
    description: 'Precision cutting, drilling, and technical construction services.',
    icon: <Hammer className="w-8 h-8" />,
    features: [
      'Saw Cutting & Core Drilling',
      'Precision Concrete Work',
      'Technical Installation',
      'Quality Assurance'
    ],
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'comprehensive-construction',
    title: 'Comprehensive Construction',
    description: 'Full-service construction from foundation to finishing.',
    icon: <TractorIcon className="w-8 h-8" />,
    features: [
      'Grading & Paving',
      'Structural & Site Concrete',
      'Pouring & Pumping',
      'Demolition Services'
    ],
    color: 'from-green-500 to-green-600'
  }
];

/**
 * Service Card Component
 */
interface ServiceCardProps {
  service: ConstructionService;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl 
                 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Service Header */}
      <div className={`p-6 bg-gradient-to-r ${service.color} text-white`}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg group-hover:scale-110 
                        transition-transform duration-300">
            {service.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-white/90 text-sm mt-1">{service.description}</p>
          </div>
        </div>
      </div>

      {/* Service Features */}
      <div className="p-6">
        <ul className="space-y-3">
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: (index * 0.1) + (idx * 0.05) }}
              className="flex items-center gap-3 text-gray-600"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

/**
 * Main Construction Section Component
 */
const ConstructionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={sectionRef} 
      className="bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="construction-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            id="construction-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Professional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Construction
            </span>
            {' '}Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering durable infrastructure and precise construction solutions with 
            uncompromising safety standards and expert craftsmanship.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {constructionServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Choose Our Construction Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Safety First</h4>
                <p className="text-gray-600 text-sm">
                  Meticulous planning ensures the highest standards of safety and efficiency
                </p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Precise Execution</h4>
                <p className="text-gray-600 text-sm">
                  Expert solutions delivered on time and within budget
                </p>
              </div>
              <div className="text-center">
                <HardHat className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Expert Team</h4>
                <p className="text-gray-600 text-sm">
                  Safety-conscious and experienced team with proven results
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/construction"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gold-400 hover:bg-gold-500 
                     text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Explore Construction Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ConstructionSection;