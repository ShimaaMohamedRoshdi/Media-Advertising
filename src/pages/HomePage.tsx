import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { CompanyIntroSection } from '../sections/CompanyIntroSection';
import { ServicesSection } from '../sections/ServicesSection';
import { ProjectsPreviewSection } from '../sections/ProjectsPreviewSection';
import { LocationsPreviewSection } from '../sections/LocationsPreviewSection';
import { FAQSection } from '../sections/FAQSection';
import { CTASection } from '../sections/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CompanyIntroSection />
      <ServicesSection showLimit={3} />
      <ProjectsPreviewSection limit={3} />
      <LocationsPreviewSection limit={4} />
      <FAQSection />
      <CTASection />
    </div>
  );
};
