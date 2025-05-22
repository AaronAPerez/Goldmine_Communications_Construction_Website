import { motion } from "framer-motion";


/**
 * Text Animation Component
 * Implements staggered text animation for enhanced visual appeal
 */
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText = ({ text, className = '', delay = 0 }: AnimatedTextProps) => {
  const words = text.split(' ');
  
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + (index * 0.1),
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;