'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
                            className="absolute inset-0 transition-opacity duration-1000"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
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
                            className="text-center lg:text-left"
                        >
                            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                                Building Tomorrow&apos;s
                                <span className="text-gold-400 block sm:inline"> Infrastructure</span>
                                <span className="text-gold-400"> Today.</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                                Excellence in construction and communications infrastructure,
                                delivering innovative solutions with unmatched expertise.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 sm:mb-12">
                                <motion.a
                                    href="/contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 sm:px-8 py-3 bg-gold-400 text-white rounded-lg font-medium 
                                   hover:bg-gold-500 transition-colors"
                                >
                                    Get Started
                                </motion.a>
                                <motion.a
                                    href="/services"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-lg 
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
                            className="flex justify-center"
                        >
                            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
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