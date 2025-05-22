import { motion } from "framer-motion";

  import React from "react";
  
    // Floating action button for accessibility
    const FloatingAccessibilityButton = () => {
      const [isOpen, setIsOpen] = React.useState(false);
  
      // Scroll to section by id
      const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      };

    return (
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gold-400 text-white 
                     rounded-full shadow-gold-lg transition-colors focus:outline-none 
                     focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
          aria-label="Accessibility options"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v2a1 1 0 102 0V5zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
          </svg>
        </motion.button>

        {/* Accessibility menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl 
                       border border-gray-200 p-4 min-w-48"
          >
            <h3 className="font-semibold text-gray-900 mb-3">Quick Access</h3>
            <nav role="navigation" aria-label="Page sections">
              <ul className="space-y-2">
                {[
                  { id: 'hero', label: 'Hero Section' },
                  { id: 'about-services', label: 'About & Services' },
                  { id: 'services-overview', label: 'Our Expertise' },
                  { id: 'communications', label: 'Communications' },
                  { id: 'construction', label: 'Construction' },
                  { id: 'projects', label: 'Recent Projects' },
                  { id: 'contact', label: 'Contact Us' }
                ].map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => {
                        scrollToSection(id);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 text-sm text-gray-700 
                               hover:text-gold-600 hover:bg-gold-50 rounded transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </div>
    );
  };

  export default FloatingAccessibilityButton;