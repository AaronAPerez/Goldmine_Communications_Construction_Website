import { motion } from "framer-motion";

 // Decorative floating elements
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Golden circles */}
      <motion.div 
        className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-gold-400/5 border border-gold-400/20"
        animate={{ 
          y: [0, -15, 0], 
          rotate: [0, 5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full bg-gold-400/5 border border-gold-400/20"
        animate={{ 
          y: [0, 20, 0], 
          rotate: [0, -5, 0],
          scale: [1, 1.03, 1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Grid patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B3995D' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );

  export default FloatingElements;