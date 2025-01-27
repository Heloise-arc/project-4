import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import custodyImage from '../../../assets/images/custody.png';

export const LockAnimation: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();
  
  // Transform mouse movement to rotation with tighter bounds
  const rotateX = useTransform(mouseY, [-300, 300], [3, -3]);
  const rotateY = useTransform(mouseX, [-300, 300], [-3, 3]);

  useEffect(() => {
    // Start subtle animation sequence
    controls.start({
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div 
      className="relative w-full aspect-video flex items-center justify-center overflow-visible p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000 }}
    >
      {/* Main container with 3D effect */}
      <motion.div
        className="relative w-full max-w-[1000px]" // Increased from 800px to 1000px
        animate={controls}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(var(--primary), 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
            transform: 'translateZ(-50px)',
          }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.6, 0.8, 0.6] : 0.4,
          }}
          transition={{
            duration: isHovered ? 1.5 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main image with enhanced hover effect */}
        <motion.img
          src={custodyImage}
          alt="Self Custody"
          className="w-full h-auto relative z-10"
          style={{
            filter: 'drop-shadow(0 10px 30px rgba(var(--primary), 0.25))',
            transform: 'translateZ(50px)',
          }}
          animate={{
            scale: isHovered ? [1, 1.02, 1] : 1,
            y: isHovered ? [0, -5, 0] : 0,
          }}
          transition={{
            duration: isHovered ? 0.8 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Energy pulse rings */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border-2 border-primary/20"
            style={{
              width: '30%',
              height: '30%',
              left: '35%',
              top: '35%',
              transform: 'translateZ(30px)',
            }}
            animate={{
              scale: [1, 2],
              opacity: [isHovered ? 0.4 : 0.2, 0],
            }}
            transition={{
              duration: isHovered ? 1 : 2,
              repeat: Infinity,
              delay: i * (isHovered ? 0.15 : 0.3),
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};