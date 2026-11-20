import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Bot, Boxes, Brain, ClipboardList, Clock, Cloud, Database, Drama, Ear, Flag, GraduationCap, Globe, Heart, Lightbulb, Lock, MessagesSquare, Mic, Network, PenLine, Plug, Server, Share2, ShieldCheck, Shuffle, SlidersHorizontal, Sparkles, Terminal, Users, Workflow, X } from 'lucide-react';
import { FaAws, FaDocker, FaGitAlt, FaJava, FaLinux, FaPython } from 'react-icons/fa';
import { SiApachekafka, SiElasticsearch, SiGo, SiGrafana, SiKubernetes, SiRedis, SiServerless, SiSolidity, SiSpringboot, SiTerraform } from 'react-icons/si';
import { skills } from '../../data/portfolio.js';

const ICONS = {
  java: FaJava, spring: SiSpringboot, sql: Database, python: FaPython, kafka: SiApachekafka,
  aws: FaAws, docker: FaDocker, cicd: Workflow, git: FaGitAlt, linux: FaLinux,
  ai: Bot, playwright: Drama, chat: MessagesSquare, team: Users, bulb: Lightbulb, globe: Globe,
  redis: SiRedis, network: Network, go: SiGo, k8s: SiKubernetes, terraform: SiTerraform, grafana: SiGrafana,
  award: Award, brain: Brain, boxes: Boxes, pen: PenLine, grad: GraduationCap,
  distributed: Share2, elastic: SiElasticsearch, solidity: SiSolidity, plan: ClipboardList, serverless: SiServerless,
  cli: Terminal, mcp: Plug, agents: Users, tune: SlidersHorizontal, shield: ShieldCheck,
  ear: Ear, shuffle: Shuffle, clock: Clock, mic: Mic, flag: Flag,
};
const ROOTS = [Server, Cloud, Sparkles, Heart];
const COLORS = ['#14b8a6', '#38bdf8', '#f59e0b', '#f472b6'];

function Node({ s, color, locked, delay }) {
  const Icon = ICONS[s.icon] || Lightbulb;
  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
      className="relative flex items-center gap-3"
    >
      <span
        className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full ${locked ? 'border-2 border-dashed border-slate-600 bg-slate-900 text-slate-500' : 'bg-slate-950 ring-2'}`}
        style={locked ? undefined : { color, boxShadow: `0 0 16px -2px ${color}`, '--tw-ring-color': color }}
      >
        <Icon size={19} />
        {locked && <Lock size={12} className="absolute -bottom-1 -right-1 rounded-full bg-slate-800 p-0.5 text-slate-300" />}
      </span>
      <span className={`text-sm font-semibold leading-tight ${locked ? 'text-slate-500' : 'text-slate-100'}`}>
        {s.name}
        {locked && <span className="block text-[11px] font-medium text-slate-500">Not unlocked yet</span>}
      </span>
    </motion.li>
  );
}

export default function SkillTree({ onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    ref.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [onClose]);

  const have = skills.reduce((n, g) => n + g.items.length, 0);
  const next = skills.reduce((n, g) => n + (g.next?.length || 0), 0);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tree-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="dialog relative max-h-[92svh] w-full max-w-6xl overflow-y-auto p-5 outline-none sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-display text-sm italic text-gold-soft">The Workshop</p>
            <h2 id="tree-title" className="font-display text-3xl font-bold text-white">Skill tree</h2>
            <p className="mt-1 text-sm text-slate-400">{have} skills unlocked · {next} on the way</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-4 text-xs text-slate-400 sm:flex">
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-accent shadow-glow" /> Unlocked</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border border-dashed border-slate-500" /> Not unlocked yet</span>
            </div>
            <button onClick={onClose} aria-label="Close skill tree" className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-slate-200 hover:border-gold-soft hover:text-gold-soft"><X size={18} /></button>
          </div>
        </div>

        {/* root */}
        <div className="mt-6 flex justify-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="grid h-14 w-14 place-items-center rounded-full bg-gold-soft font-display text-lg font-bold text-ink shadow-[0_0_24px_rgba(227,194,122,0.5)]">JL</motion.div>
        </div>
        <div aria-hidden className="mx-auto h-5 w-px bg-gold-soft/50" />
        <div aria-hidden className="mx-auto hidden h-px w-3/4 bg-gold-soft/40 lg:block" />

        <div className="mt-0 grid gap-8 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-6">
          {skills.map((g, gi) => {
            const Root = ROOTS[gi % 4];
            const color = COLORS[gi % 4];
            return (
              <section key={g.category} className="flex flex-col items-center">
                <div aria-hidden className="hidden h-5 w-px bg-gold-soft/40 lg:block" />
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + gi * 0.08 }}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-ink" style={{ background: color }}>
                  <Root size={16} /> {g.category}
                </motion.div>
                <div className="relative mt-4 w-full max-w-[240px]">
                  {/* the branch line: solid through unlocked skills, dashed through locked ones */}
                  <span aria-hidden className="absolute left-[21px] top-0 w-[2px] rounded-full" style={{ background: color, height: `${g.items.length * 60 - 18}px`, boxShadow: `0 0 8px ${color}` }} />
                  {g.next?.length > 0 && (
                    <span aria-hidden className="absolute left-[21px] w-0 border-l-2 border-dashed border-slate-600" style={{ top: `${g.items.length * 60 - 18}px`, height: `${g.next.length * 60}px` }} />
                  )}
                  <ul className="flex flex-col gap-4">
                    {g.items.map((s, k) => <Node key={s.name} s={s} color={color} delay={0.25 + gi * 0.08 + k * 0.06} />)}
                    {(g.next || []).map((s, k) => <Node key={s.name} s={s} color={color} locked delay={0.45 + gi * 0.08 + (g.items.length + k) * 0.06} />)}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
