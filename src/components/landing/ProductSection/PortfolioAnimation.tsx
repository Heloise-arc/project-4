import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useThemeStore } from '../../../store/themeStore';

export const PortfolioAnimation: React.FC = () => {
  const controls = useAnimation();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  // Define segments with proper start and end angles
  const segments = [
    { startAngle: 0, endAngle: 72, color: isDark ? '#4E9F3D' : '#1E5128' },     // 20%
    { startAngle: 72, endAngle: 144, color: isDark ? '#3D7F31' : '#183F20' },   // 20%
    { startAngle: 144, endAngle: 216, color: isDark ? '#2C5F25' : '#122D18' },  // 20%
    { startAngle: 216, endAngle: 288, color: isDark ? '#1B3F19' : '#0C1B10' },  // 20%
    { startAngle: 288, endAngle: 360, color: isDark ? '#0A1F0D' : '#060D08' }   // 20%
  ];

  useEffect(() => {
    let currentIndex = 0;
    let isAnimating = true;
    
    const animate = async () => {
      if (!isAnimating) return;

      // Move current segment out
      await controls.start(i => ({
        x: i === currentIndex ? 4 : 0,
        y: i === currentIndex ? -4 : 0,
        scale: i === currentIndex ? 1.1 : 1,
        transition: { duration: 0.3, ease: "easeOut" }
      }));

      if (!isAnimating) return;

      // Hold briefly
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!isAnimating) return;

      // Move back
      await controls.start(i => ({
        x: 0,
        y: 0,
        scale: 1,
        transition: { duration: 0.2, ease: "easeIn" }
      }));

      if (!isAnimating) return;

      // Wait before next segment
      await new Promise(resolve => setTimeout(resolve, 200));

      // Move to next segment
      currentIndex = (currentIndex + 1) % segments.length;

      if (isAnimating) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      isAnimating = false;
    };
  }, [theme]);

  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(16, 16, 12, startAngle);
    const end = polarToCartesian(16, 16, 12, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      'M', 16, 16,                                           // Move to center
      'L', start.x, start.y,                                // Line to start of arc
      'A', 12, 12, 0, largeArcFlag, 1, end.x, end.y,       // Arc to end point
      'L', 16, 16                                           // Line back to center
    ].join(' ');
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="w-8 h-8 relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10" />

      <svg
        viewBox="0 0 32 32"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {segments.map((segment, index) => (
          <motion.path
            key={index}
            d={createArcPath(segment.startAngle, segment.endAngle)}
            fill={segment.color}
            custom={index}
            animate={controls}
            style={{ 
              transformOrigin: '16px 16px',
              filter: `drop-shadow(0 0 2px ${segment.color}33)`
            }}
          />
        ))}

        {/* Center dot */}
        <circle
          cx="16"
          cy="16"
          r="1.5"
          className="fill-primary"
          style={{
            filter: 'drop-shadow(0 0 2px rgba(var(--primary), 0.4))'
          }}
        />
      </svg>
    </div>
  );
};