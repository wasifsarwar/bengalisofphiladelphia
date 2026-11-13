# Current homepage

This is the approved Bengalis of Philadelphia website, promoted from the desktop
concept. The former multipage design is retired and remains available only in
Git history. There is one React application and one stylesheet, serving three static page URLs.
Home keeps the hero, Our Story, participation, and join sections, with links to Events and Photos.
Events (`events/`) holds the full event controls. Photos
(`photos/`) holds the interactive album. Shared navigation uses real links and
normal browser history. The build generates HTML for each destination.

## Visual direction

Use warm cream (#f8f3e9), Bengali red (#982c36), wine (#802a32), forest green
(#203f36), and dark ink (#3d3931). Cormorant Garamond supplies display typography;
DM Sans handles body text and navigation. Fonts are served locally.

The homepage flows from a large introduction and overlapping photo prints to a
community ribbon, introduction, album link, participation links, and a final
join invitation. Preserve this design when making routine edits.

## Photos

`PhotoSpace` handles both real photos and intentional placeholders. Community
image filenames are resolved beneath `public/images/community/` using Vite's
configured base path. Supply descriptive alternative text for each real image. Below-fold photos load
lazily with asynchronous decoding; the hero pair loads eagerly.

- Rear hero frame: `BOP_Hike.png`.
- Front hero frame: `BOP_Game_Night.png`, with a matching square frame; the full original is available in the viewer.
- Story frame: `BOP_Craft_Event.png`, preserving the full group.
- Games gathering frame: `BOP_Bhoot_Game.png`, shown uncropped.
- Cha and adda frame: `BOP_Cat_Event.png`.
- Outdoors gathering frame: `BOP_Bok_Bar.png`.

Original BOP logo and social-host artwork are retained as source assets. Additional
community uploads should not be removed or automatically placed without direction.

## Content and behavior

BOP is rooted in Bangladesh and welcomes honorary Bengalis. Spell cha, never chai.
Use plain, friendly copy. Keep proposed activities distinct from confirmed events;
do not invent dates, venues, testimonials, organizers, or attendance numbers.

Shared Heylo, Instagram, email, and host application URLs are maintained in
`src/data/content.ts`. The mobile menu supports Escape, expanded-state reporting,
and closing after navigation. Focus styling and reduced-motion preferences are
supported. The former `concept.html` URL redirects to the main page.

## Motion

Use CSS motion only while `prefers-reduced-motion: no-preference` is active.
The opening text enters once over 950 ms. Hero photo prints settle into their
collage over 700 ms, with the front print following after 140 ms. Fine-pointer
hover gently straightens and lifts each print. Gathering captions and descriptions
follow their photos by 90–150 ms; sibling stagger is removed on phones. Buttons, link arrows,
and navigation underlines provide short interaction feedback; the phone menu
enters over 200 ms. Keep the existing smooth anchor scrolling. Reduced-motion
preferences disable animation, transitions, and smooth scrolling, including
pseudo-elements. Content remains visible without animation support.

Story, gathering, participation, and join groups reveal when entering view from either direction,
using IntersectionObserver with cleanup and live reduced-motion preference handling.
Groups reset only after moving fully offscreen, with an 80px buffer to prevent edge flicker.
Content already visible on load stays visible. Keyboard focus reveals pending content.
Do not add looping motion or an animation dependency for these effects.

## Nakshi kantha-inspired refinement

Approved direction: retain the light background, English copy, community photos,
and page structure. Deep green (#155442) leads headings; red (#b02e3c) highlights
calls to action and thread accents. The community ribbon is light with paired
running-stitch borders and red geometric floral rosettes. The story photo has a
white Polaroid-style surround with a soft shadow and caption, without an overlay label; the closing invitation uses restrained thread borders.
These are contemporary embroidery-inspired details, not reproductions of a
specific historic textile. The hero’s circular belonging badge has been removed.

## Photo gallery

All six community images open a native modal dialog. Full photos use contain
fitting, with captions, previous/next buttons, keyboard arrows, Escape dismissal,
and horizontal touch swipes. Closing restores the opening button’s focus and
page scrolling. Gallery metadata lives in `src/data/gallery.ts`.

### Decision feedback motion

Event-history selection moves a shared green selection surface over 240 ms.
Headings/empty states confirm a view change with a brief fade. Gallery opening
uses a 260 ms print-settling transition and a 180 ms backdrop fade. Loaded photos
enter by 16px in the browsing direction over 220 ms. Single-photo viewers do not
advance. Reduced-motion users receive immediate state changes; controls remain
available throughout. No additional library or continuous animation is used.

## Interactive album pass

The hero retains its original scattered Polaroid layout. The arrangement control
and its state-dependent transforms have been removed. Photos still open the gallery.

The shared viewer has 100–300% zoom in 50% steps and Fit photo reset. When zoomed,
scrollbars, native touch panning, keyboard scrolling in the focused image area,
and mouse drag pan explore details. Photo navigation returns to fit mode. Arrows
and swipes change photos only at fit size. A thumbnail filmstrip offers direct
selection, with visible pressed state. Single-flyer galleries omit thumbnails.

Event dates use a ticket-like date block; past events say From the album and
upcoming events say Coming up. Existing view-switch feedback remains. Original
images, local event data and established green/red/light palette are retained.

Build and event date tests passed; browser host unavailable during this pass.
Desktop/mobile render, pan gestures, zoom bounds in practice and reduced-motion
presentation still require browser verification before calling this polished.

### Shared-photo and stitch transitions

Community photos and flyers share a photo-to-dialog view transition where the
browser supports it. The triggering image is named only for the snapshot;
cleanup restores its original styling after completion or cancellation. Closing
returns to the opening photo. Unsupported/reduced-motion paths update directly.
The dialog is opened in a layout effect so its image is present for the snapshot.
The existing gallery fade remains the fallback. Focus and body-scroll restoration
remain part of the dialog lifecycle.

The story-to-events divider draws its two green thread lines inward, followed by
the red flower. It shares the existing scroll-entry/reset observers, with a static
reduced-motion path and no always-running animation. Functional transition tests
cover supported, unsupported, reduced-motion, failure, and cleanup paths; browser
smoothness/desktop/mobile visual verification is pending host availability.

## Cleanup following browser inspection

Removed the gathering preference picker, selection state, email-prefill response,
and picked-card styles. The gathering cards remain directly below their heading.
Story reveals move vertically at narrow widths to avoid horizontal overflow.
The community ribbon uses smaller type/spacing at 360px and below.
A green/red BOP SVG favicon is served through Vite's base-aware public asset URL.
Playwright MCP verified no page overflow at 320, 390, 768, and 1280px, the picker
absent at each width, and the favicon response at its correct path (HTTP 200).

## Etched signature moments

All Polaroid captions use Cormorant Garamond italic at a responsive caption size,
including “Our people. Our city.” The story caption has no tracing or underline.

The closing BOP flourish uses vector outlines from the locally served Patrick
Hand font. `src/components/EtchedSignature.tsx` animates the warm gold trace as
cream lettering settles on red. It runs once on entry without replay controls;
reduced motion shows static lettering. Accessible text accompanies the decorative
SVG outlines. The generated paths live in `src/data/signatures.ts`.

The closing invitation omits the former connection tagline; the floral motif and
nakshi kantha thread details remain.

## Hero print shuffle

Clicking or tapping either hero print swaps the two keepsakes, with the front
print sliding outward before settling behind its companion. The hero uses native
buttons with descriptive shuffle labels and keyboard support. Other community
photos still open the photo viewer. `HeroPrints.tsx` owns the brief Web Animations
sequence; rapid taps during the sequence are ignored, and reduced motion swaps
instantly. Playwright checked both directions at 1440, 390, and 320px, keyboard
activation, no horizontal overflow during the shuffle, and no reduced-motion
animations.

## Album motion

The headline unfolds in four short staggered lines, followed by the hero prints
being dealt into position and the invitation being revealed. Story and gathering
photos use an album-page mask with a gentle image settle when entering the viewport.
Gallery browsing follows the arrow direction with a brief page-turn treatment.
The print shuffle and shared photo expansion remain intact. No motion dependency
or continuous loop was added. Reduced motion shows the complete static composition.
Playwright checked 320, 390, 768, and 1440px, including overflow during entry,
print containment, shuffling, viewer navigation, and reduced motion.

Desktop mouse movement adds a bounded two-degree paper-depth response to the hero
stack without React renders. It resets on pointer leave, window blur, or motion
preference changes. Touch and reduced-motion users get the stable stack and the
same shuffle action. Ribbon flowers turn with viewport progress where scroll
animation timelines are supported; otherwise they remain static. Involvement
links reveal a pale green wash on hover or keyboard focus, and the closing floral
motif blooms on entry. These effects add no perpetual animation or new dependency.

## Community album centerpiece

`CommunityAlbum.tsx` places the six supplied photos between gatherings and the
involvement section. On desktop the Polaroids fan open on entry; hovering or
keyboard-focusing a print lifts it above its neighbors. On smaller screens the
same photos form a native horizontal swipe row with snap points and a visible
next print. Every photo opens the existing HD viewer. Captions use the shared
italic serif styling and originals remain unchanged. The fan animation has a
static reduced-motion fallback and adds no animation dependency.

## Content ownership after the redundancy pass

Home introduces BOP, links to Events and Photos, and holds the participation
options and closing join invitation. Our Story remains a Home section reached
from the hero, not a duplicate navigation destination. Event listings, filters,
and flyers exist only on Events. The speculative gathering cards were removed
from that page to keep confirmed events clear. Photos owns the full album.
The header keeps one consistent Join link on every page; the large closing join
section appears only on Home. No filler content was added. The previous preview
and album navigation treatments above describe earlier iterations; event preview
mode has been removed from the component.
