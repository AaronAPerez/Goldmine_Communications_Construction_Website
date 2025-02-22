'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactForm } from './ContactForm';

const contactInfo = [
  {
    icon: <MapPin className="text-gold-400" size={24} />,
    title: 'Address',
    content: (
      <p>
        946 Lincoln Avenue,<br />
        San Jose, California 95125
      </p>
    ),
  },
  {
    icon: <Phone className="text-gold-400" size={24} />,
    title: 'Phone',
    content: (
      <a
        href="tel:+925-305-5980"
        className="hover:text-gold-400 transition-colors"
      >
        (925) 305-5980
      </a>
    ),
  },
  {
    icon: <Mail className="text-gold-400" size={24} />,
    title: 'Email',
    content: (
      <a
        href="mailto:info@goldminecomm.net"
        className="hover:text-gold-400 transition-colors"
      >
        info@goldminecomm.net
      </a>
    ),
  },
  {
    icon: <Clock className="text-gold-400" size={24} />,
    title: 'Business Hours',
    content: (
      <>
        Monday - Friday: 9:00 AM - 6:00 PM<br />
        Saturday: 10:00 AM - 2:00 PM<br />
        Sunday: Closed
      </>
    ),
  },
];

export default function ContactSection() {
  return (
    <section className="py-20 bg-gray-900" aria-labelledby="contacts-heading">

      {/* Background Effects */}
      {/* <div className="absolute inset-0"> */}
        {/* <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[200%] h-full"> */}
          <div 
            className="w-full h-full rotate-12 opacity-20"
            style={{
              background: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  rgba(212,175,55,0.1) 20px,
                  rgba(212,175,55,0.1) 40px
                )
              `
            }}
          />
        {/* </div> */}
      {/* </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-50 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start group"
                    
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-gray-50 group-hover:bg-gold-50 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <div className="text-gray-600 mt-1">{item.content}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {/* Add your social media links here */}
                  <a
                    href="#"
                    className="p-2 rounded-lg bg-gray-50 hover:bg-gold-50 transition-colors duration-300"
                    aria-label="Visit our LinkedIn page"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 hover:text-gold-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  {/* Add more social media links as needed */}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
