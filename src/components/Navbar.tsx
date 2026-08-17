import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight, Globe } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/Logo.jpg';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.locations, path: '/locations' },
    { name: t.nav.contact, path: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-1.5'
          : 'bg-white/85 backdrop-blur-sm border-b border-slate-200/60 py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Enlarged Crisp Image */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={logoImg}
              alt="Aldar Media Logo"
              className="h-16 sm:h-20 md:h-22 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 transform active:scale-95 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md scale-105'
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-200/80 hover:scale-105'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-all hover:scale-105 shadow-xs"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-blue-800" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            <Link to="/admin">
              <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform" leftIcon={<Shield className="w-4 h-4 text-slate-500" />}>
                {t.nav.adminPortal}
              </Button>
            </Link>
            <Link to="/request-quote">
              <Button variant="primary" size="sm" className="hover:scale-105 active:scale-95 transition-all shadow-md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t.nav.requestQuote}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-xl bg-slate-100 border border-slate-200 focus:outline-none transition-transform active:scale-90"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 animate-scale-in" /> : <Menu className="w-6 h-6 animate-scale-in" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[75px] bg-white border-b border-slate-200 backdrop-blur-xl p-6 shadow-2xl animate-scale-in flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
            <Link to="/request-quote" className="w-full">
              <Button variant="primary" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t.nav.requestQuote}
              </Button>
            </Link>
            <Link to="/admin" className="w-full">
              <Button variant="secondary" size="md" className="w-full" leftIcon={<Shield className="w-4 h-4 text-blue-900" />}>
                {t.nav.adminPortal}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
