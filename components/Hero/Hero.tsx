'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Link from 'next/link';

// Import your Lottie animation data
// You can use animations from lottiefiles.com
const constructionAnimation = {
  // This is a simplified version of construction-themed animation data
  // Replace this with your actual Lottie JSON data
  v: "5.7.4",
  fr: 29.9700012207031,
  ip: 0,
  op: 180.00000733155,
  w: 1920,
  h: 1080,
  // ... rest of your Lottie JSON
};

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant: 'primary' | 'secondary';
  href?: string;
}

const AnimatedButton = ({ children, onClick, variant, href }: AnimatedButtonProps) => {
  const baseStyles = "px-8 py-3 rounded-lg font-medium transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  const variantStyles = variant === 'primary'
    ? "bg-gold-400 hover:bg-gold-500 text-black focus:ring-gold-400"
    : "border-2 border-white text-white hover:bg-white hover:text-black focus:ring-white";

  if (href) {
    return (
      <Link 
        href={href}
        className={`${baseStyles} ${variantStyles}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles}`}
    >
      {children}
    </button>
  );
};

const LottieHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Lottie Animation Container */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-full h-full max-w-7xl">
            <Lottie
              animationData={constructionAnimation}
              loop={true}
              className="w-full h-full"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`
            text-center transform transition-all duration-1000
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}
        >
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6">
            Building Tomorrow&apos;s
            <span className="text-gold-400 block mt-2">
              Infrastructure Today
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Excellence in Communications and Construction Services
          </p>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { value: '150+', label: 'Projects Completed' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '25+', label: 'Expert Team Members' },
              { value: '10+', label: 'Years Experience' },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={`
                  transform transition-all duration-700
                  ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-gold-400 text-3xl sm:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton 
              variant="primary"
              href="/contact"
            >
              Get Started
            </AnimatedButton>
            <AnimatedButton 
              variant="secondary"
              href="/projects"
            >
              View Projects
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-900 to-transparent" />
    </section>
  );
}

export default LottieHero;