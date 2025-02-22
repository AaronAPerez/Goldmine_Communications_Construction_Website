'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  category: string;
}

// Sample project data incorporating the Oregon work
const projects: Project[] = [
  {
    id: 'oregon-av-charging',
    title: 'Oregon AV Charging Station Installation',
    description: 'Complete AV charging station installation with infrastructure upgrades and safety implementations.',
    images: [
      '/images/WorkOregonPics/AvStation.jpg',
      '/images/WorkOregonPics/image3.jpeg',
      '/images/WorkOregonPics/image21.jpeg',
    ],
    location: 'Chemult, Oregon',
    category: 'Infrastructure'
  },
  {
    id: 'hospital-renovation',
    title: 'Hospital Construction & Renovation',
    description: 'Comprehensive hospital construction with over 15 years of experience, including ADA compliance and specialized medical facility requirements.',
    images: [
      '/images/communications.jpg',
      '/images/WorkOreganPics/image1.jpeg',
      '/images/WorkOreganPics/image2.jpeg'
    ],
    location: 'San Jose, CA',
    category: 'Healthcare'
  }
];

const ProjectShowcase = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setCurrentImage(0);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setCurrentImage(0);
  };

  const nextImage = () => {
    setCurrentImage((prev) => 
      (prev + 1) % projects[currentProject].images.length
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) => 
      (prev - 1 + projects[currentProject].images.length) % projects[currentProject].images.length
    );
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400">
            Explore our portfolio of successful construction and infrastructure projects
          </p>
        </div>

        {/* Project Showcase */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Showcase */}
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <motion.div
              key={`${currentProject}-${currentImage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src={projects[currentProject].images[currentImage]}
                alt={projects[currentProject].title}
                fill
                className="object-cover"
              />
              
              {/* Image Navigation */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={prevImage}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImage + 1} / {projects[currentProject].images.length}
              </div>
            </motion.div>
          </div>

          {/* Project Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {projects[currentProject].title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {projects[currentProject].description}
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-gold-400/20 text-gold-400 text-sm">
                    {projects[currentProject].category}
                  </span>
                  <span className="text-gray-400">
                    {projects[currentProject].location}
                  </span>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex gap-2 mb-6">
                  {projects[currentProject].images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImage === index ? 'bg-gold-400 w-8' : 'bg-gray-600'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Project Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={prevProject}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Project
                  </button>
                  <button
                    onClick={nextProject}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Next Project
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">
              Goldmine Communications and Construction Inc.
            </h3>
            <p className="text-gray-300 mb-4">
              Lic# 1099543 | Bonded & Insured
            </p>
            <div className="text-gold-400">
              <p>946 Lincoln Ave, San Jose, CA 95125</p>
              <p>Call Victor Valles: (510) 695-3177</p>
              <a 
                href="http://www.goldminecomm.net" 
                className="hover:text-gold-300 transition-colors"
              >
                www.goldminecomm.net
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;