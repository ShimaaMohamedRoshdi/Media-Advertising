import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ArrowUpRight, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/Logo.jpg';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-16 pb-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Company Bio */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center group">
              <img src={logoImg} alt="Aldar Media Logo" className="h-20 sm:h-24 w-auto object-contain" />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              {t.footer.bio}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.footer.zoneLabel}</span>
              <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                Sheikh Zayed Road Boulevard Zone
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">{t.footer.navTitle}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/" className="hover:text-blue-700 transition-colors font-medium">{t.nav.home}</Link></li>
              <li><Link to="/about" className="hover:text-blue-700 transition-colors font-medium">{t.nav.about}</Link></li>
              <li><Link to="/services" className="hover:text-blue-700 transition-colors font-medium">{t.nav.services}</Link></li>
              <li><Link to="/projects" className="hover:text-blue-700 transition-colors font-medium">{t.nav.projects}</Link></li>
              <li><Link to="/locations" className="hover:text-blue-700 transition-colors font-medium">{t.nav.locations}</Link></li>
              <li><Link to="/contact" className="hover:text-blue-700 transition-colors font-medium">{t.nav.contact}</Link></li>
              <li><Link to="/request-quote" className="hover:text-blue-700 transition-colors font-medium">{t.nav.requestQuote}</Link></li>
            </ul>
          </div>

          {/* Key Locations */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">{t.footer.networkTitle}</h4>
            <ul className="flex flex-col gap-2 text-xs leading-relaxed text-slate-600">
              <li className="flex items-start gap-1.5 text-blue-900 font-bold">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-700" />
                <span>Beside Shangri-La Hotel</span>
              </li>
              <li className="flex items-start gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                <span>Boulevard Grand Digital Arch</span>
              </li>
              <li className="flex items-start gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                <span>Financial Center Vista</span>
              </li>
              <li className="flex items-start gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                <span>Downtown Gate Screen</span>
              </li>
            </ul>
          </div>

          {/* Contact & Admin */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">{t.footer.contactTitle}</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-700 font-medium">
              <a href="mailto:algarousha@hotmail.com" className="flex items-center gap-2 hover:text-blue-700 transition-colors">
                <Mail className="w-4 h-4 text-blue-700" />
                <span>algarousha@hotmail.com</span>
              </a>
              <a href="tel:+971557060370" className="flex items-center gap-2 hover:text-blue-700 transition-colors">
                <Phone className="w-4 h-4 text-blue-700" />
                <span>+971 55 706 0370</span>
              </a>
            </div>

            <div className="pt-3">
              <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-blue-900 bg-slate-100 border border-slate-300 px-3 py-2 rounded-xl transition-colors">
                <Shield className="w-3.5 h-3.5 text-blue-700" />
                <span>{t.footer.portalLink}</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-60" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-800 cursor-pointer">{t.footer.privacy}</span>
            <span className="hover:text-slate-800 cursor-pointer">{t.footer.terms}</span>
            <span className="hover:text-slate-800 cursor-pointer">{t.footer.guidelines}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
