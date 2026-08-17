import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuotations } from '../hooks/useQuotations';
import { SectionHeader } from '../components/SectionHeader';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SERVICES_DATA } from '../data/initialServices';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Send, AlertCircle, ShieldCheck, Mail, Phone, User, Building, MapPin } from 'lucide-react';

export const QuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { submitQuotation } = useQuotations();
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_type: '',
    region: 'Sheikh Zayed Road Boulevard Zone',
    duration: '1 Month',
    budget: '50,000 - 100,000 AED',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto pre-fill service or location from URL query params
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const locationParam = searchParams.get('location');
    const projectParam = searchParams.get('project');

    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service_type: serviceParam }));
    } else if (locationParam) {
      setFormData((prev) => ({
        ...prev,
        service_type: 'Sheikh Zayed Boulevard Networks',
        message: `Inquiry specifically regarding placement at: ${locationParam}`,
      }));
    } else if (projectParam) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiry inspired by project campaign: ${projectParam}`,
      }));
    }
  }, [searchParams]);

  const serviceOptions = [
    ...SERVICES_DATA.map((s) => ({
      value: s.title,
      label: language === 'ar' && s.title_ar ? s.title_ar : s.title,
    })),
    {
      value: 'Custom Boulevard Takeover',
      label: language === 'ar' ? 'تغطية بوليفارد شارع الشيخ زايد مخصصة' : 'Custom Sheikh Zayed Boulevard Takeover',
    },
    {
      value: 'General Inquiry',
      label: language === 'ar' ? 'استفسار إعلامي عام' : 'General Media Inquiry',
    },
  ];

  const durationOptions = [
    { value: '1 Week', label: language === 'ar' ? 'أسبوع واحد' : '1 Week Burst' },
    { value: '2 Weeks', label: language === 'ar' ? 'أسبوعين' : '2 Weeks Campaign' },
    { value: '1 Month', label: language === 'ar' ? 'شهر واحد' : '1 Month Standard' },
    { value: '3 Months', label: '3 Months Quarter' },
    { value: '6+ Months', label: '6+ Months Long-term' },
  ];

  const budgetOptions = [
    { value: 'Under 25,000 AED', label: language === 'ar' ? 'أقل من 25,000 درهم' : 'Under 25,000 AED' },
    { value: '25,000 - 50,000 AED', label: language === 'ar' ? '25,000 - 50,000 درهم' : '25,000 - 50,000 AED' },
    { value: '50,000 - 100,000 AED', label: language === 'ar' ? '50,000 - 100,000 درهم' : '50,000 - 100,000 AED' },
    { value: '100,000+ AED', label: language === 'ar' ? 'أكثر من 100,000 درهم' : '100,000+ AED Premier' },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = language === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    }

    if (!formData.service_type) {
      newErrors.service_type = language === 'ar' ? 'يرجى اختيار الخدمة المطلوبة' : 'Please select a service or placement type';
    }

    if (!formData.message.trim()) {
      newErrors.message = language === 'ar' ? 'يرجى كتابة تفاصيل الحملة المطلوبة' : 'Please provide campaign details or requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const fullMessage = `[Region: ${formData.region}] | [Duration: ${formData.duration}] | [Budget: ${formData.budget}]\n\n${formData.message.trim()}`;

      await submitQuotation({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim() || null,
        service_type: formData.service_type,
        message: fullMessage,
      });

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_type: '',
        region: 'Sheikh Zayed Road Boulevard Zone',
        duration: '1 Month',
        budget: '50,000 - 100,000 AED',
        message: '',
      });
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit quotation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badgeText={t.quote.badge}
          title={t.quote.title}
          subtitle={t.quote.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          
          {/* Info Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6">
              <Badge variant="gold" size="sm" className="self-start">SHEIKH ZAYED ROAD ZONE</Badge>
              <h3 className="text-2xl font-black text-slate-900">{t.quote.whyTitle}</h3>

              <ul className="flex flex-col gap-4 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 shrink-0 mt-0.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span><strong className="text-slate-900 font-extrabold">{t.quote.why1Title}</strong> {t.quote.why1Desc}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span><strong className="text-slate-900 font-extrabold">{t.quote.why2Title}</strong> {t.quote.why2Desc}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-800 shrink-0 mt-0.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span><strong className="text-slate-900 font-extrabold">{t.quote.why3Title}</strong> {t.quote.why3Desc}</span>
                </li>
              </ul>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t.quote.privacyTitle}</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {t.quote.privacyDesc}
                </p>
              </div>
            </div>

            {/* Direct Contact Pill */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-3 shadow-sm">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t.quote.hotlineTitle}</span>
              <a href="tel:+971557060370" className="flex items-center gap-3 text-blue-900 font-black text-lg hover:underline">
                <Phone className="w-5 h-5" />
                <span>+971 55 706 0370</span>
              </a>
              <a href="mailto:algarousha@hotmail.com" className="flex items-center gap-3 text-slate-700 text-xs font-bold hover:text-blue-800 hover:underline">
                <Mail className="w-4 h-4 text-blue-700" />
                <span>algarousha@hotmail.com</span>
              </a>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md relative">
              
              {isSuccess ? (
                <div className="flex flex-col items-center text-center gap-6 py-12 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-extrabold text-slate-900">{t.quote.successTitle}</h3>
                    <p className="text-sm text-slate-600 max-w-md leading-relaxed font-medium">
                      {t.quote.successDesc}
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => setIsSuccess(false)}
                    className="mt-4"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-black text-slate-900">{t.quote.formTitle}</h3>
                    <p className="text-xs text-slate-500 font-medium">{t.quote.formSubtitle}</p>
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={`${t.quote.fullName} *`}
                      placeholder="e.g. Sarah Mansoor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      error={errors.name}
                      leftIcon={<User className="w-4 h-4" />}
                    />
                    <Input
                      label={`${t.quote.email} *`}
                      type="email"
                      placeholder="e.g. sarah@brand.ae"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                      leftIcon={<Mail className="w-4 h-4" />}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={`${t.quote.phone} *`}
                      placeholder="e.g. +971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      error={errors.phone}
                      leftIcon={<Phone className="w-4 h-4" />}
                    />
                    <Input
                      label={t.quote.company}
                      placeholder="e.g. Horizon Holdings"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      leftIcon={<Building className="w-4 h-4" />}
                    />
                  </div>

                  <Select
                    label={`${t.quote.serviceType} *`}
                    options={serviceOptions}
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    error={errors.service_type}
                    placeholder={language === 'ar' ? 'اختر الخدمة أو موقع الشاشة المطلوب...' : 'Select required service or screen placement...'}
                  />

                  {/* Additional Client Required Fields: Region, Duration, Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label={t.quote.region}
                      placeholder="e.g. Sheikh Zayed Road"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      leftIcon={<MapPin className="w-4 h-4" />}
                    />

                    <Select
                      label={t.quote.duration}
                      options={durationOptions}
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />

                    <Select
                      label={t.quote.budget}
                      options={budgetOptions}
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>

                  <Textarea
                    label={`${t.quote.notes} *`}
                    placeholder={language === 'ar' ? 'اكتب تواريخ إطلاق الحملة، الشاشات المطلوبة، أو أي ملاحظات وسوف نتواصل معك...' : 'Provide campaign launch dates, desired screen locations (e.g. Beside Shangri-La Hotel), video format, or special requests...'}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    error={errors.message}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full mt-2 shadow-md"
                  >
                    {isSubmitting ? (language === 'ar' ? 'جاري الحفظ في قاعدة البيانات...' : 'Saving to Database...') : t.quote.submitBtn}
                  </Button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
