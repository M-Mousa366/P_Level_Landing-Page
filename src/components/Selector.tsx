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

const CARD_STYLES: Record<
  SystemId,
  {
    bg: string;
    border: string;
    iconBg: string;
    text: string;
    dot: string;
  }
> = {
  center: {
    bg: 'bg-[#F3F6FA]',
    border: 'border-[#D7E0EB]',
    iconBg: 'bg-[#E3EBF4]',
    text: 'text-[#2D4A6E]',
    dot: 'bg-[#4A7AB5]',
  },
  'online-live': {
    bg: 'bg-[#F1F7FB]',
    border: 'border-[#D0E2EF]',
    iconBg: 'bg-[#DFEDF6]',
    text: 'text-[#1E5272]',
    dot: 'bg-[#3D87B8]',
  },
  books: {
    bg: 'bg-[#FCF8EE]',
    border: 'border-[#E9DDBE]',
    iconBg: 'bg-[#F4E9C9]',
    text: 'text-[#7A5C1E]',
    dot: 'bg-[#C9973A]',
  },
  club: {
    bg: 'bg-[#F2F8F4]',
    border: 'border-[#D1E3D7]',
    iconBg: 'bg-[#E1F0E6]',
    text: 'text-[#285C3A]',
    dot: 'bg-[#3D8C57]',
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
      className="scroll-mt-[76px] bg-base"
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
                  group relative flex min-h-[92px] w-full items-center gap-4
                  rounded-2xl border p-4 text-right
                  transition-[transform,opacity,background-color,border-color,box-shadow] duration-250 ease-out
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
                        ? `cursor-pointer ${style.border} ${style.bg} opacity-[0.68] shadow-none`
                        : `cursor-pointer ${style.border} ${style.bg} shadow-sm hover:shadow-md`
                  }
                `}
              >
                <div
                  className={`
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-xl transition-[background-color,transform] duration-250 ease-out
                    sm:h-[52px] sm:w-[52px]
                    ${
                      active
                        ? sys.accent.iconBg
                        : `${style.iconBg} group-hover:brightness-[0.98]`
                    }
                  `}
                  aria-hidden="true"
                >
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.2 : 2}
                    className={`
                      transition-colors duration-250 ease-out
                      ${
                        active
                          ? sys.accent.text
                          : style.text
                      }
                    `}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span
                    className={`
                      block text-base font-[700] leading-snug
                      transition-colors duration-250 ease-out sm:text-[17px]
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
                      transition-colors duration-250 ease-out
                      ${
                        active
                          ? `${sys.accent.text} opacity-75`
                          : style.text
                      }
                    `}
                  >
                    {sub}
                  </span>
                </div>

                <div
                  className={`
                    flex h-6 w-6 shrink-0 items-center justify-center
                    rounded-full border-2
                    transition-[background-color,border-color,transform,opacity] duration-250 ease-out
                    ${
                      active
                        ? `${sys.accent.border} ${sys.accent.iconBg}`
                        : `${style.border} bg-white/70`
                    }
                  `}
                  aria-hidden="true"
                >
                  {active && (
                    <Check
                      size={12}
                      strokeWidth={3}
                      className={`animate-fade-in ${sys.accent.text}`}
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
          picked
            ? 'bg-surface'
            : 'rounded-t-[28px] bg-navy-900'
        }`}
        aria-hidden="true"
      />
    </section>
  );
}