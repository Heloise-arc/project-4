import React from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';

export const TokenDistribution: React.FC = () => {
  const distribution = [
    { label: 'Community Rewards', percentage: 40 },
    { label: 'Liquidity Pool', percentage: 30 },
    { label: 'Team & Development', percentage: 20 },
    { label: 'Marketing', percentage: 10 },
  ];

  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <PieChart className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Token Distribution</h2>
      </div>
      <div className="space-y-4">
        {distribution.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span>{item.percentage}%</span>
            </div>
            <div className="w-full bg-primary/10 rounded-full h-2">
              <motion.div
                className="bg-primary h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};