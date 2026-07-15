# Amrit Pal Singh - Premium Portfolio

A customized Angular + Tailwind CSS portfolio for Amrit Pal Singh, adapted from the premium dark/gold Portfolio 1 design.

## Included

- Cinematic hero, About, Skills, Projects, Experience, Achievements, Documents, Contact, and Footer sections
- Updated professional profile photo supplied in the latest chat
- Project screenshots for HireFlow, InsightFlow, SignalOps, and MiniMunch
- Resume and cover letter available as both PDF and DOCX assets
- Resume/cover-letter preview cards visible inside the portfolio UI
- Portfolio data centralized in `src/app/core/data/portfolio.data.ts`

## Run locally

```bash
npm install
npm start
```

Then open the local Angular URL shown in the terminal.

## Build

```bash
npm run build
```

The production build will be generated in `dist/portfolio`.

## Main files to edit

- `src/app/core/data/portfolio.data.ts` - personal info, skills, projects, experience, metrics, document links
- `src/assets/images/` - profile and project images
- `src/assets/doc-previews/` - resume and cover-letter preview thumbnails
- `src/assets/AmritPalSingh_Resume_v2.pdf` - resume PDF shown in the portfolio
- `src/assets/AmritPalSingh_Cover_Letter_v2.pdf` - cover-letter PDF shown in the portfolio
- `src/index.html` - page title and SEO metadata
