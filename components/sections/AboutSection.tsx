'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  CheckCircle2, 
  Award, 
  Users, 
  Target,
  Heart,
  Shield,
  Lightbulb,
  Rocket,
  Clock,
  TrendingUp
} from 'lucide-react';

/**
 * About Section Component
 * 
 * Comprehensive company overview with:
 * - Rich legacy storytelling
 * - Service showcase
 * - Core values visualization
 * - Interactive statistics
 * - Team dedication highlights
 */

interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ServiceCategory {
  category: string;
  services: string[];
  icon: React.ReactNode;
}

const coreValues: CoreValue[] = [
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'Uncompromising quality standards in every project we undertake.',
    icon: <Award className="w-6 h-6" />,
    color: 'from-gold-400 to-gold-600'
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Pioneering solutions that set the pace for the industry.',
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'Honest, transparent practices that build lasting trust.',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'teamwork',
    title: 'Teamwork',
    description: 'Collaborative efforts that amplify our collective strength.',
    icon: <Users className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'dedication',
    title: 'Dedication',
    description: 'Relentless commitment to customer satisfaction and success.',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'productivity',
    title: 'Productivity',
    description: 'Efficient solutions that maximize value and minimize waste.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-orange-500 to-orange-600'
  }
];

const serviceCategories: ServiceCategory[] = [
  {
    category: 'Construction & Infrastructure',
    services: [
      'Paving & Grading',
      'Site Concrete',
      'Civil Construction',
      'Structural Concrete',
      'Excavation',
      'Home Additions'
    ],
    icon: <Target className="w-8 h-8" />
  },
  {
    category: 'Technology & Communications',
    services: [
      'Telecommunications',
      'Tech Services',
      'Electrical Systems',
      'Network Infrastructure',
      'Smart Solutions',
      'System Integration'
    ],
    icon: <Rocket className="w-8 h-8" />
  },
  {
    category: 'Specialized Services',
    services: [
      'Demolition',
      'Landscaping',
      'Project Management',
      'Construction Management',
      'Safety Consulting',
      'Quality Assurance'
    ],
    icon: <Clock className="w-8 h-8" />
  }
];

/**
 * Animated Counter Component for Statistics
 */
interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ReactNode;
}

const AnimatedStat = ({ value, suffix = '', prefix = '', label, icon }: AnimatedStatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const timer = setInterval(() => {
        start += Math.ceil(end / 60); // 1 second duration at 60fps
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
      className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg
                 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full text-white">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  );
};

/**
 * Main About Section Component
 */
const AboutSection = () => {
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
          Where Legacy Meets
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
            {' '}Innovation
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to Goldmine Communications, where our rich legacy of excellence and 
          pioneering innovation has positioned us as leaders in the industry.
        </p>
      </motion.div>

      {/* Company Story */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
      >
        {/* Story Content */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Excellence Through Expert Management & Seamless Services
          </h3>
          <p className="text-gray-600 leading-relaxed">
            With expert management and seamless services, we uphold the highest standards 
            of integrity and dedication to our diverse customer base. We pride ourselves 
            on our extensive expertise and versatility in production, making us the best in class.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our steadfast commitment and highly productive team are driven by passion and 
            relentless dedication to problem-solving, maintaining uncompromising quality 
            standards tailored to each customer.
          </p>
          
          {/* Key Commitments */}
          <div className="space-y-4">
            {[
              'Meeting deadlines with precision',
              'Reducing costs through efficiency',
              'Fostering collaborative efforts',
              'Exceeding industry standards'
            ].map((commitment, index) => (
              <motion.div
                key={commitment}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-gray-700">{commitment}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Statistics */}
        <div className="grid grid-cols-2 gap-6">
          <AnimatedStat
            value={15}
            suffix="+"
            label="Years of Excellence"
            icon={<Award className="w-6 h-6" />}
          />
          <AnimatedStat
            value={500}
            suffix="+"
            label="Projects Completed"
            icon={<Target className="w-6 h-6" />}
          />
          <AnimatedStat
            value={99}
            suffix="%"
            label="Customer Satisfaction"
            icon={<Heart className="w-6 h-6" />}
          />
          <AnimatedStat
            value={24}
            suffix="/7"
            label="Support Available"
            icon={<Clock className="w-6 h-6" />}
          />
        </div>
      </motion.div>

      {/* Service Categories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-20"
      >
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Comprehensive Service Portfolio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 + (index * 0.1) }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl 
                       transition-shadow duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-gold-400 to-gold-600 
                              rounded-lg text-white group-hover:scale-110 
                              transition-transform duration-300">
                  {category.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900">
                  {category.category}
                </h4>
              </div>
              <ul className="space-y-3">
                {category.services.map((service, serviceIndex) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.8 + (serviceIndex * 0.05) }}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-20"
      >
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Foundation Principles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl 
                       transition-all duration-300 group cursor-pointer
                       hover:-translate-y-1"
            >
              <div className={`
                w-12 h-12 rounded-lg bg-gradient-to-r ${value.color} 
                flex items-center justify-center text-white mb-4
                group-hover:scale-110 transition-transform duration-300
              `}>
                {value.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {value.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-6">
            Setting the Pace for Tomorrow
          </h3>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            At Goldmine Communications, we don&apos;t just keep pace with the latest industry 
            demands; we set the pace. Founded on principles of optimism, teamwork, creativity, 
            resourcefulness, exacting standards, unwavering productivity, safety, integrity, 
            dedication, and customer satisfaction.
          </p>
          <div className="bg-gold-400/10 backdrop-blur-sm rounded-xl p-6 border border-gold-400/20">
            <p className="text-2xl font-semibold text-gold-400 mb-4">
              &quot;Join us on this journey towards a future where business is not just efficient but transformative.&quot;
            </p>
            <p className="text-gray-300 italic">
              Thank you for choosing Goldmine Communications, where elevating and delivering is our commitment.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;