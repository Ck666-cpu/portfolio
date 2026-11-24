import { memo } from 'react';
import { motion } from 'framer-motion';
import Stage from './Stage.jsx';

// The places along Jeff's route. Each is drawn in a 600×400 box standing on the ground (y = 400).
// Clickable outlines in World.jsx (DOORS, WORKSHOP_BOX) match the Arena, Workshop and Exchange 106
// footprints, and the Park hoop/rim positions match the basketball shot paths below.

/* ── Shared props ──────────────────────────────────────── */

function Tree({ x, s = 1, c = '#2f7d4f', dark = false }) {
  return (
    <g transform={`translate(${x} 400) scale(${s})`} style={dark ? { filter: 'brightness(.6) saturate(.8)' } : undefined}>
      <path d="M-7 0 L-5 -72 Q0 -78 5 -72 L8 0 Z" fill="#5a3a28" />
      <path d="M-2 0 L-1 -70" stroke="#3b2418" strokeWidth="2" opacity=".6" />
      <path d="M1 -40 Q14 -52 22 -66" stroke="#5a3a28" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g style={{ filter: 'brightness(.62)' }}>
        <circle cx="-30" cy="-70" r="28" fill={c} /><circle cx="30" cy="-68" r="30" fill={c} /><circle cx="0" cy="-100" r="44" fill={c} />
      </g>
      <circle cx="-22" cy="-80" r="24" fill={c} />
      <circle cx="24" cy="-80" r="25" fill={c} />
      <circle cx="-4" cy="-108" r="34" fill={c} />
      <circle cx="-14" cy="-118" r="18" fill="#fff" opacity=".13" />
      <circle cx="-30" cy="-88" r="10" fill="#fff" opacity=".1" />
      <circle cx="18" cy="-96" r="9" fill="#fff" opacity=".08" />
    </g>
  );
}

function Palm({ x, s = 1 }) {
  const fronds = [-170, -140, -112, -78, -45, -15, 12];
  return (
    <g transform={`translate(${x} 400) scale(${s})`}>
      <path d="M-7 0 Q-4 -90 8 -170 L16 -170 Q6 -90 7 0 Z" fill="#8a6a48" />
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d={`M${-6 + i * 0.9} ${-8 - i * 11.5} q7 -3 13 0`} stroke="#5e4630" strokeWidth="1.6" fill="none" />
      ))}
      <g transform="translate(12 -170)">
        {fronds.map((r, i) => (
          <g key={i} transform={`rotate(${r})`}>
            <path d="M0 0 Q38 -18 82 6 Q40 -4 0 0 Z" fill={i % 2 ? '#2f8a4a' : '#3c9d55'} />
            <path d="M0 0 Q38 -14 82 6" stroke="#1f5e33" strokeWidth="1" fill="none" />
            {[18, 34, 50, 66].map((d) => <path key={d} d={`M${d} ${-d * 0.12 - 2} l6 10`} stroke="#1f5e33" strokeWidth=".8" opacity=".7" />)}
          </g>
        ))}
        <circle cx="-4" cy="6" r="5" fill="#6b4a2a" /><circle cx="4" cy="8" r="5" fill="#5a3d22" /><circle cx="0" cy="12" r="4.5" fill="#6b4a2a" />
      </g>
    </g>
  );
}

function Bush({ x, y = 400, s = 1, c = '#3f8f5c' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="-12" rx="26" ry="16" fill={c} style={{ filter: 'brightness(.7)' }} />
      <circle cx="-14" cy="-14" r="13" fill={c} /><circle cx="6" cy="-20" r="15" fill={c} /><circle cx="18" cy="-10" r="11" fill={c} />
      <circle cx="0" cy="-26" r="6" fill="#fff" opacity=".12" />
    </g>
  );
}

function Flowers({ x, y = 400, colors = ['#f472b6', '#fde047', '#f8fafc'] }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[-16, -8, 0, 8, 16, 24].map((dx, i) => (
        <g key={i}>
          <path d={`M${dx} 0 q${i % 2 ? 2 : -2} -8 0 -${12 + (i % 3) * 4}`} stroke="#3f7d3a" strokeWidth="1.5" fill="none" />
          <circle cx={dx} cy={-(12 + (i % 3) * 4)} r="3" fill={colors[i % colors.length]} />
          <circle cx={dx} cy={-(12 + (i % 3) * 4)} r="1" fill="#92400e" />
        </g>
      ))}
    </g>
  );
}

function Lantern({ x, y, rope = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {rope > 0 && <line x1="0" y1={-rope} x2="0" y2="-5" stroke="#3b2418" strokeWidth="1.2" />}
      <g className={rope > 0 ? 'sway' : undefined}>
        <circle cx="0" cy="10" r="34" fill="url(#lamp-halo)" />
        <rect x="-4" y="-5" width="8" height="5" fill="#78350f" />
        <rect x="-7" y="0" width="14" height="20" rx="3" fill="#fde68a" stroke="#78350f" strokeWidth="2" filter="url(#glow)" />
        <path d="M-7 7 h14 M-7 13 h14" stroke="#78350f" strokeWidth="1" opacity=".6" />
      </g>
    </g>
  );
}

function StreetLamp({ x, h = 150 }) {
  return (
    <g transform={`translate(${x} 400)`}>
      <rect x="-2.5" y={-h} width="5" height={h} fill="#334155" />
      <rect x="-5" y="-8" width="10" height="8" rx="2" fill="#1e293b" />
      <path d={`M0 ${-h} q0 -12 14 -12 h4`} stroke="#334155" strokeWidth="4" fill="none" />
      <path d={`M10 ${-h - 14} h16 l-3 6 h-10 Z`} fill="#1e293b" />
      <ellipse cx="18" cy={-h - 7} rx="6" ry="2.5" fill="#fff3c4" filter="url(#glow)" />
    </g>
  );
}

