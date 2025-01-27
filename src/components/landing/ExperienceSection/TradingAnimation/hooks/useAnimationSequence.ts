import { useState, useEffect } from 'react';
import { ElementPosition } from './useElementPosition';

export type AnimationPhase = 'idle' | 'clicking' | 'success';

interface AnimationState {
  phase: AnimationPhase;
  cursorPosition: { x: number; y: number };
}

export function useAnimationSequence(buttonPosition: ElementPosition | null) {
  const [state, setState] = useState<AnimationState>({
    phase: 'idle',
    cursorPosition: { x: -100, y: -100 }
  });

  useEffect(() => {
    if (!buttonPosition) return;

    const interval = setInterval(() => {
      const sequence = async () => {
        // Move cursor to center of button
        setState({
          phase: 'clicking',
          cursorPosition: {
            x: buttonPosition.x + (buttonPosition.width / 2) - 16, // 16 = half cursor width
            y: buttonPosition.y + (buttonPosition.height / 2) - 16  // 16 = half cursor height
          }
        });
        
        // Show success after delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setState(prev => ({ ...prev, phase: 'success' }));
        
        // Reset after delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setState({
          phase: 'idle',
          cursorPosition: { x: -100, y: -100 }
        });
      };
      
      sequence();
    }, 4000);

    return () => clearInterval(interval);
  }, [buttonPosition]);

  return state;
}