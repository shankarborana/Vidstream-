# Magnet2Download Pro

A browser-based, mobile-first tool to convert torrent magnet links to direct downloads using WebTorrent.js – fully static, animated, and ad-ready. Deploy on GitHub Pages or Vercel with zero backend.

## Features

- Paste magnet link and fetch torrent file info
- Download any file directly in the browser (WebTorrent.js)
- Real-time download progress bars
- Copy direct download link to clipboard
- Animated, mobile-first UI (Tailwind CSS)
- Light/Dark mode
- Full error handling
- Responsive ad slots framework (`<!-- Paste your ad code here -->`)
- Installable as a PWA
- 100% static, Vercel/Netlify/GitHub deployable

## Deployment

1. **GitHub:**
   - Push this repo to GitHub.

2. **Vercel:**
   - Import the repo into Vercel.
   - Deploy as a static site. No extra config needed.

3. **Local Dev:**
   - `npm install` (for Tailwind CLI, optional)
   - `npm run dev` (if using Tailwind CLI)
   - Or just open `index.html` directly.

## Tech Stack

- HTML5, Tailwind CSS
- Vanilla JS
- [WebTorrent.js](https://webtorrent.io/)
- FileSaver.js (optional, for downloads)
- No Node.js server or backend required.

## Ads

To add ads, paste your ad scripts inside the marked slots in `index.html`. Ad slots are responsive and styled with Tailwind.

---
