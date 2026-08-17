import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: language === 'ar' ? 'ما هي مواصفات وتفاصيل الشاشة الرئيسية بجانب فندق شانغريلا؟' : 'What are the dimensions and specs of the Shangri-La flagship billboard?',
      a: language === 'ar'
        ? 'تقع شاشتنا الرئيسية الرقمية الفاخرة مزدوجة الوجه مباشرة محاذية لفندق شانغريلا على شارع الشيخ زايد، بفتحة عرض 18m x 6m ودقة بث 4K Ultra HD تعمل بنسبة جاهزية 99.8%، وتصل المشاهدات لأكثر من 280,000 مشاهدة يومياً.'
        : 'Our flagship Shangri-La screen is a double-sided 4K Ultra HD digital display measuring 18m x 6m. Positioned directly beside Shangri-La Hotel on Sheikh Zayed Road, it captures 280,000+ daily executive and diplomatic impressions.',
    },
    {
      q: language === 'ar' ? 'كم يستغرق إطلاق وتفعيل الحملة الإعلانية على الشاشات؟' : 'How quickly can an advertising campaign launch across the network?',
      a: language === 'ar'
        ? 'بفضل التكنولوجيا البرمجية الرقمية المتطورة لدينا، يمكن مراجعة وتجهيز وبث المحتوى الإعلاني المعتمد خلال 4 ساعات عمل فقط من استلام الملفات المعتمدة.'
        : 'Thanks to our automated digital scheduling infrastructure, approved media content can go live across the Sheikh Zayed Road Boulevard Zone within 4 business hours.',
    },
    {
      q: language === 'ar' ? 'هل تتوفر عروض وصيغ الإعلانات ثلاثية الأبعاد (3D Anamorphic)؟' : 'Do you offer 3D Anamorphic optical illusion video rendering?',
      a: language === 'ar'
        ? 'نعم، نوفر خدمات كاملة لإنتاج وتنسيق الفيديوهات ثلاثية الأبعاد 3D التي تخلق خدعة بصرية مبهرة تجذب المشاة وتنتشر عبر منصات التواصل الاجتماعي.'
        : 'Yes, Aldar Media provides end-to-end 3D spatial video formatting and anamorphic rendering tailored specifically for street-level viewing angles on Sheikh Zayed Road.',
    },
    {
      q: language === 'ar' ? 'كيف يتم تتبع قياس عدد المشاهدات والتفاعل للحملة؟' : 'How are impression metrics and audience reach verified?',
      a: language === 'ar'
        ? 'نستخدم كاميرات وتحليلات استشعار حركة الكثافة المرورية بالذكاء الاصطناعي لتوفير تقارير مدققة وشاملة لعدد المركبات والجمهور المشاهد بعد نهاية كل حملة.'
        : 'We employ AI traffic-density modeling and audited mobility analytics to provide clients with post-campaign impression audits and traffic heatmaps.',
    },
    {
      q: language === 'ar' ? 'ما هي خيارات الحجز والمدد المتاحة للحملات الإعلانية؟' : 'What campaign duration options are available for booking?',
      a: language === 'ar'
        ? 'نوفر خيارات مرنة تبدأ من حزم الأسبوع الواحد، أسبوعين، الشهر الكامل، أو التغطيات السنوية الحصرية مع أسعار مخصصة لكل خدمة.'
        : 'We offer flexible booking models including 1-week launch bursts, 2-week campaigns, monthly takeovers, and multi-quarter long-term leases.',
    },
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badgeText={language === 'ar' ? 'الأسئلة الشائعة والاستفسارات' : 'COMMERCIAL & TECHNICAL FAQ'}
          title={language === 'ar' ? 'أسئلة شائعة حول الإعلانات والشبكة' : 'Frequently Asked Questions'}
          subtitle={language === 'ar' ? 'إجابات مباشرة حول المواصفات الفنية، مواعيد التشغيل، وكيفية حجز اللوحات على شارع الشيخ زايد.' : 'Everything you need to know about screen availability, 3D video support, and Sheikh Zayed Road placements.'}
        />

        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden shadow-xs ${
                  isOpen
                    ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/10'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 focus:outline-none"
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base font-extrabold">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-blue-700' : 'text-slate-400'}`} />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-500 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-blue-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium border-t border-blue-100/60 animate-scale-in">
                    <div className="flex items-start gap-2 pt-2">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{faq.a}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
