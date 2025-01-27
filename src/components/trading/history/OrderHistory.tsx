import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import { useTradingStore } from '../../../store/tradingStore';
import { formatTimeAgo } from '../../../utils/format';

export const OrderHistory: React.FC = () => {
  const { positions } = useTradingStore();
  const [filter, setFilter] = React.useState<'all' | 'won' | 'lost'>('all');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const filteredPositions = positions.filter(position => {
    if (filter === 'all') return true;
    return position.status === filter;
  });

  return (
    <motion.div
      className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/10">
        <h2 className="text-lg font-bold">Order History</h2>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2 rounded ${
              isFilterOpen ? 'bg-primary text-background' : 'bg-primary/10 hover:bg-primary/20'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-32 bg-background border border-primary/10 rounded-lg shadow-lg z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {(['all', 'won', 'lost'] as const).map((option) => (
                  <button
                    key={option}
                    className={`w-full px-4 py-2 text-left hover:bg-primary/10 ${
                      filter === option ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => {
                      setFilter(option);
                      setIsFilterOpen(false);
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-primary/10">
        {filteredPositions.map((position) => (
          <motion.div
            key={position.id}
            className="p-4 hover:bg-primary/5 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {position.status === 'won' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className="font-medium">{position.asset}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-primary/60">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(position.startTime)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="text-primary/60">Amount</div>
                <div>${position.amount}</div>
              </div>
              <div>
                <div className="text-primary/60">Entry Price</div>
                <div>${position.entryPrice.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-primary/60">P/L</div>
                <div className={position.status === 'won' ? 'text-green-500' : 'text-red-500'}>
                  {position.status === 'won'
                    ? `+$${(position.payout - position.amount).toFixed(2)}`
                    : `-$${position.amount.toFixed(2)}`}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredPositions.length === 0 && (
          <div className="p-8 text-center text-primary/60">
            No orders found
          </div>
        )}
      </div>
    </motion.div>
  );
};