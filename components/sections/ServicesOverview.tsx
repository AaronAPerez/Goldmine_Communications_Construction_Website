'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Network, HardHat, Wrench, Calculator, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';



const services = [
  {
    id: 'communications',
    title: 'Communications Infrastructure',
    description: 'Advanced telecommunications and network solutions',
    icon: <Network className="w-8 h-8" />,
    features: [
      'Fiber Optic Installation',
      '5G & Wireless Solutions',
      'Network Infrastructure',
      'IoT & Smart Technology'
    ],
    href: '/communications',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'construction',
    title: 'Construction Services',
    description: 'Professional construction and development projects',
    icon: <HardHat className="w-8 h-8" />,
    features: [
      'Commercial Construction',
      'Healthcare Facilities',
      'Site Development',
      'Infrastructure Projects'
    ],
    href: '/construction',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: '24/7 maintenance and technical support services',
    icon: <Wrench className="w-8 h-8" />,
    features: [
      'Preventive Maintenance',
      'Emergency Repairs',
      'System Upgrades',
      'Technical Support'
    ],
    href: '/services#maintenance',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'consulting',
    title: 'Consulting & Design',
    description: 'Expert consultation and engineering design',
    icon: <Calculator className="w-8 h-8" />,
    features: [
      'Project Planning',
      'Technical Design',
      'Feasibility Studies',
      'Cost Analysis'
    ],
    href: '/services#consulting',
    color: 'from-purple-500 to-purple-600'
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Header */}
      <div className={`p-6 bg-gradient-to-br ${service.color} text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="relative">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 
                     rounded-xl mb-4 backdrop-blur-sm"
          >
            {service.icon}
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-white/90 text-sm">{service.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <ul className="space-y-3 mb-6">
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: (index * 0.1) + (idx * 0.05) }}
              className="flex items-center gap-3 text-gray-600"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-gray-50 transition-colors"
            asChild
          >
            <a href={service.href}>
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white"
      aria-labelledby="services-heading"
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
            id="services-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions combining cutting-edge technology with proven construction expertise
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every project is unique. Our team works with you to design and implement 
              solutions that meet your specific requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/services">
                  View All Services
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}