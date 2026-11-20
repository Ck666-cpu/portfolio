# Jeff Lam — Portfolio

Interactive "walk through my story" portfolio built with **React 18 + Vite + Tailwind CSS + Framer Motion**. Scrolling (or the → key) walks the character through 7 places — Home, Campus (TAR UMT Arena), Workshop, Quest Board, City (Exchange 106), Park, Crossroads — and each place opens a dialogue box with that part of the story. Scenes live in `src/components/world/Scenes.jsx`, dialogue content in `src/components/world/Panels.jsx`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## Update content

All personal content is in `src/data/portfolio.js`. Search for `TODO` to find what's still missing:

- **Projects** — the 4 cards are samples (marked with a yellow "Sample" badge). Replace them with your real projects and set `sample: false`.
- **Photo** — put a square WebP (≥600×600) in `src/assets/`, import it in `portfolio.js` and set `profile.photo`.
- **CV** — export your Overleaf resume as PDF and save it as `public/cv.pdf`.
- **Internship bullets** — replace with 2–3 specific achievements (numbers if you have them).
- **Education** — add start year and any FYP / awards.
- **Contact form** — create a free form at formspree.io and paste its ID into `formspreeId`.
- **OG image** — add `public/og-image.png` (1200×630) so links preview well on LinkedIn / WhatsApp.

## Deploy to Vercel

1. Push this folder to a new GitHub repo.
2. On vercel.com → **Add New Project** → import the repo. Vercel detects Vite automatically (build: `npm run build`, output: `dist`).
3. Every push to `main` redeploys. Then set `profile.siteRepo` to the repo URL.

## Structure

```
src/
├─ components/
│  ├─ world/     World (scroll engine, sky, parallax, map), Character, Scenes, Panels
│  └─            ProjectModal, Cover, ItemArt, Toast
├─ data/portfolio.js
├─ hooks/        useTyping
├─ App.jsx
└─ main.jsx
public/          favicon.svg, 404.html, cv.pdf (add), og-image.png (add)
```
