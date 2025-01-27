export const ANIMATION_EASINGS = {
  SMOOTH: [0.4, 0, 0.2, 1],
  ELASTIC: [0.34, 1.56, 0.64, 1],
  DECELERATE: [0, 0, 0.2, 1]
} as const;

export const ANIMATION_DURATIONS = {
  BOBBING: 1.4,
  MORPH: 0.8,
  SPLIT: 0.6,
  ZOOM_OUT: 0.4
} as const;

// Position where the star shape is located in the cat SVG
export const STAR_POSITION = {
  x: 217,  // Matches the star's x position in SVG
  y: 87,   // Matches the star's y position in SVG
  width: 63,
  height: 66
} as const;