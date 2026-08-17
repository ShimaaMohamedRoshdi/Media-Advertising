export interface ServiceItem {
  id: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  iconName: string;
  features: string[];
  features_ar?: string[];
  recommendedFor: string;
  recommendedFor_ar?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'dooh-networks',
    title: 'Digital Out-of-Home (DOOH)',
    title_ar: 'شبكات الشاشات الرقمية (DOOH)',
    description: 'High-definition Ultra 4K dynamic digital billboard networks strategically positioned along high-volume arterial corridors.',
    description_ar: 'شبكات شاشات إعلانية رقمية ديناميكية بدقة 4K فائقة الوضوح، موزعة استراتيجياً في أعلى الشرايين المرورية كفاءة.',
    iconName: 'Tv',
    features: [
      'Dayparting & dynamic content scheduling',
      'High contrast HDR LED technology',
      'Real-time impression tracking & analytics',
      'Programmatic ad buying integration'
    ],
    features_ar: [
      'جدولة ديناميكية للمحتوى حسب أوقات اليوم',
      'تكنولوجيا LED ذات تباين عالي HDR',
      'تحليلات وتتبع المشاهدات في الوقت الفعلي',
      'تكامل مع أنظمة الشراء البرمجي للإعلانات'
    ],
    recommendedFor: 'Automotive, Luxury Brands, Global Enterprises',
    recommendedFor_ar: 'قطاع السيارات، العلامات الفاخرة، الشركات العالمية'
  },
  {
    id: 'boulevard-billboards',
    title: 'Sheikh Zayed Boulevard Networks',
    title_ar: 'شبكة بوليفارد شارع الشيخ زايد',
    description: 'Exclusive billboard presence within the Sheikh Zayed Road Boulevard Zone, capturing premium executive and diplomatic traffic.',
    description_ar: 'تأجير وتشغيل حصري للوحات الإعلانية في منطقة بوليفارد شارع الشيخ زايد، لتغطية الحركة المرورية لكبار الشخصيات ورجال الأعمال.',
    iconName: 'Building2',
    features: [
      'Unobstructed long-distance sightlines',
      'Prime location beside Shangri-La Hotel',
      '24/7 high-intensity illumination',
      'Zero visual clutter corridor dominance'
    ],
    features_ar: [
      'خطوط رؤية ممتدة بدون أي عوائق',
      'موقع استراتيجي رائد بجانب فندق شانغريلا',
      'إضاءة عالية الكثافة على مدار 24 ساعة',
      'هيمنة بصرية كاملة على المحور الإعلاني'
    ],
    recommendedFor: 'Real Estate Developers, Banks, Sovereign Funds',
    recommendedFor_ar: 'المطورين العقاريين، البنوك، الصناديق السيادية'
  },
  {
    id: '3d-anamorphic',
    title: '3D Anamorphic Displays',
    title_ar: 'شاشات العرض ثلاثية الأبعاد (3D)',
    description: 'Mind-bending 3D optical illusions that turn digital screens into viral landmarks that captivate passersby and social media globally.',
    description_ar: 'خداع بصري ثلاثي الأبعاد مبهر يحول الشاشات الرقمية إلى معالم مبهرة تجذب المشاة وتنتشر عبر وسائل التواصل الاجتماعي عالمياً.',
    iconName: 'Sparkles',
    features: [
      'Custom 3D content creation & spatial rendering',
      'Hyper-realistic depth projection',
      'Guaranteed viral earned-media amplification',
      'Calibrated for optimal street-level viewing angles'
    ],
    features_ar: [
      'إنتاج محتوى ثلاثي الأبعاد ومعالجة فراغية',
      'إسقاط عمق واقعي للغاية',
      'تفاعل واسع وانتشار عبر شبكات التواصل',
      'معايرة مخصصة لأفضل زوايا رؤية من الشارع'
    ],
    recommendedFor: 'Product Launches, Blockbuster Releases, Luxury Tech',
    recommendedFor_ar: 'إطلاق المنتجات الجديدة، الأجهزة الحديثة، الترفيه'
  },
  {
    id: 'brand-activations',
    title: 'Strategic Brand Takeovers',
    title_ar: 'حملات الهيمنة وتغطية العلامات التجارية',
    description: 'Synchronized multi-location network takeovers dominating all 4 Sheikh Zayed Road Boulevard Zone screens simultaneously.',
    description_ar: 'حملات تغطية متزامنة تهيمن على شاشات منطقة بوليفارد شارع الشيخ زايد الـ 4 في وقت واحد وبشكل متناسق.',
    iconName: 'Zap',
    features: [
      'Simultaneous multi-screen sync',
      'Interactive QR & mobile landing bridge',
      'Ambient LED lighting sync',
      'Comprehensive post-campaign impact audit'
    ],
    features_ar: [
      'مزامنة شاشات متعددة في نفس اللحظة',
      'ربط تفاعلي عبر رموز QR وصفحات الجوال',
      'تناسق إضاءة LED المحيطية',
      'تقرير شامل لمدى تأثير الحملة بعد الانتهاء'
    ],
    recommendedFor: 'Major Events, IPOs, Product Debuts',
    recommendedFor_ar: 'الفعاليات الكبرى، الطروحات الأولية، إطلاق العلامات'
  },
  {
    id: 'led-engineering',
    title: 'Custom Outdoor LED Solutions',
    title_ar: 'تركيب وصيانة الشاشات الرقمية',
    description: 'End-to-end bespoke outdoor LED architectural integrations tailored for custom commercial facades and high-impact structures.',
    description_ar: 'خدمات هندسية متكاملة لتركيب وصيانة الشاشات الإعلانية والهياكل المعمارية الخارجية المخصصة للمباني التجارية.',
    iconName: 'Layers',
    features: [
      'Weather-sealed IP67 high durability',
      'Energy-efficient green LED modules',
      'Custom curvature & architectural fitting',
      'Full lifecycle maintenance & monitoring'
    ],
    features_ar: [
      'مقاومة ممتازة للعوامل الجوية بمعيار IP67',
      'وحدات LED صديقة للبيئة وموفرة للطاقة',
      'تصاميم منحنية ومطابقة للهياكل المعمارية',
      'صيانة ومراقبة جودة شاملة على مدار الساعة'
    ],
    recommendedFor: 'Commercial Towers, Shopping Destinations, Corporate Hubs',
    recommendedFor_ar: 'الأبراج التجارية، مراكز التسوق، المقرات الرئيسية'
  },
  {
    id: 'analytics-consulting',
    title: 'Audience Analytics & Strategy',
    title_ar: 'تخطيط الحملات وتحليل الجمهور',
    description: 'Data-driven outdoor media planning utilizing vehicle counting AI, mobility heatmaps, and precise impression auditing.',
    description_ar: 'تخطيط استراتيجي للإعلانات الخارجية يعتمد على الذكاء الاصطناعي لحساب كثافة المركبات، الخرائط الحرارية، وتحليل الجمهور.',
    iconName: 'BarChart3',
    features: [
      'Vehicle density & velocity heatmapping',
      'Demographic & traffic flow modeling',
      'Audience dwell time optimization',
      'ROI & verified conversion tracking'
    ],
    features_ar: [
      'خرائط حرارية لسرعة وكثافة حركة المركبات',
      'تحليل أنماط تدفق حركة المرور والجمهور',
      'تحسين زمن بقاء وتوقف المشاهدين',
      'تتبع دقيق لمعدل العائد على الاستثمار ROI'
    ],
    recommendedFor: 'Media Planning Agencies, CMOs, Growth Strategists',
    recommendedFor_ar: 'وكالات الإعلان، مدراء التسوق، مسؤولي النمو'
  }
];
