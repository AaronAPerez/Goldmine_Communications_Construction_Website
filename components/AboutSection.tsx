'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Award, Clock, Lightbulb, Shield, Target, Users } from 'lucide-react';
import React from 'react'


// Core value interface for type safety
interface CoreValue {
    icon: React.ReactNode;
    title: string;
    description: string;
}


const AboutSection = () => {
    // Using intersection observer for scroll animations
    const { ref: contentRef, isVisible: isContentVisible } = useIntersectionObserver();
    const { ref: valuesRef, isVisible: isValuesVisible } = useIntersectionObserver();
  


    // Core company values
    const coreValues: CoreValue[] = [
        {
            icon: <Shield className="w-8 h-8 text-gold-400" />,
            title: "Integrity",
            description: "Maintaining the highest standards of professional ethics and transparency in all our operations."
        },
        {
            icon: <Users className="w-8 h-8 text-gold-400" />,
            title: "Collaboration",
            description: "Fostering strong partnerships with clients and stakeholders to achieve shared success."
        },
        {
            icon: <Lightbulb className="w-8 h-8 text-gold-400" />,
            title: "Innovation",
            description: "Continuously advancing our methods and technologies to deliver cutting-edge solutions."
        },
        {
            icon: <Target className="w-8 h-8 text-gold-400" />,
            title: "Excellence",
            description: "Committed to delivering superior quality in every project we undertake."
        },
        {
            icon: <Award className="w-8 h-8 text-gold-400" />,
            title: "Quality",
            description: "Maintaining uncompromising standards in all our services and deliverables."
        },
        {
            icon: <Clock className="w-8 h-8 text-gold-400" />,
            title: "Reliability",
            description: "Consistently meeting deadlines and exceeding client expectations."
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 
              id="about-heading"
              className="text-4xl font-bold bg-gradient-to-r from-primary-900 to-primary-800 bg-clip-text text-transparent mb-6"
            >
              About Goldmine Communications & Construction
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leaders in telecommunications and construction, delivering excellence through
              innovation and dedication.
            </p>
          </div>
  
          {/* Main Content */}
          <div 
            ref={contentRef}
            className={`
              grid md:grid-cols-2 gap-8 mb-20 transition-all duration-1000
              ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            {/* Legacy Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold-50 to-white p-8 shadow-lg border border-gold-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-100 opacity-50 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Our Legacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  At Goldmine Communications, we've established ourselves as industry leaders 
                  through years of pioneering innovation and excellence in the telecom sector. 
                  Our expert management and seamless service delivery uphold the highest 
                  standards of integrity, serving a diverse and growing customer base.
                </p>
              </div>
            </div>
  
            {/* Expertise Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-white p-8 shadow-lg border border-primary-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 opacity-50 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Our Expertise</h2>
                <p className="text-gray-700 leading-relaxed">
                  We offer comprehensive services including civil construction, tech services, 
                  and project management. Our commitment to meeting deadlines, reducing costs, 
                  and fostering collaboration ensures that we not only meet but exceed 
                  industry standards.
                </p>
              </div>
            </div>
          </div>
  
          {/* Core Values */}
          <div 
            ref={valuesRef}
            className={`transition-all duration-1000 ${isValuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary-900 to-primary-800 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <div 
                  key={value.title}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-gold-50 rounded-lg">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-primary-900 ml-3">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default AboutSection