import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Import cursor images using URL constructor
const cursorImage = new URL('../../../../assets/images/button-click-1.svg', import.meta.url).href;

interface Props {
  isActive: boolean;
}

export const SpeedCursor: React.FC<Props> = ({ isActive }) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Create the revving effect
    controls.start({
      x: [-2, 2, -2], // Small horizontal shake
      scale: [1, 1.1, 1], // Subtle pulsing
      transition: {
        duration: 0.3,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    });
  }, [isActive, controls]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div animate={controls} className="relative">
        {/* Main cursor */}
        <img 
          src={cursorImage}
          alt=""
          className="w-24 h-24" // Increased from w-12 h-12
        />
        
        {/* Speed trails */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0"
            initial={{ 
              opacity: 0.4 - (i * 0.03),
              x: -4 - (i * 1.5),
              scale: 1 - (i * 0.05)
            }}
            animate={{ 
              opacity: [0.4 - (i * 0.03), 0],
              x: [-4 - (i * 1.5), -20 - (i * 2)],
              scale: [1 - (i * 0.05), 1 - (i * 0.08)]
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              delay: i * 0.02,
              ease: "linear"
            }}
          >
            <img 
              src={cursorImage}
              alt=""
              className="w-24 h-24" // Increased from w-12 h-12
              style={{ filter: 'blur(1px)' }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};