import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingAnimation } from './LoadingAnimation';

// Import background images if any are used in the radial gradient
const primaryGlow = new URL('../../assets/images/primary-glow.png', import.meta.url).href;
const background = new URL('../../assets/images/background.png', import.meta.url).href;

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          style={{
            background: 'radial-gradient(circle at center, var(--primary-glow) 0%, var(--background) 70%)',
          }}
        >
          <LoadingAnimation />
        </motion.div>
      )}
    </AnimatePresence>
  );
};