/* ── Home: a two-storey Malaysian link house ───────────── */
export function Home() {
  return (
    <Stage shadow={[270, 220]}>
      <defs>
        <pattern id="h-tile" width="18" height="11" patternUnits="userSpaceOnUse">
          <rect width="18" height="11" fill="#b5452e" />
          <path d="M0 11 Q4.5 3 9 11 Q13.5 3 18 11" fill="#cd5a3c" stroke="#7d2a1b" strokeWidth="1" />
        </pattern>
        <linearGradient id="h-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fbf1dc" /><stop offset="1" stopColor="#e6d1a8" /></linearGradient>
        <linearGradient id="h-roof" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".28" /></linearGradient>
        <linearGradient id="h-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1b2b52" /><stop offset="1" stopColor="#0d1530" /></linearGradient>
        <linearGradient id="h-door" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#14857a" /><stop offset="1" stopColor="#0b4f4a" /></linearGradient>
      </defs>
      <Palm x={548} s={0.95} />
      <Bush x={86} s={1.1} c="#2f7d4f" />

      {/* upper floor */}
      <rect x="112" y="186" width="316" height="80" fill="url(#h-wall)" />
      {/* my room: dark, monitor glowing */}
      <rect x="144" y="200" width="98" height="54" rx="2" fill="#efe6d6" />
      <rect x="150" y="205" width="86" height="44" fill="url(#h-night)" />
      <rect x="150" y="205" width="14" height="44" fill="#7c6bb0" opacity=".85" />
      <rect x="222" y="205" width="14" height="44" fill="#7c6bb0" opacity=".85" />
      <rect x="176" y="218" width="32" height="20" rx="2" fill="#5eead4" filter="url(#glow)" />
      <path d="M180 222 h14 M180 226 h20 M180 230 h10" stroke="#0f766e" strokeWidth="1.5" />
      <rect x="190" y="238" width="4" height="6" fill="#1e293b" />
      <rect x="168" y="244" width="52" height="3" fill="#2a3a5c" />
      <path d="M214 244 v-12 l6 -4" stroke="#475569" strokeWidth="1.5" fill="none" />
      <circle cx="221" cy="227" r="2.5" fill="#fde68a" filter="url(#glow-soft)" />
      <g stroke="#efe6d6" strokeWidth="1.4" opacity=".75">{[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={157 + i * 12} y1="205" x2={157 + i * 12} y2="249" />)}</g>
      {/* aircon compressor */}
      <rect x="252" y="224" width="36" height="24" rx="2" fill="#e2e8f0" stroke="#94a3b8" />
      <circle className="spin" cx="264" cy="236" r="8" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" />
      <path d="M276 228 v16 M280 228 v16 M284 228 v16" stroke="#94a3b8" />
      <path d="M286 248 v40" stroke="#cbd5e1" strokeWidth="2" />
      {/* family room: warm light */}
      <rect x="298" y="200" width="98" height="54" rx="2" fill="#efe6d6" />
      <rect x="304" y="205" width="86" height="44" fill="url(#warm)" filter="url(#glow-soft)" />
      <path d="M304 205 q10 22 2 44 h-2 Z M390 205 q-10 22 -2 44 h2 Z" fill="#e8b4a0" />
      <path d="M352 249 v-12 q0 -10 -8 -14 M352 237 q4 -12 12 -10" stroke="#3f6b3a" strokeWidth="2" fill="none" />
      <rect x="346" y="242" width="12" height="7" fill="#9a3412" />
      <g stroke="#efe6d6" strokeWidth="1.4" opacity=".75">{[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={311 + i * 12} y1="205" x2={311 + i * 12} y2="249" />)}</g>

      {/* hip roof with clay tiles */}
      <path d="M84 186 L176 102 H364 L456 186 Z" fill="url(#h-tile)" />
      <path d="M84 186 L176 102 H364 L456 186 Z" fill="url(#h-roof)" />
      <path d="M176 102 H364" stroke="#7d2a1b" strokeWidth="5" strokeLinecap="round" />
      <path d="M84 186 L176 102 M456 186 L364 102" stroke="#8e3324" strokeWidth="4" />
      <rect x="78" y="184" width="384" height="8" rx="2" fill="#f1e9da" />
      <rect x="78" y="190" width="384" height="3" fill="#000" opacity=".15" />

      {/* porch awning */}
      <rect x="112" y="266" width="316" height="134" fill="url(#h-wall)" />
      <path d="M94 266 H446 L462 290 H78 Z" fill="url(#h-tile)" />
      <path d="M94 266 H446 L462 290 H78 Z" fill="url(#h-roof)" />
      <rect x="76" y="289" width="388" height="6" rx="2" fill="#f1e9da" />
      <rect x="112" y="295" width="316" height="10" fill="#000" opacity=".12" />

      {/* sliding glass doors: living room */}
      <rect x="136" y="310" width="132" height="90" fill="#efe6d6" />
      <rect x="142" y="316" width="120" height="84" fill="url(#warm)" filter="url(#glow-soft)" />
      <path d="M150 400 v-26 h44 v26 M150 374 q22 -10 44 0" fill="#c2410c" opacity=".55" />
      <path d="M232 400 v-50 M224 350 h16 l-4 -12 h-8 Z" stroke="#7c2d12" fill="#fff7d6" strokeWidth="2" />
      <path d="M182 316 v84 M222 316 v84" stroke="#efe6d6" strokeWidth="4" />
      <g stroke="#3b2f2a" strokeWidth="1" opacity=".45">{Array.from({ length: 14 }).map((_, i) => <line key={i} x1={146 + i * 8.5} y1="316" x2={146 + i * 8.5} y2="400" />)}</g>
      {/* front door + porch lamp */}
      <rect x="292" y="306" width="64" height="94" fill="#efe6d6" />
      <rect x="298" y="312" width="52" height="88" rx="2" fill="url(#h-door)" />
      <rect x="304" y="320" width="18" height="30" rx="2" fill="none" stroke="#0a3d39" strokeWidth="2" />
      <rect x="326" y="320" width="18" height="30" rx="2" fill="none" stroke="#0a3d39" strokeWidth="2" />
      <rect x="304" y="358" width="40" height="34" rx="2" fill="none" stroke="#0a3d39" strokeWidth="2" />
      <circle cx="340" cy="356" r="3" fill="#fbbf24" />
      <rect x="364" y="318" width="8" height="10" rx="2" fill="#fff2c4" filter="url(#glow)" />
      <path d="M300 300 L250 400 H420 Z" fill="url(#spill)" opacity=".35" />

      {/* front fence with an open gate */}
      {[[100, 236], [338, 434]].map(([a, b]) => (
        <g key={a}>
          <rect x={a} y="384" width={b - a} height="16" fill="#e9dcc0" />
          <rect x={a} y="358" width={b - a} height="4" fill="#1f2937" />
          {Array.from({ length: Math.floor((b - a) / 9) }).map((_, i) => <rect key={i} x={a + 4 + i * 9} y="360" width="2" height="24" fill="#1f2937" />)}
        </g>
      ))}
      <rect x="92" y="346" width="16" height="54" fill="#f1e6cc" /><rect x="90" y="342" width="20" height="6" fill="#d6c6a4" />
      <rect x="432" y="346" width="16" height="54" fill="#f1e6cc" /><rect x="430" y="342" width="20" height="6" fill="#d6c6a4" />
      {/* the cat on the gate pillar */}
      <g transform="translate(440 342)">
        <path className="tail" d="M6 -2 q12 -2 10 -16" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" style={{ transformOrigin: '6px -2px' }} />
        <ellipse cx="0" cy="-6" rx="8" ry="6" fill="#1f2937" />
        <circle cx="-6" cy="-14" r="5" fill="#1f2937" />
        <path d="M-10 -17 l1 -5 3 3 M-4 -18 l2 -4 1 5" fill="#1f2937" stroke="#1f2937" />
        <circle cx="-8" cy="-14" r="1" fill="#fde047" />
      </g>
      <path d="M118 400 q-4 -22 8 -28 q12 6 8 28 Z" fill="#b45309" />
      <Bush x={126} y={374} s={0.55} c="#3f9b5c" />
      <rect x="466" y="336" width="5" height="64" fill="#475569" />
      <rect x="454" y="320" width="30" height="20" rx="6" fill="#e11d48" />
      <text x="469" y="334" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="sans-serif">LAM</text>
      <Flowers x={500} />
    </Stage>
  );
}

