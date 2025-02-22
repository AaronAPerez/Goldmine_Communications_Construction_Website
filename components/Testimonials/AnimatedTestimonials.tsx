'use client';

import React,{ useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
}

export default function AnimatedTestimonials({ testimonials }: AnimatedTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Memoize startAutoPlay function with useCallback
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, [testimonials.length]);

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, startAutoPlay]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => 
      (prev + 1) % testimonials.length
    );
  };

  const handleTestimonialSelect = (index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 right-1/2 w-screen bg-gold-400/10 rounded-r-3xl" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <Quote 
              size={400} 
              className="text-gold-400/10 rotate-180"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="relative mx-auto max-w-4xl"
            >
              <div className="text-center">
                {/* Testimonial Image */}
                <motion.div 
                  className="relative mx-auto w-28 h-28 mb-6"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    fill
                    className="rounded-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-gold-400" />
                </motion.div>

                {/* Testimonial Content */}
                <motion.blockquote
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-gray-900 font-medium italic mb-6"
                >
                  {testimonials[currentIndex].content}
                </motion.blockquote>

                {/* Author Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="font-semibold text-xl text-gray-900">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-gold-400">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentIndex].company}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
            <button
              onClick={handlePrevious}
              className="group relative -left-4 lg:-left-12 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-gold-400 transition-colors" />
            </button>
            <button
              onClick={handleNext}
              className="group relative -right-4 lg:-right-12 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-gold-400 transition-colors" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute pt-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTestimonialSelect(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${currentIndex === index 
                    ? 'w-8 bg-gold-400' 
                    : 'bg-gray-300 hover:bg-gold-200'}
                `}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={currentIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}