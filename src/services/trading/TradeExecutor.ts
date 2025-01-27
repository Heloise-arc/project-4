import { v4 as uuidv4 } from 'uuid';
import { TradeParams, Position } from '../../types/trading';
import { PriceOracle } from '../oracle/PriceOracle';

export class TradeExecutor {
  private priceOracle: PriceOracle;

  constructor() {
    this.priceOracle = new PriceOracle();
  }

  async executeTrade(params: TradeParams): Promise<Position> {
    // Validate price with oracle
    const currentPrice = await this.priceOracle.getPriceFromChainlink(params.asset);
    const isValid = await this.priceOracle.validatePrice(params.asset, currentPrice);
    
    if (!isValid) {
      throw new Error('Price validation failed');
    }

    // Create position
    const position: Position = {
      id: uuidv4(),
      asset: params.asset,
      type: params.type,
      amount: params.amount,
      entryPrice: currentPrice,
      strikePrice: params.strikePrice,
      duration: params.duration,
      startTime: Date.now(),
      payout: this.calculatePayout(params),
      status: 'active'
    };

    return position;
  }

  private calculatePayout(params: TradeParams): number {
    // Simple payout calculation (80% return)
    return params.amount * 1.8;
  }
}