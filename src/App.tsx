import { useState, useCallback, useEffect, useRef } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import Selector from './components/Selector';
import SystemDetail from './components/SystemDetail';
import Footer from './components/Footer';

import {
  systems,
  hashToSystemId,
  ID_TO_HASH,
} from './data/systems';

import type { SystemId } from './data/systems';

// ── URL hash helpers ──────────────────────────────────────────────────────────

function setHash(slug: string) {
  history.pushState(null, '', `${window.location.pathname}#${slug}`);
}

function clearHash() {
  history.pushState(null, '', window.location.pathname);
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [picked, setPicked] = useState<SystemId | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Refs that track in-flight rAF and timeout IDs so any pending scroll can
  // be cancelled when a new interaction supersedes it.
  const rafRef = useRef<number[]>([]);
  const timeoutRef = useRef<number | null>(null);

  // Cancel every pending scroll operation (rAF frames + setTimeout).
  const cancelPendingScrolls = useCallback(() => {
    rafRef.current.forEach(cancelAnimationFrame);
    rafRef.current = [];

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Schedule a smooth scroll to `elementId`.
  // Waits two rAF frames (so React has painted) then 80 ms (existing timing —
  // gives CSS entrance animations time to start before scrollIntoView fires).
  // All IDs are stored so cancelPendingScrolls() can abort a stale scroll.
  const scheduleScroll = useCallback(
    (elementId: string) => {
      cancelPendingScrolls();

      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => {
          timeoutRef.current = window.setTimeout(() => {
            document.getElementById(elementId)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            // Clean up after firing
            timeoutRef.current = null;
            rafRef.current = rafRef.current.filter((id) => id !== r1 && id !== r2);
          }, 80);

          rafRef.current = rafRef.current.filter((id) => id !== r1);
          rafRef.current.push(r2);
        });

        rafRef.current = rafRef.current.filter((id) => id !== r1);
        rafRef.current.push(r1);
      });

      rafRef.current.push(r1);
    },
    [cancelPendingScrolls]
  );

  const pickedSys = picked
    ? systems.find((system) => system.id === picked) ?? null
    : null;

  // ── Deep-link: activate on mount and on browser back/forward ─────────────

  useEffect(() => {
    const activate = (hash: string) => {
      const id = hashToSystemId(hash);

      if (id) {
        setPicked(id);
        setShowDetail(true);
        // scheduleScroll handles its own cancellation
        scheduleScroll('system-detail');
      } else {
        // Empty or unknown hash — reset to default state
        setPicked(null);
        setShowDetail(false);
        cancelPendingScrolls();
      }
    };

    activate(window.location.hash);

    const onHashChange = () => activate(window.location.hash);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      cancelPendingScrolls();
    };
  }, [scheduleScroll, cancelPendingScrolls]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handlePick = useCallback(
    (id: SystemId) => {
      cancelPendingScrolls();

      if (picked === id) {
        // Deselect
        setPicked(null);
        setShowDetail(false);
        clearHash();
        scheduleScroll('selector');
        return;
      }

      // Select
      setPicked(id);
      setShowDetail(true);
      setHash(ID_TO_HASH[id]);
      scheduleScroll('system-detail');
    },
    [picked, cancelPendingScrolls, scheduleScroll]
  );

  const handleReset = useCallback(() => {
    cancelPendingScrolls();
    setShowDetail(false);
    setPicked(null);
    clearHash();
    scheduleScroll('selector');
  }, [cancelPendingScrolls, scheduleScroll]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-navy-900 font-arabic">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:right-3 focus:top-3 focus:z-[100] btn-primary text-sm"
      >
        تخطى للمحتوى الرئيسي
      </a>

      <Header />

      <main id="main">
        <Hero />

        <Selector
          picked={picked}
          onPick={handlePick}
        />

        {showDetail && pickedSys && (
          <SystemDetail
            key={pickedSys.id}
            sys={pickedSys}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
