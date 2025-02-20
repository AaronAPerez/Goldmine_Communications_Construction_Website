'use client';

import React from 'react'
import { Service } from '@/types/service';
import ServiceCard from '../../../components/Services/ServiceCard';



const services: Service[] = [
  {
    id: 'communications',
    title: 'Communications Infrastructure',
    description: 'Complete communications solutions for modern connectivity needs',
    icon: 'network-tower',
    features: [
      'Fiber Optic Installation',
      'Network Infrastructure',
      'Wireless Solutions',
      'Data Center Construction',
      'Telecommunications Equipment'
    ]
  },
  {
    id: 'construction',
    title: 'Construction Services',
    description: 'Professional construction services for commercial and industrial projects',
    icon: 'building',
    features: [
      'Commercial Construction',
      'Site Development',
      'Infrastructure Development',
      'Project Management',
      'Equipment Installation'
    ]
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: '24/7 maintenance and support services for all installations',
    icon: 'tools',
    features: [
      'Preventive Maintenance',
      'Emergency Repairs',
      'System Upgrades',
      'Performance Monitoring',
      'Technical Support'
    ]
  },
  {
    id: 'consulting',
    title: 'Consulting & Design',
    description: 'Expert consultation and design services for your projects',
    icon: 'blueprint',
    features: [
      'Project Planning',
      'Technical Design',
      'Feasibility Studies',
      'Cost Analysis',
      'Regulatory Compliance'
    ]
  }
];


const Services = () => {
  return (
    <section 
      className="py-20"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            id="services-heading"
            className="text-3xl md:text-4xl font-bold text-primary-900 mb-4"
          >
            Our Comprehensive Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Providing cutting-edge communications and construction solutions
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
