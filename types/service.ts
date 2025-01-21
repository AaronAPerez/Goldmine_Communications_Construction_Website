export interface Service {
    id: string;
    title: string;
    description: string;
    icon: 'network-tower' | 'building' | 'tools' | 'blueprint';  // Strictly type the icon options
    features: string[];
  }
  
  // Example of correctly typed service data
  export const services: Service[] = [
    {
      id: 'communications',
      title: 'Communications Infrastructure',
      description: 'Complete communications solutions for modern connectivity needs',
      icon: 'network-tower',  // Must match one of the defined icon types
      features: [
        'Fiber Optic Installation',
        'Network Infrastructure',
        'Wireless Solutions',
        'Data Center Construction',
        'Telecommunications Equipment'
      ]
    },
  ]