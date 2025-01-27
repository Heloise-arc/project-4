import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

export const CampaignFilters: React.FC = () => {
  const filters = ['All', 'Trading', 'Social', 'Staking', 'Referral'];

  return (
    <motion.div
      className="flex items-center gap-4 mb-6 overflow-x-auto pb-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Filter className="w-5 h-5 text-primary" />
      {filters.map((filter, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
            ${index === 0 ? 'bg-primary text-background' : 'bg-primary/10 hover:bg-primary/20'}`}
        >
          {filter}
        </button>
      ))}
    </motion.div>
  );
};