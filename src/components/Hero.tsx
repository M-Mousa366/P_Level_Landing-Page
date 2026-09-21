import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      className="relative overflow-hidden bg-navy-900 pt-[74px]"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-32 -top-28 h-[440px] w-[440px] rounded-full bg-brand/[0.065] blur-3xl" />

        <div className="absolute -left-44 bottom-[-120px] h-[430px] w-[430px] rounded-full bg-navy-500/[0.11] blur-3xl" />

        <div className="absolute left-1/2 top-[22%] h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-white/[0.012] blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="wrap relative z-10">
        <div className="mx-auto max-w-[850px] px-4 pb-20 pt-20 text-center sm:px-6 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
          <div className="mb-7 inline-flex items-center rounded-full border border-brand/20 bg-brand/[0.055] px-4 py-2">
            <span className="text-[13px] font-[700] tracking-wide text-brand sm:text-sm">
              طلاب البكالوريا (عربي - لغات)
            </span>
          </div>

          <h1
            id="hero-heading"
            className="mx-auto max-w-[800px] text-[2.35rem] font-[700] leading-[1.28] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]"
          >
            اختار طريقة الدراسة
            <span className="mt-2 block text-brand">
              المناسبة ليك.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[650px] text-[16px] font-[400] leading-[1.95] text-white/65 sm:text-[17px] lg:text-[18px]">
            قدامك أكتر من طريقة لدراسة البرمجة وعلوم الحاسب.
            <br className="hidden sm:block" />
            اختار الطريقة اللي تناسب أسلوب مذاكرتك واحتياجاتك.
          </p>

          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={() => scrollTo('selector')}
              className="group inline-flex min-h-[50px] min-w-[196px] items-center justify-center gap-2 rounded-lg bg-[#5ACFC8] px-7 text-[15px] font-[800] text-white shadow-[0_6px_18px_rgba(101,221,213,0.10)] transition-all duration-200 hover:bg-[#50C2BB] hover:shadow-[0_8px_22px_rgba(101,221,213,0.13)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              ساعدني أختار
              <ArrowDown
                size={17}
                strokeWidth={2.3}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative h-10 sm:h-14"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 70"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M0,70 L0,20 Q600,70 1200,20 L1200,70 Z"
            fill="#eef2f7"
          />
        </svg>
      </div>
    </section>
  );
}