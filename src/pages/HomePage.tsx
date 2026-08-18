import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { LocationsPreviewSection } from '../sections/LocationsPreviewSection';
import { ServicesSection } from '../sections/ServicesSection';
import { ProjectsPreviewSection } from '../sections/ProjectsPreviewSection';
import { CTASection } from '../sections/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. High-Impact Hero Stage */}
      <HeroSection />

      {/* 2. Core Product Showcase: The 4 Exclusive Sheikh Zayed Boulevard Screens */}
      <LocationsPreviewSection limit={4} />

      {/* 3. Specialized DOOH & Billboard Services */}
      <ServicesSection showLimit={3} />

      {/* 4. Luxury Brand Campaign Showcase */}
      <ProjectsPreviewSection limit={3} />

      {/* 5. Executive Booking & Commercial CTA */}
      <CTASection />
    </div>
  );
};
