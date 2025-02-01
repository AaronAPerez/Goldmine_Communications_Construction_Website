// 'use client';

// import { useState } from 'react';
// import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
// import { useFormValidation } from '@/hooks/useFormValidation';


// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   subject: string;
//   message: string;
//   service: string;
// }

// const INITIAL_FORM_DATA: FormData = {
//   name: '',
//   email: '',
//   phone: '',
//   subject: '',
//   message: '',
//   service: '',
// };

// const validationRules = {
//   name: {
//     required: true,
//     minLength: 2,
//     maxLength: 50,
//   },
//   email: {
//     required: true,
//     pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//   },
//   phone: {
//     pattern: /^\+?[\d\s-]{10,}$/,
//   },
//   message: {
//     required: true,
//     minLength: 10,
//     maxLength: 1000,
//   },
// };

// export function ContactForm() {
//   const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
//   const [showGuidance, setShowGuidance] = useState<Record<string, boolean>>({});

//   const handleSubmit = async (values: FormData) => {
//     setSubmitStatus(null);
    
//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) throw new Error('Failed to send message');
//       setSubmitStatus('success');
//     } catch (error) {
//       setSubmitStatus('error');
//       throw error; // Re-throw to be handled by the hook
//     }
//   };

//   const {
//     values,
//     errors,
//     touched,
//     isSubmitting,
//     handleChange,
//     handleBlur,
//     handleSubmit: onSubmit,
//   } = useFormValidation({
//     initialValues: INITIAL_FORM_DATA,
//     validationRules,
//     onSubmit: handleSubmit,
//   });

//   const handleFocus = (name: string) => {
//     setShowGuidance(prev => ({ ...prev, [name]: true }));
//   };

//   const handleFieldBlur = (name: keyof FormData) => {
//     handleBlur(name);
//     setShowGuidance(prev => ({ ...prev, [name]: false }));
//   };

//   const getFieldStatus = (name: keyof FormData) => {
//     if (!touched[name] || !values[name]) return '';
//     return errors[name] ? 'error' : 'valid';
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-6" noValidate>
//       {/* Form alerts */}
//       {submitStatus && (
//         <Alert variant={submitStatus === 'success' ? 'success' : 'destructive'}>
//           <AlertDescription>
//             {submitStatus === 'success' ? (
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="h-4 w-4" />
//                 <span>Message sent successfully! We&apos;ll get back to you soon.</span>
//               </div>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <AlertCircle className="h-4 w-4" />
//                 <span>Failed to send message. Please try again later.</span>
//               </div>
//             )}
//           </AlertDescription>
//         </Alert>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Name Field */}
//         <div>
//           <label 
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Name *
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={values.name}
//               onChange={handleChange}
//               onFocus={() => handleFocus('name')}
//               onBlur={() => handleFieldBlur('name')}
//               className={`
//                 w-full px-4 py-2 border rounded-lg
//                 focus:ring-2 focus:ring-gold-400 focus:border-transparent
//                 transition-colors
//                 ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'}
//                 ${getFieldStatus('name') === 'valid' ? 'border-green-500' : ''}
//               `}
//               aria-describedby={`${errors.name ? 'name-error' : ''} ${showGuidance.name ? 'name-guidance' : ''}`}
//               aria-invalid={!!errors.name}
//             />
//             {showGuidance.name && (
//               <div 
//                 id="name-guidance"
//                 className="absolute left-0 right-0 mt-1 p-2 bg-white border rounded-md shadow-lg z-10"
//               >
//                 <p className="text-sm text-gray-600">
//                   Enter your full name (2-50 characters)
//                 </p>
//               </div>
//             )}
//             {touched.name && errors.name && (
//               <p 
//                 id="name-error"
//                 className="mt-1 text-sm text-red-500"
//                 role="alert"
//               >
//                 {errors.name}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Email Field */}
//         <div>
//           <label 
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Email *
//           </label>
//           <div className="relative">
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={values.email}
//               onChange={handleChange}
//               onFocus={() => handleFocus('email')}
//               onBlur={() => handleFieldBlur('email')}
//               className={`
//                 w-full px-4 py-2 border rounded-lg
//                 focus:ring-2 focus:ring-gold-400 focus:border-transparent
//                 transition-colors
//                 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}
//                 ${getFieldStatus('email') === 'valid' ? 'border-green-500' : ''}
//               `}
//               aria-describedby={`${errors.email ? 'email-error' : ''} ${showGuidance.email ? 'email-guidance' : ''}`}
//               aria-invalid={!!errors.email}
//             />
//             {showGuidance.email && (
//               <div 
//                 id="email-guidance"
//                 className="absolute left-0 right-0 mt-1 p-2 bg-white border rounded-md shadow-lg z-10"
//               >
//                 <p className="text-sm text-gray-600">
//                   Enter a valid email address (e.g., name@example.com)
//                 </p>
//               </div>
//             )}
//             {touched.email && errors.email && (
//               <p 
//                 id="email-error"
//                 className="mt-1 text-sm text-red-500"
//                 role="alert"
//               >
//                 {errors.email}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Phone Field */}
//         <div>
//           <label 
//             htmlFor="phone"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Phone (Optional)
//           </label>
//           <div className="relative">
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={values.phone}
//               onChange={handleChange}
//               onFocus={() => handleFocus('phone')}
//               onBlur={() => handleFieldBlur('phone')}
//               className={`
//                 w-full px-4 py-2 border rounded-lg
//                 focus:ring-2 focus:ring-gold-400 focus:border-transparent
//                 transition-colors
//                 ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'}
//                 ${getFieldStatus('phone') === 'valid' ? 'border-green-500' : ''}
//               `}
//               aria-describedby={`${errors.phone ? 'phone-error' : ''} ${showGuidance.phone ? 'phone-guidance' : ''}`}
//               aria-invalid={!!errors.phone}
//             />
//             {showGuidance.phone && (
//               <div 
//                 id="phone-guidance"
//                 className="absolute left-0 right-0 mt-1 p-2 bg-white border rounded-md shadow-lg z-10"
//               >
//                 <p className="text-sm text-gray-600">
//                   Enter a valid phone number (optional)
//                 </p>
//               </div>
//             )}
//             {touched.phone && errors.phone && (
//               <p 
//                 id="phone-error"
//                 className="mt-1 text-sm text-red-500"
//                 role="alert"
//               >
//                 {errors.phone}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Service Field */}
//         <div>
//           <label 
//             htmlFor="service"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Service Interest (Optional)
//           </label>
//           <select
//             id="service"
//             name="service"
//             value={formData.service}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
//           >
//             <option value="">Select a service</option>
//             <option value="communications">Communications Infrastructure</option>
//             <option value="construction">Construction Services</option>
//             <option value="network">Network Solutions</option>
//             <option value="maintenance">Maintenance</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {/* Subject Field */}
//         <div className="md:col-span-2">
//           <label 
//             htmlFor="subject"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Subject (Optional)
//           </label>
//           <input
//             type="text"
//             id="subject"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
//           />
//         </div>

