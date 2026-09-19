import { useRef } from 'react';
import { Users, Monitor, BookOpen, Zap, CheckCircle, ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { systems } from '../data/systems';
import type { SystemId } from '../data/systems';

interface Option {
  id: SystemId;
  label: string;
  sub: string;
  icon: LucideIcon;
}

const options: Option[] = [
  { id: 'center', label: 'بحب الحضور والتفاعل', sub: 'الحضور في السنتر', icon: Users },
  { id: 'online-live', label: 'عايز أدرس من البيت', sub: 'Online Live', icon: Monitor },
  { id: 'books', label: 'بحب أذاكر بطريقتي', sub: 'كتب شيخ البرمجة', icon: BookOpen },
  { id: 'club', label: 'محتاج متابعة مستمرة', sub: 'نادي المبرمجين', icon: Zap },
];

interface Props {
  picked: SystemId | null;
  onPick: (id: SystemId) => void;
  onViewDetail: () => void;
  showDetail: boolean;
}

export default function Selector({ picked, onPick, onViewDetail, showDetail }: Props) {
  const pickedSys = picked ? systems.find((s) => s.id === picked) ?? null : null;
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const count = options.length;
    let next = index;
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      e.preventDefault(); next = (index + 1) % count;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      e.preventDefault(); next = (index - 1 + count) % count;
    } else return;
    buttonRefs.current[next]?.focus();
    onPick(options[next].id);
  };

  return (
    <section
      id="selector"
      className="bg-base scroll-mt-[60px]"
      aria-labelledby="selector-heading"
    >
      <div className="wrap pt-10 sm:pt-14 pb-16 sm:pb-20 lg:pb-24">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
            <span className="label">اختار أسلوبك</span>
          </div>
          <h2
            id="selector-heading"
            className="text-2xl sm:text-3xl font-black text-text tracking-tight mb-3"
          >
            إيه الطريقة الأقرب ليك؟
          </h2>
          <p className="text-base text-text-secondary font-normal max-w-sm mx-auto">
            اختار الوصف الأقرب لأسلوبك — وهنوريلك النظام المناسب
          </p>
        </div>

        {/* 4 options — 2×2 on sm+, 1 col on mobile */}
        <div
          role="radiogroup"
          aria-labelledby="selector-heading"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto"
        >
          {options.map(({ id, label, sub, icon: Icon }, index) => {
            const active = picked === id;
            const dimmed = picked !== null && !active;
            const sys = systems.find((s) => s.id === id)!;

            return (
              <button
                key={id}
                ref={(el) => { buttonRefs.current[index] = el; }}
                role="radio"
                aria-checked={active}
                onClick={() => onPick(id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={active || (!picked && index === 0) ? 0 : -1}
                className={`
                  group relative flex items-center gap-4 p-4 sm:p-5 rounded-xl border-2
                  text-right transition-all duration-200 min-h-[76px]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand
                  focus-visible:ring-offset-2 focus-visible:ring-offset-base
                  ${active
                    ? `${sys.accent.bg} ${sys.accent.border} shadow-sm`
                    : dimmed
                      ? 'bg-surface border-border/60 opacity-45 cursor-pointer'
                      : 'bg-surface border-border hover:border-border-strong hover:shadow-sm cursor-pointer'
                  }
                `}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${active ? sys.accent.iconBg : 'bg-base group-hover:bg-subtle'
                    }`}
                  aria-hidden="true"
                >
                  <Icon size={20} className={active ? sys.accent.text : 'text-text-muted'} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 text-right">
                  <span className={`font-bold text-base block leading-snug ${active ? sys.accent.text : 'text-text'
                    }`}>
                    {label}
                  </span>
                  <span className={`text-sm block mt-0.5 font-normal ${active ? `${sys.accent.text} opacity-70` : 'text-text-muted'
                    }`}>
                    {sub}
                  </span>
                </div>

                {/* Active dot indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-200 ${active ? `${sys.accent.border} border-[3px]` : 'border-border-strong bg-surface'
                    }`}
                  aria-hidden="true"
                >
                  {active && <div className={`w-2.5 h-2.5 rounded-full ${sys.accent.dot}`} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Recommendation card — appears after selection */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`max-w-2xl mx-auto mt-5 transition-all duration-300 ${pickedSys ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          style={{ minHeight: pickedSys ? undefined : 0 }}
        >
          {pickedSys && (
            <div className={`rounded-xl border-2 ${pickedSys.accent.border} bg-surface overflow-hidden shadow-sm`}>

              {/* Card accent bar */}
              <div className={`h-1 w-full ${pickedSys.accent.dot}`} aria-hidden="true" />

              <div className="p-5 sm:p-6">
                {/* System name + tagline */}
                <h3 className="text-xl sm:text-2xl font-black text-text leading-tight mb-1">
                  {pickedSys.title}
                </h3>
                <p className={`text-sm font-semibold mb-3 ${pickedSys.accent.text}`}>
                  {pickedSys.tagline}
                </p>
                <p className="text-base text-text-secondary font-normal leading-relaxed mb-4">
                  {pickedSys.whyItFits}
                </p>

                {/* Top 3 includes */}
                <ul className="space-y-2 mb-5">
                  {pickedSys.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className={`${pickedSys.accent.text} shrink-0 mt-[3px]`} aria-hidden="true" />
                      <span className="text-sm text-text-secondary font-normal leading-relaxed">{item}</span>
                    </li>
                  ))}
                  {pickedSys.includes.length > 3 && (
                    <li className={`text-sm font-semibold ${pickedSys.accent.text} pr-5`}>
                      + {pickedSys.includes.length - 3} أكثر
                    </li>
                  )}
                </ul>

                <p className="text-sm text-text-muted">
                  <span className="font-semibold text-text-secondary">التسعير: </span>
                  {pickedSys.pricingNote}
                </p>
              </div>

              {/* Actions */}
              <div className={`border-t border-border px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5`}>
                <button
                  onClick={onViewDetail}
                  className="btn-primary flex-1 sm:flex-none sm:w-auto justify-center"
                >
                  شوف التفاصيل الكاملة
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>
                <button
                  onClick={() => onPick(picked!)}
                  className="btn-ghost flex-1 sm:flex-none sm:w-auto justify-center"
                >
                  اختار طريقة تانية
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Transition to next section */}
      <div
        className={`h-10 sm:h-14 transition-colors duration-300 ${showDetail ? 'bg-surface' : 'bg-navy-900'
          }`}
        style={{ borderRadius: showDetail ? '0' : '28px 28px 0 0' }}
        aria-hidden="true"
      />
    </section>
  );
}
