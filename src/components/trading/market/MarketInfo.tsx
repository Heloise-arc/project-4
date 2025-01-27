import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { useTradingStore } from '../../../store/tradingStore';
import { formatPrice } from '../../../utils/format';

export const MarketInfo: React.FC = () => {
  const { selectedAsset, currentPrice } = useTradingStore();
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Mock 24h data
  const change24h = 2.5;
  const volume24h = '$1.2B';

  return (
    <motion.div
      className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-lg p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">{selectedAsset}</h2>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-1.5 rounded-lg hover:bg-primary/10"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={`w-5 h-5 ${isFavorite ? 'fill-primary text-primary' : 'text-primary/60'}`}
            />
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div className="text-sm text-primary/60">Price</div>
            <div className="text-xl font-bold">
              {currentPrice ? formatPrice(currentPrice) : '--'}
            </div>
          </div>
          <div>
            <div className="text-sm text-primary/60">24h Change</div>
            <div className={`flex items-center gap-1 ${change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change24h >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(change24h)}%</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-primary/60">24h Volume</div>
            <div className="font-medium">{volume24h}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};