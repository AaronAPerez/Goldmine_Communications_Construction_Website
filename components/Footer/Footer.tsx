'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Scroll to top button
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={scrollToTop}
          className="p-3 bg-gold-400 text-white rounded-full shadow-lg hover:bg-gold-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="/images/logo-circular.png"
                alt="Goldmine Communications and Construction"
                width={150}
                height={150}
                className="mb-4"
              />
            </Link>
            <p className="text-gray-300">
              Excellence in communications and construction services
            </p>
            <p className="text-gray-300 text-sm">
              Lic# 1099543 | Bonded & Insured
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gold-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold-400 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Projects', href: '/projects' },
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-gold-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gold-400 mr-0 group-hover:mr-2 transition-all"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {[
                'Communications Infrastructure',
                'Network Solutions',
                'Construction Services',
                'Project Management',
                'Maintenance & Support',
                'Consulting & Design'
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-gold-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gold-400 mr-0 group-hover:mr-2 transition-all"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-gold-400 mr-3 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-300">
                  946 Lincoln Avenue,<br />
                  San Jose, California 95125
                </span>
              </li>
              <li>
                <a
                  href="tel:+19253055980"
                  className="flex items-center text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <Phone className="text-gold-400 mr-3" size={20} />
                  (925) 305-5980
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@goldminecomm.net"
                  className="flex items-center text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <Mail className="text-gold-400 mr-3" size={20} />
                  info@goldminecomm.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription - Optional */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="max-w-md mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2 text-white">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for the latest updates and industry insights.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-white"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold-400 hover:bg-gold-500 text-white rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              © {currentYear} Goldmine Communications and Construction Inc. All rights reserved.
            </motion.p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-gold-400 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-gold-400 text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-gold-400 text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};