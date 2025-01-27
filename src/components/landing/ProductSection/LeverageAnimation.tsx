import React, { useEffect, useState } from 'react';
import { motion, useAnimation, animate } from 'framer-motion';

export const LeverageAnimation: React.FC = () => {
  const sliderControls = useAnimation();
  const trackHighlightControls = useAnimation();
  const [displayValue, setDisplayValue] = useState(5);
  const [sliderPosition, setSliderPosition] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const animateSequence = async () => {
      if (!isMounted) return;

      // Reset animations
      await Promise.all([
        sliderControls.set({ x: 0 }),
        trackHighlightControls.set({ scaleX: 0 })
      ]);
      setDisplayValue(5);
      setSliderPosition(0);

      // Define leverage points
      const leveragePoints = [
        { value: 5, position: 0 },
        { value: 10, position: 0.2 },
        { value: 20, position: 0.4 },
        { value: 30, position: 0.6 },
        { value: 40, position: 0.8 },
        { value: 50, position: 1 }
      ];

      // Animate through each point
      for (let i = 0; i < leveragePoints.length - 1; i++) {
        if (!isMounted) return;

        const current = leveragePoints[i];
        const next = leveragePoints[i + 1];
        const duration = 0.8;

        // Start parallel animations
        const animations = [
          // Slider movement
          sliderControls.start({
            x: `${next.position * 100}%`,
            transition: {
              duration,
              ease: [0.32, 0.72, 0, 1]
            }
          }),
          // Track highlight
          trackHighlightControls.start({
            scaleX: next.position,
            transition: {
              duration,
              ease: [0.32, 0.72, 0, 1]
            }
          }),
          // Value interpolation
          animate(current.value, next.value, {
            duration,
            ease: [0.32, 0.72, 0, 1],
            onUpdate: (latest) => {
              if (isMounted) {
                setDisplayValue(Math.round(latest));
                setSliderPosition(next.position * 100);
              }
            }
          })
        ];

        await Promise.all(animations);
        if (!isMounted) return;
        
        // Brief pause at each step
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Hold at max value
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!isMounted) return;

      // Fade out
      await Promise.all([
        sliderControls.start({ opacity: 0, transition: { duration: 0.3 } }),
        trackHighlightControls.start({ opacity: 0, transition: { duration: 0.3 } })
      ]);

      await new Promise(resolve => setTimeout(resolve, 300));
      if (!isMounted) return;

      // Reset for next iteration
      await Promise.all([
        sliderControls.set({ opacity: 1, x: 0 }),
        trackHighlightControls.set({ opacity: 1, scaleX: 0 })
      ]);
      setDisplayValue(5);
      setSliderPosition(0);

      if (isMounted) {
        animateSequence();
      }
    };

    animateSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-8 h-8 relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10" />

      <div className="absolute inset-0 flex items-center">
        {/* Track background */}
        <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden">
          {/* Track highlight */}
          <motion.div
            className="h-full bg-primary origin-left"
            animate={trackHighlightControls}
          />
        </div>

        {/* Slider handle */}
        <motion.div
          className="absolute left-0 w-3 h-3 bg-primary rounded-full shadow-lg"
          animate={sliderControls}
          style={{
            filter: 'drop-shadow(0 0 4px rgba(var(--primary), 0.3))'
          }}
        />

        {/* Value display */}
        <motion.div
          className="absolute -top-4 left-0 px-1.5 py-0.5 text-[10px] font-medium bg-primary text-background rounded"
          animate={{
            x: `${sliderPosition}%`,
            y: -16
          }}
          style={{
            boxShadow: '0 0 8px rgba(var(--primary), 0.2)',
            backdropFilter: 'blur(4px)'
          }}
        >
          {displayValue}×
        </motion.div>
      </div>
    </div>
  );
};