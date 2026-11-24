import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Download, Mouse, Sparkles, X } from 'lucide-react';
import Character from './Character.jsx';
import { SCENES } from './Scenes.jsx';
import { STOPS } from './Panels.jsx';
import { friends, profile } from '../../data/portfolio.js';
import Friend from './Friend.jsx';
import SkillTree from './SkillTree.jsx';
import { LightingDefs } from './Stage.jsx';
import { Aurora, ChapterTitle, Clouds, GodRays, Intro, LensFlare, Particles, PostFX, Skyline, Stars } from './Atmosphere.jsx';

const N = STOPS.length;
const P = STOPS.map((_, i) => i / (N - 1)); // scroll progress at each stop
// The walk is the morning of Jeff's life: before dawn → first light → sunrise → bright morning
const SKY_TOP = ['#070b1c', '#121c40', '#25346a', '#3f5fa0', '#5f92d0', '#6eaee8', '#5aaef0'];
const SKY_BOT = ['#16224a', '#34427a', '#b77892', '#f19d78', '#fbc48c', '#fde2b6', '#e3f2ff'];
const FAR1 = ['#141c36', '#232c55', '#4a4874', '#80769a', '#a4a3c0', '#a9bfd6', '#a9c4dc'];
const FAR2 = ['#0d1428', '#18203f', '#33335a', '#5d5679', '#7d84a6', '#86a2c0', '#88a8c6'];
const GRASS = ['#17251f', '#22362a', '#3a5236', '#58783f', '#6c9a4c', '#77ad5b', '#7db462'];
const PATH = ['#3a3846', '#5a5260', '#8a7a78', '#c2a888', '#dcc39a', '#e6d2a8', '#ead8ae'];
const GRASS_D = ['#08100d', '#0e1a14', '#1b2a1c', '#2c4220', '#355a26', '#3d6a2c', '#447432'];
const SKYLINE = ['#0f1630', '#1b2248', '#3a3a62', '#655f84', '#8a90b0', '#93acc8', '#96b2cc'];
const CLOUD_L = ['#3a4878', '#5a5f96', '#f5a9b8', '#ffd0a8', '#fff1dc', '#ffffff', '#ffffff'];
const CLOUD_D = ['#141a36', '#252a55', '#6b4f7d', '#c47c83', '#d6a8a0', '#c9d6ea', '#c4d8f0'];
const HAZE = ['rgba(22,34,74,0.9)', 'rgba(52,66,122,0.85)', 'rgba(183,120,146,0.6)', 'rgba(241,157,120,0.55)', 'rgba(251,196,140,0.5)', 'rgba(253,226,182,0.45)', 'rgba(227,242,255,0.5)'];

const CX = 'clamp(110px, 24vw, 360px)'; // where the character stands
const SH = 'min(44svh, 52vw)'; // scene height
const G = '22svh'; // ground height
const FRIEND_H = { tall: 1.1, same: 1, short: 0.92 }; // relative to Jeff
// Buildings you can click: which stop, which friends group, and the building's
// outline in the scene (fractions of the scene height SH, measured from Jeff's spot)
const DOORS = [
  { stop: 'about', group: 'campus', label: 'TAR UMT', box: { left: -0.53, width: 1.21, height: 0.74 } },
  { stop: 'experience', group: 'city', label: 'Ant International', box: { left: -0.24, width: 0.63, height: 1.13 } },
];
// Group-photo spots around Jeff, in friend-widths (7svh): b = back row (behind Jeff, peeking), f = front row
const SPOTS_WIDE = [[1.3, 'f'], [-1.3, 'b'], [2.35, 'b'], [3.4, 'f'], [4.45, 'b'], [5.5, 'f']];
const SPOTS_NARROW = [[0.75, 'f'], [-0.7, 'b'], [1.4, 'b'], [2.05, 'f'], [2.7, 'b'], [3.35, 'f']];
const TILT = [-4, 3, -2, 4, -3, 2];
// Click the Workshop building to open the skill tree (outline as fractions of SH, from Jeff's spot)
const WORKSHOP_BOX = { left: -0.44, width: 0.97, height: 0.76 };

