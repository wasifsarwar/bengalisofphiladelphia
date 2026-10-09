# Figma visual references

These images are the current local visual references for website implementation.
They replace the older cream-background captures outside this repository.

| Image | Figma node | Current frame |
| --- | --- | --- |
| [Home desktop](images/home-desktop.png) | `7:46` | BOP / Upcoming events / Desktop v1 |
| [Home mobile](images/home-mobile.png) | `7:47` | BOP / Upcoming events / Mobile v1 |
| [Story desktop](images/our-story-desktop.png) | `114:211` | BOP FINAL |
| [Get involved desktop](images/get-involved-desktop.png) | `126:271` | BOP / Get involved / Desktop v1 |

See [manifest.json](manifest.json) for exact source links, individual capture times,
dimensions, and SHA-256 hashes. Filename roles stay stable even if collaborators
rename a frame. BOP FINAL currently displays an IRL Connections hero; the user has now confirmed that this frame maps to Our story.

## Refresh rule

When the user says the design has changed, refresh Figma and replace these images
before implementing the new UI. Use the same filenames and update the manifest.
Inspect each result for the right frame, full-page coverage, and current content.
Review meaningful differences and update design notes. Git records older versions;
do not create parallel reference sets. If the capture fails, keep the old file but
explicitly report it as stale instead of changing its capture timestamp.

## Capture limitations

The October 8, 2026 set consists of browser screenshot crops because native Figma
MCP exports were quota-limited and browser export downloads were unavailable.
These show overall layout, artwork, and colors; they are not full-resolution asset
exports. The mobile overview is especially narrow. Some Figma collaboration badges,
selection outlines, and cursor labels may remain: they are NOT website elements.
Use zoomed Figma inspection for exact text, fonts, dimensions, and contrast. Obtain
original assets for implementation rather than upscaling these screenshots.

Captures were taken sequentially while collaborators were editing, not as an atomic
Figma version snapshot. No separate mobile story/Get involved frames were identified.

## User-supplied Home detail references

The latest Home references are the four full-quality screenshots supplied by the
user: [hero](images/home-hero.png), [archive](images/home-archive.png),
[events](images/home-events.png), and [updates/footer](images/home-updates.png).
They take precedence over the older home-desktop overview for Home styling.
They were supplied directly, not newly downloaded from Figma. Their individual
capture times are unknown; receipt metadata and hashes are recorded in the manifest.

The files embed an HP Z30i monitor profile. Color analysis must convert that profile
to sRGB first: Home green #2F6755, red #C8122E, cream #FFF9EE, gold #E3BC53.
Do not copy collaborator markers, invisible CTA labels, or internal archive notes.
The existing Heylo links remain authoritative. The email signup requires a real
service before enabling it; the current demo uses a working Heylo updates CTA.

## User-supplied Get involved references

The updated Get involved overview and four section screenshots take precedence
over the previous capture. Source metadata is in the manifest. The standalone
852 x 1069 host flyer is saved as `public/images/social-host.png` and used directly.
The other screenshots remain references only. Dark teal and rust are scoped to
Get involved so the Home palette remains unchanged.
