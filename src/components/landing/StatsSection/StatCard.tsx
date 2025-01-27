import React from 'react';
import { motion } from 'framer-motion';
import { Stat } from './types';

interface StatCardProps {
  stat: Stat;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const Icon = stat.icon;

  return (
    <motion.div
      className="relative overflow-hidden h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      <div className="h-full p-6 bg-background/80 backdrop-blur-sm rounded-lg border border-primary/10">
        <motion.div 
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 + index * 0.15 }}
        >
          <Icon className="w-5 h-5 text-primary" />
          <span className="text-sm text-text/60">{stat.label}</span>
        </motion.div>

        <div className="space-y-1">
          <motion.div
            className="text-3xl font-bold text-text"
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
          >
            {stat.value}
          </motion.div>
          <motion.div 
            className="text-sm text-text/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.15 }}
          >
            {stat.subtext}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};