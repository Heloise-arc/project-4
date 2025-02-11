import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 space-y-4"
    >
      <Loader2 className="w-8 h-8 text-[#4E9F3D] animate-spin" />
      <p className="text-[#4E9F3D]/80 font-mono text-sm">
        {message}
      </p>
    </motion.div>
  );
}; 