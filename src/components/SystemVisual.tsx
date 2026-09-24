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
  center: '/images/center/center.webp',
  'online-live': '/images/online/Meet_vs._Zoom.webp',
  books: '/images/books/Books.webp',
  club: '/images/platform/progclub.webp',
} as const;

// Natural pixel dimensions of each image.
// Used for width/height attributes to prevent layout shift (CLS).
const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  center: { width: 1024, height: 683 },
  'online-live': { width: 1600, height: 656 },
  books: { width: 1024, height: 683 },
  club: { width: 1834, height: 998 },
};

const IMAGE_MAX_HEIGHTS = {
  center: 'max-h-[330px]',
  'online-live': 'max-h-[390px]',
  books: 'max-h-[330px]',
  club: 'max-h-[500px]',
} as const;

export default function SystemVisual({
  sys,
}: SystemVisualProps) {
  const [imageError, setImageError] = useState(false);

  const Icon = ICONS[sys.id];
  const imageSrc = IMAGE_SOURCES[sys.id];
  const imageMaxHeight = IMAGE_MAX_HEIGHTS[sys.id];
  const imageDims = IMAGE_DIMENSIONS[sys.id];

  return (
    <figure
      className="flex w-full items-center justify-center"
      aria-label={sys.imageAlt}
    >
      <div className="flex w-full items-center justify-center">
        {!imageError ? (
          <div className="relative flex items-center justify-center">
            <div
              className="pointer-events-none absolute inset-[6%] rounded-[28px] bg-[#4FC2BB]/[0.07] blur-2xl"
              aria-hidden="true"
            />

            <img
              src={imageSrc}
              alt={sys.imageAlt}
              width={imageDims.width}
              height={imageDims.height}
              className={`relative block h-auto max-w-full rounded-2xl object-contain ${imageMaxHeight} shadow-[0_10px_32px_rgba(15,23,42,0.10)]`}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
            />
          </div>
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
      className={`flex min-h-[220px] w-full max-w-[390px] flex-col items-center justify-center rounded-2xl ${sys.accent.bg}`}
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