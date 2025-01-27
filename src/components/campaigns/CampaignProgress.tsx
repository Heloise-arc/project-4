import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export const CampaignProgress: React.FC = () => {
  const progress = {
    completed: 3,
    total: 5,
    rewards: '$2,450',
  };

  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Your Progress</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>Completed Campaigns</span>
            <span className="font-bold">{progress.completed}/{progress.total}</span>
          </div>
          <div className="w-full bg-primary/10 rounded-full h-2">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(progress.completed / progress.total) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
        
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="text-sm">Total Rewards Earned</div>
          <div className="text-2xl font-bold">{progress.rewards}</div>
        </div>
      </div>
    </motion.div>
  );
};