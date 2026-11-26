import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Award, Download, ExternalLink, Mail, MapPin, Play, Printer, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { experience, profile, projects, skills } from '../data/portfolio.js';

// A plain, one-page résumé of everything in the story world, for people who want
// the facts in 30 seconds. Printable (only this sheet prints) and linkable at #quick.
export default function QuickView({ onClose, openDemo }) {
  const ref = useRef(null);
  const work = experience.find((e) => e.type === 'work');
  const edu = experience.find((e) => e.type === 'education');

  useEffect(() => {
    const prev = document.activeElement;
    document.body.style.overflow = 'hidden';
    ref.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [onClose]);

  const H = ({ children }) => <h2 className="mb-3 mt-8 border-b border-quill/15 pb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-deep print:mt-5">{children}</h2>;

  return createPortal(
    <motion.div className="print-area fixed inset-0 z-[75] overflow-y-auto bg-[#0b1020]/80 backdrop-blur-sm print:static print:bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      {/* toolbar */}
      <div className="no-print sticky top-0 z-10 flex items-center gap-2 border-b border-white/10 bg-[#0b1020]/90 px-4 py-2.5 backdrop-blur sm:px-6">
        <p className="flex-1 font-display text-lg font-bold text-white">Quick view</p>
        <button onClick={() => window.print()} className="dbtn-line !min-h-[38px] !px-3 text-sm"><Printer size={15} /> <span className="hidden sm:inline">Print</span></button>
        <a href={profile.cvUrl} download className="dbtn-gold !min-h-[38px] !px-3 text-sm"><Download size={15} /> <span className="hidden sm:inline">CV (PDF)</span></a>
        <button onClick={onClose} aria-label="Close quick view" className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-slate-200 hover:border-gold-soft hover:text-gold-soft"><X size={18} /></button>
      </div>

      <motion.article
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${profile.name}, résumé`}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="page mx-auto my-6 w-[min(860px,calc(100%-24px))] px-6 py-8 outline-none sm:my-10 sm:px-12 sm:py-12 print:my-0 print:w-full print:px-0 print:py-0 print:shadow-none"
      >
        {/* header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold leading-none text-quill sm:text-5xl">{profile.name}</h1>
            <p className="mt-2 font-display text-lg italic text-accent-deep">{profile.headline}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-quill-soft">
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {profile.location}</span>
              <span>{profile.availability}</span>
            </p>
          </div>
          <ul className="flex flex-col gap-1 text-sm sm:items-end">
            <li><a className="inline-flex items-center gap-1.5 font-medium text-quill hover:text-accent-deep" href={`mailto:${profile.socials.email}`}><Mail size={14} /> {profile.socials.email}</a></li>
            <li><a className="inline-flex items-center gap-1.5 font-medium text-quill hover:text-accent-deep" href={profile.socials.github} target="_blank" rel="noreferrer"><FaGithub size={14} /> github.com/Ck666-cpu</a></li>
            <li><a className="inline-flex items-center gap-1.5 font-medium text-quill hover:text-accent-deep" href={profile.socials.linkedin} target="_blank" rel="noreferrer"><FaLinkedin size={14} /> LinkedIn</a></li>
          </ul>
        </header>

        <ul className="mt-6 grid grid-cols-3 gap-3 border-y border-quill/10 py-4 text-center">
          {profile.stats.map((s) => (
            <li key={s.label}>
              <p className="font-display text-2xl font-bold text-quill">{s.decimals ? s.value.toFixed(s.decimals) : s.value}{s.suffix || ''}</p>
              <p className="text-xs uppercase tracking-wider text-quill-soft">{s.label}</p>
            </li>
          ))}
        </ul>

        <H>Summary</H>
        <p className="font-book text-[16px] leading-relaxed text-quill-soft">
          Software Engineering graduate (CGPA 3.91, 4× President&apos;s List) with six months of Site Reliability / Java backend experience on fund-risk systems at Ant International. I build Java / Spring Boot services and REST APIs, tune SQL over large transaction datasets, and ship tested code through Git CI/CD. I also build event-driven microservices with Kafka and the transactional outbox pattern, and I&apos;m keen to work in Go. AWS certified.
        </p>

        <H>Experience</H>
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[17px] font-bold text-quill">{work.title}</h3>
            <span className="text-sm text-quill-soft">{work.start} – {work.end}</span>
          </div>
          <p className="text-sm font-semibold text-accent-deep">{work.org} · Kuala Lumpur</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-quill-soft">
            {work.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>

        <H>Projects</H>
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[17px] font-bold text-quill">{p.title}</h3>
                <span className="flex gap-3 text-sm">
                  {p.demo && <button onClick={openDemo} className="no-print inline-flex items-center gap-1 font-semibold text-accent-deep hover:underline"><Play size={13} fill="currentColor" /> Live demo</button>}
                  <a href={p.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-accent-deep hover:underline"><FaGithub size={13} /> Code <ExternalLink size={11} className="no-print" /></a>
                </span>
              </div>
              <p className="text-xs font-medium text-quill-soft">{p.tech.join(' · ')}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-quill-soft">{p.summary}</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[14px] leading-relaxed text-quill-soft">
                {p.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}
              </ul>
              <p className="mt-1 text-[14px] font-semibold text-quill">Outcome: <span className="font-normal text-quill-soft">{p.outcome}</span></p>
            </div>
          ))}
        </div>

        <H>Education</H>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-[17px] font-bold text-quill">{edu.title} · CGPA 3.91 / 4.00</h3>
          <span className="text-sm text-quill-soft">{edu.start} – {edu.end}</span>
        </div>
        <p className="text-sm font-semibold text-accent-deep">{edu.org}</p>
        <p className="mt-1.5 flex flex-wrap gap-2">
          {edu.honours.map((h) => <span key={h} className="chip"><Award size={12} className="mr-1" />{h}</span>)}
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-quill-soft"><b className="text-quill">Coursework:</b> {edu.coursework.join(', ')}.</p>

        <H>Skills</H>
        <dl className="grid gap-2 text-[14px] sm:grid-cols-[150px_1fr]">
          {skills.filter((g) => g.category !== 'Soft skills').map((g) => (
            <div key={g.category} className="contents">
              <dt className="font-semibold text-quill">{g.category}</dt>
              <dd className="text-quill-soft">{g.items.map((s) => s.name).join(', ')}</dd>
            </div>
          ))}
          <dt className="font-semibold text-quill">Certifications</dt>
          <dd className="text-quill-soft">{profile.certifications.join(', ')}</dd>
          <dt className="font-semibold text-quill">Languages</dt>
          <dd className="text-quill-soft">English (proficient), Mandarin (native), Cantonese (native), Malay (advanced)</dd>
        </dl>

        <p className="no-print mt-10 text-center text-sm text-quill-soft">
          Prefer the story? <button onClick={onClose} className="font-semibold text-accent-deep hover:underline">Back to the walk through my journey</button>
        </p>
      </motion.article>
    </motion.div>,
    document.body,
  );
}
