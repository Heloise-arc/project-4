import React from 'react';
import { motion } from 'framer-motion';
import { Milestone } from './Milestone';

const milestones = [
  {
    year: '2021',
    title: 'Buffer Finance Launch',
    description: 'First iteration of simplified options trading',
    stats: {
      volume: '$50M+',
      users: '10K+'
    }
  },
  {
    year: '2022',
    title: 'Buffer V2',
    description: 'Enhanced trading experience with improved UI/UX',
    stats: {
      volume: '$500M+',
      users: '50K+'
    }
  },
  {
    year: '2023',
    title: 'Buffer V3',
    description: 'Advanced features and multi-chain support',
    stats: {
      volume: '$2.8B+',
      users: '125K+'
    }
  },
  {
    year: '2024',
    title: 'Supurr Launch',
    description: 'Next generation of simplified derivatives',
    highlight: true
  }
];

export const EvolutionTimeline: React.FC = () => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <motion.div 
        className="absolute left-[22px] top-8 bottom-8 w-px bg-primary/20"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Milestones */}
      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <Milestone 
            key={milestone.year}
            {...milestone}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};