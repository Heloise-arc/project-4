import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CampaignCard } from '../components/campaigns/CampaignCard';
import { CampaignProgress } from '../components/campaigns/CampaignProgress';
import { CampaignFilters } from '../components/campaigns/CampaignFilters';

gsap.registerPlugin(ScrollTrigger);

const campaigns = [
  {
    title: 'Trading Competition',
    description: 'Achieve the highest trading volume this week to win exclusive rewards',
    reward: '10,000 SUPURR',
    participants: 1234,
    endDate: 'Mar 15, 2024',
  },
  {
    title: 'Social Media Challenge',
    description: 'Share your trading success stories on Twitter with #SUPURR',
    reward: '5,000 SUPURR',
    participants: 856,
    endDate: 'Mar 20, 2024',
  },
  {
    title: 'Staking Rewards',
    description: 'Stake SUPURR tokens for 30 days to earn bonus rewards',
    reward: '15,000 SUPURR',
    participants: 2431,
    endDate: 'Mar 31, 2024',
  },
];

const Campaigns = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.campaign-section');
    
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });
    });
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Campaigns
      </motion.h1>

      <div className="max-w-7xl mx-auto">
        <div className="campaign-section mb-8">
          <CampaignProgress />
        </div>
        
        <div className="campaign-section">
          <CampaignFilters />
        </div>

        <div className="campaign-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;