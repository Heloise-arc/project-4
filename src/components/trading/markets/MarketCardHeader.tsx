import React from 'react';
import { Activity } from 'lucide-react';
import { Market } from '../../../types/trading';
import { useThemeStore } from '../../../store/themeStore';

interface MarketCardHeaderProps {
  market: Market;
}

export const MarketCardHeader: React.FC<MarketCardHeaderProps> = ({ market }) => {
  const { theme } = useThemeStore();
  const textColor = theme === 'dark' ? '#4E9F3D' : '#1E5128';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-primary">
            {market.symbol}
          </h3>
          <div className="text-xs mt-0.5">
            {market.tradingTypes.map((type) => (
              <span key={type} style={{ color: textColor }}>
                {type === 'UP_DOWN' ? 'Up/Down' : 'Above/Below'}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-primary/10">
          <Activity className="w-2.5 h-2.5 text-primary" />
          <span className="text-primary">LIVE</span>
        </div>
      </div>
    </div>
  );
};