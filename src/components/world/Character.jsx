// Original side-view adventurer: black hair, teal hoodie, headphones, backpack.
export default function Character({ walking, facing = 1 }) {
  return (
    <svg
      viewBox="0 0 70 120"
      className={`h-full w-auto overflow-visible ${walking ? 'hero-walk' : ''}`}
      style={{ transform: `scaleX(${facing})` }}
      role="img"
      aria-label="Jeff, the main character"
    >
      <ellipse cx="35" cy="117" rx="18" ry="3" fill="#000" opacity=".25" />
      <g className="body">
        {/* back leg + arm */}
        <g className="leg-b" style={{ transformOrigin: '35px 72px' }}>
          <rect x="30" y="70" width="10" height="34" rx="4" fill="#16213a" />
          <path d="M28 102 h16 a4 4 0 0 1 4 4 v3 h-20 Z" fill="#e2e8f0" />
        </g>
        <g className="arm-b" style={{ transformOrigin: '35px 44px' }}>
          <rect x="31" y="42" width="8" height="28" rx="4" fill="#0b5f58" />
          <circle cx="35" cy="71" r="4" fill="#e8b98f" />
        </g>
        {/* backpack */}
        <rect x="14" y="40" width="16" height="30" rx="5" fill="#b7862c" />
        <rect x="16" y="52" width="12" height="8" rx="2" fill="#8a6420" />
        {/* torso (hoodie) */}
        <path d="M24 42 q11 -8 22 0 l2 32 h-26 Z" fill="#0f766e" />
        <path d="M33 44 v26" stroke="#0b5f58" strokeWidth="1.5" />
        {/* front leg */}
        <g className="leg-a" style={{ transformOrigin: '35px 72px' }}>
          <rect x="30" y="70" width="10" height="34" rx="4" fill="#1e293b" />
          <path d="M28 102 h16 a4 4 0 0 1 4 4 v3 h-20 Z" fill="#f8fafc" />
        </g>
        {/* head */}
        <rect x="31" y="34" width="8" height="8" fill="#e8b98f" />
        <circle cx="37" cy="24" r="13" fill="#f1c9a5" />
        <path d="M23 24 q0 -16 16 -15 q11 1 11 11 q-6 -5 -12 -3 q-2 6 -8 7 q-2 4 -1 8 q-6 -2 -6 -8 Z" fill="#111827" />
        <circle cx="44" cy="24" r="1.6" fill="#111827" />
        <path d="M42 30 q3 1.5 5 0" stroke="#9a5b3c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* headphones around neck */}
        <path d="M27 38 q10 8 20 0" stroke="#14b8a6" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="24" y="35" width="6" height="8" rx="3" fill="#14b8a6" />
        {/* front arm */}
        <g className="arm-a" style={{ transformOrigin: '35px 44px' }}>
          <rect x="31" y="42" width="8" height="28" rx="4" fill="#119485" />
          <circle cx="35" cy="71" r="4" fill="#f1c9a5" />
        </g>
      </g>
    </svg>
  );
}
