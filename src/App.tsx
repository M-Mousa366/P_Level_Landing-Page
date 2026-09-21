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

function setHash(slug: string) {
  history.pushState(null, '', `${window.location.pathname}#${slug}`);
}

function clearHash() {
  history.pushState(null, '', window.location.pathname);
}

export default function App() {
  const [picked, setPicked] = useState<SystemId | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const pendingScrollRef = useRef<number[]>([]);

  const cancelPendingScrolls = useCallback(() => {
    pendingScrollRef.current.forEach(cancelAnimationFrame);
    pendingScrollRef.current = [];
  }, []);

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

  useEffect(() => {
    const activate = (hash: string) => {
      const id = hashToSystemId(hash);

      if (id) {
        setPicked(id);
        setShowDetail(true);

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

  const handlePick = useCallback(
    (id: SystemId) => {
      cancelPendingScrolls();

      if (picked === id) {
        setPicked(null);
        setShowDetail(false);
        clearHash();

        scheduleScroll('selector');
        return;
      }

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