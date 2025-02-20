'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types/project';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: sectionRef, isVisible } = useIntersectionObserver({
    threshold: 0.2
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // Handle project selection
  const handleProjectClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden bg-gray-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px',
            y
          }}
        />
      </div>

      <div 
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our portfolio of successful communications and construction projects
          </p>
        </motion.div>

        {/* Project Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Project Preview */}
          <motion.div
            style={{ opacity }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <Image
              src={projects[activeIndex].imageUrl}
              alt={projects[activeIndex].title}
              fill
              // className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Project Info Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {projects[activeIndex].title}
                </h3>
                <p className="text-gray-200 mb-4">
                  {projects[activeIndex].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projects[activeIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm bg-white/20 text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Project List */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0, 
                  x: isVisible ? 0 : 20 
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleProjectClick(index)}
                className={`
                  w-full text-left p-6 rounded-xl transition-all duration-300
                  ${activeIndex === index
                    ? 'bg-gold-400 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      {project.title}
                    </h4>
                    <p className="text-sm opacity-80">
                      {project.client} • {project.location}
                    </p>
                  </div>
                  <div className={`
                    w-3 h-3 rounded-full transition-colors
                    ${activeIndex === index
                      ? 'bg-white'
                      : 'bg-gray-600'
                    }
                  `} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Projects Completed', value: '100+' },
            { label: 'Cities Served', value: '25+' },
            { label: 'Client Satisfaction', value: '98%' },
            { label: 'Team Members', value: '50+' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 20 
              }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gold-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}