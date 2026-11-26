// ─────────────────────────────────────────────────────────────
// ALL personal content lives here. Edit this file, not the components.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Jeff Lam Ching Keat',
  displayName: 'Jeff Lam',
  headline: 'Software Engineer, Backend · Distributed Systems & Microservices',
  roles: ['Java Backend Engineer', 'Distributed Systems & Microservices', 'SRE / Cloud Engineer'],
  tagline:
    'I trace problems to their root cause and build backend systems that stay reliable, then automate whatever slows the team down.',
  bio: [
    "I grew up on storybooks and sci-fi films, and somewhere along the way I realised the future in those stories is being written in code. That's why I chose Software Engineering at TAR UMT, where I'm graduating in December 2026 with a CGPA of 3.91.",
    "My favourite feeling in this job is the moment a bug finally makes sense: you dig past the symptom, find the real reason, and fix it for good. A close second is building something big and well-designed, or automating a task so I never have to do it by hand again.",
    "I've just spent six months as a Site Reliability / Java Engineer intern on the Fund Risk team at Ant International, building Spring Boot services, tuning SQL over large transaction datasets and chasing production issues to their root cause. Now I'm looking for a full-time backend role in the Klang Valley, and I'm keen to work in Go too.",
  ],
  location: 'Kuala Lumpur, Malaysia',
  availability: 'Open to full-time roles · available from 1 Dec 2026',
  languages: ['English', 'Mandarin', 'Cantonese', 'Malay'],
  certifications: ['AWS Cloud Architecting', 'AWS Cloud Foundations'],
  cvUrl: '/cv.pdf',
  socials: {
    github: 'https://github.com/Ck666-cpu',
    linkedin: 'https://www.linkedin.com/in/ching-keat-lam-536656323',
    email: 'chingkeat0310@gmail.com',
  },
  // Count-up stats in the About section. Keep these true.
  stats: [
    { value: 3.91, decimals: 2, label: 'CGPA' },
    { value: 6, suffix: ' mo', label: 'SRE internship' },
    { value: 4, suffix: '×', label: "President's List" },
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
      { name: 'Spring Security · JWT', icon: 'spring' },
      { name: 'JPA / Hibernate', icon: 'sql' },
      { name: 'REST API design', icon: 'distributed' },
      { name: 'SQL · PL/SQL', icon: 'sql' },
      { name: 'PostgreSQL · MySQL', icon: 'sql' },
      { name: 'Kafka / RocketMQ', icon: 'kafka' },
      { name: 'Transactional outbox', icon: 'kafka' },
      { name: 'Python · FastAPI', icon: 'python' },
      { name: 'JUnit 5 · Testcontainers', icon: 'test' },
      { name: 'Elasticsearch + Kibana', icon: 'elastic' },
    ],
    // skills I want to learn next (shown locked in the skill tree)
    next: [
      { name: 'Go', icon: 'go' },
      { name: 'Redis caching', icon: 'redis' },
      { name: 'System design at scale', icon: 'network' },
      { name: 'API design & backend project planning', icon: 'plan' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'AWS (certified)', icon: 'aws' },
      { name: 'Docker · Compose', icon: 'docker' },
      { name: 'Git CI/CD', icon: 'cicd' },
      { name: 'Nginx', icon: 'linux' },
      { name: 'Linux', icon: 'linux' },
      { name: 'Nacos', icon: 'distributed' },
    ],
    next: [
      { name: 'Kubernetes', icon: 'k8s' },
      { name: 'Terraform', icon: 'terraform' },
      { name: 'Serverless', icon: 'serverless' },
      { name: 'Prometheus & Grafana', icon: 'grafana' },
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      { name: 'RAG · LLMs (Ollama)', icon: 'ai' },
      { name: 'LlamaIndex', icon: 'ai' },
      { name: 'Qdrant vector DB', icon: 'sql' },
      { name: 'Agentic AI coding tools', icon: 'cli' },
      { name: 'MCP (Model Context Protocol)', icon: 'mcp' },
      { name: 'Playwright', icon: 'playwright' },
    ],
    next: [
      { name: 'Multi-agent systems', icon: 'agents' },
      { name: 'LLM fine-tuning (LoRA)', icon: 'tune' },
      { name: 'LLM evals & guardrails', icon: 'shield' },
      { name: 'MLOps', icon: 'boxes' },
    ],
  },
  {
    category: 'Soft skills',
    items: [
      { name: 'Root-cause analysis', icon: 'bulb' },
      { name: 'Incident communication', icon: 'chat' },
      { name: 'Code review', icon: 'team' },
      { name: 'Mentoring new interns', icon: 'grad' },
      { name: 'Active listening', icon: 'ear' },
      { name: 'Adaptability', icon: 'shuffle' },
      { name: 'Time management', icon: 'clock' },
      { name: 'English · 中文 · 粤语 · BM', icon: 'globe' },
    ],
    next: [
      { name: 'Technical writing', icon: 'pen' },
      { name: 'Public speaking', icon: 'mic' },
      { name: 'Leading a team', icon: 'flag' },
    ],
  },
];

