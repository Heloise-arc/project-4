import { Variants } from 'framer-motion';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from './constants';

export const morphVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.45,
    filter: "blur(8px)",
  },
  morph: {
    opacity: 1,
    scale: 0.45,
    filter: "blur(0px)",
    transition: {
      duration: ANIMATION_DURATIONS.MORPH,
      ease: ANIMATION_EASINGS.SMOOTH,
      opacity: {
        duration: ANIMATION_DURATIONS.MORPH * 0.6,
        delay: ANIMATION_DURATIONS.MORPH * 0.2,
        ease: ANIMATION_EASINGS.SMOOTH
      },
      filter: {
        duration: ANIMATION_DURATIONS.MORPH * 0.8,
        ease: ANIMATION_EASINGS.SMOOTH
      }
    }
  }
};