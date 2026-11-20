// Small original item drawings for the inventory (64×64).
const ART = {
  novel: (
    <>
      <path d="M12 14 h34 a4 4 0 0 1 4 4 v34 h-34 a4 4 0 0 1 -4 -4 Z" fill="#e11d48" />
      <path d="M16 48 h34 v4 h-34 a2 2 0 0 1 0 -4 Z" fill="#fde68a" />
      <rect x="18" y="20" width="26" height="22" rx="2" fill="#7f1d1d" />
      <text x="31" y="37" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fde68a">仙</text>
      <path d="M40 10 l6 0 0 14 -3 -3 -3 3 Z" fill="#fbbf24" />
    </>
  ),
  manga: (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${10 + i * 14} ${14 - i * 2}) rotate(${(i - 1) * 6} 8 22)`}>
          <rect width="17" height="40" rx="1.5" fill={['#f8fafc', '#e2e8f0', '#f8fafc'][i]} stroke="#334155" />
          <rect y="6" width="17" height="8" fill="#e11d48" />
          <text x="8.5" y="32" textAnchor="middle" fontSize="9" fontWeight="800" fill="#334155">{i + 1}</text>
        </g>
      ))}
    </>
  ),
  anime: (
    <>
      <rect x="8" y="16" width="48" height="34" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <rect x="12" y="20" width="40" height="26" rx="2" fill="#0ea5e9" />
      <circle cx="25" cy="32" r="5" fill="#fff" /><circle cx="39" cy="32" r="5" fill="#fff" />
      <circle cx="26" cy="33" r="3" fill="#0f172a" /><circle cx="40" cy="33" r="3" fill="#0f172a" />
      <circle cx="27" cy="31.5" r="1" fill="#fff" /><circle cx="41" cy="31.5" r="1" fill="#fff" />
      <path d="M22 54 l10 -4 10 4" stroke="#475569" strokeWidth="3" fill="none" />
      <path d="M50 10 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5 Z" fill="#fde68a" />
    </>
  ),
  film: (
    <>
      <rect x="10" y="26" width="44" height="28" rx="3" fill="#1e293b" />
      <g transform="rotate(-14 10 26)">
        <rect x="10" y="14" width="44" height="10" rx="2" fill="#f8fafc" />
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M${14 + i * 11} 14 l6 0 -4 10 -6 0 Z`} fill="#0f172a" />)}
      </g>
      <circle cx="32" cy="40" r="7" fill="url(#ia-planet)" />
      <ellipse cx="32" cy="40" rx="12" ry="3" fill="none" stroke="#5eead4" strokeWidth="1.5" transform="rotate(-15 32 40)" />
    </>
  ),
  controller: (
    <>
      <path d="M14 46 q-8 -20 8 -24 h20 q16 4 8 24 q-4 8 -11 2 l-5 -5 h-4 l-5 5 q-7 6 -11 -2 Z" fill="#475569" />
      <path d="M22 30 v8 M18 34 h8" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="31" r="2.6" fill="#5eead4" /><circle cx="45" cy="35" r="2.6" fill="#f87171" /><circle cx="40" cy="39" r="2.6" fill="#fbbf24" /><circle cx="35" cy="35" r="2.6" fill="#38bdf8" />
    </>
  ),
  headphones: (
    <>
      <path d="M14 38 C 12 14, 52 14, 50 38" fill="none" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" />
      <rect x="9" y="34" width="12" height="20" rx="5" fill="#14b8a6" /><rect x="43" y="34" width="12" height="20" rx="5" fill="#14b8a6" />
      <path d="M26 44 q6 -6 12 0 M24 50 q8 -10 16 0" stroke="#5eead4" strokeWidth="2" fill="none" opacity=".7" />
    </>
  ),
  racket: (
    <>
      <ellipse cx="26" cy="22" rx="12" ry="16" fill="none" stroke="#e2e8f0" strokeWidth="3" transform="rotate(-30 26 22)" />
      <g stroke="#e2e8f0" strokeOpacity=".4" strokeWidth=".8" transform="rotate(-30 26 22)">
        {[-6, -2, 2, 6].map((d) => <line key={d} x1={26 + d} y1="8" x2={26 + d} y2="36" />)}
        {[-8, -3, 2, 7].map((d) => <line key={d} x1="15" y1={22 + d} x2="37" y2={22 + d} />)}
      </g>
      <line x1="34" y1="36" x2="46" y2="54" stroke="#94a3b8" strokeWidth="3" />
      <line x1="42" y1="48" x2="48" y2="57" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" />
      <path d="M52 22 l-8 -10 h12 Z" fill="#f8fafc" /><circle cx="50" cy="23" r="3.5" fill="#f59e0b" />
    </>
  ),
  goggles: (
    <>
      <path d="M8 32 C 8 18, 56 18, 56 32" fill="none" stroke="#0c4a6e" strokeWidth="3" />
      <circle cx="22" cy="34" r="10" fill="#38bdf8" stroke="#0c4a6e" strokeWidth="4" />
      <circle cx="42" cy="34" r="10" fill="#38bdf8" stroke="#0c4a6e" strokeWidth="4" />
      <rect x="29" y="31" width="6" height="5" fill="#0c4a6e" />
      <circle cx="19" cy="30" r="3" fill="#fff" opacity=".7" /><circle cx="39" cy="30" r="3" fill="#fff" opacity=".7" />
      <path d="M12 52 q5 -4 10 0 t10 0 t10 0 t10 0" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
    </>
  ),
  ball: (
    <>
      <circle cx="32" cy="32" r="20" fill="url(#ia-ball)" />
      <path d="M12 32 h40 M32 12 v40 M17 19 q12 13 0 26 M47 19 q-12 13 0 26" stroke="#431407" strokeWidth="1.8" fill="none" />
    </>
  ),
};

export default function ItemArt({ art, size = 56, className }) {
  return (
    <svg viewBox="0 0 64 64" width={className ? undefined : size} height={className ? undefined : size} className={className} aria-hidden>
      <defs>
        <radialGradient id="ia-ball" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="#fb923c" /><stop offset="1" stopColor="#c2410c" /></radialGradient>
        <radialGradient id="ia-planet" cx="0.35" cy="0.35" r="0.7"><stop offset="0" stopColor="#fde68a" /><stop offset="1" stopColor="#d97706" /></radialGradient>
      </defs>
      {ART[art]}
    </svg>
  );
}
