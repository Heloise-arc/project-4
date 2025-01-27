import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Gift, Percent } from 'lucide-react';

export const TokenUtility: React.FC = () => {
  const utilities = [
    {
      icon: <Percent />,
      title: 'Trading Fee Discounts',
      description: 'Hold $SUPURR to get up to 50% off trading fees',
    },
    {
      icon: <Gift />,
      title: 'Exclusive Rewards',
      description: 'Participate in token holder events and airdrops',
    },
    {
      icon: <Shield />,
      title: 'Governance Rights',
      description: 'Vote on platform updates and proposals',
    },
    {
      icon: <Zap />,
      title: 'Premium Features',
      description: 'Access advanced trading tools and analytics',
    },
  ];

  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold mb-6">Token Utility</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {utilities.map((utility, index) => (
          <motion.div
            key={index}
            className="flex gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-primary">{utility.icon}</div>
            <div>
              <h3 className="font-medium mb-1">{utility.title}</h3>
              <p className="text-sm opacity-80">{utility.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};