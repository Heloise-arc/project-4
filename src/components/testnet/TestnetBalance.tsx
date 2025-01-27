import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export const TestnetBalance: React.FC = () => {
  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Testnet Balance</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="text-sm mb-1">Available USDT</div>
          <div className="text-2xl font-bold">100,000</div>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="text-sm mb-1">Available BTC</div>
          <div className="text-2xl font-bold">10.00</div>
        </div>
      </div>
    </motion.div>
  );
};