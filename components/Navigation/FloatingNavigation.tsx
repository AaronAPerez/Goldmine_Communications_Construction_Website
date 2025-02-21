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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed top-0 left-0 right-0 z-50 hidden md:block
          transition-all duration-300
          ${isScrolled ? 'bg-black/70 shadow-lg backdrop-blur-md' : 'bg-transparent'}
        `}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex-shrink-0 relative group"
              aria-label="Home"
            >
              <div className="relative w-48 h-12">
                <Image
                  src="/images/logo-banner.png"
                  alt="Goldmine Communications and Construction"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-4 py-2 rounded-full transition-all duration-300
                      group flex items-center space-x-2
                      text-shadow-sm hover:text-shadow-lg
                      ${isActive 
                        ? 'text-gold-400 font-semibold' 
                        : 'text-white hover:text-gold-400'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-white/10 rounded-full shadow-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative drop-shadow-md">{item.icon}</span>
                    <span className="relative font-medium drop-shadow-md">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-40 h-20">
              <Image
                src="/images/logo-banner.png"
                alt="Goldmine Communications and Construction"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-white hover:text-gold-400 transition-colors duration-200
                     drop-shadow-md hover:drop-shadow-lg"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3
                    transition-colors duration-200 group
                    ${pathname === item.href
                      ? 'bg-gold-400/20 text-gold-400'
                      : 'text-white hover:bg-white/10 hover:text-gold-400'
                    }
                  `}
                >
                  <span className="drop-shadow-md group-hover:drop-shadow-lg transition-all duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium drop-shadow-md group-hover:drop-shadow-lg transition-all duration-200">
                    {item.label}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}