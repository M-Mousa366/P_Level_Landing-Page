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
  }
> = {
  center: {
    bg: 'bg-[#EEF3F8]',
    border: 'border-[#C4D3E3]',
    iconBg: 'bg-[#E3EBF4]',
    text: 'text-[#2D4A6E]',
  },
  'online-live': {
    bg: 'bg-[#EDF8F7]',
    border: 'border-[#B9DEDB]',
    iconBg: 'bg-[#D3ECEA]',
    text: 'text-[#246B68]',
  },
  books: {
    bg: 'bg-[#FBF5E8]',
    border: 'border-[#E8D5A4]',
    iconBg: 'bg-[#F4E9C9]',
    text: 'text-[#7A5C1E]',
  },
  club: {
    bg: 'bg-[#EEF6F1]',
    border: 'border-[#BFD9C9]',
    iconBg: 'bg-[#E1F0E6]',
    text: 'text-[#285C3A]',
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
                      ? `${style.bg} ${style.border} shadow-md`
                      : dimmed
                        ? 'cursor-pointer border-border bg-white opacity-[0.68] shadow-none'
                        : 'cursor-pointer border-border bg-white shadow-sm hover:shadow-md'
                  }
                `}
              >
                <div
                  className={`
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-xl transition-[background-color,transform] duration-250 ease-out
                    sm:h-[52px] sm:w-[52px]
                    ${style.iconBg}
                  `}
                  aria-hidden="true"
                >
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.2 : 2}
                    className={`transition-colors duration-250 ease-out ${style.text}`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-base font-[700] leading-snug text-text transition-colors duration-250 ease-out sm:text-[17px]">
                    {label}
                  </span>

                  <span className="mt-1 block text-sm font-[500] leading-snug text-text-secondary transition-colors duration-250 ease-out">
                    {sub}
                  </span>
                </div>

                <div
                  className="
                    flex h-6 w-6 shrink-0 items-center justify-center
                    rounded-full border-2 border-border-strong bg-white/70
                    transition-[background-color,border-color,transform,opacity] duration-250 ease-out
                  "
                  aria-hidden="true"
                >
                  {active && (
                    <Check
                      size={12}
                      strokeWidth={3}
                      className="animate-fade-in text-text"
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