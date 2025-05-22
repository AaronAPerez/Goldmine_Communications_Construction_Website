'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  HardHat, 
  Hammer, 
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Clock,
  Truck,
  Settings,
  Target
} from 'lucide-react';
import { GiBulldozer } from "react-icons/gi";
import Image from 'next/image';


/**
 * Construction Page Component
 * 
 * Comprehensive showcase of all construction services with:
 * - Detailed service breakdowns based on reference image
 * - Interactive service exploration
 * - Professional safety emphasis
 * - Quality assurance highlights
 */

interface ConstructionService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  services: string[];
  color: string;
  image?: string;
}

const constructionServices: ConstructionService[] = [
  {
    id: 'public-works',
    title: 'Public Works',
    description: 'High-quality infrastructure solutions that enhance community safety and connectivity.',
    icon: <HardHat className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    services: [
      'Site Development & Preparation',
      'Public Infrastructure Enhancement',
      'Community Safety Integration',
      'Utility Coordination & Installation',
      'Traffic Management Systems',
      'Public Facility Construction',
      'Accessibility Compliance Implementation',
      'Environmental Impact Mitigation'
    ]
  },
  {
    id: 'emergency-services',
    title: 'Emergency Services',
    description: '24/7 rapid response and expert solutions for urgent infrastructure needs.',
    icon: <AlertTriangle className="w-8 h-8" />,
    color: 'from-red-500 to-red-600',
    services: [
      '24/7 Emergency Response Team',
      'Rapid Infrastructure Repair',
      'Emergency Utility Restoration',
      'Safety-Critical System Repair',
      'Disaster Recovery Services',
      'Temporary Infrastructure Solutions',
      'Emergency Site Stabilization',
      'Crisis Management Coordination'
    ]
  },
  {
    id: 'specialized-cutting',
    title: 'Saw Cutting & Core Drilling',
    description: 'Precision cutting, drilling, and technical construction services.',
    icon: <Hammer className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    services: [
      'Diamond Blade Concrete Cutting',
      'Precision Core Drilling',
      'Wall & Floor Penetrations',
      'Utility Opening Creation',
      'Decorative Concrete Cutting',
      'Pipe & Conduit Installation',
      'Controlled Demolition Cutting',
      'Safety-Conscious Operations'
    ]
  },
  {
    id: 'grading-paving',
    title: 'Grading & Paving',
    description: 'Professional earthwork and paving solutions for durable surfaces.',
    icon: <GiBulldozer h-10 w-10/>,
    color: 'from-green-500 to-green-600',
    services: [
      'Site Grading & Excavation',
      'Precision Land Preparation',
      'Asphalt Paving Installation',
      'Concrete Paving Solutions',
      'Surface Preparation & Compaction',
      'Drainage System Integration',
      'Parking Lot Construction',
      'Road & Pathway Development'
    ]
  },
  {
    id: 'structural-concrete',
    title: 'Structural Concrete',
    description: 'Robust concrete solutions for structural and site-specific needs.',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    services: [
      'Foundation Construction',
      'Structural Element Installation',
      'Reinforced Concrete Systems',
      'Precast Concrete Integration',
      'Load-Bearing Structure Design',
      'Seismic-Resistant Construction',
      'Quality Control Testing',
      'Long-Term Durability Assurance'
    ]
  },
  {
    id: 'site-concrete',
    title: 'Site Concrete',
    description: 'Comprehensive concrete services for site-specific applications.',
    icon: <Target className="w-8 h-8" />,
    color: 'from-indigo-500 to-indigo-600',
    services: [
      'Sidewalk & Walkway Construction',
      'Curb & Gutter Installation',
      'Decorative Concrete Features',
      'ADA-Compliant Access Solutions',
      'Site Drainage Concrete',
      'Retaining Wall Construction',
      'Concrete Repair & Restoration',
      'Surface Finishing & Texturing'
    ]
  },
  {
    id: 'concrete-services',
    title: 'Pouring & Pumping',
    description: 'Precision concrete delivery and placement services.',
    icon: <Truck className="w-8 h-8" />,
    color: 'from-cyan-500 to-cyan-600',
    services: [
      'High-Precision Concrete Pumping',
      'Large Volume Concrete Pours',
      'Continuous Pour Operations',
      'Boom Pump Services',
      'Line Pump Applications',
      'Concrete Placement Planning',
      'Quality Control During Pours',
      'Efficient Delivery Systems'
    ]
  },
  {
    id: 'demolition',
    title: 'Demolition Services',
    description: 'Safe, controlled demolition with environmental responsibility.',
    icon: <Settings className="w-8 h-8" />,
    color: 'from-gray-500 to-gray-600',
    services: [
      'Selective Interior Demolition',
      'Structural Demolition',
      'Site Preparation Demolition',
      'Environmental Hazard Management',
      'Debris Removal & Recycling',
      'Dust & Noise Control',
      'Safety Protocol Implementation',
      'Permit & Compliance Management'
    ]
  }
];

