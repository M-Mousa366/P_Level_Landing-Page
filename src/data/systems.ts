export type SystemId = 'center' | 'online-live' | 'books' | 'club';

export interface System {
  id: SystemId;
  fit: string;
  whyItFits: string;
  title: string;
  tagline: string;
  suitableIf: string[];
  includes: string[];
  pricingNote: string;
  details: string[];
  imageSrc: string;
  imageAlt: string;
  whatsappMessage: string;
  accent: {
    bg: string;
    border: string;
    text: string;
    iconBg: string;
    dot: string;
    tag: string;
  };
}

const WHATSAPP_NUMBER: string = '201095304313';

export function buildWhatsAppUrl(message: string): string {
  if (WHATSAPP_NUMBER === 'WHATSAPP_NUMBER_PLACEHOLDER') {
    return 'WHATSAPP_LINK_PLACEHOLDER';
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const systems: System[] = [
  {
    id: 'center',
    title: 'الحضور في السنتر',
    fit: 'بحب الحضور والتفاعل',
    whyItFits:
      'في السنتر بتحضر الحصة مع المدرس مباشرةً، تسأل وسط الشرح، وتحل التطبيقات في نفس الوقت.',
    tagline: 'شرح مباشر وجهًا لوجه مع المدرس والزملاء داخل السنتر.',
    suitableIf: [
      'بتستفيد لما تسأل المدرس في الحصة مباشرةً',
      'بتحب تحل التمارين مع الشرح مش لوحدك',
      'بتفضل جو السنتر وحضور الزملاء',
    ],
    includes: [
      'شرح الدرس بالكامل',
      'حل تمارين وتطبيقات أثناء الحصة',
      'أسئلة واستفسارات مع المدرس',
      'متابعة داخل السنتر',
    ],
    details: [
      'المواعيد والأماكن بتختلف حسب السنتر — تواصل للاستفسار عن المتاح في منطقتك',
      'الحضور بيكون في مجموعات صغيرة عشان الاستفادة أكتر',
      'تقدر تتابع في أكتر من نظام في نفس الوقت لو احتجت',
    ],
    pricingNote: 'السعر بيختلف حسب السنتر — تواصل للاستفسار',
    whatsappMessage:
      'السلام عليكم، أنا مهتم بنظام الحضور في السنتر لمادة البرمجة وعلوم الحاسب. ممكن تعرفني بالتفاصيل والمواعيد المتاحة؟',
    imageSrc: '/images/center/classroom-session.svg',
    imageAlt: 'طالب يحضر حصة في السنتر مع المدرس',
    accent: {
      bg: 'bg-sys1-bg',
      border: 'border-sys1-border',
      text: 'text-sys1-text',
      iconBg: 'bg-sys1-icon',
      dot: 'bg-sys1-dot',
      tag: 'text-sys1-text bg-sys1-bg border-sys1-border',
    },
  },

  {
    id: 'online-live',
    title: 'Online Live',
    fit: 'عايز أدرس من البيت',
    whyItFits:
      'Online Live بيوصلك الشرح المباشر من البيت عبر Zoom أو Google Meet، مع إمكانية السؤال أثناء الحصة.',
    tagline: 'حصص مباشرة أونلاين — نفس إحساس السنتر بس من بيتك.',
    suitableIf: [
      'مش قادر تحضر السنتر وعايز شرح مباشر',
      'بتحب تسأل وتتفاعل في الحصة',
      'بتفضل تدرس من البيت في موعد محدد',
    ],
    includes: [
      'شرح الدرس بالكامل أونلاين',
      'أسئلة وإجابات مباشرة أثناء الشرح',
      'حل بعض التمارين مع المدرس',
      'الحصص عبر Zoom أو Google Meet',
    ],
    details: [
      'محتاج إنترنت مستقر وكاميرا أو ميكروفون للمشاركة',
      'بيتبعتلك رابط الحصة قبل الموعد مباشرةً',
      'تقدر تحضر من أي مكان طول ما عندك اتصال كويس',
    ],
    pricingNote: 'للاستفسار عن تكلفة الاشتراك',
    whatsappMessage:
      'السلام عليكم، أنا مهتم بنظام Online Live لمادة البرمجة وعلوم الحاسب. ممكن تعرفني بتفاصيل الاشتراك والمواعيد؟',
    imageSrc: '/images/online/home-live-session.svg',
    imageAlt: 'طالب يحضر حصة أونلاين من البيت',
    accent: {
      bg: 'bg-sys2-bg',
      border: 'border-sys2-border',
      text: 'text-sys2-text',
      iconBg: 'bg-sys2-icon',
      dot: 'bg-sys2-dot',
      tag: 'text-sys2-text bg-sys2-bg border-sys2-border',
    },
  },

  {
    id: 'books',
    title: 'كتب شيخ البرمجة',
    fit: 'بحب أذاكر بطريقتي',
    whyItFits:
      'الحزمة بتديلك الشرح والتدريبات والاختبارات في كتب جاهزة — تذاكر في أي وقت وبالسرعة اللي تناسبك.',
    tagline: 'حزمة 3 كتب: شرح المنهج، تدريبات محلولة، وواجبات للتقييم.',
    suitableIf: [
      'بتفضل تذاكر بوقتك من غير مواعيد ثابتة',
      'بتحتاج مرجع واضح تذاكر منه وترجع ليه',
      'بتحب تحل تدريبات وتعرف مستواك بنفسك',
    ],
    includes: [
      'كتاب الشرح — المنهج بالكامل بطريقة منظمة',
      'كتاب التدريبات المحلولة — تدريبات الكتاب المدرسي وتدريبات إضافية',
      'كتاب الواجبات والاختبارات — عشان تختبر نفسك',
    ],
    details: [
      'الحزمة بتشتريها مرة واحدة من غير اشتراك شهري',
      'الكتب مطبوعة — تواصل للاستفسار عن طريقة الاستلام أو التوصيل',
      'تقدر تستخدم الكتب بجانب أي نظام تاني كمرجع إضافي',
    ],
    pricingNote: 'للاستفسار عن السعر وطريقة الحصول على الحزمة',
    whatsappMessage:
      'السلام عليكم، أنا مهتم بحزمة كتب شيخ البرمجة لمادة البرمجة وعلوم الحاسب. ممكن تعرفني بالسعر وطريقة الحصول على الحزمة؟',
    imageSrc: '/images/books/programming-books-bundle.svg',
    imageAlt: 'حزمة كتب شيخ البرمجة الثلاثة',
    accent: {
      bg: 'bg-sys3-bg',
      border: 'border-sys3-border',
      text: 'text-sys3-text',
      iconBg: 'bg-sys3-icon',
      dot: 'bg-sys3-dot',
      tag: 'text-sys3-text bg-sys3-bg border-sys3-border',
    },
  },

  {
    id: 'club',
    title: 'نادي المبرمجين',
    fit: 'محتاج متابعة مستمرة',
    whyItFits:
      'نادي المبرمجين بيتابع معاك خطوة بخطوة — بترفع واجباتك وبيوصلك التصحيح والملاحظات خلال 24 ساعة، وفيه اختبارات دورية تعرف منها مستواك.',
    tagline: 'منصة شاملة للشرح والتدريب والمتابعة — كل حاجة في مكان واحد.',
    suitableIf: [
      'محتاج حد يتابع معاك ويصحح واجباتك بانتظام',
      'بتستفيد من الاختبارات الدورية عشان تعرف وصلت فين',
      'بتحب يكون عندك محتوى ونظام واجبات في مكان واحد',
    ],
    includes: [
      'فيديوهات شرح كاملة + E-book',
      'رفع الواجبات وتصحيحها مع ملاحظات خلال 24 ساعة',
      'فيديوهات لحل الواجبات',
      'اختبارات دورية و Challenges',
    ],
    details: [
      'خطط الاشتراك: شهري، ترم (4 شهور)، أو سنة دراسية كاملة',
      'بعد التفعيل بتدخل المنصة وتلاقي كل المحتوى منظم وجاهز',
      'الواجبات بتترفع على المنصة وبيوصلك التصحيح والملاحظات خلال 24 ساعة',
    ],
    pricingNote: 'للاستفسار عن السعر وتفاصيل الاشتراك',
    whatsappMessage:
      'السلام عليكم، أنا مهتم بالاشتراك في نادي المبرمجين لمادة البرمجة وعلوم الحاسب. ممكن تعرفني بالأسعار وخطط الاشتراك المتاحة؟',
    imageSrc: '/images/platform/progclub.png',
    imageAlt: 'منصة نادي المبرمجين — واجبات وفيديوهات وتقدم الطالب',
    accent: {
      bg: 'bg-sys4-bg',
      border: 'border-sys4-border',
      text: 'text-sys4-text',
      iconBg: 'bg-sys4-icon',
      dot: 'bg-sys4-dot',
      tag: 'text-sys4-text bg-sys4-bg border-sys4-border',
    },
  },
];

export const CONTACT = {
  whatsapp: 'https://wa.me/201095304313',
  phone: 'PHONE_NUMBER_PLACEHOLDER',
  email: 'EMAIL_PLACEHOLDER',
  facebook: 'FACEBOOK_LINK_PLACEHOLDER',
  youtube: 'YOUTUBE_LINK_PLACEHOLDER',
};

export const HASH_TO_ID: Record<string, SystemId> = {
  center: 'center',
  online: 'online-live',
  books: 'books',
  platform: 'club',
};

export const ID_TO_HASH: Record<SystemId, string> = {
  'center': 'center',
  'online-live': 'online',
  'books': 'books',
  'club': 'platform',
};

export function hashToSystemId(hash: string): SystemId | null {
  const slug = hash.replace(/^#/, '').toLowerCase().trim();
  return HASH_TO_ID[slug] ?? null;
}

export const GENERAL_WHATSAPP_MESSAGE =
  'السلام عليكم، عايز أستفسر عن أنظمة تعلم البرمجة وعلوم الحاسب. ممكن تساعدني أختار الأنسب ليا؟';
