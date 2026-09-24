import { useRef } from 'react';
import { Users, Monitor, BookOpen, Zap, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SystemId } from '../data/systems';

interface Option {
  id: SystemId;
  label: string;
  sub: string;
  icon: LucideIcon;
}

const options: Option[] = [
  {
    id: 'center',
    label: 'بحب الحضور والتفاعل',
    sub: 'الحضور في السنتر',
    icon: Users,
  },
  {
    id: 'online-live',
    label: 'عايز أدرس من البيت',
    sub: 'Online Live',
    icon: Monitor,
  },
  {
    id: 'books',
    label: 'بحب أذاكر بطريقتي',
    sub: 'كتب شيخ البرمجة',
    icon: BookOpen,
  },
  {
    id: 'club',
    label: 'محتاج متابعة مستمرة',
    sub: 'نادي المبرمجين',
    icon: Zap,
  },
];

const CARD_STYLES: Record<
  SystemId,
  {
    bg: string;
    border: string;
    iconBg: string;
    text: string;
    accent: string;
    soft: string;
  }
> = {
  center: {
    bg: 'bg-[#EEF3F8]',
    border: 'border-[#C4D3E3]',
    iconBg: 'bg-[#E3EBF4]',
    text: 'text-[#2D4A6E]',
    accent: 'bg-[#4A78A8]',
    soft: 'bg-[#4A78A8]/[0.08]',
  },
  'online-live': {
    bg: 'bg-[#EDF8F7]',
    border: 'border-[#B9DEDB]',
    iconBg: 'bg-[#D3ECEA]',
    text: 'text-[#246B68]',
    accent: 'bg-[#3B9691]',
    soft: 'bg-[#3B9691]/[0.08]',
  },
  books: {
    bg: 'bg-[#FBF5E8]',
    border: 'border-[#E8D5A4]',
    iconBg: 'bg-[#F4E9C9]',
    text: 'text-[#7A5C1E]',
    accent: 'bg-[#C9973A]',
    soft: 'bg-[#C9973A]/[0.08]',
  },
  club: {
    bg: 'bg-[#EEF6F1]',
    border: 'border-[#BFD9C9]',
    iconBg: 'bg-[#E1F0E6]',
    text: 'text-[#285C3A]',
    accent: 'bg-[#3D8C57]',
    soft: 'bg-[#3D8C57]/[0.08]',
  },
};

interface Props {
  picked: SystemId | null;
  onPick: (id: SystemId) => void;
}

export default function Selector({ picked, onPick }: Props) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const count = options.length;
    let next = index;

    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      e.preventDefault();
      next = (index + 1) % count;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      e.preventDefault();
      next = (index - 1 + count) % count;
    } else {
      return;
    }

    buttonRefs.current[next]?.focus();
    onPick(options[next].id);
  };

  return (
    <section
      id="selector"
      className="scroll-mt-[24px] bg-base"
      aria-labelledby="selector-heading"
    >
      <div className="wrap px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-11">
          <h2
            id="selector-heading"
            className="text-3xl font-[700] leading-tight tracking-tight text-text sm:text-4xl"
          >
            إيه الطريقة الأقرب ليك؟
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-base font-[500] leading-relaxed text-text-secondary sm:text-[17px]">
           اختار الطريقة اللي تناسب أسلوب مذاكرتك واحتياجاتك.
          </p>
        </div>

        <div
          role="radiogroup"
          aria-labelledby="selector-heading"
          className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        >
          {options.map(({ id, label, sub, icon: Icon }, index) => {
            const active = picked === id;
            const dimmed = picked !== null && !active;
            const style = CARD_STYLES[id];

            return (
              <button
                key={id}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onPick(id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={active || (!picked && index === 0) ? 0 : -1}
                className={`
                  group relative flex min-h-[104px] w-full items-center
                  gap-4 overflow-hidden rounded-2xl border p-4 text-right
                  transition-[transform,opacity,background-color,border-color,box-shadow]
                  duration-300 ease-out
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-base
                  sm:min-h-[112px] sm:p-5
                  ${
                    active
                      ? `${style.bg} ${style.border} -translate-y-1 shadow-[0_12px_26px_rgba(15,23,42,0.10)]`
                      : dimmed
                        ? 'cursor-pointer border-border bg-white opacity-[0.58] shadow-none hover:-translate-y-0.5 hover:opacity-75 hover:shadow-[0_6px_16px_rgba(15,23,42,0.06)]'
                        : 'cursor-pointer border-border bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_12px_24px_rgba(15,23,42,0.10)]'
                  }
                `}
              >
                {/* Decorative accent line */}
                <span
                  className={`
                    pointer-events-none absolute bottom-0 right-0 h-1
                    rounded-tl-full transition-all duration-300 ease-out
                    ${style.accent}
                    ${
                      active
                        ? 'w-full opacity-100'
                        : 'w-16 opacity-40 group-hover:w-28 group-hover:opacity-75'
                    }
                  `}
                  aria-hidden="true"
                />

                {/* Soft hover glow */}
                <span
                  className={`
                    pointer-events-none absolute -left-8 -top-8 h-24 w-24
                    rounded-full blur-2xl transition-opacity duration-300
                    ${style.soft}
                    ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className={`
                    relative z-10 flex h-12 w-12 shrink-0 items-center
                    justify-center rounded-xl
                    transition-[transform,background-color,box-shadow]
                    duration-300 ease-out
                    sm:h-[52px] sm:w-[52px]
                    ${style.iconBg}
                    ${
                      active
                        ? 'scale-[1.04] shadow-sm'
                        : 'group-hover:scale-[1.06]'
                    }
                  `}
                  aria-hidden="true"
                >
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.25 : 2}
                    className={`${style.text} transition-transform duration-300`}
                  />
                </div>

                {/* Text */}
                <div className="relative z-10 min-w-0 flex-1">
                  <span className="block text-base font-[700] leading-snug text-text transition-colors duration-300 sm:text-[17px]">
                    {label}
                  </span>

                  <span className="mt-1 block text-sm font-[500] leading-snug text-text-secondary transition-colors duration-300">
                    {sub}
                  </span>
                </div>

                {/* Selection indicator */}
                <div
                  className={`
                    relative z-10 flex h-6 w-6 shrink-0 items-center
                    justify-center rounded-full border-2
                    transition-[background-color,border-color,transform,box-shadow]
                    duration-300 ease-out
                    ${
                      active
                        ? `${style.accent} border-transparent scale-105 shadow-sm`
                        : 'border-border-strong bg-white'
                    }
                  `}
                  aria-hidden="true"
                >
                  {active && (
                    <Check
                      size={12}
                      strokeWidth={3}
                      className="animate-fade-in text-white"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`h-10 sm:h-14 ${
          picked ? 'bg-surface' : 'rounded-t-[28px] bg-navy-900'
        }`}
        aria-hidden="true"
      />
    </section>
  );
}