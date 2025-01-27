import React from 'react';
import { Position } from '../../../types/trading';
import { calculatePnL, formatTimeRemaining } from '../../../utils/trading';
import { X } from 'lucide-react';

interface PositionRowProps {
  position: Position;
  currentPrice?: number;
}

export const PositionRow: React.FC<PositionRowProps> = ({ position, currentPrice }) => {
  const pnl = calculatePnL(position, currentPrice);
  const timeLeft = formatTimeRemaining(position);

  return (
    <tr className="border-t border-white/10">
      <td className="py-3">{position.asset}</td>
      <td className="py-3">{position.type}</td>
      <td className="py-3">${position.amount}</td>
      <td className="py-3">${position.entryPrice.toFixed(2)}</td>
      <td className="py-3">{timeLeft}</td>
      <td className={`py-3 ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        ${pnl.toFixed(2)}
      </td>
      <td className="py-3">
        <button className="p-1 hover:bg-white/10 rounded">
          <X className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};