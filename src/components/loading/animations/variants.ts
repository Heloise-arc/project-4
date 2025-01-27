import { Variants } from 'framer-motion';

// Cat animation variants
export const catVariants: Variants = {
  initial: { 
    y: 0,
    opacity: 1 
  },
  bobbing: {
    y: [-6, 6],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  fadeOut: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Logo animation variants
export const logoVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.4,
    filter: "blur(10px)",
    x: "-50%",
    y: "-10%"
  },
  materialize: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1]
    }
  },
  zoom: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      opacity: {
        duration: 0.3,
        delay: 0.3
      }
    }
  }
};