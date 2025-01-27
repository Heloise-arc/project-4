import React from 'react';
import { motion } from 'framer-motion';

// Import the trading page image using URL constructor
const tradingPageImage = new URL('../../../assets/images/trading-page.png', import.meta.url).href;

export const FeatureImage: React.FC = () => {
  return (
    <motion.div
      className="relative perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.img
        src={tradingPageImage}
        alt="Trading Interface"
        className="w-full h-auto rounded-xl shadow-2xl"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(78, 159, 61, 0.3))',
          transform: 'translateZ(50px)',
        }}
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          transition: { duration: 0.4 }
        }}
        onError={(e) => {
          console.error('❌ Failed to load trading page image:', e);
          // Log the attempted URL for debugging
          console.log('🔍 Attempted image URL:', tradingPageImage);
        }}
        onLoad={() => console.log('✅ Trading page image loaded successfully:', tradingPageImage)}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'radial-gradient(circle at center, rgba(78, 159, 61, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'translateZ(30px)',
        }}
      />
    </motion.div>
  );
};