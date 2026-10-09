# Bengalis of Philadelphia website

Local repository for implementing BOP's community website from the collaborative
Figma design. Created October 8, 2026. Application implementation has not started.

## Scope

- Home / upcoming events: community introduction, past gatherings, upcoming plans.
- Our story: background, community activities, and welcome.
- Get involved: Heylo, suggestions, social-host application, email, and Instagram.
- Responsive desktop and mobile layouts, accessible navigation and readable text.

Follow [AGENTS.md](AGENTS.md) for the efficient working process and BOP copy rules.
See [design reference](docs/design-reference.md) for verified design observations,
frame links, and service destinations.

## Technology stack

Required by the user: **TypeScript and Vite**. Use React for components, strict
TypeScript, and plain CSS with shared color, typography, and spacing tokens.
Add routing, testing, icons, or other libraries only where the implementation
needs them. Preserve the Figma visual direction instead of adopting a UI kit's
default appearance. Verify compatible package versions when scaffolding.

## Repository status

Git branch: `main`. No deployment or application framework has been configured;
the agent tooling dependencies are installed separately. Earlier screenshot exports live in `../exports/`;
they predate the latest restyling and must not be used as the current design source.

Next: confirm the latest frames and implement the responsive site. Add actual
development, build, and validation commands here when the application is scaffolded.

## Agent tooling

Repo-scoped MCP launch settings are in `.codex/config.toml`. Open this directory
as the Codex project and restart/reopen the task to load them (trusted projects
only). No global MCP settings or model preferences were changed.

- Serena is pinned to commit `ec98be89545270e9d689149519820ba24270f55a`, launched
  through uvx with the Codex context and this project explicitly selected. Its
  TypeScript language configuration prepares for frontend code; no app stack is
  installed by this setup. Language-server indexing awaits actual source files.
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
