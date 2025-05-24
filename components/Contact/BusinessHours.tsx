import { motion, useInView } from "framer-motion";
import { Clock } from "lucide-react";
import { useRef } from "react";

/**
 * Business Hours Component
 * Displays operating hours in a clean, accessible format
 */
const BusinessHours = () => {
  const hoursRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(hoursRef, { once: true });


const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
  // { day: 'Emergency Services', hours: '24/7 Available' }
];
  
  return (
    <motion.div
      ref={hoursRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-gold-500" />
        <h3 className="text-xl font-semibold text-gray-900">Business Hours</h3>
      </div>

      <div className="space-y-3">
        {businessHours.map((schedule, index) => (
          <motion.div
            key={schedule.day}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <span className="text-gray-700 font-medium">{schedule.day}</span>
            <span className={`text-sm font-semibold ${schedule.day === 'Emergency Services'
              ? 'text-red-600'
              : schedule.hours === 'Closed'
                ? 'text-gray-400'
                : 'text-gray-900'
              }`}>
              {schedule.hours}
            </span>
          </motion.div>
        ))}
      </div>

      {/* <div className="mt-6 p-4 bg-gold-50 rounded-lg">
        <p className="text-sm text-gold-700">
          <strong>Emergency Services:</strong> Available 24/7 for urgent infrastructure needs.
        </p>
      </div> */}
    </motion.div>
  );
};

export default BusinessHours;