/* ── TAR UMT Arena ─────────────────────────────────────── */
export function Academy() {
  // Inspired by the TAR UMT Arena (KL campus): a six-storey building with a tall
  // colonnade facade and a full-size football pitch + running track on its roof.
  const cols = Array.from({ length: 12 });
  return (
    <Stage shadow={[300, 280]}>
      <defs>
        <linearGradient id="a-col" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#b8c2d0" /><stop offset=".4" stopColor="#ffffff" /><stop offset="1" stopColor="#8a96a8" /></linearGradient>
        <linearGradient id="a-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#24497a" /><stop offset="1" stopColor="#0c1d38" /></linearGradient>
        <linearGradient id="a-ban" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f766e" /><stop offset="1" stopColor="#0b4f4a" /></linearGradient>
      </defs>
      {/* floodlight masts */}
      {[118, 482].map((x) => (
        <g key={x}>
          <rect x={x - 2.5} y="28" width="5" height="96" fill="#64748b" />
          <path d={`M${x - 2.5} 60 l-8 64 M${x + 2.5} 60 l8 64`} stroke="#475569" strokeWidth="1.5" />
          <rect x={x - 16} y="18" width="32" height="14" rx="2" fill="#334155" />
          <g filter="url(#glow)">{[0, 1, 2, 3].map((i) => <rect key={i} x={x - 13 + i * 7} y="21" width="5" height="8" fill="#fffbe0" />)}</g>
          <path d={`M${x - 16} 32 L${x - 50} 120 H${x + 50} L${x + 16} 32 Z`} fill="url(#beam)" opacity=".5" />
        </g>
      ))}
      {/* rooftop: running track + football pitch */}
      <path d="M64 170 L112 112 H488 L536 170 Z" fill="#c2410c" />
      {[1, 2, 3].map((i) => (
        <path key={i} d={`M${64 + i * 9} ${170 - i * 1.6} L${112 + i * 7} ${112 + i * 1.6} H${488 - i * 7} L${536 - i * 9} ${170 - i * 1.6}`} fill="none" stroke="#fed7aa" strokeOpacity=".55" strokeWidth=".8" />
      ))}
      <path d="M104 165 L140 119 H460 L496 165 Z" fill="#3f9b4f" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path key={i} d={`M${104 + i * 49} 165 L${140 + i * 40} 119 L${160 + i * 40} 119 L${128.5 + i * 49} 165 Z`} fill="#4caf5e" opacity={i % 2 ? 0 : 0.7} />
      ))}
      <g stroke="#f8fafc" strokeWidth="1.6" fill="none" opacity=".9">
        <path d="M110 161 L143 122 H457 L490 161 Z" /><path d="M300 122 V161" /><ellipse cx="300" cy="141.5" rx="26" ry="9" />
        <path d="M128 140 h36 l-4 14 h-40 Z M472 140 h-36 l4 14 h40 Z" />
      </g>
      {/* glass railing + seating */}
      <path d="M60 162 H540 V170 H60 Z" fill="#bae6fd" opacity=".35" />
      <path d="M60 170 H540 V182 H60 Z" fill="#cbd5e1" />
      {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={66 + i * 19.6} y="172" width="14" height="4" rx="1" fill={i % 3 ? '#0f766e' : '#14b8a6'} />)}

      {/* six storeys of glass */}
      <rect x="70" y="182" width="460" height="196" fill="url(#a-glass)" />
      {[0, 1, 2, 3, 4, 5].map((f) => (
        <g key={f}>
          <rect x="70" y={182 + f * 32.6} width="460" height="4" fill="#081a33" />
          {Array.from({ length: 11 }).map((_, c) => {
            const lit = (f * 5 + c) % 7 === 0 || (f * 3 + c) % 11 === 0;
            return <rect key={c} x={88 + c * 40} y={191 + f * 32.6} width="22" height="19" fill={lit ? '#ffe9a8' : '#60a5fa'} opacity={lit ? 1 : 0.22} filter={lit ? 'url(#glow-soft)' : undefined} />;
          })}
        </g>
      ))}
      {/* sky reflections across the glass */}
      <path d="M110 378 L200 182 H240 L150 378 Z M330 378 L420 182 H436 L346 378 Z" fill="#fff" opacity=".06" />

      {/* the grand colonnade */}
      <rect x="62" y="182" width="476" height="12" fill="#f1f5f9" />
      <rect x="62" y="192" width="476" height="3" fill="#000" opacity=".15" />
      {cols.map((_, i) => (
        <g key={i}>
          <rect x={70 + i * 40} y="194" width="18" height="184" fill="url(#a-col)" />
          <rect x={68 + i * 40} y="194" width="22" height="5" fill="#e2e8f0" />
          <rect x={68 + i * 40} y="372" width="22" height="6" fill="#cbd5e1" />
        </g>
      ))}
      {/* banners */}
      {[150, 430].map((x) => (
        <g key={x} className="sway" style={{ animationDuration: '4s' }}>
          <rect x={x - 2} y="204" width="24" height="3" fill="#e3c27a" />
          <path d={`M${x} 207 h20 v58 l-10 -7 l-10 7 Z`} fill="url(#a-ban)" />
          <text x={x + 10} y="228" textAnchor="middle" fontSize="7" fontWeight="800" fill="#e3c27a" fontFamily="Fraunces, Georgia, serif">TAR</text>
          <text x={x + 10} y="240" textAnchor="middle" fontSize="7" fontWeight="800" fill="#e3c27a" fontFamily="Fraunces, Georgia, serif">UMT</text>
          <circle cx={x + 10} cy="250" r="3" fill="none" stroke="#e3c27a" strokeWidth="1" />
        </g>
      ))}

      {/* entrance + canopy + steps */}
      <rect x="250" y="324" width="100" height="54" fill="#0b1020" />
      <rect x="256" y="330" width="42" height="48" fill="url(#warm)" opacity=".75" />
      <rect x="302" y="330" width="42" height="48" fill="url(#warm)" opacity=".75" />
      <path d="M299 330 v48" stroke="#0b1020" strokeWidth="3" />
      <path d="M226 312 H374 L388 324 H212 Z" fill="#e2e8f0" />
      <rect x="212" y="324" width="176" height="4" fill="#94a3b8" />
      {[230, 260, 340, 370].map((x) => <circle key={x} cx={x} cy="327" r="1.8" fill="#fff7d6" filter="url(#glow-soft)" />)}
      <rect x="54" y="378" width="492" height="22" fill="#cbd5e1" opacity=".9" />
      <rect x="230" y="378" width="140" height="8" fill="#e2e8f0" />
      <rect x="216" y="386" width="168" height="14" fill="#94a3b8" />
      {/* planters */}
      {[[60, 200], [400, 540]].map(([a, b]) => (
        <g key={a}>
          <rect x={a} y="386" width={b - a} height="14" rx="2" fill="#64748b" />
          {Array.from({ length: Math.floor((b - a) / 24) }).map((_, i) => <Bush key={i} x={a + 14 + i * 24} y={390} s={0.5} c={i % 2 ? '#2f7d4f' : '#3f8f5c'} />)}
        </g>
      ))}
      {/* name band */}
      <rect x="216" y="270" width="168" height="30" rx="4" fill="#13213b" stroke="#e3c27a" strokeWidth="1.5" />
      <text x="300" y="291" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffe3a0" fontFamily="Fraunces, Georgia, serif" filter="url(#glow-soft)">TAR UMT ARENA</text>
    </Stage>
  );
}

