'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  Tag, 
  MapPin, 
  Calendar, 
  X, 
  Eye,
  ArrowUpRight,
  CheckCircle
} from 'lucide-react';

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

// Sample project data with proper image paths
const projects: Project[] = [
  {
    id: 'av-charging-oregon',
    title: 'Oregon AV Charging Infrastructure',
    description: 'Comprehensive implementation of EV charging stations with advanced infrastructure support and safety systems for sustainable transportation.',
    category: 'Infrastructure',
    location: 'Chemult, Oregon',
    completionDate: '2024',
    thumbnailUrl: '/images/WorkOregonPics/image16.jpeg',
    galleryImages: [
      '/images/WorkOregonPics/image16.jpeg',
      '/images/WorkOregonPics/image2.jpeg',
      '/images/WorkOregonPics/image3.jpeg',
      '/images/WorkOregonPics/image4.jpeg',
      '/images/WorkOregonPics/image5.jpeg',
      '/images/WorkOregonPics/image6.jpeg',
      '/images/WorkOregonPics/image7.jpeg',
      '/images/WorkOregonPics/image8.jpeg',
      '/images/WorkOregonPics/image9.jpeg',
      '/images/WorkOregonPics/image10.jpeg',
      '/images/WorkOregonPics/image11.jpeg',
      '/images/WorkOregonPics/image13.jpeg',
      '/images/WorkOregonPics/image14.jpeg',
      '/images/WorkOregonPics/image15.jpeg',
      '/images/WorkOregonPics/image17.jpeg',
      '/images/WorkOregonPics/image18.jpeg',
      '/images/WorkOregonPics/image19.jpeg',
      '/images/WorkOregonPics/image21.jpeg'
    ],
    features: [
      'High-capacity charging infrastructure',
      'Advanced safety systems integration',
      'Environmental compliance standards',
      'Complete site development and utilities',
      'Smart monitoring and control systems',
      'Future-ready scalable design'
    ],
    specifications: {
      'Charging Capacity': 'Up to 350kW DC Fast Charging',
      'Installation Type': 'Commercial Grade',
      'Safety Standards': 'UL Listed & Code Compliant',
      'Project Duration': '6 months'
    }
  },
  {
    id: 'medical-communications',
    title: 'Healthcare Communications Network',
    description: 'State-of-the-art medical facility construction incorporating advanced communications infrastructure and specialized healthcare requirements.',
    category: 'Healthcare',
    location: 'San Jose, CA',
    completionDate: '2023',
    thumbnailUrl: '/images/WorkOregonPics/image9.jpeg',
    galleryImages: [
      '/images/WorkOregonPics/image9.jpeg',
      '/images/WorkOregonPics/image14.jpeg',
      '/images/WorkOregonPics/image15.jpeg'
    ],
    features: [
      'ADA compliance implementation',
      'Specialized medical infrastructure',
      'Advanced security systems',
      'Emergency power systems',
      'Fiber optic backbone installation',
      'Mission-critical communications'
    ],
    specifications: {
      'Network Type': 'Fiber Optic & Copper Hybrid',
      'Coverage Area': '50,000 sq ft',
      'Compliance': 'HIPAA & ADA Standards',
      'Uptime Guarantee': '99.99%'
    }
  },
  {
    id: 'network-infrastructure',
    title: 'Network Infrastructure Deployment',
    description: 'Comprehensive network infrastructure installation featuring advanced telecommunications equipment and cutting-edge connectivity solutions.',
    category: 'Communications',
    location: 'Bay Area, CA',
    completionDate: '2024',
    thumbnailUrl: '/images/WorkOregonPics/image14.jpeg',
    galleryImages: [
      '/images/WorkOregonPics/image14.jpeg',
      '/images/WorkOregonPics/image15.jpeg',
      '/images/WorkOregonPics/image13.jpeg'
    ],
    features: [
      'Fiber optic installation',
      'Network equipment integration',
      'Cable management systems',
      'Testing and certification',
      '5G infrastructure preparation',
      'Redundant power systems'
    ],
    specifications: {
      'Fiber Type': 'Single & Multi-mode',
      'Data Rate': 'Up to 100Gbps',
      'Installation Method': 'Underground & Aerial',
      'Testing Standard': 'OTDR Certified'
    }
  }
];

