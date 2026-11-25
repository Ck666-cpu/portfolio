import { useId } from 'react';

// A friend, drawn front-on so the initials on the shirt are readable. Same 120-unit scale as Jeff,
// and shaded the same way: soft key light from the top-left, darker folds, a warm rim on the right.
const HAIR = {
  short: 'M17.5 24 q0 -15.5 12.5 -15.5 q12.5 0 12.5 15.5 q-3 -7.5 -12.5 -7.5 q-9.5 0 -12.5 7.5 Z',
  side: 'M16.5 26 q-1 -17.5 14.5 -17.5 q12.5 1 12.5 13.5 q-8 -6 -18.5 -1 q-4 2 -8.5 5 Z',
  spiky: 'M17.5 24 l2 -10 3 4 3 -7.5 3 5 4 -6.5 2 6.5 4 -4.5 1.5 12.5 q-5 -6 -12.5 -6 q-7.5 0 -12.5 6 Z',
};

export default function Friend({ person, waving = true }) {
  const { initials, glasses, hair = 'short', shirt, ink = '#fff' } = person;
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 60 120" className="h-full w-auto overflow-visible" style={{ filter: 'drop-shadow(0 6px 8px rgba(0,0,0,.35))' }} role="img" aria-label={`${person.initials || 'Friend'}, ${person.tag}`}>
      <defs>
        <linearGradient id={`fs${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".4" />
        </linearGradient>
        <radialGradient id={`fk${id}`} cx=".4" cy=".35" r=".75">
          <stop offset="0" stopColor="#ffe0c4" />
          <stop offset=".7" stopColor="#f1c39b" />
          <stop offset="1" stopColor="#d79a72" />
        </radialGradient>
        <linearGradient id={`fh${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#323a50" />
          <stop offset="1" stopColor="#07090f" />
        </linearGradient>
        <linearGradient id={`fp${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a4a6e" />
          <stop offset="1" stopColor="#1a2238" />
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="117" rx="17" ry="3.2" fill="#000" opacity=".3" />
      {/* legs + shoes */}
      <path d="M21 78 h8.5 l-.5 34 h-8 Z" fill={`url(#fp${id})`} />
      <path d="M30.5 78 h8.5 l-.5 34 h-8 Z" fill={`url(#fp${id})`} />
      <path d="M17.5 110 h12.5 v5 h-14 a2 2 0 0 1 1.5 -5 Z M30 110 h12.5 a2 2 0 0 1 1.5 5 h-14 Z" fill="#f8fafc" />
      <path d="M16 115 h14 M30 115 h14" stroke="#94a3b8" strokeWidth="1.2" />
      {/* left arm, resting */}
      <rect x="11.5" y="44" width="7.5" height="30" rx="3.7" fill={shirt} />
      <rect x="11.5" y="44" width="7.5" height="30" rx="3.7" fill={`url(#fs${id})`} />
      <circle cx="15.2" cy="75" r="3.7" fill={`url(#fk${id})`} />
      {/* right arm: waving, or resting by the side */}
      <g className={waving ? 'wave-arm' : ''} style={{ transformOrigin: '44px 46px', transform: waving ? 'rotate(-130deg)' : 'none' }}>
        <rect x="41" y="44" width="7.5" height="30" rx="3.7" fill={shirt} />
        <rect x="41" y="44" width="7.5" height="30" rx="3.7" fill="#000" opacity=".18" />
        <circle cx="44.7" cy="75" r="4" fill={`url(#fk${id})`} />
      </g>
      {/* shirt with collar, fold and hem */}
      <path d="M16.5 44 q13.5 -7.5 27 0 l1 36 q-14.5 2.5 -29 0 Z" fill={shirt} />
      <path d="M16.5 44 q13.5 -7.5 27 0 l1 36 q-14.5 2.5 -29 0 Z" fill={`url(#fs${id})`} />
      <path d="M16 77 q14.5 2.5 29 0 v3 q-14.5 2.5 -29 0 Z" fill="#000" opacity=".22" />
      <path d="M25.5 40.5 l4.5 5.5 4.5 -5.5" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="1.6" />
      <path d="M38 50 q2 12 0 24" stroke="#000" strokeOpacity=".12" strokeWidth="1.4" fill="none" />
      {initials && <text x="30" y="66" textAnchor="middle" fontSize="11" fontWeight="800" fill={ink} fontFamily="Plus Jakarta Sans, sans-serif">{initials}</text>}
      {/* head */}
      <rect x="26.5" y="34" width="7" height="8" rx="2" fill="#d9a27c" />
      <ellipse cx="17.6" cy="27" rx="2" ry="3" fill="#e5ad86" />
      <ellipse cx="42.4" cy="27" rx="2" ry="3" fill="#e5ad86" />
      <circle cx="30" cy="25" r="12.5" fill={`url(#fk${id})`} />
      <path d={HAIR[hair]} fill={`url(#fh${id})`} />
      <path d="M22 13.5 q7 -4 14 0" stroke="#6b7a9c" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".7" />
      <path d="M23 22 q2.3 -1.3 4.6 0 M32.4 22 q2.3 -1.3 4.6 0" stroke="#1f2937" strokeWidth="1" fill="none" strokeLinecap="round" />
      <g className="eye"><ellipse cx="25.3" cy="26" rx="1.9" ry="2.2" fill="#111827" /><circle cx="25.9" cy="25.2" r=".7" fill="#fff" /></g>
      <g className="eye"><ellipse cx="34.7" cy="26" rx="1.9" ry="2.2" fill="#111827" /><circle cx="35.3" cy="25.2" r=".7" fill="#fff" /></g>
      <ellipse cx="21.5" cy="30.5" rx="2.6" ry="1.6" fill="#fb7185" opacity=".4" />
      <ellipse cx="38.5" cy="30.5" rx="2.6" ry="1.6" fill="#fb7185" opacity=".4" />
      <path d="M26.5 31 q3.5 3.4 7 0" stroke="#9a5b3c" strokeWidth="1.4" fill="#fff" strokeLinecap="round" />
      {glasses === 'white-square' && (
        <g fill="none" stroke="#f8fafc" strokeWidth="1.7">
          <rect x="21.5" y="22.5" width="7.5" height="6.5" rx=".6" /><rect x="31" y="22.5" width="7.5" height="6.5" rx=".6" /><path d="M29 25 h2" />
        </g>
      )}
      {glasses === 'black' && (
        <g fill="none" stroke="#111827" strokeWidth="1.5">
          <rect x="21.5" y="22.5" width="7.5" height="6.5" rx="2.5" /><rect x="31" y="22.5" width="7.5" height="6.5" rx="2.5" /><path d="M29 25 h2" />
        </g>
      )}
      {/* warm rim light on the right edge */}
      <path d="M44 46 l1 32 M41.5 18 q1.5 4 1 10" stroke="#ffd9a8" strokeWidth="1" fill="none" opacity=".45" strokeLinecap="round" />
    </svg>
  );
}
