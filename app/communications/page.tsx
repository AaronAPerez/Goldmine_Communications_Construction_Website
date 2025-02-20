'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Network, Server, Wifi, Cable, Radio, Clock, Shield, Wrench, TowerControl } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function CommunicationsPage() {
  const { ref: servicesRef, isVisible } = useIntersectionObserver();
  const [activeTab, setActiveTab] = useState('overview');

  const features: ServiceFeature[] = [
    {
      icon: <Network className="w-8 h-8 text-gold-400" />,
      title: "Fiber Optic Solutions",
      description: "Complete fiber optic infrastructure deployment with state-of-the-art installation and maintenance."
    },
    {
      icon: <Server className="w-8 h-8 text-gold-400" />,
      title: "Network Infrastructure",
      description: "Comprehensive network design, implementation, and optimization services."
    },
    {
      icon: <Wifi className="w-8 h-8 text-gold-400" />,
      title: "Wireless Systems",
      description: "Advanced wireless network solutions for seamless connectivity."
    },
    {
      icon: <Cable className="w-8 h-8 text-gold-400" />,
      title: "Structured Cabling",
      description: "Professional cable management and infrastructure solutions."
    },
    {
      icon: <Radio className="w-8 h-8 text-gold-400" />,
      title: "Telecommunications",
      description: "Complete telecom solutions for business and industrial applications."
    },
    {
      icon: <Wrench className="w-8 h-8 text-gold-400" />,
      title: "Maintenance Services",
      description: "24/7 maintenance and support for all communication systems."
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/communications-hero.jpg"
          alt="Communications Infrastructure"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Advanced Communication Solutions
              </h1>
              <p className="text-xl text-white/90">
                Building tomorrow&apos;s communication infrastructure with cutting-edge technology and expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {['overview', 'services', 'expertise', 'projects'].map((tab) => (
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
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock support and maintenance services.</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Certified Experts</h3>
                <p className="text-gray-600">Industry-certified professionals and technicians.</p>
              </div>
              <div className="text-center">
                <TowerControl className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Latest Technology</h3>
                <p className="text-gray-600">State-of-the-art equipment and solutions.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us today to discuss your communication infrastructure needs.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gold-400 text-white px-8 py-3 rounded-lg 
                       font-medium hover:bg-gold-500 transition-colors"
            >
              Request a Consultation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

