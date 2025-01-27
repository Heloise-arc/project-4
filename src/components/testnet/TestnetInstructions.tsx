import React from 'react';
import { motion } from 'framer-motion';
import { Info, CheckCircle } from 'lucide-react';

export const TestnetInstructions: React.FC = () => {
  const steps = [
    'Create a testnet account to practice trading risk-free',
    'Receive 100,000 USDT and 10 BTC in testnet funds',
    'Experience full trading features without real money',
    'Reset balance anytime to continue practicing',
  ];

  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Info className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Getting Started</h2>
      </div>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
            <span>{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};