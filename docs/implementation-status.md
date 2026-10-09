# First implementation

## Implemented

- Home with the community introduction, Instagram/community photo empty state,
  three explicitly proposed event cards, and working category filters.
- Our story from the BOP FINAL frame, following the user’s final clarification.
- Get involved with the host poster, supplied Google Form, Heylo, Instagram,
  email links, and a suggestion email subject.
- Shared desktop/mobile navigation, active-page indication, Escape-to-close mobile
  menu, skip link, route focus management, unknown-route recovery, local fonts.
- Hash routes support direct-link refreshes on GitHub Pages. Existing workflow
  deploys on main. No third-party email subscription service is configured.

## Visual and content limitations

Figma MCP is quota-limited. The native UI export previews were available, but native
full-resolution downloads and clipboard SVG export did not succeed. These previews
are actual Figma artwork exports, not redraws, but are visibly soft when enlarged:

| Local file | Figma node | Export pixels |
| --- | --- | --- |
| public/images/cha.png | 10:144 | 189 x 94 |
| public/images/walk.png | 10:157 | 189 x 94 |
| public/images/games.png | 10:165 | 189 x 94 |
| public/images/social-host.png | 141:472 | 142 x 189 |

Replace these with full-resolution originals under the same names when available.
The logo is the original user-supplied JPEG, 1290 x 1281. Font licenses are in
public/licenses. The saved frame screenshots remain design references only and are
not used as page backgrounds or implementation assets.

The live Story frame was being edited during inspection: its hero cha graphic
changed to blue with cream strokes and its title font changed. The implementation
currently uses the gold cha artwork from the saved Story reference. Reconcile that
specific slot after the design update is settled and its native asset is available.

Community photos have not been supplied. Compact, clearly worded empty states
replace editorial upload instructions; they do not pretend to be event photos.
Story's two photo slots currently use text cards. The Home archive grid now follows the user-supplied detail screenshots, with
public-facing empty-state text instead of editorial instructions. These are
intentional demo deviations.
Unconfirmed October/sample dates and venue/pricing claims are not published.
Register on Heylo buttons lead to the community, not a fabricated event page.
Red body text was lightened for contrast. Exact Figma font metrics remain to verify.

## Validation

- Strict TypeScript and Vite production build passed.
- Browser checked at desktop widths and in real 390px and 320px iframe viewports.
  All three pages fit without horizontal overflow at both phone widths.
- Mobile menu opens/closes, Escape closes it, category filters reduce/reset cards,
  route changes focus main content, and Story links into Get involved.
- Direct hash route refresh, active navigation, and unknown-route recovery checked.
- Supplied social-host URL and registration/Instagram/email destinations checked.
- Local image files decoded and inspected; known resolution limitation above.
- No em dashes or “chai” in UI source. No signup success claim or invented event date.

Browser instrumentation emitted MutationObserver errors; the application does not
use MutationObserver. The tested interactions rendered and completed successfully.


## Home reference refinement

Home styling now follows the four user-supplied section screenshots, including the
color-profile-corrected green/red palette, condensed Bebas Neue headings, archive
card/mosaic layout, hero measure, featured event treatment, and updates/footer bands.
The event heading stays “Upcoming events” because no October schedule is confirmed;
calendar actions retain the user-requested Heylo labels. Existing category filters
remain functional. Updates still use Heylo rather than an unconnected email form.
The original artwork export previews remain low resolution; the screenshots are
stored as references, not used as page backgrounds or cropped implementation assets.
