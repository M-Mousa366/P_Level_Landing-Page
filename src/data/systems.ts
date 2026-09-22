export type SystemId =
  | 'center'
  | 'online-live'
  | 'books'
  | 'club';

export interface System {
  id: SystemId;
  title: string;
  tagline: string;
  imageAlt: string;

  accent: {
    bg: string;
    border: string;
    text: string;
    iconBg: string;
    dot: string;
  };

  suitableIf: string[];
  includes: string[];
  details: string[];

  whatsappMessage: string;

  cta: {
    bookingUrl?: string;
    bookingLabel?: string;
    whatsappLabel: string;
  };
}

export const WHATSAPP_NUMBER = '201095304313';

export function buildWhatsAppUrl(message: string): string {
  if (message === 'WHATSAPP_LINK_PLACEHOLDER') {
    return 'WHATSAPP_LINK_PLACEHOLDER';
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const BOOKING_URL = 'https://tasabuq.com/programmingbooking/';

export const systems: System[] = [
  {
  id: 'center',
  title: 'الحضور في السنتر',
  tagline:
    'شرح مباشر وجهًا لوجه مع د/ عيسى صبري والزملاء، مع فرصة للسؤال والمناقشة والتطبيق أثناء الحصة، ومتابعة مستمرة أثناء الدراسة.',
  imageAlt: 'الحضور في السنتر',
  accent: {
    bg: 'bg-sys1-bg',
    border: 'border-sys1-border',
    text: 'text-sys1-text',
    iconBg: 'bg-sys1-icon',
    dot: 'bg-sys1-dot',
  },
  suitableIf: [
    'بتفضل الشرح المباشر والتفاعل مع الدكتور والزملاء.',
    'بتحب تسأل وتناقش أثناء الحصة بدل ما تذاكر لوحدك.',
    'محتاج متابعة وتشجيع يساعدوك تلتزم بالمذاكرة والتدريب.',
  ],
  includes: [
    'شرح المنهج خطوة بخطوة داخل الحصة.',
    'تطبيق عملي وحل تمارين أثناء الشرح.',
    'فرصة للسؤال والمناقشة مع الدكتور.',
    'متابعة لمستواك وتقدمك أثناء الدراسة.',
  ],
  details: [
    'الشرح متاح لطلاب البكالوريا العربي واللغات.',
    'الحضور متاح في السناتر أو في مقر شركة تسابق.',
    'المواعيد والأماكن بتختلف حسب المجموعة والمكان المتاح.',
    'تقدر تجمع بين الحضور في السنتر وأي طريقة دراسة تانية حسب احتياجاتك.',
  ],
  whatsappMessage:
    'مرحبا اريد الاستفسار عن نظام الحضور في السنتر لمادة البرمجة مع د/عيسى صبري.',
  cta: {
    bookingUrl: BOOKING_URL,
    bookingLabel: 'احجز مكانك',
    whatsappLabel: 'استفسر عبر واتساب',
  },

  },

{
  id: 'online-live',
  title: 'Online Live',
  tagline:
    'شرح مباشر أونلاين مع د/ عيسى صبري، مع فرصة للسؤال والمناقشة والتطبيق أثناء الحصة، ومتابعة مستمرة أثناء الدراسة.',
  imageAlt: 'نظام Online Live',
  accent: {
    bg: 'bg-sys2-bg',
    border: 'border-sys2-border',
    text: 'text-sys2-text',
    iconBg: 'bg-sys2-icon',
    dot: 'bg-sys2-dot',
  },
  suitableIf: [
    'بتفضل الدراسة من البيت بدل الذهاب للسنتر.',
    'محتاج شرح مباشر وتفاعل مع الدكتور بدون حضور فعلي.',
    'عندك قدرة على الالتزام بموعد الحصة ومتابعة الشرح أونلاين.',
  ],
  includes: [
    'شرح مباشر للمنهج مع الدكتور.',
    'إمكانية السؤال والمناقشة أثناء الحصة.',
    'تطبيق وحل تمارين مع الدكتور أثناء الشرح.',
    'حضور المحاضرات المباشرة أونلاين من خلال Zoom أو Google Meet أو منصة نادي المبرمجين.',
  ],
  details: [
    'الشرح متاح لطلاب البكالوريا العربي واللغات.',
    'محتاج اتصال إنترنت مستقر لحضور المحاضرات بشكل جيد.',
    'المحاضرات بتكون Live في مواعيد محددة مسبقًا حسب المجموعة.',
    'تقدر تجمع بين Online Live وأي طريقة دراسة تانية حسب احتياجاتك.',
  ],
  whatsappMessage:
    'مرحبا اريد الاستفسار عن نظام الـOnline Live لمادة البرمجة مع د/عيسى صبري.',
  cta: {
    bookingUrl: BOOKING_URL,
    bookingLabel: 'احجز مكانك',
    whatsappLabel: 'استفسر عبر واتساب',
  },
},

  {
    id: 'books',
    title: 'كتب شيخ البرمجة',
    tagline:
      'كتب مطبوعة من إعداد د/ عيسى صبري، تجمع شرح المنهج والتمارين المحلولة والواجبات والاختبارات، وتقدر تستخدمها مع أي طريقة دراسة أو تذاكر وتحل منها بشكل مستقل.',
    imageAlt: 'كتب شيخ البرمجة',
    accent: {
      bg: 'bg-sys3-bg',
      border: 'border-sys3-border',
      text: 'text-sys3-text',
      iconBg: 'bg-sys3-icon',
      dot: 'bg-sys3-dot',
    },
    suitableIf: [
      'عايز يكون معاك الكتاب مطبوع بدل الاعتماد على الـPDF.',
      'مشترك في السنتر أو Online Live أو نادي المبرمجين وعايز مصدر إضافي للمذاكرة والتدريب.',
      'مش مشترك في أي طريقة دراسة وعايز تذاكر وتحل من كتب شيخ البرمجة بشكل مستقل.',
    ],
    includes: [
      'كتب مطبوعة لشرح المنهج بطريقة منظمة.',
      'تمارين محلولة تشمل تمارين الكتاب المدرسي وكتب شيخ البرمجة.',
      'واجبات واختبارات للتدريب والمراجعة.',
      'مصدر تقدر ترجعله أثناء المذاكرة وتحل منه في أي وقت.',
    ],
    details: [
      'الكتب متوفرة بنسختين: عربي ولغات، حسب نظام الدراسة.',
      'الكتب مطبوعة، وممكن استخدامها بجانب أي طريقة دراسة تانية.',
      'مناسبة لطلاب د/ عيسى صبري ولأي طالب يرغب في المذاكرة والتدريب من خلالها.',
      'تواصل مع الإدارة لمعرفة تفاصيل شراء الكتب والاستلام أو التوصيل.',
    ],
    whatsappMessage:
     'مرحبا اريد الاستفسار عن كتب شيخ البرمجة لـ د/عيسى صبري.',
    cta: {
      whatsappLabel: 'استفسر عن الكتب عبر واتساب',
    },
  },

  {
    id: 'club',
    title: 'نادي المبرمجين',
    tagline:
      'منصة تعليمية أونلاين لطلاب البكالوريا، بتوفر شرح المنهج من خلال الفيديوهات والتمارين والواجبات، مع التصحيح والمتابعة المستمرة.',
    imageAlt: 'منصة نادي المبرمجين',
    accent: {
      bg: 'bg-sys4-bg',
      border: 'border-sys4-border',
      text: 'text-sys4-text',
      iconBg: 'bg-sys4-icon',
      dot: 'bg-sys4-dot',
    },
    suitableIf: [
      'بتحب تذاكر من البيت وفي الوقت المناسب ليك.',
      'محتاج متابعة وتصحيح للواجبات بدل المذاكرة بشكل منفرد.',
      'بتحب التدريب المستمر والاختبارات والتحديات اللي تساعدك تطور مستواك.',
    ],
    includes: [
      'فيديوهات شرح للمنهج تقدر تشوفها في الوقت المناسب ليك.',
      'كتاب إلكتروني وتمارين للتدريب والتطبيق.',
      'رفع الواجبات على المنصة والحصول على التصحيح خلال 24 ساعة.',
      'فيديوهات لحل الواجبات بعد التصحيح.',
      'اختبارات مفاجئة وتحديات وأنشطة تساعدك على الاستمرار والتدريب.',
    ],
    details: [
      'المنصة متاحة لطلاب البكالوريا العربي واللغات، مع محتوى مناسب لكل نظام.',
      'الاشتراك متاح شهريًا، أو ترم لمدة 4 شهور، أو سنة دراسية كاملة.',
      'المحتوى والواجبات والتدريبات متاحة من خلال منصة نادي المبرمجين.',
      'تقدر تتابع المحتوى في الوقت المناسب ليك مع الالتزام بالواجبات والتدريب.',
    ],
    whatsappMessage:
      'مرحبا اريد الاستفسار عن نظام منصة د/عيسى صبري ونادي المبرمجين.',
    cta: {
      bookingUrl: BOOKING_URL,
      bookingLabel: 'احجز مكانك',
      whatsappLabel: 'استفسر عبر واتساب',
    },
  },
];

export const CONTACT = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
};

export const ID_TO_HASH: Record<SystemId, string> = {
  center: 'center',
  'online-live': 'online',
  books: 'books',
  club: 'platform',
};

export function hashToSystemId(hash: string): SystemId | null {
  const normalized = hash.replace(/^#/, '').toLowerCase();

  const entry = (
    Object.entries(ID_TO_HASH) as [SystemId, string][]
  ).find(([, value]) => value === normalized);

  return entry ? entry[0] : null;
}