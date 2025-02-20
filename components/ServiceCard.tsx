'use client';

import { useState } from 'react';
import { Service } from '@/types/service';
import { ChevronRight } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import { ServiceIcon } from './Services/ServiceIcon';


interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Calculate staggered animation delay
  const animationDelay = index * 100;

  return (
    <AnimatedCard
      delayMs={animationDelay}
      animationType="fade-up"
      className="h-[400px] bg-white"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Icon with hover animation */}
        <div 
          className="mb-4 text-gold-400 transform transition-all duration-300 hover:scale-110"
          aria-hidden="true"
        >
          <ServiceIcon
            icon={service.icon} 
            size={40}
            className="transition-transform duration-300 hover:rotate-12"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-primary-900">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          {service.description}
        </p>

        {/* Features list with staggered fade-in */}
        <ul className="space-y-2 mt-auto">
          {service.features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="flex items-center text-sm text-gray-600"
              style={{
                opacity: isFlipped ? 1 : 0,
                transform: isFlipped ? 'translateY(0)' : 'translateY(10px)',
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

        {/* Interactive Button */}
        <button
          className="
            mt-4 flex items-center text-gold-400 hover:text-gold-500
            transition-colors duration-200
          "
          onClick={() => setIsFlipped(!isFlipped)}
          aria-expanded={isFlipped}
          aria-label={`${isFlipped ? 'Hide' : 'Show'} features for ${service.title}`}
        >
          {isFlipped ? 'Hide Features' : 'Learn More'}
          <ChevronRight 
            className={`
              ml-1 w-4 h-4 transition-transform duration-200
              ${isFlipped ? 'rotate-90' : ''}
            `}
          />
        </button>
      </div>
    </AnimatedCard>
  );
}

export default ServiceCard;