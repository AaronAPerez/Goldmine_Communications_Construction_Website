'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import AnimatedHero from '@/components/Hero/AnimatedHero';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

// Dynamically import heavy components
const AnimatedServicesGrid = dynamic(
  () => import('@/components/Services/AnimatedServicesGrid'),
  { 
    loading: () => <LoadingSection title="Our Services" />,
    ssr: false // Disable SSR for components with mouse interactions
  }
);

const ProjectShowcase = dynamic(
  () => import('@/components/Projects/ProjectShowcase'),
  { loading: () => <LoadingSection title="Our Projects" /> }
);

const AnimatedTestimonials = dynamic(
  () => import('@/components/Testimonials/AnimatedTestimonials'),
  { loading: () => <LoadingSection title="Testimonials" /> }
);

const ContactSection = dynamic(
  () => import('@/components/Contact/ContactSection'),
  { loading: () => <LoadingSection title="Contact Us" /> }
);

// Loading placeholder component
function LoadingSection({ title }: { title: string }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
          <LoadingSpinner size="lg" />
        </div>
      </div>
    </section>
  );
}

// Mock data
const services = [
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

const projects = [
  {
    id: 'AV Charging Stations-2024',
    title: 'Orgean AV Charging Implementation',
    description: 'Complete AV Charging Station installation in gas parking area.',
    category: 'communications',
    imageUrl: '/images/WorkOreganPics/image21.jpeg',
    completionDate: '2024-10',
    client: 'Metro City Council',
    location: 'Metropolitan Area',
    tags: ['AV Charging Station', 'Urban Development'],
    highlights: [
      'Installed 200+ miles of fiber optic cable',
      'Connected 50,000+ households',
      'Achieved 99.99% network reliability'
    ],
    specifications: {
      'Network Speed': '10Gbps',
      'Coverage Area': '150 sq miles',
      'Completion Time': '18 months'
    }
  },
  // ... more projects
];

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'communications', label: 'Communications' },
  { id: 'construction', label: 'Construction' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'maintenance', label: 'Maintenance' }
];

const testimonials = [
  {
    id: '1',
    author: 'John Smith',
    role: 'Chief Technology Officer',
    company: 'TechCorp Industries',
    content: 'The team at Goldmine delivered exceptional results. Their expertise in both communications and construction made them the perfect partner for our complex infrastructure project.',
    image: '/images/testimonials/john-smith.jpg'
  },
  {
    id: '1',
    author: 'John Smith',
    role: 'Chief Technology Officer',
    company: 'TechCorp Industries',
    content: 'The team at Goldmine delivered exceptional results. Their expertise in both communications and construction made them the perfect partner for our complex infrastructure project.',
    image: '/images/testimonials/john-smith.jpg'
  },
  {
    id: '1',
    author: 'John Smith',
    role: 'Chief Technology Officer',
    company: 'TechCorp Industries',
    content: 'The team at Goldmine delivered exceptional results. Their expertise in both communications and construction made them the perfect partner for our complex infrastructure project.',
    image: '/images/testimonials/john-smith.jpg'
  },
  // ... more testimonials
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <AnimatedHero />
  

      {/* Services Section */}
      <Suspense fallback={<LoadingSection title="Our Services" />}>
        <AnimatedServicesGrid services={services} />
      </Suspense>

      {/* Project Showcase */}
      <Suspense fallback={<LoadingSection title="Our Projects" />}>
        <ProjectShowcase projects={projects} />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<LoadingSection title="Testimonials" />}>
        <AnimatedTestimonials testimonials={testimonials} />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<LoadingSection title="Contact Us" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}