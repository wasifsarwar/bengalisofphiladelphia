# BOP: efficient, accurate agent workflow

Work from the current code and rendered site. Preserve user decisions, complete
the requested change, and keep investigation and validation proportional.

## Project essentials

### Current design and application

The approved editorial design now has Home, Events, and Photos pages. The earlier
Figma implementation and screenshots are retired; do not restore or follow them.
Use `src/App.tsx`, `src/style.css`, and `docs/homepage.md` as the current reference.
The root `index.html` loads `src/main.tsx`; `public/concept.html` only redirects
old preview links to the homepage. There is no separate concept app. Native links
and `src/data/pages.ts` select the page; `scripts/build-pages.mjs` creates static
`events/index.html` and `photos/index.html` in dist after Vite builds. Preserve
direct loading and refreshes on GitHub Pages. Do not add a SPA fallback dependency.
Our Story stays on Home without a duplicate navigation tab. Event listings live
only on Events; the community album lives on Photos. Home links to each destination
without embedding their full content. The large join section appears only on Home.

Use React, strict TypeScript, Vite, and plain CSS. Preserve the approved cream,
red, and green design, serif typography, photo frames, and existing behavior.
Keep reusable visual components in `src/components/`, destinations in
`src/data/content.ts`, and community photographs in `public/images/community/`.
Do not replace Vite or introduce a UI kit without a concrete need.

- BOP is a Bangladeshi/Bengali community rooted in Bangladesh. Honorary Bengalis
  are welcome. Always spell cha, never chai. Avoid em dashes and generic promotional
  copy. Keep wording plain, friendly, and culturally specific.
- Do not invent events, dates, attendance, testimonials, organizers, or history.
  Keep planned ideas distinct from confirmed events. Placeholders are not evidence
  of real activities. Do not expose editorial upload instructions in the final UI.
- Preserve supplied Heylo, Instagram, email, and social-host form destinations.
  A visual email signup is not a working integration; do not claim otherwise.
- Check readability and contrast, especially red and muted text on dark surfaces.

## Choose effort before expanding scope

- Default to one agent and the smallest coherent change satisfying the request.
  Identify behavior, relevant files, and completion evidence before exploring.
- Do not spawn agents unless explicitly requested or authorized. For authorized
  delegation use a bounded, independent subtask and a self-contained brief; avoid
  full-history copies and overlapping edits. Request a concise result.
- Where model selection is supported and authorized, use appropriately scoped
  model/effort settings; do not claim a model switch without evidence. Written
  preferences do not configure the runtime.
- Increase effort when ambiguity or correctness warrants it; do not economize by
  skipping required work or checks.

## Retrieve only what resolves the next question

- Search with rg before reading. Exclude dependencies, generated assets, caches,
  and lockfiles from broad searches. Read lockfiles only for dependency questions.
- Use native tools for small edits. If available, use Serena for file-scoped symbol
  queries, starting with at most 6,000 answer characters. Narrow oversized results.
- Use Context7 for unresolved library/version questions after checking installed
  versions. Ask a focused public API question; never send private source or secrets.
  Use official documentation as a fallback. Reuse answers already verified.
- Use Impeccable as the primary UI workflow below. Load frontend-design only when
  a new visual direction would benefit from it; do not stack overlapping skills
  for a small edit. Follow the Figma design-to-code skill before Figma implementation.
- If an optional MCP is unavailable, use native tools. Do not repeatedly retry an
  exhausted quota or debug/install MCPs unless necessary or requested.
- Batch independent reads, sequence edits and dependent work, and summarize output.
  Do not reread the same content through multiple tools without a new reason.

## Impeccable workflow

### Load only what the task needs

- Read the installed Impeccable SKILL.md on first use and announce its use briefly.
  Current location: `/Users/wasifsiddique/.agents/skills/impeccable/SKILL.md`.
  Prefer the active session's skill catalog if the installation moves. Do not copy
  the skill into this repository or assume a second installation is identical.
- Run `<skill-dir>/scripts/impeccable context` once per session from `bop-site`.
  Follow the returned directives. On failure, report it and read available project
  context directly, as the skill requires. A missing DESIGN.md does not authorize
  a redesign or block a small refinement.
- Load the selected command's reference only. Read `reference/craft-floor.md`
  immediately before UI edits. Reuse context already read during the session.
- Use the rendered site, current source, and the user's latest screenshots as
  evidence. README.md and docs/homepage.md explain intent; verify details against
  the implementation. Do not revive removed features from old notes.
- The homepage is Persuade; the photo viewer is Experience. Event filters and
  viewer controls need predictable, accessible operation even within this visual style.

### Choose the right command

Use `$impeccable <command> <specific area>` in conversation. These are agent
workflows, not shell commands or controls added to the website.

