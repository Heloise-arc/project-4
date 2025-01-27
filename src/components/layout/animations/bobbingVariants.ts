import { Variants } from 'framer-motion';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from './constants';

export const bobbingVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.4,
        ease: ANIMATION_EASINGS.SMOOTH
      }
    }
  },
  exit: {
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.BOBBING,
      ease: ANIMATION_EASINGS.SMOOTH
    }
  }
};