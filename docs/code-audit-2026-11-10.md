# Ponytail code audit — November 10, 2026

What this repo does: BOP is a static React community homepage published to GitHub
Pages. Visitors read about the group, browse gathering ideas, and follow links to
Heylo, Instagram, email, or a host application. Assumed load: public visitors
reading static files; there is no local account, payment, database, or write API.

## Should fix

1. **Full-size photos compete for initial page bandwidth** (`src/components/PhotoSpace.tsx`, `src/App.tsx`, `public/images/community/`).
   - **What this is:** Six PNG photographs total 12,688,652 bytes (12.1 MiB).
   - **Problem:** All six previously loaded eagerly, including four below-fold images. On a slow mobile connection, non-visible photos compete with the hero. Files remain large after this cleanup.
   - **Fix:** Applied native lazy loading by default and async decoding; kept the two hero images eager. A separate responsive-image pass should create smaller web derivatives while retaining the supplied originals.
   - **If we skip it:** Loading every original still transfers roughly 12.1 MiB of community photographs during a full visit. Lazy loading reduces competing requests, not total file sizes; actual timing was not measured.

2. **Scroll-reveal behavior lacks a repeatable regression check** (`src/hooks/useScrollReveal.ts`).
   - **What this is:** Two observers handle entry, exit, repeat scrolling, cleanup, and live motion preferences.
   - **Problem:** The requested up/down replay behavior has multiple states but no automated regression test. A change to disconnect/reset behavior could restore the previously reported one-shot animation defect.
   - **Fix:** Add one focused browser regression covering entry, fully leaving view, reentry from both directions, and changing reduced-motion preference. Not added in this run because no supported browser was available to exercise and validate it.
   - **If we skip it:** Each motion change needs deliberate manual verification; TypeScript/build checks cannot prove observer timing.

## Nice to have

3. **Reduced-motion CSS was duplicated** (`src/style.css`).
   - **What this is:** An early media rule disabled transitions and smooth scrolling; a later rule covers those plus animations and pseudo-elements.
   - **Problem:** Both rules must be read even though the later rule already covers the early rule.
   - **Fix:** Removed the redundant early rule. Kept the complete later accessibility rule.
   - **If we skip it:** No current behavior defect, but avoidable maintenance noise remains.

4. **Symbol indexing included non-application directories** (`.serena/project.yml`).
   - **What this is:** Serena's project-specific extra exclusion list was empty.
   - **Problem:** Tool packages, skill content, and public assets are unrelated to application-symbol retrieval; scanning them increases irrelevant indexing scope.
   - **Fix:** Excluded `.tools`, `.agents`, `public`, `dist`, `node_modules`, and `.impeccable` from Serena indexing and rebuilt the index: nine TypeScript files. Expanded README's source map instead of creating a competing index document.
   - **If we skip it:** Future tooling/skill additions can increase irrelevant lookup scope. No token-saving percentage has been measured.

## Release decision, not an automatic cleanup

`index.html` still declares `noindex, nofollow`. A crawler honoring that directive
will not index the public homepage. This may be deliberate while the design is
in progress; leave it until public search discoverability is requested. Codebase
indexing and search-engine indexing are different tasks.

## Validation and boundaries

- Read all application TypeScript, CSS, entry points, build and deployment config,
  dependency declarations, README, and design guidance. Traced navigation,
  asset URL resolution, menu state, scroll observers, and external destinations.
- `npm run build`: passed (includes strict TypeScript).
- `git diff --check`: passed.
- `npm audit --omit=dev`: zero reported production vulnerabilities. This is not a
  full security review and excludes developer/tool dependencies.
- Checked the generated handwritten-font URL retains the GitHub Pages base path.
- Serena indexing completed successfully for nine TypeScript files. Its shutdown
  logged a process-group SIGTERM permission warning after writing the index. A
  subsequent direct MCP symbol lookup returned `PhotoSpace` and `PhotoSpaceProps`.
- Retained social-host artwork because design guidance explicitly retains source
  assets; retained placeholders because the user requested future photo spaces.
- No dependency changes, image recompression, broad component extraction, or
  unrequested redesign. Cleanup code net change: one line removed, zero dependencies.

Verdict: Small, understandable static site. Initial image loading is improved;
responsive image sizes and a motion regression check are the next useful work.

Lean: -1 code line, -0 dependencies achieved; index/documentation changes are separate.

Not checked: rendered layout, browser interactions, screen-reader behavior,
external account flows, live GitHub deployment, development-tool vulnerabilities,
and third-party dependency source. The browser tool reported no available browsers.
