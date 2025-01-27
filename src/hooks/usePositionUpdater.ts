import { useEffect } from 'react';
import { useTradingStore } from '../store/tradingStore';
import { Position } from '../types/trading';

export function usePositionUpdater() {
  const { positions, updatePosition, currentPrice } = useTradingStore();

  useEffect(() => {
    const interval = setInterval(() => {
      positions.forEach(position => {
        if (position.status !== 'active') return;

        const endTime = position.startTime + position.duration * 1000;
        if (Date.now() >= endTime && currentPrice) {
          const won = position.type === 'UP_DOWN'
            ? currentPrice > position.entryPrice
            : currentPrice < position.strikePrice!;

          updatePosition({
            ...position,
            status: won ? 'won' : 'lost'
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [positions, currentPrice, updatePosition]);
}