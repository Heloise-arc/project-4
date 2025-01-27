import React from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, Coins } from 'lucide-react';

export const ReferralStats: React.FC = () => {
  const stats = [
    { icon: <Users />, label: 'Total Referrals', value: '24' },
    { icon: <Gift />, label: 'Active Traders', value: '12' },
    { icon: <Coins />, label: 'Total Earnings', value: '$1,450' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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