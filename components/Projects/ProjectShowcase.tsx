'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Tag, 
  MapPin, 
  Calendar, 
  X, 
  Eye,
  ArrowUpRight,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';

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
    thumbnailUrl: '/images/WorkOregonPics/AvStation.jpg',
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
 * - Blueprint grid paper background
 * - Seamless integration with other specialized sections
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

  // Blueprint Compass SVG component
  const BlueprintCompass = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke="#B3995D" strokeWidth="2"/>
      <path d="M50 2V98" stroke="#B3995D" strokeWidth="1"/>
      <path d="M2 50H98" stroke="#B3995D" strokeWidth="1"/>
      <path d="M26 50L50 26L74 50L50 74L26 50Z" stroke="#B3995D" strokeWidth="2"/>
      <circle cx="50" cy="50" r="5" stroke="#B3995D" strokeWidth="2"/>
      <path d="M18 18L82 82" stroke="#B3995D" strokeWidth="1"/>
      <path d="M18 82L82 18" stroke="#B3995D" strokeWidth="1"/>
    </svg>
  );

  return (
    <section ref={sectionRef} className="relative">
      {/* Blueprint Grid Paper Background */}
      <div className="absolute inset-0 bg-blue-50/70">
        {/* Main grid */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(179, 153, 93, 0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(179, 153, 93, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Larger grid lines */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(179, 153, 93, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(179, 153, 93, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
        
        {/* Blueprint-style decorative elements */}
        <div className="absolute left-10 top-20 w-40 h-40 border-2 border-gold-300/20 rounded-full"></div>
        <div className="absolute right-20 bottom-40 w-60 h-60 border border-dashed border-gold-400/20 rounded-lg"></div>
        <div className="absolute left-1/4 bottom-20 w-20 h-20 border border-gold-300/20 rounded-sm rotate-45"></div>
        
        {/* Compass decoration */}
        <div className="absolute right-10 top-10 w-32 h-32 opacity-10 z-30">
          <BlueprintCompass />
        </div>
        
        {/* "DRAFT" watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gold-300/10 text-9xl font-bold rotate-[-30deg] select-none pointer-events-none">
            DRAFT
          </div>
        </div>
      </div>
      
      {/* Content overlay with subtle glass effect to ensure readability */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute backdrop-blur-sm rounded-2xl"></div>
        <div className="relative z-10 py-12 px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center inset-0 backdrop-blur-sm mb-10 p-8 shadow-lg rounded-2xl"
          >
            <h2 
              id="projects-heading"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {' '}Showcase
              </span>
              {' '}Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of completed projects that demonstrate our expertise
              in communications and construction excellence.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="group bg-white rounded-2xl shadow-lg border-2 border-gold-200/50 
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

          {/* CTA Section - Aligns with the style of other specialized sections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gold-200/30 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Let&apos;s discuss how our expertise in communications and construction 
                can bring your vision to life with precision and excellence.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-gold
                         text-white font-medium rounded-lg transition-colors shadow-gold hover:shadow-gold-lg"
              >
                Request a Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Modal with Blueprint Background */}
      <AnimatePresence>
        {modalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto pt-16" // pt-16 to account for navbar height
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={closeModal} // Close on backdrop click
          >
            {/* Blueprint Backdrop */}
            <div className="fixed inset-0 bg-blue-50/95">
              {/* Main grid */}
              <div className="absolute inset-0" 
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(179, 153, 93, 0.07) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(179, 153, 93, 0.07) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
              
              {/* Larger grid lines */}
              <div className="absolute inset-0" 
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(179, 153, 93, 0.12) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(179, 153, 93, 0.12) 1px, transparent 1px)
                  `,
                  backgroundSize: '100px 100px'
                }}
              />
              
              {/* Blueprint-style decorative elements */}
              <div className="absolute left-10 top-20 w-40 h-40 border-2 border-gold-300/20 rounded-full"></div>
              <div className="absolute right-20 bottom-40 w-60 h-60 border border-dashed border-gold-400/20 rounded-lg"></div>
              <div className="absolute left-1/4 bottom-20 w-20 h-20 border border-gold-300/20 rounded-sm rotate-45"></div>
              
              {/* Compass decoration */}
              <div className="absolute right-10 top-10 w-32 h-32 opacity-10">
                <BlueprintCompass />
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-auto"
                onClick={(e) => e.stopPropagation()} // Prevent clicks from closing when on content
              >
                {/* Close Button - Positioned to top right */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-lg
                           text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 
                           border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Gold bar accent at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold"></div>
                
                <div className="p-8 mt-2"> {/* Added mt-2 to account for gold bar */}
                  <h2 id="modal-title" className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {selectedProject.description}
                  </p>

                  {/* Image Gallery */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-gray-100 border-2 border-gold-200/50">
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
                      <div className="bg-blue-50/50 rounded-xl p-6 border border-gold-200/30">
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
                      <div className="bg-gold-50/30 rounded-xl p-6 border border-gold-200/30">
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
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full">
                          <dl className="space-y-4">
                            {Object.entries(selectedProject.specifications).map(([key, value]) => (
                              <div key={key} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                <dt className="font-medium text-gray-900 mb-1">{key}</dt>
                                <dd className="text-gray-600">{value}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Blueprint-style decorative corner elements */}
                  <div className="absolute top-1 left-1 w-16 h-16 border-l-2 border-t-2 border-gold-300/20 pointer-events-none"></div>
                  <div className="absolute top-1 right-1 w-16 h-16 border-r-2 border-t-2 border-gold-300/20 pointer-events-none"></div>
                  <div className="absolute bottom-1 left-1 w-16 h-16 border-l-2 border-b-2 border-gold-300/20 pointer-events-none"></div>
                  <div className="absolute bottom-1 right-1 w-16 h-16 border-r-2 border-b-2 border-gold-300/20 pointer-events-none"></div>

                  {/* Call to Action */}
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-gray-600 mb-4">
                      Interested in a similar project for your organization?
                    </p>
                    
                    <a href="/contact"
                      className="inline-flex items-center px-6 py-3 bg-gradient-gold text-white font-medium 
                               rounded-lg transition-colors shadow-gold hover:shadow-gold-lg"
                    >
                      Start Your Project
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}