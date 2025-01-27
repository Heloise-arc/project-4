import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTradeAnimation } from './useTradeAnimation';
import { Cursor } from './Cursor';
import { SpeedCursor } from './SpeedCursor';
import { TradingUI } from './TradingUI';
import { SuccessPopup } from './SuccessPopup';

export const TradingAnimation: React.FC = () => {
  const { phase } = useTradeAnimation();

  return (
    <motion.div 
      className="relative w-full aspect-video bg-background/50 rounded-xl p-6 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <TradingUI phase={phase} />
      
      <AnimatePresence>
        <Cursor phase={phase} />
        
        {phase === 'speedCursor' && (
          <SpeedCursor 
            key="speed-cursor"
            isActive={true}
          />
        )}
        
        {phase === 'success' && (
          <SuccessPopup 
            key="success"
            isVisible={true}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};