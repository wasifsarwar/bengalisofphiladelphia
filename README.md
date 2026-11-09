# Bengalis of Philadelphia

The editorial community homepage is the active website. The earlier multipage
implementation and Figma references have been retired. Future work starts from
this design.

Live site: https://wasifsarwar.github.io/bengalisofphiladelphia/

## Development

Use Node 24 LTS:

```sh
npm ci
npm run dev -- --host 127.0.0.1
npm run build
npm run preview
```

Open the printed local URL. `npm run build` runs strict TypeScript checking and
creates the production site in `dist/`. Vite uses `/bengalisofphiladelphia/` as
its base path for GitHub Pages. Source maps are disabled.

## Source layout

- `index.html`: the single application entry.
- `src/main.tsx`: fonts, stylesheet, and React startup.
- `src/App.tsx`: homepage sections and mobile navigation.
- `src/components/`: reusable photo frame, flower motif, and wordmark.
- `src/style.css`: design tokens, layouts, and responsive styling.
- `src/data/content.ts`: shared community destinations and image URL helper.
- `public/images/community/`: real community photos.
- `public/concept.html`: compatibility redirect for earlier preview links.
- `docs/homepage.md`: current design and content guidance.

Navigation scrolls to sections on the homepage. Join links use Heylo, the social
host application uses Google Forms, and contact links open email or Instagram.
There is no email subscription backend. Proposed gatherings have no invented dates.

## Publishing and validation

Push `main` to run `.github/workflows/pages.yml`. It installs dependencies, builds
the site, and publishes `dist/` to GitHub Pages. Confirm the deployment succeeds
before reporting an update as live.

For UI changes, inspect the root page at desktop and phone sizes, verify navigation
and images, and run `npm run build` plus `git diff --check`. The compatibility URL
should redirect to the root while preserving section anchors.

Follow `AGENTS.md` for BOP copy and contribution rules. Repository-local agent
configuration remains in `.codex/`, with supporting tools under `.tools/mcp/` and
the frontend-design skill under `.agents/skills/frontend-design/`.
