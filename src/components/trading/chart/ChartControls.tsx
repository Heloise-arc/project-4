import React from 'react';
import { motion } from 'framer-motion';
import { TimeframeSelector } from './TimeframeSelector';
import { ChartTypeSelector } from './ChartTypeSelector';
import { IndicatorSelector } from './IndicatorSelector';
import { ChartSettings } from './ChartSettings';

export const ChartControls: React.FC = () => {
  return (
    <motion.div
      className="flex items-center justify-between mb-4 p-4 bg-background/80 backdrop-blur-sm border border-primary/10 rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TimeframeSelector />
      <div className="flex items-center gap-4">
        <ChartTypeSelector />
        <IndicatorSelector />
        <ChartSettings />
      </div>
    </motion.div>
  );
};