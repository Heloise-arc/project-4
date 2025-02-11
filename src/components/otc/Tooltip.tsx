import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="text-[#4E9F3D]/60 hover:text-[#4E9F3D] transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`
              absolute z-50 w-48 p-2 text-xs font-mono
              bg-[#191A19] border border-[#4E9F3D]/20 rounded-lg
              text-[#4E9F3D]/80 shadow-lg
              ${positionStyles[position]}
            `}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 