// Update Market interface
export interface Market {
  symbol: Asset;
  name: string;
  price: number;
  change: number;
  openInterest: number;
  status: 'live' | 'coming_soon';
  tradingTypes: ('UP_DOWN' | 'ABOVE_BELOW')[];
}