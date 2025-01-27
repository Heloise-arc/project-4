import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sword } from 'lucide-react';

export const SocialAnimation: React.FC = () => {
  const [sequence, setSequence] = React.useState<'copy' | 'shield'>('copy');
  const [copyState, setCopyState] = React.useState<'C' | 'V'>('C');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSequence(prev => prev === 'copy' ? 'shield' : 'copy');
    }, 8000); // Increased to 8 seconds per sequence

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (sequence === 'copy') {
      const switchState = () => {
        setCopyState(prev => prev === 'C' ? 'V' : 'C');
      };

      // Initial delay before starting the C->V transition
      const initialDelay = setTimeout(switchState, 1500);

      return () => clearTimeout(initialDelay);
    } else {
      // Reset to 'C' when shield sequence starts
      setCopyState('C');
    }
  }, [sequence]);

  return (
    <div className="w-8 h-8 relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10" />
      
      <AnimatePresence mode="wait">
        {sequence === 'copy' ? (
          <motion.div
            key="copy"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.span
                className="text-[10px] text-primary/60"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ctrl
              </motion.span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={copyState}
                  className="text-sm font-bold text-primary relative"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    duration: 1,
                    ease: "easeOut"
                  }}
                >
                  {copyState}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="shield"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Shield */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Shield className="w-5 h-5 text-primary" />
            </motion.div>

            {/* Left Sword */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ rotate: -45, x: -20, opacity: 0 }}
              animate={{ rotate: -45, x: 0, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
            >
              <Sword className="w-5 h-5 text-primary" />
            </motion.div>

            {/* Right Sword */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ rotate: 45, x: 20, opacity: 0 }}
              animate={{ rotate: 45, x: 0, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
            >
              <Sword className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};