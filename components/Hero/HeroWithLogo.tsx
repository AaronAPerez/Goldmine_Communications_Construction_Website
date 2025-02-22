
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Network, Building2, Shield, Wrench } from 'lucide-react';

interface HeroImage {
    src: string;
    alt: string;
}

const heroImages: HeroImage[] = [
    {
        src: '/images/communications.jpg',
        alt: 'Communications infrastructure installation'
    },
    {
        src: '/images/PouringConcrete.jpg',
        alt: 'Construction site with concrete pouring'
    },
    {
        src: '/images/WorkOregonPics/AvStation.jpg',
        alt: 'Active construction project'
    }
];

const features = [
    {
        icon: <Building2 className="w-8 h-8" />,
        title: 'Construction',
        description: 'Professional construction services'
    },
    {
        icon: <Network className="w-8 h-8" />,
        title: 'Communications',
        description: 'Advanced infrastructure solutions'
    },
    {
        icon: <Shield className="w-8 h-8" />,
        title: 'Security',
        description: 'Comprehensive security systems'
    },
    {
        icon: <Wrench className="w-8 h-8" />,
        title: 'Maintenance',
        description: '24/7 support and maintenance'
    }
];

export default function HeroWithLogo() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden" aria-label="Hero section">
            {/* Background Image Carousel */}
            <AnimatePresence mode="wait">
                {heroImages.map((image, index) => (
                    index === currentImageIndex && (
                        <motion.div
                            key={image.src}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`
            absolute inset-0 transition-opacity duration-1000
            ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}
          `}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Building Tomorrow&apos;s
                                <span className="text-gold-400"> Infrastructure</span>
                            </h1>
                            <p className="text-xl text-white/90 mb-8">
                                Excellence in construction and communications infrastructure,
                                delivering innovative solutions with unmatched expertise.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mb-12">
                                <motion.a
                                    href="/contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-gold-400 text-white rounded-lg font-medium 
                           hover:bg-gold-500 transition-colors"
                                >
                                    Get Started
                                </motion.a>
                                <motion.a
                                    href="/services"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 border-2 border-white text-white rounded-lg 
                           font-medium hover:bg-white/10 transition-colors"
                                >
                                    Our Services
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Circular Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative w-72 h-72 md:w-96 md:h-96">
                                <Image
                                    src="/images/logo-circular.png"
                                    alt="Goldmine Communications and Construction"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/10 to-transparent" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-gold-400">{feature.icon}</div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">
                                            {feature.title}
                                        </h2>
                                        <p className="text-white/80 text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Carousel Navigation */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${currentImageIndex === index
                                ? 'w-8 bg-gold-400'
                                : 'bg-white/50 hover:bg-white/75'}
            `}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={currentImageIndex === index}
                    />
                ))}
            </div>
        </section>
    );
}