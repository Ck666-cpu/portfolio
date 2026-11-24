import { memo } from 'react';
import { motion } from 'framer-motion';
import Stage from './Stage.jsx';

// The places along Jeff's route. Each is drawn in a 600×400 box standing on the ground (y = 400).

function Tree({ x, s = 1, c = '#2f7d4f' }) {
  return (
    <g transform={`translate(${x} 400) scale(${s})`}>
      <path d="M-7 0 L-5 -72 Q0 -78 5 -72 L8 0 Z" fill="#5a3a28" />
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

function Lantern({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="10" r="34" fill="url(#lamp-halo)" />
      <rect x="-7" y="0" width="14" height="20" rx="3" fill="#fde68a" stroke="#78350f" strokeWidth="2" filter="url(#glow)" />
      <rect x="-4" y="-5" width="8" height="5" fill="#78350f" />
    </g>
  );
}

export function Home() {
  return (
    <Stage shadow={[270, 200]}>
      <Tree x={520} s={0.9} />
      {/* house */}
      <rect x="120" y="190" width="300" height="210" fill="#f3e3c3" />
      <rect x="120" y="190" width="300" height="10" fill="#000" opacity=".08" />
      <path d="M100 196 L270 96 L440 196 Z" fill="#b4533b" />
      <path d="M100 196 L270 96 L440 196" fill="none" stroke="#7f3426" strokeWidth="6" strokeLinejoin="round" />
      <rect x="350" y="120" width="26" height="50" fill="#7f3426" />
      <circle className="smoke" cx="363" cy="112" r="8" fill="#fff" opacity=".6" />
      <circle className="smoke" cx="363" cy="112" r="6" fill="#fff" opacity=".5" style={{ animationDelay: '1.4s' }} />
      {/* upstairs window: my room, monitor glowing */}
      <rect x="160" y="220" width="78" height="62" rx="3" fill="#1b2a4a" stroke="#fff" strokeWidth="5" />
      <rect x="182" y="244" width="34" height="22" rx="2" fill="#5eead4" filter="url(#glow)" />
      <rect x="196" y="266" width="6" height="10" fill="#334155" />
      <circle cx="176" cy="262" r="9" fill="#111827" />
      <rect x="300" y="220" width="78" height="62" rx="3" fill="#ffe7a3" filter="url(#glow)" />
      <rect x="300" y="220" width="78" height="62" rx="3" fill="none" stroke="#fff" strokeWidth="5" />
      <path d="M300 251 h78 M339 220 v62" stroke="#fff" strokeWidth="3" />
      {/* door */}
      <rect x="244" y="300" width="56" height="100" rx="4" fill="#0f766e" />
      <circle cx="290" cy="352" r="3.5" fill="#fbbf24" />
      <rect x="236" y="296" width="72" height="8" fill="#7f3426" />
      <circle cx="320" cy="312" r="5" fill="#fff2c4" filter="url(#glow)" />
      <path d="M300 300 L250 400 H420 Z" fill="url(#spill)" opacity=".5" />
      {/* mailbox + plant */}
      <rect x="438" y="330" width="6" height="70" fill="#475569" />
      <rect x="424" y="316" width="34" height="22" rx="6" fill="#e11d48" />
      <text x="441" y="332" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily="sans-serif">LAM</text>
      <path d="M130 400 q-4 -26 10 -34 q14 8 10 34 Z" fill="#b45309" />
      <circle cx="140" cy="356" r="16" fill="#3f8f5c" />
    </Stage>
  );
}

export function Academy() {
  // Inspired by the TAR UMT Arena (KL campus): a six-storey building with a tall
  // colonnade facade and a full-size football pitch + running track on its roof.
  const cols = Array.from({ length: 12 });
  return (
    <Stage shadow={[300, 270]}>
      {/* floodlight masts at the back of the roof */}
      {[118, 482].map((x) => (
        <g key={x}>
          <rect x={x - 2.5} y="28" width="5" height="96" fill="#64748b" />
          <rect x={x - 16} y="18" width="32" height="14" rx="2" fill="#334155" />
          <g filter="url(#glow)">{[0, 1, 2, 3].map((i) => <rect key={i} x={x - 13 + i * 7} y="21" width="5" height="8" fill="#fffbe0" />)}</g>
          <path d={`M${x - 16} 32 L${x - 50} 120 H${x + 50} L${x + 16} 32 Z`} fill="url(#beam)" opacity=".5" />
        </g>
      ))}

      {/* rooftop: running track + football pitch, seen from slightly above */}
      <path d="M64 170 L112 112 H488 L536 170 Z" fill="#c2410c" />
      <path d="M64 170 L112 112 H488 L536 170 Z" fill="none" stroke="#9a3412" strokeWidth="2" />
      {[1, 2, 3].map((i) => (
        <path key={i} d={`M${64 + i * 9} ${170 - i * 1.6} L${112 + i * 7} ${112 + i * 1.6} H${488 - i * 7} L${536 - i * 9} ${170 - i * 1.6}`} fill="none" stroke="#fed7aa" strokeOpacity=".55" strokeWidth=".8" />
      ))}
      <path d="M104 165 L140 119 H460 L496 165 Z" fill="#3f9b4f" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path key={i} d={`M${104 + i * 49} 165 L${140 + i * 40} 119 L${160 + i * 40} 119 L${128.5 + i * 49} 165 Z`} fill="#4caf5e" opacity={i % 2 ? 0 : 0.7} />
      ))}
      <g stroke="#f8fafc" strokeWidth="1.6" fill="none" opacity=".9">
        <path d="M110 161 L143 122 H457 L490 161 Z" />
        <path d="M300 122 V161" />
        <ellipse cx="300" cy="141.5" rx="26" ry="9" />
        <path d="M128 140 h36 l-4 14 h-40 Z M472 140 h-36 l4 14 h40 Z" />
      </g>
      <path d="M118 150 v-10 M118 140 l6 -4 v10" stroke="#fff" strokeWidth="1.5" fill="none" />
      <path d="M482 150 v-10 M482 140 l-6 -4 v10" stroke="#fff" strokeWidth="1.5" fill="none" />
      {/* stadium seating along the roof edge */}
      <path d="M60 170 H540 V182 H60 Z" fill="#cbd5e1" />
      {Array.from({ length: 24 }).map((_, i) => <rect key={i} x={66 + i * 19.6} y="172" width="14" height="4" rx="1" fill={i % 3 ? '#0f766e' : '#14b8a6'} />)}

      {/* six storeys of glass behind the colonnade */}
      <rect x="70" y="182" width="460" height="196" fill="#1e3a5f" />
      {[0, 1, 2, 3, 4, 5].map((f) => (
        <g key={f}>
          <rect x="70" y={182 + f * 32.6} width="460" height="3" fill="#0b2a4d" />
          {Array.from({ length: 11 }).map((_, c) => (
            <rect key={c} x={88 + c * 40} y={190 + f * 32.6} width="22" height="18" fill={(f * 5 + c) % 7 ? '#38bdf8' : '#ffe9a8'} opacity={(f * 5 + c) % 7 ? 0.28 : 1} filter={(f * 5 + c) % 7 ? undefined : 'url(#glow-soft)'} />
          ))}
        </g>
      ))}

      {/* the grand six-storey colonnade */}
      <rect x="62" y="182" width="476" height="10" fill="#f1f5f9" />
      {cols.map((_, i) => (
        <g key={i}>
          <rect x={72 + i * 40} y="192" width="14" height="186" fill="#f8fafc" />
          <rect x={72 + i * 40} y="192" width="4" height="186" fill="#e2e8f0" />
        </g>
      ))}

      {/* entrance + steps */}
      <rect x="250" y="320" width="100" height="58" fill="#0b1020" />
      <rect x="258" y="328" width="40" height="50" fill="#38bdf8" opacity=".35" />
      <rect x="302" y="328" width="40" height="50" fill="#38bdf8" opacity=".35" />
      <rect x="230" y="378" width="140" height="8" fill="#cbd5e1" />
      <rect x="216" y="386" width="168" height="14" fill="#94a3b8" />
      <rect x="54" y="378" width="492" height="22" fill="#cbd5e1" opacity=".9" />
      <rect x="216" y="386" width="168" height="14" fill="#94a3b8" />

      {/* name band */}
      <rect x="216" y="270" width="168" height="30" rx="4" fill="#13213b" stroke="#e3c27a" strokeWidth="1.5" />
      <text x="300" y="291" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffe3a0" fontFamily="Fraunces, Georgia, serif" filter="url(#glow-soft)">TAR UMT ARENA</text>
    </Stage>
  );
}

