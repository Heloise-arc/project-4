import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TradingInterface } from '../components/trading/TradingInterface';
import { usePriceFeed } from '../hooks/usePriceFeed';
import { usePositionUpdater } from '../hooks/usePositionUpdater';
import { useTradingStore } from '../store/tradingStore';
import { Asset } from '../types/trading';

const Trading: React.FC = () => {
  const location = useLocation();
  const { setSelectedAsset } = useTradingStore();
  
  useEffect(() => {
    // Set selected asset from navigation state if provided
    const selectedAsset = location.state?.selectedAsset as Asset;
    if (selectedAsset) {
      setSelectedAsset(selectedAsset);
    }
  }, [location.state, setSelectedAsset]);

  usePriceFeed();
  usePositionUpdater();

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <TradingInterface />
    </div>
  );
};

export default Trading;