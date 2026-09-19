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
      className="relative overflow-hidden bg-navy-900 pt-[76px]"
      aria-labelledby="hero-heading"
    >
      {/* Subtle brand atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-brand/[0.055] blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-navy-500/[0.14] blur-3xl" />
      </div>

      {/* Very subtle grid */}
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
        <div className="mx-auto max-w-[820px] px-4 py-20 text-center sm:px-6 sm:py-24 lg:py-28">
          {/* Eyebrow */}
          <div className="mb-7">
            <span className="text-sm font-semibold text-brand sm:text-[15px]">
              البرمجة وعلوم الحاسب — المرحلة الثانوية
            </span>
          </div>

          {/* Main heading */}
          <h1
            id="hero-heading"
            className="mx-auto max-w-[780px] text-[2.35rem] font-[700] leading-[1.3] tracking-tight text-white sm:text-5xl lg:text-[3.65rem]"
          >
            اختار طريقة الدراسة
            <span className="mt-1.5 block text-brand">
              المناسبة ليك.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="mx-auto mt-6 max-w-[620px] text-base font-normal leading-[1.9] text-white/65 sm:text-[17px] lg:text-lg">
            قدامك أكتر من طريقة لدراسة البرمجة وعلوم الحاسب.
            <br className="hidden sm:block" />
            اختار الطريقة اللي تناسب أسلوب مذاكرتك واحتياجاتك.
          </p>

          {/* Primary CTA */}
          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={() => scrollTo('selector')}
              className="btn-primary min-h-[48px] min-w-[190px] px-7 text-base font-[700] shadow-[0_10px_30px_rgba(0,200,150,0.14)]"
            >
              ساعدني أختار
              <ArrowDown size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Section transition */}
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