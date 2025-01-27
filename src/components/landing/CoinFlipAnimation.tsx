import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';

// Import logo images using URL constructor
const logoDark = new URL('../../assets/images/logo-dark.svg', import.meta.url).href;
const logoLight = new URL('../../assets/images/logo-light.svg', import.meta.url).href;

export const CoinFlipAnimation: React.FC = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const sparkleColor = isDark ? '#4E9F3D' : '#1E5128';
  const logoSrc = isDark ? logoDark : logoLight;

  // Generate random positions for sparkles
  const sparkles = [...Array(8)].map((_, i) => ({
    angle: Math.random() * Math.PI * 2,
    distance: 25 + Math.random() * 15, // Random distance from center
    delay: Math.random() * 2 // Random initial delay
  }));

  return (
    <div className="relative w-6 h-6 mr-2">
      {/* Sparkles Container */}
      <div className="absolute inset-[-12px]">
        {sparkles.map((sparkle, i) => {
          const x = Math.cos(sparkle.angle) * sparkle.distance;
          const y = Math.sin(sparkle.angle) * sparkle.distance;
          
          return (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5"
              style={{
                background: sparkleColor,
                borderRadius: '50%',
                left: '50%',
                top: '50%',
                x,
                y,
                transformOrigin: 'center',
                zIndex: 0,
                opacity: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: sparkle.delay,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          );
        })}
      </div>

      {/* Logo - Positioned above sparkles */}
      <div className="absolute inset-0 z-10">
        <img 
          src={logoSrc} 
          alt="" 
          className="w-full h-full" 
        />
      </div>
    </div>
  );
};