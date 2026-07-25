# Release QA checklist

Run this checklist after every factual, editorial, visual, or interaction change. Record any intentional exception with the release notes.

## 1. Historical and editorial guardrails

- [ ] The Chrysler account says Carmel Maranca **reported** the car stolen about an hour before the bodies were found; it does not assign that interval to the alleged theft.
- [ ] The “stolen” and “loaned” accounts remain separate and attributed.
- [ ] Samuel Marranca and John Falcone are described only as suspects; neither is called a killer.
- [ ] Carmel Marletti’s proceeding is identified as an accessory-after-the-fact trial, not a murder trial.
- [ ] Every negative legal conclusion is scoped to the reviewed public sources. Any headline or deck shorthand is supported on the page by the full, dated statement that no murder trial or conviction was located through the current research date.
- [ ] The barber account remains attributed newspaper hearsay, not an authenticated confession.
- [ ] Clothing evidence is not converted into a sexual-assault or motive finding.
- [ ] Burial at St. Mary’s on June 4, 1927 is attributed to the two certificate copies. No cemetery register, plot identifier, or grave coordinates are claimed.
- [ ] Jennie Monica’s inscription is treated as historical memorial language, not a forensic conclusion or the site’s moral judgment.
- [ ] The death-index entries are not used to infer event sequence from consecutive certificate numbers.
- [ ] Sensitive scene details remain restrained. Details visible only in later reporting are still separated from what the certificate copies themselves state.
- [ ] The sister’s testimony is presented as a later account of what a witness said in 1927, not as a transcript, and is not used to place anyone at the scene of the killings.
- [ ] Jennie and Edith remain the narrative center; collateral suspicion does not become proof.

### Archival image provenance (added with the memorial section)

- [ ] All five grave and certificate images are described as user-supplied copies from the relevant Find a Grave memorial pages. Nothing implies they were retrieved directly from a Pennsylvania archive.
- [ ] Grave photographs are credited to Elena Castrignano, added April 19, 2013; the two Jennie Monica photographs are additionally noted as carrying an April 18 camera date stamp.
- [ ] Both certificate images are credited to Rich Stackhouse, added April 2, 2016.
- [ ] The provenance caveat survives intact: Pennsylvania’s published indices independently establish the certificate numbers, while these full certificate images arrived through Find a Grave.
- [ ] The certificate-number discrepancy is stated, not smoothed: the indices are cited for **63094** and **63095**, the images are stamped **62094** and **62095**, and the site records the conflict without resolving it. This appears in section 01, in section 08, and in the footers of claims 01, 02, and 09.
- [ ] Jennie Monica’s birth date is presented as a conflict between two months, with no date chosen: the marker and Find a Grave both give **June 29, 1907**, and the certificate copy gives **July 29, 1907**.
- [ ] The marker is described as legible. It reads BORN JUNE 29 1907 above DIED JUNE 2 1927, and nothing on the page calls the final digit of the birth year unclear.
- [ ] The certificate age arithmetic (19 years, 10 months) is offered as pointing the same way as its July entry, never as decisive, and notes that her father supplied the information two days after her death.
- [ ] Edith Fonzo’s marker is described as reading 1908–1927 only; her certificate copy’s blank birth-date field and age of 19 years, 5 months are stated as such.
- [ ] The mothers’ maiden names (Rose Finno, Lena Fino) are offered as an observation about the documents, not as a proven cousin relationship.
- [ ] Both certificate images sit inside `details` panels that are **open by default**, behind a content notice about clinical descriptions of fatal injuries. The notice tells the reader the images are shown and that either panel can be collapsed. Summaries outside the panels stay non-graphic.

### Case-geography map accuracy

The map is the only image on this site that is **not** an archival source. It is an illustration made for the project, so its factual content is the project's responsibility, not a source's.

It is an **SVG plotted from coordinates**, not a generated raster. Positions are computed, so they can be re-verified arithmetically rather than by eye, and the projection is documented in a comment above the regional-map group.

