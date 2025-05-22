'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowRight, Phone, ChevronLeft, ChevronRight, Play, Pause, Shield, Clock, Award, Target } from 'lucide-react';
import OptimizedImage from '@/components/common/OptimizedImage';
import AnimatedText from '../ui/AnimatedText';
import CarouselDots from './CarouselDots';
import ParticleEffect from './ParticleEffect';

/**
 * Hero Section with Background Image Carousel
 * 
 * Features:
 * - Automatic slideshow with manual controls
 * - Smooth transitions with optimized performance
 * - Proper spacing for top contact bar and navigation
 * - Accessibility features including play/pause controls
 * - Responsive design with mobile optimization
 * - Updated with new color scheme: Primary Gold (#B3995D) and Accent Red (#AA0000)
 * - Improved spacing and responsive layout for all screen sizes
 */

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  priority?: boolean; // For Next.js Image optimization
}

// Carousel slides with project showcase images
const heroSlides: HeroSlide[] = [
  {
    id: 'charging-stations',
    image: '/images/WorkOregonPics/AvStation.jpg',
    title: 'EV Charging Solutions',
    subtitle: 'Clean Energy Technology',
    description: 'Future-ready electric vehicle charging infrastructure and IoT solutions.',
    priority: true // First image loads with priority
  },
  {
    id: 'communications',
    image: '/images/optimized/webp/communications.webp',
    title: 'Advanced Communications',
    subtitle: 'Network Infrastructure Solutions',
    description: 'Cutting-edge telecommunications and fiber optic systems for the connected world.',
  },
  {
    id: 'construction',
    image: '/images/optimized/webp/PouringConcrete.webp',
    title: 'Professional Construction',
    subtitle: 'Healthcare & Commercial Projects',
    description: 'Expert construction services with 15+ years of specialized healthcare experience.',
  },
  {
    id: 'charging-stations',
    image: '/images/optimized/webp/AvStation.webp',
    title: 'EV Charging Solutions',
    subtitle: 'Clean Energy Technology',
    description: 'Future-ready electric vehicle charging infrastructure and IoT solutions.',
  }
];

