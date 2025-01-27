import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const AboveBelowAnimation: React.FC = () => {
  const pathControls = useAnimation();
  const dotControls = useAnimation();
  const multiplierControls = useAnimation();
  const [multiplierValue, setMultiplierValue] = useState('2×');
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    
    const animate = async () => {
      if (!isMounted.current) return;

      try {
        // Reset animations
        await Promise.all([
          pathControls.set({ pathLength: 0, opacity: 1 }),
          dotControls.set({ x: 0, y: 16 }),
          multiplierControls.set({ scale: 0, opacity: 0 })
        ]);

        if (!isMounted.current) return;

        // Start path animation
        await pathControls.start({
          pathLength: 1,
          transition: { duration: 2 }
        });

        if (!isMounted.current) return;

        // First phase: Move to bottom point
        await dotControls.start({
          x: 16,
          y: 28,
          transition: { duration: 0.8 }
        });

        if (!isMounted.current) return;

        // Show 2× multiplier
        setMultiplierValue('2×');
        await multiplierControls.start({
          scale: 1,
          opacity: 1,
          x: 16,
          y: 40,
          transition: { duration: 0.2 }
        });

        if (!isMounted.current) return;
        await new Promise(resolve => setTimeout(resolve, 400));

        if (!isMounted.current) return;
        // Hide multiplier
        await multiplierControls.start({
          scale: 0,
          opacity: 0,
          transition: { duration: 0.2 }
        });

        if (!isMounted.current) return;
        // Second phase: Move to top point
        await dotControls.start({
          x: 32,
          y: 4,
          transition: { duration: 0.8 }
        });

        if (!isMounted.current) return;
        // Show 19× multiplier
        setMultiplierValue('19×');
        await multiplierControls.start({
          scale: 1,
          opacity: 1,
          x: 32,
          y: -31,
          transition: { duration: 0.8 }
        });

        if (!isMounted.current) return;
        await new Promise(resolve => setTimeout(resolve, 400));

        if (!isMounted.current) return;
        // Fade out everything
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
            d="M 0,16 Q 8,16 16,28 T 32,4"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="text-primary"
            animate={pathControls}
            initial={{ pathLength: 0 }}
          />

          <motion.circle
            cx="0"
            cy={16}
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
        className="absolute px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary text-background"
        initial={{ scale: 0, opacity: 0 }}
        animate={multiplierControls}
        style={{
          boxShadow: '0 0 8px rgba(78, 159, 61, 0.2)',
          backdropFilter: 'blur(4px)',
          transformOrigin: 'center center',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {multiplierValue}
      </motion.div>
    </div>
  );
};