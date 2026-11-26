# Jeff Lam — Portfolio

Interactive "walk through my story" portfolio built with **React 18 + Vite + Tailwind CSS + Framer Motion**. Scrolling (or the → key) walks the character through 7 places — Home, Campus (TAR UMT Arena), Workshop, Quest Board, City (Exchange 106), Park, Crossroads — and each place opens a dialogue box with that part of the story. Scenes live in `src/components/world/Scenes.jsx`, dialogue content in `src/components/world/Panels.jsx`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## Update content

All personal content is in `src/data/portfolio.js`. The CV served by the site is `public/cv.pdf`; replace it when your résumé changes.

Optional extras:

- **Contact form**: create a free form at formspree.io and paste its ID into `formspreeId`. Until then the form opens the visitor's email app with the message filled in.
- **OG image**: add `public/og-image.png` (1200×630) so links preview well on LinkedIn / WhatsApp.

## Extras

- **Quick view** (`src/components/QuickView.jsx`): a printable one-page résumé, opened from the top bar or linked directly as `/#quick`.
- **Live demo** (`src/components/ClaimFlowDemo.jsx`): an in-browser simulation of ClaimFlow's transactional outbox + Kafka flow, opened from the Quest Board, the ClaimFlow project, or `/#demo`.
- **Lite mode**: drops the heavy light and particle effects. It switches on automatically when scrolling is slow, and visitors can toggle it with ✦ in the top bar or in the footer.

## Deploy to Vercel

1. Push this folder to a new GitHub repo.
2. On vercel.com → **Add New Project** → import the repo. Vercel detects Vite automatically (build: `npm run build`, output: `dist`).
3. Every push to `main` redeploys. Then set `profile.siteRepo` to the repo URL.

## Structure

```
src/
├─ components/
│  ├─ world/     World (scroll engine, parallax, map), Atmosphere (sky FX, skyline, particles, intro),
│  │             Stage (scene lighting), Character, Scenes, Panels
│  └─            ProjectModal, Cover, ItemArt, Toast
├─ data/portfolio.js
├─ hooks/        useTyping
├─ App.jsx
└─ main.jsx
public/          favicon.svg, 404.html, cv.pdf (add), og-image.png (add)
```
