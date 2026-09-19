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

// ── Hash management ───────────────────────────────────────────────────────────

function setHash(slug: string) {
  history.pushState(null, '', `${window.location.pathname}#${slug}`);
}

function clearHash() {
  history.pushState(null, '', window.location.pathname);
}

export default function App() {
  const [picked, setPicked] = useState<SystemId | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Track pending animation frames so rapid interactions
  // don't trigger stale scroll operations.
  const pendingScrollRef = useRef<number[]>([]);

  const cancelPendingScrolls = useCallback(() => {
    pendingScrollRef.current.forEach(cancelAnimationFrame);
    pendingScrollRef.current = [];
  }, []);

  // Schedule a scroll after the DOM has updated.
  const scheduleScroll = useCallback(
    (elementId: string) => {
      cancelPendingScrolls();

      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => {
          document.getElementById(elementId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

          pendingScrollRef.current =
            pendingScrollRef.current.filter(
              (id) => id !== r1 && id !== r2
            );
        });

        pendingScrollRef.current.push(r2);
      });

      pendingScrollRef.current.push(r1);
    },
    [cancelPendingScrolls]
  );

  const pickedSys = picked
    ? systems.find((system) => system.id === picked) ?? null
    : null;

  // ── Deep-link: read hash on mount and on hashchange ────────────────────────

  useEffect(() => {
    const activate = (hash: string) => {
      const id = hashToSystemId(hash);

      if (id) {
        setPicked(id);
        setShowDetail(true);

        // Wait until SystemDetail has rendered before scrolling to it.
        cancelPendingScrolls();

        const r1 = requestAnimationFrame(() => {
          const r2 = requestAnimationFrame(() => {
            const element =
              document.getElementById('system-detail');

            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }

            pendingScrollRef.current =
              pendingScrollRef.current.filter(
                (rid) => rid !== r1 && rid !== r2
              );
          });

          pendingScrollRef.current.push(r2);
        });

        pendingScrollRef.current.push(r1);
      } else {
        // Empty or unknown hash.
        setPicked(null);
        setShowDetail(false);
        cancelPendingScrolls();
      }
    };

    activate(window.location.hash);

    const onHashChange = () => {
      activate(window.location.hash);
    };

    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      cancelPendingScrolls();
    };
  }, [cancelPendingScrolls]);

  // ── Selection handler ─────────────────────────────────────────────────────

  const handlePick = useCallback(
    (id: SystemId) => {
      cancelPendingScrolls();

      // Clicking the currently selected system toggles it off.
      if (picked === id) {
        setPicked(null);
        setShowDetail(false);
        clearHash();

        scheduleScroll('selector');
        return;
      }

      // Select the new system.
      setPicked(id);
      setShowDetail(true);
      setHash(ID_TO_HASH[id]);

      // Wait for SystemDetail to render, then scroll to it.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document
            .getElementById('system-detail')
            ?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
        });
      });
    },
    [picked, cancelPendingScrolls, scheduleScroll]
  );

  // ── Reset / choose another system ─────────────────────────────────────────

  const handleReset = useCallback(() => {
    cancelPendingScrolls();

    setShowDetail(false);
    setPicked(null);
    clearHash();

    scheduleScroll('selector');
  }, [cancelPendingScrolls, scheduleScroll]);

  return (
    <div className="min-h-screen bg-navy-900 font-arabic">
      {/* Skip navigation */}
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
            sys={pickedSys}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer
        hasPick={!!picked}
        pickedSys={pickedSys}
      />
    </div>
  );
}