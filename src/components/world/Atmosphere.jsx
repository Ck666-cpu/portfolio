import { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useTransform } from 'framer-motion';

// fully drop a layer once it has faded out, so it costs nothing to composite
const useVis = (opacity) => useTransform(opacity, (v) => (v < 0.01 ? 'hidden' : 'visible'));

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// deterministic pseudo-random so the layout never jumps between renders
const rnd = (i, k = 1) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ── Night sky ─────────────────────────────────────────── */
export const Stars = memo(function Stars({ opacity }) {
  const visibility = useVis(opacity);
  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity, visibility }}>
      {Array.from({ length: 90 }).map((_, i) => {
        const big = i % 11 === 0;
        const size = big ? 3 : 1 + rnd(i, 2) * 1.6;
        return (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-white"
            style={{
              left: `${rnd(i, 1) * 100}%`,
              top: `${rnd(i, 3) * 68}%`,
              width: size,
              height: size,
              animationDelay: `${rnd(i, 4) * 4}s`,
              animationDuration: `${2 + rnd(i, 5) * 3}s`,
              boxShadow: big ? '0 0 8px 2px rgba(200,220,255,.8)' : undefined,
            }}
          />
        );
      })}
      {[0, 1, 2].map((i) => (
        <span key={`s${i}`} className="shooting-star absolute" style={{ left: `${20 + i * 27}%`, top: `${6 + i * 9}%`, animationDelay: `${i * 3.7 + 1.5}s` }} />
      ))}
    </motion.div>
  );
});

export const Aurora = memo(function Aurora({ opacity }) {
  const visibility = useVis(opacity);
  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70svh]" style={{ opacity, visibility }}>
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
    </motion.div>
  );
});

/* ── Sun: god rays + lens flare ────────────────────────── */
export const GodRays = memo(function GodRays({ x, y, opacity }) {
  const visibility = useVis(opacity);
  return (
    <motion.div aria-hidden className="pointer-events-none absolute h-0 w-0" style={{ left: x, top: y, opacity, visibility }}>
      <div className="god-rays" />
      <div className="absolute left-0 top-0 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,214,150,.55),rgba(255,180,120,.12)_35%,transparent_65%)]" />
    </motion.div>
  );
});

export const LensFlare = memo(function LensFlare({ xn, yn, opacity }) {
  // flares sit on the line from the sun through the centre of the screen
  const flares = [
    [0.55, 70, 'rgba(255,200,140,.18)'],
    [0.85, 26, 'rgba(160,220,255,.25)'],
    [1.2, 120, 'rgba(255,160,200,.08)'],
    [1.45, 40, 'rgba(255,230,160,.22)'],
    [1.75, 180, 'rgba(140,200,255,.07)'],
  ];
  const visibility = useVis(opacity);
  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[25]" style={{ opacity, visibility }}>
      {flares.map(([k, r, c], i) => (
        <Flare key={i} xn={xn} yn={yn} k={k} r={r} c={c} />
      ))}
    </motion.div>
  );
});
function Flare({ xn, yn, k, r, c }) {
  const left = useTransform(xn, (v) => `${v + (50 - v) * k}vw`);
  const top = useTransform(yn, (v) => `${v + (50 - v) * k}svh`);
  return <motion.span className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left, top, width: r, height: r, background: `radial-gradient(circle, ${c}, transparent 70%)`, boxShadow: `inset 0 0 ${r / 6}px ${c}` }} />;
}

