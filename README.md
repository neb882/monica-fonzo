# Jennie Monica & Edith Fonzo

This folder is a complete, static GitHub Pages build. It does not require
Node.js, a build command, a framework, or a server.

## Deploy on GitHub Pages

1. Create a new GitHub repository, for example `monica-fonzo`.
2. Upload **the contents of this folder** to the repository root. Keep
   `index.html`, `styles.css`, `script.js`, `.nojekyll`, and the
   `archive` folder together.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder, then save.

GitHub will publish the site at a URL similar to:
`https://YOUR-USERNAME.github.io/monica-fonzo/`

All local paths are relative, so the site also works under a repository
subdirectory. The source and research links remain external.

## Package contents

- `index.html` — complete page markup and metadata
- `styles.css` — responsive, dark-theme, reduced-motion, and print styles
- `script.js` — theme, contents drawer, reading progress, filters, and sharing
- `archive/` — historical and case-geography imagery:
  - `wb-record-1927.webp` and `1927-wire-clip.jpg` — the two historical newspaper images
  - `monica-fonzo-case-geography.webp` — optimized map served by modern browsers
  - `monica-fonzo-case-geography.png` — full-quality fallback for the map

The case-geography figure scales to the mobile viewport and opens an archival-style zoom viewer. The viewer opens at a useful enlarged scale on phones and includes a visible zoom percentage, fit control, mouse/touch panning, pinch zoom, keyboard shortcuts, and a clearly labeled close action.
  - `archive/graves/` — three 2013 grave photographs (`jennie-monica-monument.jpg`,
    `jennie-monica-inscription.jpg`, `edith-fonzo-marker.jpg`)
  - `archive/records/` — two death-certificate copies
    (`jennie-monica-death-certificate.jpg`, `edith-fonzo-death-certificate.jpg`)
- `social-card.png` — 1200 × 630 social-sharing image
- `social-card-source.svg` — reproducible social-card source using the preserved portrait
- `QA-CHECKLIST.md` — factual, accessibility, print, responsive, and packaging checks
- `favicon.svg` — browser icon
- `.nojekyll` — tells GitHub Pages to serve the files without Jekyll processing

## Before each release

Work through `QA-CHECKLIST.md` and regenerate `social-card.png` from
`social-card-source.svg` if its source changes.

This folder **is** the deployable site — upload its contents directly. A ZIP may
be used as a transfer package, but `.nojekyll` and `index.html` must end up at the
repository root.

After the final public URL is known, replace relative canonical and social-image
metadata with absolute deployment URLs and add `og:url`.

## A note on the archival images

The five images in `archive/graves/` and `archive/records/` were supplied to this
project as copies from the two Find a Grave memorial pages. The grave photographs
are credited there to Elena Castrignano (added April 19, 2013); the two
death-certificate images are credited to Rich Stackhouse (added April 2, 2016).
**None of these copies was retrieved directly from a Pennsylvania archive**, and
the page says so wherever they are used. Pennsylvania's published death indices
independently establish the certificate numbers; the certificate images do not.
The two certificate images sit behind a content notice on the page because they
state, in clinical language, the injuries that killed both women. Their panels are
open by default, and either can be collapsed from its heading. Keep the notice and
the collapsible mechanism if the section is edited.
