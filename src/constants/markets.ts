import { Market } from '../types/trading';

// Define the specific markets with their trading types
export const MARKETS: Market[] = [
  // Up/Down Markets
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin Up/Down',
    price: 71250.42,
    change: 2.5,
    openInterest: 1250000000,
    status: 'live',
    tradingTypes: ['UP_DOWN']
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum Up/Down',
    price: 3892.15,
    change: 1.8,
    openInterest: 750000000,
    status: 'live',
    tradingTypes: ['UP_DOWN']
  },
  // Above/Below Markets
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin Above/Below',
    price: 71250.42,
    change: 2.5,
    openInterest: 1250000000,
    status: 'live',
    tradingTypes: ['ABOVE_BELOW']
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum Above/Below',
    price: 3892.15,
    change: 1.8,
    openInterest: 750000000,
    status: 'live',
    tradingTypes: ['ABOVE_BELOW']
  },
  {
    symbol: 'SOL/USD',
    name: 'Solana Above/Below',
    price: 146.73,
    change: -0.5,
    openInterest: 250000000,
    status: 'live',
    tradingTypes: ['ABOVE_BELOW']
  }
];