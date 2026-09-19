import { useState, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Selector from './components/Selector';
import SystemDetail from './components/SystemDetail';
import Footer from './components/Footer';
import { systems, hashToSystemId, ID_TO_HASH } from './data/systems';
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

  // Track pending rAF IDs so rapid selection changes don't fire stale scrolls
  const pendingScrollRef = useRef<number[]>([]);

  const cancelPendingScrolls = () => {
    pendingScrollRef.current.forEach(cancelAnimationFrame);
    pendingScrollRef.current = [];
  };

  // Schedule a scroll, storing the rAF id so it can be cancelled
  const scheduleScroll = (elementId: string) => {
    cancelPendingScrolls();
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        document.getElementById(elementId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        pendingScrollRef.current = pendingScrollRef.current.filter(
          (id) => id !== r1 && id !== r2
        );
      });
      pendingScrollRef.current.push(r2);
    });
    pendingScrollRef.current.push(r1);
  };

  const pickedSys = picked ? (systems.find((s) => s.id === picked) ?? null) : null;

  // ── Deep-link: read hash on mount and on hashchange ──────────────────────
  useEffect(() => {
    const activate = (hash: string) => {
      const id = hashToSystemId(hash);
      if (id) {
        setPicked(id);
        setShowDetail(true);
        // Scroll after both state update and DOM render are complete.
        // Use a slightly longer delay for the initial mount case (deep-link on refresh)
        // because React needs to render SystemDetail before we can scroll to it.
        cancelPendingScrolls();
        const r1 = requestAnimationFrame(() => {
          const r2 = requestAnimationFrame(() => {
            // If element isn't in DOM yet (very slow device), try once more
            const el = document.getElementById('system-detail');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            pendingScrollRef.current = pendingScrollRef.current.filter(
              (rid) => rid !== r1 && rid !== r2
            );
          });
          pendingScrollRef.current.push(r2);
        });
        pendingScrollRef.current.push(r1);
      } else {
        // Unrecognised or empty hash — reset without scrolling
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePick = useCallback((id: SystemId) => {
    // Cancel any scroll that was scheduled for the previous selection
    cancelPendingScrolls();

    if (picked === id) {
      setPicked(null);
      setShowDetail(false);
      clearHash();
    } else {
      setPicked(id);
      setShowDetail(false);   // detail hidden until user explicitly requests it
      setHash(ID_TO_HASH[id]);
    }
    // cancelPendingScrolls is stable (ref-based), no deps needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  const handleViewDetail = useCallback(() => {
    setShowDetail(true);
    scheduleScroll('system-detail');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = useCallback(() => {
    cancelPendingScrolls();
    setShowDetail(false);
    setPicked(null);
    clearHash();
    scheduleScroll('selector');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    /*
      Root background is navy-900 — the hero and footer share this dark bg.
      Light sections (Selector, SystemDetail) override with their own bg classes.
    */
    <div className="min-h-screen bg-navy-900 font-arabic">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] btn-primary text-sm"
      >
        تخطى للمحتوى الرئيسي
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Selector
          picked={picked}
          onPick={handlePick}
          onViewDetail={handleViewDetail}
          showDetail={showDetail}
        />
        {showDetail && pickedSys && (
          <SystemDetail sys={pickedSys} onReset={handleReset} />
        )}
      </main>

      <Footer hasPick={!!picked} pickedSys={pickedSys} />
    </div>
  );
}
