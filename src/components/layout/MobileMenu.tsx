import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  const menuItems = [
    { label: 'Trading', path: '/trading' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Testnet', path: '/testnet' },
    { label: 'Token', path: '/token' },
    { label: 'Campaigns', path: '/campaigns' },
    { label: 'Referrals', path: '/referrals' },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-primary/10"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background border-l border-primary/10 z-50 p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
            >
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-primary/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 rounded-lg hover:bg-primary/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/trading"
                  className="block px-4 py-2 bg-primary text-background rounded-lg text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {t('navigation.launchApp')}
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};