import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import World from './components/world/World.jsx';
import ProjectModal from './components/ProjectModal.jsx';
// loaded on demand, so the first visit only downloads the story world
const QuickView = lazy(() => import('./components/QuickView.jsx'));
const ClaimFlowDemo = lazy(() => import('./components/ClaimFlowDemo.jsx'));
import Toast from './components/Toast.jsx';
import { profile, projects } from './data/portfolio.js';

const store = {
  get: (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* private mode: preference just isn't remembered */
    }
  },
};

const hashIs = (h) => typeof window !== 'undefined' && window.location.hash === h;

export default function App() {
  const [toast, setToast] = useState('');
  const [openId, setOpenId] = useState(null);
  const [quick, setQuick] = useState(() => hashIs('#quick'));
  const [demo, setDemo] = useState(() => hashIs('#demo'));
  const timer = useRef();
  const notify = useCallback((msg, ms = 2200) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), ms);
  }, []);

  // Lite mode: keeps the world but drops the costly light and particle effects.
  // Remembered per visitor; switched on automatically for slow devices.
  const [lite, setLite] = useState(() => {
    const saved = store.get('lite');
    if (saved !== null) return saved === '1';
    const nav = typeof navigator !== 'undefined' ? navigator : {};
    return !!(nav.connection?.saveData || (nav.deviceMemory && nav.deviceMemory <= 2));
  });
  useEffect(() => {
    document.documentElement.classList.toggle('lite', lite);
  }, [lite]);
  const toggleLite = useCallback(() => {
    setLite((v) => {
      store.set('lite', v ? '0' : '1');
      notify(v ? 'Effects on' : 'Lite mode: effects off for smoother scrolling');
      return !v;
    });
  }, [notify]);
  useEffect(() => {
    if (store.get('lite') !== null || lite) return;
    // time 30 frames during the visitor's first scroll; if it can't hold ~25 fps, go lite
    let raf;
    let started = false;
    const onScroll = () => {
      if (started) return;
      started = true;
      let n = 0;
      const t0 = performance.now();
      const step = () => {
        if (++n < 30) raf = requestAnimationFrame(step);
        else if ((performance.now() - t0) / 30 > 40 && document.visibilityState === 'visible') {
          setLite(true);
          notify('Switched to lite mode for smoother scrolling. You can turn effects back on with ✦ or in the footer.', 4500);
        }
      };
      raf = requestAnimationFrame(step);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // #quick and #demo are shareable links straight to the résumé or the live demo
  const setHash = (h) => window.history.replaceState(null, '', h || window.location.pathname + window.location.search);
  const openQuick = useCallback(() => { setQuick(true); setHash('#quick'); }, []);
  const closeQuick = useCallback(() => { setQuick(false); setHash(''); }, []);
  const openDemo = useCallback(() => { setOpenId(null); setQuick(false); setDemo(true); setHash('#demo'); }, []);
  const closeDemo = useCallback(() => { setDemo(false); setHash(''); }, []);

  const idx = projects.findIndex((p) => p.id === openId);
  const close = useCallback(() => setOpenId(null), []);
  const prev = useCallback(() => setOpenId(projects[(idx - 1 + projects.length) % projects.length].id), [idx]);
  const next = useCallback(() => setOpenId(projects[(idx + 1) % projects.length].id), [idx]);
  const demoRepo = projects.find((p) => p.demo === 'claimflow')?.repoUrl;

  return (
    <>
      <a href="#contact" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-gold-soft focus:px-4 focus:py-2 focus:text-ink">
        Skip to contact
      </a>
      <main>
        <World openProject={setOpenId} notify={notify} openQuick={openQuick} openDemo={openDemo} lite={lite} toggleLite={toggleLite} />
      </main>
      <footer className="bg-[#16213d] px-5 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} {profile.name} · Built with React + Tailwind ·{' '}
        <button onClick={openQuick} className="font-medium text-gold-soft underline-offset-4 hover:underline">Quick view</button> ·{' '}
        <button onClick={toggleLite} className="font-medium text-gold-soft underline-offset-4 hover:underline">{lite ? 'Turn effects on' : 'Lite mode'}</button> ·{' '}
        <a href={profile.siteRepo} target="_blank" rel="noreferrer" className="font-medium text-gold-soft underline-offset-4 hover:underline">View source</a>
      </footer>
      <AnimatePresence>
        {idx >= 0 && <ProjectModal key="modal" project={projects[idx]} onClose={close} onPrev={prev} onNext={next} onDemo={openDemo} />}
      </AnimatePresence>
      <Suspense fallback={null}>
        <AnimatePresence>{quick && <QuickView key="quick" onClose={closeQuick} openDemo={openDemo} />}</AnimatePresence>
        <AnimatePresence>{demo && <ClaimFlowDemo key="demo" onClose={closeDemo} repoUrl={demoRepo} />}</AnimatePresence>
      </Suspense>
      <Toast message={toast} />
    </>
  );
}
