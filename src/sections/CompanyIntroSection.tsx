import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ShieldCheck, Award, Eye, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CompanyIntroSection: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '4', label: t.intro.stat1Label, desc: t.intro.stat1Desc },
    { value: '1M+', label: t.intro.stat2Label, desc: t.intro.stat2Desc },
    { value: '99.8%', label: t.intro.stat3Label, desc: t.intro.stat3Desc },
    { value: '15+', label: t.intro.stat4Label, desc: t.intro.stat4Desc },
  ];

  const pillars = [
    {
      icon: <Eye className="w-6 h-6 text-amber-600 group-hover:scale-125 transition-transform" />,
      title: t.intro.p1Title,
      desc: t.intro.p1Desc,
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-600 group-hover:scale-125 transition-transform" />,
      title: t.intro.p2Title,
      desc: t.intro.p2Desc,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sky-600 group-hover:scale-125 transition-transform" />,
      title: t.intro.p3Title,
      desc: t.intro.p3Desc,
    },
    {
      icon: <Award className="w-6 h-6 text-amber-700 group-hover:scale-125 transition-transform" />,
      title: t.intro.p4Title,
      desc: t.intro.p4Desc,
    },
  ];

  return (
    <section className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header */}
        <SectionHeader
          badgeText={t.intro.badge}
          title={t.intro.title}
          subtitle={t.intro.subtitle}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 100}ms` }}
              className="interactive-card bg-white p-6 rounded-2xl border border-slate-200 flex flex-col items-center text-center group shadow-sm animate-fade-in-up"
            >
              <span className="text-3xl sm:text-4xl font-black text-amber-600 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </span>
              <span className="text-sm font-extrabold text-slate-900 mt-2">{stat.label}</span>
              <span className="text-xs text-slate-500 font-medium mt-1">{stat.desc}</span>
            </div>
          ))}
        </div>

        {/* Brand Narrative & Pillars */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {t.intro.narrativeTitle}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.intro.p1}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.intro.p2}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="interactive-card bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col gap-3 group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-xs group-hover:bg-amber-50 group-hover:border-amber-300 transition-colors">
                  {p.icon}
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{p.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
