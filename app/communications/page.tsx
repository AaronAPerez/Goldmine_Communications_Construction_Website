'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Network, Server, Cable, Phone, Globe, Database, Shield, PenTool } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ServiceCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  services: string[];
}

const CommunicationsPage = () => {
  const { ref: servicesRef, isVisible: isServicesVisible } = useIntersectionObserver();


  const serviceCategories: ServiceCategory[] = [
    {
      icon: <Network className="w-8 h-8 text-gold-400" />,
      title: "Telecommunications",
      description: "Complete telecommunications infrastructure solutions for modern connectivity needs.",
      services: [
        "Underground/Aerial fiber optic installation",
        "Structured Cabling Systems",
        "Network Infrastructure",
        "Data Centers",
        "OSP Engineering",
        "Conduit Installation",
        "WiFi Solutions"
      ]
    },
    {
      icon: <Server className="w-8 h-8 text-gold-400" />,
      title: "Network Solutions",
      description: "Comprehensive network design and implementation services.",
      services: [
        "Data Network Installation",
        "Voice Network Installation",
        "Wireless Network Setup",
        "Network Security Systems",
        "Network Maintenance",
        "Network Upgrades",
        "Performance Monitoring"
      ]
    },
    {
      icon: <Database className="w-8 h-8 text-gold-400" />,
      title: "Data Center Services",
      description: "State-of-the-art data center solutions and maintenance.",
      services: [
        "Data Center Construction",
        "Equipment Installation",
        "Cooling Systems",
        "Power Distribution",
        "Security Systems",
        "Monitoring Solutions",
        "Maintenance Services"
      ]
    },
    {
      icon: <Globe className="w-8 h-8 text-gold-400" />,
      title: "Infrastructure Development",
      description: "Building robust communication infrastructure for future growth.",
      services: [
        "Infrastructure Planning",
        "Implementation Services",
        "System Integration",
        "Technology Upgrades",
        "Capacity Planning",
        "Infrastructure Audits",
        "Expansion Services"
      ]
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
                Advanced Communication Services
              </h1>
              <p className="text-xl text-white/90">
                Delivering cutting-edge telecommunications solutions with expertise and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Services Overview */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Comprehensive Communications Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From infrastructure development to network solutions, we provide end-to-end communication services for businesses of all sizes.
            </p>
          </div>

          {/* Service Categories Grid */}
          <div 
            ref={servicesRef}
            className={`
              grid md:grid-cols-2 gap-8 transition-all duration-1000
              ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            {serviceCategories.map((category, index) => (
              <div 
                key={category.title}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <h3 className="text-2xl font-semibold ml-3">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <ul className="space-y-3">
                    {category.services.map((service) => (
                      <li key={service} className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Phone className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock technical support and emergency services.</p>
              </div>
              <div className="text-center">
                <PenTool className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Maintenance</h3>
                <p className="text-gray-600">Preventive maintenance and system optimization services.</p>
              </div>
              <div className="text-center">
                <Cable className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Solutions</h3>
                <p className="text-gray-600">Tailored communication solutions for unique requirements.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us today to discuss your communication infrastructure needs.
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

export default CommunicationsPage;