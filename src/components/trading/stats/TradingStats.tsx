import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Clock } from 'lucide-react';
import { useTradingStore } from '../../../store/tradingStore';

export const TradingStats: React.FC = () => {
  const { positions } = useTradingStore();
  const closedPositions = positions.filter(p => p.status !== 'active');

  // Calculate stats
  const totalTrades = closedPositions.length;
  const winningTrades = closedPositions.filter(p => p.status === 'won').length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const avgDuration = closedPositions.reduce((acc, p) => acc + p.duration, 0) / totalTrades || 0;

  const stats = [
    {
      icon: BarChart2,
      label: 'Total Trades',
      value: totalTrades.toString()
    },
    {
      icon: TrendingUp,
      label: 'Win Rate',
      value: `${winRate.toFixed(1)}%`
    },
    {
      icon: Clock,
      label: 'Avg Duration',
      value: `${Math.round(avgDuration)}s`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <stat.icon className="w-5 h-5 text-primary" />
            <div className="text-sm text-primary/60">{stat.label}</div>
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
        </motion.div>
      ))}
    </div>
  );
};