/* ── The Workshop: brick garage full of servers ────────── */
export function Workshop() {
  return (
    <Stage shadow={[300, 230]}>
      <defs>
        <pattern id="w-brick" width="40" height="20" patternUnits="userSpaceOnUse">
          <rect width="40" height="20" fill="#7a3a26" />
          <rect x="1" y="1" width="38" height="8" rx="1" fill="#a9573a" />
          <rect x="-19" y="11" width="38" height="8" rx="1" fill="#9a4d33" />
          <rect x="21" y="11" width="38" height="8" rx="1" fill="#b4613f" />
        </pattern>
        <pattern id="w-corr" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#52525b" /><rect width="4" height="10" fill="#71717a" />
        </pattern>
        <linearGradient id="w-shut" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a1a1aa" /><stop offset="1" stopColor="#71717a" /></linearGradient>
        <linearGradient id="w-inside" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b1a2a" /><stop offset="1" stopColor="#06101c" /></linearGradient>
        <linearGradient id="w-rack" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1e293b" /><stop offset=".5" stopColor="#334155" /><stop offset="1" stopColor="#0f172a" /></linearGradient>
        <clipPath id="w-wall"><rect x="110" y="172" width="360" height="228" /></clipPath>
      </defs>
      {/* crates + drum outside */}
      <rect x="496" y="352" width="48" height="48" fill="#a16207" stroke="#713f12" strokeWidth="2" />
      <path d="M496 352 l48 48 M544 352 l-48 48" stroke="#713f12" strokeWidth="2" />
      <rect x="506" y="318" width="34" height="34" fill="#b45309" stroke="#713f12" strokeWidth="2" />
      <rect x="62" y="346" width="34" height="54" rx="4" fill="#1d4ed8" />
      <path d="M62 360 h34 M62 386 h34" stroke="#1e3a8a" strokeWidth="3" />
      <ellipse cx="79" cy="346" rx="17" ry="4" fill="#3b82f6" />

      {/* brick walls */}
      <rect x="110" y="172" width="360" height="228" fill="url(#w-brick)" />
      <rect x="110" y="172" width="360" height="228" fill="url(#lit-ao)" opacity=".5" />
      <g clipPath="url(#w-wall)"><rect x="110" y="172" width="360" height="30" fill="#000" opacity=".25" /></g>
      {/* corrugated gable roof */}
      <path d="M92 180 L290 106 L488 180 Z" fill="url(#w-corr)" />
      <path d="M92 180 L290 106 L488 180" fill="none" stroke="#27272a" strokeWidth="5" strokeLinejoin="round" />
      <rect x="88" y="178" width="404" height="6" fill="#3f3f46" />
      <rect x="402" y="112" width="26" height="46" fill="#52525b" />
      <rect x="398" y="108" width="34" height="6" fill="#3f3f46" />
      <circle className="smoke" cx="415" cy="98" r="9" fill="#e5e7eb" opacity=".55" />
      <circle className="smoke" cx="415" cy="98" r="7" fill="#e5e7eb" opacity=".45" style={{ animationDelay: '1.5s' }} />

      {/* neon sign */}
      <rect x="212" y="186" width="156" height="34" rx="6" fill="#0b1020" stroke="#334155" strokeWidth="2" />
      <text className="neon" x="290" y="209" textAnchor="middle" fontSize="15" fontWeight="800" fill="#a7fff0" fontFamily="monospace" filter="url(#glow)">&lt;/&gt; WORKSHOP</text>
      <path d="M230 186 l-6 -14 M350 186 l6 -14" stroke="#52525b" strokeWidth="1.5" />

      {/* garage opening */}
      <rect x="166" y="228" width="248" height="172" fill="#3f3f46" />
      <rect x="172" y="232" width="236" height="168" fill="url(#w-inside)" />
      <rect x="172" y="232" width="236" height="168" fill="url(#garage)" />
      {/* hanging cables */}
      <path d="M180 266 q30 18 60 0 q30 16 70 2 q30 14 90 -2" stroke="#0f172a" strokeWidth="3" fill="none" />
      <path d="M190 266 q40 26 90 4" stroke="#14b8a6" strokeWidth="1.5" fill="none" opacity=".6" />
      {/* server racks */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${192 + i * 72} 270)`}>
          <rect width="52" height="130" rx="3" fill="url(#w-rack)" stroke="#475569" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <g key={j}>
              <rect x="5" y={8 + j * 20} width="42" height="13" rx="2" fill="#0b1220" />
              <path d={`M9 ${12 + j * 20} h18 M9 ${16 + j * 20} h14`} stroke="#334155" strokeWidth="1.2" />
              <circle className="led" cx="40" cy={14.5 + j * 20} r="2.4" filter="url(#glow-soft)" fill={j % 3 ? '#4ade80' : '#2dd4bf'} style={{ animationDelay: `${(i * 7 + j) * 0.17}s` }} />
              <circle cx="33" cy={14.5 + j * 20} r="1.8" fill="#f59e0b" opacity=".8" />
            </g>
          ))}
        </g>
      ))}
      {/* roller shutter, rolled half up */}
      <rect x="168" y="228" width="244" height="40" fill="url(#w-shut)" />
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x="168" y={231 + i * 5} width="244" height="1.5" fill="#52525b" />)}
      <rect x="168" y="266" width="244" height="5" fill="#3f3f46" />
      <rect x="282" y="268" width="16" height="4" rx="2" fill="#18181b" />
      {/* light spilling out onto the ground */}
      <path d="M172 400 H408 L452 432 H128 Z" fill="#5eead4" opacity=".14" />

      {/* wall lamp + exhaust fan */}
      <path d="M128 234 h12 v6 h-12 Z" fill="#27272a" />
      <path d="M126 240 h16 l-3 7 h-10 Z" fill="#fff3c4" filter="url(#glow)" />
      <circle cx="440" cy="246" r="18" fill="#27272a" />
      <g className="spin">
        {[0, 90, 180, 270].map((r) => <path key={r} d="M440 246 q4 -12 0 -15 q-6 4 0 15" fill="#a1a1aa" transform={`rotate(${r} 440 246)`} />)}
      </g>
      <circle cx="440" cy="246" r="18" fill="none" stroke="#52525b" strokeWidth="3" />
      <path d="M458 290 V400" stroke="#64748b" strokeWidth="5" />
      {/* toolbox */}
      <rect x="430" y="374" width="44" height="26" rx="3" fill="#dc2626" />
      <rect x="430" y="384" width="44" height="3" fill="#7f1d1d" />
      <rect x="442" y="366" width="20" height="9" rx="3" fill="none" stroke="#7f1d1d" strokeWidth="3" />
    </Stage>
  );
}

/* ── The Quest Board ───────────────────────────────────── */
export function QuestBoard() {
  const cards = [
    [176, 196, '#fef3c7', '#f59e0b', -4], [262, 192, '#ccfbf1', '#14b8a6', 3], [350, 198, '#fee2e2', '#ef4444', -2],
    [190, 268, '#e0f2fe', '#3b82f6', 2], [284, 272, '#fef9c3', '#eab308', -3], [372, 264, '#ede9fe', '#8b5cf6', 4],
  ];
  return (
    <Stage shadow={[300, 220]}>
      <defs>
        <linearGradient id="q-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#5a3a22" /><stop offset=".5" stopColor="#8a5a32" /><stop offset="1" stopColor="#4a2f1b" /></linearGradient>
        <linearGradient id="q-frame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a5a32" /><stop offset="1" stopColor="#5a3a22" /></linearGradient>
        <radialGradient id="q-cork" cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#d9a560" /><stop offset="1" stopColor="#a8743a" /></radialGradient>
        <pattern id="q-speck" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r=".9" fill="#7a4f22" opacity=".5" /><circle cx="8" cy="9" r=".7" fill="#7a4f22" opacity=".4" /><circle cx="9" cy="2" r=".5" fill="#fff" opacity=".2" />
        </pattern>
        <pattern id="q-shingle" width="16" height="10" patternUnits="userSpaceOnUse">
          <rect width="16" height="10" fill="#5b2a14" /><rect x="1" y="0" width="14" height="8" rx="2" fill="#7c3a1c" />
        </pattern>
      </defs>
      <Tree x={548} s={0.95} c="#2f7d4f" dark />
      {/* posts */}
      <rect x="138" y="150" width="16" height="250" fill="url(#q-wood)" />
      <rect x="446" y="150" width="16" height="250" fill="url(#q-wood)" />
      {/* shingle roof */}
      <path d="M112 162 L300 102 L488 162 L478 172 H122 Z" fill="url(#q-shingle)" />
      <path d="M112 162 L300 102 L488 162" fill="none" stroke="#3b1a0b" strokeWidth="4" strokeLinejoin="round" />
      <rect x="120" y="170" width="360" height="5" fill="#3b1a0b" opacity=".5" />
      {/* carved sign */}
      <rect x="232" y="118" width="136" height="30" rx="4" fill="url(#q-frame)" stroke="#3b1a0b" strokeWidth="2" />
      <text x="300" y="138" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffd77a" fontFamily="Fraunces, Georgia, serif" filter="url(#glow-soft)">QUEST BOARD</text>
      {/* the board */}
      <rect x="150" y="176" width="300" height="176" rx="4" fill="url(#q-frame)" />
      <rect x="162" y="186" width="276" height="156" fill="url(#q-cork)" />
      <rect x="162" y="186" width="276" height="156" fill="url(#q-speck)" />
      <rect x="162" y="186" width="276" height="10" fill="#000" opacity=".15" />
      {/* red string between the quests */}
      <path d="M207 200 L293 196 L381 202 M293 196 L315 276 L403 268 M221 272 L315 276" stroke="#dc2626" strokeWidth="1.2" fill="none" opacity=".8" />
      {cards.map(([x, y, c, accent, r], i) => (
        <g key={i} transform={`rotate(${r} ${x + 31} ${y})`}>
          <g className="sway" style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${3 + (i % 3) * 0.6}s` }}>
            <rect x={x + 2} y={y + 3} width="62" height="60" fill="#000" opacity=".18" />
            <rect x={x} y={y} width="62" height="60" fill={c} />
            <rect x={x} y={y} width="62" height="10" fill={accent} opacity=".85" />
            <rect x={x + 8} y={y + 18} width="40" height="4" rx="2" fill="#334155" opacity=".7" />
            <rect x={x + 8} y={y + 28} width="46" height="3" rx="1.5" fill="#475569" opacity=".4" />
            <rect x={x + 8} y={y + 36} width="34" height="3" rx="1.5" fill="#475569" opacity=".4" />
            <rect x={x + 8} y={y + 46} width="16" height="6" rx="3" fill={accent} opacity=".5" />
            <circle cx={x + 31} cy={y + 4} r="4.5" fill="#dc2626" stroke="#7f1d1d" />
            <circle cx={x + 30} cy={y + 3} r="1.4" fill="#fff" opacity=".7" />
          </g>
        </g>
      ))}
      <Lantern x={124} y={186} rope={14} />
      <Lantern x={476} y={186} rope={14} />
      {/* barrel */}
      <path d="M476 352 q-6 24 0 48 h40 q6 -24 0 -48 Z" fill="#92400e" />
      <path d="M472 362 h48 M472 390 h48" stroke="#451a03" strokeWidth="3" />
      <path d="M486 352 q-4 24 0 48" stroke="#b45309" strokeWidth="2" fill="none" />
      <ellipse cx="496" cy="352" rx="20" ry="4" fill="#78350f" />
      <Bush x={150} y={402} s={0.6} c="#3f8f5c" />
      <Flowers x={436} />
    </Stage>
  );
}

