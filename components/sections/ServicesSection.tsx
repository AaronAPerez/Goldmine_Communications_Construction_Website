'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Network, 
  Building2, 
  Wrench, 
  ClipboardList,
  ChevronRight,
  Check,
  ArrowRight
} from 'lucide-react';

/**
 * Enhanced Services Section Component
 * 
 * Superior to competitors with:
 * - Interactive service cards with flip animations
 * - Detailed feature breakdown
 * - Visual process flow
 * - Enhanced accessibility
 */

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  highlights: string[];
  href: string;
  color: string;
}

const services: Service[] = [
  {
    id: 'communications',
    title: 'Communications Infrastructure',
    description: 'Cutting-edge telecommunications and network solutions for the digital age.',
    icon: <Network className="w-12 h-12" />,
    features: [
      'Fiber Optic Installation & Maintenance',
      'High-Speed Network Design',
      'Wireless Infrastructure Solutions',
      'Data Center Connectivity',
      '5G Network Integration',
      'IoT Infrastructure Support'
    ],
    highlights: [
      'Industry-leading 99.99% uptime',
      'Certified by major telecom providers',
      'Future-ready technology integration'
    ],
    href: '/communications',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'construction',
    title: 'Advanced Construction Services',
    description: 'Specialized construction excellence with 15+ years in healthcare and commercial sectors.',
    icon: <Building2 className="w-12 h-12" />,
    features: [
      'Healthcare Facility Construction',
      'Commercial Building Development',
      'ADA Compliance Implementation',
      'Site Development & Preparation',
      'Project Management Excellence',
      'Safety-First Methodology'
    ],
    highlights: [
      '15+ years healthcare specialization',
      'Zero safety incidents record',
      'On-time project delivery guarantee'
    ],
    href: '/construction',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'technology',
    title: 'Smart Technology Integration',
    description: 'Innovative tech solutions that transform how businesses operate and communicate.',
    icon: <ClipboardList className="w-12 h-12" />,
    features: [
      'IoT System Integration',
      'Automation Solutions',
      'Security System Installation',
      'Energy Management Systems',
      'Smart Building Technologies',
      'Digital Infrastructure Planning'
    ],
    highlights: [
      'Cutting-edge AI integration',
      'Energy efficiency optimization',
      'Future-proof scalability'
    ],
    href: '/technology',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'support',
    title: '24/7 Support & Maintenance',
    description: 'Round-the-clock support ensuring your infrastructure never stops performing.',
    icon: <Wrench className="w-12 h-12" />,
    features: [
      'Emergency Response Services',
      'Preventive Maintenance Programs',
      'Remote Monitoring Solutions',
      'System Upgrades & Optimization',
      'Technical Training & Support',
      'Performance Analytics'
    ],
    highlights: [
      'Average 15-minute response time',
      'Proactive maintenance approach',
      '365-day availability guarantee'
    ],
    href: '/support',
    color: 'from-purple-500 to-purple-600'
  }
];

/**
 * Interactive Service Card Component
 */
interface ServiceCardProps {
  service: Service;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}

const ServiceCard = ({ service, index, isActive, onActivate }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`
        relative group cursor-pointer
        ${isActive ? 'lg:col-span-2' : 'lg:col-span-1'}
        transition-all duration-500 ease-out
      `}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onActivate();
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      aria-label={`View details for ${service.title}`}
    >
      <div className={`
        relative h-full bg-white rounded-2xl shadow-lg border-2 border-transparent
        hover:border-gold-400/30 transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        ${isActive ? 'border-gold-400/50 shadow-2xl' : ''}
      `}>
        {/* Gradient Background */}
        <div className={`
          absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} 
          opacity-0 group-hover:opacity-5 transition-opacity duration-300
        `} />
        
        <div className="relative p-8">
          {/* Service Icon */}
          <div className={`
            inline-flex items-center justify-center p-4 rounded-xl
            bg-gradient-to-br ${service.color} text-white mb-6
            group-hover:scale-110 transition-transform duration-300
          `}>
            {service.icon}
          </div>

          {/* Service Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gold-600 transition-colors">
            {service.title}
          </h3>

          {/* Service Description */}
          <p className="text-gray-600 mb-6 line-height-relaxed">
            {service.description}
          </p>

          {/* Features Grid (Expanded View) */}
          <motion.div
            initial={false}
            animate={{
              height: isActive ? 'auto' : 0,
              opacity: isActive ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {isActive && (
              <div className="space-y-6 pt-4 border-t border-gray-100">
                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Why Choose Us</h4>
                  <ul className="space-y-2">
                    {service.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center text-sm text-gold-600 font-medium"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.a
                  href={service.href}
                  className={`
                    inline-flex items-center px-6 py-3 rounded-lg
                    bg-gradient-to-r ${service.color} text-white font-medium
                    hover:shadow-lg transform hover:-translate-y-0.5
                    transition-all duration-200
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.a>
              </div>
            )}
          </motion.div>

          {/* Collapsed View CTA */}
          {!isActive && (
            <div className="flex items-center text-gold-600 font-medium group-hover:text-gold-700">
              <span>Explore Service</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-2xl 
                     bg-gradient-to-r from-gold-400 to-gold-500 -z-10"
            layoutId="activeServiceIndicator"
          />
        )}
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string>('communications');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Comprehensive Solutions for
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
            {' '}Modern Infrastructure
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From cutting-edge communications to specialized construction, we deliver 
          integrated solutions that drive your business forward.
        </p>
      </motion.div>

      {/* Interactive Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-fr">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            isActive={activeService === service.id}
            onActivate={() => setActiveService(service.id)}
          />
        ))}
      </div>

      {/* Process Flow Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20"
      >
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
          Our Proven Process
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'Consultation & Planning',
              description: 'We analyze your needs and develop a comprehensive strategy.',
              icon: <ClipboardList className="w-6 h-6" />
            },
            {
              step: '02', 
              title: 'Design & Engineering',
              description: 'Our experts create detailed plans optimized for your requirements.',
              icon: <Building2 className="w-6 h-6" />
            },
            {
              step: '03',
              title: 'Implementation',
              description: 'Skilled teams execute the project with precision and efficiency.',
              icon: <Wrench className="w-6 h-6" />
            },
            {
              step: '04',
              title: 'Support & Maintenance',
              description: 'Ongoing support ensures optimal performance and longevity.',
              icon: <Network className="w-6 h-6" />
            }
          ].map((process, index) => (
            <motion.div
              key={process.step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
              className="relative text-center group"
            >
              {/* Step Number */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 
                              rounded-full flex items-center justify-center text-white 
                              font-bold text-xl mx-auto group-hover:scale-110 
                              transition-transform duration-300">
                  {process.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 
                              rounded-full flex items-center justify-center text-white 
                              text-sm font-bold">
                  {process.step}
                </div>
                
                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 
                                bg-gradient-to-r from-gold-400 to-gray-300" />
                )}
              </div>

              {/* Process Info */}
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {process.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {process.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Infrastructure?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our comprehensive solutions can elevate your business 
            to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-gold-400 
                       hover:bg-gold-500 text-white font-medium rounded-lg
                       transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Consultation
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.a>
            <motion.a
              href="/projects"
              className="inline-flex items-center px-8 py-3 border-2 border-white
                       text-white hover:bg-white hover:text-gray-900 font-medium 
                       rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

//               </motion.div>