function Mountains({ fill, peaks }) {
  return (
    <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="h-full w-[100vw] shrink-0">
      <motion.path style={{ fill }} d={peaks} />
      <path d={peaks} fill="url(#mtn-shade)" />
    </svg>
  );
}
const PEAKS1 = 'M0 300 V170 L90 110 L170 160 L260 70 L360 150 L450 100 L540 160 L640 60 L740 140 L830 95 L920 150 L1000 170 V300 Z';
const PEAKS2 = 'M0 300 V210 Q80 160 160 200 T320 190 Q400 140 480 185 T640 180 Q720 150 800 195 T1000 210 V300 Z';

function Lamp({ glow }) {
  return (
    <div className="relative h-[26svh] w-8">
      <motion.div style={{ opacity: glow }} className="absolute -left-10 -top-6 h-28 w-28 rounded-full bg-amber-200/50 blur-2xl" />
      <motion.div style={{ opacity: glow }} className="lamp-cone absolute left-1/2 top-[3svh] h-[26svh] w-[22svh] -translate-x-1/2" />
      <svg viewBox="0 0 30 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax meet">
        <rect x="13" y="20" width="4" height="180" fill="#1f2937" />
        <path d="M6 22 h18 l-4 -14 h-10 Z" fill="#111827" />
        <motion.rect style={{ opacity: glow }} x="9" y="16" width="12" height="6" fill="#fff3c4" filter="url(#glow)" />
      </svg>
    </div>
  );
}

