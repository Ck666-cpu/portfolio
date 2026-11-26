import { useState } from 'react';
import { Bot, CalendarCheck, Copy, Download, Ear, GraduationCap, Heart, LoaderCircle, Mail, MapPin, Rocket, Search, Send, Star } from 'lucide-react';
import { FaAws, FaDocker, FaGitAlt, FaGithub, FaJava, FaLinkedin, FaLinux, FaPython } from 'react-icons/fa';
import { SiApachekafka, SiElasticsearch, SiSolidity, SiSpringboot } from 'react-icons/si';
import { Award, Clock, Database, Drama, FileText, FlaskConical, Globe, Play, GraduationCap as Grad, Lightbulb, MessagesSquare, Network, Plug, Share2, Shuffle, Terminal, Users, Workflow } from 'lucide-react';
import { character, experience, formspreeId, interests, principles, profile, projects, skills } from '../../data/portfolio.js';
import { useTyping } from '../../hooks/useTyping.js';
import ItemArt from '../ItemArt.jsx';

const SKILL_ICONS = {
  java: FaJava, spring: SiSpringboot, sql: Database, python: FaPython, kafka: SiApachekafka,
  aws: FaAws, docker: FaDocker, cicd: Workflow, git: FaGitAlt, linux: FaLinux,
  ai: Bot, playwright: Drama, chat: MessagesSquare, team: Users, bulb: Lightbulb, globe: Globe,
  distributed: Share2, elastic: SiElasticsearch, solidity: SiSolidity, cli: Terminal, mcp: Plug, grad: Grad, ear: Ear, shuffle: Shuffle, clock: Clock, test: FlaskConical,
};
const P_ICONS = { search: Search, rocket: Rocket, bot: Bot, ear: Ear };

const H = ({ children }) => <h2 className="font-display text-[26px] font-bold leading-tight text-white sm:text-[30px]">{children}</h2>;
const P = ({ children, className = '' }) => <p className={`mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base ${className}`}>{children}</p>;

function HomePanel({ go, openQuick }) {
  const typed = useTyping(profile.roles);
  return (
    <>
      <h1 className="font-display text-[38px] font-bold leading-none text-white sm:text-[46px]">Jeff Lam</h1>
      <p className="mt-2 min-h-[1.4em] font-display text-xl italic text-accent-soft" aria-label={profile.roles.join(', ')}>
        <span aria-hidden>{typed}</span><span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-current align-[-0.1em]" />
      </p>
      <P>{profile.tagline}</P>
      <ul className="mt-4 flex flex-wrap gap-2">
        <li className="dchip"><MapPin size={14} className="text-gold-soft" /> {profile.location}</li>
        <li className="dchip"><CalendarCheck size={14} className="text-gold-soft" /> Available from 1 Dec 2026</li>
        <li className="dchip"><GraduationCap size={14} className="text-gold-soft" /> CGPA 3.91</li>
      </ul>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <button onClick={() => go(1)} className="dbtn-gold">Start the journey →</button>
        <button onClick={() => go(3)} className="dbtn-line">See projects</button>
        <button onClick={openQuick} className="dbtn-line"><FileText size={16} /> Quick view</button>
        <a href={profile.cvUrl} download className="dbtn-line"><Download size={16} /> CV</a>
      </div>
      <div className="mt-4 flex gap-2">
        {[[profile.socials.github, 'GitHub', FaGithub], [profile.socials.linkedin, 'LinkedIn', FaLinkedin], [`mailto:${profile.socials.email}`, 'Email', Mail]].map(([href, l, I]) => (
          <a key={l} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={l} className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-slate-200 hover:border-gold-soft hover:text-gold-soft"><I size={18} /></a>
        ))}
      </div>
    </>
  );
}

function AcademyPanel() {
  const edu = experience.find((e) => e.type === 'education');
  return (
    <>
      <H>{edu.title}</H>
      <p className="mt-1 font-semibold text-accent-soft">TAR UMT · {edu.start} – {edu.end} · CGPA 3.91 / 4.00</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {edu.honours.map((h) => <li key={h} className="dchip"><Award size={14} className="text-gold-soft" /> {h}</li>)}
        {profile.certifications.map((c) => <li key={c} className="dchip"><Award size={14} className="text-accent-soft" /> {c}</li>)}
      </ul>
      <P>{profile.bio[0]}</P>
      <P>{profile.bio[1]}</P>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-gold-soft/80">How I work</p>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {principles.map((p) => {
          const I = P_ICONS[p.icon];
          return <li key={p.title} className="flex items-center gap-2 rounded-md bg-white/[0.05] px-3 py-2 text-sm font-medium text-slate-100"><I size={16} className="shrink-0 text-accent-soft" /> {p.title}</li>;
        })}
      </ul>
    </>
  );
}

