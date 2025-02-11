import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SocialConnectStep } from '../components/otc/SocialConnectStep';
import { TradeDetailsStep } from '../components/otc/TradeDetailsStep';
import { ConfirmationStep } from '../components/otc/ConfirmationStep';
import { OTCInfoBox } from '../components/otc/OTCInfoBox';
import { ProgressSteps } from '../components/otc/ProgressSteps';

type Step = 'social' | 'trade' | 'confirmation';

export const OTCPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('social');
  const [tradeAmount, setTradeAmount] = useState<number>(0);

  const handleSocialComplete = () => {
    setCurrentStep('trade');
  };

  const handleTradeComplete = (amount: number) => {
    setTradeAmount(amount);
    setCurrentStep('confirmation');
  };

  const handleTradeBack = () => {
    setCurrentStep('social');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ProgressSteps currentStep={currentStep} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-background rounded-xl border border-primary/20 shadow-lg shadow-primary/5 p-6"
      >
        {currentStep === 'social' && (
          <SocialConnectStep onComplete={handleSocialComplete} />
        )}
        {currentStep === 'trade' && (
          <TradeDetailsStep 
            onComplete={handleTradeComplete}
            onBack={handleTradeBack}
          />
        )}
        {currentStep === 'confirmation' && (
          <ConfirmationStep
            tradeAmount={tradeAmount}
          />
        )}
      </motion.div>
      
      {/* Show OTCInfoBox only in confirmation step */}
      {currentStep === 'confirmation' && <OTCInfoBox />}
    </div>
  );
}; 