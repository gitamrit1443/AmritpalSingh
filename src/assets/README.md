# /src/assets

Angular CLI copies this entire folder into the build output as `/assets/`.

## Included files

| File | Purpose |
|---|---|
| images/ProfilePic.png | Updated profile photo used in the About section |
| images/HireFlow.png | HireFlow project screenshot |
| images/InsightFlow.png | InsightFlow project screenshot |
| images/SignalOps.png | SignalOps project screenshot |
| images/MiniMunch.png | MiniMunch project screenshot |
| AmritPalSingh_Resume_v2.pdf | Resume PDF opened from navbar, hero, About, and Contact |
| AmritPalSingh_Resume_v2.docx | Downloadable resume source file |
| AmritPalSingh_Cover_Letter_v2.pdf | Cover letter PDF opened from the portfolio |
| AmritPalSingh_Cover_Letter_v2.docx | Downloadable cover-letter source file |
| doc-previews/resume-preview.png | Resume thumbnail shown in document cards |
| doc-previews/cover-letter-preview.png | Cover-letter thumbnail shown in document cards |

If you rename any file, update the corresponding path in `src/app/core/data/portfolio.data.ts` and relevant component templates.
