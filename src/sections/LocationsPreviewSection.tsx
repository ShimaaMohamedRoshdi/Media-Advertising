import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocations } from '../hooks/useLocations';
import { SectionHeader } from '../components/SectionHeader';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Modal } from '../components/ui/Modal';
import { useLanguage } from '../context/LanguageContext';
import type { LocationItem } from '../types/location';
import { MapPin, ArrowRight, Eye, ShieldCheck, Cpu, ExternalLink, Tag } from 'lucide-react';

interface LocationsPreviewSectionProps {
  limit?: number;
  showHeader?: boolean;
}

const ARABIC_LOCATIONS_FALLBACKS: Array<{
  key: string;
  name: string;
  description: string;
  location_text: string;
  display_type: string;
  zone: string;
}> = [
  {
    key: 'shangri',
    name: 'شاشة ميجا الفاخرة - شانغريلا',
    description: 'لوحة رقمية فاخرة مزدوجة الوجه بجودة 4K تقع مباشرة محاذية لفندق شانغريلا على شارع الشيخ زايد، تستهدف كبار الشخصيات والزوار باتجاه وسط مدينة دبي.',
    location_text: 'بجانب فندق شانغريلا، شارع الشيخ زايد',
    display_type: 'شاشة رقمية LED بدقة 4K',
    zone: 'منطقة بوليفارد شارع الشيخ زايد',
  },
  {
    key: 'arch',
    name: 'قوس البوليفارد الرقمي الكبير',
    description: 'قوس LED منحني متطور يغطي المدخل الرئيسي لمنطقة بوليفارد شارع الشيخ زايد، يوفر زمن توقف ممتازا ورؤية ليلية واضحة.',
    location_text: 'قوس مدخل البوليفارد، شارع الشيخ زايد',
    display_type: 'قوس رقمي LED منحني',
    zone: 'منطقة بوليفارد شارع الشيخ زايد',
  },
  {
    key: 'financial',
    name: 'لوحة فيستا المركز المالي',
    description: 'شاشة LED فائقة العرض والتباين محاذية لمركز دبي المالي العالمي (DIFC) وتقاطع البوليفارد، تستهدف المستثمرين ورجال الأعمال.',
    location_text: 'تقاطع البوليفارد الشمالي، شارع الشيخ زايد',
    display_type: 'لوحة LED ضخمة الحجم',
    zone: 'منطقة بوليفارد شارع الشيخ زايد',
  },
  {
    key: 'gate',
    name: 'شاشة بوابة داون تاون التفاعلية',
    description: 'شاشة رقمية عمودية عالية التأثير تقع عند البوابة الرابطة بين شارع الشيخ زايد وممشى البوليفارد، مثالية لإطلاق السيارات الفاخرة والعقارات.',
    location_text: 'ساحة البوليفارد الجنوبية، شارع الشيخ زايد',
    display_type: 'شاشة رقمية عمودية DOOH',
    zone: 'منطقة بوليفارد شارع الشيخ زايد',
  },
];

const getArabicLocationDetails = (loc: any, idx: number) => {
  const searchStr = `${loc.id || ''} ${loc.name || ''} ${loc.location_text || ''}`.toLowerCase();
  
  let match = ARABIC_LOCATIONS_FALLBACKS.find((f) => searchStr.includes(f.key));
  if (!match) {
    match = ARABIC_LOCATIONS_FALLBACKS[idx % ARABIC_LOCATIONS_FALLBACKS.length];
  }
  return match;
};

