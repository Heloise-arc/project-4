import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const StrategyAnimation: React.FC = () => {
  const areaPathControls = useAnimation();
  const dottedLineControls = useAnimation();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const animate = async () => {
      if (!isMounted.current) return;

      try {
        // Reset animations
        await Promise.all([
          areaPathControls.set({ opacity: 0, pathLength: 0 }),
          dottedLineControls.set({ x: 0, opacity: 0 })
        ]);

        if (!isMounted.current) return;

        // Fade in and draw area chart
        await areaPathControls.start({
          opacity: 1,
          pathLength: 1,
          transition: {
            duration: 1.5,
            ease: [0.4, 0, 0.2, 1]
          }
        });

        if (!isMounted.current) return;

        // Start dotted line movement
        await dottedLineControls.start({
          opacity: 1,
          transition: { duration: 0.3 }
        });

        if (!isMounted.current) return;

        // Smooth movement of dotted line
        await dottedLineControls.start({
          x: [-16, 16, -16],
          transition: {
            duration: 4,
            ease: "easeInOut",
            repeat: 2,
            repeatType: "reverse"
          }
        });

        if (!isMounted.current) return;

        // Fade out
        await Promise.all([
          areaPathControls.start({ opacity: 0, transition: { duration: 0.5 } }),
          dottedLineControls.start({ opacity: 0, transition: { duration: 0.5 } })
        ]);

        if (!isMounted.current) return;

        // Brief pause before restarting
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (isMounted.current) {
          animate();
        }
      } catch (error) {
        // Handle any animation errors gracefully
        console.error('Animation error:', error);
      }
    };

    // Start the animation sequence
    animate();

    // Cleanup
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="w-8 h-8 relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4E9F3D]/5 to-[#4E9F3D]/10 dark:from-[#4E9F3D]/5 dark:to-[#4E9F3D]/10" />

      <svg
        viewBox="0 0 32 32"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Dark theme gradients */}
          <linearGradient id="darkAreaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4E9F3D" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4E9F3D" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="darkLineGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4E9F3D" stopOpacity="1" />
            <stop offset="3.5%" stopColor="#4E9F3D" stopOpacity="1" />
            <stop offset="3.5%" stopColor="#4E9F3D" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4E9F3D" stopOpacity="0.5" />
          </linearGradient>

          {/* Light theme gradients */}
          <linearGradient id="lightAreaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1E5128" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1E5128" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="lightLineGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1E5128" stopOpacity="1" />
            <stop offset="3.5%" stopColor="#1E5128" stopOpacity="1" />
            <stop offset="3.5%" stopColor="#1E5128" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1E5128" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Area Chart - More rectangular shape */}
        <motion.path
          d="M 0,24 H 4 V 20 H 8 V 22 H 12 V 18 H 16 V 16 H 20 V 20 H 24 V 16 H 28 V 18 H 32 V 32 H 0 Z"
          className="dark:fill-[url(#darkAreaGradient)] fill-[url(#lightAreaGradient)]"
          initial={{ opacity: 0 }}
          animate={areaPathControls}
        />
        
        <motion.path
          d="M 0,24 H 4 V 20 H 8 V 22 H 12 V 18 H 16 V 16 H 20 V 20 H 24 V 16 H 28 V 18 H 32"
          className="dark:stroke-[url(#darkLineGradient)] stroke-[url(#lightLineGradient)]"
          fill="none"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={areaPathControls}
        />

        {/* Dotted Line Cursor */}
        <motion.g animate={dottedLineControls}>
          {/* Vertical dotted line */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx="16"
              cy={8 + i * 3}
              r="0.5"
              className="fill-[#4E9F3D] dark:fill-[#4E9F3D]"
              style={{ opacity: 0.4 - (i * 0.05) }}
            />
          ))}
          
          {/* Highlight dot */}
          <circle
            cx="16"
            cy="8"
            r="1.5"
            className="fill-[#4E9F3D] dark:fill-[#4E9F3D]"
            style={{
              filter: 'drop-shadow(0 0 2px rgba(78, 159, 61, 0.4))'
            }}
          />
        </motion.g>
      </svg>
    </div>
  );
};