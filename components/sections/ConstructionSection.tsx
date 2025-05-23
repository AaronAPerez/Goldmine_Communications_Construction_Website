'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  HardHat, 
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  Building,
  Wrench,
  Target,
  Truck
} from 'lucide-react';
import Image from 'next/image';

/**
 * Enhanced Construction Section Component for Homepage
 * 
 * Features:
 * - Real project images showcasing actual construction work
 * - Interactive service cards with comprehensive project galleries
 * - Professional presentation with visual proof of capabilities
 * - Blueprint-style background elements
 * - Improved accessibility and performance
 */

interface ConstructionService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  projectImage: string;
  projectName: string;
  // galleryImages: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

const constructionServices: ConstructionService[] = [
  {
    id: 'site-development',
    title: 'Site Development & Preparation',
    description: 'Comprehensive site preparation, excavation, and infrastructure development for all types of construction projects.',
    icon: <Building className="w-8 h-8" />,
    projectImage: '/images/projects/IMG_20250522_183647 (1).jpg',
    projectName: 'Major Site Development Project',
    // galleryImages: [
    //   '/images/projects/IMG_20250522_183647 (1).jpg',
    //   '/images/projects/IMG_20250522_183647 (2).jpg',
    //   '/images/projects/IMG_20250522_183647 (3).jpg',
    //   '/images/projects/IMG_20250522_183647 (4).jpg',
    //   '/images/projects/IMG_20250522_183648 (2).jpg',
    //   '/images/projects/IMG_20250522_183648 (3).jpg'
    // ],
    features: [
      'Site Excavation & Grading',
      'Utility Infrastructure Planning',
      'Access Road Construction',
      'Environmental Compliance'
    ],
    color: 'from-blue-500 to-blue-600',
    stats: [
      { label: 'Site Area', value: '50+ acres' },
      { label: 'Completion', value: '12 months' }
    ]
  },
  {
    id: 'structural-concrete',
    title: 'Structural Concrete & Foundations',
    description: 'Expert concrete work including foundations, structural elements, and specialized concrete construction.',
    icon: <Target className="w-8 h-8" />,
    projectImage: '/images/projects/IMG_20250522_183648 (10).jpg',
    projectName: 'Advanced Concrete Construction',
    // galleryImages: [
    //   '/images/projects/IMG_20250522_183648 (10).jpg',
    //   '/images/projects/IMG_20250522_183648 (11).jpg',
    //   '/images/projects/IMG_20250522_183648 (12).jpg',
    //   '/images/projects/IMG_20250522_183649 (11).jpg',
    //   '/images/projects/IMG_20250522_183649 (12).jpg',
    //   '/images/projects/IMG_20250522_183649 (13).jpg'
    // ],
    features: [
      'Foundation Construction',
      'Structural Concrete Placement',
      'Reinforcement Installation',
      'Quality Control & Testing'
    ],
    color: 'from-orange-500 to-orange-600',
    stats: [
      { label: 'Concrete Grade', value: '4000+ PSI' },
      { label: 'Quality Standard', value: 'Architectural' }
    ]
  },
  {
    id: 'infrastructure-systems',
    title: 'Infrastructure & Utility Systems',
    description: 'Complete infrastructure installation including utilities, communications, and specialized systems.',
    icon: <Wrench className="w-8 h-8" />,
    projectImage: '/images/projects/IMG_20250522_183649 (17).jpg',
    projectName: 'Infrastructure Systems Project',
    // galleryImages: [
    //   '/images/projects/IMG_20250522_183649 (17).jpg',
    //   '/images/projects/IMG_20250522_183649 (18).jpg',
    //   '/images/projects/IMG_20250522_183649 (19).jpg',
    //   '/images/projects/IMG_20250522_183649 (20).jpg',
    //   '/images/projects/IMG_20250522_183649 (21).jpg',
    //   '/images/projects/IMG_20250522_183649 (22).jpg'
    // ],
    features: [
      'Utility Installation & Integration',
      'Communications Infrastructure',
      'Specialized Equipment Installation',
      'System Testing & Commissioning'
    ],
    color: 'from-green-500 to-green-600',
    stats: [
      { label: 'Systems Installed', value: '15+ types' },
      { label: 'Uptime Guarantee', value: '99.9%' }
    ]
  },
  {
    id: 'equipment-transport',
    title: 'Heavy Equipment & Transport',
    description: 'Specialized equipment transportation, installation, and precision placement for complex projects.',
    icon: <Truck className="w-8 h-8" />,
    projectImage: '/images/projects/IMG_20250522_183647 (2).jpg',
    projectName: 'Equipment Installation Project',
    // galleryImages: [
    //   '/images/projects/IMG_20250522_183649 (23).jpg',
    //   '/images/projects/IMG_20250522_183649 (24).jpg',
    //   '/images/projects/IMG_20250522_183649 (25).jpg',
    //   '/images/projects/IMG_20250522_183649 (26).jpg',
    //   '/images/projects/IMG_20250522_183649 (27).jpg',
    //   '/images/projects/IMG_20250522_183649.jpg'
    // ],
    features: [
      'Heavy Equipment Transport',
      'Precision Equipment Placement',
      'Rigging & Installation',
      'Safety Protocol Management'
    ],
    color: 'from-purple-500 to-purple-600',
    stats: [
      { label: 'Max Load', value: '200+ tons' },
      { label: 'Precision', value: '±5mm' }
    ]
  }
];

/**
 * Enhanced Service Card Component with Project Images
 */
