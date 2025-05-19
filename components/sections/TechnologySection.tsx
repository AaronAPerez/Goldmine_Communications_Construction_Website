'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Cpu, 
  Wifi, 
  Shield, 
  Zap, 
  Database,
  Monitor,
  Smartphone,
  Cloud
} from 'lucide-react';

/**
 * Technology Section Component
 * 
 * Showcases cutting-edge technology and innovation
 * Superior to competitors with interactive tech grid
 */

interface Technology {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  color: string;
}

const technologies: Technology[] = [
  {
    id: 'iot',
    name: 'IoT Integration',
    description: 'Smart sensors and connected devices for comprehensive monitoring and automation.',
    icon: <Wifi className="w-8 h-8" />,
    benefits: ['Real-time monitoring', 'Predictive maintenance', 'Energy optimization'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'ai',
    name: 'AI-Powered Analytics',
    description: 'Advanced AI algorithms for intelligent decision-making and optimization.',
    icon: <Cpu className="w-8 h-8" />,
    benefits: ['Intelligent automation', 'Performance insights', 'Cost optimization'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'security',
    name: 'Advanced Security',
    description: 'Multi-layered security solutions protecting your critical infrastructure.',
    icon: <Shield className="w-8 h-8" />,
    benefits: ['Zero-trust architecture', 'Threat detection', 'Compliance assurance'],
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'automation',
    name: 'Smart Automation',
    description: 'Intelligent automation systems that adapt and optimize operations.',
    icon: <Zap className="w-8 h-8" />,
    benefits: ['Reduced downtime', 'Improved efficiency', 'Cost savings'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'cloud',
    name: 'Cloud Integration',
    description: 'Seamless cloud connectivity for scalable and flexible operations.',
    icon: <Cloud className="w-8 h-8" />,
    benefits: ['Scalable infrastructure', 'Remote access', 'Data redundancy'],
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'monitoring',
    name: 'Real-time Monitoring',
    description: 'Comprehensive monitoring systems providing instant insights and alerts.',
    icon: <Monitor className="w-8 h-8" />,
    benefits: ['24/7 monitoring', 'Instant alerts', 'Performance metrics'],
    color: 'from-indigo-500 to-purple-500'
  }
];

/**
 * Technology Card Component
 */
interface TechnologyCardProps {
  technology: Technology;
  index: number;
}

const TechnologyCard = ({ technology, index }: TechnologyCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0 
      } : { 
        opacity: 0, 
        y: 50, 
        rotateX: -15 
      }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group perspective-1000"
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
        className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full
                   border border-white/20 hover:border-white/40 transition-all duration-300
                   transform-gpu"
      >
        {/* Gradient Background */}
        <div className={`
          absolute inset-0 rounded-xl bg-gradient-to-br ${technology.color} 
          opacity-0 group-hover:opacity-10 transition-opacity duration-300
        `} />

        {/* Technology Icon */}
        <div className={`
          relative z-10 inline-flex items-center justify-center p-3 rounded-lg
          bg-gradient-to-br ${technology.color} text-white mb-4
          group-hover:scale-110 transition-transform duration-300
        `}>
          {technology.icon}
        </div>

        {/* Technology Info */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
            {technology.name}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-height-relaxed">
            {technology.description}
          </p>

          {/* Benefits List */}
          <ul className="space-y-2">
            {technology.benefits.map((benefit, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                className="flex items-center text-sm text-gray-400"
              >
                <div className={`
                  w-1.5 h-1.5 rounded-full bg-gradient-to-r ${technology.color} mr-2
                `} />
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </motion.div>
    </motion.div>
  );
};

/**
 * Main Technology Section Component
 */
const TechnologySection = () => {
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
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Powered by
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
            {' '}Cutting-Edge Technology
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We leverage the latest innovations to deliver solutions that are not just 
          current, but future-ready.
        </p>
      </motion.div>

      {/* Technologies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {technologies.map((technology, index) => (
          <TechnologyCard
            key={technology.id}
            technology={technology}
            index={index}
          />
        ))}
      </div>

      {/* Innovation Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative"
      >
        <div className="bg-gradient-to-r from-gold-400/10 to-gold-600/10 rounded-2xl p-8 md:p-12
                      border border-gold-400/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Innovation Content */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Innovation That Drives Results
              </h3>
              <p className="text-gray-300 mb-6">
                Our commitment to technology innovation means you get solutions that 
                deliver measurable improvements in efficiency, reliability, and performance.
              </p>
              
              {/* Innovation Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Uptime Improvement', value: '99.9%' },
                  { label: 'Cost Reduction', value: '30%' },
                  { label: 'Efficiency Gain', value: '45%' },
                  { label: 'Response Time', value: '<15min' }
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.6 + (idx * 0.1) }}
                    className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm"
                  >
                    <div className="text-2xl font-bold text-gold-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Innovation Visual */}
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-64 h-64 mx-auto relative"
              >
                {/* Central Core */}
                <div className="absolute inset-1/2 w-16 h-16 -mt-8 -ml-8 bg-gradient-to-r 
                              from-gold-400 to-gold-600 rounded-full flex items-center 
                              justify-center">
                  <Cpu className="w-8 h-8 text-white" />
                </div>

                {/* Orbiting Elements */}
                {[Database, Smartphone, Wifi, Shield].map((Icon, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full 
                             flex items-center justify-center border border-white/20"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                      transform: `
                        translate(-50%, -50%) 
                        rotate(${idx * 90}deg) 
                        translateY(-100px)
                      `
                    }}
                    animate={{
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Icon className="w-6 h-6 text-gold-400" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TechnologySection;