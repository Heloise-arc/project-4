import { Position } from '../types/trading';

export const calculatePnL = (position: Position, currentPrice?: number): number => {
  if (!currentPrice) return 0;
  
  const priceChange = currentPrice - position.entryPrice;
  const direction = position.type === 'UP_DOWN' ? 1 : -1;
  
  return position.amount * (priceChange / position.entryPrice) * direction;
};

export const formatTimeRemaining = (position: Position): string => {
  const endTime = position.startTime + position.duration * 1000;
  const remaining = endTime - Date.now();
  
  if (remaining <= 0) return '0s';
  
  const seconds = Math.floor(remaining / 1000);
  if (seconds < 60) return `${seconds}s`;
  
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
};

export const calculateWinRate = (positions: Position[]) => {
  const total = positions.length;
  const wins = positions.filter(p => p.status === 'won').length;
  const winRate = total > 0 ? (wins / total) * 100 : 0;
  
  const netPnL = positions.reduce((acc, pos) => {
    const pnl = pos.status === 'won' ? pos.payout - pos.amount : -pos.amount;
    return acc + pnl;
  }, 0);

  return {
    total,
    wins,
    winRate: Math.round(winRate),
    netPnL
  };
};