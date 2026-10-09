# Bengalis of Philadelphia website

Local repository for implementing BOP's community website from the collaborative
Figma design. Created October 8, 2026. A React/TypeScript/Vite holding page is live; the full
Figma implementation is still to come.

## Scope

- Home / upcoming events: community introduction, past gatherings, upcoming plans.
- Our story: background, community activities, and welcome.
- Get involved: Heylo, suggestions, social-host application, email, and Instagram.
- Responsive desktop and mobile layouts, accessible navigation and readable text.

Follow [AGENTS.md](AGENTS.md) for the efficient working process and BOP copy rules.
See [design reference](docs/design-reference.md) for verified design observations,
frame links, and service destinations.

Current visual references are stored in [docs/design/images](docs/design/images).
When the user says the design is updated, replace those captures from Figma and
update the [capture manifest](docs/design/manifest.json) before further UI work.
See the [capture guide](docs/design/README.md) for the refresh procedure.

## Technology stack

Required by the user: **TypeScript and Vite**. Use React for components, strict
TypeScript, and plain CSS with shared color, typography, and spacing tokens.
Add routing, testing, icons, or other libraries only where the implementation
needs them. Preserve the Figma visual direction instead of adopting a UI kit's
default appearance. Verify compatible package versions when scaffolding.

## Repository status

Public repository: https://github.com/wasifsarwar/bengalisofphiladelphia
Demo: https://wasifsarwar.github.io/bengalisofphiladelphia/

Git branch: `main`. GitHub Actions builds and deploys `dist/` to Pages on every
push to `main`. The workflow can also be run manually in the Actions tab.
No deployment token or third-party hosting account is needed.
Vite's base path is `/bengalisofphiladelphia/`, as required for this project URL.
Source maps are disabled. The preview requests search engines not to index it.

## Development and validation

Use Node 24 LTS and run:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The build runs strict TypeScript checking before Vite. Publish by committing
and pushing to `main`; check the Pages workflow completes before sharing an update.
Agent tooling dependencies remain separate under `.tools/mcp/`.

Next: confirm the latest Figma frames and implement the responsive site.
Future client-side routes must account for GitHub Pages lacking an SPA rewrite
(use hash routing or generate real page files).

## Agent tooling

Repo-scoped MCP launch settings are in `.codex/config.toml`. Open this directory
as the Codex project and restart/reopen the task to load them (trusted projects
only). No global MCP settings or model preferences were changed.

- Serena is pinned to commit `ec98be89545270e9d689149519820ba24270f55a`, launched
  through uvx with the Codex context and this project explicitly selected. Its
  TypeScript language configuration supports the frontend source files.
- Context7 `4.2.0` and Memory `2026.8.31` are installed under `.tools/mcp` with a
  lockfile. Restore with `npm ci --prefix .tools/mcp`. Context7 uses its keyless
  mode; account limits may require authentication later.
- Memory stores data in `.local/memory.jsonl`, excluded from Git. Use concise
  project facts only. Serena memories are not a second project memory system.
- Anthropic's frontend-design skill is vendored at
  `.agents/skills/frontend-design/SKILL.md`, including its upstream license. It
  should be discoverable on the next turn when working from this repository.

Setup validation: all three servers completed MCP initialization and tools/list.
This proves server startup, not registration in an already-running chat.
Machine-specific executable and repository paths must be updated if the repo moves.

Sources: [Codex MCP configuration](https://developers.openai.com/codex/mcp),
[Serena](https://github.com/oraios/serena),
[Context7](https://github.com/upstash/context7),
[Memory](https://github.com/modelcontextprotocol/servers/tree/main/src/memory),
[frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design).
