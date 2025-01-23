'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Project Manager",
    company: "Tech Solutions Inc",
    content: "Exceptional service and professional team. They completed our infrastructure project ahead of schedule.",
    rating: 5
  },
  // Add more testimonials
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const swipeConfidenceThreshold = 10000;

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-12">
      <div className="relative h-[300px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
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
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                {testimonials[currentIndex].image ? (
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gold-400 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {testimonials[currentIndex].name[0]}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-gray-400">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-lg italic">
                {testimonials[currentIndex].content}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-gold-400 w-4' : 'bg-gray-600'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/20 rounded-full backdrop-blur-sm"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/20 rounded-full backdrop-blur-sm"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Autoplay Control */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-0 right-0 text-sm text-gray-400 hover:text-white"
        aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
      >
        {isAutoPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default TestimonialsCarousel;