interface ServiceCardProps {
  service: ConstructionService;
  index: number;
  onViewProject: (service: ConstructionService) => void;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                 transition-all duration-500 hover:-translate-y-2 overflow-hidden
                 border border-gray-100 hover:border-gold-200"
    >
      {/* Project Image Header */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.projectImage}
          alt={`${service.projectName} - ${service.title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={index === 0}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent 
                        opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* Service Icon Badge */}
        <div className="absolute top-4 left-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg
                         transform group-hover:scale-110 transition-transform duration-300`}>
            {service.icon}
          </div>
        </div>

        {/* View Project Button */}
        {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 
                        group-hover:opacity-100 transition-all duration-300">
          <motion.button
            onClick={() => onViewProject(service)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/75 backdrop-blur-sm rounded-lg p-4 shadow-xl 
                       border border-white/20 hover:bg-white"
            aria-label={`View ${service.projectName} details`}
          >
            <Eye className="w-6 h-6 text-gray-700" />
          </motion.button>
        </div> */}

        {/* Project Stats Overlay */}
        {/* {service.stats && (
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300">
            <div className="flex gap-2">
              {service.stats.map((stat, idx) => (
                <div key={idx} className="bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs">
                  <div className="font-semibold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Gallery Count Badge */}
        {/* <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm 
                        rounded-full px-2 py-1 text-white text-xs font-medium">
          {service.galleryImages.length} Photos
        </div> */}

        {/* Project Name Badge */}
        <div className="absolute bottom-4 right-4 bg-gold-400/90 backdrop-blur-sm 
                        rounded-full px-3 py-1 text-white text-xs font-medium">
          {service.projectName}
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold-600 
                       transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Service Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: (index * 0.15) + (idx * 0.1) }}
              className="flex items-start gap-3 text-gray-600 text-sm"
            >
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Action Button */}
        {/* <button
          onClick={() => onViewProject(service)}
          className="w-full inline-flex items-center justify-center px-4 py-3 
                     bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gold-50 hover:to-gold-100
                     border border-gray-200 hover:border-gold-300 text-gray-700 hover:text-gold-700 
                     font-medium rounded-lg transition-all duration-200 group/btn"
        >
          View Project Gallery
          <ArrowUpRight className="w-4 h-4 ml-2 transition-transform 
                                  group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button> */}
      </div>
    </motion.div>
  );
};

/**
 * Main Enhanced Construction Section Component
 */
const ConstructionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleViewProject = (service: ConstructionService) => {
    // Navigate to construction page with focus on specific service
    window.location.href = `/construction#${service.id}`;
  };

  // Blueprint-style decorative component
  const BlueprintGrid = () => (
    <div className="absolute inset-0 opacity-5" aria-hidden="true">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(179, 153, 93, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(179, 153, 93, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      aria-labelledby="construction-heading"
    >
      {/* Blueprint Background Elements */}
      <BlueprintGrid />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-gold-300/20 rounded-full" />
      <div className="absolute bottom-32 left-20 w-24 h-24 border border-dashed border-gold-400/20 rotate-45" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
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
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From site preparation to complex infrastructure systems, we deliver comprehensive 
            construction solutions with proven expertise, safety excellence, and exceptional results 
            demonstrated in our extensive project portfolio.
          </p>
        </motion.div>

        {/* Enhanced Services Grid with Project Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {constructionServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onViewProject={handleViewProject}
            />
          ))}
        </div>

        {/* Enhanced Key Differentiators with Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gold-200/30">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Choose Our Construction Excellence
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 
                               text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Safety Excellence</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Zero incident safety record with comprehensive protocols
                </p>
                <div className="bg-blue-50 rounded-lg p-2">
                  <div className="text-xl font-bold text-blue-600">Zero</div>
                  <div className="text-xs text-blue-700">Safety Incidents</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 
                               text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Clock className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Timely Delivery</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Consistent on-time project completion
                </p>
                <div className="bg-green-50 rounded-lg p-2">
                  <div className="text-xl font-bold text-green-600">98%</div>
                  <div className="text-xs text-green-700">On-Time Rate</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                               text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <HardHat className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Expert Teams</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Decades of combined construction experience
                </p>
                <div className="bg-orange-50 rounded-lg p-2">
                  <div className="text-xl font-bold text-orange-600">15+</div>
                  <div className="text-xs text-orange-700">Years Experience</div>
                </div>
              </div>

              <div className="text-center group">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 
                               text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Results</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Exceeding specifications and expectations
                </p>
                <div className="bg-purple-50 rounded-lg p-2">
                  <div className="text-xl font-bold text-purple-600">100%</div>
                  <div className="text-xs text-purple-700">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Call to Action with Multiple Options */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Build Something Exceptional?
            </h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
              From site preparation to complex infrastructure installation, our proven expertise 
              and comprehensive project portfolio demonstrate our ability to deliver exceptional results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/construction"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gold-400 hover:bg-gold-500 
                         text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl
                         focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Explore All Construction Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white
                         text-white hover:bg-white hover:text-gray-900 font-medium 
                         rounded-lg transition-colors
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                View Project Portfolio
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gold-400
                         text-gold-400 hover:bg-gold-400 hover:text-white font-medium 
                         rounded-lg transition-colors
                         focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Get Free Estimate
              </motion.a>
            </div>
            
            {/* License Information */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm">
                <span className="font-semibold">Licensed & Insured</span> • License #1099543 • 
                Bonded & Insured • We Beat Estimates
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConstructionSection;