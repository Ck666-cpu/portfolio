import { memo, useId } from 'react';

// Wraps a flat 600×400 scene and lights it: a soft key light from the top-left,
// ambient occlusion at the base, a rim of sky light on the edges and a cast
// shadow on the ground. The light layers are masked by the scene's own
// silhouette, so every shape gets shaded without redrawing it.
export default function Stage({ children, shadow = [300, 190], viewBox = '0 0 600 400', light = 1 }) {
  const raw = useId().replace(/:/g, '');
  const c = `c${raw}`;
  return (
    <svg viewBox={viewBox} className="h-full w-auto overflow-visible" aria-hidden>
      <defs>
        <mask id={`m${raw}`} style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="-200" y="-200" width="1000" height="700">
          <use href={`#${c}`} />
        </mask>
        <radialGradient id={`sh${raw}`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#000" stopOpacity=".55" />
          <stop offset=".6" stopColor="#000" stopOpacity=".22" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* contact shadow on the ground */}
      <ellipse cx={shadow[0]} cy="402" rx={shadow[1]} ry="22" fill={`url(#sh${raw})`} />
      <g id={c}>{children}</g>
      <g pointerEvents="none" opacity={light}>
        <rect mask={`url(#m${raw})`} x="-200" y="-200" width="1000" height="700" fill="url(#lit-key)" />
        <rect mask={`url(#m${raw})`} x="-200" y="-200" width="1000" height="700" fill="url(#lit-ao)" />
        <rect mask={`url(#m${raw})`} x="-200" y="-200" width="1000" height="700" fill="url(#lit-rim)" />
      </g>
    </svg>
  );
}

// Shared gradients + filters, rendered once by World.
export const LightingDefs = memo(function LightingDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <linearGradient id="lit-key" gradientUnits="userSpaceOnUse" x1="0" y1="-60" x2="560" y2="420">
          <stop offset="0" stopColor="#fff6e0" stopOpacity=".32" />
          <stop offset=".42" stopColor="#fff" stopOpacity="0" />
          <stop offset=".72" stopColor="#0a0820" stopOpacity=".14" />
          <stop offset="1" stopColor="#0a0820" stopOpacity=".42" />
        </linearGradient>
        <linearGradient id="lit-ao" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="0" y2="402">
          <stop offset="0" stopColor="#1a1430" stopOpacity="0" />
          <stop offset=".75" stopColor="#1a1430" stopOpacity=".2" />
          <stop offset="1" stopColor="#1a1430" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id="lit-rim" gradientUnits="userSpaceOnUse" x1="600" y1="0" x2="420" y2="0">
          <stop offset="0" stopColor="#ffd9a8" stopOpacity=".22" />
          <stop offset="1" stopColor="#ffd9a8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mtn-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset=".35" stopColor="#fff" stopOpacity=".14" />
          <stop offset=".6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </linearGradient>
        <radialGradient id="lamp-halo" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffd77a" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffd77a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="spill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe3a0" stopOpacity=".7" />
          <stop offset="1" stopColor="#ffe3a0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffbe0" stopOpacity=".7" />
          <stop offset="1" stopColor="#fffbe0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="garage" cx=".5" cy=".1" r=".9">
          <stop offset="0" stopColor="#2dd4bf" stopOpacity=".35" />
          <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
        {/* bloom for anything that emits light */}
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b1" />
          <feMerge>
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
});
