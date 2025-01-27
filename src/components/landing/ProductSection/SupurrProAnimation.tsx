import React from 'react';
import { motion } from 'framer-motion';

// Import the image using URL constructor
const supurrProImage = new URL('../../../assets/images/supurr-pro.svg', import.meta.url).href;

export const SupurrProAnimation: React.FC = () => {
  return (
    <div className="w-8 h-8 relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10" />
      
      <motion.img
        src={supurrProImage}
        alt=""
        className="absolute inset-0 w-full h-full scale-[2]"
        animate={{
          x: [0, -1, 1, -1, 0],
          y: [0, 1, -1, 1, 0],
          scale: [2, 2.2, 2],
          rotate: -45, // Increased from -15 to -45 degrees
          filter: [
            'drop-shadow(0 0 0px rgba(var(--primary), 0.3))',
            'drop-shadow(0 0 8px rgba(var(--primary), 0.6))',
            'drop-shadow(0 0 0px rgba(var(--primary), 0.3))'
          ]
        }}
        transition={{
          duration: 0.8,
          times: [0, 0.2, 0.4, 0.6, 0.8],
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          repeatDelay: 1.5,
          rotate: {
            duration: 0,
            delay: 0
          }
        }}
        style={{
          willChange: 'transform, filter',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
        onError={(e) => console.error('Failed to load Supurr Pro image:', e)}
        onLoad={() => console.log('Supurr Pro image loaded successfully')}
      />

      {/* Speed lines effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1.5
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/30"
            style={{
              height: '1px',
              width: '12px',
              left: '25%',
              top: `${40 + (i * 4)}%`,
              transform: 'rotate(-45deg)',
              filter: 'blur(0.5px)',
              opacity: 0.7 - (i * 0.1)
            }}
            animate={{
              x: [-4, 12],
              opacity: [0.7 - (i * 0.1), 0]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              delay: i * 0.05
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};