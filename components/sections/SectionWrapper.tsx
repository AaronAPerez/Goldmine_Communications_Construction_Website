import { useInView, motion } from "framer-motion";
import { useRef } from "react";

/**
 * Reusable Section Wrapper Component
 * 
 * Provides consistent scroll animations and accessibility features
 * for all page sections
 */
interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ id, className = '', children }: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: "-100px"
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`${className} transform-gpu`} // Added transform-gpu for performance
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] // Custom easing for smoother animations
      }}
      // Accessibility enhancements
      tabIndex={-1}
      aria-label={`${id} section`}
    >
      {children}
    </motion.section>
  );
};


export default SectionWrapper;