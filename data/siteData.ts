import { Service } from '@/types/service';
import { Project } from '@/types/project';
import { Testimonial } from '@/types/testimonials';


export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'communications', label: 'Communications' },
  { id: 'construction', label: 'Construction' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'maintenance', label: 'Maintenance' }
] as const;


export const services: Service[] = [
  {
    id: 'communications',
    title: 'Communications Infrastructure',
    description: 'Complete communications solutions for modern connectivity needs',
    icon: 'network-tower',
    features: [
      'Fiber Optic Installation',
      'Network Infrastructure',
      'Wireless Solutions',
      'Data Center Construction',
      'Telecommunications Equipment'
    ]
  },
  {
    id: 'construction',
    title: 'Construction Services',
    description: 'Professional construction services for commercial and industrial projects',
    icon: 'building',
    features: [
      'Commercial Construction',
      'Site Development',
      'Infrastructure Development',
      'Project Management',
      'Equipment Installation'
    ]
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: '24/7 maintenance and support services for all installations',
    icon: 'tools',
    features: [
      'Preventive Maintenance',
      'Emergency Repairs',
      'System Upgrades',
      'Performance Monitoring',
      'Technical Support'
    ]
  },
  {
    id: 'consulting',
    title: 'Consulting & Design',
    description: 'Expert consultation and design services for your projects',
    icon: 'blueprint',
    features: [
      'Project Planning',
      'Technical Design',
      'Feasibility Studies',
      'Cost Analysis',
      'Regulatory Compliance'
    ]
  }
];

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
  {
    id: 'fiber-network-2024',
    title: 'City-Wide Fiber Network Implementation',
    description: 'Complete fiber optic network installation covering metropolitan area.',
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
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'John Smith',
    role: 'Chief Technology Officer',
    company: 'TechCorp Industries',
    content: 'The team at Goldmine delivered exceptional results. Their expertise in both communications and construction made them the perfect partner for our complex infrastructure project.',
    image: '/images/testimonials/john-smith.jpg'
  },
  {
    id: '1',
    author: 'John Smith',
    role: 'Chief Technology Officer',
    company: 'TechCorp Industries',
    content: 'The team at Goldmine delivered exceptional results. Their expertise in both communications and construction made them the perfect partner for our complex infrastructure project.',
    image: '/images/testimonials/john-smith.jpg'
  },
  {
    id: '1',
    author: 'John Smith',
    role: 'Chief Technology Officer',
    company: 'TechCorp Industries',
    content: 'The team at Goldmine delivered exceptional results. Their expertise in both communications and construction made them the perfect partner for our complex infrastructure project.',
    image: '/images/testimonials/john-smith.jpg'
  },
];