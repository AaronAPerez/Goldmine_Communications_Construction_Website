'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import ProjectShowcase from '../Projects/ProjectShowcase';
import BenefitsSection from '../sections/BenefitsSection';
import HeroCarousel from '../Hero/HeroCarousel';
import AboutSection from '../sections/AboutSection';
import CommunicationsSection from '../sections/CommunicationsSection';
import ConstructionSection from '../sections/ConstructionSection';
import ContactSection from '../Contact/ContactSection';

/**
 * Enhanced Homepage Component with Carousel Hero
 * 
 * Features:
 * - Enhanced hero section with background image carousel
 * - Proper spacing for top contact bar and navigation
 * - Scroll-triggered animations
 * - Section navigation helpers
 * - Accessibility enhancements
 */
const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });


  // Skip links for accessibility
  const SkipLinks = () => (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-gold-400 text-white 
                   rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
      >
        Skip to main content
      </a>
      <a
        href="#about"
        className="absolute top-4 left-32 z-50 px-4 py-2 bg-gold-400 text-white 
                   rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
      >
        Skip to about section
      </a>
    </div>
  );

  // Progress indicator
  const ProgressIndicator = () => {
    const progressRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(progressRef);

    return (
      <motion.div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-gold-400 to-gold-500"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </motion.div>
    );
  };

  return (
    <>
      <SkipLinks />
      <ProgressIndicator />
      
      <div 
        ref={containerRef}
        className="flex flex-col min-h-screen overflow-hidden"
        role="main"
        id="main-content"
      >

        <HeroCarousel/>

        {/* About Section */}
        <SectionWrapper id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <AboutSection />
        </SectionWrapper>

        {/* Communications Services Section */}
        <SectionWrapper id="communications" className="py-24 bg-gray-900">
          <CommunicationsSection />
        </SectionWrapper>

        {/* Construction Services Section */}
        <SectionWrapper id="construction" className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <ConstructionSection />
        </SectionWrapper>

        {/* Project Showcase */}
        <SectionWrapper id="projects" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Recent
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                  {' '}Projects
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Showcasing our expertise in communications infrastructure and construction excellence.
              </p>
            </motion.div>
            <ProjectShowcase />
          </div>
        </SectionWrapper>

        {/* Benefits & Why Choose Us */}
        <SectionWrapper id="benefits" className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                  {' '}Goldmine
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Excellence, reliability, and innovation in every project we undertake.
              </p>
            </motion.div>
            <BenefitsSection />
          </div>
        </SectionWrapper>

        {/* Contact Section */}
        <SectionWrapper id="contact" className="bg-gray-900">
          <ContactSection />
        </SectionWrapper>

        {/* Final CTA Section */}
        <SectionWrapper id="final-cta" className="py-16 bg-gold-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Contact us today for a free consultation and let&apos;s bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-3 bg-white text-gold-600 
                           hover:bg-gray-50 font-medium rounded-lg transition-colors shadow-lg"
                >
                  Get Free Consultation
                </motion.a>
                <motion.a
                  href="tel:+19253055980"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-3 border-2 border-white
                           text-white hover:bg-white hover:text-gold-600 font-medium 
                           rounded-lg transition-colors"
                >
                  Call Now: (925) 305-5980
                </motion.a>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

/**
 * Reusable Section Wrapper Component
 * 
 * Provides consistent scroll animations and accessibility features
 * for all page sections
 */
interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ id, className = '', children }: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: "-100px"
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] // Custom easing for smoother animations
      }}
      // Accessibility enhancements
      tabIndex={-1}
      aria-label={`${id} section`}
    >
      {children}
    </motion.section>
  );
};

export default HomePage;