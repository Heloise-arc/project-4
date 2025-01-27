import { useState, useEffect, useCallback, useRef } from 'react';

export type AnimationPhase = 'idle' | 'moving' | 'clicking' | 'speedCursor' | 'success';

export function useTradeAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const animationRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const runSequence = async () => {
      try {
        console.log('🎬 Starting animation sequence');
        
        // Moving phase
        setPhase('moving');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Clicking phase
        console.log('👆 Clicking');
        setPhase('clicking');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Speed cursor phase
        console.log('⚡ Speed cursor');
        setPhase('speedCursor');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Success phase
        console.log('✨ Success');
        setPhase('success');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Reset
        console.log('🔄 Resetting');
        setPhase('idle');
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error('❌ Animation sequence error:', error);
      }
    };

    // Start the sequence
    runSequence();
    
    // Set up interval for repeating
    animationRef.current = setInterval(runSequence, 5000);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  return {
    phase
  };
}