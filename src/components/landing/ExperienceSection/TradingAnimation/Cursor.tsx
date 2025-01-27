import React from 'react';
import { motion } from 'framer-motion';
import { AnimationPhase } from './useTradeAnimation';

// Import cursor images using URL constructor
const cursorImage1 = new URL('../../../../assets/images/button-click-1.svg', import.meta.url).href;
const cursorImage2 = new URL('../../../../assets/images/button-click-2.svg', import.meta.url).href;

interface Props {
  phase: AnimationPhase;
}

export const Cursor: React.FC<Props> = ({ phase }) => {
  const isVisible = phase !== 'idle' && phase !== 'speedCursor';
  const isClicking = phase === 'clicking';

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: 'calc(25% - 24px)',
        bottom: '40px',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isClicking ? 0.9 : 1,
        y: isVisible ? 0 : 50,
      }}
      transition={{ 
        duration: 0.5,
        scale: { duration: 0.2 }
      }}
    >
      <img 
        src={isClicking ? cursorImage2 : cursorImage1}
        alt="Cursor"
        className="w-12 h-12"
        onError={(e) => console.error('Failed to load cursor image:', e)}
        onLoad={() => console.log('Cursor image loaded successfully')}
      />
    </motion.div>
  );
};