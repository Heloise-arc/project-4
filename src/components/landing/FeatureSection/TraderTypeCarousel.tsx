import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCatAnimationSync } from './animations/useCatAnimationSync';
import { useThemeStore } from '../../../store/themeStore';

const traderTypes = [
  'every type of button clicker',
  'crypto natives',
  'scalpers',
  'predictoors',
  'swing traders',
  'fx traders',
  'event-based traders',
  'agents'
];

export const TraderTypeCarousel: React.FC = () => {
  const { theme } = useThemeStore();
  const { phase } = useCatAnimationSync();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (phase === 'clicking') {
      setCurrentIndex((current) => (current + 1) % traderTypes.length);
    }
  }, [phase]);

  const textColor = theme === 'dark' ? '#4E9F3D' : '#1E5128';

  return (
    <div className="h-[72px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="text-[56px] font-bold font-mono"
          style={{ color: textColor }}
        >
          {traderTypes[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};