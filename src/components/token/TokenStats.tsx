import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Coins, BarChart3 } from 'lucide-react';

export const TokenStats: React.FC = () => {
  const stats = [
    { icon: <Coins />, label: 'Total Supply', value: '1,000,000,000' },
    { icon: <Users />, label: 'Holders', value: '25,431' },
    { icon: <TrendingUp />, label: 'Price', value: '$0.145' },
    { icon: <BarChart3 />, label: 'Market Cap', value: '$145M' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-background border border-primary/20 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-primary">{stat.icon}</div>
            <h3 className="text-sm font-medium">{stat.label}</h3>
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};