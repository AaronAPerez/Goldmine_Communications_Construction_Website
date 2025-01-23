'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationItem {
  label: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Focus trap in mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements?.length) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isMenuOpen]);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed w-full z-50 transition-all duration-300
        ${scrolled ? 'bg-black/90 shadow-lg py-2' : 'bg-transparent py-4'}
      `}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Container */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Goldmine Communications and Construction - Home"
          >
            {/* Desktop Logo */}
            <div
              className={`
                relative hidden md:block transition-all duration-300
                ${scrolled ? 'w-40 h-10' : 'w-56 h-20'}
              `}
            >
              <Image
                src="/images/logo-banner.png"
                alt="Goldmine Communications and Construction Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Mobile Logo */}
            <div
              className={`
                relative md:hidden transition-all duration-300
                ${scrolled ? 'w-32 h-8' : 'w-40 h-10'}
              `}
            >
              <Image
                src="/images/logo-circular.png" // Using circular logo for mobile
                alt="Goldmine Communications and Construction Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`
              hidden md:flex space-x-8 transition-all duration-300
              ${scrolled ? 'text-sm' : 'text-base'}
            `}
            role="navigation"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-white text-lg hover:text-gold-400 transition-colors duration-200
                  ${scrolled ? 'py-1' : 'py-2'} font-medium
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`
              md:hidden inline-flex items-center justify-center rounded-md
              text-white hover:text-gold-400 transition-all duration-300
              ${scrolled ? 'p-1.5' : 'p-2'}
            `}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger Icon */}
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} ${scrolled ? 'h-5 w-5' : 'h-6 w-6'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`
          transition-all duration-300 transform
          ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'}
          md:hidden
        `}
        id="mobile-menu"
      >
        <div
          className={`
            px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90
            ${scrolled ? 'shadow-lg' : ''}
          `}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                text-white hover:text-gold-400 block px-3 py-2
                rounded-md transition-colors duration-200
                ${scrolled ? 'text-sm' : 'text-base'} font-medium
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;