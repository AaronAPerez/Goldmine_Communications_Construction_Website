'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const projectImages = [
  {
    src: '/images/WorkOregonPics/image9.jpeg',
    alt: 'Construction site work',
    title: 'Healthcare Facility Construction'
  },
  {
    src: '/images/WorkOregonPics/image14.jpeg',
    alt: 'Communications infrastructure',
    title: 'Network Infrastructure'
  },
  {
    src: '/images/WorkOregonPics/image15.jpeg',
    alt: 'AV installation work',
    title: 'AV System Installation'
  },
  {
    src: '/images/WorkOregonPics/image16.jpeg',
    alt: 'Charging station installation',
    title: 'EV Charging Solutions'
  }
];

const testimonials = [
  {
    quote: "Goldmine's expertise in healthcare facility construction is unmatched. They understand our unique needs and deliver exceptional results.",
    name: "Healthcare Facility Director",
    title: "Major Medical Center"
  },
  {
    quote: "Their attention to detail and commitment to safety make them our go-to contractor for all communications infrastructure projects.",
    name: "IT Operations Manager",
    title: "Technology Company"
  },
  {
    quote: "Professional team, excellent communication, and quality workmanship. Highly recommended for any construction project.",
    name: "Project Manager",
    title: "Commercial Development"
  }
];

export default function AboutSection2() {
  return (
    <section className="py-24" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Building Excellence in Communications & Construction
            </h2>
            
            <div className="space-y-6 text-gray-600">
              <p className="text-lg">
                With over 15 years of specialized experience in healthcare facility 
                construction and communications infrastructure, Goldmine brings unmatched 
                expertise to every project.
              </p>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <p className="font-medium mb-4">Our areas of expertise include:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Healthcare Facility Construction",
                    "Communications Infrastructure",
                    "Network Solutions",
                    "ADA Compliance",
                    "Safety Systems",
                    "24/7 Emergency Services"
                  ].map((specialty) => (
                    <li key={specialty} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                      <span>{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Image Grid - UPDATED WITH Image */}
          <div className="grid grid-cols-2 gap-4">
            {projectImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative h-48 lg:h-64 rounded-xl overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 
                            group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
                    // These are below-the-fold images, no priority needed
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Image overlay text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-medium text-sm">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Section - Optional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <blockquote className="text-gray-600 italic mb-4">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}