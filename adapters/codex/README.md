# Codex Adapter for The Hive Skill

Maps the HIVE council protocol to Codex's capabilities.

## Capability Detection

| Capability | Supported | Notes |
|-----------|-----------|-------|
| Subagent spawning | Task tool | Sequential by default |
| Structured output | Markdown | Handoff schema rendered as Markdown |
| File editing | Read/Write/Edit tools | Full file manipulation |
| Command execution | Bash tool | Full shell access |
| Approval prompts | Native | Codex's built-in approval prompts |

## Adapter Behavior

The council runs as a sequential workflow. Codex does not support true parallel subagent execution, so roles execute one at a time with structured handoffs.

### Handoff Rendering

Structured handoffs are rendered as Markdown using the format defined in [handoff-schema.md](../../skills/hive-mind-council/references/handoff-schema.md). All semantic fields are preserved.

### Installation

See [plugin.md](plugin.md) and [AGENTS.md](AGENTS.md) for Codex-specific configuration.

### Safety Notes

- Codex's approval mechanisms handle permission enforcement.
- The Sentinel runs validation using available tools.
