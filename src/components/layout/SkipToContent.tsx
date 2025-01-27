import React from 'react';
import { motion } from 'framer-motion';

export const SkipToContent: React.FC = () => {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      Skip to main content
    </motion.a>
  );
};