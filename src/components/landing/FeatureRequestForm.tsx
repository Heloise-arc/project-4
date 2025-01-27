import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const FeatureRequestForm: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        className="p-4 rounded-full bg-primary text-background shadow-lg hover:scale-110 transition-transform"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-background rounded-xl p-6 w-full max-w-lg relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-primary/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-6 p-4 bg-primary/5 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                <div className="w-full h-full relative">
                  <img 
                    src="/assets/images/form-intern.png"
                    alt={t('form.internName')}
                    className="absolute w-[180%] h-[180%] object-cover"
                    style={{
                      top: '-25%',
                      left: '-35%'
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">{t('form.internName')}</div>
                <p className="text-sm text-primary/80">
                  {t('form.internMessage')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('form.featureTitle')}
                </label>
                <input
                  type="text"
                  placeholder={t('form.featureTitlePlaceholder')}
                  className="w-full p-2 rounded-lg bg-primary/5 border border-primary/10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('form.description')}
                </label>
                <textarea
                  placeholder={t('form.descriptionPlaceholder')}
                  className="w-full h-24 p-2 rounded-lg bg-primary/5 border border-primary/10 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('form.useCase')}
                </label>
                <textarea
                  placeholder={t('form.useCasePlaceholder')}
                  className="w-full h-24 p-2 rounded-lg bg-primary/5 border border-primary/10 resize-none"
                />
              </div>

              <button className="w-full py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors">
                {t('form.submit')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};