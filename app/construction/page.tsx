'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Hammer, Ruler, HardHat, Truck, Users, CheckCircle2, Clock, Award } from 'lucide-react';
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
      description: "Full-service commercial construction including new builds, renovations, and tenant improvements."
    },
    {
      icon: <Hammer className="w-8 h-8 text-gold-400" />,
      title: "Civil Construction",
      description: "Comprehensive civil construction services including site preparation, utilities, and infrastructure."
    },
    {
      icon: <Ruler className="w-8 h-8 text-gold-400" />,
      title: "Project Management",
      description: "Expert project management ensuring timely completion and budget adherence."
    },
    {
      icon: <HardHat className="w-8 h-8 text-gold-400" />,
      title: "Safety Management",
      description: "Industry-leading safety protocols and management systems."
    },
    {
      icon: <Truck className="w-8 h-8 text-gold-400" />,
      title: "Equipment Management",
      description: "State-of-the-art equipment and professional operators."
    },
    {
      icon: <Users className="w-8 h-8 text-gold-400" />,
      title: "Team Expertise",
      description: "Skilled professionals with extensive industry experience."
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/construction-hero.jpg"
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
                Building excellence through innovation, quality, and dedication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {['overview', 'services', 'projects', 'safety'].map((tab) => (
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

          {/* Key Benefits */}
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

          {/* Safety Commitment */}
          <div className="mt-20 bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Safety First Approach</h2>
                <p className="text-gray-600 mb-6">
                  Our commitment to safety is unwavering. We maintain the highest standards 
                  of workplace safety through comprehensive training, regular inspections, 
                  and strict adherence to safety protocols.
                </p>
                <ul className="space-y-3">
                  {[
                    'OSHA compliant practices',
                    'Regular safety training',
                    'Site-specific safety plans',
                    'Safety equipment provided',
                    'Regular safety audits'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-gold-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/images/safety-first.jpg"
                  alt="Construction Safety"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Project Today</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let&apos;s discuss your construction needs and create a plan for success.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold-400 text-white px-8 py-3 rounded-lg 
                       font-medium hover:bg-gold-500 transition-colors"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}