| Command | Appropriate work |
| --- | --- |
| `layout`, `typeset` | Spacing, grouping, responsive structure, typography |
| `polish` | Finish an existing design without replacing its identity |
| `delight`, `animate` | Tactile feedback and purposeful motion |
| `clarify`, `distill` | Clearer copy and simpler interactions |
| `adapt`, `harden` | Screen sizes, keyboard access, empty/error states |
| `critique` | Usability/design findings grounded in rendered evidence |
| `audit` | Accessibility and technical frontend findings |
| `optimize` | Measure a bottleneck, improve it, compare before and after |
| `bolder`, `quieter`, `colorize` | Adjust visual emphasis within the approved world |
| `overdrive` | A focused ambitious effect; follow its direction-selection process |
| `shape`, `init`, `document`, `extract` | Plan or document when explicitly useful |
| `live`, `generate` | Follow the skill's interactive variant workflow |

For a clear request, select the fitting workflow and proceed. Ask only for a
material missing decision or an explicit skill requirement; reuse authorization
already given. Follow the selected playbook's review/delegation requirements.
Keep any authorized parallel reviews bounded and independent, not a blanket
permission to spawn agents for every edit. Critique and audit report findings;
implement fixes when the user asks for them. Do not run all commands as a checklist.

### Preserve BOP's design decisions

- Keep the cream surface, green/red palette, nakshi kantha floral/stitch language,
  circular official logo, serif headings, and handwritten wordmark.
- Polaroid captions use Cormorant Garamond italic at a consistent readable scale.
  Do not reintroduce caption tracing, dotted photo frames, “Trace again,”
  “Arrange the prints,” or the removed gathering preference picker.
- Hero prints are similarly sized, shuffle on activation, and stay inside the
  hero. Other community photos open the viewer. Do not confuse these actions.
- Add delight through meaningful feedback, not extra switches, promotional copy,
  perpetual loops, or delays. Preserve reduced-motion alternatives and native
  button/keyboard behavior. Show focus for keyboard use, not a persistent outline
  after pointer activation.
- Keep HD source photos. Responsive WebP previews serve the page; the viewer uses
  originals. Run `uv run scripts/optimize-assets.py` after changing source assets;
  commit generated previews, `src/data/photoPreviews.ts`, and the generated font.
  Do not hand-edit generated path or preview data.
- Keep the implementation dependency-light. Prefer CSS, native Web Animations,
  IntersectionObserver, and the existing gallery transition helper. Do not replace
  existing working behavior to add a small effect.

### Detector and browser verification

- Hooks are configured in `.codex/hooks.json` and enabled in
  `.impeccable/config.json`. `hooks on`, `hooks off`, and `hooks status` are
  Impeccable requests; read its hooks reference before changing configuration.
- Do not assume hooks ran merely because configuration exists. If no findings or
  hook result surfaced after UI edits, run once:
  `<skill-dir>/scripts/impeccable detect --json <changed files>`.
  Use `--scope layout` for a focused layout assessment when its playbook calls for it.
- Treat findings as evidence to investigate. Do not silence rules to get a clean
  report or repair unrelated skill/configuration drift during a UI task.
- Use the user-requested Playwright MCP for rendered inspection. Its isolated
  Chrome configuration is in `.codex/config.toml`; tools are installed under
  `.tools/mcp/`. Verify connection instead of claiming configuration proves it works.
  If unavailable, state the limitation and use an available authorized browser tool.
- Start Vite and open the printed URL with `/bengalisofphiladelphia/`. For loading
  measurements, build and use `npm run preview`, fresh browser contexts, and stated
  viewport/pixel density. Distinguish local payload measurements from live speed
  or real-user Core Web Vitals. Never claim performance numbers without evidence.
- Inspect affected desktop and phone states, plus an intermediate width for layout
  changes. Include 320px when changing the hero. Look at screenshots as well as
  DOM measurements. Check overflow, print containment, shuffle in both directions,
  focus, relevant navigation, viewer open/close, and reduced motion as applicable.
- Keep screenshots and large logs in ignored local output such as
  `.local/playwright/`. Batch related checks, fix observed problems, and repeat
  only checks affected by the fix. A detector or passing build is not visual proof.

## Execute and validate proportionately

- Keep large logs in files. Preserve exit codes and report relevant error excerpts.
- Docs-only changes: inspect the diff and run git diff --check, including new files.
- Logic changes: add meaningful regression coverage for changed behavior and run
  relevant tests. Do not write tests that merely mirror low-impact implementation.
- UI changes: check the build/types and relevant interactions at desktop and phone
  widths, including navigation, keyboard focus, links, and applicable empty states.
- Once an app exists, document actual validation commands in README.md. Avoid
  redundant type checks if the build already performs them. Repeat successful
  checks only after relevant changes or when unresolved evidence requires it.
- Successful edits are not proof of correct behavior or deployment.

## Memory, handoff, and completion

- Consult Memory MCP only when context lacks needed facts; verify mutable facts
  against source files and current design. Never load the entire graph.
- If available, Memory MCP is the sole agent-maintained memory store. Do not create
  overlapping memory systems. Repository rules and maintained documentation remain
  authoritative. Store only concise, durable decisions, not transcripts or secrets.
- Finish with outcome, changed files, exact validation, limitations, and next step.
  Distinguish observations from assumptions. Avoid speculative cleanup and repeated
  handoffs after routine edits.
