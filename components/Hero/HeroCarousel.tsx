'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  monthlyPrice?: string;
  imageUrl: string;
  link: string;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Communications Infrastructure',
    subtitle: 'Building the Future',
    price: 'Custom Solutions',
    imageUrl: '/images/communications.jpg',
    link: '/services/communications'
  },
  {
    id: '2',
    title: 'Network Solutions',
    subtitle: 'Enterprise Grade',
    price: 'Tailored Pricing',
    imageUrl: '/images/network.jpg',
    link: '/services/network'
  },
  {
    id: '3',
    title: 'Construction Services',
    subtitle: 'Professional Excellence',
    price: 'Project Based',
    imageUrl: '/images/construction-site-1.jpg',
    link: '/services/construction'
  },
  {
    id: '4',
    title: 'Maintenance Support',
    subtitle: '24/7 Service',
    price: 'Flexible Plans',
    imageUrl: '/images/NeonSafetyVest.jpg',
    link: '/services/maintenance'
  }
];

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % products.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setIsAutoPlaying(true);
  };

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <div className="text-center my-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The latest.
            <span className="text-gray-400 font-normal ml-2">
              Take a look at what&apos;s new, right now.
            </span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                   
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {product.subtitle}
                    </p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-medium">
                        {product.price}
                      </span>
                      {product.monthlyPrice && (
                        <span className="text-sm text-gray-400">
                          {product.monthlyPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === activeIndex 
                    ? 'w-8 bg-white' 
                    : 'bg-gray-600 hover:bg-gray-400'}
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={() => goToSlide((activeIndex - 1 + products.length) % products.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((activeIndex + 1) % products.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;