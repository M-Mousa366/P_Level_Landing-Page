import { ArrowDown } from 'lucide-react';

const pills = [
  'الحضور في السنتر',
  'Online Live',
  'كتب شيخ البرمجة',
  'نادي المبرمجين',
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section
      className="relative bg-navy-900 pt-[60px] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, #00c896 0%, transparent 60%), radial-gradient(circle at 80% 20%, #3d6a8a 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="wrap relative z-10 py-16 sm:py-24 lg:py-28">
        <div className="max-w-[600px] mx-auto text-center">

          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
            <span className="label">البرمجة وعلوم الحاسب — المرحلة الثانوية</span>
          </div>

          {/* H1 */}
          <h1
            id="hero-heading"
            className="text-[2.2rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] mb-6 tracking-tight"
          >
            اختار طريقة الدراسة
            <span className="block text-brand mt-1">المناسبة ليك.</span>
          </h1>

          {/* Sub */}
          <p className="text-base sm:text-lg text-white/60 font-normal leading-relaxed mb-10 max-w-[420px] mx-auto">
            4 طرق مختلفة لتعلم البرمجة وعلوم الحاسب — اختار اللي يناسب أسلوبك واحتياجاتك.
          </p>

          {/* CTA */}
          <button
            onClick={() => scrollTo('selector')}
            className="btn-primary px-10 text-base mb-10"
          >
            ساعدني أختار
            <ArrowDown size={17} aria-hidden="true" />
          </button>

          {/* 4 system pills — scannable anchor */}
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-label="الأنظمة المتاحة"
          >
            {pills.map((name) => (
              <button
                key={name}
                onClick={() => scrollTo('selector')}
                className="text-xs font-medium text-white/40 hover:text-white/70
                  border border-white/10 hover:border-white/20
                  px-3 py-1.5 rounded-full transition-colors duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {name}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Section break — curved base */}
      <div className="relative h-14 sm:h-20" aria-hidden="true">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <path d="M0,80 L0,0 Q600,80 1200,0 L1200,80 Z" fill="#eef2f7" />
        </svg>
      </div>
    </section>
  );
}