/* ── The City: Exchange 106 ────────────────────────────── */
export function City() {
  // Inspired by The Exchange 106 (TRX, KL): a slim blue-glass tower that tapers
  // as it rises, topped by a triangulated clear-glass crown that glows at night.
  const floors = Array.from({ length: 26 });
  const xAt = (y, side) => {
    const t = (400 - y) / 360;
    return side < 0 ? 196 + t * 36 : 404 - t * 36;
  };
  const TOWER = 'M196 400 L232 40 H368 L404 400 Z';
  return (
    <Stage shadow={[300, 270]}>
      <defs>
        <linearGradient id="x106-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1d4f8a" /><stop offset=".45" stopColor="#3b82c4" /><stop offset=".55" stopColor="#2a6aab" /><stop offset="1" stopColor="#163e6e" />
        </linearGradient>
        <linearGradient id="x106-crown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0f9ff" /><stop offset="1" stopColor="#a5d8f3" /></linearGradient>
        <radialGradient id="x106-lantern" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#bae6fd" stopOpacity=".55" /><stop offset="1" stopColor="#bae6fd" stopOpacity="0" /></radialGradient>
        <linearGradient id="c-bldg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#64748b" /><stop offset="1" stopColor="#334155" /></linearGradient>
        <linearGradient id="c-bldg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3b4a63" /><stop offset="1" stopColor="#1e293b" /></linearGradient>
        <linearGradient id="c-sweep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".35" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <clipPath id="c-tower"><path d={TOWER} /></clipPath>
      </defs>

      {/* neighbours, linked to the tower by a sky bridge */}
      <rect x="30" y="236" width="120" height="164" fill="url(#c-bldg)" />
      <rect x="26" y="230" width="128" height="8" fill="#94a3b8" />
      {[0, 1, 2, 3, 4, 5].map((r) => [0, 1, 2, 3].map((c) => {
        const lit = (r + c * 2) % 3 === 0;
        return <rect key={`a${r}${c}`} x={42 + c * 26} y={248 + r * 24} width="16" height="13" fill={lit ? '#ffe9a8' : '#94a3b8'} opacity={lit ? 1 : 0.35} filter={lit ? 'url(#glow-soft)' : undefined} />;
      }))}
      <rect x="448" y="168" width="120" height="232" fill="url(#c-bldg2)" />
      <path d="M448 168 L508 140 L568 168 Z" fill="#1e293b" />
      {Array.from({ length: 9 }).map((_, r) => [0, 1, 2, 3].map((c) => {
        const lit = (r * 3 + c) % 4 === 1;
        return <rect key={`b${r}${c}`} x={460 + c * 26} y={182 + r * 24} width="16" height="12" fill={lit ? '#ffe9a8' : '#64748b'} opacity={lit ? 1 : 0.4} filter={lit ? 'url(#glow-soft)' : undefined} />;
      }))}
      <path d={`M${xAt(240, 1) - 6} 236 H448 V256 H${xAt(256, 1) - 6} Z`} fill="#7dd3fc" opacity=".55" />
      <path d={`M${xAt(240, 1) - 6} 236 H448 M${xAt(256, 1) - 6} 256 H448`} stroke="#cbd5e1" strokeWidth="2" />
      {[400, 414, 428, 442].map((x) => <line key={x} x1={x} y1="236" x2={x} y2="256" stroke="#cbd5e1" strokeWidth="1" opacity=".7" />)}

      {/* crown glow */}
      <ellipse cx="300" cy="-10" rx="170" ry="130" fill="url(#x106-lantern)" />
      {/* tapering blue-glass shaft */}
      <path d={TOWER} fill="url(#x106-glass)" />
      <path d="M196 400 L232 40 L240 40 L206 400 Z" fill="#7cc0ec" opacity=".55" />
      <path d="M404 400 L368 40 L360 40 L394 400 Z" fill="#0f2f55" opacity=".6" />
      {[-3, -2, -1, 0, 1, 2, 3].map((k) => (
        <line key={k} x1={300 + k * 26} y1="400" x2={300 + k * 17} y2="40" stroke="#bfe3ff" strokeOpacity=".22" strokeWidth="1.5" />
      ))}
      {floors.map((_, i) => {
        const y = 52 + i * 13.4;
        return <line key={i} x1={xAt(y, -1)} y1={y} x2={xAt(y, 1)} y2={y} stroke="#0b2a4d" strokeOpacity=".35" strokeWidth="1" />;
      })}
      {[[3, 1], [5, -2], [7, -2], [9, 0], [11, 2], [13, -1], [15, -1], [17, 1], [19, 0], [22, 2], [23, -2]].map(([f, k]) => {
        const y = 52 + f * 13.4 + 2;
        return <rect key={f} x={300 + k * 22 - 8} y={y} width="16" height="9" fill="#ffeeb0" filter="url(#glow-soft)" />;
      })}
      {/* sky reflections + a slow light sweep down the glass */}
      <g clipPath="url(#c-tower)">
        <path d="M180 260 L420 120 V150 L180 290 Z" fill="#fff" opacity=".08" />
        <path d="M180 340 L420 200 V212 L180 352 Z" fill="#fff" opacity=".06" />
        <rect className="glass-sweep" x="180" y="0" width="240" height="70" fill="url(#c-sweep)" />
      </g>

      {/* Ant International, high up in the tower */}
      <rect x={xAt(98, -1) + 4} y="94" width={xAt(98, 1) - xAt(98, -1) - 8} height="12" fill="#ffe9a0" filter="url(#glow)" />
      <line x1={xAt(100, 1) + 2} y1="100" x2="462" y2="100" stroke="#e3c27a" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx={xAt(100, 1) + 2} cy="100" r="3.5" fill="#e3c27a" />
      <rect x="462" y="84" width="160" height="32" rx="7" fill="#13213b" stroke="#e3c27a" strokeWidth="1.5" />
      <text x="542" y="105" textAnchor="middle" fontSize="13" fontWeight="800" fill="#e3c27a" fontFamily="sans-serif">ANT INTERNATIONAL</text>

      {/* triangulated glass crown */}
      <path d="M232 40 L248 -52 H352 L368 40 Z" fill="url(#x106-crown)" opacity=".95" />
      <g stroke="#7dbbe0" strokeWidth="1.3" fill="none">
        <path d="M232 40 L262 -6 L248 -52" /><path d="M368 40 L338 -6 L352 -52" />
        <path d="M262 -6 L300 40 L338 -6 L300 -52 Z" />
        <path d="M232 40 L300 -52 M368 40 L300 -52" strokeOpacity=".5" />
        <path d="M240 -6 H360" strokeOpacity=".6" />
        <path d="M262 -6 L281 -29 L300 -6 L319 -29 L338 -6" strokeOpacity=".7" />
        <path d="M262 -6 L281 17 L300 -6 L319 17 L338 -6" strokeOpacity=".7" />
      </g>
      <path d="M248 -52 H352" stroke="#f0faff" strokeWidth="3" filter="url(#glow)" />
      <circle className="led" cx="300" cy="-58" r="3" fill="#ff4d6d" filter="url(#glow)" />
      <path d="M232 40 H368" stroke="#0b2a4d" strokeWidth="2" />

      {/* podium, canopy + warm lobby */}
      <rect x="176" y="350" width="248" height="50" fill="#0b1020" />
      <rect x="190" y="360" width="220" height="40" fill="url(#warm)" opacity=".55" />
      {[220, 250, 280, 320, 350, 380].map((x) => <rect key={x} x={x} y="360" width="3" height="40" fill="#0b1020" />)}
      <path d="M168 344 H432 L440 352 H160 Z" fill="#e2e8f0" />
      <rect x="236" y="262" width="128" height="22" rx="3" fill="#f8fafc" />
      <text x="300" y="277" textAnchor="middle" fontSize="11" fontWeight="800" fill="#13213b" fontFamily="sans-serif" letterSpacing="1">EXCHANGE 106</text>
      <StreetLamp x={160} h={120} />
      <Palm x={436} s={0.55} />
      {/* traffic */}
      {[0, 1].map((i) => (
        <g key={i} className="drive" style={{ animationDelay: `${i * -4.5}s`, animationDuration: `${8 + i * 2}s` }}>
          <g>
            <path d="M0 400 v-10 q0 -4 4 -5 l10 -2 l8 -9 h22 l10 9 l8 2 q4 1 4 5 v10 Z" fill={i ? '#e11d48' : '#f8fafc'} />
            <path d="M24 375 h18 l7 8 h-30 Z" fill="#7dd3fc" opacity=".8" />
            <circle cx="14" cy="400" r="5" fill="#111827" /><circle cx="50" cy="400" r="5" fill="#111827" />
            <ellipse cx="66" cy="390" rx="3" ry="2" fill="#fff7d6" filter="url(#glow)" />
            <path d="M68 388 L130 380 V400 L68 393 Z" fill="#fff7d6" opacity=".18" />
            <rect x="-1" y="388" width="3" height="3" fill="#ef4444" filter="url(#glow-soft)" />
          </g>
        </g>
      ))}
    </Stage>
  );
}

