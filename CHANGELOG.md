# CHANGELOG — quantumcolleagues-website

Newest first. One entry per change, written when the change is made.

This file did not exist before 29 July 2026. PD3 requires a changelog to be read
before any file is edited and updated after every individual change, so it starts
here. Everything before this date has to be read out of `git log`.

---

## 2026-07-29 — Admin Core page, operating model visual and three stale claims

Branch `feature/admin-core-model`, off `dev`. Not promoted. Not deployed.

### Added

- `admin-core-model.html` — the Human-AI operating model visual, copied from
  `OneDrive\Quantumcolleagues\website\_handover\admin-core-model.html` with no edit
  of any kind. 3,430,077 bytes,
  sha256 `f7c2d2e8431c6feef0d9ab0da7ff1450186abe73826532eb8ba9713c91e9c183`,
  identical to the handover file. Self-contained: Three.js, five fonts and nine
  images are all inlined as base64.
- `admin-core-model-poster.jpg` — a 1600x1000 still rendered from that file at
  1.5x and downscaled. 140 KiB. Served below 820px in place of the visual, and to
  anyone with JavaScript off.
- `admincore.html` — the visual embedded as the first section under the page
  header, with the approved eyebrow, headline, standfirst, three blocks and call
  to action.

### Changed, the three fixes required with this change

1. **"Pilots Q3 2026" removed.** It sat in two places: the page subtitle
   (`SME Assist — Pilots Q3 2026`) and the eyebrow above the sign-up form
   (`Pilots opening Q3 2026`). Both are gone. Admin Core is live with clients,
   Jonathan's ruling of 26 July 2026. The sign-up heading now reads
   "Talk to us about Admin Core."
2. **"Rotas" removed as a capability.** The `Rotas & scheduling` feature item is
   gone and `Dashboards & reporting` becomes `Dashboards & coordination`, which is
   the replacement Jonathan set on 24 June 2026. The `ROTAS` row in the sample
   dashboard is now a `CORRESPONDENCE` row. Rostering is not in the product design.
3. **The premises claim is split by delivery model.** It was stated
   unconditionally, which is true of the Appliance and false of Managed. Every
   place it appeared has been scoped:
   - the lede, replaced wholesale by the approved standfirst;
   - `On-premises by design` / `Runs on your own hardware` → `Auditable by design`
     / "Take it Managed by us, or as an Appliance on your own hardware";
   - the audit strip → "On the Appliance your data never leaves your premises. On
     Managed it is processed in our private inference environment in the UK or EU";
   - "A sample of the back-office view — real-time, on your infrastructure" →
     "in real time";
   - "Admin Core runs on your hardware. That's not a compromise — it's the point"
     → "Two delivery models... The steps below describe the Appliance";
   - the regulated-sectors column and the social image alt text, same treatment.
   The `HOW IT DEPLOYS` steps still describe the Appliance journey only. They are
   now labelled as such rather than rewritten.

### Changed, not asked for, and why

- **A static poster below 820px.** The brief said the file switches its own layout
  under about 820px and told me to check rather than assume. It does not. Its only
  media query is `max-width: 860px` and it adjusts type, not the scene. At 390px
  the labels collide into unreadable text at every aspect ratio tried, 16:10, 1:1,
  3:4 and 9:16. Phones now get the still, which carries the same message, and
  desktop keeps the exact file. Reverting this is three blocks: the `<img>`, the
  `.ac-model-poster` CSS, and the poster file.
- **The 3.4MB fetch is deferred by IntersectionObserver, not by `loading="lazy"`.**
  Lazy alone did neither of the two things wanted: Chrome fetches a lazy iframe
  that is `display:none`, so phones downloaded 3.4MB to show a 140 KiB poster, and
  its distance threshold is wide enough that a section this high on the page always
  qualifies. The iframe now carries `data-src` and the observer sets `src` on
  first intersection, armed after `load` and two frames so a deep link such as
  `#pilot` has finished scrolling. A `<noscript>` block shows the poster instead.
- **The iframe's display moved out of its `style` attribute.** The supplied snippet
  carried `display:block` inline, which beats a stylesheet rule, so the 820px rule
  above never won and phones rendered an empty 214px navy box under the poster.
  Width, aspect ratio and border moved to `.ac-model-frame` with it.
- **The poster links to itself,** with a "tap to enlarge" label, so a phone reader
  can open and pinch-zoom it. At 342px wide the labels inside the still are small.
  A purpose-made portrait poster would read better and only the design chat can
  lay one out. The three text blocks carry the message meanwhile.
- **A pre-existing mobile overflow fixed.** At 390px the page had a horizontal
  scroll of 510px against a 390px viewport, caused by the fixed-width
  `Register interest` button in the sign-up form. This is on `main` today and is
  not caused by this change; it was found while checking the phone layout. The
  form now stacks below 768px.

### Lighthouse, measured, not estimated

Localhost, headless Chromium 1194, same machine both sides. No network latency, so
these numbers understate the real cost of 3.4MB on a mobile connection.

| | before | after | delta |
|---|---|---|---|
| Desktop performance | 90 | 90 | 0 |
| Desktop accessibility | 91 | 94 | +3 |
| Desktop page weight | 50 KiB | 3,550 KiB | 71x |
| Desktop time to interactive | 0.5 s | 3.7 s | +3.2 s |
| Mobile performance | 88 | 85 | -3 |
| Mobile accessibility | 91 | 94 | +3 |
| Mobile page weight | 50 KiB | 200 KiB | 4x |
| Mobile largest contentful paint | 2.0 s | 2.7 s | +0.7 s |

The desktop performance score does not move, but the page weight does, by 71
times. On a real 4G connection 3.4MB is several seconds of download before the
visual appears. That is the honest cost of shipping the exact file, and it was
accepted knowingly.

### Verifier

`verify.sh` plus `browser_checks.mjs`, written before the build. Every check that
this environment can run passes. Firefox and Safari were not run: there is no
Gecko or WebKit build available here, so those two need a pass on a real machine.

### Provenance of the photograph, settled

The office and the five people in the visual come from
`Gemini_Generated_Image_2s0iqw2s0iqw2s0i.png` in
`Marketing & Outreach\Instagram June 2026\Carousels`, the master behind carousel
slide `5 - Admin Core (Team)\Slide1.png`. It is Google Gemini generated, not
Pexels. The Gemini sparkle watermark sits at the bottom right of the master and is
cropped out of every derived asset, including the poster. **No new credit line is
needed on the page.** The existing footer credit stays, because it covers the
Pexels faces ribbon, which is a different asset.
