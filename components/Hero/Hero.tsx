'use client';

import { Button } from '@headlessui/react';
import Image from 'next/image';
import Logo from'../../public/icons/GoldMine Logo.jpg'

const Hero = () => {
  return (
    <section 
      className="relative h-screen flex items-center"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/icons/GoldMine-Logo.png" // You'll need a high-quality construction/communications image
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Building Tomorrow's Infrastructure Today
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Excellence in Communications and Construction Services Since 2022
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-gold-400 hover:bg-gold-500 text-black px-8 py-3 rounded-lg"
              aria-label="Get a free quote"
            >
              Get a Free Quote
            </Button>
            <Button 
              onClick={() => window.location.href = '/projects'}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg transition-colors duration-200"
              aria-label="View our projects"
            >
              View Our Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;