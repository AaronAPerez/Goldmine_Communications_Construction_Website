import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";

/**
 * Text Generate Effect Component
 * Implements Aceternity UI's text generate effect with new color scheme
 */
interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

const TextGenerateEffect = ({ 
  words, 
  className = '', 
  filter = true, 
  duration = 1 
}: TextGenerateEffectProps) => {
  const controls = useAnimation();
  const wordsArray = words.split(' ');

  useEffect(() => {
    const sequence = async () => {
      await controls.start((i) => ({
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
        transition: {
          duration: duration || 1,
          delay: i * 0.1,
        },
      }));
    };
    
    sequence();
  }, [controls, duration, filter]);

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-white opacity-0"
              style={{
                filter: filter ? 'blur(10px)' : 'none',
              }}
              custom={idx}
              animate={controls}
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="font-bold">
        {renderWords()}
      </div>
    </div>
  );
};

export default TextGenerateEffect;