- [ ] The caption, the dialog, and the plate's own footer all state that the map is an illustration created for this site in 2026 and is not a period document. Nothing anywhere describes it as a plate, a document, or an archival item.
- [ ] Place order west to east is **Wilkes-Barre → Plains → Pittston → Inkerman → Old Boston → Moosic**. Rocky Glen's marker is at 41°21.25′N, 75°42.50′W, east *and* north of both Pittston and Inkerman.
- [ ] Plotted separations stay within about 1% of great-circle distance. Wilkes-Barre to Pittston ≈ 7.3 mi, to Old Boston ≈ 8.5 mi, to Rocky Glen ≈ 11.7 mi.
- [ ] The scale bar matches the projection: 1 mile = 72.8 px in viewBox units, so the 5-mile bar is 364 px.
- [ ] Marker semantics match the legend. **Filled dot = documented address** (the two homes only). **Hollow ring = reported location** (Pittston, Moosic). **Hatched shape = approximate area with no point established** (Old Boston). No filled dot may sit on a place whose caption calls it reported.
- [ ] The discovery area carries no point marker at all, because the exact spot is not established.
- [ ] No street layout is drawn in the Wilkes-Barre inset, and no street name appears anywhere except in the two address callouts, which quote the death certificates.
- [ ] No highway shields. They are anachronistic for 1927 and were a recurring source of error.
- [ ] Rocky Glen and the Inkerman drive are **not joined by a line**, and the note saying they are separate days is present.
- [ ] All map text is real SVG text, not paths — select it or search the page to confirm.

## 2. Static structure and assets

- [ ] The page has exactly one `h1`, no duplicate IDs, and no skipped heading levels.
- [ ] Every internal fragment link resolves to an existing ID.
- [ ] Every referenced local file exists with matching letter case.
- [ ] All image assets and `social-card.png` load: two newspaper images, `monica-fonzo-case-geography.svg`, three images in `archive/graves/`, and two in `archive/records/`.
- [ ] Images retain meaningful alternative text and explicit dimensions. The case-geography map alt text summarizes its documented, reported, and approximate locations; grave alt text describes the carving and its wording; certificate alt text describes the document and defers to the transcription list rather than reciting injuries.
- [ ] **No image is stretched at any width.** Because every `img` carries `width` and `height` attributes, browsers apply a presentational hint of `height: <n>px`; any rule that sets a CSS width without also setting `height` will stretch the image to that literal attribute height. The global `img` rule declares `height: auto` to prevent this. Check by comparing each image's rendered box ratio against `naturalWidth / naturalHeight` at 375 px, 768 px, and desktop — allowing for `object-fit: contain` on the archive thumbnails, where the box is square by design and the painted image is letterboxed.
- [ ] Every grave and certificate image links to its full-size local file, and each link opens in a new tab with `rel="noopener noreferrer"`.
- [ ] The contents drawer lists six destinations, including **03 Graves & records** pointing at `#memorials`, and the numbering runs 01–06 in document order.
- [ ] `social-card.png` is exactly 1200 × 630 pixels and was regenerated from `social-card-source.svg` without altering the archival portrait.
- [ ] External links that open a new tab include `rel="noopener noreferrer"`.
- [ ] The complete newspaper scan can be opened from its figure caption.

## 3. Keyboard and assistive-technology behavior

- [ ] “Skip to the story” becomes visible on focus, moves focus to the main content, and scrolls correctly.
- [ ] The initially hidden top-bar brand is not a keyboard stop; it becomes available only after it is visible.
- [ ] The Contents button exposes the drawer, moves focus to Close, and reports its expanded state.
- [ ] Focus remains trapped within the open drawer; `Escape`, Close, and the backdrop return focus to Contents.
- [ ] Choosing a drawer destination closes the drawer and moves focus to the selected section.
- [ ] The drawer remains scrollable at 200% and 400% zoom and in a short landscape viewport.
- [ ] Theme, filter, copy-link, print, source, and back-to-top controls all have visible focus.
- [ ] Each certificate `details` summary is reachable by Tab, toggles with Enter and Space, and shows a visible focus ring against the dark memorial background.
- [ ] Every grave and certificate image link is reachable by Tab and shows a visible focus ring.
- [ ] The page title is announced as “Jennie Monica & Edith Fonzo,” including the conjunction.

