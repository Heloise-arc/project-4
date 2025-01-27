// Base path changes based on environment
const BASE_PATH = '/assets/images';

export const IMAGES = {
  logos: {
    textDark: `${BASE_PATH}/logo-text-dark.svg`,
    textLight: `${BASE_PATH}/logo-text-light.svg`,
    iconDark: `${BASE_PATH}/logo-dark.svg`,
    iconLight: `${BASE_PATH}/logo-light.svg`
  },
  animations: {
    watch: (frame: number) => `${BASE_PATH}/supurr assets/watch/watch-${frame}.png`,
    outerRing: (frame: number) => `${BASE_PATH}/supurr assets/outer-ring/outer-ring-${frame}.png`,
    innerRing: (frame: number) => `${BASE_PATH}/supurr assets/inner-ring/inner-ring-${frame}.png`,
    gear: (frame: number) => `${BASE_PATH}/capital efficiency/gear-${frame}.png`,
    liquidation: (frame: number) => `${BASE_PATH}/liquidation/liquidation-${frame}.png`,
    swing: (frame: number) => `${BASE_PATH}/swing-${frame}.png`,
    custody: `${BASE_PATH}/custody.png`,
    trading: `${BASE_PATH}/trading-image.png`,
    formIntern: `${BASE_PATH}/form-intern.png`,
    loadingCat: `${BASE_PATH}/loading-cat.svg`,
    buttonClick: (frame: number) => `${BASE_PATH}/button-click-${frame}.svg`,
    upDown: {
      dark: `${BASE_PATH}/up-down-dark.svg`,
      light: `${BASE_PATH}/up-down-light.svg`
    },
    aboveBelow: {
      dark: `${BASE_PATH}/above-below-dark.svg`,
      light: `${BASE_PATH}/above-below-light.svg`
    },
    supurrPro: `${BASE_PATH}/supurr-pro.svg`
  }
} as const;