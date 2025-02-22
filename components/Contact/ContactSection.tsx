'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  Globe 
} from 'lucide-react';
import { useFormValidation } from '@/hooks/useFormValidation';

// Form data interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// Initial form state
const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
};

// Validation rules
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s]*$/
  },
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  },
  phone: {
    pattern: /^\+?[\d\s-]{10,}$/
  },
  message: {
    required: true,
    minLength: 10
  }
};

// Contact information array
const contactInfo = [
  {
    icon: <MapPin className="text-gold-400" size={24} />,
    title: 'Office Location',
    content: '946 Lincoln Avenue, San Jose, California 95125',
    description: 'Main Office & Headquarters'
  },
  {
    icon: <Phone className="text-gold-400" size={24} />,
    title: 'Phone Numbers',
    content: [
      { label: 'Main Line', value: '(925) 305-5980', href: 'tel:+19253055980' },
      { label: 'Support', value: '(510) 695-3177', href: 'tel:+15106953177' }
    ]
  },
  {
    icon: <Mail className="text-gold-400" size={24} />,
    title: 'Email Address',
    content: 'info@goldminecomm.net',
    href: 'mailto:info@goldminecomm.net',
    description: 'Send us an email anytime'
  },
  {
    icon: <Globe className="text-gold-400" size={24} />,
    title: 'Service Areas',
    content: 'San Francisco Bay Area, Sacramento, Central Valley',
    description: 'Available for projects across Northern California'
  },
  {
    icon: <Clock className="text-gold-400" size={24} />,
    title: 'Business Hours',
    content: [
      'Monday - Friday: 9:00 AM - 6:00 PM',
      'Saturday: 10:00 AM - 2:00 PM',
      'Sunday: Closed'
    ],
    description: '24/7 Emergency Services Available'
  }
];

