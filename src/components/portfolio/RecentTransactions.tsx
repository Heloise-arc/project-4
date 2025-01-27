import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const RecentTransactions: React.FC = () => {
  const transactions = [
    { type: 'buy', asset: 'BTC', amount: 0.05, price: 35000, date: '2024-02-28' },
    { type: 'sell', asset: 'ETH', amount: 1.2, price: 2200, date: '2024-02-27' },
    { type: 'buy', asset: 'SUPURR', amount: 1000, price: 0.5, date: '2024-02-26' },
  ];

  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-3">
              {tx.type === 'buy' ? (
                <ArrowDownRight className="w-5 h-5 text-green-500" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-red-500" />
              )}
              <div>
                <div className="font-medium">{tx.asset}</div>
                <div className="text-sm opacity-70">{tx.date}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">{tx.amount} {tx.asset}</div>
              <div className="text-sm opacity-70">${tx.price}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};