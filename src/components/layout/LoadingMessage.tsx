import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_EASINGS } from './animations/constants';

export const LoadingMessage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: ANIMATION_EASINGS.SMOOTH
      }}
      className="text-primary text-lg font-medium"
    >
      initializing supurr-eme trading experience...
    </motion.div>
  );
};