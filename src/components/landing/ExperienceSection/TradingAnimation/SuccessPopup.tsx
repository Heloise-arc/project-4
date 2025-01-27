import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props {
  isVisible: boolean;
}

export const SuccessPopup: React.FC<Props> = ({ isVisible }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-primary/20 backdrop-blur-sm rounded-lg px-6 py-4 flex items-center gap-3">
        <Check className="w-5 h-5 text-primary" />
        <span className="text-primary">Trade Executed</span>
      </div>
    </motion.div>
  );
};