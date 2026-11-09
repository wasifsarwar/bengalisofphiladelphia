# UI development tools and context budget

Checked November 9, 2026.

## Available now

- Use the installed `.agents/skills/frontend-design/SKILL.md` for substantial
  design work. Preserve the approved homepage and use its plan/build/critique loop.
- Use the connected browser tool for focused layout and interaction checks.
  A second browser automation MCP is unnecessary for this workflow.
- Figma tools are available when the user supplies or requests a Figma design.
  Routine CSS edits do not need Figma calls.

## Present locally, not exposed in the current chat

The repository `.codex/config.toml` configures Serena, Context7, and Memory.
Context7 4.2.0 and Memory 2026.8.31 are installed under `.tools/mcp/`;
Serena's pinned source and uvx launcher are present. The current chat's tool list
and CLI MCP listing do not expose these three servers. Files on disk do not
prove an active connection. Open `bop-site` itself as the Codex project, review
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
