# OpenCode Adapter for The Hive Skill

Maps the HIVE council protocol to OpenCode's native capabilities.

## Capability Detection

| Capability | Supported | Notes |
|-----------|-----------|-------|
| Subagent spawning | Via Task tool | Can run roles in parallel when file scopes do not overlap |
| Structured output | Markdown | Handoff schema rendered as Markdown |
| File editing | Read/Write/Edit tools | Full file manipulation |
| Command execution | Bash tool | Full shell access |
| Approval prompts | Native | OpenCode's built-in approval prompts |

## Adapter Behavior

The council runs as a sequential workflow by default. When independent roles have non-overlapping file scopes, the Queen may dispatch them via parallel Task tool calls.

### Handoff Rendering

Structured handoffs are rendered as Markdown using the format defined in [handoff-schema.md](../../skills/hive-mind-council/references/handoff-schema.md). All semantic fields are preserved.

### Installation

```bash
# Add the skill to OpenCode
npx skills add https://github.com/yuzuruu29/the-hive-skill.git --yes --global
```

### Safety Notes

- OpenCode's built-in approval prompts handle GIT_MUTATE and DESTRUCTIVE permission levels.
- The Sentinel runs validation using available tools (Bash, lint, test commands).
