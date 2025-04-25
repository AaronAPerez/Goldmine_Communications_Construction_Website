'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Calendar, MapPin, Building2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

// Types for project data
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  completionDate: string;
  location: string;
  client: string;
  features: string[];
  gallery?: string[];
}

// Project categories for filtering
const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'construction', label: 'Construction' },
  { id: 'communications', label: 'Communications' },
  { id: 'infrastructure', label: 'Infrastructure' }
];

// Sample project data
const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Modern Office Complex',
    description: 'State-of-the-art office complex with advanced communications infrastructure.',
    category: 'construction',
    image: '/images/projects/office-complex.jpg',
    completionDate: '2024',
    location: 'San Francisco, CA',
    client: 'Tech Innovations Inc.',
    features: [
      'LEED Certified Building',
      'Smart Building Technology',
      'Fiber Optic Infrastructure',
      'Sustainable Design'
    ],
    gallery: [
      '/images/projects/office-1.jpg',
      '/images/projects/office-2.jpg',
      '/images/projects/office-3.jpg'
    ]
  },
  // Add more projects...
];

export default function ProjectShowcase2() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, isVisible } = useIntersectionObserver();
  
  // Filter projects based on selected category
  const filteredProjects = projects.filter(project => 
    selectedCategory === 'all' || project.category === selectedCategory
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      ref={ref}
      className="py-24 bg-gray-900"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 
            id="projects-heading"
            className="text-4xl font-bold text-white mb-4"
          >
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our portfolio of successful projects showcasing our expertise 
            in construction and communications infrastructure.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category.id
                  ? 'bg-gold-400 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
              `}
              aria-current={selectedCategory === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${project.title}`}
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-800">
                {/* Project Image */}
                <div className="relative aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 
                             group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 
                                transition-colors duration-300" />
                </div>

                {/* Project Info Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 
                                transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Project Details */}
                    <div className="flex flex-wrap gap-4 mt-4 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-gold-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{project.completionDate}</span>
                      </div>
                      <div className="flex items-center text-gold-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl bg-white rounded-xl overflow-hidden">
            {selectedProject && (
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 
                           hover:bg-white transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5 text-gray-900" />
                </button>

                {/* Project Gallery */}
                <div className="relative aspect-video mb-6">
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
                        src={selectedProject.gallery?.[currentImageIndex] || selectedProject.image}
                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gallery Navigation */}
                  {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                      {selectedProject.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300
                                    ${currentImageIndex === index 
                                      ? 'w-8 bg-gold-400' 
                                      : 'bg-white/50 hover:bg-white/75'}`}
                          aria-label={`View image ${index + 1}`}
                          aria-current={currentImageIndex === index}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedProject.title}
                  </DialogTitle>
                  
                  <p className="text-gray-600 mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Building2 className="w-5 h-5 mr-2 text-gold-400" />
                      <span>{selectedProject.client}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2 text-gold-400" />
                      <span>{selectedProject.completionDate}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2 text-gold-400" />
                      <span>{selectedProject.location}</span>
                    </div>
                  </div>

                  {/* Project Features */}
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature) => (
                      <li 
                        key={feature}
                        className="flex items-center text-gray-600"
                      >
                        <div className="w-2 h-2 rounded-full bg-gold-400 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}