//         {/* Message Field */}
//         <div className="md:col-span-2">
//           <label 
//             htmlFor="message"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Message *
//           </label>
//           <div className="relative">
//             <textarea
//               id="message"
//               name="message"
//               rows={6}
//               value={formData.message}
//               onChange={handleChange}
//               onFocus={() => handleFocus('message')}
//               onBlur={() => handleBlur('message')}
//               className={`
//                 w-full px-4 py-2 border rounded-lg
//                 focus:ring-2 focus:ring-gold-400 focus:border-transparent
//                 transition-colors
//                 ${validation.errors.message ? 'border-red-500' : 'border-gray-300'}
//                 ${getFieldStatus('message') === 'valid' ? 'border-green-500' : ''}
//               `}
//               aria-describedby="message-error message-guidance"
//             />
//             {showGuidance.message && (
//               <div 
//                 id="message-guidance"
//                 className="absolute left-0 right-0 mt-1 p-2 bg-white border rounded-md shadow-lg z-10"
//               >
//                 <p className="text-sm text-gray-600">
//                   Enter your message (minimum 10 characters)
//                 </p>
//               </div>
//             )}
//             {validation.touched.message && validation.errors.message && (
//               <p 
//                 id="message-error"
//                 className="mt-1 text-sm text-red-500"
//               >
//                 {validation.errors.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`
//             px-6 py-3 bg-gold-400 text-white rounded-lg
//             font-medium transition-all duration-200 min-w-[150px]
//             flex items-center justify-center
//             ${isSubmitting
//               ? 'opacity-50 cursor-not-allowed'
//               : 'hover:bg-gold-500 hover:shadow-lg'
//             }
//           `}
//           aria-disabled={isSubmitting}
//         >
//                       {isSubmitting ? (
//             <span className="flex items-center gap-2">
//               <Loader2 className="h-5 w-5 animate-spin" />
//               Sending...
//             </span>
//           ) : (
//             'Send Message'
//           )}
//         </button>
//       </div>

//       {/* Required Fields Note */}
//       <p className="text-sm text-gray-500 mt-2">
//         * Required fields
//       </p>
//     </form>
//   );
// };

// export default ContactForm;