import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../../store/themeStore';

const words = ['simple', 'intuitive', 'fun', 'social'];

export const AnimatedText: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#4E9F3D' : '#1E5128';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const word = words[currentIndex];

  return (
    <div className="flex items-center justify-center w-full px-4">
      <div className="w-full max-w-[1200px] overflow-hidden">
        <div 
          className="flex items-center justify-center whitespace-nowrap text-center"
          style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 5rem)',
            lineHeight: '1.1'
          }}
        >
          <h1 className="font-bold inline-flex items-center">
            <span className="inline-block mr-[0.25em]">options trading made</span>
            
            <div className="h-[1.2em] inline-flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={word}
                  className="relative"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <motion.span 
                    className="font-bold text-primary relative inline-block"
                  >
                    {word.split('').map((char, idx) => (
                      <motion.span
                        key={idx}
                        className="inline-block relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.05,
                          ease: [0.215, 0.61, 0.355, 1]
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};