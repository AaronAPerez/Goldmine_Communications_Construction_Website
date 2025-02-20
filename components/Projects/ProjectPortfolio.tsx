'use client';

import { useState, useMemo } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Project, projectCategories, ProjectCategory } from '@/types/project';

// Create a union type for all possible category values including 'all'
type CategoryFilter = 'all' | ProjectCategory;

interface ProjectPortfolioProps {
  projects: Project[];
}

const ProjectPortfolio = ({ projects }: ProjectPortfolioProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sortBy] = useState<'date' | 'name'>('date');

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
      }
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }, [selectedCategory, sortBy, projects]);

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as CategoryFilter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gold-400 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              aria-pressed={selectedCategory === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectPortfolio;