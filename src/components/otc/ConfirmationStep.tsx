import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Confetti } from './Confetti';

interface ConfirmationStepProps {
  tradeAmount: number;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ tradeAmount }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti after a small delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const tokenAmount = tradeAmount * 100; // 0.01 USDC per token

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 text-center"
      >
        <motion.div 
          className="flex justify-center"
          variants={checkmarkVariants}
        >
          <CheckCircle className="w-16 h-16 text-[#4E9F3D]" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-mono font-semibold text-[#4E9F3D] mb-2">
            Trade Confirmed
          </h2>
          <p className="text-[#4E9F3D]/80 font-mono">
            Your trade has been confirmed and is being processed
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="p-6 bg-[#191A19] rounded-lg border border-[#4E9F3D]/20"
        >
          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <h3 className="text-[#4E9F3D]/80 font-mono mb-1">Amount Paid</h3>
              <p className="text-[#4E9F3D] font-mono text-lg font-medium">
                {tradeAmount.toLocaleString()} USDC
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-[#4E9F3D]/80 font-mono mb-1">Tokens to Receive</h3>
              <p className="text-[#4E9F3D] font-mono text-lg font-medium">
                {tokenAmount.toLocaleString()} $SUPURR
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-[#4E9F3D]/80 font-mono mb-1">Token Price</h3>
              <p className="text-[#4E9F3D] font-mono text-lg font-medium">
                0.01 USDC
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="text-[#4E9F3D]/80 font-mono text-sm"
        >
          <p>Tokens will be automatically sent to your wallet</p>
          <p>Please make sure your Hyperliquid account is set up</p>
        </motion.div>
      </motion.div>
    </>
  );
};