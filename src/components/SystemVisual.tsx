import { useState } from 'react';
import { Users, Monitor, BookOpen, Zap } from 'lucide-react';

import type { System } from '../data/systems';

interface SystemVisualProps {
  sys: System;
}

const ICONS = {
  center: Users,
  'online-live': Monitor,
  books: BookOpen,
  club: Zap,
} as const;

const IMAGE_SOURCES = {
  center: '/images/center/center.png',
  'online-live': '/images/online/Meet_vs._Zoom.png',
  books: '/images/books/Books.png',
  club: '/images/platform/progclub.png',
} as const;

export default function SystemVisual({
  sys,
}: SystemVisualProps) {
  const [imageError, setImageError] = useState(false);

  const Icon = ICONS[sys.id];
  const imageSrc = IMAGE_SOURCES[sys.id];

  return (
    <figure
      className="relative overflow-hidden rounded-2xl border border-border bg-white"
      aria-label={sys.imageAlt}
    >
      {/* Fixed visual area */}
      <div
        className="
          flex
          h-[280px]
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-[#f8fafc]
          p-4
          sm:h-[340px]
          sm:p-5
          lg:h-[390px]
          lg:p-6
        "
      >
        {!imageError ? (
          <img
            src={imageSrc}
            alt={sys.imageAlt}
            className="block max-h-full max-w-full object-contain"
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
        ) : (
          <FallbackVisual
            sys={sys}
            Icon={Icon}
          />
        )}
      </div>
    </figure>
  );
}

function FallbackVisual({
  sys,
  Icon,
}: {
  sys: System;
  Icon: React.ComponentType<{
    size?: string | number;
    className?: string;
  }>;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center rounded-xl ${sys.accent.bg}`}
      role="img"
      aria-label={sys.imageAlt}
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${sys.accent.iconBg}`}
      >
        <Icon
          size={30}
          className={sys.accent.text}
          aria-hidden="true"
        />
      </div>

      <span
        className={`mt-4 text-sm font-[700] ${sys.accent.text}`}
      >
        {sys.title}
      </span>
    </div>
  );
}