import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Bell, Check, Database, ExternalLink, FileText, Power, RefreshCw, Repeat, Send, Server, Skull, Users, X, Zap } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { SiApachekafka } from 'react-icons/si';

// An in-browser simulation of ClaimFlow's event flow (github.com/Ck666-cpu/claimflow):
// claims-service writes the claim and an outbox row in one transaction, a relay
// publishes outbox rows to Kafka, and notification-service consumes them idempotently.
// Nothing here talks to a server; it shows how the real design behaves.

const NAMES = ['Alice Tan', 'Raj Kumar', 'Mei Ling', 'Arjun Das', 'Siti Aminah', 'Daniel Wong'];
const TYPES = ['Motor', 'Property'];
const hex = () => Math.random().toString(16).slice(2, 6);
const now = () => new Date().toLocaleTimeString('en-GB', { hour12: false });

const GOALS = [
  ['submit', 'Submit a claim'],
  ['kafkaDown', 'Take Kafka down, then submit more claims'],
  ['recovered', 'Bring Kafka back and watch the backlog drain'],
  ['replay', 'Retry a request with the same Idempotency-Key'],
  ['conflict', 'Cause a 409 with a stale update'],
  ['dedup', 'Crash the relay mid-publish'],
];

export default function ClaimFlowDemo({ onClose, repoUrl }) {
  const ref = useRef(null);
  const [claims, setClaims] = useState([]);
  const [outbox, setOutbox] = useState([]); // pending event rows
  const [topic, setTopic] = useState([]); // published, not yet consumed
  const [inbox, setInbox] = useState([]); // notifications delivered
  const [log, setLog] = useState([]);
  const [kafkaUp, setKafkaUp] = useState(true);
  const [relayUp, setRelayUp] = useState(true);
  const [crashNext, setCrashNext] = useState(false);
  const [done, setDone] = useState({});
  const [stats, setStats] = useState({ published: 0, delivered: 0, replays: 0, conflicts: 0, dupes: 0 });
  const seq = useRef(1000);
  const offset = useRef(0);
  const seen = useRef(new Set()); // event ids the consumer has processed
  const lastReq = useRef(null);
  const st = useRef({});
  st.current = { outbox, topic, kafkaUp, relayUp, crashNext, claims };

  const say = useCallback((kind, text) => setLog((l) => [{ id: `${Date.now()}-${Math.random()}`, t: now(), kind, text }, ...l].slice(0, 40)), []);
  const tick = useCallback((k) => setDone((d) => (d[k] ? d : { ...d, [k]: true })), []);
  const bump = (k) => setStats((s) => ({ ...s, [k]: s[k] + 1 }));

  // dialog plumbing: focus, Escape, no page scroll underneath
  useEffect(() => {
    const prev = document.activeElement;
    document.body.style.overflow = 'hidden';
    ref.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    say('info', 'claims-service and notification-service are up. Submit a claim to begin.');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [onClose, say]);

  const addEvent = (claimId, type, owner) => {
    const ev = { id: `evt-${hex()}${hex()}`, claimId, type, owner };
    setOutbox((o) => [...o, ev]);
    return ev;
  };

  const submit = () => {
    const id = `C-${++seq.current}`;
    const key = `${hex()}-${hex()}`;
    const owner = NAMES[seq.current % NAMES.length];
    const kind = TYPES[seq.current % 2];
    setClaims((c) => [{ id, owner, kind, version: 1, status: 'SUBMITTED', flash: 0 }, ...c].slice(0, 6));
    lastReq.current = { id, key };
    say('http', `POST /api/v1/claims  Idempotency-Key: ${key}  →  201 Created  (${id}, v1)`);
    say('sql', `BEGIN; INSERT INTO claims (${id}); INSERT INTO event_publication (ClaimSubmitted); COMMIT;`);
    addEvent(id, 'ClaimSubmitted', owner);
    tick('submit');
    if (!st.current.kafkaUp) tick('kafkaDown');
  };

  const replay = () => {
    const r = lastReq.current;
    if (!r) return say('warn', 'Submit a claim first, then retry it.');
    say('http', `POST /api/v1/claims  Idempotency-Key: ${r.key}  →  200 OK  (replay of ${r.id}: no new claim, no new event)`);
    setClaims((c) => c.map((x) => (x.id === r.id ? { ...x, flash: x.flash + 1 } : x)));
    bump('replays');
    tick('replay');
  };

  const conflict = () => {
    const c = st.current.claims.find((x) => x.status !== 'SETTLED');
    if (!c) return say('warn', 'Submit a claim first, then two officers can race to update it.');
    const v = c.version;
    say('http', `POST /api/v1/claims/${c.id}/assign  {version: ${v}}  (Ben Lim)  →  200 OK  (v${v + 1})`);
    say('err', `POST /api/v1/claims/${c.id}/assign  {version: ${v}}  (Chitra Nair)  →  409 Conflict`);
    say('problem', `application/problem+json  {"title": "Stale version", "status": 409, "detail": "${c.id} is at version ${v + 1}; reload and retry"}`);
    setClaims((cs) => cs.map((x) => (x.id === c.id ? { ...x, version: v + 1, status: 'ASSIGNED', flash: x.flash + 1 } : x)));
    addEvent(c.id, 'ClaimAssigned', c.owner);
    bump('conflicts');
    tick('conflict');
  };

  const toggleKafka = () => {
    const up = !kafkaUp;
    setKafkaUp(up);
    if (!up) say('err', 'Kafka broker stopped. The API keeps accepting claims; events wait in the outbox.');
    else {
      say('ok', `Kafka broker is back. Relay resumes: ${st.current.outbox.length} event(s) to publish.`);
      if (st.current.outbox.length) tick('recovered');
    }
  };

  // relay: publish the oldest outbox row, then mark it complete
  useEffect(() => {
    const t = setInterval(() => {
      const { outbox: o, kafkaUp: k, relayUp: r, crashNext: crash } = st.current;
      if (!r || !o.length) return;
      if (!k) return;
      const ev = o[0];
      const delivery = { ...ev, key: `${ev.id}#${hex()}`, offset: offset.current++ };
      setTopic((tp) => [...tp, delivery]);
      bump('published');
      if (crash) {
        // published to Kafka, but the relay dies before marking the row complete
        say('kafka', `relay → claims.events  offset ${delivery.offset}  ${ev.type} ${ev.claimId}`);
        say('err', 'relay crashed before marking the outbox row complete. Restarting…');
        setCrashNext(false);
        setRelayUp(false);
        setTimeout(() => {
          setRelayUp(true);
          say('info', 'relay restarted. The row is still pending, so it is published again (at-least-once).');
        }, 2200);
        return;
      }
      setOutbox((rows) => rows.filter((x) => x.id !== ev.id));
      say('kafka', `relay → claims.events  offset ${delivery.offset}  ${ev.type} ${ev.claimId}  (outbox row completed)`);
    }, 1300);
    return () => clearInterval(t);
  }, [say]);

  // notification-service: consume in order, skip event ids it has already handled
  useEffect(() => {
    const t = setInterval(() => {
      const { topic: tp } = st.current;
      if (!tp.length) return;
      const d = tp[0];
      setTopic((x) => x.slice(1));
      if (seen.current.has(d.id)) {
        say('ok', `notification-service: ${d.id} already processed, duplicate ignored (idempotent consumer)`);
        setStats((s) => ({ ...s, dupes: s.dupes + 1 }));
        tick('dedup');
        return;
      }
      seen.current.add(d.id);
      setInbox((n) => [{ ...d }, ...n].slice(0, 5));
      setStats((s) => ({ ...s, delivered: s.delivered + 1 }));
      say('ok', `notification-service: ${d.type} for ${d.claimId} → notified ${d.owner}`);
    }, 1000);
    return () => clearInterval(t);
  }, [say, tick]);

  const reset = () => {
    setClaims([]); setOutbox([]); setTopic([]); setInbox([]); setLog([]); setDone({});
    setKafkaUp(true); setRelayUp(true); setCrashNext(false);
    setStats({ published: 0, delivered: 0, replays: 0, conflicts: 0, dupes: 0 });
    seen.current = new Set(); offset.current = 0; lastReq.current = null;
    say('info', 'Fresh start.');
  };

  const LOG_COL = { http: 'text-sky-300', sql: 'text-violet-300', kafka: 'text-amber-300', ok: 'text-emerald-300', err: 'text-rose-300', problem: 'text-rose-200/80', warn: 'text-amber-200', info: 'text-slate-400' };

  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        className="dialog relative flex max-h-[100svh] w-full max-w-6xl flex-col overflow-hidden !rounded-b-none outline-none sm:max-h-[94svh] sm:!rounded-[20px]"
        initial={{ y: 40, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* header */}
        <div className="flex items-start gap-3 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-soft">Live demo · ClaimFlow</p>
            <h2 id="demo-title" className="font-display text-xl font-bold sm:text-2xl">Transactional outbox + Kafka, in your browser</h2>
            <p className="mt-0.5 text-[13px] text-slate-400">A simulation of how the real services behave. The project itself runs locally with Docker Compose.</p>
          </div>
          <a href={repoUrl} target="_blank" rel="noreferrer" className="dbtn-line hidden !min-h-[38px] !px-3 text-sm sm:inline-flex"><FaGithub size={15} /> Code</a>
          <button onClick={onClose} aria-label="Close demo" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/15 text-slate-200 hover:border-gold-soft hover:text-gold-soft"><X size={18} /></button>
        </div>

        <div className="grid flex-1 gap-4 overflow-y-auto p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_290px]">
          <div className="min-w-0 space-y-4">
            {/* controls */}
            <div className="flex flex-wrap gap-2">
              <button onClick={submit} className="dbtn-gold !min-h-[40px] text-sm"><Send size={15} /> Submit claim</button>
              <button onClick={replay} className="dbtn-line !min-h-[40px] text-sm"><Repeat size={15} /> Retry same request</button>
              <button onClick={conflict} className="dbtn-line !min-h-[40px] text-sm"><Users size={15} /> Two officers, one claim</button>
              <button onClick={toggleKafka} className={`dbtn !min-h-[40px] border text-sm ${kafkaUp ? 'border-rose-400/40 text-rose-200 hover:bg-rose-500/10' : 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200'}`}><Power size={15} /> {kafkaUp ? 'Stop Kafka' : 'Start Kafka'}</button>
              <button onClick={() => { setCrashNext(true); say('warn', 'The relay will crash right after its next publish.'); }} disabled={crashNext || !relayUp} className="dbtn !min-h-[40px] border border-white/15 text-sm text-slate-200 hover:border-rose-300 disabled:opacity-50"><Skull size={15} /> {crashNext ? 'Crash armed' : 'Crash relay mid-publish'}</button>
              <button onClick={reset} className="dbtn !min-h-[40px] text-sm text-slate-400 hover:text-white"><RefreshCw size={14} /> Reset</button>
            </div>

            {/* the pipeline */}
            <LayoutGroup>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.15fr_1fr_1fr_1fr]">
                <Stage icon={Server} title="claims-service" sub="REST · PostgreSQL" status="up">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">claims</p>
                  <ul className="space-y-1.5">
                    <AnimatePresence initial={false}>
                      {claims.map((c) => (
                        <motion.li key={c.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-[12px]">
                          <motion.span key={c.flash} className="absolute inset-0 bg-gold-soft/25" initial={{ opacity: c.flash ? 1 : 0 }} animate={{ opacity: 0 }} transition={{ duration: 1 }} />
                          <span className="relative flex items-center gap-2">
                            <b className="font-mono text-white">{c.id}</b>
                            <span className="text-slate-400">{c.kind}</span>
                            <span className="ml-auto rounded bg-white/10 px-1.5 font-mono text-[10px] text-slate-300">v{c.version}</span>
                          </span>
                          <span className="relative block text-[11px] text-slate-500">{c.owner} · {c.status}</span>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                    {!claims.length && <li className="text-[12px] text-slate-500">No claims yet.</li>}
                  </ul>
                  <p className="mb-1.5 mt-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500"><Database size={12} /> outbox (same transaction)</p>
                  <ul className="flex min-h-[30px] flex-wrap gap-1.5">
                    {outbox.map((e) => <Pill key={e.id} id={`p-${e.id}`} ev={e} tone="amber" />)}
                    {!outbox.length && <li className="text-[12px] text-slate-500">empty</li>}
                  </ul>
                </Stage>

                <Stage icon={Zap} title="Outbox relay" sub="publishes pending rows" status={relayUp ? (kafkaUp ? 'up' : 'waiting') : 'down'}>
                  <p className="text-[12px] leading-relaxed text-slate-400">
                    {!relayUp ? 'Crashed, restarting…' : !kafkaUp ? `Kafka unreachable. ${outbox.length} event(s) held safely in the outbox, retrying.` : outbox.length ? 'Publishing the oldest pending row…' : 'Idle. Nothing pending.'}
                  </p>
                  {crashNext && <p className="mt-2 rounded bg-rose-500/15 px-2 py-1 text-[11px] text-rose-200">Crash armed for the next publish</p>}
                </Stage>

                <Stage icon={SiApachekafka} title="Kafka" sub="topic: claims.events" status={kafkaUp ? 'up' : 'down'}>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">consumer lag: {topic.length}</p>
                  <ul className="flex min-h-[30px] flex-wrap gap-1.5">
                    {topic.map((e) => <Pill key={e.key} id={`k-${e.key}`} ev={e} tone="sky" offset={e.offset} />)}
                  </ul>
                </Stage>

                <Stage icon={Bell} title="notification-service" sub="idempotent consumer" status="up">
                  <ul className="space-y-1.5">
                    <AnimatePresence initial={false}>
                      {inbox.map((n) => (
                        <motion.li key={n.key} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-md border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1.5 text-[12px] text-emerald-100">
                          <Check size={12} className="mr-1 inline align-[-1px]" />
                          <b>{n.owner.split(' ')[0]}</b>, {n.type === 'ClaimSubmitted' ? 'we received' : 'an officer picked up'} <span className="whitespace-nowrap font-mono">{n.claimId}</span>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                    {!inbox.length && <li className="text-[12px] text-slate-500">No notifications yet.</li>}
                  </ul>
                </Stage>
              </div>
            </LayoutGroup>

            {/* log */}
            <div className="rounded-lg border border-white/10 bg-black/40">
              <p className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500"><FileText size={12} /> Request & event log</p>
              <ol className="h-44 overflow-y-auto px-3 py-2 font-mono text-[11.5px] leading-relaxed" aria-live="polite">
                {log.map((l) => (
                  <li key={l.id} className={LOG_COL[l.kind]}><span className="text-slate-600">{l.t} </span>{l.text}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* side: goals, numbers and what it shows */}
          <aside className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-soft">Try this</p>
              <ol className="mt-2 space-y-1.5">
                {GOALS.map(([k, label], i) => (
                  <li key={k} className={`flex items-start gap-2 text-[13px] ${done[k] ? 'text-emerald-200' : 'text-slate-300'}`}>
                    <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px] ${done[k] ? 'border-emerald-400 bg-emerald-500/30' : 'border-white/30'}`}>{done[k] ? <Check size={10} /> : i + 1}</span>
                    {label}
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[['Published', stats.published], ['Delivered', stats.delivered], ['Replays (no duplicate)', stats.replays], ['409 conflicts', stats.conflicts], ['Duplicates ignored', stats.dupes], ['Lost events', 0]].map(([l, v]) => (
                <div key={l} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
                  <p className="font-display text-xl font-bold text-white">{v}</p>
                  <p className="text-[11px] leading-tight text-slate-400">{l}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5 text-[13px] leading-relaxed text-slate-300">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-soft">Why it works</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4">
                <li>The claim and its event are written in <b>one database transaction</b>, so you never get one without the other.</li>
                <li>Kafka can be down: the API still answers and the relay publishes the backlog later.</li>
                <li>Delivery is <b>at-least-once</b>; the consumer remembers event ids, so a redelivery is ignored.</li>
                <li><b>Idempotency keys</b> make client retries safe, and <b>optimistic locking</b> stops two people overwriting each other.</li>
              </ul>
              <a href={repoUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-semibold text-gold-soft hover:text-white">See the real code <ExternalLink size={13} /></a>
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stage({ icon: Icon, title, sub, status, children }) {
  const dot = { up: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.9)]', waiting: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,.9)]', down: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,.9)]' }[status];
  return (
    <section className={`relative min-w-0 rounded-xl border p-3 transition ${status === 'down' ? 'border-rose-500/40 bg-rose-500/[0.06]' : 'border-white/10 bg-white/[0.035]'}`}>
      <header className="mb-2.5 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.07] text-accent-soft"><Icon size={16} /></span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-white">{title}</span>
          <span className="block truncate text-[11px] text-slate-500">{sub}</span>
        </span>
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} title={status} />
      </header>
      {children}
    </section>
  );
}

function Pill({ id, ev, tone, offset }) {
  const c = tone === 'amber' ? 'border-amber-300/40 bg-amber-400/15 text-amber-100' : 'border-sky-300/40 bg-sky-400/15 text-sky-100';
  return (
    <motion.li layoutId={id} layout initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className={`rounded-full border px-2 py-0.5 font-mono text-[10.5px] ${c}`} title={`${ev.type} ${ev.claimId} (${ev.id})`}>
      {offset !== undefined && <span className="opacity-60">#{offset} </span>}
      {ev.type === 'ClaimSubmitted' ? 'Submitted' : 'Assigned'} {ev.claimId}
    </motion.li>
  );
}
