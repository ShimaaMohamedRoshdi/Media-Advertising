import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Building
} from 'lucide-react';
import { useQuotations } from '../hooks/useQuotations';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { submitQuotation } = useQuotations();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitQuotation({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || null,
        service_type: 'General Contact Inquiry',
        message: formData.message,
      });

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err: any) {
      setSubmitError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badgeText={t.contact.badge}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          
          {/* Contact Details & Map Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Direct Contact Cards Container */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6">
              <Badge variant="gold" size="sm" className="self-start">DUBAI HEADQUARTERS</Badge>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.contact.phoneLabel}</span>
                  <a href="tel:+971557060370" className="text-base sm:text-lg font-black text-slate-900 hover:text-amber-600 transition-colors">
                    +971 55 706 0370
                  </a>
                  <span className="text-xs text-slate-500 font-medium mt-0.5">{t.contact.hoursText}</span>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-4 border-t border-slate-100 pt-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2 flex-grow">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.contact.whatsappLabel}</span>
                  <a
                    href="https://wa.me/971557060370"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all hover:scale-105 shadow-md w-full sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.contact.whatsappBtn}</span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 border-t border-slate-100 pt-5">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-300 flex items-center justify-center text-sky-600 shrink-0 shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.contact.emailLabel}</span>
                  <a href="mailto:algarousha@hotmail.com" className="text-sm sm:text-base font-extrabold text-amber-700 hover:underline break-all">
                    algarousha@hotmail.com
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4 border-t border-slate-100 pt-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-300 flex items-center justify-center text-indigo-600 shrink-0 shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.contact.officeLabel}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed mt-0.5">
                    {t.contact.addressText}
                  </span>
                </div>
              </div>

            </div>

            {/* Google Maps Interactive Location Card */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{t.contact.mapLabel}</span>
                </span>
                <Badge variant="gold" size="sm">Shangri-La Zone</Badge>
              </div>
              <div className="h-56 w-full relative bg-slate-100">
                <iframe
                  title="Aldar Media Dubai Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.739773413813!2d55.27218671501174!3d25.212001983889155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f428d0985c7e1%3A0xbef0ecbe2a22be1b!2sShangri-La%20Dubai!5e0!3m2!1sen!2sae!4v1680000000000!5m2!1sen!2sae"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

          </div>

          {/* Direct Message Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
              {isSuccess ? (
                <div className="flex flex-col items-center text-center gap-6 py-12 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-extrabold text-slate-900">{t.contact.successTitle}</h3>
                    <p className="text-sm text-slate-600 max-w-md leading-relaxed font-medium">
                      {t.contact.successDesc}
                    </p>
                  </div>
                  <Button variant="primary" onClick={() => setIsSuccess(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-black text-slate-900">{t.contact.formTitle}</h3>
                    <p className="text-xs text-slate-500 font-medium">{t.contact.formSubtitle}</p>
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label={`${t.quote.fullName} *`}
                      placeholder="e.g. Rand Al-Quds"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      leftIcon={<User className="w-4 h-4 text-slate-400" />}
                      required
                    />
                    <Input
                      label={`${t.quote.email} *`}
                      type="email"
                      placeholder="e.g. rand@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label={`${t.quote.phone} *`}
                      placeholder="e.g. +971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                      required
                    />
                    <Input
                      label={t.quote.company}
                      placeholder="e.g. Dar Media"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      leftIcon={<Building className="w-4 h-4 text-slate-400" />}
                    />
                  </div>

                  <Textarea
                    label={`${t.quote.notes} *`}
                    placeholder="Provide details about your required locations, campaign dates, or general questions..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full mt-2 shadow-md"
                  >
                    {isSubmitting ? 'Sending Message...' : t.contact.submitBtn}
                  </Button>

                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium justify-center pt-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Average media inquiry response time: 4 business hours</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