/* ── Clouds ────────────────────────────────────────────── */
const CLOUD = 'M20 70 Q0 70 4 52 Q8 36 28 40 Q30 14 60 16 Q80 0 104 14 Q130 4 146 26 Q172 22 176 46 Q196 50 190 66 Q186 74 170 72 Z';
export const Clouds = memo(function Clouds({ x, light, shade, opacity = 1, top = '8svh', scale = 1, count = 6, blur = 0 }) {
  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 will-change-transform" style={{ x, top, opacity }}>
      <div className="cloud-drift relative h-[30svh] w-[400vw]" style={{ filter: blur ? `blur(${blur}px)` : undefined, willChange: 'transform' }}>
        {Array.from({ length: count }).map((_, i) => {
          const w = (9 + rnd(i, 7) * 10) * scale;
          return (
            <svg key={i} viewBox="0 0 200 80" className="absolute overflow-visible" style={{ left: `${i * (400 / count) + rnd(i, 8) * 30}vw`, top: `${rnd(i, 9) * 14}svh`, width: `${w}vw` }}>
              <defs>
                <linearGradient id={`cl-${top}-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <motion.stop offset=".1" stopColor={light} />
                  <motion.stop offset="1" stopColor={shade} />
                </linearGradient>
              </defs>
              <path d={CLOUD} fill={`url(#cl-${top}-${i})`} />
              <path d="M28 40 Q30 14 60 16 Q80 0 104 14" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
            </svg>
          );
        })}
      </div>
    </motion.div>
  );
});

/* ── Kuala Lumpur skyline (Petronas, KL Tower, the rest) ─ */
function SkylineArt({ fill, windows }) {
  const blocks = [];
  let x = 0;
  for (let i = 0; x < 1600; i++) {
    const w = 28 + rnd(i, 11) * 46;
    const h = 40 + rnd(i, 12) * 120;
    if (!(x > 620 && x < 860) && !(x > 1200 && x < 1300)) blocks.push([x, w, h, i]);
    x += w + 4 + rnd(i, 13) * 10;
  }
  const tower = (cx) => (
    <g>
      <path d={`M${cx - 26} 300 V120 L${cx - 20} 112 V80 L${cx - 14} 72 V48 L${cx - 8} 40 V20 L${cx} 0 L${cx + 8} 20 V40 L${cx + 14} 48 V72 L${cx + 20} 80 V112 L${cx + 26} 120 V300 Z`} />
      <rect x={cx - 1} y="-46" width="2" height="48" />
    </g>
  );
  return (
    <svg viewBox="0 0 1600 300" preserveAspectRatio="xMinYMax meet" className="h-full w-auto shrink-0 overflow-visible">
      <motion.g style={{ fill }}>
        {blocks.map(([bx, w, h, i]) => (
          <rect key={i} x={bx} y={300 - h} width={w} height={h} />
        ))}
        {tower(700)}
        {tower(790)}
        <rect x="700" y="150" width="90" height="6" />
        {/* KL Tower */}
        <rect x="1244" y="110" width="12" height="190" />
        <ellipse cx="1250" cy="110" rx="26" ry="12" />
        <rect x="1236" y="92" width="28" height="12" rx="4" />
        <rect x="1249" y="20" width="2" height="74" />
      </motion.g>
      <motion.g style={{ opacity: windows }} fill="#ffd98a">
        {blocks.flatMap(([bx, w, h, i]) =>
          Array.from({ length: Math.floor(h / 14) }).flatMap((_, r) =>
            Array.from({ length: Math.floor(w / 10) }).map((__, c) =>
              rnd(i * 31 + r * 7 + c, 5) > 0.72 ? <rect key={`${i}-${r}-${c}`} x={bx + 4 + c * 10} y={300 - h + 6 + r * 14} width="4" height="5" /> : null,
            ),
          ),
        )}
        <g fill="#fff4d6" filter="url(#glow-soft)">
          {[700, 790].map((cx) => Array.from({ length: 16 }).map((_, r) => <rect key={`${cx}${r}`} x={cx - 18} y={130 + r * 10} width="36" height="2" opacity={0.5 + (r % 3) * 0.2} />))}
          <circle cx="700" cy="-46" r="2.5" fill="#ff5a6e" />
          <circle cx="790" cy="-46" r="2.5" fill="#ff5a6e" />
          <ellipse cx="1250" cy="110" rx="22" ry="3" />
          <circle cx="1250" cy="20" r="2.5" fill="#ff5a6e" />
        </g>
      </motion.g>
    </svg>
  );
}
export const Skyline = memo(function Skyline({ x, fill, windows, bottom, height }) {
  return (
    <motion.div aria-hidden className="pointer-events-none absolute left-0 flex will-change-transform" style={{ x, bottom, height }}>
      {[0, 1, 2, 3].map((i) => <SkylineArt key={i} fill={fill} windows={windows} />)}
    </motion.div>
  );
});

/* ── Fireflies (night) and floating light motes (day) ───── */
export const Particles = memo(function Particles({ p, s }) {
  const ref = useRef(null);
  useEffect(() => {
    if (reduced()) return;
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    let raf;
    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const N = W < 700 ? 40 : 80;
    const parts = Array.from({ length: N }, (_, i) => ({
      x: rnd(i, 21) * 1.4,
      y: 0.35 + rnd(i, 22) * 0.6,
      z: 0.4 + rnd(i, 23) * 1.2, // depth: parallax + size
      ph: rnd(i, 24) * Math.PI * 2,
      sp: 0.4 + rnd(i, 25),
    }));
    // pre-render one soft glow per colour; drawing scaled sprites is far cheaper than gradients per frame
    const sprite = (col) => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const g = c.getContext('2d');
      const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, `rgba(${col},1)`);
      gr.addColorStop(0.25, `rgba(${col},.45)`);
      gr.addColorStop(1, `rgba(${col},0)`);
      g.fillStyle = gr;
      g.fillRect(0, 0, 64, 64);
      return c;
    };
    const FIREFLY = sprite('190,255,140');
    const MOTE = sprite('255,226,160');
    const tick = (t) => {
      const pr = p.get();
      const off = s.get();
      ctx.clearRect(0, 0, W, H);
      const night = Math.max(0, 1 - pr / 0.5);
      const day = 1 - night;
      const img = night > 0.5 ? FIREFLY : MOTE;
      const tt = t / 1000;
      for (const q of parts) {
        let x = ((q.x - off * 0.35 * q.z + Math.sin(tt * 0.3 * q.sp + q.ph) * 0.03) % 1.4 + 1.4) % 1.4;
        x = (x - 0.2) * W;
        const y = (q.y + Math.cos(tt * 0.4 * q.sp + q.ph) * 0.03 - (day * ((tt * 0.01 * q.sp) % 0.6))) * H;
        const blink = 0.5 + 0.5 * Math.sin(tt * 2 * q.sp + q.ph);
        const r = (night ? 2.2 : 1.6) * q.z * 6;
        const a = night * blink * 0.9 + day * 0.35 * (0.5 + 0.5 * blink);
        if (a < 0.02 || x < -r || x > W + r) continue;
        ctx.globalAlpha = Math.min(1, a);
        ctx.drawImage(img, x - r, y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [p, s]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-[12] h-full w-full" />;
});

/* ── Film grain + vignette ──────────────────────────────── */
export const PostFX = memo(function PostFX() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[35] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,10,.55)_100%)]" />
      <div className="grain" />
    </div>
  );
});