export default function World({ openProject, notify }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const s = useTransform(p, (v) => v * (N - 1));

  const worldX = useTransform(s, (v) => `${-v * 100}vw`);
  const far1X = useTransform(s, (v) => `${-v * 16}vw`);
  const far2X = useTransform(s, (v) => `${-v * 38}vw`);
  const fgX = useTransform(s, (v) => `${-v * 135}vw`);

  const top = useTransform(p, P, SKY_TOP);
  const bot = useTransform(p, P, SKY_BOT);
  const sky = useMotionTemplate`linear-gradient(to bottom, ${top}, ${bot})`;
  const far1 = useTransform(p, P, FAR1);
  const far2 = useTransform(p, P, FAR2);
  const grass = useTransform(p, P, GRASS);
  const path = useTransform(p, P, PATH);
  const night = useTransform(p, [0, 0.2, 0.45, 0.6], [0.3, 0.22, 0.06, 0]);
  const stars = useTransform(p, [0, 0.25, 0.42], [1, 0.6, 0]);
  const lampGlow = useTransform(p, [0, 0.35, 0.5], [1, 0.8, 0]);
  const sunX = useTransform(p, [0.45, 1], ['52vw', '47vw']);
  const sunY = useTransform(p, [0.45, 0.7, 1], ['66svh', '42svh', '16svh']);
  const sunOp = useTransform(p, [0.45, 0.58], [0, 1]);
  const sunColor = useTransform(p, [0.5, 0.75, 1], ['#fb923c', '#fcd34d', '#fff7d6']);
  const moonOp = useTransform(p, [0, 0.3, 0.42], [1, 0.7, 0]);
  const moonY = useTransform(p, [0, 0.42], ['12svh', '40svh']);
  const dawnGlow = useTransform(p, [0.2, 0.5, 0.8, 1], [0, 0.7, 0.5, 0.2]);
  const markerLeft = useTransform(p, (v) => `${v * 100}%`);
  const sunXn = useTransform(p, [0.45, 1], [52, 47]);
  const sunYn = useTransform(p, [0.45, 0.7, 1], [66, 42, 16]);
  const rays = useTransform(p, [0.45, 0.62, 1], [0, 0.85, 0.55]);
  const flare = useTransform(p, [0.55, 0.75, 1], [0, 0.9, 0.6]);
  const aurora = useTransform(p, [0, 0.22, 0.38], [0.9, 0.55, 0]);
  const grassD = useTransform(p, P, GRASS_D);
  const ground = useMotionTemplate`linear-gradient(to bottom, ${grass}, ${grassD})`;
  const skylineFill = useTransform(p, P, SKYLINE);
  const cityLights = useTransform(p, [0, 0.4, 0.6], [1, 0.8, 0]);
  const cloudL = useTransform(p, P, CLOUD_L);
  const cloudD = useTransform(p, P, CLOUD_D);
  const haze = useTransform(p, P, HAZE);
  const hazeBg = useMotionTemplate`linear-gradient(to top, ${haze}, transparent)`;
  const skylineX = useTransform(s, (v) => `${-v * 26}vw`);
  const cloudFarX = useTransform(s, (v) => `${-v * 6}vw`);
  const cloudNearX = useTransform(s, (v) => `${-v * 22}vw`);
  const progressW = useTransform(p, (v) => `${v * 100}%`);

  const [pos, setPos] = useState(0);
  const [walking, setWalking] = useState(false);
  const [facing, setFacing] = useState(1);
  const stopTimer = useRef();
  const last = useRef(0);
  useMotionValueEvent(s, 'change', (v) => {
    setPos(v);
    const d = v - last.current;
    last.current = v;
    if (Math.abs(d) > 0.0005) {
      setFacing(d >= 0 ? 1 : -1);
      setWalking(true);
      clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => setWalking(false), 160);
    }
  });

  const nearest = Math.round(pos);
  const active = Math.abs(pos - nearest) < 0.32 ? nearest : -1;
  const activeRef = useRef(active);
  activeRef.current = active;

  const go = useCallback((i) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const y = el.offsetTop + (i / (N - 1)) * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top: y + 2, behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  // Chapter 5 easter egg: shoot a basket with Space
  const PARK = STOPS.findIndex((st) => st.id === 'beyond');
  const [shot, setShot] = useState(null);
  const [score, setScore] = useState({ made: 0, total: 0 });
  const busy = useRef(false);
  const shoot = useCallback(() => {
    if (busy.current || activeRef.current !== PARK) return;
    busy.current = true;
    const fire = () => {
      setFacing(1); // face the hoop
      // 60% in, 25% off the rim, 15% air ball
      const r = Math.random();
      const result = r < 0.6 ? 'made' : r < 0.85 ? 'rim' : 'air';
      // Where Jeff's hands are, in the Park scene's 600×400 units, so the ball leaves from him
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const k = 400 / Math.min(0.44 * vh, 0.52 * vw); // scene units per pixel
      const x0 = 285 + (last.current - PARK) * vw * k;
      const y0 = 400 - (0.2246 - 0.154) * vh * k;
      setShot((sh) => ({ n: (sh?.n || 0) + 1, result, x0, y0 }));
      setTimeout(() => {
        setScore((sc) => ({ made: sc.made + (result === 'made' ? 1 : 0), total: sc.total + 1 }));
        notify(result === 'made' ? 'MJ!' : result === 'air' ? 'Air ball!' : 'Off the rim! Try again.');
      }, result === 'air' ? 800 : 950);
      setTimeout(() => { busy.current = false; }, 1350);
    };
    // not on the spot? walk back to it first, then shoot
    if (Math.abs(last.current - PARK) > 0.015) {
      go(PARK);
      setTimeout(fire, 600);
    } else fire();
  }, [PARK, notify, go]);


  useEffect(() => {
    const onKey = (e) => {
      if (/input|textarea|select/i.test(e.target.tagName) || document.querySelector('[role=dialog]')) return;
      if (e.code === 'Space' && activeRef.current === PARK) { e.preventDefault(); shoot(); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(Math.min(N - 1, Math.floor(last.current + 0.5) + 1)); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(Math.max(0, Math.ceil(last.current - 0.5) - 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, shoot, PARK]);

  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const [treeOpen, setTreeOpen] = useState(false);
  const WORKSHOP = STOPS.findIndex((st) => st.id === 'skills');

  // click a building → friends come out and say hello
  const [friendsAt, setFriendsAt] = useState(null); // index of the stop whose door is open
  useEffect(() => {
    if (friendsAt !== null && active !== friendsAt) setFriendsAt(null);
  }, [active, friendsAt]);

  const stop = active >= 0 && friendsAt === null ? STOPS[active] : null;
  const openGroup = friendsAt !== null ? friends[DOORS.find((d) => STOPS[friendsAt].id === d.stop).group] : null;

  return (
    <div ref={ref} style={{ height: `${N * 130}svh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#070b1c]">
        <LightingDefs />
        <Intro />
        {/* sky */}
        <motion.div className="absolute inset-0" style={{ background: sky }} />
        <Aurora opacity={aurora} />
        <Stars opacity={stars} />
        <GodRays x={sunX} y={sunY} opacity={rays} />
        <motion.div className="absolute h-16 w-16 -translate-x-1/2 rounded-full sm:h-20 sm:w-20" style={{ left: sunX, top: sunY, opacity: sunOp, background: sunColor, boxShadow: '0 0 60px 20px rgba(255,236,170,0.7), 0 0 160px 60px rgba(253,186,116,0.45)' }} />
        <motion.div className="absolute left-[14vw] h-14 w-14 rounded-full bg-slate-100 shadow-[0_0_60px_10px_rgba(226,232,240,0.35)]" style={{ opacity: moonOp, top: moonY }}>
          <span className="absolute left-3 top-3 h-3 w-3 rounded-full bg-slate-300" /><span className="absolute bottom-3 right-4 h-2 w-2 rounded-full bg-slate-300" />
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,transparent_40%,rgba(30,41,80,.45))]" />
        </motion.div>
        <Clouds x={cloudFarX} light={cloudL} shade={cloudD} top="6svh" scale={0.8} count={7} opacity={0.75} />
        <ChapterTitle active={active} />

        <motion.div aria-hidden className="absolute inset-x-0 h-[50svh]" style={{ opacity: dawnGlow, bottom: G, background: 'radial-gradient(ellipse 60% 70% at 55% 100%, rgba(253,186,116,0.75), transparent 70%)' }} />
        {/* far hills + KL skyline */}
        <motion.div className="absolute inset-x-0 flex will-change-transform" style={{ x: far1X, bottom: `calc(${G} + 4svh)`, height: '34svh' }}>
          {[0, 1, 2].map((i) => <Mountains key={i} fill={far1} peaks={PEAKS1} />)}
        </motion.div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 h-[16svh]" style={{ bottom: `calc(${G} + 4svh)`, background: hazeBg }} />
        <Skyline x={skylineX} fill={skylineFill} windows={cityLights} bottom={`calc(${G} + 1svh)`} height="24svh" />
        <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 h-[12svh]" style={{ bottom: G, background: hazeBg }} />
        <motion.div className="absolute inset-x-0 flex will-change-transform" style={{ x: far2X, bottom: G, height: '20svh' }}>
          {[0, 1, 2, 3, 4].map((i) => <Mountains key={i} fill={far2} peaks={PEAKS2} />)}
        </motion.div>
        <Clouds x={cloudNearX} light={cloudL} shade={cloudD} top="calc(100svh - 22svh - 16svh)" scale={1.4} count={6} opacity={0.35} blur={3} />

        {/* ground */}
        <motion.div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: G, background: ground }}>
          <div className="absolute inset-x-0 top-0 h-[3px] bg-white/10" />
          <motion.div className="absolute inset-x-0 top-[22%] h-[30%]" style={{ backgroundColor: path }}>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,.22),transparent_25%,transparent_70%,rgba(0,0,0,.35))]" />
            <motion.div className="absolute inset-y-0 left-0 w-[900vw] opacity-40" style={{ x: worldX, backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,.35) 1px, transparent 1px), linear-gradient(rgba(0,0,0,.25) 1px, transparent 1px)', backgroundSize: '64px 50%' }} />
          </motion.div>
          <motion.div className="absolute inset-y-0 left-0 w-[900vw]" style={{ x: worldX, backgroundImage: 'radial-gradient(rgba(0,0,0,0.18) 1.5px, transparent 2px), radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1.5px)', backgroundSize: '38px 22px, 23px 17px' }} />
          {/* light pool around Jeff */}
          <div className="absolute top-[10%] h-[60%] w-[34svh] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,230,170,.22),transparent)]" style={{ left: CX }} />
        </motion.div>

        {/* the places */}
        <motion.div className="absolute inset-0 will-change-transform" style={{ x: worldX }}>
          {SCENES.map((Scene, i) => (
            <div key={i} className="absolute will-change-transform" style={{ left: `calc(${i * 100}vw + ${CX} - 0.675 * ${SH})`, bottom: `calc(${G} * 0.7)`, height: SH }}>
              <Scene shot={i === PARK ? shot : undefined} />
            </div>
          ))}
        </motion.div>

        <Particles p={p} s={s} />

        {/* pre-dawn tint, lifts as the sun comes up */}
        <motion.div className="pointer-events-none absolute inset-0 bg-[#0a1030]" style={{ opacity: night }} />

        {/* Jeff */}
        <div className="absolute z-10" style={{ left: `calc(${CX} - 3.8svh)`, bottom: `calc(${G} * 0.48)`, height: '14svh' }}>
          <motion.div
            key={shot?.n || 0}
            className="h-full"
            initial={{ y: 0 }}
            animate={shot ? { y: [0, -22, 0] } : { y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <Character walking={walking} facing={facing} />
          </motion.div>
        </div>

        {/* the Workshop building opens the skill tree */}
        <motion.div className="pointer-events-none absolute inset-0 z-[15]" style={{ x: worldX }}>
          <button
            aria-label="Open the skill tree"
            onClick={(e) => { setTreeOpen(true); if (e.detail > 0) e.currentTarget.blur(); }}
            className="pointer-events-auto absolute cursor-pointer"
            style={{ left: `calc(${WORKSHOP * 100}vw + ${CX} + ${WORKSHOP_BOX.left} * ${SH})`, bottom: `calc(${G} * 0.7)`, width: `calc(${WORKSHOP_BOX.width} * ${SH})`, height: `calc(${WORKSHOP_BOX.height} * ${SH})` }}
          />
        </motion.div>

        {/* clickable buildings, and the friends who come out of them */}
        {['b', 'f'].map((row) => (
          <motion.div key={row} className={`pointer-events-none absolute inset-0 ${row === 'b' ? 'z-[5]' : 'z-[15]'}`} style={{ x: worldX }}>
            {DOORS.map((d) => {
              const i = STOPS.findIndex((st) => st.id === d.stop);
              const open = friendsAt === i;
              const group = friends[d.group];
              const spots = narrow ? SPOTS_NARROW : SPOTS_WIDE;
              return (
                <div key={d.stop}>
                  {row === 'f' && (
                    <button
                      aria-label={`Say hello to friends at ${d.label}`}
                      onClick={(e) => {
                        setFriendsAt(open ? null : i);
                        // mouse/touch click: drop focus so no focus outline appears on the building later
                        if (e.detail > 0) e.currentTarget.blur();
                      }}
                      className="pointer-events-auto absolute cursor-pointer"
                      style={{ left: `calc(${i * 100}vw + ${CX} + ${d.box.left} * ${SH})`, bottom: `calc(${G} * 0.7)`, width: `calc(${d.box.width} * ${SH})`, height: `calc(${d.box.height} * ${SH})` }}
                    />
                  )}
                  <AnimatePresence>
                    {open &&
                      group.people.map((f, k) => {
                        const [pos, r] = spots[k % spots.length];
                        if (r !== row) return null;
                        const back = r === 'b';
                        return (
                          <motion.div
                            key={f.id}
                            className="absolute"
                            style={{ left: `calc(${i * 100}vw + ${CX} + ${pos} * 7svh - 3.5svh * ${FRIEND_H[f.height]})`, bottom: `calc(${G} * 0.48 + ${back ? '2.4svh' : '0px'})` }}
                            initial={{ opacity: 0, x: `${-pos * 100}%`, y: 0, scale: 0.3 }}
                            animate={{ opacity: 1, x: '0%', y: [0, -38, 0], scale: back ? 0.94 : 1 }}
                            exit={{ opacity: 0, scale: 0.4, y: 10, transition: { duration: 0.2 } }}
                            transition={{ delay: 0.14 * k, duration: 0.6, x: { type: 'spring', stiffness: 170, damping: 18, delay: 0.14 * k }, y: { duration: 0.55, times: [0, 0.45, 1], ease: 'easeOut', delay: 0.14 * k } }}
                          >
                            {/* gentle idle bounce while waving */}
                            <motion.div
                              className="relative"
                              style={{ height: `calc(14svh * ${FRIEND_H[f.height]})` }}
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.9 + (k % 3) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: 0.14 * k + 0.7 }}
                            >
                              {/* speech bubble (back row sits higher so neighbours don't overlap) */}
                              <div className="absolute bottom-full left-1/2 hidden -translate-x-1/2 md:block" style={{ marginBottom: back ? 30 : 6 }}>
                                <motion.div
                                  className="relative whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-800 shadow-lg"
                                  style={{ rotate: TILT[k % TILT.length] }}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.14 * k + 0.55 }}
                                >
                                  {f.hello}
                                  <span className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-sm bg-white" />
                                </motion.div>
                              </div>
                              {k % 2 === 1 && (
                                <Sparkles size={14} className="heart-float absolute left-1/2 top-0 text-amber-300" style={{ animationDelay: `${0.9 + k * 0.4}s` }} />
                              )}
                              <Friend person={f} waving={group.wave !== false} />
                            </motion.div>
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        ))}

        {/* foreground lamps + grass, slightly out of focus */}
        <motion.div className="pointer-events-none absolute bottom-0 left-0 z-20 flex will-change-transform" style={{ x: fgX }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="relative flex w-[75vw] shrink-0 items-end justify-around">
              <svg viewBox="0 0 120 50" className="h-[9svh] w-auto blur-[2px]"><path d="M0 50 q10 -40 18 0 q6 -48 14 0 q8 -36 14 0 q7 -46 16 0 q6 -30 20 0 q5 -38 14 0 q6 -28 24 0 Z" fill="#0c1a12" /></svg>
              {i % 2 === 0 && <Lamp glow={lampGlow} />}
              <svg viewBox="0 0 60 30" className="h-[6svh] w-auto blur-[1.5px]"><path d="M0 30 q6 -20 10 0 q5 -26 12 0 q6 -18 10 0 q6 -24 12 0 q4 -16 16 0 Z" fill="#0c1a12" /></svg>
            </div>
          ))}
        </motion.div>
        <LensFlare xn={sunXn} yn={sunYn} opacity={flare} />
        <PostFX />

        {/* top bar with the route map */}
        <header className="absolute inset-x-0 top-0 z-40 flex h-16 items-center gap-4 bg-gradient-to-b from-black/60 via-black/25 to-transparent px-4 sm:px-6">
          <button onClick={() => go(0)} className="flex shrink-0 items-center gap-2 font-display text-lg font-bold text-white">
            <span className="logo-mark grid h-9 w-9 place-items-center rounded-lg text-sm text-ink">JL</span>
            <span className="hidden sm:inline">Jeff Lam</span>
          </button>
          <nav aria-label="Story map" className="relative mx-auto flex max-w-2xl flex-1 items-center justify-between">
            <span aria-hidden className="absolute inset-x-2 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/20" />
            <span aria-hidden className="absolute left-2 right-2 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full"><motion.span className="block h-full bg-gradient-to-r from-gold-soft via-accent-soft to-violet-300 shadow-[0_0_12px_rgba(94,234,212,.9)]" style={{ width: progressW }} /></span>
            <motion.span aria-hidden className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-glow ring-2 ring-white" style={{ left: markerLeft }} />
            {STOPS.map((st, i) => (
              <button key={st.id} onClick={() => go(i)} aria-label={`Go to ${st.label}`} aria-current={active === i ? 'step' : undefined} className="group relative z-10 grid h-11 w-8 place-items-center">
                <span className={`h-2.5 w-2.5 rotate-45 transition ${i <= pos + 0.01 ? 'bg-gold-soft shadow-[0_0_10px_rgba(227,194,122,.9)]' : 'bg-white/60'} ${active === i ? 'scale-[1.7] bg-white' : ''}`} />
                <span className={`absolute top-9 hidden whitespace-nowrap text-xs font-semibold lg:block ${active === i ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>{st.label}</span>
              </button>
            ))}
          </nav>
          <a href={profile.cvUrl} download className="dbtn-gold shrink-0 !min-h-[40px] !px-3 text-sm"><Download size={15} /><span className="hidden sm:inline">CV</span></a>
        </header>

        {/* dialogue box */}
        <AnimatePresence mode="wait">
          {stop && (
            <motion.section
              key={stop.id}
              id={`panel-${stop.id}`}
              aria-label={stop.place}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="dialog absolute inset-x-3 top-[76px] z-30 max-h-[calc(100svh-76px-22svh-9svh)] overflow-y-auto overscroll-contain p-5 sm:p-6 md:inset-x-auto md:right-[4vw] md:top-[92px] md:w-[min(580px,46vw)] md:max-h-[calc(100svh-92px-24svh)]"
            >
              <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-gold-soft/15 px-2.5 py-1 font-display text-sm italic text-gold-soft">{stop.place}</p>
              <stop.Panel go={go} openProject={openProject} notify={notify} score={score} shoot={shoot} openTree={() => setTreeOpen(true)} />
              {active < N - 1 && (
                <button onClick={() => go(active + 1)} className="mt-5 flex items-center gap-1 text-sm font-semibold text-gold-soft hover:text-white">
                  Continue to {STOPS[active + 1].label} <ChevronRight size={16} className="nudge" />
                </button>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {openGroup && (
            <motion.div
              key="friends-caption"
              role="status"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="dialog absolute inset-x-3 top-[76px] z-30 flex items-start gap-3 p-4 md:inset-x-auto md:right-[4vw] md:top-[92px] md:w-[min(460px,40vw)]"
            >
              <Sparkles size={20} className="mt-0.5 shrink-0 text-gold-soft" />
              <div className="flex-1">
                <p className="font-display text-lg font-bold text-white">{openGroup.title}</p>
                <p className="mt-1 text-sm text-slate-300">
                  {openGroup.subtitle || (() => {
                    const names = openGroup.people.map((f) => f.initials).filter(Boolean);
                    if (!names.length) return 'They came out to say hi!';
                    const list = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0];
                    return `${list} came out to say hi!`;
                  })()}
                </p>
              </div>
              <button onClick={() => setFriendsAt(null)} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/15 text-slate-200 hover:border-gold-soft hover:text-gold-soft"><X size={16} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{treeOpen && <SkillTree key="tree" onClose={() => setTreeOpen(false)} />}</AnimatePresence>

        {/* walking hint */}
        <AnimatePresence>
          {pos < 0.15 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <Mouse size={16} /> Scroll or press → to walk
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* anchors so #about, #projects… links work */}
      {STOPS.map((st, i) => <span key={st.id} id={st.id} aria-hidden className="absolute left-0 h-px w-px" style={{ top: `calc(${i / (N - 1)} * (100% - 100svh))` }} />)}
    </div>
  );
}
