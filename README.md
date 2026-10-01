# J.C. van Sas & Associates — "Draft Marks"

One-page site for J.C. van Sas & Associates B.V., marine surveyors and loss
adjusters, Rotterdam. This is the approved **V5** design direction, rebuilt as
a dependency-free static site.

## Deploy on Vercel

Import the repo. No build step, no framework.

| Setting | Value |
|---|---|
| Framework Preset | **Other** |
| Build Command | *(leave empty)* |
| Output Directory | `public` |
| Install Command | *(leave empty)* |

`vercel.json` already sets `cleanUrls`, so `/terms`, `/disclaimer` and
`/privacy` resolve without the `.html` extension.

## Local preview

```bash
npx serve public
# or
python3 -m http.server 8000 --directory public
```

## Structure

```
public/
  index.html      the one page, sections 00–08
  styles.css      design system, all tokens on :root
  app.js          rail, header, modal, reveals, forms
  terms.html
  disclaimer.html
  privacy.html
  img/            archive photography
vercel.json
```

## Design system

Palette "North Sea Haze", defined once on `:root` in `styles.css`.
No pure black, no pure white page ground, zero border radius sitewide.

| Token | Value | Use |
|---|---|---|
| `--haze` | `#edf0f1` | page ground |
| `--haze-2` | `#e1e6e8` | alternating section ground |
| `--steel` | `#c3ccd0` | every hairline |
| `--harbour` | `#1b2a31` | headings, header bar, About ground |
| `--slate` | `#46565f` | body prose |
| `--fog` | `#7c8b93` | eyebrows, captions |
| `--green` | `#00b068` | the waterline, nothing decorative |

**Green appears in five places only:** the rail fill and waterline, the focus
outline, the rule above the case finding and under the modal header, the
selection highlight, and the rail foot on hover. Nowhere else.

Type: **Source Serif 4** carries the voice (display and prose), **Archivo**
carries the instruments (numerals, eyebrows, captions, buttons, the rail).
Swap the display family in one place via `--font-display`.

## Content

All copy lives in `index.html`; the case study and the four section detail
panels live in `CASES` and `DEPTHS` at the top of `app.js`. Adding another case
is a new object in `CASES` plus a `data-case` plate row.

Copy under The Condition, The Chain, The Loss and The Risk is **draft**,
written to describe method only. It asserts nothing about any case, party, port
or figure, and is replaced by the client's own copy.

Telephone, email and company registration deliberately read "To be confirmed".

## Photography

Archive material, pending the client's final selection. Every photograph takes
the same grade (`grayscale(.88) contrast(.94) brightness(1.06)` plus a duotone
`mix-blend-mode: color` overlay and fine grain) and opens toward full colour on
hover. Nothing is ever overlaid on a photograph.

## Accessibility and motion

One `h1`, `h2` per section, no skipped levels. Visible focus everywhere, 44px
minimum hit areas, modal focus trapped and restored. `prefers-reduced-motion`
disables the loader, the curtain wipe, the ken burns, and every reveal.

## Note on the contact form

The form is present here as built in V5. The agreed final scope removes it, so
enquiries arrive as ordinary email. To remove it: delete the `<form>` in section
08 and in `#fplate`, and point the `[data-enquire]` buttons at a `mailto:` link.
