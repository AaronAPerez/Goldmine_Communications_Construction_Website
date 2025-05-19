export type ProjectCategory = 'communications' | 'construction' | 'infrastructure' | 'maintenance';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string;
  completionDate: string;
  client: string;
  location: string;
  tags: string[];
  highlights: string[];
  specifications?: {
    [key: string]: string;
  };
}

// Add to types file or component
export interface NextImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number; // 1-100
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  // ... other props
}

// Mock data for projects
export const projects: Project[] = [
  {
    id: 'AV Charging Stations-2024',
    title: 'Orgean AV Charging Implementation',
    description: 'Complete AV Charging Station installation in gas parking area.',
    category: 'communications',
    imageUrl: '/images/WorkOreganPics/image16.jpeg',
    completionDate: '2024-10',
    client: 'Metro City Council',
    location: 'Metropolitan Area',
    tags: ['AV Charging Station', 'Urban Development'],
    highlights: [
      'Installed 200+ miles of fiber optic cable',
      'Connected 50,000+ households',
      'Achieved 99.99% network reliability'
    ],
    specifications: {
      'Network Speed': '10Gbps',
      'Coverage Area': '150 sq miles',
      'Completion Time': '18 months'
    }
  },
  // ... more projects
];

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'communications', label: 'Communications' },
  { id: 'construction', label: 'Construction' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'maintenance', label: 'Maintenance' }
];