import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const ReferralTiers: React.FC = () => {
  const tiers = [
    { name: 'Bronze', referrals: '0-5', commission: '20%' },
    { name: 'Silver', referrals: '6-15', commission: '25%' },
    { name: 'Gold', referrals: '16-30', commission: '30%' },
    { name: 'Diamond', referrals: '31+', commission: '40%' },
  ];

  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Star className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Referral Tiers</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier, index) => (
          <motion.div
            key={index}
            className="p-4 bg-primary/5 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="font-bold mb-2">{tier.name}</h3>
            <div className="text-sm space-y-1 opacity-80">
              <p>Referrals: {tier.referrals}</p>
              <p>Commission: {tier.commission}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};