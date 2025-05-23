'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Tag, 
  MapPin, 
  Calendar, 
  Eye,
  ArrowUpRight,
  Award,
  Clock,
  Users
} from 'lucide-react';
import OptimizedImage from '@/components/common/OptimizedImage';

/**
 * Enhanced Project Interface
 * Includes all necessary properties for comprehensive project display
 */
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
  client?: string;
  duration?: string;
  teamSize?: number;
  specifications?: {
    [key: string]: string;
  };
}


/**
 * Enhanced Service Card Component
 * Displays individual project with improved accessibility and animations
 */
interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

const ProjectCard = ({ project, index, onViewDetails }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-lg border-2 border-gold-200/50 
                 overflow-hidden hover:shadow-xl hover:-translate-y-1 
                 transition-all duration-300"
    >
      {/* Project Image with Enhanced Overlay */}
      <div 
        className="relative aspect-[4/3] cursor-pointer overflow-hidden"
        onClick={() => onViewDetails(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onViewDetails(project);
          }
        }}
        aria-label={`View details for ${project.title}`}
      >
        <OptimizedImage
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 2} // Prioritize first two images
        />
        
        {/* Enhanced Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* View Details Button with Animation */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.div 
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gold-200"
          >
            <Eye className="w-6 h-6 text-gray-700" />
          </motion.div>
        </div>

        {/* Category Badge with Enhanced Styling */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 bg-gold-400/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white shadow-lg">
            <Tag className="w-3 h-3 mr-1.5" />
            {project.category}
          </span>
        </div>

        {/* Project Stats Overlay */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            {project.duration && (
              <span className="inline-flex items-center px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-700">
                <Clock className="w-3 h-3 mr-1" />
                {project.duration}
              </span>
            )}
            {project.teamSize && (
              <span className="inline-flex items-center px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-700">
                <Users className="w-3 h-3 mr-1" />
                {project.teamSize} team
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold-600 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Enhanced Project Meta */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-gold-500 flex-shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2 text-gold-500 flex-shrink-0" />
            <span>Completed {project.completionDate}</span>
          </div>
          {project.client && (
            <div className="flex items-center text-sm text-gray-500">
              <Award className="w-4 h-4 mr-2 text-gold-500 flex-shrink-0" />
              <span className="truncate">{project.client}</span>
            </div>
          )}
        </div>

        {/* Enhanced Action Button */}
        <button
          onClick={() => onViewDetails(project)}
          className="w-full inline-flex items-center justify-center px-4 py-3 
                     bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gold-50 hover:to-gold-100 
                     border border-gray-200 hover:border-gold-300
                     text-gray-700 hover:text-gold-700 font-medium rounded-lg
                     transition-all duration-200 group/btn shadow-sm hover:shadow-md"
          aria-label={`View detailed information about ${project.title}`}
        >
          View Project Details
          <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
};


export default ProjectCard