function WorkshopPanel({ openTree }) {
  return (
    <>
      <H>Tools of the trade</H>
      <P>What I build with, grouped the way I use it.</P>
      <button onClick={openTree} className="dbtn-gold mt-4 !min-h-[40px] text-sm"><Network size={16} /> Open the skill tree</button>
      <div className="mt-4 space-y-4">
        {skills.map((g) => (
          <div key={g.category}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-soft/80">{g.category}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {g.items.map((s) => {
                const I = SKILL_ICONS[s.icon] || Lightbulb;
                return <li key={s.name} className="dchip"><I size={14} className="text-accent-soft" /> {s.name}</li>;
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function QuestPanel({ openProject, openDemo }) {
  return (
    <>
      <H>Selected projects</H>
      <P>Pick a quest to read the problem, my role, the stack and the outcome.</P>
      <button onClick={openDemo} className="demo-callout group mt-4 flex w-full items-center gap-3 rounded-lg p-3 text-left">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft/20 text-accent-soft"><Play size={18} fill="currentColor" /></span>
        <span className="flex-1">
          <span className="block font-semibold text-white">Live demo: ClaimFlow in your browser</span>
          <span className="block text-[13px] text-slate-400">Submit claims, take Kafka down, crash the relay and watch the outbox keep every event safe.</span>
        </span>
      </button>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p.id}>
            <button onClick={() => openProject(p.id)} className="group h-full w-full rounded-lg border border-white/10 bg-white/[0.04] p-3.5 text-left transition hover:-translate-y-0.5 hover:border-gold-soft/60 hover:bg-white/[0.08]">
              <div className="flex items-center gap-2">
                {p.featured && <Star size={13} className="text-gold-soft" fill="currentColor" />}
                <span className="font-semibold text-white">{p.title}</span>
                {p.sample && <span className="ml-auto rounded bg-amber-400/90 px-1.5 py-0.5 text-[10px] font-bold text-amber-950">SAMPLE</span>}
              </div>
              <p className="mt-1 text-[13px] leading-snug text-slate-400">{p.summary}</p>
              <p className="mt-2 text-[12px] font-medium text-accent-soft">{p.tech.join(' · ')}</p>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function CityPanel() {
  const w = experience.find((e) => e.type === 'work');
  return (
    <>
      <H>{w.title}</H>
      <p className="mt-1 font-semibold text-accent-soft">{w.org} · {w.start} – {w.end}</p>
      <P>{profile.bio[2]}</P>
      <ul className="mt-4 space-y-2.5">
        {w.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-slate-200"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-soft" />{b}</li>
        ))}
      </ul>
    </>
  );
}

function ParkPanel({ score, shoot }) {
  const [i, setI] = useState(0);
  const cur = interests[i];
  return (
    <>
      <H>Beyond the code</H>
      <P>What I read, watch and play away from the keyboard.</P>
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-orange-400/30 bg-orange-500/10 px-3.5 py-2.5">
        <span className="text-sm text-orange-100">Press <kbd className="rounded border border-white/25 bg-white/10 px-1.5 py-0.5 font-mono text-xs">Space</kbd> to shoot a basket</span>
        <button onClick={shoot} className="dbtn !min-h-[36px] bg-orange-500 !px-3 text-sm text-white hover:bg-orange-400">Shoot</button>
        <span className="ml-auto font-mono text-sm font-semibold text-orange-200" aria-live="polite">{score.made}/{score.total}</span>
      </div>
      <div role="listbox" aria-label="Interests" className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-9">
        {interests.map((it, k) => (
          <button key={it.title} role="option" aria-selected={k === i} aria-label={it.title} onClick={() => setI(k)} onMouseEnter={() => setI(k)}
            className={`grid aspect-square place-items-center rounded-lg border transition ${k === i ? 'border-gold-soft bg-white/10' : 'border-white/10 bg-white/[0.03] hover:border-white/30'}`}>
            <ItemArt art={it.art} className="h-[78%] w-auto" />
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-white/[0.05] p-3.5" role="status">
        <p className="font-semibold text-white">{cur.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">{cur.text}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {character.traits.map((t) => <span key={t} className="dchip"><Heart size={13} className="text-rose-400" /> {t}</span>)}
        <span className="dchip"><Globe size={13} className="text-accent-soft" /> {character.languages.join(' · ')}</span>
      </div>
    </>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function CampPanel({ notify }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.socials.email); notify('Email copied to clipboard'); } catch { notify(`Email: ${profile.socials.email}`); }
  };
  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!EMAIL_RE.test(form.email)) er.email = 'Please enter a valid email.';
    if (form.message.trim().length < 10) er.message = 'At least 10 characters, please.';
    setErrors(er);
    if (Object.keys(er).length) return;
    if (!formspreeId) {
      // no form service connected: open the visitor's email app with the message ready to send
      const subject = encodeURIComponent(`Portfolio message from ${form.name.trim()}`);
      const body = encodeURIComponent(`${form.message.trim()}\n\n${form.name.trim()} (${form.email.trim()})`);
      window.location.href = `mailto:${profile.socials.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setMsg('Your email app should open with the message ready. Just press send.');
      return;
    }
    setStatus('loading');
    try {
      const r = await fetch(`https://formspree.io/f/${formspreeId}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) });
      if (!r.ok) throw new Error();
      setStatus('success'); setForm({ name: '', email: '', message: '' });
    } catch { setStatus('error'); setMsg(`Something went wrong. Please email me at ${profile.socials.email}.`); }
  };
  const f = (n) => ({
    id: `c-${n}`, value: form[n], onChange: (e) => setForm({ ...form, [n]: e.target.value }), 'aria-invalid': !!errors[n],
    className: `w-full rounded-md border bg-white/[0.06] px-3 py-2.5 text-base text-white placeholder:text-slate-500 focus:border-gold-soft ${errors[n] ? 'border-rose-400' : 'border-white/15'}`,
  });
  return (
    <>
      <H>The next chapter</H>
      <P>It's still early morning in my career, and the road ahead is open. I'm looking for a full-time role in Java backend, SRE / DevOps, cloud or AI automation in the Klang Valley, from December 2026. Let's talk.</P>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button onClick={copy} className="dchip !py-2 hover:border-gold-soft"><Mail size={14} className="text-gold-soft" /> {profile.socials.email} <Copy size={13} /></button>
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="dchip !py-2 hover:border-gold-soft"><FaLinkedin size={14} /> LinkedIn</a>
        <a href={profile.socials.github} target="_blank" rel="noreferrer" className="dchip !py-2 hover:border-gold-soft"><FaGithub size={14} /> GitHub</a>
      </div>
      <form onSubmit={submit} noValidate className="mt-4 grid gap-3 sm:grid-cols-2">
        <div><label htmlFor="c-name" className="mb-1 block text-xs font-semibold text-slate-300">Name</label><input {...f('name')} autoComplete="name" />{errors.name && <p className="mt-1 text-xs text-rose-300">{errors.name}</p>}</div>
        <div><label htmlFor="c-email" className="mb-1 block text-xs font-semibold text-slate-300">Email</label><input {...f('email')} type="email" autoComplete="email" />{errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}</div>
        <div className="sm:col-span-2"><label htmlFor="c-message" className="mb-1 block text-xs font-semibold text-slate-300">Message</label><textarea {...f('message')} rows={3} placeholder="Tell me about the role and the team…" />{errors.message && <p className="mt-1 text-xs text-rose-300">{errors.message}</p>}</div>
        <div className="sm:col-span-2">
          <button type="submit" disabled={status === 'loading'} className="dbtn-gold w-full disabled:opacity-70">
            {status === 'loading' ? <><LoaderCircle size={16} className="animate-spin" /> Sending…</> : <><Send size={16} /> Send message</>}
          </button>
          <div aria-live="polite">
            {status === 'success' && <p className="mt-2 text-sm text-emerald-300">{msg || "Thank you, your message was sent. I'll reply soon."}</p>}
            {status === 'error' && <p className="mt-2 text-sm text-rose-300">{msg}</p>}
          </div>
        </div>
      </form>
    </>
  );
}

export const STOPS = [
  { id: 'home', label: 'Home', place: 'Home · Kuala Lumpur', Panel: HomePanel },
  { id: 'about', label: 'Campus', place: 'Chapter 1 · TAR UMT Arena', Panel: AcademyPanel },
  { id: 'skills', label: 'Workshop', place: 'Chapter 2 · The Workshop', Panel: WorkshopPanel },
  { id: 'projects', label: 'Quests', place: 'Chapter 3 · The Quest Board', Panel: QuestPanel },
  { id: 'experience', label: 'City', place: 'Chapter 4 · The City', Panel: CityPanel },
  { id: 'beyond', label: 'Park', place: 'Chapter 5 · The Park', Panel: ParkPanel },
  { id: 'contact', label: 'Crossroads', place: 'Epilogue · Sunrise at the crossroads', Panel: CampPanel },
];
