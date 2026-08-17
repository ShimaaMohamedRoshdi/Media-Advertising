import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CTASection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl text-white group">
          
          {/* Animated Background Glow Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-float" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-float-reverse" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-extrabold uppercase tracking-wider self-center lg:self-start animate-pulse-glow">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>{t.cta.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-sm">
                {t.cta.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                {t.cta.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <Link to="/request-quote" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto font-extrabold text-slate-900 shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                  rightIcon={<ArrowRight className="w-5 h-5 text-blue-900 group-hover:translate-x-1 transition-transform" />}
                >
                  {t.cta.btnQuote}
                </Button>
              </Link>
              <Link to="/locations" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/80 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
                  leftIcon={<PhoneCall className="w-4 h-4 text-white" />}
                >
                  {t.cta.btnLocations}
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
