import { jaTranslations } from './ja';
import { koTranslations } from './ko';
import { zhTranslations } from './zh';

export type Language = 'en' | 'ja' | 'ko' | 'zh';

export const translations = {
  en: {
    navigation: {
      launchApp: 'Launch App'
    },
    landing: {
      hero: {
        title: 'Trade supurr short-dated options',
        subtitle: 'Low cost, defined max loss thresholds, higher leverage than perps, and the highest profit potential-to-cost ratio.'
      },
      sections: {
        stats: {
          volume: {
            label: 'Total Volume',
            subtext: 'Last 30 days'
          },
          users: {
            label: 'Users Overtime',
            subtext: 'Active traders'
          },
          openInterest: {
            label: 'Current Open Interest',
            subtext: 'Across markets'
          },
          revenue: {
            label: 'Total Revenue',
            subtext: 'Protocol revenue'
          }
        },
        features: {
          title: 'built for every type of button clicker',
          subtitle: 'options re-designed to suit both professional and retail options traders'
        },
        experience: {
          title: 'supurr-eme trading experience',
          subtitle: '1-click, gasless, low-latency execution'
        },
        profit: {
          title: 'low fee, high payout',
          subtitle: 'most competitive fee on-chain with highest profit potential than any financial instrument'
        },
        risk: {
          title: 'no liquidation risk',
          subtitle: 'infinite leverage with defined max loss thresholds'
        },
        collateral: {
          title: 'multi-collateral options',
          subtitle: 'maintain exposure to your favorite assets with USDe, HYPE, SUPURR and more options'
        },
        assets: {
          title: 'supurr assets',
          subtitle: 'get access to crypto, commodities, forex and more'
        },
        selfCustody: {
          title: 'self custody',
          subtitle: 'No CEX style deposits necessary. Connect your wallet and trade!'
        },
        capital: {
          title: 'deep liquidity',
          subtitle: 'unmatched depth, tighter spreads and capital efficiency for traders of any type'
        },
        evolution: {
          title: 'supurr evolution',
          subtitle: 'Supurr isn\'t just a trading platform—it\'s 3 years of simplified onchain derivatives, market-tested through Buffer Finance. With a clearer mission and bigger vision, we\'re scaling up to simplify trading and market-making'
        },
        products: {
          title: 'bringing the convex world order onchain',
          upDown: {
            title: 'up/down options',
            description: 'options trading simplified into two simple choices - up or down with timeframes as short as 1 mins. scalp, predict to earn up to 1.9x of your size, without margin calls, or funding rate variance'
          },
          aboveBelow: {
            title: 'above/below options',
            description: 'all-season trading tool. trade without any directional bias, or utilize volatility yield with quick OTM calls/puts. easily execute single-leg/double-leg strategies in ranging markets'
          },
          vanillas: {
            title: 'vanilla options',
            description: 'trade european-style options on any DeFi token with most accurate market-driven pricing'
          },
          leverage: {
            title: 'leverage',
            description: 'trade perpetual futures with up to 50x leverage through hyperliquid. combine with strategy builder to execute complex risk and portfolio management'
          },
          strategy: {
            title: 'strategy builder',
            description: 'easily build custom strategies using calls, puts, digital options, forwards and perps. position builder allows single-leg or multi-leg conditional orders with optimized collateral, ensuring proportional execution'
          },
          vaults: {
            title: 'market making vaults',
            description: 'earn spreads and yields. designed to ensure seamless liquidity across options, perps and spot markets while providing users with high delta-neutral yields. whether you are an experienced trader or just getting started, this platform makes it easy and efficient to maximize returns'
          },
          portfolio: {
            title: 'portfolio management',
            description: 'simplified portfolio management experience to easily view markets, track open positions and place orders — powered by supurr\'s DeFAI intelligence architecture'
          },
          pro: {
            title: 'supurr pro - DeFAI',
            description: 'your trading copilot to seamlessly execute complex strategies based on real-time market views — supurr powered by custom intelligence models'
          },
          social: {
            title: 'social & gamification',
            description: 'follow and automatically copy top trader strategies. enter the arena to participate in high-reward tournaments and thrilling competitions, earning points and exclusive rewards'
          }
        }
      }
    },
    footer: {
      description: 'The next generation of simplified derivatives trading, built for every type of button clicker.',
      sections: {
        about: 'About',
        product: 'Product',
        resources: 'Resources',
        community: 'Community'
      },
      about: {
        blog: 'Blog',
        stats: 'Stats',
        terms: 'Terms',
        privacy: 'Privacy'
      },
      product: {
        options: 'Options',
        perps: 'Perps',
        migration: 'BFR → SUPURR Migration',
        earn: 'Earn',
        portfolio: 'Portfolio',
        competitions: 'Competitions',
        developers: 'Developers',
        governance: 'Governance Portal',
        forums: 'Forums'
      },
      resources: {
        docs: 'Documentation',
        api: 'API',
        brand: 'Brand Kit',
        snapshot: 'Snapshot',
        help: 'Help Center'
      },
      community: {
        telegram: 'Telegram',
        twitter: 'Twitter',
        discord: 'Discord',
        warpcast: 'Warpcast',
        youtube: 'YouTube'
      },
      copyright: '© {year} Supurr. All rights reserved.'
    },
    form: {
      internName: 'Supurr Intern',
      internMessage: 'Want to suggest a new feature? We\'d love to hear your ideas!',
      featureTitle: 'Feature Title',
      featureTitlePlaceholder: 'Enter the title of your suggested feature',
      description: 'Description',
      descriptionPlaceholder: 'Describe the feature in detail',
      useCase: 'Use Case',
      useCasePlaceholder: 'Explain how this feature would help users',
      submit: 'Submit'
    }
  },
  ja: jaTranslations,
  ko: koTranslations,
  zh: zhTranslations
} as const;

export type TranslationKey = keyof typeof translations.en;