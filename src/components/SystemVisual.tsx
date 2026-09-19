import { useState } from 'react';
import { Users, Monitor, BookOpen, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { System } from '../data/systems';

/*
  ── IMAGE REPLACEMENT GUIDE ─────────────────────────────────────────────────
  Replace SVG placeholders with real photos:

  1. Add images to /public/images/:
       center/classroom-session.webp   (preferred) or .jpg
       online/home-live-session.webp
       books/programming-books-bundle.webp
       platform/programmers-club-dashboard.webp

  2. Update imageSrc in src/data/systems.ts, e.g.:
       imageSrc: '/images/center/classroom-session.webp'

  3. Done. The inline SVG only shows if the image fails to load.

  Specs: 4:3 ratio, 800×600px minimum, WebP < 200 KB each.
*/

interface Props { sys: System }

const iconMap: Record<string, LucideIcon> = {
  center: Users,
  'online-live': Monitor,
  books: BookOpen,
  club: Zap,
};

// Inline SVG fallback — aria-hidden since the figure already has aria-label
function FallbackIllustration({ id }: { id: string }) {
  if (id === 'center') return (
    <svg viewBox="0 0 480 360" className="w-full h-full" aria-hidden="true" focusable="false">
      <rect width="480" height="360" fill="white" fillOpacity="0.3" />
      <rect x="40" y="30" width="320" height="180" rx="6" fill="white" fillOpacity="0.8" />
      <rect x="56" y="50" width="140" height="10" rx="4" fill="#1a1a2e" opacity="0.18" />
      <rect x="56" y="68" width="200" height="8" rx="3" fill="#1a1a2e" opacity="0.12" />
      <rect x="56" y="84" width="160" height="8" rx="3" fill="#14a085" opacity="0.28" />
      <rect x="56" y="100" width="180" height="8" rx="3" fill="#1a1a2e" opacity="0.10" />
      <rect x="56" y="116" width="120" height="8" rx="3" fill="#1a1a2e" opacity="0.08" />
      <circle cx="400" cy="80" r="18" fill="#1a1a2e" opacity="0.14" />
      <rect x="390" y="100" width="20" height="30" rx="5" fill="#1a1a2e" opacity="0.10" />
      {[44, 108, 172, 236].map((x) => (
        <g key={x}>
          <circle cx={x + 24} cy="264" r="14" fill="#1a1a2e" opacity="0.12" />
          <rect x={x} y="280" width="48" height="30" rx="4" fill="white" fillOpacity="0.6" />
        </g>
      ))}
    </svg>
  );

  if (id === 'online-live') return (
    <svg viewBox="0 0 480 360" className="w-full h-full" aria-hidden="true" focusable="false">
      <rect width="480" height="360" fill="white" fillOpacity="0.3" />
      <rect x="60" y="44" width="360" height="224" rx="12" fill="#1a1a2e" opacity="0.08" />
      <rect x="72" y="56" width="336" height="200" rx="6" fill="white" />
      <rect x="80" y="64" width="152" height="86" rx="5" fill="#1a1a2e" opacity="0.07" />
      <rect x="244" y="64" width="152" height="86" rx="5" fill="#1a1a2e" opacity="0.11" />
      <circle cx="156" cy="100" r="16" fill="#1a1a2e" opacity="0.14" />
      <circle cx="320" cy="100" r="16" fill="#1a1a2e" opacity="0.18" />
      <rect x="80" y="158" width="152" height="86" rx="5" fill="#1a1a2e" opacity="0.05" />
      <rect x="244" y="158" width="152" height="86" rx="5" fill="#1a1a2e" opacity="0.05" />
      <rect x="352" y="68" width="52" height="18" rx="4" fill="#ef4444" opacity="0.85" />
      <text x="378" y="81" fontSize="9" textAnchor="middle" fill="white" fontFamily="sans-serif" fontWeight="bold">LIVE</text>
      <rect x="40" y="270" width="400" height="14" rx="7" fill="white" fillOpacity="0.5" />
    </svg>
  );

  if (id === 'books') return (
    <svg viewBox="0 0 480 360" className="w-full h-full" aria-hidden="true" focusable="false">
      <rect width="480" height="360" fill="white" fillOpacity="0.3" />
      <rect x="48" y="224" width="384" height="52" rx="6" fill="#1a1a2e" opacity="0.08" />
      <rect x="48" y="224" width="26" height="52" rx="4" fill="#1a1a2e" opacity="0.16" />
      <rect x="58" y="162" width="364" height="56" rx="6" fill="white" fillOpacity="0.72" />
      <rect x="58" y="162" width="24" height="56" rx="4" fill="#1a1a2e" opacity="0.18" />
      <rect x="68" y="96" width="344" height="62" rx="6" fill="white" />
      <rect x="68" y="96" width="26" height="62" rx="4" fill="#1a1a2e" opacity="0.24" />
      <rect x="108" y="112" width="160" height="10" rx="4" fill="#1a1a2e" opacity="0.16" />
      <rect x="108" y="128" width="120" height="8" rx="3" fill="#1a1a2e" opacity="0.10" />
      <rect x="108" y="142" width="90" height="7" rx="3" fill="#1a1a2e" opacity="0.08" />
      <rect x="306" y="80" width="80" height="26" rx="13" fill="#1a1a2e" opacity="0.10" />
      <text x="346" y="98" fontSize="12" textAnchor="middle" fill="#2d2d44" fontFamily="sans-serif" fontWeight="700">3 كتب</text>
    </svg>
  );

  return ( // club
    <svg viewBox="0 0 480 360" className="w-full h-full" aria-hidden="true" focusable="false">
      <rect width="480" height="360" fill="white" fillOpacity="0.3" />
      <rect x="30" y="24" width="420" height="312" rx="12" fill="white" fillOpacity="0.55" />
      <rect x="30" y="24" width="420" height="40" rx="12" fill="#1a1a2e" opacity="0.08" />
      {[54, 74, 94].map((x) => <circle key={x} cx={x} cy="44" r="6" fill="white" opacity="0.5" />)}
      {[46, 162, 278].map((x) => (
        <g key={x}>
          <rect x={x} y="82" width="100" height="56" rx="7" fill="white" />
          <rect x={x + 10} y="96" width="40" height="7" rx="3" fill="#1a1a2e" opacity="0.12" />
          <rect x={x + 10} y="110" width="28" height="12" rx="3" fill="#14a085" opacity="0.22" />
        </g>
      ))}
      <rect x="46" y="152" width="388" height="72" rx="7" fill="white" />
      {[0, 1, 2, 3, 4].map((i) => {
        const h = [28, 42, 20, 50, 36][i];
        return <rect key={i} x={62 + i * 72} y={212 - h} width="30" height={h} rx="4" fill="#14a085" opacity={0.16 + i * 0.05} />;
      })}
      <rect x="46" y="240" width="388" height="78" rx="7" fill="white" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={62 + i * 132} y="254" width="14" height="14" rx="3" fill="#14a085" opacity="0.28" />
          <rect x={84 + i * 132} y="256" width="80" height="7" rx="3" fill="#1a1a2e" opacity="0.10" />
          <rect x={84 + i * 132} y="270" width="56" height="5" rx="3" fill="#1a1a2e" opacity="0.07" />
        </g>
      ))}
    </svg>
  );
}