## 4. Claims, themes, and responsive layout

- [ ] The timeline lists seven events, including **June 4, 1927 — Burial at St. Mary’s**.
- [ ] Initial status reads “Showing 14 of 14 claims.”
- [ ] Official shows 4 claims (01, 02, 09, 12); 1927 reporting shows 2; Later reporting shows 6; Unresolved shows 2.
- [ ] Returning to All claims restores all 14 cards.
- [ ] The source list ends at **09 Find a Grave: Edith Fonzo**.
- [ ] Light and dark themes render without unreadable muted, accent, label, or active-filter text. In dark theme the memorial section keeps a visible edge against the surrounding page.
- [ ] Grave photographs are letterboxed rather than cropped: no inscription, cross, or carved date is cut off at any width.
- [ ] The date-conflict panel, record panels, and fact lists reflow to one column on narrow screens without horizontal scrolling.
- [ ] The case-geography map fills the available desktop width. On mobile it scales to the viewport, exposes an obvious “Open zoomable map” affordance, and opens an archival-style dialog at an enlarged mobile starting scale, with working plus/minus/fit controls, zoom readout, drag-to-pan, pinch zoom, keyboard zoom shortcuts, backdrop/Escape dismissal, and focus restoration.
- [ ] No label or supporting text is smaller than 0.75rem.
- [ ] Theme preference persists after reload when storage is available.
- [ ] Layout remains usable at approximately 375 px, 768 px, and desktop width.
- [ ] Layout remains readable at 200% and 400% zoom without obscured drawer content or horizontal page scrolling.
- [ ] Reduced-motion mode removes nonessential transitions and smooth behavior.

## 5. Print and source transparency

- [ ] After selecting any claim filter, print preview still contains all 14 claims.
- [ ] Memorial and closing sections print as dark text on white even when background graphics are disabled. This includes the grave gallery, captions, credits, date-conflict panel, record panels, and caveat list.
- [ ] The case-geography map scales to the printable width without horizontal clipping or retaining its screen-only zoom affordances.
- [ ] Grave photographs print at a readable size, three across, without splitting a figure across pages.
- [ ] Both panels are open by default, so both print in full by default. If a reader collapses one, it prints collapsed with the substitute line “Panel collapsed on screen; certificate image not printed.” This is intentional: printing follows the reader’s disclosure choice.
- [ ] Claim cards do not retain a forced 19rem print height.
- [ ] Source URLs appear in print and do not overlap neighboring text.
- [ ] The full archival clipping is available through its direct local link even if the designed figure remains cropped.
- [ ] Every external source link is opened and checked for the expected record; access barriers are noted rather than treated as proof that a source is missing.

## 6. Release

This folder is the deliverable. No ZIP is built or maintained.

- [ ] The folder contains `.nojekyll`, `archive/` with its map files plus `graves/` and `records/` subfolders, `index.html`, `styles.css`, `script.js`, `favicon.svg`, `social-card.png`, `social-card-source.svg`, `README.md`, and `QA-CHECKLIST.md`.
- [ ] Uploading the **contents** of this folder — not the folder itself — puts `.nojekyll` and `index.html` at the repository root.
- [ ] All internal paths are relative and resolve from a repository subpath.
- [ ] The public deployment has an absolute canonical URL, `og:url`, and absolute social-image URL appropriate to that deployment.
- [ ] The deployed page receives one final desktop, mobile, keyboard, print-preview, and social-preview check.
