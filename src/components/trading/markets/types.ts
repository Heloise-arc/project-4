export interface MarketCardConfig {
  width: number;
  height: number;
  gap: number;
  chartHeight: number;
}

export interface ScrollConfig extends Pick<MarketCardConfig, 'width' | 'gap'> {
  totalCards: number;
  speed?: number;
}

export const MARKET_CARD_CONFIG: MarketCardConfig = {
  width: 360,       // Width remains the same
  height: 360,      // Increased from 320 to 360 to accommodate OI info
  gap: 24,         // Gap remains the same
  chartHeight: 180  // Chart height remains the same
} as const;