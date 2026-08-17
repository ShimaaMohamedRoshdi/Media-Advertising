import React from 'react';
import { ProjectsPreviewSection } from '../sections/ProjectsPreviewSection';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../sections/CTASection';
import { useLanguage } from '../context/LanguageContext';

export const ProjectsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="py-12 flex flex-col gap-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText={t.projects.badge}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />
      </div>

      <ProjectsPreviewSection showHeader={false} />

      <CTASection />
    </div>
  );
};
