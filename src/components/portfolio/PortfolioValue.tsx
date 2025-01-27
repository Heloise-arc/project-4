import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const PortfolioValue: React.FC = () => {
  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">Total Portfolio Value</h2>
        <span className="text-sm text-primary">Last 24h</span>
      </div>
      
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold">$62,500</span>
        <div className="flex items-center text-green-500">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+2.5%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="text-sm mb-1">Profit/Loss</div>
          <div className="text-xl font-bold text-green-500">+$1,562.50</div>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="text-sm mb-1">Available Balance</div>
          <div className="text-xl font-bold">$12,430</div>
        </div>
      </div>
    </motion.div>
  );
};