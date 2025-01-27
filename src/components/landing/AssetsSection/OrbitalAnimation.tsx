import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

// Import images using URL constructor
const outerRing = new URL('../../../assets/images/supurr assets/outer-ring/outer-ring-1.png', import.meta.url).href;
const innerRing = new URL('../../../assets/images/supurr assets/inner-ring/inner-ring-1.png', import.meta.url).href;
const watch1 = new URL('../../../assets/images/supurr assets/watch/watch-1.png', import.meta.url).href;
const watch2 = new URL('../../../assets/images/supurr assets/watch/watch-2.png', import.meta.url).href;
const watch3 = new URL('../../../assets/images/supurr assets/watch/watch-3.png', import.meta.url).href;
const watch4 = new URL('../../../assets/images/supurr assets/watch/watch-4.png', import.meta.url).href;

const OrbitalAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [watchFrame, setWatchFrame] = useState(1);
  const rotateX = useSpring(0);
  const rotateY = useSpring(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXValue = (e.clientY - centerY) / 20;
    const rotateYValue = (e.clientX - centerX) / 20;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWatchFrame(prev => (prev % 4) + 1);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const watchFrames = [watch1, watch2, watch3, watch4];

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video max-w-[800px] mx-auto"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute w-[90%] h-[90%]"
          animate={{
            rotate: 360,
            transition: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <img
            src={outerRing}
            alt="Outer Ring"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Inner Ring */}
        <motion.div
          className="absolute w-[70%] h-[70%]"
          animate={{
            rotate: -360,
            transition: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <img
            src={innerRing}
            alt="Inner Ring"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Center Watch */}
        <motion.div 
          className="absolute w-[50%] h-[50%]"
          animate={{
            scale: isHovered ? 1.1 : 1,
            transition: { duration: 0.3 }
          }}
        >
          <img
            src={watchFrames[watchFrame - 1]}
            alt="Watch Animation"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrbitalAnimation;