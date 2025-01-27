import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Import cursor image using URL constructor
const cursorImage = new URL('../../../assets/images/button-click-1.svg', import.meta.url).href;

const tokens = ['USDC', 'USDC.e', 'HYPE', 'SUPURR', 'WIF'];

export const MenuAnimation: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 48 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % tokens.length;
        setCursorPosition({ x: 0, y: next * 40 + 48 });
        setSelectedToken(tokens[next]);
        
        // Simulate click animation
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 200);
        
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative w-full aspect-video bg-background/50 rounded-xl p-6 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-[240px] mx-auto mt-8">
        {/* Cursor */}
        <motion.img
          src={cursorImage}
          alt=""
          className="absolute w-8 h-8 -left-12 pointer-events-none z-20"
          initial={{ x: 0, y: 48, scale: 1 }}
          animate={{ 
            x: cursorPosition.x,
            y: cursorPosition.y,
            scale: isClicking ? 0.9 : 1
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1],
            scale: { duration: 0.2 }
          }}
        />

        {/* Selected Token Display */}
        <div
          className="w-full p-3 rounded-lg bg-primary/15 flex items-center justify-between"
        >
          <span>{selectedToken}</span>
          <div>
            <ChevronDown className="w-4 h-4 rotate-180" />
          </div>
        </div>

        {/* Dropdown Menu */}
        <motion.div
          className="absolute top-full left-0 w-full mt-1 py-1 rounded-lg bg-primary/10 backdrop-blur-sm"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {tokens.map((token, index) => (
            <motion.div
              key={token}
              className={`px-3 py-2 relative ${activeIndex === index ? 'text-primary' : ''}`}
              animate={{ 
                backgroundColor: activeIndex === index ? 'rgba(var(--primary), 0.2)' : 'transparent'
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Selection Highlight */}
              {activeIndex === index && (
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  layoutId="selection"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
              <span className="relative z-10">{token}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Click Effect */}
        {isClicking && (
          <motion.div
            className="absolute w-full h-10 bg-primary/20 rounded-lg"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              top: `${activeIndex * 40 + 40}px`
            }}
          />
        )}
      </div>
    </motion.div>
  );
};