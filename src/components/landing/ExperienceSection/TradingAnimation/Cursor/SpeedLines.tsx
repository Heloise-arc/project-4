import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isMoving: boolean;
}

export const SpeedLines: React.FC<Props> = ({ isMoving }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: isMoving ? 1 : 0 }}
    transition={{ duration: 0.1 }}
  >
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white h-[1px]"
        style={{
          left: `${-10 - (i * 2)}px`,
          top: `${50 + (i * 3)}%`,
          width: '15px',
          transform: 'rotate(-45deg)',
          opacity: 0.8 - (i * 0.1),
          mixBlendMode: 'overlay',
          filter: 'blur(0.5px)',
        }}
        animate={{
          x: [0, 20],
          opacity: [0.8 - (i * 0.1), 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          delay: i * 0.02,
        }}
      />
    ))}
  </motion.div>
);