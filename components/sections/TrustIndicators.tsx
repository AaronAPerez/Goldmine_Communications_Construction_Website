import { motion } from "framer-motion";

// Trust indicators component
const TrustIndicators = () => {
  const indicators = [
    { text: 'Licensed & Insured #1099543', icon: '🛡️' },
    { text: '15+ Years Experience', icon: '⭐' },
    { text: '24/7 Emergency Services', icon: '🚨' },
    { text: 'We Beat Estimates', icon: '💰' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-white/90"
    >
      {indicators.map((indicator, index) => (
        <motion.div
          key={indicator.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7 + index * 0.1, duration: 0.3 }}
          className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm 
                   rounded-full px-4 py-2 border border-white/20 hover:bg-white/15 
                   transition-colors"
        >
          <span className="text-base">{indicator.icon}</span>
          <span className="hidden sm:inline">{indicator.text}</span>
          <span className="sm:hidden">
            {indicator.text.split(' ')[0]} {indicator.text.split(' ')[1]}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TrustIndicators;