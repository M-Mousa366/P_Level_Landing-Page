import { useState } from 'react';
import { CheckCircle, MessageCircle, ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import type { System } from '../data/systems';
import { buildWhatsAppUrl } from '../data/systems';
import SystemVisual from './SystemVisual';

interface Props {
  sys: System;
  onReset: () => void;
}

export default function SystemDetail({ sys, onReset }: Props) {
  const [expanded, setExpanded] = useState(false);
  const bookingUrl = buildWhatsAppUrl(sys.whatsappMessage);
  const isConfigured = bookingUrl !== 'WHATSAPP_LINK_PLACEHOLDER';

  return (
    <section
      id="system-detail"
      className="bg-surface"
      aria-labelledby="detail-heading"
    >
      <div className="wrap py-10 sm:py-14 lg:py-16">

        {/* Back nav */}
        <div className="mb-8 sm:mb-10">
          <button onClick={onReset} className="nav-back">
            <ArrowRight size={14} aria-hidden="true" />
            <span>اختار طريقة تانية</span>
          </button>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[48fr_52fr] gap-10 lg:gap-14 items-start">

          {/* Visual */}
          <div className="order-1">
            <SystemVisual sys={sys} />
          </div>

          {/* Info column */}
          <div className="order-2 flex flex-col gap-6">

            {/* ── Identity ── */}
            <div>
              <div
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border-2 ${sys.accent.tag} mb-4`}
                aria-hidden="true"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${sys.accent.dot}`} />
                النظام الأنسب ليك
              </div>
              <h2
                id="detail-heading"
                className="text-2xl sm:text-[1.9rem] font-black text-text leading-tight tracking-tight mb-2"
              >
                {sys.title}
              </h2>
              <p className={`text-sm font-semibold ${sys.accent.text} mb-3`}>
                {sys.tagline}
              </p>
              <p className="text-base text-text-secondary font-normal leading-relaxed">
                {sys.whyItFits}
              </p>
            </div>

            {/* ── CTAs ── */}
            <div className="flex flex-col gap-2.5">
              {isConfigured ? (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                  aria-label={`تواصل على واتساب للحجز في ${sys.title}`}
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  تواصل للحجز عبر واتساب
                </a>
              ) : (
                <button disabled className="btn-primary w-full justify-center opacity-40 cursor-not-allowed">
                  <MessageCircle size={17} aria-hidden="true" />
                  تواصل للحجز عبر واتساب
                </button>
              )}

              {sys.id === 'club' && (
                <a
                  href="https://progclub.eissasabry.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full justify-center"
                  aria-label="افتح منصة نادي المبرمجين"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  افتح المنصة
                </a>
              )}

              <p className="text-xs text-center text-text-muted font-normal" aria-hidden="true">
                {isConfigured
                  ? `هيفتح واتساب برسالة جاهزة عن ${sys.title}`
                  : 'سيتم تفعيل واتساب قريباً'}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-border" aria-hidden="true" />

            {/* ── مناسب ليك لو ── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-1.5 h-1.5 rounded-full ${sys.accent.dot} shrink-0`} aria-hidden="true" />
                <span className="label text-text-secondary">مناسب ليك لو</span>
              </div>
              <ul className="space-y-3">
                {sys.suitableIf.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full ${sys.accent.iconBg} flex items-center justify-center shrink-0 mt-[2px]`}
                      aria-hidden="true"
                    >
                      <CheckCircle size={11} className={sys.accent.text} />
                    </div>
                    <span className="text-base text-text-secondary font-normal leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── يشمل ── */}
            <div className={`${sys.accent.bg} border-2 ${sys.accent.border} rounded-xl p-5`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-1.5 h-1.5 rounded-full ${sys.accent.dot} shrink-0`} aria-hidden="true" />
                <span className="label text-text-secondary">يشمل</span>
              </div>
              <ul className="space-y-2.5">
                {sys.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${sys.accent.dot} shrink-0 mt-[8px]`} aria-hidden="true" />
                    <span className="text-sm text-text-secondary font-normal leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Pricing ── */}
            <p className="text-sm text-text-muted font-normal">
              <span className="font-semibold text-text-secondary">التسعير: </span>
              {sys.pricingNote}
            </p>

            {/* ── Progressive disclosure ── */}
            {sys.details.length > 0 && (
              <div className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  aria-controls={`details-${sys.id}`}
                  className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-right
                    min-h-[52px] bg-surface hover:bg-base/60 transition-colors duration-150
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="text-sm font-semibold text-text-secondary">
                    {expanded ? 'إخفاء التفاصيل' : 'تفاصيل إضافية'}
                  </span>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`text-text-muted shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-96' : 'max-h-0'}`}
                  inert={expanded ? undefined : ''}
                >
                  <div
                    id={`details-${sys.id}`}
                    role="region"
                    aria-label={`تفاصيل إضافية عن ${sys.title}`}
                    className="px-5 pb-5 pt-3 border-t border-border"
                  >
                    <ul className="space-y-3">
                      {sys.details.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-text-muted shrink-0 mt-[8px]" aria-hidden="true" />
                          <span className="text-sm text-text-secondary font-normal leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Section base — curves into dark footer */}
      <div
        className="h-10 sm:h-14 bg-navy-900"
        style={{ borderRadius: '28px 28px 0 0' }}
        aria-hidden="true"
      />
    </section>
  );
}