export function Workshop() {
  return (
    <Stage shadow={[300, 220]}>
      <defs><clipPath id="ws-wall"><rect x="110" y="160" width="360" height="240" /></clipPath></defs>
      <rect x="110" y="160" width="360" height="240" fill="#9a4a32" />
      <g clipPath="url(#ws-wall)">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((r) =>
        [0, 1, 2, 3, 4, 5, 6].map((c) => (
          <rect key={`${r}-${c}`} x={112 + c * 52 + (r % 2) * 26} y={164 + r * 28} width="48" height="24" fill="#a85638" opacity={(r + c) % 3 ? 0.5 : 0.8} />
        )),
      )}
      </g>
      <path d="M96 166 L290 100 L484 166 Z" fill="#3f3f46" />
      <rect x="400" y="96" width="30" height="60" fill="#52525b" />
      <circle className="smoke" cx="415" cy="88" r="9" fill="#e5e7eb" opacity=".6" />
      <circle className="smoke" cx="415" cy="88" r="7" fill="#e5e7eb" opacity=".5" style={{ animationDelay: '1.5s' }} />
      {/* sign */}
      <rect x="220" y="174" width="140" height="36" rx="5" fill="#13213b" stroke="#e3c27a" strokeWidth="2" />
      <text x="290" y="198" textAnchor="middle" fontSize="15" fontWeight="800" fill="#a7fff0" fontFamily="monospace" filter="url(#glow)">&lt;/&gt; WORKSHOP</text>
      {/* open garage with server racks */}
      <rect x="170" y="226" width="240" height="174" fill="#0b1020" />
      <rect x="170" y="226" width="240" height="174" fill="url(#garage)" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${196 + i * 72} 246)`}>
          <rect width="52" height="154" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          {[0, 1, 2, 3, 4, 5, 6].map((j) => (
            <g key={j}>
              <rect x="6" y={10 + j * 20} width="40" height="12" rx="2" fill="#0f172a" />
              <circle className="led" cx="38" cy={16 + j * 20} r="2.4" filter="url(#glow-soft)" fill={j % 3 ? '#4ade80' : '#2dd4bf'} style={{ animationDelay: `${(i * 7 + j) * 0.17}s` }} />
              <circle cx="31" cy={16 + j * 20} r="2" fill="#f59e0b" opacity=".7" />
            </g>
          ))}
        </g>
      ))}
      <path d="M170 226 h240" stroke="#71717a" strokeWidth="8" />
      {/* gear + toolbox */}
      <g transform="translate(520 300)">
        <circle r="34" fill="none" stroke="#e3c27a" strokeWidth="12" strokeDasharray="12 9" />
        <circle r="20" fill="#b7862c" /><circle r="8" fill="#13213b" />
      </g>
      <rect x="490" y="366" width="64" height="34" rx="4" fill="#dc2626" />
      <rect x="508" y="358" width="28" height="10" rx="3" fill="none" stroke="#7f1d1d" strokeWidth="4" />
    </Stage>
  );
}

export function QuestBoard() {
  const notes = [
    [168, 196, '#fef3c7', -4], [258, 190, '#ccfbf1', 3], [348, 198, '#fee2e2', -2],
    [190, 274, '#e0f2fe', 2], [290, 280, '#fef9c3', -3], [380, 270, '#ede9fe', 4],
  ];
  return (
    <Stage shadow={[300, 200]}>
      <Tree x={540} s={0.85} c="#2f7d4f" />
      <rect x="140" y="160" width="12" height="240" fill="#6b4632" />
      <rect x="448" y="160" width="12" height="240" fill="#6b4632" />
      <path d="M120 168 L300 112 L480 168 Z" fill="#7c2d12" />
      <rect x="150" y="170" width="300" height="180" rx="4" fill="#a16207" />
      <rect x="160" y="180" width="280" height="160" fill="#c08a3e" />
      {notes.map(([x, y, c, r], i) => (
        <g key={i} transform={`rotate(${r} ${x + 30} ${y + 30})`}>
          <rect x={x} y={y} width="62" height="62" fill={c} />
          <rect x={x + 8} y={y + 14} width="40" height="4" rx="2" fill="#475569" opacity=".6" />
          <rect x={x + 8} y={y + 24} width="46" height="3" rx="1.5" fill="#475569" opacity=".35" />
          <rect x={x + 8} y={y + 32} width="30" height="3" rx="1.5" fill="#475569" opacity=".35" />
          <circle cx={x + 31} cy={y + 4} r="4.5" fill="#dc2626" />
        </g>
      ))}
      <rect x="230" y="128" width="140" height="30" rx="4" fill="#13213b" />
      <text x="300" y="148" textAnchor="middle" fontSize="14" fontWeight="800" fill="#e3c27a" fontFamily="Fraunces, Georgia, serif">QUEST BOARD</text>
      <Lantern x={120} y={240} />
      <rect x="470" y="350" width="40" height="50" rx="6" fill="#92400e" />
      <path d="M470 362 h40 M470 388 h40" stroke="#451a03" strokeWidth="3" />
    </Stage>
  );
}

export function City() {
  // Inspired by The Exchange 106 (TRX, KL): a slim blue-glass tower that tapers
  // as it rises, topped by a triangulated clear-glass crown that glows at night.
  const floors = Array.from({ length: 26 });
  const xAt = (y, side) => {
    // tower edges: base 196–404 at y=400, top 232–368 at y=40
    const t = (400 - y) / 360;
    return side < 0 ? 196 + t * 36 : 404 - t * 36;
  };
  return (
    <Stage shadow={[300, 250]}>
      <defs>
        <linearGradient id="x106-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1d4f8a" /><stop offset=".45" stopColor="#3b82c4" /><stop offset=".55" stopColor="#2a6aab" /><stop offset="1" stopColor="#163e6e" />
        </linearGradient>
        <linearGradient id="x106-crown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0f9ff" /><stop offset="1" stopColor="#a5d8f3" />
        </linearGradient>
        <radialGradient id="x106-lantern" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#bae6fd" stopOpacity=".55" /><stop offset="1" stopColor="#bae6fd" stopOpacity="0" /></radialGradient>
      </defs>

      {/* neighbours */}
      <rect x="40" y="250" width="100" height="150" fill="#64748b" />
      <rect x="470" y="220" width="96" height="180" fill="#475569" />
      {[0, 1, 2, 3, 4].map((r) => [0, 1, 2].map((c) => <rect key={`a${r}${c}`} x={54 + c * 28} y={266 + r * 24} width="18" height="12" fill="#fde68a" opacity={(r + c) % 2 ? 0.9 : 0.35} />))}
      {[0, 1, 2, 3, 4, 5].map((r) => [0, 1, 2].map((c) => <rect key={`b${r}${c}`} x={484 + c * 26} y={236 + r * 24} width="16" height="12" fill="#fde68a" opacity={(r + c) % 3 ? 0.35 : 0.9} />))}

      {/* crown glow (the "Lantern") */}
      <ellipse cx="300" cy="-10" rx="170" ry="130" fill="url(#x106-lantern)" />

      {/* tapering blue-glass shaft */}
      <path d="M196 400 L232 40 H368 L404 400 Z" fill="url(#x106-glass)" />
      {/* chamfered corners catch the light */}
      <path d="M196 400 L232 40 L240 40 L206 400 Z" fill="#7cc0ec" opacity=".55" />
      <path d="M404 400 L368 40 L360 40 L394 400 Z" fill="#0f2f55" opacity=".6" />
      {/* vertical mullions converging with the taper */}
      {[-3, -2, -1, 0, 1, 2, 3].map((k) => (
        <line key={k} x1={300 + k * 26} y1="400" x2={300 + k * 17} y2="40" stroke="#bfe3ff" strokeOpacity=".22" strokeWidth="1.5" />
      ))}
      {/* floor lines */}
      {floors.map((_, i) => {
        const y = 52 + i * 13.4;
        return <line key={i} x1={xAt(y, -1)} y1={y} x2={xAt(y, 1)} y2={y} stroke="#0b2a4d" strokeOpacity=".35" strokeWidth="1" />;
      })}
      {/* lit office windows */}
      {[[3, 1], [7, -2], [11, 2], [15, -1], [19, 0], [22, 2]].map(([f, k]) => {
        const y = 52 + f * 13.4 + 2;
        return <rect key={f} x={300 + k * 22 - 8} y={y} width="16" height="9" fill="#ffeeb0" filter="url(#glow-soft)" />;
      })}

      {/* Ant International, high up in the tower */}
      <rect x={xAt(98, -1) + 4} y="94" width={xAt(98, 1) - xAt(98, -1) - 8} height="12" fill="#ffe9a0" filter="url(#glow)" />
      <line x1={xAt(100, 1) + 2} y1="100" x2="462" y2="100" stroke="#e3c27a" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx={xAt(100, 1) + 2} cy="100" r="3.5" fill="#e3c27a" />
      <rect x="462" y="84" width="160" height="32" rx="7" fill="#13213b" stroke="#e3c27a" strokeWidth="1.5" />
      <text x="542" y="105" textAnchor="middle" fontSize="13" fontWeight="800" fill="#e3c27a" fontFamily="sans-serif">ANT INTERNATIONAL</text>

      {/* triangulated, folded glass crown — no spire */}
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

      {/* podium + lobby */}
      <rect x="176" y="356" width="248" height="44" fill="#0b1020" />
      <rect x="196" y="364" width="60" height="36" fill="#38bdf8" opacity=".35" />
      <rect x="344" y="364" width="60" height="36" fill="#38bdf8" opacity=".35" />
      <rect x="236" y="300" width="128" height="22" rx="3" fill="#f8fafc" />
      <text x="300" y="315" textAnchor="middle" fontSize="11" fontWeight="800" fill="#13213b" fontFamily="sans-serif" letterSpacing="1">EXCHANGE 106</text>
    </Stage>
  );
}

// Ball path in the Park's 600×400 box: from Jeff's hands to the hoop (rim at 506,194).
const SHOT_TIMES = [0, 0.4, 0.7, 0.8, 0.93, 1];
const SHOT_MADE = { cx: [285, 395, 506, 506, 512, 540], cy: [356, 92, 188, 236, 386, 386] };
const SHOT_MISS = { cx: [285, 400, 522, 548, 575, 592], cy: [356, 92, 186, 148, 386, 386] };
const SHOT_AIR = { cx: [285, 360, 420, 450, 462, 470], cy: [356, 150, 250, 330, 386, 386] }; // falls short, touches nothing

export function Park({ shot }) {
  return (
    <Stage shadow={[330, 270]}>
      <Tree x={110} s={1.15} c="#2f7d4f" />
      {/* pond */}
      <ellipse cx="300" cy="392" rx="120" ry="16" fill="#38bdf8" />
      <ellipse cx="300" cy="390" rx="100" ry="10" fill="#7dd3fc" opacity=".6" />
      <path d="M250 390 q10 -4 20 0 M320 392 q10 -4 20 0" stroke="#fff" strokeWidth="2" fill="none" opacity=".8" />
      {/* bench with an open book */}
      <rect x="170" y="340" width="110" height="10" rx="3" fill="#92400e" />
      <rect x="170" y="318" width="110" height="8" rx="3" fill="#92400e" />
      <rect x="178" y="350" width="6" height="32" fill="#451a03" /><rect x="266" y="350" width="6" height="32" fill="#451a03" />
      <path d="M210 340 q12 -8 22 0 q10 -8 22 0 v-2 q-11 -8 -22 0 q-10 -8 -22 0 Z" fill="#f8fafc" stroke="#e11d48" strokeWidth="2" />
      {/* badminton net */}
      <rect x="360" y="300" width="4" height="100" fill="#e2e8f0" /><rect x="448" y="300" width="4" height="100" fill="#e2e8f0" />
      <rect x="364" y="304" width="84" height="34" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      <g stroke="#e2e8f0" strokeOpacity=".5">{[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={376 + i * 12} y1="304" x2={376 + i * 12} y2="338" />)}<line x1="364" y1="321" x2="448" y2="321" /></g>
      <path d="M404 280 l-6 -10 h12 Z" fill="#fff" /><circle cx="404" cy="282" r="3" fill="#f59e0b" />
      {/* basketball hoop */}
      <rect x="530" y="160" width="8" height="240" fill="#475569" />
      <rect x="490" y="150" width="56" height="40" fill="#f8fafc" stroke="#475569" strokeWidth="3" />
      <rect x="508" y="164" width="20" height="14" fill="none" stroke="#ef4444" strokeWidth="2" />
      <ellipse cx="506" cy="194" rx="16" ry="4" fill="none" stroke="#ef4444" strokeWidth="3" />
      <motion.path
        key={shot?.result === 'made' ? `net-${shot.n}` : 'net'}
        d="M492 194 l6 18 h16 l6 -18"
        fill="none" stroke="#e2e8f0" strokeWidth="1.5"
        style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
        animate={shot?.result === 'made' ? { scaleY: [1, 1, 1.35, 1] } : {}}
        transition={{ duration: 1.3, times: [0, 0.74, 0.82, 1] }}
      />
      {!shot && <><circle cx="560" cy="386" r="14" fill="#ea580c" /><path d="M546 386 h28 M560 372 v28" stroke="#431407" strokeWidth="1.5" /></>}
      {shot && (
        <motion.g key={shot.n} initial={false}>
          <motion.circle
            r="13" fill="#ea580c" stroke="#431407" strokeWidth="1.5"
            initial={{ cx: shot.x0 ?? 285, cy: shot.y0 ?? 356 }}
            animate={(() => {
              const path = shot.result === 'made' ? SHOT_MADE : shot.result === 'air' ? SHOT_AIR : SHOT_MISS;
              // start from Jeff's hands wherever he is standing
              return { cx: [shot.x0 ?? 285, ...path.cx.slice(1)], cy: [shot.y0 ?? 356, ...path.cy.slice(1)] };
            })()}
            transition={{ duration: 1.3, times: SHOT_TIMES, ease: 'easeInOut' }}
          />
        </motion.g>
      )}
    </Stage>
  );
}

export function Crossroads() {
  return (
    <Stage shadow={[340, 250]}>
      {/* tent */}
      <path d="M440 400 L520 270 L600 400 Z" fill="#b7862c" />
      <path d="M520 270 L504 400 h32 Z" fill="#78350f" />
      {/* signpost */}
      <rect x="160" y="190" width="12" height="210" fill="#6b4632" />
      <path d="M172 210 h120 l18 18 -18 18 h-120 Z" fill="#c08a3e" stroke="#6b4632" strokeWidth="3" />
      <text x="232" y="233" textAnchor="middle" fontSize="15" fontWeight="800" fill="#13213b" fontFamily="Fraunces, Georgia, serif">Next chapter</text>
      <path d="M160 262 h-110 l-16 16 16 16 h110 Z" fill="#a16207" stroke="#6b4632" strokeWidth="3" />
      <text x="100" y="283" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fef3c7" fontFamily="Fraunces, Georgia, serif">The journey</text>
      {/* last night's campfire, now just embers and smoke: the night is over */}
      <g transform="translate(370 400)">
        <rect x="-34" y="-12" width="68" height="10" rx="5" fill="#57351c" transform="rotate(12)" />
        <rect x="-34" y="-12" width="68" height="10" rx="5" fill="#6b4226" transform="rotate(-12)" />
        <ellipse cx="0" cy="-10" rx="16" ry="6" fill="#fb923c" filter="url(#glow)" className="led" />
        <circle className="smoke" cx="0" cy="-22" r="9" fill="#e5e7eb" opacity=".55" />
        <circle className="smoke" cx="0" cy="-22" r="7" fill="#e5e7eb" opacity=".45" style={{ animationDelay: '1s' }} />
        <circle className="smoke" cx="0" cy="-22" r="6" fill="#e5e7eb" opacity=".4" style={{ animationDelay: '2s' }} />
      </g>
      <Lantern x={566} y={250} />
    </Stage>
  );
}

export const SCENES = [Home, Academy, Workshop, QuestBoard, City, Park, Crossroads].map((S) => memo(S));
