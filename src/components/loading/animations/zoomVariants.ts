import { Variants } from 'framer-motion';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from './constants';

export const zoomVariants: Variants = {
  zoomOut: {
    scale: 0.65, // Increased scale to match logo size
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.ZOOM_OUT,
      ease: ANIMATION_EASINGS.SMOOTH
    }
  },
  exit: {
    opacity: 0,
    scale: 0.6,
    filter: "blur(8px)",
    transition: {
      duration: ANIMATION_DURATIONS.ZOOM_OUT * 0.7,
      ease: ANIMATION_EASINGS.DECELERATE,
      opacity: {
        duration: ANIMATION_DURATIONS.ZOOM_OUT * 0.5
      }
    }
  }
};