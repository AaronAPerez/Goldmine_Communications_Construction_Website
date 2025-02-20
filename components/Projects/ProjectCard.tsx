'use client'

import React from 'react'
import Image from 'next/image';

import { Calendar, MapPin, Building } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-gold-400 text-white px-3 py-1 rounded-full text-sm">
          {project.category}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Project Details */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(project.completionDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            <span>{project.client}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{project.location}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard
// 'use client'

// import React from 'react'
// import Image from 'next/image';

// import { Calendar, MapPin, Building } from 'lucide-react';
// import { Project } from '@/types/project';

// interface ProjectCardProps {
//   project: Project;
//   onClick: () => void;
// }

// export function ProjectCard({ project, onClick }: ProjectCardProps) {
//   return (
//     <div
//       className="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//       onClick={onClick}
//       role="button"
//       tabIndex={0}
//       aria-label={`View details for ${project.title}`}
//       onKeyPress={(e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//           onClick();
//         }
//       }}
//     >
//       {/* Project Image */}
//       <div className="relative h-48 w-full overflow-hidden">
//         <Image
//           src={project.imageUrl}
//           alt={project.title}
//           fill
//           className="object-cover transition-transform duration-300 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        
//         {/* Category Badge */}
//         <div className="absolute top-4 right-4 bg-gold-400 text-white px-3 py-1 rounded-full text-sm">
//           {project.category}
//         </div>
//       </div>

//       {/* Project Info */}
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//           {project.title}
//         </h3>
        
//         <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//           {project.description}
//         </p>

//         {/* Project Details */}
//         <div className="space-y-2 text-sm text-gray-500">
//           <div className="flex items-center">
//             <Calendar className="w-4 h-4 mr-2" />
//             <span>{new Date(project.completionDate).toLocaleDateString()}</span>
//           </div>
          
//           <div className="flex items-center">
//             <Building className="w-4 h-4 mr-2" />
//             <span>{project.client}</span>
//           </div>
          
//           <div className="flex items-center">
//             <MapPin className="w-4 h-4 mr-2" />
//             <span>{project.location}</span>
//           </div>
//         </div>

//         {/* Tags */}
//         <div className="mt-4 flex flex-wrap gap-2">
//           {project.tags.slice(0, 3).map((tag) => (
//             <span
//               key={tag}
//               className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectCard