import { useState, useCallback } from 'react';
import { useToast } from '../../../components/shared/ToastProvider';

export type AnimationPhase = 'idle' | 'moving' | 'clicking' | 'revving' | 'success' | 'executing';

export function useTradeAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const { showToast } = useToast();

  const startTradeAnimation = useCallback(async () => {
    try {
      // Moving phase
      setPhase('moving');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Clicking phase
      setPhase('clicking');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Executing phase
      setPhase('executing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success phase
      setPhase('success');
      showToast('success', 'Trade executed successfully!');
      
      // Reset after delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPhase('idle');
    } catch (error) {
      setPhase('idle');
      showToast('error', 'Failed to execute trade');
    }
  }, [showToast]);

  return { phase, startTradeAnimation };
}