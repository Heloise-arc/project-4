import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const UpDownAnimation: React.FC = () => {
  const pathControls = useAnimation();
  const dotControls = useAnimation();
  const multiplierControls = useAnimation();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const animate = async () => {
      if (!isMounted.current) return;

      try {
        // Reset animations
        await Promise.all([
          pathControls.set({ pathLength: 0, opacity: 1 }),
          dotControls.set({ x: 0, y: 0 }),
          multiplierControls.set({ scale: 0, opacity: 0 })
        ]);

        if (!isMounted.current) return;

        // Draw path
        await pathControls.start({
          pathLength: 1,
          transition: {
            duration: 1.5,
            ease: [0.4, 0, 0.2, 1]
          }
        });

        if (!isMounted.current) return;

        // Move dot up
        await dotControls.start({
          x: 28,
          y: -12,
          transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }
        });

        if (!isMounted.current) return;

        // Show multiplier
        await multiplierControls.start({
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: [0.34, 1.56, 0.64, 1]
          }
        });

        if (!isMounted.current) return;
        await new Promise(resolve => setTimeout(resolve, 800));

        if (!isMounted.current) return;

        // Fade out
        await Promise.all([
          pathControls.start({ opacity: 0, transition: { duration: 0.3 } }),
          dotControls.start({ opacity: 0, transition: { duration: 0.3 } }),
          multiplierControls.start({ opacity: 0, transition: { duration: 0.3 } })
        ]);

        if (!isMounted.current) return;
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (isMounted.current) {
          animate();
        }
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    animate();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="w-8 h-8 relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10" />
      
      <motion.div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 32 32"
          style={{ overflow: 'visible' }}
        >
          <motion.path
            d="M 4,20 C 8,20 10,24 16,12 C 22,0 24,4 28,4"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="text-primary"
            animate={pathControls}
            initial={{ pathLength: 0 }}
          />

          <motion.circle
            cx="28"
            cy="4"
            r="2.5"
            className="text-primary fill-primary"
            animate={dotControls}
            style={{
              filter: 'drop-shadow(0 0 4px rgba(78, 159, 61, 0.6))'
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -right-6 -top-4 px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary text-background"
        initial={{ scale: 0, opacity: 0 }}
        animate={multiplierControls}
        style={{
          boxShadow: '0 0 8px rgba(78, 159, 61, 0.2)',
          backdropFilter: 'blur(4px)'
        }}
      >
        1.9×
      </motion.div>
    </div>
  );
};