/**
 * Main Hero Carousel Component
 */
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });


  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center"
      aria-labelledby="hero-heading"
    >
      {/* Background gradient or image */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <OptimizedImage
              src={currentSlideData.image}
              alt={`${currentSlideData.title} - ${currentSlideData.subtitle}`}
              fill
              className="object-cover"
              priority={currentSlideData.priority}
              width={1920}
              height={1080}
              quality={90}
              sizes="100vw"
            />
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
            {/* Subtle pattern overlay for depth */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* License info banner - positioned at the top with proper margins */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gold-400/90 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm font-medium text-gray-900">Lic# 1099543 | Bonded & Insured</div>
          <div className="flex space-x-4">
            <a href="tel:+19253055980" aria-label="Call us" className="text-gray-900 hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </a>
            <a href="mailto:info@goldminecomm.net" aria-label="Email us" className="text-gray-900 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Content Container - Proper padding for all screen sizes */}
      <div className="relative z-10 flex items-center min-h-screen pt-20 lg:pt-3">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Mobile Logo - Positioned with proper spacing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:hidden flex flex-col items-center mb-6 mt-8"
          >
            {/* Company Info - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-center mt-4"
            >
              <h2 className="text-2xl font-bold text-gold-400 mb-1 text-shadow">
                Goldmine Communications
              </h2>
              <div className="text-xl text-gray-100 text-shadow-sm">
                & Construction
              </div>
            </motion.div>

            <div className="relative">
              {/* Mobile decorative rings */}
              <motion.div
                className="absolute inset-0 border-2 border-gold-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transform: 'scale(1.1)' }}
              />
              <motion.div
                className="absolute inset-0 border border-gold-400/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ transform: 'scale(1.2)' }}
              />

              {/* Mobile Logo */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44">
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-gold-400/60 bg-white/10 backdrop-blur-sm">
                  <OptimizedImage
                    src="/images/optimized/webp/logo-circular.webp"
                    alt="Goldmine Communications and Construction"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400/30 to-gold-600/30 rounded-full blur-xl -z-10" />
              </div>
            </div>


          </motion.div>

          {/* Desktop layout grid distribution with proper spacing */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-16 lg:min-h-100vh] pb-32 pt-4 lg:py-24">
            {/* Content Column - Takes up 7 columns for better balance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white text-center lg:text-left lg:col-span-7 lg:self-center"
            >
              {/* Main Heading - Enhanced typography and proper spacing */}
              <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight pt-4">
                <AnimatedText
                  text="Building"
                  className="text-white text-shadow-lg w-full"
                  delay={0.5}
                />
                <AnimatedText
                  text="Tomorrow's"
                  className="text-gold-400 text-shadow-lg"
                  delay={0.7}
                />
                <AnimatedText
                  text="Infrastructure"
                  className="text-white text-shadow-lg"
                  delay={0.9}
                />
              </h1>

              {/* Subtitle with proper spacing */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-sm sm:text-base lg:text-lg text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto lg:mx-0 text-shadow-sm px-2 sm:px-0"
              >
                Professional communications and construction services with over 15 years
                of specialized experience in cutting-edge technology integration.
              </motion.p>

              {/* Call-to-Action Buttons with improved responsive spacing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center justify-center px-6 py-2 sm:px-8 sm:py-4 
                           bg-gradient-to-r from-gold-400 to-gold-600 text-white
                           rounded-lg font-semibold text-md transition-all duration-300
                           shadow-md hover:shadow-lg hover:shadow-gold-400/25 backdrop-blur-sm"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  href="tel:+19253055980"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4
                           border-2 border-white/80 text-white rounded-lg font-semibold text-md
                           hover:bg-white hover:text-gray-900 transition-all duration-300 
                           backdrop-blur-sm"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  (925) 305-5980
                </motion.a>
              </motion.div>

              {/* Trust Indicators - Responsive layout */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 max-w-4xl mx-auto lg:mx-0"
              >
                {[
                  { text: 'Licensed & Insured', icon: <Shield className="w-4 h-4 text-gold-400" /> },
                  { text: '15+ Years Experience', icon: <Clock className="w-4 h-4 text-gold-400" /> },
                  { text: 'Quality Guarantee', icon: <Award className="w-4 h-4 text-gold-400" /> },
                  { text: 'On-Time Delivery', icon: <Target className="w-4 h-4 text-gold-400" /> }
                ].map(({ text, icon }) => (
                  <div key={text} className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-2 border border-white/10">
                    <div className="mr-2">{icon}</div>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Desktop Logo & Company Info Column - 5 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:flex flex-col items-center justify-center lg:col-span-5"
            >
              <div className="relative text-center">
                {/* Desktop decorative rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-gold-400/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: '280px',
                    height: '280px',
                    transform: 'scale(1.1) translate(-50%, -50%)',
                    left: '50%',
                    top: '50%'
                  }}
                />
                <motion.div
                  className="absolute inset-0 border border-gold-400/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: '320px',
                    height: '320px',
                    transform: 'scale(1.2) translate(-50%, -50%)',
                    left: '50%',
                    top: '50%'
                  }}
                />
                <motion.div
                  className="absolute inset-0 border border-red-600/15 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: '360px',
                    height: '360px',
                    transform: 'scale(1.3) translate(-50%, -50%)',
                    left: '50%',
                    top: '50%'
                  }}
                />

                {/* Desktop Logo - Properly sized */}
                <div className="relative w-64 h-64 xl:w-72 xl:h-72 mx-auto">
                  <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-gold-400/60 bg-white/10 backdrop-blur-sm py-12">
                    <OptimizedImage
                      src="/images/optimized/webp/logo-circular.webp"
                      alt="Goldmine Communications and Construction"
                      fill
                      className="object-contain p-6"
                      priority
                    />
                  </div>
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400/40 to-gold-600/40 rounded-full blur-2xl -z-10" />
                </div>

                {/* Company Info - Desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-6"
                >
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gold-400 mb-2 text-shadow">
                    Goldmine Communications
                  </h2>
                  <div className="text-2xl lg:text-3xl xl:text-4xl text-gray-100 text-shadow-sm">
                    & Construction
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Carousel Controls - Better positioned */}
      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {/* Control Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 mr-4 sm:mr-8">
              <button
                onClick={prevSlide}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 border border-white/20 
                         text-white hover:bg-white/20 transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black/50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={togglePlayPause}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 border border-white/20 
                         text-white hover:bg-white/20 transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black/50"
                aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
              >
                {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              <button
                onClick={nextSlide}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 border border-white/20 
                         text-white hover:bg-white/20 transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black/50"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Navigation Dots */}
            <CarouselDots
              slides={heroSlides}
              currentIndex={currentSlide}
              onDotClick={setCurrentSlide}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-white/60 cursor-pointer text-center hover:text-white/80 transition-colors"
          onClick={() => {
            const aboutSection = document.getElementById('about-services');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to explore"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const aboutSection = document.getElementById('about-services');
              aboutSection?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs mb-2 font-medium">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? 'bg-gold-400/60' : i % 3 === 1 ? 'bg-red-600/40' : 'bg-white/40'
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Screen reader live region for slide changes */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Currently showing: {currentSlideData.title} - {currentSlideData.subtitle}
      </div>
      {/* Use the client-only particle effect */}
      <ParticleEffect />
    </section>
  );
};

export default HeroCarousel;