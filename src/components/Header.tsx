import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { CONTACT } from '../data/systems';

export default function Header() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);

  openRef.current = open;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && openRef.current) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const scrollTo = useCallback((id: string) => {
    setOpen(false);

    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, []);

  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const whatsappReady = CONTACT.whatsapp.startsWith('https://');

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-navy-900/95 backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10">
        <div className="flex h-[76px] items-center justify-between">
          {/* Brand */}
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              setOpen(false);

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            className="group flex min-w-0 shrink-0 items-center gap-3 rounded-xl py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="منصة الدكتور عيسى صبري المتولي — الرئيسية"
          >
            {/* Brand image */}
            <div className="flex h-[54px] w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-white">
            <img
              src="/images/eissa-wordmark.png"
              alt="شعار د. عيسى صبري"
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>

            {/* Brand text */}
            <div className="hidden min-w-0 sm:block">
             <span className="block whitespace-nowrap text-[15px] font-[800] leading-[1.35] text-white">
              منصة الدكتور عيسى صبري المتولي
            </span>

              <span className="mt-0.5 block whitespace-nowrap text-[15px] font-[800] leading-[1.3] text-brand">
              ونادي المبرمجين
            </span>
            </div>
          </a>

          {/* Desktop actions */}
          <nav
            className="hidden shrink-0 items-center gap-2 md:flex"
            aria-label="التنقل الرئيسي"
          >
            <button
              type="button"
              onClick={() => scrollTo('selector')}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              اختار نظامك
            </button>

            {whatsappReady ? (
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary min-h-[44px] px-5 text-sm"
              >
                <MessageCircle size={15} aria-hidden="true" />
                تواصل معنا
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="btn-primary min-h-[44px] cursor-not-allowed px-5 text-sm opacity-40"
              >
                <MessageCircle size={15} aria-hidden="true" />
                تواصل معنا
              </button>
            )}
          </nav>

          {/* Mobile menu */}
          <button
            type="button"
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white/70 transition-colors duration-200 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-200 md:hidden ${
          open ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={open ? undefined : true}
      >
        <div className="border-t border-white/[0.08] bg-navy-800 px-5 py-4">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => scrollTo('selector')}
              className="min-h-[48px] w-full rounded-xl px-4 py-3 text-right text-base font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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
              <button
                type="button"
                disabled
                className="btn-primary w-full cursor-not-allowed opacity-40"
                tabIndex={open ? 0 : -1}
              >
                <MessageCircle size={15} aria-hidden="true" />
                تواصل معنا
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}