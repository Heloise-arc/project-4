import React from 'react';
import { motion } from 'framer-motion';

export const AssetDistribution: React.FC = () => {
  const assets = [
    { name: 'BTC', percentage: 45, value: 28500 },
    { name: 'ETH', percentage: 30, value: 18200 },
    { name: 'SUPURR', percentage: 15, value: 9500 },
    { name: 'Other', percentage: 10, value: 6300 },
  ];

  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4">Asset Distribution</h2>
      <div className="space-y-4">
        {assets.map((asset) => (
          <div key={asset.name}>
            <div className="flex justify-between mb-1">
              <span>{asset.name}</span>
              <span>${asset.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-primary/10 rounded-full h-2">
              <motion.div
                className="bg-primary h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${asset.percentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};