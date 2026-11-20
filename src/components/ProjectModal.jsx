import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Cover from './Cover.jsx';

export default function ProjectModal({ project, onClose, onPrev, onNext }) {
  const ref = useRef(null);

  useEffect(() => {
    const prevFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'Tab') {
        // focus trap
        const f = ref.current.querySelectorAll('a[href],button:not([disabled])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocus?.focus?.();
    };
  }, [onClose, onPrev, onNext]);

  const Block = ({ title, children }) => (
    <div>
      <h4 className="font-display text-base font-bold italic text-gold">{title}</h4>
      <div className="mt-1.5 text-[15px] leading-relaxed text-quill-soft">{children}</div>
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-2xl page outline-none sm:rounded-lg"
      >
        <div className="relative">
          <Cover project={project} />
          <button onClick={onClose} aria-label="Close project" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-xl bg-ink/70 text-white backdrop-blur hover:bg-ink">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          {project.sample && (
            <p className="mb-4 rounded-lg bg-gold/15 px-3 py-2 text-sm text-[#7a5a17]">
              Sample project — replace with a real one in <code>src/data/portfolio.js</code>.
            </p>
          )}
          <h3 id="modal-title" className="font-display text-3xl font-bold text-quill">{project.title}</h3>
          <p className="mt-2 font-book italic text-quill-soft">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <Block title="Problem">{project.problem}</Block>
            <Block title="My role">{project.role}</Block>
            <Block title="Solution & key features">
              <ul className="list-disc space-y-1 pl-5">{project.features.map((f) => <li key={f}>{f}</li>)}</ul>
            </Block>
            <Block title="Outcome">{project.outcome}</Block>
          </div>
          {project.gallery?.length > 0 && (
            <div className="mt-7 grid grid-cols-2 gap-3">
              {project.gallery.map((src, i) => <img key={i} src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" className="rounded-xl" />)}
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary"><ExternalLink size={16} /> Live demo</a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost"><FaGithub size={16} /> GitHub</a>
            )}
            <div className="ml-auto flex gap-2">
              <button onClick={onPrev} aria-label="Previous project" className="grid h-11 w-11 place-items-center rounded-xl border border-quill/15 text-quill hover:border-accent-deep"><ChevronLeft size={18} /></button>
              <button onClick={onNext} aria-label="Next project" className="grid h-11 w-11 place-items-center rounded-xl border border-quill/15 text-quill hover:border-accent-deep"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