/* ── The Park ──────────────────────────────────────────── */
// Ball path in the Park's 600×400 box: from Jeff's hands to the hoop (rim at 506,194).
const SHOT_TIMES = [0, 0.4, 0.7, 0.8, 0.93, 1];
const SHOT_MADE = { cx: [285, 395, 506, 506, 512, 540], cy: [356, 92, 188, 236, 386, 386] };
const SHOT_MISS = { cx: [285, 400, 522, 548, 575, 592], cy: [356, 92, 186, 148, 386, 386] };
const SHOT_AIR = { cx: [285, 360, 420, 450, 462, 470], cy: [356, 150, 250, 330, 386, 386] }; // falls short, touches nothing

export function Park({ shot }) {
  return (
    <Stage shadow={[330, 280]}>
      <defs>
        <linearGradient id="p-pond" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7dd3fc" /><stop offset="1" stopColor="#0369a1" /></linearGradient>
        <linearGradient id="p-pole" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#64748b" /><stop offset=".4" stopColor="#94a3b8" /><stop offset="1" stopColor="#334155" /></linearGradient>
        <linearGradient id="p-court" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3fb59f" /><stop offset="1" stopColor="#1d7a6c" /></linearGradient>
        <radialGradient id="p-ball" cx=".35" cy=".35" r=".7"><stop offset="0" stopColor="#fb923c" /><stop offset="1" stopColor="#c2410c" /></radialGradient>
      </defs>
      <Tree x={58} s={1.35} c="#24683f" dark />
      <Tree x={128} s={1.05} c="#2f7d4f" />
      {/* lamp over the bench */}
      <g>
        <rect x="164" y="250" width="5" height="150" fill="#334155" />
        <path d="M156 250 h21 l-4 -14 h-13 Z" fill="#1e293b" />
        <rect x="160" y="250" width="13" height="5" fill="#fff3c4" filter="url(#glow)" />
        <path d="M160 255 L132 400 H202 L173 255 Z" fill="url(#beam)" opacity=".35" />
      </g>
      {/* bench with an open book */}
      <rect x="176" y="316" width="112" height="6" rx="2" fill="#a16207" />
      <rect x="176" y="324" width="112" height="6" rx="2" fill="#92400e" />
      <rect x="174" y="340" width="116" height="7" rx="2" fill="#a16207" />
      <rect x="174" y="347" width="116" height="3" fill="#78350f" />
      <path d="M182 350 v32 M282 350 v32 M184 322 v20 M280 322 v20" stroke="#1f2937" strokeWidth="4" />
      <path d="M212 340 q12 -8 22 0 q10 -8 22 0 v-2 q-11 -8 -22 0 q-10 -8 -22 0 Z" fill="#f8fafc" stroke="#e11d48" strokeWidth="2" />
      {/* pond reflecting the sky */}
      <ellipse cx="300" cy="394" rx="122" ry="15" fill="#475569" opacity=".5" />
      <ellipse cx="300" cy="392" rx="116" ry="12" fill="url(#p-pond)" />
      <g className="shimmer" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M240 390 q8 -3 16 0" /><path d="M330 394 q10 -3 20 0" /><path d="M280 396 q6 -2 12 0" opacity=".6" />
      </g>
      <ellipse cx="358" cy="391" rx="9" ry="3" fill="#16a34a" /><ellipse cx="226" cy="394" rx="7" ry="2.5" fill="#22c55e" />
      {[188, 196, 410, 416].map((x, i) => <path key={x} d={`M${x} 396 q${i % 2 ? 3 : -3} -14 ${i % 2 ? 1 : -1} -24`} stroke="#3f7d3a" strokeWidth="2" fill="none" />)}
      {/* badminton net */}
      <rect x="360" y="300" width="4" height="100" fill="#e2e8f0" /><rect x="448" y="300" width="4" height="100" fill="#e2e8f0" />
      <rect x="364" y="304" width="84" height="5" fill="#f8fafc" />
      <g stroke="#e2e8f0" strokeOpacity=".5">{[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={376 + i * 12} y1="308" x2={376 + i * 12} y2="338" />)}{[316, 324, 332].map((y) => <line key={y} x1="364" y1={y} x2="448" y2={y} />)}</g>
      <rect x="364" y="336" width="84" height="2" fill="#e2e8f0" />
      <path d="M404 280 l-6 -10 h12 Z" fill="#fff" /><circle cx="404" cy="282" r="3" fill="#f59e0b" />
      {/* court slab */}
      <path d="M476 396 H596 L604 403 H468 Z" fill="url(#p-court)" opacity=".8" />
      <path d="M484 399.5 H590 M534 396 v7" stroke="#f8fafc" strokeWidth="1.2" opacity=".8" />
      {/* basketball hoop */}
      <rect x="530" y="160" width="8" height="240" fill="url(#p-pole)" />
      <path d="M534 170 L520 170" stroke="#475569" strokeWidth="5" />
      <rect x="490" y="150" width="56" height="40" rx="2" fill="#f8fafc" opacity=".9" stroke="#334155" strokeWidth="3" />
      <rect x="508" y="164" width="20" height="14" fill="none" stroke="#ef4444" strokeWidth="2" />
      <ellipse cx="506" cy="194" rx="16" ry="4" fill="none" stroke="#ef4444" strokeWidth="3" />
      <motion.path
        key={shot?.result === 'made' ? `net-${shot.n}` : 'net'}
        d="M492 194 l6 18 h16 l6 -18 M496 195 l6 17 M516 195 l-6 17"
        fill="none" stroke="#e2e8f0" strokeWidth="1.5"
        style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
        animate={shot?.result === 'made' ? { scaleY: [1, 1, 1.35, 1] } : {}}
        transition={{ duration: 1.3, times: [0, 0.74, 0.82, 1] }}
      />
      {!shot && <><circle cx="560" cy="386" r="14" fill="url(#p-ball)" /><path d="M546 386 h28 M560 372 v28 M550 376 q10 10 0 20 M570 376 q-10 10 0 20" stroke="#431407" strokeWidth="1.3" fill="none" /></>}
      {shot && (
        <motion.g key={shot.n} initial={false}>
          <motion.circle
            r="13" fill="url(#p-ball)" stroke="#431407" strokeWidth="1.5"
            initial={{ cx: shot.x0 ?? 285, cy: shot.y0 ?? 356 }}
            animate={(() => {
              const path = shot.result === 'made' ? SHOT_MADE : shot.result === 'air' ? SHOT_AIR : SHOT_MISS;
              return { cx: [shot.x0 ?? 285, ...path.cx.slice(1)], cy: [shot.y0 ?? 356, ...path.cy.slice(1)] };
            })()}
            transition={{ duration: 1.3, times: SHOT_TIMES, ease: 'easeInOut' }}
          />
        </motion.g>
      )}
      <Flowers x={458} colors={['#fb7185', '#facc15', '#c084fc']} />
    </Stage>
  );
}

