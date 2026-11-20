// ─────────────────────────────────────────────────────────────
// ALL personal content lives here. Edit this file, not the components.
// Items marked TODO still need your real information.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Jeff Lam Ching Keat',
  displayName: 'Jeff Lam',
  roles: ['Java Backend Engineer', 'SRE / DevOps Engineer', 'Cloud & AI Automation Engineer'],
  tagline:
    'I trace problems to their root cause and build backend systems that stay reliable, then automate whatever slows the team down.',
  bio: [
    "I grew up on storybooks and sci-fi films, and somewhere along the way I realised the future in those stories is being written in code. That's why I chose Software Engineering at TAR UMT, where I'm graduating in December 2026 with a CGPA of 3.91.",
    "My favourite feeling in this job is the moment a bug finally makes sense: you dig past the symptom, find the real reason, and fix it for good. A close second is building something big and well-designed, or automating a task so I never have to do it by hand again.",
    "I recently spent six months as an SRE / Java Engineer intern on the Fund Risk team at Ant International, where backend code meets production reliability. Now I'm looking for a full-time role in Java backend, SRE / DevOps, cloud or AI automation in the Klang Valley.",
  ],
  location: 'Kuala Lumpur, Malaysia',
  availability: 'Open to full-time roles · available from 1 Dec 2026',
  languages: ['English', 'Mandarin', 'Cantonese', 'Malay'],
  photo: null, // TODO: import a square photo (≥600×600, WebP) from src/assets and set it here
  cvUrl: '/cv.pdf', // TODO: export your Overleaf resume as PDF → public/cv.pdf
  socials: {
    github: 'https://github.com/Ck666-cpu',
    linkedin: 'https://www.linkedin.com/in/ching-keat-lam-536656323',
    email: 'chingkeat0310@gmail.com',
  },
  // Count-up stats in the About section. Keep these true.
  stats: [
    { value: 3.91, decimals: 2, label: 'CGPA' },
    { value: 6, suffix: ' mo', label: 'SRE internship' },
    { value: 4, label: 'Languages spoken' },
  ],
  siteRepo: 'https://github.com/Ck666-cpu/portfolio',
};

// How I work — shown as principle cards.
export const principles = [
  { icon: 'search', title: 'Find the real cause', text: "A quick patch hides a bug; the root cause ends it. I keep digging until the 'why' makes sense." },
  { icon: 'rocket', title: 'Build something worth being proud of', text: 'I enjoy designing systems that are solid and well thought out, not just good enough to pass.' },
  { icon: 'bot', title: 'Automate the repeat', text: "If I've done it by hand twice, I'd rather write a script, a pipeline or an AI helper to do it for me." },
  { icon: 'ear', title: 'Listen first', text: "Friends call me a good listener. In a team, and during incidents, understanding the problem comes before talking." },
];

// Beyond the code — a game-style character sheet.
export const character = {
  className: 'Problem solver · system builder',
  traits: ['Friendly', 'Easy to talk to', 'Good listener'],
  languages: ['English', 'Mandarin', 'Cantonese', 'Malay'],
};

// Hobbies shown as a game inventory. `art` picks the drawing; rarity is just for fun.
export const interests = [
  { art: 'novel', short: 'Web novels', rarity: 'Legendary', title: 'Chinese web novels', text: 'Long-form Chinese fantasy and cultivation novels: patient world-building and stories told over hundreds of chapters.' },
  { art: 'manga', short: 'Manga', rarity: 'Epic', title: 'Manga & manhua', text: 'Reading online comics, a habit that grew out of loving storybooks as a kid.' },
  { art: 'anime', short: 'Anime', rarity: 'Epic', title: 'Anime', text: 'Strong characters, long story arcs and worlds built with care.' },
  { art: 'film', short: 'Sci-fi films', rarity: 'Epic', title: 'Sci-fi & superhero films', text: 'Worlds where technology changes everything: part of why I chose software.' },
  { art: 'controller', short: 'Games', rarity: 'Rare', title: 'Game playthroughs', text: "I follow story-driven, open-world games, mostly through playthroughs, for their storytelling and world design." },
  { art: 'headphones', short: 'Listening', rarity: 'Rare', title: 'Listening', text: 'Friends say I\'m easy to talk to and a good listener, something I bring to every team.' },
  { art: 'racket', short: 'Badminton', rarity: 'Rare', title: 'Badminton', text: 'Very Malaysian, very fun. Always up for a game.' },
  { art: 'goggles', short: 'Swimming', rarity: 'Common', title: 'Swimming', text: 'My reset button after a long day of screens.' },
  { art: 'ball', short: 'Basketball', rarity: 'Common', title: 'Basketball', text: 'I enjoy watching basketball games.' },
];

