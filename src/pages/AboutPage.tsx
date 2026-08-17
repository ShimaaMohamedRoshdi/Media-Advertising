import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { VisionMissionSection } from '../sections/VisionMissionSection';
import { CTASection } from '../sections/CTASection';
import { MapPin, ShieldCheck, Cpu, Award } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="py-12 flex flex-col gap-16">
      
      {/* Header Banner */}
      <section className="relative pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badgeText={t.intro.badge}
            title={language === 'ar' ? 'شبكة الإعلانات الخارجية الفاخرة في دبي' : 'Dubai\'s Premier Boulevard OOH Media Network'}
            subtitle={language === 'ar' ? 'توفير هيمنة بصرية رقمية عالية التأثير على طول شارع الشيخ زايد.' : 'Providing high-impact digital billboard dominance along Sheikh Zayed Road.'}
          />
        </div>
      </section>

      {/* Narrative & Visual Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Badge variant="gold" size="sm" className="self-start">
              {language === 'ar' ? 'منطقة بوليفارد شارع الشيخ زايد' : 'SHEIKH ZAYED ROAD BOULEVARD ZONE'}
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {language === 'ar'
                ? 'حيث تلتقي الهندسة المتقدمة بالإعلانات الخارجية عالية الأثر'
                : 'Where Engineering Excellence Meets High-Impact Advertising'}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {t.intro.p1}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {t.intro.p2}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-black text-amber-700">1,000,000+</span>
                <span className="text-xs text-slate-700 font-bold uppercase">{t.intro.stat2Label}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-black text-emerald-700">4 Prime Sites</span>
                <span className="text-xs text-slate-700 font-bold uppercase">{t.intro.stat1Label}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                alt="Sheikh Zayed Road Boulevard Zone"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5 text-amber-300 drop-shadow">
                  <MapPin className="w-4 h-4" />
                  {t.hero.flagshipText}
                </span>
                <Badge variant="emerald" size="sm">
                  {language === 'ar' ? 'شبكة نشطة' : 'Active Network'}
                </Badge>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission */}
      <VisionMissionSection />

      {/* Network Infrastructure Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'ar' ? 'معدات رقمية بدقة 4K' : 'Ultra 4K Hardware'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {language === 'ar'
                ? 'مصفوفات LED صناعية عالية السطوع مصممة لرؤية واضحة تحت أشعة الشمس ومعدل تحديث 3840Hz.'
                : 'Industrial high-brightness LED arrays engineered for vivid sunlight readability and crisp 3840Hz refresh rates.'}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'ar' ? 'بنية تشغيلية احتياطية' : 'Redundant Tech Stack'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {language === 'ar'
                ? 'تغذية بصريات مزدوجة وأنظمة تبديل تلقائي تضمن البث المستمر دون انقطاع.'
                : 'Dual optical backup feeds and automated failovers guarantee uninterrupted broadcast during critical product launches.'}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'ar' ? 'تراخيص معتمدة رسمياً' : 'Official Permitting'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {language === 'ar'
                ? 'امتثال كامل للوائح هيئة الطرق والمواصلات وبلدية دبي لضمان أعلى معايير السلامة والجودة.'
                : 'Full compliance with RTA and Dubai Municipality regulations for safe, high-prestige advertising standards.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTASection />

    </div>
  );
};