export default function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [showGuidance, setShowGuidance] = useState<Record<string, boolean>>({});

  // Form submission handler
  const handleSubmit = async (values: FormData) => {
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to send message');
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      throw error;
    }
  };

  // Form validation hook
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: onSubmit,
  } = useFormValidation({
    initialValues: INITIAL_FORM_DATA,
    validationRules,
    onSubmit: handleSubmit,
  });

  const handleFocus = (name: string) => {
    setShowGuidance(prev => ({ ...prev, [name]: true }));
  };

  const handleFieldBlur = (name: keyof FormData) => {
    handleBlur(name);
    setShowGuidance(prev => ({ ...prev, [name]: false }));
  };

  return (
    <section className="relative py-24 bg-gray-900" aria-labelledby="contact-heading">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[200%] h-full">
          <div 
            className="w-full h-full rotate-12 opacity-20"
            style={{
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 20px,
                rgba(212,175,55,0.1) 20px,
                rgba(212,175,55,0.1) 40px
              )`
            }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            id="contact-heading"
            className="text-4xl font-bold text-white mb-4"
          >
            Let&apos;s Work Together
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to start your project? Contact us today for a free consultation 
            and let&apos;s bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start">
                      <div className="p-1 rounded-lg bg-gray-50 
                                    group-hover:bg-gold-50 transition-colors">
                        {item.icon}
                      </div>
                      <div className="ml-2">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        {Array.isArray(item.content) ? (
                          <div className="mt-1 space-y-1">
                            {item.content.map((line, i) => (
                              typeof line === 'string' ? (
                                <p key={i} className="text-gray-600">{line}</p>
                              ) : (
                                <a
                                  key={i}
                                  href={line.href}
                                  className="block text-gray-600 hover:text-gold-400 
                                           transition-colors"
                                >
                                  {line.label}: {line.value}
                                </a>
                              )
                            ))}
                          </div>
                        ) : item.href ? (
                          <a
                            href={item.href}
                            className="text-gray-600 hover:text-gold-400 
                                     transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600">{item.content}</p>
                        )}
                        {item.description && (
                          <p className="mt-1 text-sm text-gray-500">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* License & Insurance Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  Licensed & Insured
                </h4>
                <p className="text-gray-600 mb-1">
                  Lic# 1099543 | Bonded & Insured
                </p>
                <p className="text-sm text-gray-500">
                  Forward your estimate & we&apos;ll beat it!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                {/* Form Status Messages */}
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`rounded-lg p-4 ${
                        submitStatus === 'success' ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {submitStatus === 'success' ? (
                          <>
                            <CheckCircle2 className="text-green-500" />
                            <span className="text-green-700">
                              Message sent successfully!
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="text-red-500" />
                            <span className="text-red-700">
                              Failed to send message. Please try again.
                            </span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label 
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => handleFieldBlur('name')}
                        className={`
                          w-full px-4 py-2 rounded-lg border
                          focus:ring-2 focus:ring-gold-400 focus:border-transparent
                          transition-colors
                          ${errors.name && touched.name 
                            ? 'border-red-500' 
                            : 'border-gray-300'}
                        `}
                        aria-invalid={!!errors.name}
                        aria-describedby="name-error"
                      />
                      <AnimatePresence>
                        {showGuidance.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 right-0 mt-1 p-2 bg-white 
                                     border rounded-md shadow-lg z-10"
                          >
                            <p className="text-sm text-gray-600">
                              Enter your full name (2 or more characters)
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {touched.name && errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleFieldBlur('email')}
                        className={`
                          w-full px-4 py-2 rounded-lg border
                          focus:ring-2 focus:ring-gold-400 focus:border-transparent
                          transition-colors
                          ${errors.email && touched.email 
                            ? 'border-red-500' 
                            : 'border-gray-300'}
                        `}
                        aria-invalid={!!errors.email}
                        aria-describedby="email-error"
                      />
                      {touched.email && errors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label 
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`
                        w-full px-4 py-2 rounded-lg border
                        focus:ring-2 focus:ring-gold-400 focus:border-transparent
                        ${errors.phone && touched.phone 
                          ? 'border-red-500' 
                          : 'border-gray-300'}
                      `}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {touched.phone && errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Service Field */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={values.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300
                               focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="construction">Construction</option>
                      <option value="communications">Communications</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={values.message}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      className={`
                        w-full px-4 py-2 rounded-lg border
                        focus:ring-2 focus:ring-gold-400 focus:border-transparent
                        ${errors.message && touched.message
                          ? 'border-red-500'
                          : 'border-gray-300'}
                      `}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {touched.message && errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      px-8 py-3 bg-gold-400 text-white rounded-lg
                      font-medium transition-all duration-200
                      flex items-center justify-center min-w-[150px]
                      ${isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gold-500 hover:shadow-lg'
                      }
                    `}
                  >
                    {isSubmitting ? (

                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>

                {/* Required Fields Note */}
                <p className="text-sm text-gray-500 mt-2">
                  * Required fields
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import { Phone, Mail, MapPin, Clock } from 'lucide-react';
// import { ContactForm } from './ContactForm';

// const contactInfo = [
//   {
//     icon: <MapPin className="text-gold-400" size={24} />,
//     title: 'Address',
//     content: (
//       <p>
//         946 Lincoln Avenue,<br />
//         San Jose, California 95125
//       </p>
//     ),
//   },
//   {
//     icon: <Phone className="text-gold-400" size={24} />,
//     title: 'Phone',
//     content: (
//       <a
//         href="tel:+925-305-5980"
//         className="hover:text-gold-400 transition-colors"
//       >
//         (925) 305-5980
//       </a>
//     ),
//   },
//   {
//     icon: <Mail className="text-gold-400" size={24} />,
//     title: 'Email',
//     content: (
//       <a
//         href="mailto:info@goldminecomm.net"
//         className="hover:text-gold-400 transition-colors"
//       >
//         info@goldminecomm.net
//       </a>
//     ),
//   },
//   {
//     icon: <Clock className="text-gold-400" size={24} />,
//     title: 'Business Hours',
//     content: (
//       <>
//         Monday - Friday: 9:00 AM - 6:00 PM<br />
//         Saturday: 10:00 AM - 2:00 PM<br />
//         Sunday: Closed
//       </>
//     ),
//   },
// ];

// export default function ContactSection() {
//   return (
//     <section className="py-20 bg-gray-900" aria-labelledby="contacts-heading">

//       {/* Background Effects */}
//       {/* <div className="absolute inset-0"> */}
//         {/* <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[200%] h-full"> */}
//           <div
//             className="w-full h-full rotate-12 opacity-20"
//             style={{
//               background: `
//                 repeating-linear-gradient(
//                   45deg,
//                   transparent,
//                   transparent 20px,
//                   rgba(212,175,55,0.1) 20px,
//                   rgba(212,175,55,0.1) 40px
//                 )
//               `
//             }}
//           />
//         {/* </div> */}
//       {/* </div> */}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12 lg:mb-16"
//         >
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-50 mb-4">
//             Get In Touch
//           </h1>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             Have a project in mind? We&apos;d love to hear from you. Send us a message
//             and we&apos;ll respond as soon as possible.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* Contact Information */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="lg:col-span-1"
//           >
//             <div className="bg-gray-50 rounded-2xl shadow-lg p-6 lg:p-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">
//                 Contact Information
//               </h2>

//               <div className="space-y-6">
//                 {contactInfo.map((item, index) => (
//                   <motion.div
//                     key={item.title}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     className="flex items-start group"

//                   >
//                     <div className="flex-shrink-0 p-2 rounded-lg bg-gray-50 group-hover:bg-gold-50 transition-colors duration-300">
//                       {item.icon}
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="font-medium text-gray-900">{item.title}</h3>
//                       <div className="text-gray-600 mt-1">{item.content}</div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Social Media Links */}
//               <div className="mt-8 pt-8 border-t border-gray-200">
//                 <h3 className="font-medium text-gray-900 mb-4">
//                   Follow Us
//                 </h3>
//                 <div className="flex space-x-4">
//                   {/* Add your social media links here */}
//                   <a
//                     href="#"
//                     className="p-2 rounded-lg bg-gray-50 hover:bg-gold-50 transition-colors duration-300"
//                     aria-label="Visit our LinkedIn page"
//                   >
//                     <svg
//                       className="w-5 h-5 text-gray-600 hover:text-gold-400"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                     </svg>
//                   </a>
//                   {/* Add more social media links as needed */}
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="lg:col-span-2"
//           >
//             <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
//               <ContactForm />
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
