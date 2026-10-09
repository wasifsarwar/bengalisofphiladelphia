# Current design reference

Observed directly in the collaborative Figma board on October 8, 2026. These are
snapshot observations, not an assertion of who authored each edit or final approval.
The board is actively changing; recheck relevant frames before implementation.

The latest captured appearance is in [design/images](design/images), with timestamps
in [design/manifest.json](design/manifest.json). Prefer those images over the earlier
observations below where they differ. At capture time, BOP FINAL's hero had changed
to IRL Connections, with blue/gold details and gold media placeholders. Follow the
[refresh rule](design/README.md) whenever the user reports an update.

## Frames

- [Home / desktop](https://www.figma.com/design/Q33Aeo2EJfi1eTvloKRFpr/BOP-Website-Spec?node-id=7-46)
- [Home / mobile](https://www.figma.com/design/Q33Aeo2EJfi1eTvloKRFpr/BOP-Website-Spec?node-id=7-47)
- [BOP FINAL, formerly Our story desktop](https://www.figma.com/design/Q33Aeo2EJfi1eTvloKRFpr/BOP-Website-Spec?node-id=114-211)
- [Get involved / desktop](https://www.figma.com/design/Q33Aeo2EJfi1eTvloKRFpr/BOP-Website-Spec?node-id=126-271)

## Changes since the earlier cream-background drafts

- Dark green and near-black surfaces; rust-red and gold accents; cream text/cards.
- Checkerboard and square-pattern separators. Some headings changed from condensed
  type to broader bold lettering. Exact fonts and tokens still require inspection.
- Home: green hero, dark IRL Connections archive with additional image placeholders,
  an October Calendar section, illustrative event cards, and red email-updates panel.
- Mobile home: social-host flyer above introduction, dark styling and stacked archive
  and event sections. Do not assume parity with desktop without checking.
- BOP FINAL still contains Our story content: split introduction with cha artwork,
  video/photo placeholders, followed by the community story and activity cards.
- Get involved: large social-host flyer beside the intro; Heylo section; suggestion,
  social-host and new community/belonging cards; email and Instagram contact area.

## Implementation concerns to resolve

- User confirmed BOP FINAL is Our story. Keep node 7:46 as Home / upcoming events.
- Obtain original flyer, logo and photos instead of recreating them from screenshots.
- Some red headings and muted body text appear low contrast on dark backgrounds;
  measure actual colors during implementation and preserve readability.
- Archive/editorial placeholders remain. Event cards still contain unconfirmed dates
  and venues. Do not publish imaginary events or upload instructions as public copy.
- Legacy calendar wording remains. User prefers Join on Heylo and Register on Heylo.
- Navigation and signup designs do not prove working page routes or email services.

## Destinations supplied by the user

- Heylo: https://heylo.group/bengalis-of-philadelphia
- Instagram: https://www.instagram.com/bengalisofphiladelphia/
- Email: bengalisofphiladelphia@gmail.com
- Social host: https://docs.google.com/forms/d/e/1FAIpQLSdLrWrejnLScqwjB4nMd3p_Kek9Mv03RlcPOIG63d0_fOUkpQ/viewform

## Tool availability at setup

Figma MCP quota was exhausted earlier; latest review used the browser UI. Serena,
Context7 and Memory tools were not exposed at initial setup. Subsequently, at the
user's request, all three were installed/configured locally and startup-tested.
See README.md for activation and scope. Use native fallbacks until they are exposed
to the running task; do not claim installed tools are already callable in chat.
