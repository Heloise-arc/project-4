import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';

interface SparkleProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  delay?: number;
}

const Sparkle: React.FC<SparkleProps> = ({ size = 10, color, style, delay = 0 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    initial={{ scale: 0, rotate: 0 }}
    animate={{
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      opacity: [0, 1, 0]
    }}
    transition={{
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatDelay: 0.5,
      delay
    }}
  >
    <path
      d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
      fill={color}
    />
  </motion.svg>
);

export const Sparkles: React.FC<{ count?: number }> = ({ count = 8 }) => {
  const { theme } = useThemeStore();
  const sparkleColor = theme === 'dark' ? '#4E9F3D' : '#1E5128';

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i * (360 / count)) * (Math.PI / 180);
        const radius = 15; // Slightly reduced radius for tighter formation
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <Sparkle
            key={i}
            size={4} // Smaller sparkles
            color={sparkleColor}
            delay={i * 0.15} // Stagger the animations
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              filter: 'blur(0.2px)' // Slight blur for softer appearance
            }}
          />
        );
      })}
    </div>
  );
};