import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function TopContactBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary-900 text-white">
      {/* Top Contact Bar */}
      <div className="bg-gold-400 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            {/* Left Side Contact Info */}
            <div className="flex items-center space-x-6">
              <a 
                href="tel:+19253055980"
                className="flex items-center hover:text-white/90 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="sm:inline">(925) 305-5980</span>
              </a>
              <a 
                href="mailto:info@goldminecomm.net"
                className="flex items-center hover:text-white/90 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">info@goldminecomm.net</span>
              </a>
            </div>

            {/* Right Side Info */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>946 Lincoln Ave, San Jose, CA 95125</span>
              </div>
              <div className="hidden lg:flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Mon-Fri: 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* License Info Bar */}
      <div className="bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8 text-xs text-white/80">
            <div>
              Lic# 1099543 | Bonded & Insured
            </div>
            <div className="hidden sm:block">
              Forward your estimate & we&apos;ll beat it!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}