import { Variants } from 'framer-motion';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from './constants';

export const splitVariants: Variants = {
  centered: {
    opacity: 1,
    scale: 0.45,
    filter: "blur(0px)"
  },
  split: {
    opacity: 0,
    scale: 2.4,
    filter: "blur(4px)",
    transition: {
      duration: ANIMATION_DURATIONS.SPLIT,
      ease: ANIMATION_EASINGS.ELASTIC,
      opacity: {
        duration: ANIMATION_DURATIONS.SPLIT * 0.8,
        ease: ANIMATION_EASINGS.SMOOTH
      },
      filter: {
        duration: ANIMATION_DURATIONS.SPLIT * 0.6,
        ease: ANIMATION_EASINGS.SMOOTH
      }
    }
  }
};