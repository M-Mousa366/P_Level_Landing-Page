import {
  MessageCircle,
  ArrowRight,
  CheckCircle,
  ClipboardCheck,
  PackageCheck,
  Info,
} from 'lucide-react';

import type { System } from '../data/systems';
import { buildWhatsAppUrl } from '../data/systems';
import SystemVisual from './SystemVisual';

interface Props {
  sys: System;
  onReset: () => void;
}

export default function SystemDetail({ sys, onReset }: Props) {
  const bookingUrl = buildWhatsAppUrl(sys.whatsappMessage);
  const isConfigured = bookingUrl !== 'WHATSAPP_LINK_PLACEHOLDER';

  return (
    <section
      id="system-detail"
      className="system-detail-enter bg-surface font-arabic"
      aria-labelledby="detail-heading"
    >
      <div className="wrap px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-[47fr_53fr] lg:gap-14">
          <div className="order-1">
            <SystemVisual sys={sys} />
          </div>

          <div className="order-2">
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`h-9 w-1 shrink-0 rounded-full ${sys.accent.dot}`}
                aria-hidden="true"
              />

              <h2
                id="detail-heading"
                className="text-[2rem] font-[700] leading-[1.3] tracking-tight text-text sm:text-[2.35rem]"
              >
                {sys.title}
              </h2>
            </div>

            <p
              className={`max-w-2xl text-[17px] font-[600] leading-[1.85] ${sys.accent.text} sm:text-[18px]`}
            >
              {sys.tagline}
            </p>

            <p className="mt-4 max-w-2xl text-[16px] font-[500] leading-[2] text-text-secondary sm:text-[17px]">
              {sys.whyItFits}
            </p>

            {sys.id === 'club' && (
              <a
                href="https://progclub.eissasabry.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm font-[700] text-text-secondary transition-colors duration-150 hover:border-text-muted hover:bg-base hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                aria-label="افتح منصة نادي المبرمجين"
              >
                <span>استكشف منصة نادي المبرمجين</span>
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="rotate-180"
                />
              </a>
            )}
          </div>
        </div>

        <div className="mt-11 border-t border-border pt-10 sm:mt-13 sm:pt-11">
          <div className="grid grid-cols-1 gap-9 lg:grid-cols-2 lg:gap-0">
            <div className="lg:border-l lg:border-border lg:pl-14">
              <SectionHeading
                icon={ClipboardCheck}
                title="مناسب ليك لو"
                accent={sys.accent}
              />

              <ul className="mt-5 space-y-4">
                {sys.suitableIf.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className={`mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${sys.accent.iconBg}`}
                      aria-hidden="true"
                    >
                      <CheckCircle
                        size={12}
                        strokeWidth={2.8}
                        className={sys.accent.text}
                      />
                    </span>

                    <span className="text-[16px] font-[500] leading-[1.9] text-text-secondary sm:text-[17px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pr-14">
              <SectionHeading
                icon={PackageCheck}
                title="إيه اللي هتحصل عليه؟"
                accent={sys.accent}
              />

              <ul className="mt-5 space-y-4">
                {sys.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className={`mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full ${sys.accent.dot}`}
                      aria-hidden="true"
                    />

                    <span className="text-[16px] font-[500] leading-[1.9] text-text-secondary sm:text-[17px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {sys.details.length > 0 && (
            <div className="mt-9 lg:mt-10">
              <div
                className={`rounded-2xl border ${sys.accent.border} ${sys.accent.bg} px-5 py-5 sm:px-6 sm:py-6`}
              >
                <SectionHeading
                  icon={Info}
                  title="تفاصيل مهمة"
                  accent={sys.accent}
                />

                <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-3.5 sm:grid-cols-2">
                  {sys.details.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className={`mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full ${sys.accent.dot}`}
                        aria-hidden="true"
                      />

                      <span className="text-[15px] font-[500] leading-[1.9] text-text-secondary sm:text-[16px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto mt-11 max-w-xl text-center sm:mt-12">
          <h3 className="text-[20px] font-[700] leading-tight text-text sm:text-[21px]">
            مهتم بالنظام ده؟
          </h3>

          <p
            className="mt-2.5 text-[15px] font-[500] leading-[1.8] sm:text-[16px]"
            style={{ color: '#64748B' }}
          >
            تواصل مع الإدارة لمعرفة التفاصيل المتاحة والحجز.
          </p>

          <div className="mt-5">
            {isConfigured ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp min-h-[50px] w-full justify-center px-7 text-base font-[700] sm:w-auto"
                aria-label={`تواصل على واتساب للحجز في ${sys.title}`}
              >
                <MessageCircle size={17} aria-hidden="true" />
                تواصل للحجز عبر واتساب
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="btn-primary min-h-[50px] w-full cursor-not-allowed justify-center px-7 text-base font-[700] opacity-40"
              >
                <MessageCircle size={17} aria-hidden="true" />
                تواصل للحجز عبر واتساب
              </button>
            )}
          </div>
        </div>

        <div className="mt-9 flex justify-center border-t border-border pt-7 sm:mt-10 sm:pt-8">
          <button
            type="button"
            onClick={onReset}
            className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-5 py-2.5 text-sm font-[700] text-text-secondary transition-all duration-200 hover:bg-base hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            اختار طريقة تانية
          </button>
        </div>
      </div>

      <div
        className="h-10 rounded-t-[28px] bg-navy-900 sm:h-14"
        aria-hidden="true"
      />
    </section>
  );
}

interface SectionHeadingProps {
  icon: typeof ClipboardCheck;
  title: string;
  accent: System['accent'];
}

function SectionHeading({
  icon: Icon,
  title,
  accent,
}: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent.iconBg}`}
        aria-hidden="true"
      >
        <Icon
          size={18}
          strokeWidth={2.2}
          className={accent.text}
        />
      </div>

      <h3 className="text-[18px] font-[700] leading-tight text-text sm:text-[19px]">
        {title}
      </h3>
    </div>
  );
}