/* ── Cinematic opening ──────────────────────────────────── */
export const Intro = memo(function Intro() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined' || reduced()) return false;
    try {
      return !sessionStorage.getItem('intro-seen');
    } catch {
      return true;
    }
  });
  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem('intro-seen', '1');
    } catch {
      /* private mode */
    }
    const t = setTimeout(() => setShow(false), 3000);
    const skip = () => setShow(false);
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('wheel', skip, { once: true, passive: true });
    window.addEventListener('touchstart', skip, { once: true, passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchstart', skip);
    };
  }, [show]);
  const name = 'JEFF LAM';
  return (
    <AnimatePresence>
      {show && (
        <motion.div key="intro" className="fixed inset-0 z-[90] cursor-pointer" onClick={() => setShow(false)} exit={{ opacity: 1, transition: { duration: 0.9 } }}>
          {/* the two halves slide apart to open the curtain */}
          <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-[#05060f]" exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.7, 0, 0.2, 1] } }} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#05060f]" exit={{ y: '100%', transition: { duration: 0.9, ease: [0.7, 0, 0.2, 1] } }} />
          <motion.div className="absolute inset-0 grid place-items-center" exit={{ opacity: 0, scale: 1.15, filter: 'blur(12px)', transition: { duration: 0.5 } }}>
            <div className="text-center">
              <motion.p initial={{ opacity: 0, letterSpacing: '1.2em' }} animate={{ opacity: 0.8, letterSpacing: '0.5em' }} transition={{ duration: 1.4, ease: 'easeOut' }} className="mb-4 text-[11px] font-semibold uppercase text-gold-soft sm:text-sm">
                A story in seven places
              </motion.p>
              <h1 className="intro-name flex justify-center" aria-label={name}>
                {name.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    initial={{ opacity: 0, y: 60, filter: 'blur(14px)', scale: 1.4 }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                ))}
              </h1>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-5 h-px w-[min(520px,70vw)] bg-gradient-to-r from-transparent via-gold-soft to-transparent" />
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7 }} className="mt-5 font-display text-lg italic text-slate-300 sm:text-xl">
                Backend · Cloud · Reliability
              </motion.p>
            </div>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.6 }} className="absolute bottom-6 inset-x-0 text-center text-xs uppercase tracking-[0.3em] text-slate-400">
            click to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