export const LocationsPreviewSection: React.FC<LocationsPreviewSectionProps> = ({
  limit,
  showHeader = true,
}) => {
  const { locations, isLoading, error } = useLocations();
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const { t, language } = useLanguage();

  const displayedLocations = limit ? locations.slice(0, limit) : locations;

  return (
    <section className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {showHeader && (
          <SectionHeader
            badgeText={t.locations.badge}
            title={t.locations.title}
            subtitle={t.locations.subtitle}
          />
        )}

        {/* Anchor Landmark Notice */}
        <div className="mt-8 max-w-3xl mx-auto p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-700 shrink-0" />
            <div>
              <span className="font-extrabold text-slate-900 block">{t.hero.flagshipText}</span>
              <span className="text-slate-700 font-medium">
                {language === 'ar'
                  ? 'جميع الشاشات الـ 4 تعمل في أهم نقاط التكثيف المروري داخل منطقة بوليفارد شارع الشيخ زايد.'
                  : 'All 4 screens operate in high-density traffic nodes inside the Sheikh Zayed Road Boulevard Zone.'}
              </span>
            </div>
          </div>
          <Badge variant="gold" size="sm" className="shrink-0 self-start sm:self-auto">
            {language === 'ar' ? 'منطقة معتمدة' : 'VERIFIED ZONE'}
          </Badge>
        </div>

        {/* Loading State */}
        {isLoading && <Spinner label="Loading locations from database..." />}

        {/* Error State */}
        {error && (
          <div className="mt-8 text-center p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
            Failed to load locations: {error}
          </div>
        )}

        {/* Locations Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {displayedLocations.map((locItem, idx) => {
              const loc = locItem as any;
              const isShangriLa = loc.name.toLowerCase().includes('shangri-la') || loc.location_text.toLowerCase().includes('shangri-la');
              const isAvailable = loc.status === 'Available' || !loc.status;

              const arDetails = getArabicLocationDetails(loc, idx);

              const locName = language === 'ar' ? (loc.name_ar || arDetails.name) : loc.name;
              const locDesc = language === 'ar' ? (loc.description_ar || arDetails.description) : loc.description;
              const locText = language === 'ar' ? (loc.location_text_ar || arDetails.location_text) : loc.location_text;
              const locType = language === 'ar' ? (loc.display_type_ar || arDetails.display_type) : (loc.display_type || 'Digital LED Screen 4K');
              const locZone = language === 'ar' ? arDetails.zone : (loc.zone || 'Sheikh Zayed Road Boulevard Zone');

              return (
                <div
                  key={loc.id}
                  style={{ animationDelay: `${idx * 150}ms` }}
                  className={`interactive-card bg-white p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row gap-6 group shadow-sm animate-fade-in-up min-w-0 overflow-hidden ${
                    isShangriLa
                      ? 'border-blue-400 ring-2 ring-blue-500/20'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Location Image & Status Overlay */}
                  <div className="w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                    <img
                      src={loc.image_url}
                      alt={locName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <Badge variant={isAvailable ? 'emerald' : 'red'} size="sm">
                        {isAvailable ? t.locations.available : t.locations.booked}
                      </Badge>
                      {isShangriLa && (
                        <Badge variant="gold" size="sm">
                          {language === 'ar' ? 'الموقع الرئيسي' : 'FLAGSHIP'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-900 truncate">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-blue-700" />
                          <span className="truncate">{locText}</span>
                        </div>
                        {loc.dimensions && (
                          <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                            {loc.dimensions}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                        {locName}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                        {locDesc}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-1 truncate">
                        <Tag className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{locType}</span>
                      </div>
                    </div>

                    {/* Ultra-Sleek Mobile Responsive Action Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-3 border-t border-slate-100 gap-2.5">
                      <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 truncate">
                        <Cpu className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{locZone}</span>
                      </span>

                      {/* Side-by-side on grid or stacked perfectly */}
                      <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLocation(loc)}
                          rightIcon={<Eye className="w-3.5 h-3.5" />}
                          className="w-full sm:w-auto text-xs font-bold py-2 whitespace-nowrap justify-center"
                        >
                          {t.locations.specs}
                        </Button>
                        <Link to={`/request-quote?location=${encodeURIComponent(locName)}`} className="w-full sm:w-auto">
                          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />} className="w-full sm:w-auto text-xs font-bold py-2 whitespace-nowrap justify-center shadow-md">
                            {t.locations.getDetails}
                          </Button>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {limit && (
          <div className="mt-12 flex justify-center">
            <Link to="/locations">
              <Button variant="secondary" size="lg" className="hover:scale-105 transition-transform" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t.locations.btnAll}
              </Button>
            </Link>
          </div>
        )}

        {/* Location Specs Modal */}
        <Modal
          isOpen={Boolean(selectedLocation)}
          onClose={() => setSelectedLocation(null)}
          title={
            selectedLocation
              ? language === 'ar'
                ? getArabicLocationDetails(selectedLocation, 0).name
                : selectedLocation.name
              : 'Location Overview'
          }
          maxWidth="lg"
        >
          {selectedLocation && (
            <div className="flex flex-col gap-6 animate-scale-in">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedLocation.image_url}
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant={selectedLocation.status === 'Available' || !selectedLocation.status ? 'emerald' : 'red'}>
                    {selectedLocation.status === 'Available' || !selectedLocation.status ? t.locations.available : t.locations.booked}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
                  <MapPin className="w-4 h-4 text-blue-700" />
                  <span>
                    {language === 'ar'
                      ? getArabicLocationDetails(selectedLocation, 0).location_text
                      : selectedLocation.location_text}
                  </span>
                </div>
                {selectedLocation.map_url && (
                  <a
                    href={selectedLocation.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:underline bg-sky-50 px-3 py-1 rounded-lg border border-sky-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'عرض على خرائط Google' : 'View on Google Maps'}</span>
                  </a>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {language === 'ar' ? 'وصف الموقع الإعلاني' : 'Site Description'}
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {language === 'ar'
                    ? getArabicLocationDetails(selectedLocation, 0).description
                    : selectedLocation.description}
                </p>
              </div>

              {selectedLocation.specs && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{language === 'ar' ? 'المواصفات الفنية للشاشة' : 'Technical Display Specifications'}</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-mono font-medium">{selectedLocation.specs}</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="ghost" onClick={() => setSelectedLocation(null)}>
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
                <Link to={`/request-quote?location=${encodeURIComponent(selectedLocation.name)}`}>
                  <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {t.locations.reserve}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </section>
  );
};
