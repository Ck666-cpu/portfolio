// Generated 16:9 cover used until a real screenshot is set on the project.
export default function Cover({ project, className = '' }) {
  if (project.image)
    return <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className={`aspect-video w-full object-cover ${className}`} />;
  const h = project.hue ?? 172;
  const id = `g-${project.id}`;
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label={`${project.title} cover`} className={`aspect-video w-full ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${h} 70% 38%)`} />
          <stop offset="1" stopColor={`hsl(${(h + 40) % 360} 65% 18%)`} />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#${id})`} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={170 + (i % 3) * 44} y={30 + Math.floor(i / 3) * 62} width="36" height="48" rx="8" fill="#fff" opacity={0.06 + (i % 3) * 0.05} />
      ))}
      <path d="M170 150 C 210 120, 240 160, 300 110" stroke={`hsl(${h} 90% 75%)`} strokeWidth="3" fill="none" opacity=".8" />
      <rect x="24" y="34" width="110" height="10" rx="5" fill="#fff" opacity=".85" />
      <rect x="24" y="54" width="80" height="8" rx="4" fill="#fff" opacity=".45" />
      <rect x="24" y="70" width="96" height="8" rx="4" fill="#fff" opacity=".3" />
      <text x="24" y="146" fontFamily="Fraunces, Georgia, serif" fontWeight="800" fontSize="34" fill="#fff" opacity=".9">
        {project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}
      </text>
    </svg>
  );
}
