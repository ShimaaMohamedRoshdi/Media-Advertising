import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Compass, Target, Shield, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VisionMissionSection: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      title: t.vision.v1Title,
      desc: t.vision.v1Desc,
      icon: <Target className="w-5 h-5 text-amber-600 group-hover:scale-125 transition-transform" />,
    },
    {
      title: t.vision.v2Title,
      desc: t.vision.v2Desc,
      icon: <Compass className="w-5 h-5 text-emerald-600 group-hover:scale-125 transition-transform" />,
    },
    {
      title: t.vision.v3Title,
      desc: t.vision.v3Desc,
      icon: <Shield className="w-5 h-5 text-sky-600 group-hover:scale-125 transition-transform" />,
    },
    {
      title: t.vision.v4Title,
      desc: t.vision.v4Desc,
      icon: <HeartHandshake className="w-5 h-5 text-amber-700 group-hover:scale-125 transition-transform" />,
    },
  ];

  return (
    <section className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badgeText={t.vision.badge}
          title={t.vision.title}
          subtitle={t.vision.subtitle}
        />

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          
          <div className="interactive-card bg-slate-50 p-8 rounded-3xl border border-amber-300 flex flex-col gap-4 relative overflow-hidden group shadow-sm animate-fade-in-up">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">{t.vision.visionTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t.vision.visionDesc}
            </p>
          </div>

          <div className="interactive-card bg-slate-50 p-8 rounded-3xl border border-emerald-300 flex flex-col gap-4 relative overflow-hidden group shadow-sm animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">{t.vision.missionTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t.vision.missionDesc}
            </p>
          </div>

        </div>

        {/* Core Values Grid */}
        <div className="mt-16">
          <h4 className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-8">
            {t.vision.valuesTitle}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 100}ms` }}
                className="interactive-card bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-3 shadow-xs group animate-fade-in-up"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-amber-50 group-hover:border-amber-300 transition-colors">
                  {v.icon}
                </div>
                <h5 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{v.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
