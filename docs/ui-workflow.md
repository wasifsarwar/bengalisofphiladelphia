# UI development tools and context budget

Updated November 13, 2026.

## Available now

- Use the installed `.agents/skills/frontend-design/SKILL.md` for substantial
  design work. Preserve the approved homepage and use its plan/build/critique loop.
- Use the connected browser tool for focused layout and interaction checks.
  When the connected browser host is unavailable, use the user-requested Playwright MCP installation described below.
- Figma tools are available when the user supplies or requests a Figma design.
  Routine CSS edits do not need Figma calls.

## Installed MCP servers

The repository `.codex/config.toml` configures Serena, Context7, and Memory.
Context7 4.2.0 and Memory 2026.8.31 are installed under `.tools/mcp/`;
Serena's pinned source and uvx launcher are present. The current chat's tool list
and CLI MCP listing do not expose these three servers. A direct MCP client subsequently connected successfully to Serena and Context7:
Serena returned the App symbol overview, and Context7 retrieved MDN documentation.
They are usable through a direct client without reinstalling. This does not register
them as native tools in this already-running chat. Memory has not been exercised. Open `bop-site` itself as the Codex project, review
its project trust/configuration, and verify the servers are listed after reopening.
Do not weaken trust controls or duplicate these servers globally to work around it.

## Keep retrieval focused

1. Start with a bounded search and the relevant component/style rules.
2. Use Serena's symbol-level reads for larger cross-file changes once connected;
   use ordinary search for small CSS changes.
3. Use Context7 for a specific unresolved library/version question, not every edit.
4. Query Memory only for missing durable decisions; never load the full graph.
5. Load one relevant design skill, not several overlapping UI skill packs.
6. Validate the changed behavior at desktop and phone widths. Reuse browser tabs,
   prefer compact observations, and take screenshots when visual evidence is needed.
7. Run the build once after the final changes; repeat only for new failures/edits.

These practices limit unnecessary context. No measured token-saving percentage
is claimed. No additional UI packages or MCP installations are currently needed.

Sources:
- https://developers.openai.com/plugins/concepts/skills
- https://developers.openai.com/plugins/build/plugins
- https://oraios.github.io/serena/01-about/000_intro
- https://github.com/upstash/context7/blob/master/packages/mcp/README.md

## Installed skills (November 10, 2026)

User-level skills under `~/.codex/skills/`:

- `ponytail` and `ponytail-audit`: DietrichGebert/ponytail, `skills/`.
- `frontend-design`: anthropics/skills, `skills/frontend-design`.
- `impeccable`: pbakaus/impeccable, `.agents/skills/impeccable`.

The existing project-local frontend-design copy is preserved. New skills become
available for automatic discovery on the next turn; their instructions can also
be read and followed directly in the current task. Ponytail audit is a report,
not a code indexer. Serena supplies the symbol index. No token savings have been
measured. Load only the selected command reference rather than all design guides.

Use `ponytail-audit` for repo quality; use `impeccable critique` for usability.
Impeccable's launcher lives at `~/.codex/skills/impeccable/scripts/impeccable`.
Its `context`, `detect`, and `critique-storage` commands support the critique
workflow; critique itself is an agent playbook, not a standalone shell report.

## Playwright MCP (installed November 13, 2026)

Microsoft's `@playwright/mcp` 0.0.85 is pinned in `.tools/mcp/package.json` and
its lockfile. `.codex/config.toml` registers it as `playwright`, using the local
Node CLI, installed Chrome, headless mode, an isolated in-memory browser profile,
and `.local/playwright` for output. It does not use the user's signed-in profile.
Open `bop-site` as the Codex project and reload the session to discover the new
native tools. Current-session operation was verified through the installed MCP
SDK's stdio client, calling the server's actual browser tools (not plain Playwright
masquerading as MCP). The browser-run-code tool is named `browser_run_code_unsafe`
in this pinned release; reserve it for authorized local-site inspection.

Inspection evidence and screenshots: `.local/playwright/` (untracked).
Findings: `docs/browser-inspection-2026-11-13.md`.

No measured animation-frame-rate, real-phone touch test, or cross-browser claim
is made. The headless Chrome viewport tests are desktop/mobile emulation only.

Sources:
- https://github.com/microsoft/playwright-mcp
- https://developers.openai.com/codex/mcp/
