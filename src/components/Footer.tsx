import { MessageCircle } from 'lucide-react';
import type { System } from '../data/systems';
import { buildWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from '../data/systems';

interface Props {
  hasPick: boolean;
  pickedSys: System | null;
}

export default function Footer({ hasPick, pickedSys }: Props) {
  const year = new Date().getFullYear();
  const bookingUrl = pickedSys
    ? buildWhatsAppUrl(pickedSys.whatsappMessage)
    : buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE);
  const isConfigured = bookingUrl !== 'WHATSAPP_LINK_PLACEHOLDER';

  return (
    <footer className="bg-navy-900" role="contentinfo" aria-label="تذييل الصفحة">

      {/* CTA section */}
      <div className="wrap pt-14 sm:pt-16 pb-12 sm:pb-14 text-center border-b border-white/[0.06]">

        <div className="inline-flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
          <span className="label">ابدأ دلوقتي</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
          {hasPick
            ? `جاهز تبدأ مع ${pickedSys?.title ?? 'النظام'}؟`
            : 'محتاج مساعدة في الاختيار؟'}
        </h2>

        <p className="text-base text-white/50 font-normal leading-relaxed mb-8 max-w-xs mx-auto">
          {hasPick
            ? 'تواصل مع فريق الإدارة للحجز أو الاستفسار.'
            : 'تواصل مع فريق الإدارة — هيساعدوك تختار الأنسب ليك.'}
        </p>

        <div className="flex flex-col items-center gap-2">
          {isConfigured ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-10 w-full sm:w-auto text-base"
              aria-label={hasPick ? `تواصل للحجز في ${pickedSys?.title}` : 'تواصل مع الإدارة'}
            >
              <MessageCircle size={17} aria-hidden="true" />
              {hasPick ? 'تواصل للحجز' : 'تواصل مع الإدارة'}
            </a>
          ) : (
            <button disabled className="btn-primary px-10 w-full sm:w-auto text-base opacity-40 cursor-not-allowed">
              <MessageCircle size={17} aria-hidden="true" />
              {hasPick ? 'تواصل للحجز' : 'تواصل مع الإدارة'}
            </button>
          )}
          <p className="text-xs text-white/20 font-normal">
            {isConfigured ? 'هيفتح واتساب مباشرةً' : 'سيتم تفعيل واتساب قريباً'}
          </p>
        </div>
      </div>

      {/* Brand bar */}
      <div className="wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/images/eissa-wordmark.png"
            alt="شعار د. عيسى صبري"
            className="h-7 w-auto object-contain shrink-0 rounded-md"
            loading="lazy"
            decoding="async"
          />
          <div className="leading-none">
            <p className="text-white/80 text-sm font-medium leading-tight">
              منصة الدكتور عيسى صبري المتولي
            </p>
            <p className="text-brand/70 text-xs mt-0.5">نادي المبرمجين</p>
          </div>
        </div>
        <p className="text-white/20 text-xs">&copy; {year} جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}
