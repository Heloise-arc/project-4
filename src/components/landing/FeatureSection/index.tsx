import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import { useThemeStore } from '../../../store/themeStore';

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

// Import image using URL constructor
const tradingImage = new URL('../../../assets/images/trading-image.png', import.meta.url).href;

// Import cat images using URL constructor
const buttonClick1 = new URL('../../../assets/images/button-click-1.svg', import.meta.url).href;
const buttonClick2 = new URL('../../../assets/images/button-click-2.svg', import.meta.url).href;

export const FeatureSection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsClicked(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const title = t('landing.sections.features.title');
  
  // Find the last 'r' in "clicker"
  const lastRIndex = title.toLowerCase().lastIndexOf('r');
  const beforeR = title.substring(0, lastRIndex);
  const afterR = title.substring(lastRIndex + 1);

  return (
    <section className="bg-background font-mono py-16">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="relative">
            <motion.h2 
              className="text-5xl font-mono relative inline-block whitespace-pre-wrap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {beforeR}
              <motion.span
                className="inline-block origin-bottom"
                animate={{
                  rotate: isClicked ? 15 : 0,
                  x: isClicked ? 2 : 0,
                  y: isClicked ? -2 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
              >
                r
              </motion.span>
              {afterR}

              {/* Cat Animation - adjusted positioning */}
              <div 
                className="absolute" 
                style={{ 
                  bottom: '70px',    // Decreased from 45px
                  left: '358px',     // Decreased from 140px
                  transform: 'scaleX(-1)'
                }}
              >
                <div className="relative w-[140px]">
                  <motion.img
                    src={buttonClick1}
                    alt="Cat Before Click"
                    className="w-full h-auto absolute"
                    animate={{ opacity: isClicked ? 0 : 1 }}
                    transition={{ duration: 0.1 }}
                  />
                  <motion.img
                    src={buttonClick2}
                    alt="Cat After Click"
                    className="w-full h-auto absolute"
                    animate={{ opacity: isClicked ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </motion.h2>
          </div>
          <motion.p 
            className="text-xl text-primary/80"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('landing.sections.features.subtitle')}
          </motion.p>
        </div>
        
        <div className="relative max-w-[600px] mx-auto">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/5 to-primary/10" 
                 style={{ transform: 'translateY(8px)', filter: 'blur(16px)' }} />
            
            <div className="absolute inset-0 rounded-xl bg-black/10"
                 style={{ transform: 'translateY(4px)', filter: 'blur(8px)' }} />
            
            <div className="absolute inset-0 rounded-xl bg-primary/5"
                 style={{ transform: 'translateY(2px)', filter: 'blur(4px)' }} />
            
            <motion.img
              src={tradingImage}
              alt="Trading Interface"
              className="w-full rounded-xl opacity-30 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)'
            }}
          >
            <motion.div
              className="flex flex-col gap-4 text-xl font-bold text-primary"
              animate={{
                y: [0, -scrollingTexts.length * 32]
              }}
              transition={{
                duration: scrollingTexts.length * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...scrollingTexts, ...scrollingTexts].map((text, i) => (
                <div 
                  key={`${text}-${i}`} 
                  className="text-center whitespace-nowrap"
                >
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};