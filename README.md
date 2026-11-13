# Bengalis of Philadelphia

A community website with Home, Events, and Photos pages, built with React, TypeScript, Vite, and plain CSS.
The design uses cream, Bangladeshi green and red, Polaroid photos, and nakshi kantha
stitch details.

[Published site](https://wasifsarwar.github.io/bengalisofphiladelphia/).
Local changes appear there only after a successful GitHub Pages deployment.

## Run locally

Use Node 24. From this folder:

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Open the URL Vite prints, including `/bengalisofphiladelphia/`.

```sh
npm run build       # Check TypeScript and build dist/
npm run preview     # Preview the production build
node --experimental-strip-types --test tests/*.test.mjs
```

## Pages

- `/`: hero prints, Our Story, ways to get involved, and links to Events and Photos.
- `/events/`: upcoming/past events, month filters and flyers.
- `/photos/`: the interactive community album and HD photo viewer.

All paths sit below `/bengalisofphiladelphia/`. Navigation uses ordinary links
and browser history. `scripts/build-pages.mjs` creates the static HTML entries
after Vite builds, so direct links and refreshes work on GitHub Pages. Browsers
that support page view transitions animate navigation; other browsers load normally.

## Current features

- Real Home, Events, and Photos URLs, a mobile menu, and links to Heylo, Instagram, email, and the host form.
- Two matching hero Polaroids that shuffle when clicked or tapped.
- Community photos and event flyers open in a viewer with arrows, thumbnails, zoom, and keyboard controls.
- Upcoming and past events, a month selector, and horizontal scrolling when needed.
- Responsive photo previews, original HD images in the viewer, and a viewer that loads on demand.
- Reduced-motion support, keyboard focus indicators, and the circular BOP logo as the favicon.

This is a static site. Events come from a project file; there is no admin dashboard
or signup backend. Search indexing is currently disabled in `index.html`.

## Update content

| What to change | Where |
| --- | --- |
| Homepage sections and wording | `src/App.tsx` |
| Colors, fonts, spacing, and motion | `src/style.css` |
| Confirmed events | `src/data/events.ts` |
| Event flyer images | `public/images/events/` |
| Photo captions and gallery order | `src/data/gallery.ts` |
| Original community photos | `public/images/community/` |
| Heylo, social, email, and host links | `src/data/content.ts` |
| Browser icons | `public/bop-favicon.png`, `public/favicon.ico`, `public/apple-touch-icon.png` |

See [the event guide](docs/events.md) for event fields. Past and upcoming status
uses the date in Philadelphia. Gathering ideas are separate from confirmed events.

After adding or replacing community PNGs, the source logo, or the handwritten font:

```sh
uv run scripts/optimize-assets.py
```

This creates WebP previews, their size list, and a smaller font file. It keeps
originals untouched. Photos without generated previews use their original file.
Commit the generated assets along with the content change.

## Impeccable controls

These are requests to the coding agent, not website controls. For example:
`$impeccable polish the hero`.

| Command | Use it for |
| --- | --- |
| `$impeccable layout` | Spacing, grouping, and responsive layout |
| `$impeccable polish` | Small visual refinements |
| `$impeccable delight` | Personal, useful interaction details |
| `$impeccable animate` | Motion and transitions |
| `$impeccable critique` | A usability and design review |
| `$impeccable audit` | Accessibility and frontend quality checks |
| `$impeccable optimize` | Loading speed and rendering costs |
| `$impeccable clarify` | Clearer labels and copy |
| `$impeccable hooks on` / `off` / `status` | Control the design detector |

The detector is enabled in `.impeccable/config.json`. Keep the existing visual
style, English wording, HD originals, and reduced-motion behavior when refining UI.

Project MCP settings are in `.codex/config.toml`: Playwright for browser checks,
Serena for code lookup, Context7 for documentation, and Memory for saved context.
Availability depends on the active agent session; configuration alone does not
prove a server is connected. The paths are specific to this Mac.

## Publish and check

Pushing `main` runs `.github/workflows/pages.yml`, which builds and publishes
`dist/` to GitHub Pages. Check that the deployment succeeds before calling it live.

For UI changes, run the build and tests, then inspect desktop and phone layouts
with Playwright. Check navigation, print shuffling, the photo viewer, image loading,
keyboard use, reduced motion, and horizontal overflow. Run `git diff --check`.

Follow [AGENTS.md](AGENTS.md) for contribution rules. See
[homepage notes](docs/homepage.md) for more detail about the design.
