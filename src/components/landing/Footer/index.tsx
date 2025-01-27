import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../../store/themeStore';
import { motion } from 'framer-motion';
import { IMAGES } from '../../../constants/images';
import { Globe } from 'lucide-react';
import { useLanguageStore } from '../../../store/languageStore';
import { useTranslation } from '../../../hooks/useTranslation';

export const Footer: React.FC = () => {
  const { theme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const [isLangOpen, setIsLangOpen] = React.useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];

  const links = {
    about: [
      { label: t('footer.about.blog'), href: '#' },
      { label: t('footer.about.stats'), href: '#' },
      { label: t('footer.about.terms'), href: '#' },
      { label: t('footer.about.privacy'), href: '#' }
    ],
    product: [
      { label: t('footer.product.options'), href: '#' },
      { label: t('footer.product.perps'), href: '#' },
      { label: t('footer.product.migration'), href: '#' },
      { label: t('footer.product.earn'), href: '#' },
      { label: t('footer.product.portfolio'), href: '#' },
      { label: t('footer.product.competitions'), href: '#' },
      { label: t('footer.product.developers'), href: '#' },
      { label: t('footer.product.governance'), href: '#' },
      { label: t('footer.product.forums'), href: '#' }
    ],
    resources: [
      { label: t('footer.resources.docs'), href: '#' },
      { label: t('footer.resources.api'), href: '#' },
      { label: t('footer.resources.brand'), href: '#' },
      { label: t('footer.resources.snapshot'), href: '#' },
      { label: t('footer.resources.help'), href: '#' }
    ],
    community: [
      { label: t('footer.community.telegram'), href: '#' },
      { label: t('footer.community.twitter'), href: '#' },
      { label: t('footer.community.discord'), href: '#' },
      { label: t('footer.community.warpcast'), href: '#' },
      { label: t('footer.community.youtube'), href: '#' }
    ]
  };

  return (
    <footer className="bg-background border-t border-primary/10">
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-6">
            <img 
              src={theme === 'dark' ? IMAGES.logos.textDark : IMAGES.logos.textLight}
              alt="Supurr"
              className="h-8"
            />
            <p className="text-sm text-primary/60 max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.sections.about')}</h3>
            <ul className="space-y-3">
              {links.about.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.sections.product')}</h3>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.sections.resources')}</h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.sections.community')}</h3>
            <ul className="space-y-3">
              {links.community.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary/10 text-center text-sm text-primary/40">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
};