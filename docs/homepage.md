# Current homepage

This is the approved Bengalis of Philadelphia website, promoted from the desktop
concept. The former multipage design is retired and remains available only in
Git history. There is one application and one stylesheet.

## Visual direction

Use warm cream (#f8f3e9), Bengali red (#982c36), wine (#802a32), forest green
(#203f36), and dark ink (#3d3931). Cormorant Garamond supplies display typography;
DM Sans handles body text and navigation. Fonts are served locally.

The homepage flows from a large introduction and overlapping photo prints to a
community ribbon, introduction, gathering ideas, participation links, and a final
join invitation. Preserve this design when making routine edits.

## Photos

`PhotoSpace` handles both real photos and intentional placeholders. Community
image filenames are resolved beneath `public/images/community/` using Vite's
configured base path. Supply descriptive alternative text for each real image. Below-fold photos load
lazily with asynchronous decoding; the hero pair loads eagerly.

- Large hero frame: `BOP_Hike.png`.
- Front hero frame: `BOP_Game_Night.png`, with a landscape frame to preserve the group.
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
