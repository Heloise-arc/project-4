import React, { useEffect, useRef } from 'react';
import { useThemeStore } from '../../store/themeStore';

export const CursorEffect: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '78, 159, 61' : '30, 81, 40';

  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    let rafId: number;

    const updateCursor = (e: MouseEvent) => {
      if (!cursor) return;
      
      // Center the cursor on the mouse position
      const x = e.clientX - cursor.offsetWidth / 2;
      const y = e.clientY - cursor.offsetHeight / 2;
      
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => updateCursor(e));
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{ 
        width: '100px',
        height: '100px',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'subpixel-antialiased'
      }}
    >
      {/* Main gradient glow */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at center, rgba(${primaryColor}, 0.08) 0%, rgba(${primaryColor}, 0.05) 25%, rgba(${primaryColor}, 0.02) 50%, transparent 70%)`,
          filter: 'blur(10px)',
          mixBlendMode: 'screen',
          willChange: 'transform',
          transform: 'translate3d(0,0,0)'
        }}
      />

      {/* Inner glow */}
      <div 
        className="absolute left-[25px] top-[25px] w-[50px] h-[50px] rounded-full"
        style={{
          background: `radial-gradient(circle at center, rgba(${primaryColor}, 0.1) 0%, rgba(${primaryColor}, 0.05) 50%, transparent 70%)`,
          filter: 'blur(5px)',
          mixBlendMode: 'screen',
          willChange: 'transform',
          transform: 'translate3d(0,0,0)'
        }}
      />

      {/* Core glow */}
      <div 
        className="absolute left-[37.5px] top-[37.5px] w-[25px] h-[25px] rounded-full"
        style={{
          background: `radial-gradient(circle at center, rgba(${primaryColor}, 0.15) 0%, rgba(${primaryColor}, 0.08) 50%, transparent 70%)`,
          filter: 'blur(2px)',
          mixBlendMode: 'screen',
          willChange: 'transform',
          transform: 'translate3d(0,0,0)'
        }}
      />
    </div>
  );
};