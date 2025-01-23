import AboutSection from "@/components/AboutSection";

import HeroShowcase from "@/components/Hero/HeroShowcase";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import Contact from "@/pages/Contact";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports for better performance
const Services = dynamic(() => import("@/components/Services/Services"), {
  loading: () => <LoadingSection />
});

const ProjectPortfolio = dynamic(() => import("@/components/Projects/ProjectPortfolio"), {
  loading: () => <LoadingSection />
});

// const Testimonials = dynamic(() => import("@/components/Testimonials/Testimonials"), {
//   loading: () => <LoadingSection />
// });

// const Contact = dynamic(() => import("@/components/Contact/Contact"), {
//   loading: () => <LoadingSection />
// });

// Loading placeholder component
function LoadingSection() {
  return (
    <div className="w-full h-96 bg-gray-50 animate-pulse flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero Section - Load immediately as it's above the fold */}
      {/* <HeroDynamic />  */}
      <section id="Hero">
      <HeroShowcase />
   </section>

   <section id="About">
    <AboutSection/>
   </section>

      {/* Suspense boundaries for smooth loading */}
      <Suspense fallback={<LoadingSection />}>
        <Services />
      </Suspense>

      <Suspense fallback={<LoadingSection />}>
        <ProjectPortfolio />
      </Suspense>

      <Suspense fallback={<LoadingSection />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<LoadingSection />}>
        <Contact />
      </Suspense>
    </>
  );
}