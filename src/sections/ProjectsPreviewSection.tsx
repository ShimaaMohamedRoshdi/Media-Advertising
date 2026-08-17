import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { SectionHeader } from '../components/SectionHeader';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Modal } from '../components/ui/Modal';
import { useLanguage } from '../context/LanguageContext';
import type { Project } from '../types/project';
import { MapPin, ArrowRight, Info, Eye, ExternalLink } from 'lucide-react';

interface ProjectsPreviewSectionProps {
  limit?: number;
  showHeader?: boolean;
}

const ARABIC_PROJECTS_FALLBACKS: Array<{
  key: string;
  title: string;
  description: string;
  location: string;
  category: string;
  optional_details: string;
}> = [
  {
    key: 'apex',
    title: 'تدشين سيارة أبكس الكهربائية الفاخرة',
    description: 'حملة إعلانية رقمية متزامنة عبر شاشات بوليفارد شارع الشيخ زايد لإطلاق سيارة فاخرة جديدة.',
    location: 'بجانب فندق شانغريلا، شارع الشيخ زايد',
    category: 'حملات رقمية',
    optional_details: 'حققت 1.4 مليون مشاهدة مؤكدة خلال 7 أيام مع تنفيذ فيديو ثلاثي الأبعاد.',
  },
  {
    key: 'jewels',
    title: 'معرض مجوهرات التاج الملكي',
    description: 'تغطية إعلانية وشاشات LED مخصصة لمعرض التراث الفاخر على طول منطقة بوليفارد شارع الشيخ زايد.',
    location: 'قوس البوليفارد الرقمي الكبير، شارع الشيخ زايد',
    category: 'تغطية علامات تجارية',
    optional_details: 'دمج التفاعل المباشر عبر رمز QR مما حقق 45,000 استجابة مباشرة عبر الجوال.',
  },
  {
    key: 'horizon',
    title: 'إطلاق أبراج هورايزون السكنية',
    description: 'حملة عقارية استراتيجية تستهدف كبار المستثمرين والمقيمين على شارع الشيخ زايد.',
    location: 'لوحة فيستا المركز المالي',
    category: 'شاشات رقمية',
    optional_details: 'تغطية 100% لفترات الذروة الصباحية والمسائية لحركة المرور.',
  },
  {
    key: 'velocita',
    title: 'عرض ساعات فيلوسيتا ثلاثية الأبعاد (3D)',
    description: 'عرض خدعة بصرية ثلاثية الأبعاد جذب اهتمام المرور والمارة على طول ممر البوليفارد.',
    location: 'شاشة بوابة داون تاون التفاعلية',
    category: 'عرض ثلاثي الأبعاد 3D',
    optional_details: 'انتشار واسع عبر وسائل التواصل الاجتماعي مع أكثر من 3.2 مليون مشاهدة غير مدفوعة.',
  },
  {
    key: 'fintech',
    title: 'قمة التكنولوجيا المالية 2025',
    description: 'حملة رقمية متكررة تعرض قادة التكنولوجيا المالية العالمية عبر شارع الشيخ زايد.',
    location: 'بجانب فندق شانغريلا، شارع الشيخ زايد',
    category: 'حملات رقمية',
    optional_details: 'مزامنة حية لمؤشرات العملات والأسواق المالية.',
  },
  {
    key: 'fashion',
    title: 'أسبوع أزياء سولاريا الراقية',
    description: 'عروض منصات أزياء فائقة الدقة عمودية تهيمن على منطقة بوليفارد شارع الشيخ زايد.',
    location: 'شاشة بوابة داون تاون التفاعلية',
    category: 'تغطية علامات تجارية',
    optional_details: 'تناسق إضاءة LED محيطية ديناميكية مع ألوان مجموعة الأزياء المعروضة.',
  },
];

const getArabicProjectDetails = (proj: any, idx: number) => {
  const searchStr = `${proj.id || ''} ${proj.title || ''} ${proj.location || ''}`.toLowerCase();
  
  let match = ARABIC_PROJECTS_FALLBACKS.find((f) => searchStr.includes(f.key));
  if (!match) {
    match = ARABIC_PROJECTS_FALLBACKS[idx % ARABIC_PROJECTS_FALLBACKS.length];
  }
  return match;
};