export const skills = [
  {
    category: 'Backend',
    items: [
      { name: 'Java', icon: 'java' },
      { name: 'Spring Boot', icon: 'spring' },
      { name: 'SQL', icon: 'sql' },
      { name: 'Python', icon: 'python' },
      { name: 'Kafka / RocketMQ', icon: 'kafka' },
      { name: 'Distributed systems', icon: 'distributed' },
      { name: 'Elasticsearch + Kibana', icon: 'elastic' },
      { name: 'Solidity', icon: 'solidity' },
    ],
    // skills I want to learn next (shown locked in the skill tree)
    next: [
      { name: 'Redis caching', icon: 'redis' },
      { name: 'System design at scale', icon: 'network' },
      { name: 'API design & backend project planning', icon: 'plan' },
      { name: 'Go', icon: 'go' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'AWS', icon: 'aws' },
      { name: 'Docker', icon: 'docker' },
      { name: 'CI/CD', icon: 'cicd' },
      { name: 'Git', icon: 'git' },
      { name: 'Linux', icon: 'linux' },
    ],
    next: [
      { name: 'Kubernetes', icon: 'k8s' },
      { name: 'Terraform', icon: 'terraform' },
      { name: 'Serverless', icon: 'serverless' },
      { name: 'Prometheus & Grafana', icon: 'grafana' },
      { name: 'AWS certification', icon: 'award' },
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      { name: 'RAG / LLM apps', icon: 'ai' },
      { name: 'AI CLI tools', icon: 'cli' },
      { name: 'MCP (Model Context Protocol)', icon: 'mcp' },
      { name: 'Playwright', icon: 'playwright' },
      { name: 'Python scripting', icon: 'python' },
    ],
    next: [
      { name: 'Multi-agent systems', icon: 'agents' },
      { name: 'LLM fine-tuning (LoRA)', icon: 'tune' },
      { name: 'LLM evals & guardrails', icon: 'shield' },
      { name: 'Vector databases', icon: 'sql' },
      { name: 'MLOps', icon: 'boxes' },
    ],
  },
  {
    category: 'Soft skills',
    items: [
      { name: 'Mentoring new interns', icon: 'grad' },
      { name: 'Incident communication', icon: 'chat' },
      { name: 'Teamwork', icon: 'team' },
      { name: 'Problem solving', icon: 'bulb' },
      { name: 'Active listening', icon: 'ear' },
      { name: 'Adaptability', icon: 'shuffle' },
      { name: 'Time management', icon: 'clock' },
      { name: 'Multilingual (EN · 中文 · BM)', icon: 'globe' },
    ],
    next: [
      { name: 'Technical writing', icon: 'pen' },
      { name: 'Public speaking', icon: 'mic' },
      { name: 'Leading a team', icon: 'flag' },
    ],
  },
];

// TODO: replace these SAMPLE projects with your real ones (3–6).
// Set `sample: false` (or delete the field) once an entry is real.
// `hue` picks the colour of the generated cover; or set `image` to an imported 16:9 WebP.
export const projects = [
  {
    id: 'rag-assistant',
    sample: true,
    featured: true,
    title: 'RAG Knowledge Assistant',
    summary: 'Chat with internal documents using retrieval-augmented generation.',
    problem:
      'Answers were buried across long PDFs and wikis, so people kept asking the same questions.',
    role: 'Solo developer: ingestion pipeline, retrieval, API and simple web UI.',
    features: [
      'Chunking and embedding pipeline for PDF / Markdown sources',
      'Vector search with source citations in every answer',
      'REST API wrapped in a Docker image',
    ],
    tech: ['Python', 'LLM', 'Docker'],
    outcome: 'Add a real result here, e.g. response time or questions answered.',
    hue: 172,
    liveUrl: '',
    repoUrl: 'https://github.com/Ck666-cpu',
  },
  {
    id: 'order-service',
    sample: true,
    featured: true,
    title: 'Event-Driven Order Service',
    summary: 'Spring Boot microservice that processes orders through a message queue.',
    problem: 'Synchronous order handling failed under bursts and lost requests when a downstream service was slow.',
    role: 'Backend developer: service design, messaging, persistence and tests.',
    features: [
      'Kafka producer / consumer with retry and dead-letter topic',
      'Idempotent writes to a relational database',
      'Health checks and metrics endpoints for monitoring',
    ],
    tech: ['Java', 'Spring Boot', 'Kafka', 'SQL'],
    outcome: 'Add a real result here, e.g. throughput or test coverage.',
    hue: 200,
    liveUrl: '',
    repoUrl: 'https://github.com/Ck666-cpu',
  },
  {
    id: 'cicd-pipeline',
    sample: true,
    title: 'Cloud CI/CD Pipeline',
    summary: 'Push-to-deploy pipeline that builds, tests and ships containers to AWS.',
    problem: 'Manual deployments were slow and easy to get wrong.',
    role: 'DevOps: pipeline, container images and cloud setup.',
    features: [
      'Automated build and test on every pull request',
      'Docker images pushed to a registry and deployed to AWS',
      'Rollback by redeploying the previous image tag',
    ],
    tech: ['AWS', 'Docker', 'CI/CD'],
    outcome: 'Add a real result here, e.g. deploy time before vs after.',
    hue: 32,
    liveUrl: '',
    repoUrl: 'https://github.com/Ck666-cpu',
  },
  {
    id: 'job-bot',
    sample: true,
    title: 'Browser Automation Toolkit',
    summary: 'Playwright scripts that automate repetitive web workflows end to end.',
    problem: 'Repetitive form filling and checks took hours each week.',
    role: 'Solo developer: test design, scripts and scheduling.',
    features: [
      'Page-object structure for maintainable scripts',
      'Screenshots and logs on every failure',
      'Runs on a schedule in CI',
    ],
    tech: ['Python', 'Playwright', 'CI/CD'],
    outcome: 'Add a real result here, e.g. hours saved per week.',
    hue: 268,
    liveUrl: '',
    repoUrl: 'https://github.com/Ck666-cpu',
  },
];