export default function SystemVisual({ sys }: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const Icon = iconMap[sys.id];

  return (
    /*
      role="img" + aria-label on <figure> provides a single accessible name.
      The <img> inside uses alt="" when the figure already describes the image,
      but since the img IS the meaningful image we keep the alt on it for
      cases where the figure role is not well supported.
      When using the fallback SVG, the figure aria-label is sufficient and
      the SVG elements are all aria-hidden.
    */
    <figure
      role="img"
      aria-label={sys.imageAlt}
      className={`relative w-full rounded-2xl overflow-hidden aspect-[16/9] ${sys.accent.bg} border ${sys.accent.border}`}
    >
      {!imgFailed ? (
        // Meaningful image — alt matches figure aria-label for maximum compat
        <img
          src={sys.imageSrc}
          alt={sys.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      ) : (
        // Fallback illustration — all SVG elements are aria-hidden,
        // the figure's aria-label provides the accessible description
        <div className="absolute inset-0 p-4 sm:p-8">
          <FallbackIllustration id={sys.id} />
        </div>
      )}

      {/* Inset border overlay */}
      <div
        className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.05] pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative badge — aria-hidden, info already in the heading */}
      <div
        className={`absolute bottom-3 right-3 flex items-center gap-1.5
          px-2 py-1.5 sm:px-2.5 rounded-lg
          ${sys.accent.iconBg} border ${sys.accent.border}
          shadow-sm backdrop-blur-sm max-w-[calc(100%-1.5rem)]`}
        aria-hidden="true"
      >
        <Icon size={13} className={`${sys.accent.text} shrink-0`} />
        <span className={`text-xs font-bold ${sys.accent.text} leading-none truncate`}>
          {sys.title}
        </span>
      </div>
    </figure>
  );
}
