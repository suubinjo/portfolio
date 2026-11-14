# Subin Jo Portfolio

Personal portfolio website for Subin Jo, designed and built as a static site.

Live site: [subinjo.com](https://subinjo.com)

## Pages

- `/` - Home and selected work
- `/about-me/` - About page
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

The repo keeps each page as one file. Publishing copies About and the case studies into folders so the live URL has no `.html`:

| Public URL | Source file |
| --- | --- |
| `/` | `index.html` |
| `/about-me/` | `about-me.html` |
| `/ea-games/` | `ea-games.html` |
| `/identifit/` | `identifit.html` |
| `/milestone/` | `milestone.html` |
| `/resume.html` | `resume.html` |

`404.html` sends an old `.html` address, such as `/identifit.html`, to the clean URL. Shared assets stay in `styles.css`, `script.js`, and `assets/`.

## Deployment

Deploy from the `main` branch (`.nojekyll` keeps Pages from running Jekyll). `.github/workflows/pages.yml` builds those clean URLs and publishes the site. That workflow is what updates subinjo.com, so it stays in the repo.

## Notes

This repository contains portfolio source code and visual assets. Please do not reuse the design, writing, or project materials without permission.
