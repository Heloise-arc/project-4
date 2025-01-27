import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy } from 'lucide-react';

interface CampaignCardProps {
  campaign: {
    title: string;
    description: string;
    reward: string;
    participants: number;
    endDate: string;
  };
  index: number;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, index }) => {
  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-xl font-bold mb-3">{campaign.title}</h3>
      <p className="text-sm opacity-80 mb-4">{campaign.description}</p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-sm">Reward: {campaign.reward}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm">{campaign.participants} participants</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-sm">Ends: {campaign.endDate}</span>
        </div>
      </div>
      
      <button className="w-full mt-4 bg-primary text-background px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
        Join Campaign
      </button>
    </motion.div>
  );
};