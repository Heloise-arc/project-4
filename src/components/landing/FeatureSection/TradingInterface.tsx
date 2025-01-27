import React from 'react';
import { motion } from 'framer-motion';

// Import trading page image using URL constructor
const tradingPageImage = new URL('../../../assets/images/trading-page.png', import.meta.url).href;

export const TradingInterface: React.FC = () => {
  return (
    <motion.div
      className="relative w-[55vw]"
      initial={{ y: 20 }}
      animate={{ 
        y: [20, 0, 20],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <img 
        src={tradingPageImage}
        alt="Trading Interface"
        className="w-full h-auto rounded-xl"
        style={{
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}
        onError={(e) => console.error('Failed to load trading page image:', e)}
        onLoad={() => console.log('Trading page image loaded successfully')}
      />
    </motion.div>
  );
};