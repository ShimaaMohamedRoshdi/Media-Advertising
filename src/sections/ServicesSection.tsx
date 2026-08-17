import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/initialServices';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';
import { Tv, Building2, Sparkles, Zap, Layers, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  showLimit?: number;
  showHeader?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  showLimit,
  showHeader = true,
}) => {
  const { t, language } = useLanguage();
  const displayedServices = showLimit ? SERVICES_DATA.slice(0, showLimit) : SERVICES_DATA;

  const iconMap: Record<string, React.ReactNode> = {
    Tv: <Tv className="w-6 h-6 text-amber-600" />,
    Building2: <Building2 className="w-6 h-6 text-emerald-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-amber-700" />,
    Zap: <Zap className="w-6 h-6 text-sky-600" />,
    Layers: <Layers className="w-6 h-6 text-indigo-600" />,
    BarChart3: <BarChart3 className="w-6 h-6 text-purple-600" />,
  };

  return (
    <section className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {showHeader && (
          <SectionHeader
            badgeText={t.services.badge}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />
        )}

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {displayedServices.map((service, idx) => {
            const serviceTitle = language === 'ar' && service.title_ar ? service.title_ar : service.title;
            const serviceDesc = language === 'ar' && service.description_ar ? service.description_ar : service.description;
            const serviceFeatures = language === 'ar' && service.features_ar ? service.features_ar : service.features;
            const serviceTarget = language === 'ar' && service.recommendedFor_ar ? service.recommendedFor_ar : service.recommendedFor;

            return (
              <div
                key={service.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="interactive-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col justify-between group relative overflow-hidden shadow-sm animate-fade-in-up"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {iconMap[service.iconName] || <Tv className="w-6 h-6 text-amber-600" />}
                    </div>
                    <Badge variant="gold" size="sm" className="group-hover:scale-105 transition-transform">
                      {language === 'ar' ? 'فاخر' : 'Premium'}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {serviceTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {serviceDesc}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="flex flex-col gap-2 pt-2 border-t border-slate-100 text-xs text-slate-700 font-medium">
                    {serviceFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 group-hover:translate-x-1 transition-transform">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 truncate">
                    {language === 'ar' ? 'الفئة المستهدفة:' : 'Target:'} <span className="text-slate-900 font-extrabold">{serviceTarget}</span>
                  </span>
                  <Link to={`/request-quote?service=${encodeURIComponent(service.title)}`}>
                    <Button variant="ghost" size="sm" className="group-hover:bg-amber-50 group-hover:text-amber-700 shrink-0" rightIcon={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}>
                      {t.services.btnQuote}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {showLimit && (
          <div className="mt-12 flex justify-center">
            <Link to="/services">
              <Button variant="secondary" size="lg" className="hover:scale-105 transition-transform" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t.services.btnAll}
              </Button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
