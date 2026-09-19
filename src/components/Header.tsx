import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { CONTACT } from '../data/systems';

export default function Header() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const close = () => { if (window.innerWidth >= 768 && openRef.current) setOpen(false); };
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = useCallback((id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const whatsappReady = CONTACT.whatsapp.startsWith('https://');

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-navy-900/95 backdrop-blur-sm border-b border-white/[0.06]"
      role="banner"
    >
      {/* Header uses its own container — tighter edge padding so brand/CTA sit close to edges */}
      <div className="max-w-wrap mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px]">

          {/* Brand — sits at the natural RTL start (right edge) */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group focus:outline-none rounded-lg py-1 min-w-0 shrink-0"
            aria-label="منصة الدكتور عيسى صبري المتولي — الرئيسية"
          >
            {/* Logo — bigger, clearly rounded */}
            <img
              src="/images/eissa-wordmark.png"
              alt="شعار د. عيسى صبري"
              className="h-10 w-auto object-contain shrink-0 rounded-xl"
              loading="eager"
              decoding="async"
            />
            {/* Full name on md+ */}
            <div className="hidden md:block leading-none min-w-0">
              <span className="block font-extrabold text-white text-[15px] leading-snug group-hover:text-brand transition-colors duration-150 whitespace-nowrap">
                منصة الدكتور عيسى صبري المتولي
              </span>
              <span className="block text-[12px] text-brand font-semibold mt-1 leading-none">
                ونادي المبرمجين
              </span>
            </div>
            {/* Compact on sm */}
            <div className="hidden sm:block md:hidden leading-none min-w-0">
              <span className="block font-extrabold text-white text-sm leading-snug group-hover:text-brand transition-colors duration-150">
                د. عيسى صبري
              </span>
              <span className="block text-[11px] text-brand font-semibold mt-0.5 leading-none">
                نادي المبرمجين
              </span>
            </div>
            {/* Logo only on xs */}
          </a>

          {/* Empty space fills the middle automatically via justify-between */}

          {/* Desktop CTA — sits at the natural RTL end (left edge) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollTo('selector')}
              className="text-sm font-medium text-white/60 hover:text-white px-4 py-2 rounded-lg
                hover:bg-white/5 transition-colors duration-150
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              اختار نظامك
            </button>
            {whatsappReady ? (
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-5 min-h-[42px] py-2.5"
              >
                <MessageCircle size={14} aria-hidden="true" />
                تواصل معنا
              </a>
            ) : (
              <button disabled className="btn-primary text-sm px-5 min-h-[42px] py-2.5 opacity-40 cursor-not-allowed">
                <MessageCircle size={14} aria-hidden="true" />
                تواصل معنا
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={toggle}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg
              text-white/60 hover:text-white hover:bg-white/5
              transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand shrink-0"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-200 ${open ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
          }`}
        aria-hidden={open ? undefined : true}
      >
        <div className="bg-navy-800 border-t border-white/[0.06] px-5 py-4 space-y-2">
          <button
            onClick={() => scrollTo('selector')}
            className="w-full text-right px-4 py-3 text-white/80 hover:text-white
              hover:bg-white/5 rounded-lg text-base font-medium min-h-[48px]
              transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            tabIndex={open ? 0 : -1}
          >
            اختار نظامك
          </button>
          {whatsappReady ? (
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
              tabIndex={open ? 0 : -1}
            >
              <MessageCircle size={15} aria-hidden="true" />
              تواصل معنا
            </a>
          ) : (
            <button disabled className="btn-primary w-full opacity-40 cursor-not-allowed" tabIndex={open ? 0 : -1}>
              <MessageCircle size={15} aria-hidden="true" />
              تواصل معنا
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
