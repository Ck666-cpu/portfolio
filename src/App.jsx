import { useCallback, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import World from './components/world/World.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import Toast from './components/Toast.jsx';
import { profile, projects } from './data/portfolio.js';

export default function App() {
  const [toast, setToast] = useState('');
  const [openId, setOpenId] = useState(null);
  const timer = useRef();
  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2200);
  }, []);

  const idx = projects.findIndex((p) => p.id === openId);
  const close = useCallback(() => setOpenId(null), []);
  const prev = useCallback(() => setOpenId(projects[(idx - 1 + projects.length) % projects.length].id), [idx]);
  const next = useCallback(() => setOpenId(projects[(idx + 1) % projects.length].id), [idx]);

  return (
    <>
      <a href="#contact" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-gold-soft focus:px-4 focus:py-2 focus:text-ink">
        Skip to contact
      </a>
      <main>
        <World openProject={setOpenId} notify={notify} />
      </main>
      <footer className="bg-[#16213d] px-5 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} {profile.name} · Built with React + Tailwind ·{' '}
        <a href={profile.siteRepo} target="_blank" rel="noreferrer" className="font-medium text-gold-soft underline-offset-4 hover:underline">View source</a>
      </footer>
      <AnimatePresence>
        {idx >= 0 && <ProjectModal key="modal" project={projects[idx]} onClose={close} onPrev={prev} onNext={next} />}
      </AnimatePresence>
      <Toast message={toast} />
    </>
  );
}
