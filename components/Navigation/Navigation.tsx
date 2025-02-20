'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Communications', href: '/communications' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 bg-primary-900/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="/images/logo-banner.png"
              alt="Goldmine C&C"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {routes.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md
                  transition-colors duration-200
                  ${pathname === href 
                    ? 'text-gold-400 bg-primary-800/50' 
                    : 'text-gray-300 hover:text-gold-400 hover:bg-primary-800/30'}
                `}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary-800 focus:outline-none"
              aria-label="Main menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {routes.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`
                block px-3 py-2 rounded-md text-base font-medium
                transition-colors duration-200
                ${pathname === href
                  ? 'text-gold-400 bg-primary-800'
                  : 'text-gray-300 hover:text-gold-400 hover:bg-primary-800'}
              `}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}