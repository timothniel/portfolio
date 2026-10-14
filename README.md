# Timothy's Portfolio — Template

Matches your wireframe: black nav bar, polaroid-style photo, monospace
headings, a projects grid that links out to a shared detail-page template,
grouped experience timeline, and a striped dark contact footer.

## How to run it locally

**Option A — just open it:**
Double-click `index.html` and it opens in your browser. Nothing here needs
a server to work.

**Option B — Live Server in VS Code (recommended):**
1. Install the "Live Server" extension (by Ritwick Dey).
2. Right-click `index.html` → "Open with Live Server".
3. It opens at `http://127.0.0.1:5500` and auto-refreshes on save.

## File structure

```
portfolio-template/
├── index.html          Home page — hero, projects, experience, contact
├── project.html         Shared project detail page template
├── assets/
│   ├── profile.jpg       ← put your photo here (see assets/README.txt)
│   └── CV.pdf            ← put your CV/résumé here
├── css/
│   └── style.css         All styling — tokens (colors/fonts) at the top
└── js/
    ├── data.js            Your content: PROFILE, PROJECTS, EXPERIENCE
    ├── main.js             Renders the homepage from data.js
    └── project.js          Renders one project's detail page from data.js
```

## Everything you'll actually want to edit lives in `js/data.js`

- **`PROFILE`** — your name, title, school, bio, the three tag words under
  the "Explore My Projects" button, and your LinkedIn/email/phone for the
  footer. The nav bar's title ("Timothy's Portfolio") updates automatically
  from `PROFILE.name`.
- **`PROJECTS`** — one object per project card. Add a new object with a
  unique `id` and it automatically gets a card on the homepage *and* a
  working detail page at `project.html?id=your-id` — no HTML edits needed.
- **`EXPERIENCE`** — grouped by organization, matching your wireframe (one
  company/school header can list multiple roles underneath it, like a
  promotion or several semesters).

## Your photo and CV

Drop your photo in as `assets/profile.jpg` and your résumé as `assets/CV.pdf`
— both are already wired up. Until `profile.jpg` exists, the polaroid frame
automatically shows your initials instead, so the page never looks broken.

## Colors, fonts, spacing

All of it is controlled from the top of `css/style.css`:

```css
:root {
  --black: #0b0b0b;
  --paper: #f6f7f5;   /* hero background */
  --gray-300: #d9d9d9; /* placeholder blocks */
  --font-mono: "JetBrains Mono", ...;  /* headings */
  --font-sans: "Inter", ...;           /* body text */
}
```

Change `--font-mono` or `--font-sans` to swap typefaces site-wide (pull a
new one from fonts.google.com and update the `<link>` in the `<head>` of
both HTML files to match).

## Small enhancements already built in

- **Graceful photo fallback** — no broken image icon if `profile.jpg` is
  missing.
- **Responsive nav** — collapses into a toggle menu under ~900px wide.
- **Hover states** — project cards lift slightly and their "+" icon fills
  in; buttons invert color.
- **Auto-updating footer date** — the black bottom bar always shows the
  current month and year, no manual edits needed.

## Deploying it once you're happy with it

Since this is a static site, you can host it for free:
- **GitHub Pages** — push this folder to a repo, enable Pages in settings.
- **Netlify or Vercel** — drag-and-drop the folder onto their dashboard, or
  connect the repo for automatic deploys on every push.
