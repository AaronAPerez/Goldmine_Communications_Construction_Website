'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Phone, Briefcase, Building, Menu, X } from 'lucide-react';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// Navigation items array moved outside component to prevent re-creation
const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
  { label: 'Services', href: '/services', icon: <Briefcase className="w-5 h-5" /> },
  { label: 'Projects', href: '/projects', icon: <Building className="w-5 h-5" /> },
  { label: 'Contact', href: '/contact', icon: <Phone className="w-5 h-5" /> },
];

export default function FloatingNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header role="banner" className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          hidden md:block w-full
          transition-all duration-300
          ${isScrolled ? 'bg-black/70 shadow-lg backdrop-blur-md' : 'bg-transparent'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex-shrink-0 relative group"
              aria-label="Home"
            >
              <div className="relative w-40 h-10">
                <Image
                  src="/images/logo-banner.png"
                  alt="Goldmine Communications and Construction"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Navigation Items */}
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-3 py-2 rounded-lg transition-all duration-300
                      group flex items-center gap-2
                      text-shadow hover:text-shadow-lg
                      ${isActive 
                        ? 'text-gold-400 font-semibold' 
                        : 'text-white hover:text-gold-400'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative">{item.icon}</span>
                    <span className="relative font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden w-full bg-black/70 backdrop-blur-md shadow-lg overflow-hidden">
        <div className="container mx-auto p-3 flex items-center justify-between">
          {/* Mobile Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-32 h-8">
              <Image
                src="/images/logo-banner.png"
                alt="Goldmine Communications and Construction"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-white hover:text-gold-400 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-white/10"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3
                    transition-colors duration-200
                    ${pathname === item.href
                      ? 'bg-gold-400/20 text-gold-400'
                      : 'text-white hover:bg-white/10 hover:text-gold-400'
                    }
                  `}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Home, Phone, Briefcase, Building, Menu, X } from 'lucide-react';

// interface NavItem {
//   label: string;
//   href: string;
//   icon: React.ReactNode;
// }

// const navItems: NavItem[] = [
//   { label: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
//   { label: 'Services', href: '/services', icon: <Briefcase className="w-5 h-5" /> },
//   { label: 'Projects', href: '/projects', icon: <Building className="w-5 h-5" /> },
//   { label: 'Contact', href: '/contact', icon: <Phone className="w-5 h-5" /> },
// ];

// export default function FloatingNavigation() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navVariants = {
//     hidden: {
//       opacity: 0,
//       y: -20,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.3,
//         ease: 'easeOut',
//       },
//     },
//   };

//   const menuVariants = {
//     closed: {
//       scale: 0,
//       opacity: 0,
//       transition: {
//         duration: 0.2,
//       },
//     },
//     open: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 300,
//         damping: 25,
//       },
//     },
//   };

//   return (
//     <>
//       {/* Desktop Navigation */}
//       <motion.nav
//         initial="hidden"
//         animate="visible"
//         variants={navVariants}
//         className={`
//           fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block
//           ${isScrolled ? 'w-[calc(100%-2rem)]' : 'w-auto'}
//         `}
//       >
//         <div 
//           className={`
//             relative backdrop-blur-md rounded-full border border-white/20
//             transition-all duration-300 ease-in-out overflow-hidden
//             ${isScrolled 
//               ? 'bg-white/90 shadow-lg' 
//               : 'bg-black/20'
//             }
//           `}
//         >
//           {/* Background Gradient */}
//           <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 via-primary-500/10 to-gold-400/10 opacity-50" />

//           {/* Navigation Items */}
//           <div className="relative px-8 py-4 flex items-center justify-center space-x-8">
//             {navItems.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={`
//                     relative px-4 py-2 rounded-full transition-all duration-300
//                     group flex items-center space-x-2
//                     ${isActive 
//                       ? 'text-gold-400' 
//                       : isScrolled 
//                         ? 'text-gray-600 hover:text-gold-400' 
//                         : 'text-white hover:text-gold-400'
//                     }
//                   `}
//                 >
//                   {/* Background highlight */}
//                   {isActive && (
//                     <motion.div
//                       layoutId="activeNavBackground"
//                       className="absolute inset-0 bg-white/10 rounded-full"
//                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                     />
//                   )}
                  
//                   {/* Icon */}
//                   <span className="relative">{item.icon}</span>
                  
//                   {/* Label */}
//                   <span className="relative font-medium">{item.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Navigation */}
//       <div className="fixed bottom-6 right-6 z-50 md:hidden">
//         {/* Menu Button */}
//         <motion.button
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setIsOpen(!isOpen)}
//           className={`
//             p-4 rounded-full shadow-lg backdrop-blur-md
//             transition-all duration-300
//             ${isOpen ? 'bg-white' : 'bg-gold-400'}
//           `}
//           aria-label={isOpen ? 'Close menu' : 'Open menu'}
//         >
//           {isOpen ? (
//             <X className="w-6 h-6 text-gray-900" />
//           ) : (
//             <Menu className="w-6 h-6 text-white" />
//           )}
//         </motion.button>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={menuVariants}
//               className="absolute bottom-full right-0 mb-4"
//             >
//               <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col space-y-2">
//                 {navItems.map((item, index) => (
//                   <motion.div
//                     key={item.href}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     <Link
//                       href={item.href}
//                       onClick={() => setIsOpen(false)}
//                       className={`
//                         flex items-center space-x-3 px-4 py-2 rounded-xl
//                         transition-colors duration-200
//                         ${pathname === item.href
//                           ? 'bg-gold-400/10 text-gold-400'
//                           : 'text-gray-600 hover:bg-gray-100'
//                         }
//                       `}
//                     >
//                       {item.icon}
//                       <span className="font-medium">{item.label}</span>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }
