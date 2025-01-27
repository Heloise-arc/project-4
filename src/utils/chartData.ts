import { CandlestickData } from 'lightweight-charts';

interface VolumeData {
  time: number;
  value: number;
  color: string;
}

export function generateBTCData(minutes: number = 200): {
  candlesticks: CandlestickData[];
  volumes: VolumeData[];
} {
  const candlesticks: CandlestickData[] = [];
  const volumes: VolumeData[] = [];
  
  // Real BTC parameters
  const basePrice = 71234.50;
  const avgVolatility = 100; // $100 average movement per minute
  const volumeBase = 50; // Base BTC volume
  
  let lastClose = basePrice;
  let trend = 0;
  let momentum = 0;
  
  const now = Math.floor(Date.now() / 1000);
  const startTime = now - (minutes * 60);

  for (let i = 0; i < minutes; i++) {
    // Update trend every 15 minutes
    if (i % 15 === 0) {
      trend = (Math.random() - 0.5) * 2; // -1 to 1
    }
    
    // Update momentum
    momentum = momentum * 0.95 + trend * 0.05;
    
    // Calculate minute volatility
    const minuteVolatility = avgVolatility * (1 + Math.abs(momentum));
    
    // Generate realistic price action
    const open = lastClose;
    const movement = minuteVolatility * (Math.random() + momentum);
    const maxMove = minuteVolatility * 1.5;
    
    const high = open + Math.random() * maxMove;
    const low = open - Math.random() * maxMove;
    const close = Math.max(
      Math.min(
        open + movement,
        high
      ),
      low
    );
    
    // Volume calculation
    const volumeMultiplier = 1 + Math.pow(Math.abs(close - open) / avgVolatility, 2);
    const volume = volumeBase * volumeMultiplier * (1 + Math.random());
    
    // Add spike volume on trend changes
    const volumeSpike = i % 15 === 0 ? volume * (2 + Math.random() * 3) : 0;
    
    const time = startTime + (i * 60);
    
    candlesticks.push({
      time,
      open,
      high,
      low,
      close
    });
    
    volumes.push({
      time,
      value: volume + volumeSpike,
      color: close >= open ? '#22c55e40' : '#ef444440'
    });
    
    lastClose = close;
  }

  return { candlesticks, volumes };
}