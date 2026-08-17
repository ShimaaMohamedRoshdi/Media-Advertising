import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, Monitor, TrendingUp, PhoneCall, Radio, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-[82vh] flex flex-col justify-between pt-6 pb-16 overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      {/* Animated Floating Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none animate-float-reverse" />

      {/* Live Marquee Ticker Bar */}
      <div className="w-full bg-slate-900 text-slate-200 text-[11px] font-bold py-2 overflow-hidden border-b border-slate-800 shadow-inner z-20">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'ar' ? 'بث مباشر: شبكة شاشات شارع الشيخ زايد تعمل بدقة 4K عالية الوضوح' : 'LIVE BROADCAST: SHEIKH ZAYED ROAD BOULEVARD NETWORK BROADCASTING IN 4K HDR'}</span>
          </span>
          <span className="flex items-center gap-2 text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'الموقع الرئيسي الفاخر: بجانب فندق شانغريلا' : 'FLAGSHIP ANCHOR SITE: BESIDE SHANGRI-LA HOTEL'}</span>
          </span>
          <span className="flex items-center gap-2 text-emerald-300">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? '+1,000,000 مشاهدة يومية مؤكدة' : '1,000,000+ VERIFIED DAILY IMPRESSIONS'}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'ar' ? 'بث مباشر: شبكة شاشات شارع الشيخ زايد تعمل بدقة 4K عالية الوضوح' : 'LIVE BROADCAST: SHEIKH ZAYED ROAD BOULEVARD NETWORK BROADCASTING IN 4K HDR'}</span>
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto py-8">
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto animate-fade-in-up">
          
          {/* Slogan Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur border border-slate-300 shadow-md animate-pulse-glow hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-blue-800 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-extrabold tracking-wide uppercase text-slate-900">
              {t.hero.slogan}
            </span>
            <Badge variant="gold" size="sm" className="shadow-xs">{t.hero.badgeTag}</Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            {t.hero.titleStart} <br className="hidden sm:inline" />
            <span className="text-gradient-gold animate-gradient-text">{t.hero.titleEnd}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Action CTAs: 3 Buttons requested by client */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2 w-full sm:w-auto">
            <Link to="/locations" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                rightIcon={<MapPin className="w-5 h-5" />}
              >
                {t.hero.btnLocations}
              </Button>
            </Link>

            <Link to="/request-quote" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-300 hover:bg-slate-100 text-slate-900 font-bold hover:scale-105 active:scale-95 transition-all duration-300"
                rightIcon={<ArrowRight className="w-5 h-5 text-blue-800" />}
              >
                {t.hero.btnQuote}
              </Button>
            </Link>

            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto hover:scale-105 active:scale-95 transition-all duration-300"
                leftIcon={<PhoneCall className="w-4 h-4 text-blue-800" />}
              >
                {t.hero.btnContact}
              </Button>
            </Link>
          </div>

          {/* Key Metrics Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-bold text-slate-700 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-2 text-slate-900 hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4 shrink-0 text-blue-700 animate-bounce" />
              <span>{t.hero.flagshipText}</span>
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.hero.impressionsText}</span>
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="flex items-center gap-2 text-sky-900 hover:scale-105 transition-transform">
              <Monitor className="w-4 h-4 shrink-0 text-sky-600" />
              <span>{t.hero.locationsText}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
