import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Twitter, MessagesSquare, Loader } from 'lucide-react';
import { LoadingState } from './LoadingState';

interface SocialConnectStepProps {
  onComplete: () => void;
}

export const SocialConnectStep: React.FC<SocialConnectStepProps> = ({ onComplete }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialConnect = async (platform: 'telegram' | 'twitter' | 'discord') => {
    setIsLoading(true);
    console.log(`Connecting to ${platform}`);
    // Simulate connection delay
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-primary font-mono">Connecting to social account...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-mono text-primary mb-4">Connect Social</h2>
        <p className="text-primary font-mono mb-8">
          Connect any one of your social media accounts to proceed
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleSocialConnect('telegram')}
          className="w-full p-4 rounded-lg bg-background border-primary border text-primary font-mono flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Connect Telegram
        </button>

        <button
          onClick={() => handleSocialConnect('twitter')}
          className="w-full p-4 rounded-lg bg-background border-primary border text-primary font-mono flex items-center justify-center gap-2"
        >
          <Twitter className="w-5 h-5" />
          Connect X (Twitter)
        </button>

        <button
          onClick={() => handleSocialConnect('discord')}
          className="w-full p-4 rounded-lg bg-background border-primary border text-primary font-mono flex items-center justify-center gap-2"
        >
          <MessagesSquare className="w-5 h-5" />
          Connect Discord
        </button>
      </div>
    </motion.div>
  );
}; 