'use client';

import { 
    Network, 
    Building2,  
    ClipboardList,
    LucideIcon,
    LucideProps,
    LucideWrench
  } from 'lucide-react';
  
  // Define the icon mapping with proper typing
  const iconMap: Record<string, LucideIcon> = {
    'network-tower': Network,
    'building': Building2,
    'tools': LucideWrench,
    'blueprint': ClipboardList,
  };
  
  // interface to ensure type safety
  interface ServiceIconProps extends Omit<LucideProps, 'ref'> {
    icon: keyof typeof iconMap;
  }
  
  export function ServiceIcon({ icon, ...props }: ServiceIconProps) {
    // safety check
    const IconComponent = iconMap[icon];
    
    if (!IconComponent) {
      console.warn(`Icon "${icon}" not found in iconMap`);
      return null;
    }
  
    return <IconComponent {...props} />;
  }