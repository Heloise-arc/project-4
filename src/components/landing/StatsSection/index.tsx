import React from 'react';
import { StatCard } from './StatCard';
import { STATS } from './constants';
import { useTranslation } from '../../../hooks/useTranslation';

export const StatsSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-background font-mono py-32">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <StatCard 
              key={stat.id} 
              stat={{
                ...stat,
                label: t(`landing.sections.stats.${stat.id}.label`),
                subtext: t(`landing.sections.stats.${stat.id}.subtext`)
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};