import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import AnimatedHero from '@/components/Hero/AnimatedHero';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { services, projects, testimonials } from '@/data/siteData';

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
const AnimatedServicesGrid = dynamic(
  () => import('@/components/Services/AnimatedServicesGrid'),
  { 
    loading: () => <LoadingSection title="Our Services" />,
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