import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Twitter, MessagesSquare } from 'lucide-react';
import { LoadingState } from './LoadingState';

interface SocialConnectStepProps {
  onComplete: () => void;
}

export const SocialConnectStep: React.FC<SocialConnectStepProps> = ({ onComplete }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSocialConnect = async (platform: 'telegram' | 'twitter' | 'discord') => {
    setIsConnecting(true);
    console.log(`Connecting to ${platform}`);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      onComplete();
    }, 2000);
  };

  if (isConnecting) {
    return <LoadingState message="Connecting to social account..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-mono font-semibold text-[#4E9F3D] mb-2">Connect Social Media</h2>
        <p className="text-[#4E9F3D]/80 font-mono">
          Connect any one of your social media accounts to proceed
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleSocialConnect('telegram')}
          className="flex items-center justify-center w-full p-4 rounded-lg bg-[#191A19] border border-[#4E9F3D]/20 hover:bg-[#4E9F3D]/10 text-[#4E9F3D] transition-colors font-mono"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Connect Telegram
        </button>

        <button
          onClick={() => handleSocialConnect('twitter')}
          className="flex items-center justify-center w-full p-4 rounded-lg bg-[#191A19] border border-[#4E9F3D]/20 hover:bg-[#4E9F3D]/10 text-[#4E9F3D] transition-colors font-mono"
        >
          <Twitter className="w-5 h-5 mr-2" />
          Connect X (Twitter)
        </button>

        <button
          onClick={() => handleSocialConnect('discord')}
          className="flex items-center justify-center w-full p-4 rounded-lg bg-[#191A19] border border-[#4E9F3D]/20 hover:bg-[#4E9F3D]/10 text-[#4E9F3D] transition-colors font-mono"
        >
          <MessagesSquare className="w-5 h-5 mr-2" />
          Connect Discord
        </button>
      </div>
    </motion.div>
  );
}; 