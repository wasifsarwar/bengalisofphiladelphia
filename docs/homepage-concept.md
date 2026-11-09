# Homepage concept, November 8, 2026

The user requested a fresh desktop homepage inspired by Book & Sip Club, with reserved photo spaces. The new homepage is served at both the root entry and `concept.html`. The root entry was updated so GitHub Pages displays the latest design.

## Design plan

- Cream `#f8f3e9`, Bengali red `#982c36`, wine `#802a32`, forest green `#203f36`, ink `#3d3931`, and muted sand for photo spaces.
- Cormorant Garamond is the expressive display typeface; DM Sans handles navigation and body copy. Both are served locally.
- Left-aligned oversized introductory type balances two overlapping photo prints. A red ribbon introduces the community's interests; a calm story section leads into a green gathering-ideas section, participation links, and a red closing invitation.
- Use cultural specifics, genuine destinations, and generous photo areas. Keep photo placeholders visibly unfinished, without fabricated images, dates, venues, or testimonials.

```text
wordmark             story / gatherings / get involved      join
large introduction                 two overlapping photo spaces
community interests ribbon
large photo space                  short introduction
gathering ideas: three photo spaces and descriptive text
participation introduction          host / share an idea
centered closing invitation and join link
wordmark / social / contact
```

## Review against the brief

The cream, red, expressive serif, and photo-print composition intentionally follow the reference's editorial direction. Repeated generic cards, invented social proof, and an unnecessary sign-up form are omitted. BOP-specific cha, adda, Bangladeshi roots, and Philadelphia activities provide the content. The typographic wordmark is a concept treatment, not a replacement asset for the original logo.

## Photo slots

Six reusable `PhotoSpace` components provide stable image proportions. The two hero slots now use the supplied BOP hike and game-night images; four placeholders remain. The layout includes: two portrait/near-square hero photos, one large story image, and three landscape gathering images. Replace the `photo-surface` contents with images and factual alternative text when real photography is supplied. Keep `object-fit: cover` and these layout proportions. Hero photos should remain candid; gathering cards currently describe proposed activities.

## Preview and validation

Run `npm run dev -- --host 127.0.0.1`, then open the printed local URL with `concept.html` appended. The concept uses the same React, strict TypeScript, and Vite setup. `npm run build` validates and builds both the original entry and the concept entry.

Internal navigation scrolls to homepage sections. Join links use Heylo; the host application, Instagram, and email use the existing supplied destinations. The mobile menu exposes its expanded state, supports Escape, and closes after navigation. Keyboard focus and reduced motion are supported.
