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
        <div className="absolute -right-40 -top-32 h-[500px] w-[500px] rounded-full bg-brand/[0.055] blur-3xl" />

        <div className="absolute -left-52 bottom-[-160px] h-[520px] w-[520px] rounded-full bg-navy-500/[0.12] blur-3xl" />

        <div className="absolute left-[38%] top-[30%] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.012] blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.014]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="wrap relative z-10">
        <div
          className="grid min-h-[620px] grid-cols-1 items-center px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:min-h-[650px] lg:grid-cols-[58fr_42fr] lg:gap-2 lg:px-0 lg:pb-12 lg:pt-10"
          style={{ direction: 'ltr' }}
        >
          <div className="order-2 flex h-full items-center justify-center lg:order-1">
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="relative flex w-[min(94vw,650px)] items-end justify-center sm:w-[min(90vw,700px)] lg:w-[min(100%,730px)]">
                <div
                  className="absolute bottom-[7%] left-1/2 h-[76%] w-[88%] -translate-x-1/2 rounded-[48px] bg-[#102b4b] shadow-[0_24px_60px_rgba(0,0,0,0.10)] sm:rounded-[56px] lg:bottom-[8%] lg:h-[74%] lg:w-[86%]"
                  aria-hidden="true"
                />

                <div
                  className="absolute bottom-[6%] left-1/2 h-[70%] w-[82%] -translate-x-1/2 rounded-[44px] bg-white/[0.025] sm:rounded-[52px] lg:bottom-[7%] lg:h-[69%] lg:w-[80%]"
                  aria-hidden="true"
                />

                <img
                  src="/images/Hero.png"
                  alt="د. عيسى صبري المتولي"
                  className="relative z-10 mx-auto block h-auto w-full object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,0.24)] [filter:contrast(1.04)_brightness(1.03)_saturate(1.03)] [mask-image:linear-gradient(to_bottom,black_0%,black_87%,rgba(0,0,0,0.9)_93%,transparent_100%)]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div
            className="order-1 flex flex-col items-center justify-center text-center lg:order-2 lg:items-start lg:justify-center lg:text-right"
            style={{ direction: 'rtl' }}
          >
            <div className="mb-7 inline-flex items-center rounded-full border border-brand/20 bg-brand/[0.055] px-4 py-2">
              <span className="text-[13px] font-[700] tracking-wide text-brand sm:text-sm">
                طلاب البكالوريا (عربي - لغات)
              </span>
            </div>

            <h1
              id="hero-heading"
              className="max-w-[700px] text-[2.3rem] font-[700] leading-[1.27] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.55rem] xl:text-[3.8rem]"
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

            <div className="mt-9">
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