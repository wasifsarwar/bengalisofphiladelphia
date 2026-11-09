# BOP: efficient, accurate agent workflow

Adapted from `/Users/wasifsiddique/Desktop/busReroute/route9DetourMap/AGENTS.md`
at the user's request. Optimize usage per correctly completed task, preserving
correctness, user intent, and necessary validation.

## Project essentials

### Current design and application

The approved editorial homepage is the only active application. The earlier
Figma implementation and screenshots are retired; do not restore or follow them.
Use `src/App.tsx`, `src/style.css`, and `docs/homepage.md` as the current reference.
The root `index.html` loads `src/main.tsx`; `public/concept.html` only redirects
old preview links to the homepage. There is no separate concept app or router.

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
- Use `.agents/skills/frontend-design/SKILL.md` (Anthropic's frontend-design skill)
  for substantive UI work. Its two-pass plan/build/critique process must preserve
  the approved homepage direction, BOP copy preferences, and collaborator changes.
  Do not introduce another memory store or redesign the palette merely because
  a generic skill example recommends a different aesthetic. Follow the Figma
  design-to-code skill before requesting design context or implementing Figma.
- If an optional MCP is unavailable, use native tools. Do not repeatedly retry an
  exhausted quota or debug/install MCPs unless necessary or requested.
- Batch independent reads, sequence edits and dependent work, and summarize output.
  Do not reread the same content through multiple tools without a new reason.

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