/* ── Sunrise at the crossroads ─────────────────────────── */
export function Crossroads() {
  return (
    <Stage shadow={[350, 260]}>
      <defs>
        <linearGradient id="x-tentL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f2c66d" /><stop offset="1" stopColor="#c58f2e" /></linearGradient>
        <linearGradient id="x-tentR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a8741f" /><stop offset="1" stopColor="#7c5715" /></linearGradient>
        <radialGradient id="x-inside" cx=".5" cy="1" r=".9"><stop offset="0" stopColor="#ffd38a" /><stop offset="1" stopColor="#8a4a14" /></radialGradient>
        <linearGradient id="x-post" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#5a3a22" /><stop offset=".5" stopColor="#8a5a32" /><stop offset="1" stopColor="#4a2f1b" /></linearGradient>
        <linearGradient id="x-flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#f97316" /><stop offset=".6" stopColor="#fbbf24" /><stop offset="1" stopColor="#fef3c7" /></linearGradient>
      </defs>
      {/* tent: two panels, flap open, lit from inside */}
      <path d="M408 400 L520 258" stroke="#78716c" strokeWidth="1" />
      <path d="M632 400 L520 258" stroke="#78716c" strokeWidth="1" />
      <path d="M436 400 L520 262 L520 400 Z" fill="url(#x-tentL)" />
      <path d="M520 262 L604 400 L520 400 Z" fill="url(#x-tentR)" />
      <path d="M520 296 L494 400 H548 Z" fill="url(#x-inside)" filter="url(#glow-soft)" />
      <path d="M520 290 L494 400 L476 400 Q500 340 520 290 Z" fill="#d9a441" />
      <path d="M520 290 L548 400 L566 400 Q540 340 520 290 Z" fill="#6b4a12" />
      <path d="M520 262 v-10" stroke="#57534e" strokeWidth="3" />
      <path d="M468 348 l-4 2 M572 348 l4 2" stroke="#fff" strokeOpacity=".3" />
      <rect x="406" y="396" width="4" height="6" fill="#57534e" /><rect x="630" y="396" width="4" height="6" fill="#57534e" />
      {/* signpost */}
      <rect x="158" y="186" width="16" height="214" fill="url(#x-post)" />
      <path d="M163 196 v200" stroke="#3b2418" strokeWidth="1" opacity=".5" />
      <path d="M174 208 h120 l18 18 -18 18 h-120 Z" fill="#c08a3e" stroke="#6b4632" strokeWidth="3" />
      <path d="M180 216 h100 M180 236 h104" stroke="#8a5a32" strokeWidth="1" opacity=".5" />
      <text x="234" y="231" textAnchor="middle" fontSize="15" fontWeight="800" fill="#13213b" fontFamily="Fraunces, Georgia, serif">Next chapter</text>
      <path d="M158 262 h-110 l-16 16 16 16 h110 Z" fill="#a16207" stroke="#6b4632" strokeWidth="3" />
      <text x="98" y="283" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fef3c7" fontFamily="Fraunces, Georgia, serif">The journey</text>
      <path d="M150 186 h32 l-16 -12 Z" fill="#6b4632" />
      {/* backpack resting against the post */}
      <rect x="180" y="366" width="24" height="34" rx="7" fill="#c58f2e" />
      <rect x="184" y="380" width="16" height="10" rx="3" fill="#8a6420" />
      {/* log seat + mug */}
      <rect x="296" y="384" width="54" height="16" rx="8" fill="#6b4226" />
      <ellipse cx="350" cy="392" rx="6" ry="8" fill="#a87447" />
      <rect x="314" y="374" width="9" height="10" rx="2" fill="#f8fafc" />
      <path d="M323 377 q4 0 4 3 q0 3 -4 3" stroke="#f8fafc" strokeWidth="1.5" fill="none" />
      {/* campfire: stones, logs and live flames */}
      <g transform="translate(410 400)">
        <ellipse cx="0" cy="-4" rx="30" ry="8" fill="url(#lamp-halo)" />
        {[-26, -15, -4, 7, 18, 27].map((x, i) => <ellipse key={x} cx={x} cy={-3} rx="6" ry="4.5" fill={i % 2 ? '#78716c' : '#a8a29e'} />)}
        <rect x="-26" y="-14" width="52" height="8" rx="4" fill="#57351c" transform="rotate(14)" />
        <rect x="-26" y="-14" width="52" height="8" rx="4" fill="#6b4226" transform="rotate(-14)" />
        <g filter="url(#glow)">
          <path className="flame" d="M-14 -10 Q-18 -30 -6 -44 Q-8 -28 0 -24 Q4 -40 -2 -56 Q16 -40 12 -24 Q18 -30 16 -38 Q24 -20 14 -10 Z" fill="url(#x-flame)" />
          <path className="flame" d="M-6 -10 Q-8 -24 0 -32 Q2 -22 6 -20 Q10 -26 8 -32 Q14 -20 8 -10 Z" fill="#fef9c3" style={{ animationDelay: '.2s' }} />
        </g>
        {[0, 1, 2, 3].map((i) => <circle key={i} className="ember" cx={-6 + i * 5} cy="-30" r="1.4" fill="#fdba74" style={{ animationDelay: `${i * 0.5}s` }} />)}
        <circle className="smoke" cx="2" cy="-60" r="8" fill="#e5e7eb" opacity=".35" />
        <circle className="smoke" cx="2" cy="-60" r="6" fill="#e5e7eb" opacity=".3" style={{ animationDelay: '1.4s' }} />
      </g>
      {/* lantern on a stick */}
      <rect x="616" y="270" width="3" height="130" fill="#57534e" />
      <path d="M617 270 h-18" stroke="#57534e" strokeWidth="3" />
      <Lantern x={600} y={282} rope={10} />
      <Flowers x={70} colors={['#fde047', '#fb923c', '#f8fafc']} />
    </Stage>
  );
}

export const SCENES = [Home, Academy, Workshop, QuestBoard, City, Park, Crossroads].map((S) => memo(S));