export const experience = [
  {
    type: 'work',
    title: 'SRE / Java Engineer Intern — Fund Risk',
    org: 'Ant International',
    start: 'Jun 2026',
    end: 'Nov 2026',
    // TODO: replace with 2–3 specific achievements (with numbers if you have them)
    bullets: [
      'Worked on the Fund Risk team across Java backend services and site reliability.',
      'Supported production health through monitoring, alert handling and incident follow-up.',
      'Worked with message queues (RocketMQ / Kafka) and CI/CD in a large-scale fintech environment.',
    ],
  },
  {
    type: 'education',
    title: 'Bachelor of Software Engineering (Hons)',
    org: 'Tunku Abdul Rahman University of Management and Technology (TAR UMT)',
    start: '', // TODO: add start year
    end: 'Dec 2026 (expected)',
    bullets: [
      'CGPA 3.91',
      // TODO: add final-year project, awards or Dean's List if applicable
    ],
  },
];

// Contact form: create a free form at https://formspree.io and paste its ID (e.g. "xyzabcd").
// Leave empty and the form will tell visitors to email you directly instead.
export const formspreeId = '';

// Friends who come out to say hello when you click a building in the story world.
// (tag is only for your own notes; it isn't shown on the site)
// height: 'tall' | 'same' | 'short' (relative to Jeff) · glasses: 'white-square' | 'black' | null
// TODO: give the TAR UMT coursemates their real initials / looks.
export const friends = {
  campus: {
    title: 'Friends at TAR UMT',
    people: [
      { id: 'c1', initials: '', height: 'same', glasses: null, hair: 'side', shirt: '#0f766e', tag: 'Coursemate', hello: 'Hi Jeff!' },
      { id: 'c2', initials: '', height: 'short', glasses: 'black', hair: 'spiky', shirt: '#be123c', tag: 'Coursemate', hello: 'Study group later?' },
      { id: 'c3', initials: '', height: 'tall', glasses: null, hair: 'short', shirt: '#1d4ed8', tag: 'Coursemate', hello: 'Hello!' },
    ],
  },
  city: {
    title: 'Mentor, seniors and intern fellows at Ant International',
    subtitle: 'Fund Risk Family',
    wave: false, // they just stand and greet
    people: [
      { id: 'ms', initials: 'MS', height: 'tall', glasses: null, hair: 'short', shirt: '#1d4ed8', tag: 'Colleague', hello: 'Yoo!' },
      { id: 'kx', initials: 'KX', height: 'same', glasses: 'white-square', hair: 'side', shirt: '#e5e7eb', ink: '#13213b', tag: 'Colleague', hello: "What's up!" },
      { id: 'xn', initials: 'XN', height: 'short', glasses: 'black', hair: 'spiky', shirt: '#b91c1c', tag: 'Colleague', hello: 'Wallahi!' },
      { id: 'cz', initials: 'CZ', height: 'same', glasses: null, hair: 'side', shirt: '#7c3aed', tag: 'Intern fellow', hello: 'Hi hi!' },
      { id: 'hh', initials: 'HH', height: 'same', glasses: null, hair: 'short', shirt: '#d97706', tag: 'Intern fellow', hello: 'Hello Jeff!' },
      { id: 'jy', initials: 'JY', height: 'same', glasses: null, hair: 'short', shirt: '#047857', tag: 'Intern fellow', hello: 'Hey!' },
    ],
  },
};
