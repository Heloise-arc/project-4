import React from 'react';
import { motion } from 'framer-motion';

// Import cursor image using URL constructor
const cursorImage = new URL('../../../../../assets/images/button-click-1.svg', import.meta.url).href;

interface Props {
  index: number;
  opacity: number;
  scale: number;
  offset: number;
}

export const CursorTrail: React.FC<Props> = ({ index, opacity, scale, offset }) => (
  <motion.div
    className="absolute"
    style={{
      transform: `translate(${-offset * index}px, 0)`,
      opacity,
      scale,
      mixBlendMode: 'overlay',
    }}
  >
    <img 
      src={cursorImage}
      alt=""
      className="w-16 h-16" // Increased size from 12 to 16
    />
  </motion.div>
);