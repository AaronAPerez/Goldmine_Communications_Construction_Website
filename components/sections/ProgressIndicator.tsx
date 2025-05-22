import { useInView, motion, useScroll } from "framer-motion";
import { useRef } from "react";

  // Progressive loading indicator

  // Progressive loading indicator
  const ProgressIndicator = () => {
    const progressRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(progressRef);
    const { scrollYProgress } = useScroll();

    return (
      <motion.div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gray-200 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
      >
        <motion.div
          className="h-full bg-gradient-gold shadow-gold-lg"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </motion.div>
    );
  };
  

  export default ProgressIndicator;