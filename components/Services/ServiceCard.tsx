'use client';

import { useState, useRef } from 'react';
import { ServiceIcon } from './ServiceIcon';
import { Service } from '@/types/service';
import { ChevronRight, X } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
  
     // Handle keyboard navigation / interactions
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      role="region"
      aria-expanded={isExpanded}
      aria-label={`${service.title} service information`}
      tabIndex={0}
      onKeyDown={handleKeyPress}
        className={`
          group relative perspective-1000 w-full h-[400px]
          transform transition-transform duration-300
          ${isExpanded ? 'scale-105 z-50' : 'hover:scale-102'}
        `}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        {/* Card Container */}
        <div
          ref={cardRef}
          className={`
            relative w-full h-full transition-all duration-500
            transform-style-3d cursor-pointer
            ${isFlipped ? 'rotate-y-180' : ''}
          `}
          onClick={() => !isExpanded && setIsFlipped(!isFlipped)}
          onKeyPress={handleKeyPress}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          aria-label={`${service.title} - Click to learn more`}
        >
          {/* Front of Card */}
          <div 
            className={`
              absolute w-full h-full backface-hidden
              bg-white rounded-xl shadow-lg p-6
              ${isFlipped ? 'pointer-events-none' : ''}
            `}
          >
            <div className="flex flex-col h-full">
              {/* Icon */}
              <div className="mb-4 text-gold-400 transform transition-transform group-hover:scale-110">
                <ServiceIcon 
                  icon={service.icon} 
                  size={40}
                  className="transition-transform duration-300 group-hover:rotate-12"
                  aria-hidden="true"
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
  
              {/* Interactive Button */}
              <div className="mt-auto">
                <button
                  className="
                    flex items-center text-gold-400 hover:text-gold-500
                    transition-colors duration-200
                  "
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                  <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
  
          {/* Back of Card */}
          <div 
            className={`
              absolute w-full h-full backface-hidden rotate-y-180
              bg-white rounded-xl shadow-lg p-6
              ${!isFlipped ? 'pointer-events-none' : ''}
            `}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-primary-900">
                  {service.title} Features
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close details"
                >
                  <X size={20} />
                </button>
              </div>
  
              {/* Features List */}
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start space-x-2"
                  >
                    <span className="flex-shrink-0 w-5 h-5 mt-1">
                      <svg
                        className="w-5 h-5 text-gold-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
  
              {/* Expand Button */}
              <button
                className="
                  mt-auto w-full py-2 px-4 bg-gold-400 text-white
                  rounded-lg hover:bg-gold-500 transition-colors
                  duration-200 focus:outline-none focus:ring-2
                  focus:ring-gold-300
                "
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${service.title} details`}
              >
                {isExpanded ? 'Collapse Details' : 'View Full Details'}
              </button>
            </div>
          </div>
        </div>
  
        {/* Expanded View Modal */}
        {isExpanded && (
          <div 
            className="
              fixed inset-0 bg-black/50 z-50
              flex items-center justify-center
              p-4 md:p-8
            "
            onClick={() => setIsExpanded(false)}
          >
            <div 
              className="
                bg-white rounded-xl p-6 md:p-8
                max-w-2xl w-full max-h-[90vh] overflow-y-auto
              "
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby={`expanded-${service.id}`}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 
                  id={`expanded-${service.id}`}
                  className="text-2xl font-bold text-primary-900"
                >
                  {service.title}
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close full details"
                >
                  <X size={24} />
                </button>
              </div>
  
              {/* Expanded Content */}
              <div className="space-y-6">
                <p className="text-gray-600">
                  {service.description}
                </p>
  
                <div>
                  <h4 className="font-semibold text-lg mb-3">Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <li 
                        key={idx}
                        className="flex items-start space-x-2"
                      >
                        <span className="flex-shrink-0 w-5 h-5 mt-1">
                          <svg
                            className="w-5 h-5 text-gold-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
  
                {/* Call to Action */}
                <div className="flex justify-end space-x-4">
                  <button
                    className="
                      py-2 px-4 border-2 border-gold-400 text-gold-400
                      rounded-lg hover:bg-gold-400 hover:text-white
                      transition-colors duration-200
                    "
                    onClick={() => window.location.href = '/contact'}
                    aria-label={`Request quote for ${service.title}`}
                  >
                    Request Quote
                  </button>
                  <button
                    className="
                      py-2 px-4 bg-gold-400 text-white rounded-lg
                      hover:bg-gold-500 transition-colors duration-200
                    "
                    onClick={() => window.location.href = `/services/${service.id}`}
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

export default ServiceCard;
// import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
// import { ServiceIcon } from './ServiceIcon';
// import { Service } from '@/types/service';
// import { useState } from 'react';

// interface ServiceCardProps {
//   service: Service;
//   delay?: number;
// }

// export function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
//   const { ref, isVisible } = useIntersectionObserver();
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       ref={ref}
//       className={`
//         relative bg-white rounded-lg shadow-xl transition-all duration-500
//         ${isVisible 
//           ? 'opacity-100 translate-y-0' 
//           : 'opacity-0 translate-y-10'
//         }
//       `}
//       style={{ transitionDelay: `${delay}ms` }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       role="article"
//       aria-labelledby={`service-title-${service.id}`}
//     >
//       <div className="p-6">
//         {/* Icon */}
//         <div className="w-12 h-12 mb-4 text-gold-400">
//           <ServiceIcon 
//             icon={service.icon as any} 
//             className="w-full h-full"
//             aria-hidden="true"
//           />
//         </div>

//         {/* Title */}
//         <h3 
//           id={`service-title-${service.id}`}
//           className="text-xl font-bold mb-3 text-primary-900"
//         >
//           {service.title}
//         </h3>

//         {/* Description */}
//         <p className="text-gray-600 mb-4">
//           {service.description}
//         </p>

//         {/* Features List */}
//         <ul 
//           className={`space-y-2 transition-opacity duration-300 ${
//             isHovered ? 'opacity-100' : 'opacity-0'
//           }`}
//           aria-hidden={!isHovered}
//         >
//           {service.features.map((feature, index) => (
//             <li 
//               key={index}
//               className="flex items-center text-sm text-gray-600"
//             >
//               <svg
//                 className="w-4 h-4 mr-2 text-gold-400"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               {feature}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ServiceCard;