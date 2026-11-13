# Local browser inspection — November 13, 2026

Installed Microsoft Playwright MCP 0.0.85 in `.tools/mcp` and registered its
stdio command in `.codex/config.toml`. Verified a real SDK client connection,
tool discovery, browser-run-code calls, and saved screenshots from isolated
headless Chrome. Server clients were closed after inspection; the existing
Vite server remains running on 127.0.0.1:5174.

## Observed checks

- Desktop 1280 × 900: homepage rendered, no horizontal page overflow.
- Community gallery: six thumbnail controls; photo opening, 200% zoom with
  scrollable image area, fit reset, next photo, direct thumbnail selection passed.
- Escape closed the viewer and restored focus to the opening photo button.
- Archived October pumpkin-carving flyer loaded inside the dialog.
- Phone viewport 390 × 844: menu → Events, Past events, flyer, and 150% zoom worked.
- Reduced-motion emulation: gallery-panel computed animation was `none`.
- Gathering picker: selecting Games marked exactly one card selected.
- No JavaScript page errors were observed.
- Console reported a missing favicon (404); no app runtime error was recorded.

## Findings

1. Mobile horizontal overflow: viewport 390px, document scroll width 398px.
   `story-copy.scroll-reveal` is translated 28px right while offscreen, moving
   its right boundary to 398px. This is caused by existing reveal styling, not
   the event carousel. Fix by using only vertical translation on narrow screens
   or by clipping overflow at the appropriate decorative section boundary.
2. Missing favicon: the browser requests `/favicon.ico`, which returns 404.
   Supply an intentional branded favicon and explicit base-aware link.

## Visual evidence

`.local/playwright/desktop-home.png`, `desktop-gallery.png`, `mobile-home.png`,
`mobile-events.png`, `mobile-flyer.png`, and `mobile-gatherings.png`.
The final mobile-flyer capture was taken after the view transition completed;
an earlier capture caught the in-progress crossfade and was replaced. Animation
completion and static screenshots do not prove smoothness or a measured frame rate.

## Limits and dependency note

Only local Chrome desktop/mobile viewport emulation was exercised. Native touch
swipes, a real phone, Safari/Firefox, live GitHub Pages, and external RSVP flows
were not tested. This was installation and inspection; no application code was
changed to address findings.

The tooling-folder npm audit reports ten advisories in existing MCP tooling and
its transitive packages (including Context7). It did not list @playwright/mcp or
its Playwright packages as vulnerable. No automatic unrelated dependency upgrade
was performed; application dependencies were not changed by this installation.

## Follow-up fixes verified

Removed the gathering picker at the user's request. Fixed horizontal story-reveal
translation at phone/tablet widths and ribbon text overflow on 320px screens.
Rechecked 320/390/768/1280px in Playwright MCP: document width equals viewport width
in all cases. Added `public/favicon.svg`; the explicit icon path resolves to
`/bengalisofphiladelphia/favicon.svg` and returns HTTP 200. The source icon path
is `/favicon.svg` so Vite applies its deployment base once in development/build.
