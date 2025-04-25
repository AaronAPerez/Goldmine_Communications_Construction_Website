'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Tag, MapPin, Calendar, X } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Define project interface
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  thumbnailUrl: string;
  galleryImages: string[];
  features: string[];
  specifications?: {
    [key: string]: string;
  };
}

// Sample project data
const projects: Project[] = [
  {
    id: 'av-charging-oregon',
    title: 'Oregon AV Charging Infrastructure',
    description: 'Comprehensive implementation of EV charging stations with advanced infrastructure support and safety systems.',
    category: 'Infrastructure',
    location: 'Chemult, Oregon',
    completionDate: '2024',
    thumbnailUrl: '/images/WorkOregonPics/AvStation.jpg',
    galleryImages: [
      '/images/WorkOregonPics/AvStation.jpg',
      '/images/WorkOregonPics/image3.jpeg',
      '/images/WorkOregonPics/image21.jpeg'
    ],
    features: [
      'High-capacity charging infrastructure',
      'Advanced safety systems',
      'Environmental compliance',
      'Full site development'
    ]
  },
  {
    id: 'hospital-renovation',
    title: 'Medical Facility Construction',
    description: 'State-of-the-art medical facility construction incorporating advanced communications infrastructure and specialized healthcare requirements.',
    category: 'Healthcare',
    location: 'San Jose, CA',
    completionDate: '2023',
    thumbnailUrl: '/images/communications.jpg',
    galleryImages: [
      '/images/communications.jpg',
      '/images/WorkOregonPics/image1.jpeg',
      '/images/WorkOregonPics/image2.jpeg'
    ],
    features: [
      'ADA compliance implementation',
      'Specialized medical infrastructure',
      'Advanced security systems',
      'Emergency power systems'
    ]
  }
];

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { ref, isVisible } = useIntersectionObserver();
  const [modalOpen, setModalOpen] = useState(false);

  // Handle modal open/close
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  // Close modal with ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = ''; // Clean up on unmount
    };
  }, [modalOpen]);

  // Filter projects based on category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <section ref={ref} className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Latest Projects
          </h2>
          <p className="text-xl text-gray-400">
            Showcasing our expertise in construction and infrastructure development
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-gold-400 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
              `}
              aria-pressed={selectedCategory === category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 20 
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-black/70 rounded-xl border overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
            >
              {/* Project Image */}
              <div 
                className="relative aspect-video cursor-pointer"
                onClick={() => openModal(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openModal(project);
                  }
                }}
                aria-label={`View details for ${project.title}`}
              >
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-gold-400" />
                  <span className="text-sm text-gold-400">{project.category}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.completionDate}
                  </div>
                </div>

                <button
                  onClick={() => openModal(project)}
                  className="mt-4 w-full py-2 px-4 bg-gold-400 text-white rounded-lg
                           hover:bg-gold-500 transition-colors"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Modal (not using Dialog) */}
        {modalOpen && selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            {/* Modal Content */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="relative bg-gray-50 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 
                           hover:bg-white transition-colors text-gray-800"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {selectedProject.title}
                  </h2>

                  {/* Image Gallery */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={selectedProject.galleryImages[currentImageIndex]}
                          alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Gallery Navigation */}
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => 
                            prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
                          );
                        }}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => 
                            (prev + 1) % selectedProject.galleryImages.length
                          );
                        }}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white rounded-full text-sm">
                      {currentImageIndex + 1} / {selectedProject.galleryImages.length}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <p className="text-gray-600">{selectedProject.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gold-400 mr-2" />
                        <div>
                          <span className="font-medium text-gray-900">Location: </span>
                          <span className="text-gray-600">{selectedProject.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gold-400 mr-2" />
                        <div>
                          <span className="font-medium text-gray-900">Completed: </span>
                          <span className="text-gray-600">{selectedProject.completionDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}