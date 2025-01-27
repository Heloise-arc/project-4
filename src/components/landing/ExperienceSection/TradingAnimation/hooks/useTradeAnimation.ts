import { useState, useEffect } from 'react';

export type AnimationPhase = 'idle' | 'moving' | 'clicking' | 'revving' | 'success';

export function useTradeAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>('idle');

  useEffect(() => {
    const runSequence = async () => {
      // Start sequence
      setPhase('moving');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Click animation
      setPhase('clicking');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Revving animation with faded UI
      setPhase('revving');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success popup (keeping revving and faded UI)
      setPhase('success');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset to idle
      setPhase('idle');
    };

    const interval = setInterval(runSequence, 5000);
    runSequence();

    return () => clearInterval(interval);
  }, []);

  return phase;
}