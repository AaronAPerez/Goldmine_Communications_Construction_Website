export interface Service {
    id: string;
    title: string;
    description: string;
    icon: 'network-tower' | 'building' | 'tools' | 'blueprint';
    features: string[];
  }
  
  //  Service data
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
  