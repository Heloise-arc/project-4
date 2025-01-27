import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Market } from '../../../types/trading';
import { MiniChart } from './MiniChart';
import { useThemeStore } from '../../../store/themeStore';
import { MarketCardHeader } from './MarketCardHeader';
import { MarketCardStats } from './MarketCardStats';
import { MARKET_CARD_CONFIG } from './types';

interface MarketCardProps {
  market: Market;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#4E9F3D' : '#1E5128';
  const bgBase = isDark ? '25, 26, 25' : '216, 233, 168';

  const handleClick = () => {
    navigate('/trading', { state: { selectedAsset: market.symbol } });
  };

  return (
    <div 
      onClick={handleClick}
      className="market-card shrink-0 overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.02]"
      style={{
        width: MARKET_CARD_CONFIG.width,
        height: MARKET_CARD_CONFIG.height,
        background: `rgba(${bgBase}, 0.8)`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '16px',
        border: `1px solid ${primaryColor}1A`
      }}
    >
      <div className="h-full flex flex-col p-6">
        <MarketCardHeader market={market} />
        
        <div className="flex-1 -mx-6 -mt-2 mb-4">
          <MiniChart 
            symbol={market.symbol}
            change={market.change}
            primaryColor={primaryColor}
            height={MARKET_CARD_CONFIG.chartHeight}
            interactive={false}
          />
        </div>

        <MarketCardStats market={market} />
      </div>
    </div>
  );
};