// `hue` picks the colour of the generated cover; or set `image` to an imported 16:9 WebP.
// `demo` adds a "Try the live demo" button that opens an in-browser simulation.
export const projects = [
  {
    id: 'claimflow',
    featured: true,
    title: 'ClaimFlow',
    summary: 'Event-driven claims microservices: Spring Boot services talking through Kafka, with a transactional outbox so no event is lost.',
    problem:
      'A claims platform has to keep the claim record and everything downstream in sync. If a service saves a claim but crashes before telling Kafka, or a client retries a request, you end up with lost or duplicate events.',
    role: 'Solo developer: service design, REST API contract, event flow, tests and the Angular front end.',
    features: [
      'Two microservices: a claims system of record and a notification consumer, linked by Kafka events published through a transactional outbox',
      'Versioned REST API with an OpenAPI contract: idempotency keys (201, or 200 on replay), optimistic locking (409 on stale writes) and RFC 9457 errors',
      'Full claim workflow by role: claimants submit and track, officers assess and decide, team leads see workload, SLA breaches and exposure',
      'JUnit 5 and module tests plus Testcontainers integration tests against real PostgreSQL and Kafka; one-command local stack with Docker Compose',
    ],
    tech: ['Java 21', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Testcontainers', 'Docker', 'Angular'],
    outcome:
      'Built so a claim event is never lost: if Kafka is down, events wait in the outbox and go out once it recovers, and a retried request never creates a second claim.',
    hue: 200,
    demo: 'claimflow',
    liveUrl: '',
    repoUrl: 'https://github.com/Ck666-cpu/claimflow',
  },
  {
    id: 'crag-assistant',
    featured: true,
    title: 'Real Estate Corrective-RAG Assistant',
    summary: 'Final-year project: a locally hosted AI assistant that answers from internal documents only, with JWT and role-based access.',
    problem:
      'Real estate teams need quick answers from tenancy agreements and policies, but generic chatbots make things up and can leak sensitive documents.',
    role: 'Final-year project: FastAPI backend, retrieval pipeline, security and Docker deployment.',
    features: [
      'Corrective RAG: retrieved passages are re-ranked and checked before the model answers, to cut unsupported answers',
      'Runs fully on-premise: Phi-3 via Ollama, BGE embeddings and reranker, Qdrant vector search',
      'JWT login with Casbin RBAC enforced at both route and document level',
      'FastAPI backend with a Streamlit front end, deployed with Docker',
    ],
    tech: ['Python', 'FastAPI', 'Qdrant', 'Ollama', 'Casbin RBAC', 'Docker'],
    outcome: '86.67% answer accuracy and 0% hallucination on the project evaluation.',
    hue: 168,
    liveUrl: '',
    repoUrl: 'https://github.com/Ck666-cpu/RAG_Chatbot',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Backend Platform',
    summary: 'Spring Boot REST backend for a shop: catalogue, cart, orders and reviews, secured with JWT roles.',
    problem: "An online shop backend has to keep the catalogue searchable, separate admin and customer actions, and never sell stock it doesn't have.",
    role: 'Solo developer: API design, security, persistence and tests.',
    features: [
      'REST APIs for products, categories, cart, orders and reviews, with pagination, sorting and search',
      'JWT authentication with ADMIN and CUSTOMER roles via Spring Security',
      'Stock validation at checkout to prevent overselling',
    ],
    tech: ['Java 17', 'Spring Boot 3', 'Spring Security', 'JPA', 'PostgreSQL', 'JUnit'],
    outcome: 'Checkout rejects any order that would oversell, covered by JUnit tests.',
    hue: 32,
    liveUrl: '',
    repoUrl: 'https://github.com/Ck666-cpu/Ecommerce-Java',
  },
];

export const experience = [
  {
    type: 'work',
    title: 'Site Reliability Engineer / Java Engineer Intern — Fund Risk',
    org: 'Ant International',
    start: 'Jun 2026',
    end: 'Dec 2026',
    bullets: [
      'Developed and maintained internal Java / Spring Boot services and tools for fund-risk operations and real-time system monitoring.',
      'Investigated and resolved production backend issues with senior engineers, using root-cause analysis to keep services highly available.',
      'Wrote and optimised SQL over large-scale transaction datasets, improving data validation, audit accuracy and anomaly detection.',
      'Wrote unit tests and took part in code reviews within enterprise Git / CI/CD workflows.',
      'Used an agentic AI coding assistant (Qoder) to speed up feature work, debugging and refactoring.',
    ],
  },
  {
    type: 'education',
    title: 'Bachelor of Software Engineering (Hons)',
    org: 'Tunku Abdul Rahman University of Management and Technology (TAR UMT)',
    start: 'Nov 2023',
    end: 'Dec 2026',
    honours: ["4× President's List", "3× Dean's List"],
    coursework: ['Distributed Systems & Parallel Computing (A+)', 'Cloud Computing (A)', 'Advanced Database Management (A)', 'Data Structures & Algorithms (A)', 'Software QA & Testing (A)', 'Artificial Intelligence (A)'],
    bullets: ['CGPA 3.91 / 4.00', "Final-year project: Real Estate Corrective-RAG Assistant (86.67% accuracy, 0% hallucination)"],
  },
];

// Contact form: create a free form at https://formspree.io and paste its ID (e.g. "xyzabcd").
// Leave empty and the form opens the visitor's email app with their message ready to send.
export const formspreeId = '';

// Friends who come out to say hello when you click a building in the story world.
// (tag is only for your own notes; it isn't shown on the site)
// height: 'tall' | 'same' | 'short' (relative to Jeff) · glasses: 'white-square' | 'black' | null
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
