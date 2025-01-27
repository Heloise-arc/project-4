// Import all images
import gear1 from './capital efficiency/gear-1.png';
import gear2 from './capital efficiency/gear-2.png';
// ... import all gear images

import jump1 from './jump-1.png';
import jump2 from './jump-2.png';
// ... import all jump images

import swing1 from './swing-1.png';
import swing2 from './swing-2.png';
// ... import all swing images

import custody from './custody.png';

// Export them in organized objects
export const IMAGES = {
  gears: [gear1, gear2 /* ... all gear images */],
  jumps: [jump1, jump2 /* ... all jump images */],
  swings: [swing1, swing2 /* ... all swing images */],
  custody,
} as const;