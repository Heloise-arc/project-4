import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';
import { LoadingMessage } from './LoadingMessage';
import { bobbingVariants } from './animations/bobbingVariants';
import { morphVariants } from './animations/morphVariants';
import { splitVariants } from './animations/splitVariants';
import { STAR_POSITION } from './animations/constants';
import '../../styles/loading.css';

interface LoadingAnimationProps {
  onComplete?: () => void;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'bobbing' | 'morphing' | 'splitting'>('bobbing');
  const { theme } = useThemeStore();
  const logoSrc = `/src/assets/images/logo-${theme}.svg`;

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStage('morphing');
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setStage('splitting');
      
      await new Promise(resolve => setTimeout(resolve, 600));
      onComplete?.();
    };

    sequence();
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-[437px] h-[178px]">
        <AnimatePresence mode="wait">
          {/* Cat Animation */}
          <motion.img
            key="loading-cat"
            src="/src/assets/images/loading-cat.svg"
            alt="Loading"
            className="absolute inset-0 w-full h-full"
            variants={bobbingVariants}
            initial="initial"
            animate={stage === 'bobbing' ? "animate" : "exit"}
            style={{ 
              willChange: 'transform, opacity',
              transformOrigin: 'center center'
            }}
          />

          {/* Logo Animation */}
          {stage !== 'bobbing' && (
            <motion.img
              key="logo"
              src={logoSrc}
              alt="Logo"
              className={`absolute ${stage === 'morphing' ? 'logo-glow' : ''}`}
              variants={stage === 'morphing' ? morphVariants : splitVariants}
              initial="initial"
              animate={stage === 'morphing' ? "morph" : "split"}
              style={{ 
                willChange: 'transform, opacity, filter',
                transformOrigin: 'center center',
                left: STAR_POSITION.x,
                top: STAR_POSITION.y,
                width: STAR_POSITION.width,
                height: STAR_POSITION.height
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {stage !== 'splitting' && <LoadingMessage key="loading-message" />}
      </AnimatePresence>
    </div>
  );
}