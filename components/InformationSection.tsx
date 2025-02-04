'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Phone, Mail, MapPin, HardHat, Wrench, FileText } from 'lucide-react';
import Link from 'next/link';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    icon: <HardHat className="w-8 h-8 text-gold-400" />,
    title: "General Construction",
    description: "Commercial and industrial construction services with focus on quality and safety."
  },
  {
    icon: <Wrench className="w-8 h-8 text-gold-400" />,
    title: "Remodeling & Renovation",
    description: "Complete renovation services including electrical, flooring, and insulation."
  },
  {
    icon: <FileText className="w-8 h-8 text-gold-400" />,
    title: "ADA Compliance",
    description: "Specialized installations and modifications for ADA compliance requirements."
  }
];

export function InformationSection() {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section 
      ref={ref}
      className="py-16 bg-gradient-to-b from-primary-900 to-primary-800"
      aria-labelledby="info-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - About Us */}
          <div 
            className={`
              transition-all duration-1000 delay-200
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
            `}
          >
            <h2 
              id="info-heading"
              className="text-3xl font-bold text-white mb-6"
            >
              About Goldmine C&C
            </h2>
            
            <div className="prose prose-lg text-gray-300">
              <p>
                Our commitment to safety, quality, and customer satisfaction sets us apart. 
                With over 15 years of experience in hospital construction, we prioritize 
                communication and transparency throughout the process.
              </p>
              
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gold-400 text-white">✓</span>
                  <span className="ml-3">Licensed & Bonded (Lic# 1099543)</span>
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gold-400 text-white">✓</span>
                  <span className="ml-3">15+ Years Experience</span>
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gold-400 text-white">✓</span>
                  <span className="ml-3">24/7 Emergency Service</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Services Grid */}
          <div 
            className={`
              grid gap-6
              transition-all duration-1000 delay-400
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
            `}
          >
            {services.map((service) => (
              <div 
                key={service.title}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-start">
                  {service.icon}
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div 
          className={`
            mt-12 pt-12 border-t border-white/10
            grid grid-cols-1 md:grid-cols-3 gap-8
            transition-all duration-1000 delay-600
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <div className="flex items-start">
            <Phone className="w-6 h-6 text-gold-400 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-white">Phone</h3>
              <a 
                href="tel:510.695.3177"
                className="text-gray-300 hover:text-gold-400 transition-colors"
              >
                510.695.3177
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="w-6 h-6 text-gold-400 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-white">Email</h3>
              <a 
                href="mailto:info@goldminecomm.net"
                className="text-gray-300 hover:text-gold-400 transition-colors"
              >
                info@goldminecomm.net
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="w-6 h-6 text-gold-400 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-white">Address</h3>
              <a 
                href="https://maps.google.com/?q=946+Lincoln+Ave,+San+Jose,+CA+95125"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold-400 transition-colors"
              >
                946 Lincoln Ave, San Jose<br />
                Ca 95125
              </a>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="
              inline-flex items-center px-8 py-3
              bg-gold-400 text-white rounded-lg
              hover:bg-gold-500 transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-400
            "
          >
            Get a Free Estimate
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default InformationSection