'use client';

import { Network, Building2, ClipboardList, Wrench } from 'lucide-react';

interface ServiceIconProps {
  icon: 'network-tower' | 'building' | 'tools' | 'blueprint';
  size?: number;
  className?: string;
}

export function ServiceIcon({ icon, size = 24, className = '' }: ServiceIconProps) {
  const getIcon = () => {
    switch (icon) {
      case 'network-tower':
        return <Network size={size} className={className} />;
      case 'building':
        return <Building2 size={size} className={className} />;
      case 'tools':
        return <Wrench size={size} className={className} />;
      case 'blueprint':
        return <ClipboardList size={size} className={className} />;
      default:
        return null;
    }
  };

  return getIcon();
}
// 'use client';

// import { 
//     Network, 
//     Building2,  
//     ClipboardList,
//     LucideIcon,
//     LucideProps,
//     LucideWrench
//   } from 'lucide-react';
  
//   // Define the icon mapping with proper typing
//   const iconMap: Record<string, LucideIcon> = {
//     'network-tower': Network,
//     'building': Building2,
//     'tools': LucideWrench,
//     'blueprint': ClipboardList,
//   };
  
//   // interface to ensure type safety
//   interface ServiceIconProps extends Omit<LucideProps, 'ref'> {
//     icon: keyof typeof iconMap;
//   }
  
//   export function ServiceIcon({ icon, ...props }: ServiceIconProps) {
//     // safety check
//     const IconComponent = iconMap[icon];
    
//     if (!IconComponent) {
//       console.warn(`Icon "${icon}" not found in iconMap`);
//       return null;
//     }
  
//     return <IconComponent {...props} />;
//   }