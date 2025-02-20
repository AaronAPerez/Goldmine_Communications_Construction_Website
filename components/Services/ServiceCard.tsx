'use client';

import { useState } from 'react';
import { ServiceIcon } from './ServiceIcon';
import { Service } from '@/types/service';
import { ChevronRight, X } from 'lucide-react';
import AnimatedCard from '../AnimatedCard';


interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Calculate staggered animation delay
  const animationDelay = index * 100;

  return (
    <AnimatedCard
      delayMs={animationDelay}
      animationType="fade-up"
      className="h-[400px] bg-gray-50"
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