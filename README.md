# The Hive Skill

The Hive Skill is an open-source multi-agent orchestration skill for agentic coders. It turns one AI coding agent into a structured six-role council: Queen, Scout, Architect, Forger, Sentinel, and Scribe.

The Hive Skill is built to be invoked once and trusted to continue until the task is completed, validated, or blocked by a clear stop condition.

v0.1.0 provides role-simulated orchestration inside compatible agentic coding tools. Real multi-model execution depends on the runtime.

## Demo

A demo animation source is available at:

```text
assets/demo/the-hive-skill-demo.html
```

Export instructions are available at:

```text
assets/demo/export-instructions.md
```

## Supported Runtimes
- OpenCode / OpenCode Go
- Claude Code
- Codex
- Generic `.agents` workflows

## Installation

You can install The Hive Skill using the provided installation scripts or via GitHub Actions.

### Manual Installation
Run the install script for your platform:

**Bash (Linux/macOS):**
```bash
./install.sh
```

**PowerShell (Windows):**
```powershell
.\install.ps1
```

By default, the skill is installed to `.agents/skills/hive-mind-council/`. You can specify a different path: `.opencode/skills/hive-mind-council` or `.claude/skills/hive-mind-council`.

### GitHub Actions
Use the composite action in your workflow:
```yaml
steps:
  - uses: yuzuruu29/the-hive-skill@v0.1.0
    with:
      install-path: '.agents/skills/hive-mind-council'
```

## Autonomous by Default

The Hive Skill is designed to run as an autonomous loop.
You do not need to manually ask it to plan, code, validate, and summarize. Invoke the skill once, give it the goal, and it will continue through the council loop until the goal is completed, validated, or blocked by a clear stop condition.

Example:
Use The Hive Skill to fix the failing login flow.
The skill will automatically:
1. Inspect relevant files.
2. Find the likely cause.
3. Plan the smallest safe fix.
4. Implement the change.
5. Run validation.
6. Fix validation failures.
7. Produce a final report.

## Token Efficient by Design

The Hive Skill avoids unnecessary context usage by default.
It uses:
- Targeted file inspection
- Compact role outputs
- Minimal planning overhead
- Reused findings
- Short state summaries
- Focused validation loops

This makes it practical for long coding sessions and agentic tools with limited context windows.

## Role Table

| Role | Responsibility |
|---|---|
| **Queen** | Coordinates the council, makes final decisions, and ensures the goal is met. |
| **Scout** | Explores the codebase and gathers necessary context. |
| **Architect** | Designs the solution and plans the changes. |
| **Forger** | Writes the code and implements the Architect's plan. |
| **Sentinel** | Validates the changes, runs tests, and ensures quality. |
| **Scribe** | Documents the process and writes the final report. |

## Release Status
Current version: v0.1.0

## License
Licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Security Warning
Please review the [SECURITY.md](SECURITY.md) file before using or contributing to this project.
