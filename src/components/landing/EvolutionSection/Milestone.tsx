import React from 'react';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

interface MilestoneProps {
  year: string;
  title: string;
  description: string;
  stats?: {
    volume: string;
    users: string;
  };
  highlight?: boolean;
  index: number;
}

export const Milestone: React.FC<MilestoneProps> = ({
  year,
  title,
  description,
  stats,
  highlight,
  index
}) => {
  return (
    <motion.div 
      className="relative pl-12"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Dot */}
      <motion.div 
        className={`absolute left-0 w-[12px] h-[12px] rounded-full ${
          highlight ? 'bg-primary' : 'bg-primary/20'
        }`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
      >
        {highlight && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{ scale: [1, 2], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Content */}
      <div className={`p-6 rounded-lg ${
        highlight 
          ? 'bg-primary/10 border border-primary/20' 
          : 'bg-primary/5'
      }`}>
        <div className="text-sm text-primary/60 mb-2">{year}</div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm text-primary/80 mb-4">{description}</p>

        {stats && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-primary/60">Volume</div>
              <div className="text-lg font-bold">{stats.volume}</div>
            </div>
            <div>
              <div className="text-sm text-primary/60">Users</div>
              <div className="text-lg font-bold">{stats.users}</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};