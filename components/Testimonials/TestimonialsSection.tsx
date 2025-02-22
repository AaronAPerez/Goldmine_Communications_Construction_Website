'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'John Smith',
    role: 'Project Manager',
    company: 'Tech Innovations Inc.',
    content: 'Goldmine Communications delivered exceptional results on our office complex project. Their attention to detail and commitment to quality exceeded our expectations.',
    image: '/images/testimonials/john-smith.jpg',
    rating: 5
  },
  {
    id: '2',
    author: 'Sarah Johnson',
    role: 'Facility Director',
    company: 'Healthcare Solutions',
    content: 'Working with Goldmine was a pleasure. Their team\'s expertise in healthcare facility construction and communications infrastructure was invaluable.',
    image: '/images/testimonials/sarah-johnson.jpg',
    rating: 5
  },
  {
    id: '3',
    author: 'Michael Chen',
    role: 'Operations Director',
    company: 'Data Systems Corp',
    content: 'The team at Goldmine demonstrated outstanding professionalism and technical expertise throughout our data center construction project.',
    image: '/images/testimonials/michael-chen.jpg',
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, isVisible } = useIntersectionObserver();

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-24 bg-gray-50 overflow-hidden"
      aria-label="Client testimonials"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gold-400/5" />
        <Quote 
          size={400} 
          className="absolute top-0 left-0 text-gold-400/10 -rotate-12"
          aria-hidden="true"
        />
        <Quote 
          size={300} 
          className="absolute bottom-0 right-0 text-gold-400/10 rotate-180"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read what our clients say about their experience working with us.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              {/* Testimonial Content */}
              <div className="relative px-6">
                <Quote 
                  size={40} 
                  className="absolute -top-4 -left-4 text-gold-400"
                  aria-hidden="true"
                />
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl text-gray-700 mb-8 italic"
                >
                  {testimonials[currentIndex].content}
                </motion.blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonials[currentIndex].author}
                    </h3>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-gold-400">
                      {testimonials[currentIndex].company}
                    </p>
                    {/* Rating Stars */}
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-gold-400 text-gold-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between -mx-4 md:-mx-12">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white/80 shadow-lg hover:bg-white 
                       transition-colors group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 
                                    group-hover:text-gold-400 transition-colors" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/80 shadow-lg hover:bg-white 
                       transition-colors group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 
                                     group-hover:text-gold-400 transition-colors" />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
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