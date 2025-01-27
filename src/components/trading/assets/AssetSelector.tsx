import React from 'react';
import { useTradingStore } from '../../../store/tradingStore';
import { Asset, TradeType } from '../../../types/trading';

const TRADE_TYPE_ASSETS: Record<TradeType, Asset[]> = {
  'UP_DOWN': ['BTC/USD', 'ETH/USD'],
  'ABOVE_BELOW': ['BTC/USD', 'ETH/USD', 'SOL/USD']
};

export const AssetSelector: React.FC = () => {
  const { selectedAsset, setSelectedAsset, tradeType } = useTradingStore();
  const availableAssets = TRADE_TYPE_ASSETS[tradeType];

  return (
    <div className="flex gap-2 p-4 bg-[#1A1B1B] rounded-lg backdrop-blur-sm border border-white/10">
      {availableAssets.map((asset) => (
        <button
          key={asset}
          onClick={() => setSelectedAsset(asset)}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedAsset === asset
              ? 'bg-[#4E9F3D] text-white'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          {asset}
        </button>
      ))}
    </div>
  );
};