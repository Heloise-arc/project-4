import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { AnimationPhase } from '../hooks/useTradeAnimation';
import { CursorTrail } from './CursorTrail';
import { SpeedLines } from './SpeedLines';

// Import cursor images using URL constructor
const cursorImage1 = new URL('../../../../../assets/images/button-click-1.svg', import.meta.url).href;
const cursorImage2 = new URL('../../../../../assets/images/button-click-2.svg', import.meta.url).href;

interface Props {
  phase: AnimationPhase;
}

export const Cursor: React.FC<Props> = ({ phase }) => {
  const isVisible = phase !== 'idle';
  const isClicking = phase === 'clicking';
  const isMoving = phase === 'moving';

  // Track cursor velocity for dynamic effects
  const x = useMotionValue(0);
  const velocity = useMotionValue(0);
  const opacity = useTransform(velocity, [-1000, 0, 1000], [1, 0.3, 1]);

  // Number of trails based on velocity
  const numTrails = 4;
  const trailConfig = [...Array(numTrails)].map((_, i) => ({
    opacity: 1 - ((i + 1) * 0.2),
    scale: 1 - ((i + 1) * 0.05),
    offset: (i + 1) * 3
  }));

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: 'calc(25% - 32px)', // Adjusted for larger cursor
        bottom: '40px',
        x,
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
      onUpdate={(latest) => {
        velocity.set(latest.x?.velocity || 0);
      }}
    >
      {/* Trails */}
      {isMoving && trailConfig.map((config, i) => (
        <CursorTrail key={i} {...config} index={i} />
      ))}

      {/* Speed Lines */}
      <SpeedLines isMoving={isMoving} />

      {/* Main Cursor */}
      <motion.div style={{ opacity }}>
        <img 
          src={isClicking ? cursorImage2 : cursorImage1}
          alt="Cursor"
          className="w-16 h-16" // Increased size from 12 to 16
        />
      </motion.div>
    </motion.div>
  );
};