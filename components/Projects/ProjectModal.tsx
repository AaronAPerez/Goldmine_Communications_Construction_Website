'use client';

import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface ProjectModalProps {
  project: {
    imageUrl: string;
    title: string;
    description: string;
    highlights: string[];
    specifications?: { [key: string]: string };
    tags: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}



export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    if (!project) return null;
  
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  
        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
              aria-label="Close details"
            >
              <X size={24} />
            </button>
  
            {/* Project Image */}
            <div className="relative h-64 w-full">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
  
            {/* Content */}
            <div className="p-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">
                {project.title}
              </Dialog.Title>
  
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-600 mb-6">{project.description}</p>
  
                {/* Project Highlights */}
                <h3 className="text-lg font-semibold mb-3">Project Highlights</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="text-gray-600">{highlight}</li>
                  ))}
                </ul>
  
                {/* Specifications */}
                {project.specifications && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {Object.entries(project.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-sm text-gray-500">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
  
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }

export default ProjectModal