/**
 * Enhanced Project Showcase Component
 * 
 * Features:
 * - Seamless integration with design system
 * - Smooth animations and transitions
 * - Accessible modal with keyboard navigation
 * - Responsive image gallery
 * - Professional styling consistent with brand
 */
export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Handle modal open/close with body scroll management
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!modalOpen || !selectedProject) return;

      switch (event.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          setCurrentImageIndex((prev) => 
            prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
          );
          break;
        case 'ArrowRight':
          setCurrentImageIndex((prev) => 
            (prev + 1) % selectedProject.galleryImages.length
          );
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalOpen, selectedProject]);

  // Filter projects based on category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === selectedCategory.toLowerCase());

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <section ref={sectionRef} className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`
                relative px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-gold-400 text-white shadow-lg shadow-gold-400/25'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gold-400 hover:text-gold-600 shadow-sm hover:shadow-md'}
              `}
              aria-pressed={selectedCategory === category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {selectedCategory === category && (
                <motion.div
                  layoutId="categoryBackground"
                  className="absolute inset-0 bg-gold-400 rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 
                         overflow-hidden hover:shadow-xl hover:-translate-y-1 
                         transition-all duration-300"
              >
                {/* Project Image */}
                <div 
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                  onClick={() => openModal(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(project);
                    }
                  }}
                  aria-label={`View details for ${project.title}`}
                >
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* View Details Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <Eye className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                      <Tag className="w-3 h-3 mr-1 text-gold-500" />
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project Meta */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2 text-gold-500" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 text-gold-500" />
                      Completed {project.completionDate}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => openModal(project)}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 
                             bg-gray-50 hover:bg-gold-50 border border-gray-200 hover:border-gold-300
                             text-gray-700 hover:text-gold-700 font-medium rounded-lg
                             transition-all duration-200 group/btn"
                  >
                    View Project Details
                    <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </motion.div>
        )}

        {/* Enhanced Modal */}
        <AnimatePresence>
          {modalOpen && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeModal}
              />
              
              {/* Modal Content */}
              <div className="relative min-h-screen flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
                >
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 
                             hover:bg-white border border-gray-200 shadow-lg
                             text-gray-600 hover:text-gray-900 transition-all duration-200"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="p-8">
                    <h2 id="modal-title" className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                      {selectedProject.description}
                    </p>

                    {/* Image Gallery */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-gray-100">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={selectedProject.galleryImages[currentImageIndex]}
                            alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1200px) 100vw, 1200px"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Gallery Navigation */}
                      {selectedProject.galleryImages.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev) => 
                                prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
                              );
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                                     bg-white/90 hover:bg-white border border-gray-200 shadow-lg
                                     text-gray-700 hover:text-gray-900 transition-all duration-200"
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
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                                     bg-white/90 hover:bg-white border border-gray-200 shadow-lg
                                     text-gray-700 hover:text-gray-900 transition-all duration-200"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>

                          {/* Image Counter */}
                          <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm 
                                        rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                            {currentImageIndex + 1} of {selectedProject.galleryImages.length}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Project Details */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <MapPin className="w-5 h-5 text-gold-500 mr-3" />
                              <div>
                                <span className="font-medium text-gray-900">Location: </span>
                                <span className="text-gray-600">{selectedProject.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-5 h-5 text-gold-500 mr-3" />
                              <div>
                                <span className="font-medium text-gray-900">Completed: </span>
                                <span className="text-gray-600">{selectedProject.completionDate}</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Tag className="w-5 h-5 text-gold-500 mr-3" />
                              <div>
                                <span className="font-medium text-gray-900">Category: </span>
                                <span className="text-gray-600">{selectedProject.category}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                          <ul className="space-y-2">
                            {selectedProject.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Specifications */}
                      {selectedProject.specifications && (
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <dl className="space-y-4">
                              {Object.entries(selectedProject.specifications).map(([key, value]) => (
                                <div key={key}>
                                  <dt className="font-medium text-gray-900 mb-1">{key}</dt>
                                  <dd className="text-gray-600">{value}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                      <p className="text-gray-600 mb-4">
                        Interested in a similar project for your organization?
                      </p>
                      <a
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 bg-gold-400 hover:bg-gold-500 
                                 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
                      >
                        Get Started
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}