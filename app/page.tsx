'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import TestimonialsSection from '@/components/Testimonials/TestimonialsSection';
import HeroWithLogo from '@/components/Hero/HeroWithLogo';
import ServicesSection from '@/components/Services/ServicesSection';


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

// Dynamically import heavy components
// const AnimatedServicesGrid = dynamic(
//   () => import('@/components/Services/AnimatedServicesGrid'),
//   { 
//     loading: () => <LoadingSection title="Our Services" />,
//   }
// );

const ProjectShowcase = dynamic(
  () => import('@/components/Projects/ProjectShowcase'),
  { loading: () => <LoadingSection title="Our Projects" /> }
);

// const AnimatedTestimonials = dynamic(
//   () => import('@/components/Testimonials/AnimatedTestimonials'),
//   { loading: () => <LoadingSection title="Testimonials" /> }
// );

const ContactSection = dynamic(
  () => import('@/components/Contact/ContactSection'),
  { loading: () => <LoadingSection title="Contact Us" /> }
);

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
 <HeroWithLogo/>

      {/* Services Section */}
      <Suspense fallback={<LoadingSection title="Our Services" />}>
        <ServicesSection />
      </Suspense>

      {/* Project Showcase */}
      <Suspense fallback={<LoadingSection title="Our Projects" />}>
        <ProjectShowcase />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<LoadingSection title="Testimonials" />}>
        <TestimonialsSection />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<LoadingSection title="Contact Us" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}