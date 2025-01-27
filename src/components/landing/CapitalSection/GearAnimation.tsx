import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Import all gear frames using URL constructor
const gearFrames = [
  new URL('../../../assets/images/capital efficiency/gear-1.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-2.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-3.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-4.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-5.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-6.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-7.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-8.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-9.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-10.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-11.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-12.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-13.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-14.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-15.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-16.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-17.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-18.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-19.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-20.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-21.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-22.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-23.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-24.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-25.png', import.meta.url).href,
  new URL('../../../assets/images/capital efficiency/gear-26.png', import.meta.url).href,
];

export const GearAnimation: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const intervalRef = useRef<number>();
  const totalFrames = 26;

  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set new interval and store the ID
    intervalRef.current = window.setInterval(() => {
      setCurrentFrame(current => current === totalFrames ? 1 : current + 1);
    }, 150);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <motion.div 
      className="relative w-full aspect-video bg-background/50 rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={gearFrames[currentFrame - 1]}
        alt="Gear Animation Frame"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ 
          transition: 'opacity 0.05s ease-out',
          opacity: 1
        }}
      />
    </motion.div>
  );
};