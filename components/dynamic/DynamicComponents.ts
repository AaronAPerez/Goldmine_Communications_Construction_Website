// import React from 'react';
// import dynamic from 'next/dynamic';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';


// // Dynamic imports with loading states
// export const ProjectShowcase = dynamic(
//   () => import('@/components/sections/ProjectShowcase'),
//   {
//     loading: () => <LoadingSpinner />,
//     ssr: false, // Disable SSR for this component
//   }
// );

// export const ContactForm = dynamic(
//   () => import('@/components/Contact/ContactForm'),
//   {
//     loading: () => <LoadingSpinner />,
//     ssr: true, // Keep SSR for SEO
//   }
// );

// export const TestimonialsSection = dynamic(
//   () => import('@/components/Testimonials/TestimonialsSection'),
//   {
//     loading: () => <LoadingSpinner />,
//     ssr: false,
//   }
// );

// // Advanced dynamic loading with retry logic
// export const createDynamicComponent = <T extends React.ComponentType<any>>(
//   importFn: () => Promise<{ default: T }>,
//   options: {
//     name: string;
//     ssr?: boolean;
//     retries?: number;
//   }
// ) => {
//   let retryCount = 0;
//   const maxRetries = options.retries || 3;

//   const loadComponent = async (): Promise<{ default: T }> => {
//     try {
//       return await importFn();
//     } catch (error) {
//       if (retryCount < maxRetries) {
//         retryCount++;
//         await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
//         return loadComponent();
//       }
//       throw error;
//     }
//   };

//   return dynamic(loadComponent, {
//     loading: () => <LoadingSpinner />,
//     ssr: options.ssr ?? true,
//   });
// };