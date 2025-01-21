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

// Mock data for projects
export const projects: Project[] = [
  {
    id: 'fiber-network-2024',
    title: 'City-Wide Fiber Network Implementation',
    description: 'Complete fiber optic network installation covering metropolitan area with high-speed internet infrastructure.',
    category: 'communications',
    imageUrl: '/projects/fiber-network.jpg',
    completionDate: '2024-01',
    client: 'Metro City Council',
    location: 'Metropolitan Area',
    tags: ['Fiber Optics', 'Network Infrastructure', 'Urban Development'],
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