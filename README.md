# Subin Jo Portfolio

Personal portfolio website for Subin Jo, designed and built as a static site.

Live site: [subinjo.com](https://subinjo.com)

## Pages

- `/` - Home and selected work
- `/about-me.html` - About page
- `/identifit.html` - Identifit case study
- `/milestone.html` - Milestone Seed case study
- `/ea-games.html` - EA Games case study preview

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

This is a **static** site (no build step). Each page is one HTML file next to `index.html`:

| Public URL | Source file |
| --- | --- |
| `/` | `index.html` |
| `/about-me.html` | `about-me.html` |
| `/ea-games.html` | `ea-games.html` |
| `/identifit.html` | `identifit.html` |
| `/milestone.html` | `milestone.html` |
| `/resume.html` | `resume.html` |

`404.html` sends old folder addresses such as `/identifit/` to the matching file. Shared assets stay in `styles.css`, `script.js`, and `assets/`.

## Deployment

Deploy from the `main` branch (`.nojekyll` keeps Pages from running Jekyll). GitHub Actions workflow `.github/workflows/pages.yml` publishes the repo root.

## Notes

This repository contains portfolio source code and visual assets. Please do not reuse the design, writing, or project materials without permission.
