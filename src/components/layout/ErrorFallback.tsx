import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md w-full bg-background border border-primary/10 rounded-lg p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        </motion.div>
        
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-primary/60 mb-6">{error.message}</p>
        
        <button
          onClick={resetErrorBoundary}
          className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Try again
        </button>
      </div>
    </motion.div>
  );
};