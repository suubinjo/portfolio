# Subin Jo Portfolio

Personal portfolio website for Subin Jo, designed and built as a static site.

Live site: [subinjo.com](https://subinjo.com)

## Pages

- `/` - Home and selected work
- `/about-me/` - About page
- `/journey/` - Portfolio journey page
- `/identifit/` - Identifit case study
- `/milestone/` - Milestone Seed case study
- `/ea-games/` - EA Games case study preview

## Stack

- HTML
- CSS
- JavaScript
- GitHub Pages

## Local Preview

Run a local server from the project root:

```bash
python3 -m http.server 4173
```

Then visit:

```text
http://localhost:4173
```

## Repository layout

This is a **static** site (no build step). GitHub Pages maps URL paths to folders:

| Public URL | Source file |
| --- | --- |
| `/` | `index.html` |
| `/about-me/` | `about-me/index.html` |
| `/ea-games/` | `ea-games/index.html` |
| `/identifit/` | `identifit/index.html` |
| `/milestone/` | `milestone/index.html` |
| `/resume/` | `resume/index.html` |
| `/journey/` | `journey/index.html` |

Each route is **one** `index.html` inside a folder (that is how `/path/` clean URLs work on GitHub Pages).

Root files like `milestone.html` are **tiny redirects only** so old `/milestone.html` links still work. Edit the matching `milestone/index.html`, not the redirect stub.

Shared assets: `styles.css`, `script.js`, `assets/`.

## Deployment

Deploy from the `main` branch (`.nojekyll` keeps Pages from running Jekyll). GitHub Actions workflow `.github/workflows/pages.yml` publishes the repo root.

## Notes

This repository contains portfolio source code and visual assets. Please do not reuse the design, writing, or project materials without permission.
