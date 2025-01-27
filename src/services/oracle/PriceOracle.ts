import { Asset } from '../../types/trading';

export class PriceOracle {
  private readonly TOLERANCE = 0.001; // 0.1% tolerance

  async getPriceFromChainlink(symbol: Asset): Promise<number> {
    // Simulated Chainlink price feed
    const mockPrice = await this.getMockPrice(symbol);
    return mockPrice;
  }

  async validatePrice(symbol: Asset, price: number): Promise<boolean> {
    const oraclePrice = await this.getPriceFromChainlink(symbol);
    return this.isWithinTolerance(price, oraclePrice);
  }

  private isWithinTolerance(price: number, oraclePrice: number): boolean {
    const difference = Math.abs(price - oraclePrice) / oraclePrice;
    return difference <= this.TOLERANCE;
  }

  private async getMockPrice(symbol: Asset): Promise<number> {
    const basePrice = {
      'BTC/USD': 45000,
      'ETH/USD': 2500,
      'SOL/USD': 100
    }[symbol];
    
    return basePrice * (1 + (Math.random() - 0.5) * 0.001);
  }
}