const safetyFeatures = [
  {
    title: 'Meticulous Planning',
    description: 'Every project begins with comprehensive safety planning and risk assessment.',
    icon: <Shield className="w-8 h-8" />
  },
  {
    title: 'Expert Teams',
    description: 'Safety-conscious and experienced teams with proven track records.',
    icon: <HardHat className="w-8 h-8" />
  },
  {
    title: 'Quality Standards',
    description: 'Highest standards of safety and efficiency in every operation.',
    icon: <CheckCircle className="w-8 h-8" />
  },
  {
    title: 'Timely Execution',
    description: 'Projects completed on time and within budget without compromising safety.',
    icon: <Clock className="w-8 h-8" />
  }
];

/**
 * Expandable Service Card Component
 */
interface ServiceCardProps {
  service: ConstructionService;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard = ({ service, index, isExpanded, onToggle }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      {/* Service Header */}
      <div className={`p-6 bg-gradient-to-r ${service.color} text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              {service.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-white/90 text-sm mt-1">{service.description}</p>
            </div>
          </div>
          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${service.title} details`}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Expandable Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Services Included:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.services.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 text-gray-600"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Main Construction Page Component
 */
const ConstructionPage = () => {
  const [expandedService, setExpandedService] = useState<string>('public-works');
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const handleServiceToggle = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? '' : serviceId);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <Image
            src="/images/concrete/site-concrete.png"
            alt="Construction Hero Image"
            fill
            className="absolute inset-0 object-cover opacity-30"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {' '}Construction
              </span>
              <br />Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Delivering durable infrastructure and precise construction solutions with 
              uncompromising safety standards and expert craftsmanship.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-gold-400 hover:bg-gold-500 
                         text-white font-medium rounded-lg transition-colors shadow-lg"
              >
                Get Free Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 border-2 border-white
                         text-white hover:bg-white hover:text-gray-900 font-medium 
                         rounded-lg transition-colors"
              >
                View Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Safety & Quality Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Safety & Quality First
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our construction services are built on a foundation of safety excellence 
              and uncompromising quality standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl 
                         transition-shadow duration-300"
              >
                <div className="text-gold-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Construction Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From public works to specialized cutting services, we deliver 
              complete construction solutions.
            </p>
          </motion.div>

          <div className="space-y-6">
            {constructionServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isExpanded={expandedService === service.id}
                onToggle={() => handleServiceToggle(service.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* License & Insurance Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Licensed, Bonded & Insured
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Your peace of mind is our priority. We maintain all necessary licenses, 
              bonds, and insurance coverage for your protection.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Shield className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">License #1099543</h3>
                  <p className="text-gray-300">Fully licensed contractor in California</p>
                </div>
                <div>
                  <CheckCircle className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Bonded & Insured</h3>
                  <p className="text-gray-300">Comprehensive coverage protection</p>
                </div>
                <div>
                  <Target className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">We Beat Estimates</h3>
                  <p className="text-gray-300">Forward your estimate - we&apos;ll beat it!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-gold-400 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Next Project?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Get professional construction services with uncompromising safety standards 
              and expert craftsmanship. Licensed, bonded, and insured for your peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-white text-gold-600 
                         hover:bg-gray-50 font-medium rounded-lg transition-colors shadow-lg"
              >
                Get Free Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 border-2 border-white
                         text-white hover:bg-white hover:text-gold-600 font-medium 
                         rounded-lg transition-colors"
              >
                View Our Projects
              </motion.a>
            </div>
            <div className="mt-8 text-white/80">
              <p className="text-lg font-semibold">License #1099543 | Bonded & Insured</p>
              <p className="text-sm mt-2">946 Lincoln Ave, San Jose, CA 95125 | (925) 305-5980</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConstructionPage;