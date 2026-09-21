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
        <div className="absolute -right-48 -top-40 h-[520px] w-[520px] rounded-full bg-brand/[0.04] blur-3xl" />

        <div className="absolute -left-60 bottom-[-190px] h-[540px] w-[540px] rounded-full bg-navy-500/[0.09] blur-3xl" />

        <div className="absolute left-[34%] top-[34%] h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-white/[0.008] blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.008]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="wrap relative z-10">
        <div
          className="grid min-h-[600px] grid-cols-1 items-center px-4 pb-8 pt-7 sm:min-h-[620px] sm:px-6 sm:pb-12 sm:pt-10 lg:min-h-[630px] lg:grid-cols-[58fr_42fr] lg:gap-0 lg:px-0 lg:pb-10 lg:pt-6"
          style={{ direction: 'ltr' }}
        >
          <div className="order-2 flex h-full items-center justify-center lg:order-1">
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="relative flex w-[min(98vw,700px)] items-end justify-center sm:w-[min(94vw,750px)] lg:w-[min(110%,780px)]">
                <div
                  className="absolute bottom-[5%] left-1/2 h-[77%] w-[88%] -translate-x-1/2 rounded-[56px] bg-[#102b4b] shadow-[0_18px_48px_rgba(0,0,0,0.06)] sm:rounded-[64px] lg:bottom-[6%] lg:h-[76%] lg:w-[86%]"
                  aria-hidden="true"
                />

                <img
                  src="/images/Hero.png"
                  alt="د. عيسى صبري المتولي"
                  className="relative z-10 mx-auto block h-auto w-full object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.17)] [filter:contrast(1.03)_brightness(1.025)_saturate(1.015)] [mask-image:linear-gradient(to_bottom,black_0%,black_89%,rgba(0,0,0,0.88)_95%,transparent_100%)]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div
            className="order-1 flex flex-col items-center justify-center text-center lg:order-2 lg:items-start lg:justify-center lg:pl-0 lg:text-right"
            style={{ direction: 'rtl' }}
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-brand/15 bg-brand/[0.04] px-3.5 py-1.5">
              <span className="text-[12px] font-[700] tracking-wide text-brand/90 sm:text-[13px]">
                طلاب البكالوريا · عربي ولغات
              </span>
            </div>

            <h1
              id="hero-heading"
              className="max-w-[650px] text-[2.25rem] font-[700] leading-[1.28] tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.45rem] xl:text-[3.7rem]"
            >
              اختار طريقة الدراسة
              <span className="mt-2 block text-brand">
                المناسبة ليك.
              </span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[16px] font-[400] leading-[1.95] text-white/75 sm:text-[17px] lg:text-[18px]">
              قدامك أكتر من طريقة لدراسة البرمجة وعلوم الحاسب.
              <br className="hidden sm:block" />
              اختار الطريقة اللي تناسب أسلوب مذاكرتك واحتياجاتك.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => scrollTo('selector')}
                className="group inline-flex min-h-[50px] min-w-[192px] items-center justify-center gap-2 rounded-[9px] bg-[#5ACFC8] px-7 text-[15px] font-[800] text-white shadow-[0_5px_16px_rgba(101,221,213,0.09)] transition-all duration-200 hover:bg-[#50C2BB] hover:shadow-[0_7px_20px_rgba(101,221,213,0.12)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
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