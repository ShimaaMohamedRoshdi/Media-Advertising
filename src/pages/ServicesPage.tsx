import React from 'react';
import { ServicesSection } from '../sections/ServicesSection';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../sections/CTASection';
import { useLanguage } from '../context/LanguageContext';

export const ServicesPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="py-12 flex flex-col gap-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText={t.services.badge}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />
      </div>

      <ServicesSection showHeader={false} />

      <CTASection />
    </div>
  );
};
