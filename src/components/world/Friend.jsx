// A friend, drawn front-on so the initials on the shirt are readable. Same 120-unit scale as Jeff.
const HAIR = {
  short: 'M18 24 q0 -15 12 -15 q12 0 12 15 q-3 -7 -12 -7 q-9 0 -12 7 Z',
  side: 'M17 26 q-1 -17 14 -17 q12 1 12 13 q-8 -6 -18 -1 q-4 2 -8 5 Z',
  spiky: 'M18 24 l2 -10 3 4 3 -7 3 5 4 -6 2 6 4 -4 1 12 q-5 -6 -12 -6 q-7 0 -12 6 Z',
};

export default function Friend({ person, waving = true }) {
  const { initials, glasses, hair = 'short', shirt, ink = '#fff' } = person;
  return (
    <svg viewBox="0 0 60 120" className="h-full w-auto overflow-visible" role="img" aria-label={`${person.initials || 'Friend'}, ${person.tag}`}>
      <ellipse cx="30" cy="117" rx="16" ry="3" fill="#000" opacity=".22" />
      {/* legs + shoes */}
      <rect x="21" y="78" width="8" height="34" rx="3" fill="#1e293b" />
      <rect x="31" y="78" width="8" height="34" rx="3" fill="#1e293b" />
      <path d="M18 110 h12 v5 h-14 a2 2 0 0 1 2 -5 Z M30 110 h12 a2 2 0 0 1 2 5 h-14 Z" fill="#f8fafc" />
      {/* left arm, resting */}
      <rect x="12" y="44" width="7" height="30" rx="3.5" fill={shirt} />
      <circle cx="15.5" cy="75" r="3.5" fill="#f1c9a5" />
      {/* right arm: waving, or resting by the side */}
      <g className={waving ? 'wave-arm' : ''} style={{ transformOrigin: '44px 46px', transform: waving ? 'rotate(-130deg)' : 'none' }}>
        <rect x="41" y="44" width="7" height="30" rx="3.5" fill={shirt} />
        <circle cx="44.5" cy="75" r="3.8" fill="#f1c9a5" />
      </g>
      {/* shirt */}
      <path d="M17 44 q13 -7 26 0 l1 36 h-28 Z" fill={shirt} />
      <path d="M26 41 l4 5 4 -5" fill="none" stroke="#000" strokeOpacity=".15" strokeWidth="1.5" />
      {initials && <text x="30" y="66" textAnchor="middle" fontSize="11" fontWeight="800" fill={ink} fontFamily="Plus Jakarta Sans, sans-serif">{initials}</text>}
      {/* head */}
      <rect x="26.5" y="34" width="7" height="8" fill="#e8b98f" />
      <circle cx="30" cy="25" r="12.5" fill="#f1c9a5" />
      <path d={HAIR[hair]} fill="#111827" />
      <circle cx="25.3" cy="26" r="2" fill="#111827" />
      <circle cx="34.7" cy="26" r="2" fill="#111827" />
      <circle cx="25.9" cy="25.3" r=".7" fill="#fff" />
      <circle cx="35.3" cy="25.3" r=".7" fill="#fff" />
      <ellipse cx="21.5" cy="30.5" rx="2.6" ry="1.6" fill="#fb7185" opacity=".45" />
      <ellipse cx="38.5" cy="30.5" rx="2.6" ry="1.6" fill="#fb7185" opacity=".45" />
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
    </svg>
  );
}
