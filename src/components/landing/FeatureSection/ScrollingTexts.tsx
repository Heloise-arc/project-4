import React from 'react';
import { motion } from 'framer-motion';

const scrollingTexts = [
  'crypto natives',
  'scalpers',
  'swing traders',
  'fx traders',
  'event-based traders',
  'price prediction enjoyers',
  'hedgers',
  'agents',
  'market makers',
  'volatility traders',
  'delta neutral traders',
  'grid traders'
];

export const ScrollingTexts: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)'
      }}
    >
      <motion.div
        className="flex flex-col text-xl font-bold text-primary"
        animate={{ 
          y: [0, -((scrollingTexts.length * 40) + 100)]
        }}
        transition={{
          y: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }
        }}
      >
        {[...scrollingTexts, ...scrollingTexts].map((text, i) => (
          <div 
            key={`${text}-${i}`}
            className="py-3 text-center whitespace-nowrap opacity-70"
          >
            {text}
          </div>
        ))}
      </motion.div>
    </div>
  );
}; 