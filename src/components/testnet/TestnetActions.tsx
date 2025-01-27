import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowRight } from 'lucide-react';

export const TestnetActions: React.FC = () => {
  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold mb-6">Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 bg-primary text-background px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
          <RefreshCw className="w-5 h-5" />
          Reset Balance
        </button>
        <button className="flex items-center justify-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-lg hover:bg-primary/20 transition-colors">
          <ArrowRight className="w-5 h-5" />
          Start Trading
        </button>
      </div>
    </motion.div>
  );
};