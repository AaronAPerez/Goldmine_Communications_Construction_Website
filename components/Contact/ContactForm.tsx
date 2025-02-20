'use client';

import { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormValidation } from '@/hooks/useFormValidation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  service: '',
};

const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]*$/,
  },
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  phone: {
    pattern: /^\+?[\d\s-]{10,}$/,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
};

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [showGuidance, setShowGuidance] = useState<Record<string, boolean>>({});

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

  const getFieldStatus = (name: keyof FormData) => {
    if (!touched[name] || !values[name]) return '';
    return errors[name] ? 'error' : 'valid';
  };

  return (
    <motion.form 
      onSubmit={onSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      noValidate
    >
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
                  <span className="text-green-700">Message sent successfully!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-red-500" />
                  <span className="text-red-700">Failed to send message. Please try again.</span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                w-full px-4 py-2 border rounded-lg
                focus:ring-2 focus:ring-gold-400 focus:border-transparent
                transition-colors
                ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'}
                ${getFieldStatus('name') === 'valid' ? 'border-green-500' : ''}
              `}
              aria-describedby="name-error"
              aria-invalid={!!errors.name}
            />
            <AnimatePresence>
              {showGuidance.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-1 p-2 bg-white border rounded-md shadow-lg z-10"
                >
                  <p className="text-sm text-gray-600">
                    Enter your full name (2-50 characters)
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {touched.name && errors.name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="name-error"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.name}
              </motion.p>
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
                w-full px-4 py-2 border rounded-lg
                focus:ring-2 focus:ring-gold-400 focus:border-transparent
                transition-colors
                ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}
                ${getFieldStatus('email') === 'valid' ? 'border-green-500' : ''}
              `}
              aria-describedby="email-error"
              aria-invalid={!!errors.email}
            />
            <AnimatePresence>
              {showGuidance.email && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-1 p-2 bg-white border rounded-md shadow-lg z-10"
                >
                  <p className="text-sm text-gray-600">
                    Enter a valid email address (e.g., name@example.com)
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {touched.email && errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="email-error"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
        </div>

        {/* Service Field */}
        <div className="md:col-span-2">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-gold-400 focus:border-transparent"
          >
            <option value="">Select a service</option>
            <option value="communications">Communications Infrastructure</option>
            <option value="construction">Construction Services</option>
            <option value="network">Network Solutions</option>
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
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={6}
              value={values.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={() => handleFieldBlur('message')}
              className={`
                w-full px-4 py-2 border rounded-lg
                focus:ring-2 focus:ring-gold-400 focus:border-transparent
                transition-colors
                ${errors.message && touched.message ? 'border-red-500' : 'border-gray-300'}
                ${getFieldStatus('message') === 'valid' ? 'border-green-500' : ''}
              `}
              aria-describedby="message-error"
              aria-invalid={!!errors.message}
            />
            <AnimatePresence>
              {showGuidance.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-1 p-2 bg-white border rounded-md shadow-lg z-10"
                >
                  <p className="text-sm text-gray-600">
                    Enter your message (minimum 10 characters)
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {touched.message && errors.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="message-error"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.message}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.div
        className="flex justify-end"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            px-6 py-3 bg-gold-400 text-white rounded-lg
            font-medium transition-all duration-200 min-w-[150px]
            flex items-center justify-center
            ${isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gold-500 hover:shadow-lg'
            }
          `}
          aria-disabled={isSubmitting}
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
      </motion.div>

      {/* Required Fields Note */}
      <p className="text-sm text-gray-500 mt-2">
        * Required fields
      </p>
    </motion.form>
  );
}