export const ProjectsPreviewSection: React.FC<ProjectsPreviewSectionProps> = ({
  limit,
  showHeader = true,
}) => {
  const { projects, isLoading, error } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t, language } = useLanguage();

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    projects.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let list = projects;
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (limit) {
      list = list.slice(0, limit);
    }
    return list;
  }, [projects, selectedCategory, limit]);

  return (
    <section className="py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {showHeader && (
          <SectionHeader
            badgeText={t.projects.badge}
            title={t.projects.title}
            subtitle={t.projects.subtitle}
          />
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              {cat === 'All' ? t.projects.all : cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && <Spinner label="Loading dynamic project campaigns from database..." />}

        {/* Error State */}
        {error && (
          <div className="mt-8 text-center p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
            Failed to load projects: {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProjects.length === 0 && (
          <div className="mt-12 text-center p-12 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center gap-3">
            <Info className="w-10 h-10 text-slate-400" />
            <p className="text-base text-slate-700 font-medium">No campaigns found in this category.</p>
            <Button variant="ghost" size="sm" onClick={() => setSelectedCategory('All')}>
              Show All Campaigns
            </Button>
          </div>
        )}

        {/* Projects Cards Grid */}
        {!isLoading && !error && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredProjects.map((projectItem, idx) => {
              const project = projectItem as any;
              const arDetails = getArabicProjectDetails(project, idx);

              const projectTitle = language === 'ar' ? (project.title_ar || arDetails.title) : project.title;
              const projectDesc = language === 'ar' ? (project.description_ar || arDetails.description) : project.description;
              const projectCat = language === 'ar' ? (project.category_ar || arDetails.category) : project.category;
              const projectLoc = language === 'ar' ? (project.location_ar || arDetails.location) : project.location;

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  style={{ animationDelay: `${idx * 120}ms` }}
                  className="interactive-card cursor-pointer bg-white rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200 shadow-sm group animate-fade-in-up"
                >
                  {/* Image & Badge Overlay */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={project.image_url}
                      alt={projectTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent group-hover:opacity-80 transition-opacity" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="gold" size="sm">{projectCat}</Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-bold drop-shadow">
                      <span className="flex items-center gap-1 truncate max-w-[220px]">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{projectLoc}</span>
                      </span>
                      <span className="p-1.5 rounded-lg bg-white/90 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm transform group-hover:scale-110 shrink-0">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                      {projectTitle}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
                      {projectDesc}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:bg-amber-50/50 transition-colors">
                    <span>{t.projects.viewDetails}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {limit && (
          <div className="mt-12 flex justify-center">
            <Link to="/projects">
              <Button variant="secondary" size="lg" className="hover:scale-105 transition-transform" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t.projects.btnAll}
              </Button>
            </Link>
          </div>
        )}

        {/* Project Detail Modal */}
        <Modal
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
          title={
            selectedProject
              ? language === 'ar'
                ? getArabicProjectDetails(selectedProject, 0).title
                : selectedProject.title
              : 'Project Details'
          }
          maxWidth="lg"
        >
          {selectedProject && (
            <div className="flex flex-col gap-6 animate-scale-in">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <Badge variant="gold">
                  {language === 'ar'
                    ? getArabicProjectDetails(selectedProject, 0).category
                    : selectedProject.category}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {language === 'ar'
                      ? getArabicProjectDetails(selectedProject, 0).location
                      : selectedProject.location}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {language === 'ar' ? 'ملخص الحملة الإعلانية' : 'Campaign Summary'}
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {language === 'ar'
                    ? getArabicProjectDetails(selectedProject, 0).description
                    : selectedProject.description}
                </p>
              </div>

              {selectedProject.optional_details && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
                  <h4 className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                    {language === 'ar' ? 'أداء ونشاط الحملة' : 'Performance & Metrics'}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {language === 'ar'
                      ? getArabicProjectDetails(selectedProject, 0).optional_details
                      : selectedProject.optional_details}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="ghost" onClick={() => setSelectedProject(null)}>
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </Button>
                <Link to={`/request-quote?project=${encodeURIComponent(selectedProject.title)}`}>
                  <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {language === 'ar' ? 'طلب حملة مماثلة' : 'Request Similar Placement'}
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
