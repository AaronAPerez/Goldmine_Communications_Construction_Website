'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    service: string;
}

interface FormErrors {
    [key: string]: string;
}

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                service: '',
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have a project in mind? We'd love to hear from you. Send us a message
                        and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-primary-900 mb-6">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <MapPin className="text-gold-400 mr-4 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-primary-900">Address</h3>
                                        <p className="text-gray-600 mt-1">
                                            123 Business Avenue,<br />
                                            City, State 12345
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Phone className="text-gold-400 mr-4 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-primary-900">Phone</h3>
                                        <a
                                            href="tel:+1234567890"
                                            className="text-gray-600 hover:text-gold-400 transition-colors mt-1 block"
                                        >
                                            (123) 456-7890
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Mail className="text-gold-400 mr-4 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-primary-900">Email</h3>
                                        <a
                                            href="mailto:info@goldminecomm.net"
                                            className="text-gray-600 hover:text-gold-400 transition-colors mt-1 block"
                                        >
                                            info@goldminecomm.net
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Clock className="text-gold-400 mr-4 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-primary-900">Business Hours</h3>
                                        <p className="text-gray-600 mt-1">
                                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                                            Saturday: 10:00 AM - 2:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Name*
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`
                      w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-400
                      focus:border-transparent transition-colors
                      ${errors.name ? 'border-red-500' : 'border-gray-300'}
                    `}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`
                      w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-400
                      focus:border-transparent transition-colors
                      ${errors.email ? 'border-red-500' : 'border-gray-300'}
                    `}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
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
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                    />
                                </div>

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
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                    >
                                        <option value="">Select a service</option>
                                        <option value="communications">Communications Infrastructure</option>
                                        <option value="construction">Construction Services</option>
                                        <option value="network">Network Solutions</option>
                                        <option value="maintenance">Maintenance</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Subject */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                                    />
                                </div>

                                {/* Message */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Message*
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`
                      w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-400
                      focus:border-transparent transition-colors
                      ${errors.message ? 'border-red-500' : 'border-gray-300'}
                    `}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`
                    w-full px-6 py-3 bg-gold-400 text-white rounded-lg
                    font-medium transition-all duration-200
                    ${isSubmitting
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:bg-gold-500 hover:shadow-lg'
                                        }
                  `}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : 'Send Message'}
                                </button>
                            </div>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                                    Thank you for your message! We'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                                    There was an error sending your message. Please try again later.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;