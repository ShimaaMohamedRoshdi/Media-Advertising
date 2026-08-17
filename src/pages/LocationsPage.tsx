import React from 'react';
import { LocationsPreviewSection } from '../sections/LocationsPreviewSection';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../sections/CTASection';
import { MapPin, Eye, Layers } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';

export const LocationsPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="py-12 flex flex-col gap-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText={t.locations.badge}
          title={t.locations.title}
          subtitle={t.locations.subtitle}
        />
      </div>

      {/* Network Overview Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white p-8 rounded-3xl border border-amber-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="gold">{language === 'ar' ? 'الموقع الرئيسي' : 'ANCHOR SITE'}</Badge>
              <span className="text-xs text-slate-500 font-bold">
                {language === 'ar' ? 'ملاحظة حول المحور الإعلاني' : 'Corridor Key Note'}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {t.hero.flagshipText}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {language === 'ar'
                ? 'تقع شاشتنا الرقمية الرئيسية الفاخرة مزدوجة الوجه محاذية مباشرة لفندق شانغريلا على شارع الشيخ زايد، بينما تتوزع المواقع الـ 3 الأخرى على طول محور البوليفارد.'
                : 'Our flagship double-sided mega screen is situated directly beside Shangri-La Hotel on Sheikh Zayed Road. The remaining 3 locations are situated within the Sheikh Zayed Road Boulevard Zone corridor.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-700">
            <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>{language === 'ar' ? '4 مواقع رئيسية' : '4 Total Sites'}</span>
            </div>
            <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ar' ? '+1.05M مشاهدة' : '1.05M+ Impressions'}</span>
            </div>
            <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>{language === 'ar' ? 'عرض 4K HDR' : '4K HDR Display'}</span>
            </div>
          </div>
        </div>
      </section>

      <LocationsPreviewSection showHeader={false} />

      <CTASection />
    </div>
  );
};
