import React from 'react';
import { MigrationBanner } from '../components/layout/MigrationBanner';
import { MarketCardsContainer } from '../components/trading/markets/MarketCardsContainer';
import { HeroSection } from '../components/landing/HeroSection';
import { StatsSection } from '../components/landing/StatsSection';
import { ExperienceSection } from '../components/landing/ExperienceSection';
import { ProfitSection } from '../components/landing/ProfitSection';
import { RiskSection } from '../components/landing/RiskSection';
import { CollateralSection } from '../components/landing/CollateralSection';
import { AssetsSection } from '../components/landing/AssetsSection';
import { FeatureSection } from '../components/landing/FeatureSection';
import { CapitalSection } from '../components/landing/CapitalSection';
import { SelfCustodySection } from '../components/landing/SelfCustodySection';
import { ProductSection } from '../components/landing/ProductSection';
import { EvolutionSection } from '../components/landing/EvolutionSection';
import { Footer } from '../components/landing/Footer';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-mono overflow-x-hidden will-change-transform">
      {/* Header spacing */}
      <div className="h-20" />
      <div className="h-16" />
      
      {/* Hero Section with Migration Banner */}
      <div className="space-y-8">
        <MigrationBanner />
        <div className="space-y-12">
          <HeroSection />
          <MarketCardsContainer />
        </div>
      </div>

      {/* Main sections with fixed positioning */}
      <div className="relative z-10">
        <StatsSection />
        <ExperienceSection />
        <ProfitSection />
        <RiskSection />
        <CollateralSection />
        <AssetsSection />
        <FeatureSection />
        <CapitalSection />
        <SelfCustodySection />
        <ProductSection />
        <EvolutionSection />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;