// Original side-view adventurer: black hair, teal hoodie, glowing headphones, backpack.
// Shaded with gradients and a warm rim light so he reads as the hero of every scene.
export default function Character({ walking, facing = 1 }) {
  return (
    <svg
      viewBox="0 0 70 120"
      className={`h-full w-auto overflow-visible ${walking ? 'hero-walk' : ''}`}
      style={{ transform: `scaleX(${facing})`, filter: 'drop-shadow(0 0 6px rgba(94,234,212,.35)) drop-shadow(0 6px 10px rgba(0,0,0,.35))' }}
      role="img"
      aria-label="Jeff, the main character"
    >
      <defs>
        <linearGradient id="hj-hoodie" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2dd4bf" />
          <stop offset=".45" stopColor="#0f9488" />
          <stop offset="1" stopColor="#0b4f4a" />
        </linearGradient>
        <linearGradient id="hj-sleeve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d7f75" />
          <stop offset=".6" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#5eead4" />
        </linearGradient>
        <linearGradient id="hj-jeans" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1e2a4a" />
          <stop offset=".6" stopColor="#334872" />
          <stop offset="1" stopColor="#4a64a0" />
        </linearGradient>
        <linearGradient id="hj-jeans-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#141c33" />
          <stop offset="1" stopColor="#24345a" />
        </linearGradient>
        <radialGradient id="hj-skin" cx=".65" cy=".35" r=".75">
          <stop offset="0" stopColor="#ffe0c4" />
          <stop offset=".7" stopColor="#f1c39b" />
          <stop offset="1" stopColor="#d79a72" />
        </radialGradient>
        <linearGradient id="hj-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b3245" />
          <stop offset="1" stopColor="#07090f" />
        </linearGradient>
        <linearGradient id="hj-pack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1c76a" />
          <stop offset=".5" stopColor="#c58f2e" />
          <stop offset="1" stopColor="#7c5715" />
        </linearGradient>
        <linearGradient id="hj-shoe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c7d0de" />
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="117" rx="19" ry="3.4" fill="#000" opacity=".35" />
      <g className="body">
        {/* back leg + arm */}
        <g className="leg-b" style={{ transformOrigin: '35px 72px' }}>
          <path d="M30 70 h10 l-0.5 33 h-9 Z" fill="url(#hj-jeans-b)" />
          <path d="M28 102 h15 a5 5 0 0 1 5 5 v2 h-20 Z" fill="#b8c2d2" />
          <rect x="28" y="108" width="20" height="2" rx="1" fill="#64748b" />
        </g>
        <g className="arm-b" style={{ transformOrigin: '35px 44px' }}>
          <rect x="31" y="42" width="8" height="28" rx="4" fill="#0a5b54" />
          <circle cx="35" cy="71" r="4" fill="#cf9470" />
        </g>
        {/* backpack */}
        <rect x="12" y="39" width="18" height="32" rx="6" fill="url(#hj-pack)" />
        <rect x="14" y="53" width="13" height="10" rx="3" fill="#8a6420" />
        <path d="M15 56 h10" stroke="#f6d58c" strokeWidth="1" opacity=".7" />
        <rect x="13.5" y="41" width="3" height="26" rx="1.5" fill="#fff" opacity=".18" />
        {/* torso (hoodie) */}
        <path d="M23 43 q12 -9 24 0 l2 31 q-14 3 -28 0 Z" fill="url(#hj-hoodie)" />
        <path d="M23 70 q13 3 26 0 v4 q-13 3 -26 0 Z" fill="#0a4e48" />
        <path d="M33 45 v24" stroke="#0a4e48" strokeWidth="1.4" />
        <path d="M37 52 q4 1 7 0 v6 q-3.5 1 -7 0 Z" fill="#0b5f58" opacity=".8" />
        {/* hood bunched at the back of the neck */}
        <path d="M22 44 q-1 -8 6 -9 q4 2 4 7 q-5 0 -10 2 Z" fill="#0d7f75" />
        {/* strap */}
        <path d="M27 42 q2 12 0 26" stroke="#7c5715" strokeWidth="2.4" fill="none" />
        {/* front leg */}
        <g className="leg-a" style={{ transformOrigin: '35px 72px' }}>
          <path d="M30 70 h10 l-0.5 33 h-9 Z" fill="url(#hj-jeans)" />
          <path d="M38 74 v26" stroke="#7d93c9" strokeWidth=".8" opacity=".6" />
          <path d="M28 102 h15 a5 5 0 0 1 5 5 v2 h-20 Z" fill="url(#hj-shoe)" />
          <path d="M34 103 l3 3 M37 103 l3 3" stroke="#14b8a6" strokeWidth="1.1" />
          <rect x="28" y="108" width="20" height="2" rx="1" fill="#475569" />
        </g>
        {/* neck + head */}
        <rect x="31" y="33" width="8" height="9" rx="2" fill="#d9a27c" />
        <circle cx="37" cy="23.5" r="13" fill="url(#hj-skin)" />
        {/* ear */}
        <ellipse cx="31" cy="25" rx="2.4" ry="3.2" fill="#e5ad86" />
        {/* hair with a highlight sweep */}
        <path d="M22.5 25 q-1 -17 16 -16.5 q12 1 12.5 12 q-6 -5.5 -12.5 -3 q-2 6 -8.5 7 q-2 4 -0.5 8.5 q-6.5 -2 -7 -8 Z" fill="url(#hj-hair)" />
        <path d="M30 12 q8 -3 15 1" stroke="#5b6b8c" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity=".8" />
        <path d="M40 9.5 q6 1 9 6" stroke="#8796b5" strokeWidth=".8" fill="none" strokeLinecap="round" opacity=".6" />
        {/* face */}
        <path d="M41.5 20.5 q2.5 -1.4 5 0" stroke="#1f2937" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <ellipse cx="44" cy="24.2" rx="1.6" ry="2" fill="#111827" />
        <circle cx="44.6" cy="23.4" r=".6" fill="#fff" />
        <ellipse cx="45" cy="29" rx="2.2" ry="1.2" fill="#fb7185" opacity=".35" />
        <path d="M42 30.5 q3 1.6 5.2 0" stroke="#9a5b3c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* headphones around the neck, softly glowing */}
        <path d="M26.5 38 q10.5 8.5 21 0" stroke="#5eead4" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#glow-soft)" />
        <rect x="23.5" y="34.5" width="6.5" height="9" rx="3.2" fill="#0f766e" stroke="#5eead4" strokeWidth="1" />
        {/* front arm */}
        <g className="arm-a" style={{ transformOrigin: '35px 44px' }}>
          <rect x="31" y="42" width="8.5" height="28" rx="4.2" fill="url(#hj-sleeve)" />
          <rect x="31" y="64" width="8.5" height="4" rx="2" fill="#0b5f58" />
          <circle cx="35.2" cy="71" r="4.2" fill="url(#hj-skin)" />
        </g>
        {/* warm rim light on his back edge */}
        <path d="M23 44 l-1 26 M24 26 q0 -12 10 -15" stroke="#ffd9a8" strokeWidth="1.2" fill="none" opacity=".45" strokeLinecap="round" />
      </g>
    </svg>
  );
}
