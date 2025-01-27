import { create } from 'zustand';
import { Asset, Position, TimeFrame, TradeType } from '../types/trading';

interface TradingState {
  selectedAsset: Asset;
  tradeType: TradeType;
  timeFrame: TimeFrame;
  amount: number;
  duration: number;
  strikePrice?: number;
  positions: Position[];
  currentPrice?: number;
}

interface TradingActions {
  setSelectedAsset: (asset: Asset) => void;
  setTradeType: (type: TradeType) => void;
  setTimeFrame: (timeFrame: TimeFrame) => void;
  setAmount: (amount: number) => void;
  setDuration: (duration: number) => void;
  setStrikePrice: (price: number) => void;
  setCurrentPrice: (price: number) => void;
  addPosition: (position: Position) => void;
  updatePosition: (position: Position) => void;
}

export const useTradingStore = create<TradingState & TradingActions>((set) => ({
  selectedAsset: 'BTC/USD',
  tradeType: 'UP_DOWN',
  timeFrame: '1m',
  amount: 0,
  duration: 60,
  positions: [],
  
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  setTradeType: (type) => set((state) => {
    // When switching trade types, ensure selected asset is valid
    const validAssets = type === 'UP_DOWN' 
      ? ['BTC/USD', 'ETH/USD']
      : ['BTC/USD', 'ETH/USD', 'SOL/USD'];
      
    return {
      tradeType: type,
      selectedAsset: validAssets.includes(state.selectedAsset)
        ? state.selectedAsset
        : validAssets[0]
    };
  }),
  setTimeFrame: (timeFrame) => set({ timeFrame }),
  setAmount: (amount) => set({ amount }),
  setDuration: (duration) => set({ duration }),
  setStrikePrice: (strikePrice) => set({ strikePrice }),
  setCurrentPrice: (currentPrice) => set({ currentPrice }),
  addPosition: (position) => set((state) => ({ 
    positions: [position, ...state.positions] 
  })),
  updatePosition: (position) => set((state) => ({
    positions: state.positions.map(p => 
      p.id === position.id ? position : p
    )
  })),
}));