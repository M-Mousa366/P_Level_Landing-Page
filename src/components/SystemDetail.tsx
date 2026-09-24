import {
  MessageCircle,
  ArrowRight,
  CheckCircle,
  PackageCheck,
  Info,
  CalendarCheck,
} from 'lucide-react';

import type { System } from '../data/systems';
import { buildWhatsAppUrl } from '../data/systems';
import SystemVisual from './SystemVisual';

interface Props {
  sys: System;
  onReset: () => void;
}

export default function SystemDetail({ sys, onReset }: Props) {
  const whatsappUrl = buildWhatsAppUrl(sys.whatsappMessage);
  const isWhatsappConfigured =
    whatsappUrl !== 'WHATSAPP_LINK_PLACEHOLDER';

  const hasBooking = Boolean(
    sys.cta.bookingUrl && sys.cta.bookingLabel
  );

  return (
    <section
      id="system-detail"
      className="system-detail-enter scroll-mt-7 bg-surface font-arabic"
      aria-labelledby="detail-heading"
    >
      <div className="wrap px-4 pb-8 pt-2 sm:px-6 sm:pb-10 sm:pt-3 lg:pb-12 lg:pt-4">
        {/* Intro */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[47fr_53fr] lg:gap-14">
          <div className="order-1">
            <SystemVisual sys={sys} />
          </div>

          <div className="order-2">
            <div className="flex items-center gap-3">
              <span
                className={`h-10 w-1 shrink-0 rounded-full ${sys.accent.dot}`}
                aria-hidden="true"
              />

              <h2
                id="detail-heading"
                className="text-[1.85rem] font-[750] leading-[1.3] tracking-[-0.02em] text-text sm:text-[2.2rem] lg:text-[2.35rem]"
              >
                {sys.title}
              </h2>
            </div>

            <p
              className={`mt-4 max-w-2xl text-[16px] font-[550] leading-[1.9] ${sys.accent.text} sm:text-[17px] sm:leading-[1.85]`}
            >
              {sys.tagline}
            </p>

            {sys.id === 'club' && (
              <a
                href="https://progclub.eissasabry.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-[14px] font-[700] text-text-secondary transition-colors duration-150 hover:border-text-muted hover:bg-base hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
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

        {/* Information sections */}
        <div className="mt-9 border-t border-border pt-8 sm:mt-11 sm:pt-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
            {/* Suitable for */}
            <div className="lg:border-l lg:border-border lg:pl-12">
              <SectionHeading
                icon={CheckCircle}
                title="مناسب ليك لو"
                accent={sys.accent}
              />

              <ul className="mt-4 space-y-3">
                {sys.suitableIf.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5"
                  >
                    <span
                      className={`mt-[5px] flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full ${sys.accent.iconBg}`}
                      aria-hidden="true"
                    >
                      <CheckCircle
                        size={12}
                        strokeWidth={2.8}
                        className={sys.accent.text}
                      />
                    </span>

                    <span className="text-[16px] font-[500] leading-[1.85] text-text-secondary sm:text-[17px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Includes */}
            <div className="lg:pr-12">
              <SectionHeading
                icon={PackageCheck}
                title="إيه اللي هتحصل عليه؟"
                accent={sys.accent}
              />

              <ul className="mt-4 space-y-3">
                {sys.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5"
                  >
                    <span
                      className={`mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full ${sys.accent.dot}`}
                      aria-hidden="true"
                    />

                    <span className="text-[16px] font-[500] leading-[1.85] text-text-secondary sm:text-[17px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important details */}
          {sys.details.length > 0 && (
            <div className="mt-8 sm:mt-9">
              <div
                className={`rounded-2xl border ${sys.accent.border} ${sys.accent.bg} px-4 py-4 sm:px-5 sm:py-5`}
              >
                <SectionHeading
                  icon={Info}
                  title="تفاصيل مهمة"
                  accent={sys.accent}
                />

                <ul className="mt-4 grid grid-cols-1 gap-y-2.5 sm:grid-cols-[fit-content(44%)_fit-content(44%)] sm:justify-between sm:gap-x-6">
                  {sys.details.map((item) => (
                    <li
                      key={item}
                      className="flex min-w-0 items-start gap-2.5"
                    >
                      <span
                        className={`mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full ${sys.accent.dot}`}
                        aria-hidden="true"
                      />

                      <span className="min-w-0 text-[15px] font-[500] leading-[1.85] text-text-secondary sm:text-[16px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mx-auto mt-9 max-w-xl text-center sm:mt-10">
          <h3 className="text-[21px] font-[750] leading-tight text-text sm:text-[22px]">
            مهتم بطريقة الدراسة دي؟
          </h3>

          <p className="mt-2 text-[15px] font-[500] leading-[1.8] text-text-secondary sm:text-[16px]">
            {hasBooking
              ? 'احجز مكانك أو تواصل مع الإدارة لو عندك أي استفسار.'
              : 'تواصل مع الإدارة لمعرفة تفاصيل الكتب وطرق الحصول عليها.'}
          </p>

          <div
            className={`mt-5 flex flex-col justify-center gap-3 sm:flex-row ${
              hasBooking ? '' : 'items-center'
            }`}
          >
            {hasBooking && (
              <a
                href={sys.cta.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#4FC2BB] px-6 text-[16px] font-[700] text-white shadow-[0_5px_16px_rgba(79,194,187,0.08)] transition-all duration-200 hover:bg-[#45B5AE] hover:shadow-[0_7px_20px_rgba(79,194,187,0.10)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-auto"
                aria-label={sys.cta.bookingLabel}
              >
                <CalendarCheck
                  size={17}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                {sys.cta.bookingLabel}
              </a>
            )}

            {isWhatsappConfigured && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-whatsapp/25 bg-whatsapp/[0.06] px-6 text-[16px] font-[700] text-whatsapp transition-[background-color,border-color,transform] duration-200 hover:border-whatsapp/40 hover:bg-whatsapp/[0.10] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-auto"
                aria-label={`${sys.cta.whatsappLabel} عبر واتساب`}
              >
                <MessageCircle
                  size={17}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                {sys.cta.whatsappLabel}
              </a>
            )}
          </div>
        </div>

        {/* Reset */}
        <div className="mt-7 flex justify-center border-t border-border pt-6 sm:mt-8 sm:pt-7">
          <button
            type="button"
            onClick={onReset}
            className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-5 py-2.5 text-[15px] font-[700] text-text-secondary transition-colors duration-200 hover:bg-base hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
        className="h-4 rounded-t-[20px] bg-navy-900 sm:h-5"
        aria-hidden="true"
      />
    </section>
  );
}

interface SectionHeadingProps {
  icon: typeof CheckCircle;
  title: string;
  accent: System['accent'];
}

function SectionHeading({
  icon: Icon,
  title,
  accent,
}: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${accent.iconBg}`}
        aria-hidden="true"
      >
        <Icon
          size={17}
          strokeWidth={2.2}
          className={accent.text}
        />
      </div>

      <h3 className="text-[18px] font-[750] leading-tight text-text sm:text-[19px]">
        {title}
      </h3>
    </div>
  );
}