import { useRef } from 'react';
import { Users, Monitor, BookOpen, Zap, Check } from 'lucide-react';
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
      className="scroll-mt-[76px] bg-base"
      aria-labelledby="selector-heading"
    >
      <div className="wrap px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">

        {/* Section heading */}
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

        {/* System options */}
        <div
          role="radiogroup"
          aria-labelledby="selector-heading"
          className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        >
          {options.map(({ id, label, sub, icon: Icon }, index) => {
            const active = picked === id;
            const dimmed = picked !== null && !active;
            const sys = systems.find((item) => item.id === id)!;

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
                tabIndex={
                  active || (!picked && index === 0) ? 0 : -1
                }
                className={`
                  group relative flex min-h-[92px] items-center gap-4
                  rounded-2xl border p-4 text-right
                  transition-all duration-200
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-base
                  sm:min-h-[100px] sm:p-5
                  ${
                    active
                      ? `${sys.accent.bg} ${sys.accent.border} shadow-md`
                      : dimmed
                        ? 'cursor-pointer border-border/50 bg-surface opacity-45'
                        : 'cursor-pointer border-border-strong bg-surface shadow-sm hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md'
                  }
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-xl transition-all duration-200
                    sm:h-[52px] sm:w-[52px]
                    ${
                      active
                        ? sys.accent.iconBg
                        : 'bg-base group-hover:bg-subtle'
                    }
                  `}
                  aria-hidden="true"
                >
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.2 : 2}
                    className={
                      active
                        ? sys.accent.text
                        : 'text-text-secondary'
                    }
                  />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <span
                    className={`
                      block text-base font-[700] leading-snug sm:text-[17px]
                      ${
                        active
                          ? sys.accent.text
                          : 'text-text'
                      }
                    `}
                  >
                    {label}
                  </span>

                  <span
                    className={`
                      mt-1 block text-sm font-[500] leading-snug
                      ${
                        active
                          ? `${sys.accent.text} opacity-75`
                          : 'text-text-secondary'
                      }
                    `}
                  >
                    {sub}
                  </span>
                </div>

                {/* Selection indicator */}
                <div
                  className={`
                    flex h-6 w-6 shrink-0 items-center justify-center
                    rounded-full border-2 transition-all duration-200
                    ${
                      active
                        ? `${sys.accent.border} ${sys.accent.iconBg}`
                        : 'border-border-strong bg-surface'
                    }
                  `}
                  aria-hidden="true"
                >
                  {active && (
                    <Check
                      size={13}
                      strokeWidth={3}
                      className={sys.accent.text}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transition */}
      <div
        className={`h-10 sm:h-14 ${
          picked
            ? 'bg-surface'
            : 'rounded-t-[28px] bg-navy-900'
        }`}
        aria-hidden="true"
      />
    </section>
  );
}