import React from 'react';
import { Market } from '../../../types/trading';
import { formatPrice, formatOI } from '../../../utils/format';

interface MarketCardStatsProps {
  market: Market;
}

export const MarketCardStats: React.FC<MarketCardStatsProps> = ({ market }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs text-primary/60">Price</div>
        <div className="text-sm font-medium text-primary mt-0.5">
          {formatPrice(market.price)}
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-primary/60">24h</div>
        <div className={`text-sm font-medium mt-0.5 ${
          market.change >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {market.change > 0 ? '+' : ''}{market.change.toFixed(2)}%
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between pt-1">
      <div>
        <div className="text-xs text-primary/60">Open Interest</div>
        <div className="text-sm font-medium text-primary mt-0.5">
          {formatOI(market.openInterest)}
        </div>
      </div>
    </div>
  </div>
);