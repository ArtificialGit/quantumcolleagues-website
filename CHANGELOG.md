# CHANGELOG — quantumcolleagues-website

Newest first. One entry per change, written when the change is made.

This file did not exist before 29 July 2026. PD3 requires a changelog to be read
before any file is edited and updated after every individual change, so it starts
here. Everything before this date has to be read out of `git log`.

---

## 2026-07-30 — Remove the Pexels API key from the browser

Branch `feature/pexels-key-removal`, off `dev`.

### The problem

`qc-faces.js` held a live Pexels API key in plain text. It was committed in
`ddd0168` and loaded by ten pages. Rotating it would not have fixed anything: the
script runs in the visitor's browser, the browser has to send the key to Pexels
itself, so any key in that file is readable from the network tab whether or not it
sits in the repository. A replacement key would have been public the day it shipped.

Quota at the time of the change was 25,000 requests a month with 24,955 unused, so
nothing had been abused. The exposure was the allowance and the account, not data.

### The fix

The API call is gone from the browser. The pool of 449 photographs was captured once
from the same sixteen queries the engine used to run, and is now held in the file as
a compact list. Photographs are still served from the Pexels CDN exactly as before
and the "Photos: Pexels" credit is untouched.

Encoding: a bare number means `/photos/<n>/pexels-photo-<n>.jpeg`, a string of the
form `<n>.png` means the same path with that extension, and a string containing a
slash is a literal path after `/photos/`. Reconstruction was checked against the
captured set and rebuilds all 449 URLs exactly, none missing and none extra.

`localStorage` caching went with it, because there is nothing left to cache.

### What changed for a visitor

Sixteen API calls per page became zero. The mosaic behaves identically: same tile
size, same brand colours, same fade in, same shuffle. The file grew from 4,484 to
8,162 bytes, which is a fair trade for removing sixteen network round trips on every
page load.

### Verified

All ten pages that load the script were rendered before and after in headless
Chromium. Before: 16 calls to `api.pexels.com` per page. After: none, and every tile
receives an image. The one console error present is a blocked
`fonts.googleapis.com` request, which appears identically before and after and is an
artefact of the build environment.

`images.pexels.com` is not reachable from the build container's browser, so the
faces could not be seen there. The URL list was therefore proved on a real network
instead: forty entries drawn at random from the pool, rebuilt with the same function
the shipped file uses, all forty loaded at 220x220.

### Still to do, and it is Jonathan's

The old key is still valid until he revokes it in his Pexels account. Nothing breaks
when he does, because the site no longer calls the API. The key also remains in git
history at `ddd0168`; once revoked that is a dead string and rewriting the history of
a public repository is not worth the disruption.

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

### Changed on Jonathan's ruling, 29 July 2026, before promotion

The sign-up block still carried the stale pilots claim in other words. It said the
product was being piloted "before wider release" and that there was "No cost to
pilot". Both contradict Admin Core being live with clients, and the free offer
contradicts the record, which says the founder cohort rate is paid and has never
been given a figure. Replaced with copy that says the product is running with
clients, makes no price claim and makes no free claim. The button reads "Get in
touch" and the confirmation no longer refers to pilots opening.

The form's `_subject` is left as "Admin Core pilot interest" deliberately. Jonathan
triages the information@ inbox on that string and changing it would break what he
already recognises. It is internal and never seen by a visitor.

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
