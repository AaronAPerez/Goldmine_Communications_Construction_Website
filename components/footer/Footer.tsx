'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="/images/logo-circular.png"
                alt="Goldmine Communications and Construction"
                width={200}
                height={50}
                className="mb-4"
              />
            </Link>
            <p className="text-gray-300">
              Excellence in communications and construction services since 2022
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
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Services', 'Projects', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                'Communications Infrastructure',
                'Network Solutions',
                'Construction Services',
                'Project Management',
                'Maintenance',
              ].map((service) => (
                <li key={service}>
                  <Link 
                    href="/services"
                    className="text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-gold-400 mr-2 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-300">
                  123 Business Avenue,<br />
                  City, State 12345
                </span>
              </li>
              <li>
                <a 
                  href="tel:+1234567890" 
                  className="flex items-center text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <Phone className="text-gold-400 mr-2" size={20} />
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@goldminecomm.net" 
                  className="flex items-center text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <Mail className="text-gold-400 mr-2" size={20} />
                  info@goldminecomm.net
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Goldmine Communications and Construction. All rights reserved.
            </p>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;