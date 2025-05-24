'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Award, 
  Users,
  CheckCircle,
  Phone
} from 'lucide-react';

/**
 * Value Proposition Section Component
 * 
 * Displays company credibility through statistics and key value props
 * Designed for immediate trust building on homepage
 * 
 * Features:
 * - Animated statistics counters
 * - Professional credentials
 * - Clear value propositions
 * - Mobile-optimized layout
 */

interface Statistic {
  number: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface ValueProp {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const statistics: Statistic[] = [
  {
    number: '15+',
    label: 'Years Experience',
    icon: <Clock className="w-6 h-6" />,
    description: 'Proven expertise',
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '500+',
    label: 'Projects Completed',
    icon: <CheckCircle className="w-6 h-6" />,
    description: 'Successful deliveries',
    color: 'from-green-500 to-green-600'
  },
  {
    number: '100%',
    label: 'Licensed & Insured',
    icon: <Shield className="w-6 h-6" />,
    description: 'Complete protection',
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '24/7',
    label: 'Emergency Support',
    icon: <Phone className="w-6 h-6" />,
    description: 'Always available',
    color: 'from-orange-500 to-orange-600'
  }
];

const valueProps: ValueProp[] = [
  {
    title: 'Licensed Professionals',
    description: 'California License #1099543 with full bonding and insurance coverage',
    icon: <Shield className="w-8 h-8" />
  },
  {
    title: 'Proven Track Record',
    description: 'Over 15 years of successful project delivery throughout Northern California',
    icon: <Award className="w-8 h-8" />
  },
  {
    title: 'Expert Team',
    description: 'Certified technicians and experienced project managers',
    icon: <Users className="w-8 h-8" />
  }
];

/**
 * Animated Counter Component
 * Provides smooth number animation when in view
 */
interface AnimatedCounterProps {
  statistic: Statistic;
  index: number;
  isInView: boolean;
}

const AnimatedCounter = ({ statistic, index, isInView }: AnimatedCounterProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="text-center group"
  >
    <div className={`
      inline-flex p-4 rounded-full bg-gradient-to-r ${statistic.color} 
      text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300
    `}>
      {statistic.icon}
    </div>
    
    <motion.div
      initial={{ scale: 0.5 }}
      animate={isInView ? { scale: 1 } : { scale: 0.5 }}
      transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
      className="text-3xl font-bold text-gray-900 mb-1"
    >
      {statistic.number}
    </motion.div>
    
    <div className="text-sm font-semibold text-gray-700 mb-1">
      {statistic.label}
    </div>
    
    <div className="text-xs text-gray-500">
      {statistic.description}
    </div>
  </motion.div>
);

/**
 * Value Proposition Card Component
 */
interface ValuePropCardProps {
  valueProp: ValueProp;
  index: number;
  isInView: boolean;
}

const ValuePropCard = ({ valueProp, index, isInView }: ValuePropCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 
               hover:shadow-xl hover:border-gold-200 transition-all duration-300"
  >
    <div className="flex-shrink-0 p-3 bg-gold-50 rounded-lg text-gold-600">
      {valueProp.icon}
    </div>
    
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {valueProp.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {valueProp.description}
      </p>
    </div>
  </motion.div>
);

/**
 * Main Value Proposition Section Component
 */
const ValueProposition = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="value-proposition-heading"
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
            id="value-proposition-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Trusted Excellence in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Communications & Construction
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 15 years, we&apos;ve delivered exceptional infrastructure solutions 
            with uncompromising quality and safety standards.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {statistics.map((stat, index) => (
            <AnimatedCounter
              key={stat.label}
              statistic={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {valueProps.map((valueProp, index) => (
            <ValuePropCard
              key={valueProp.title}
              valueProp={valueProp}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Credentials Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-gold-400" />
              <div>
                <div className="font-bold text-lg">License #1099543</div>
                <div className="text-gray-300 text-sm">California Licensed Contractor</div>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-white/20" />
            
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-gold-400" />
              <div>
                <div className="font-bold text-lg">Bonded & Insured</div>
                <div className="text-gray-300 text-sm">Complete Protection Coverage</div>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-white/20" />
            
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-gold-400" />
              <div>
                <div className="font-bold text-lg">We Beat Estimates</div>
                <div className="text-gray-300 text-sm">Competitive Pricing Guaranteed</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;