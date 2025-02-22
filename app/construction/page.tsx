'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Building2, Shield, CheckCircle2, Clock, Award, Hammer, Ruler, HardHat, Truck, Users } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ConstructionPage() {
  const { ref: servicesRef, isVisible: isServicesVisible } = useIntersectionObserver();
  const [activeTab, setActiveTab] = useState('overview');

  const constructionServices: ServiceFeature[] = [
    {
      icon: <Building2 className="w-8 h-8 text-gold-400" />,
      title: "Commercial Construction",
      description: "Full-service commercial construction including new builds, renovations, and tenant improvements with over 15 years of hospital construction experience."
    },
    {
      icon: <Hammer className="w-8 h-8 text-gold-400" />,
      title: "Civil Construction",
      description: "Comprehensive civil construction services including site preparation, utilities, and infrastructure development."
    },
    {
      icon: <Ruler className="w-8 h-8 text-gold-400" />,
      title: "Project Management",
      description: "Expert project management ensuring timely completion, budget adherence, and quality control throughout the construction process."
    },
    {
      icon: <HardHat className="w-8 h-8 text-gold-400" />,
      title: "Safety Management",
      description: "Industry-leading safety protocols and management systems, including specialized medical facility and ADA compliance requirements."
    },
    {
      icon: <Truck className="w-8 h-8 text-gold-400" />,
      title: "Equipment Management",
      description: "State-of-the-art equipment and professional operators for efficient project execution."
    },
    {
      icon: <Users className="w-8 h-8 text-gold-400" />,
      title: "Team Expertise",
      description: "Skilled professionals with extensive industry experience in specialized construction needs."
    }
  ];

  return (
    <main className="pt-20 bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/maintenance.jpg"
          alt="Construction Site"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Professional Construction Services
              </h1>
              <p className="text-xl text-white/90">
                Building excellence through innovation, quality, and dedication. Specializing in hospital construction with over 15 years of experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {['overview', 'services', 'expertise', 'projects', 'safety'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-2 border-b-2 font-medium transition-colors
                  ${activeTab === tab 
                    ? 'border-gold-400 text-gold-400' 
                    : 'border-transparent text-gray-500 hover:text-gold-400'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Services Grid */}
          <div 
            ref={servicesRef}
            className={`
              grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000
              ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            {constructionServices.map((service, index) => (
              <div 
                key={service.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold ml-3">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Key Features */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Specializations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Hospital Construction</h3>
                <ul className="space-y-3">
                  {[
                    'Over 15 years of specialized experience',
                    'Medical facility compliance expertise',
                    'Clean room construction',
                    'Healthcare-specific safety protocols',
                    'Minimal disruption to operations'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-gold-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-4">ADA Compliance & Safety</h3>
                <ul className="space-y-3">
                  {[
                    'ADA compliance expertise',
                    'Ligature resistant installation',
                    'Suicide prevention materials',
                    'Safety system implementation',
                    'Regular compliance inspections'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-gold-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                <p className="text-gray-600">Rigorous quality control and assurance protocols.</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
                <p className="text-gray-600">Consistent on-time project completion.</p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Industry Leaders</h3>
                <p className="text-gray-600">Award-winning construction services.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Project Today</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let&apos;s discuss your construction needs and create a plan for success.
            </p>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-600 mb-4">Lic# 1099543 | Bonded & Insured</p>
              <p className="text-gray-800 mb-2">946 Lincoln Ave, San Jose, CA 95125</p>
              <p className="mb-4">
                <a 
                  href="tel:5106953177"
                  className="text-gold-400 hover:text-gold-500 transition-colors font-semibold"
                >
                  Call Victor Valles: (510) 695-3177
                </a>
              </p>
              <p className="text-sm text-gray-600 italic">Already have an estimate? Forward it & we&apos;ll beat it!</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}