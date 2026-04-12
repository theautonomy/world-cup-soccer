---
name: world-cup
description: 2026 FIFA World Cup — team profiles, match previews, player spotlights, group pages
user_invocable: true
args: mode
argument-hint: "team {name} | audit | audit {name} | match {team1} vs {team2} | player {name} | group {A-L}"
---

# world-cup — Router

## Mode Routing

Determine the mode from `{{mode}}`:

| Input | Mode |
|-------|------|
| (empty / no args) | `discovery` — show command menu |
| `team {name}` | `team` |
| `audit` | `audit` — run `node audit.mjs` on all teams |
| `audit {name}` | `audit` — run `node audit.mjs {slug}` on one team |
| `match {team1} vs {team2}` | `match` |
| `player {name}` | `player` |
| `group {letter}` | `group` |

---

## Discovery Mode

```
world-cup 2026 — 指令中心

可用指令：
  /world-cup team {球队名}              → 研究球队并生成 JSON 数据
  /world-cup audit                      → 审计所有球队 JSON 文件
  /world-cup audit {球队名}             → 审计单支球队
  /world-cup match {球队1} vs {球队2}   → 赛前分析与头对头数据
  /world-cup player {球员名}            → 球员专题页
  /world-cup group {A-L}               → 小组赛页面

2026年世界杯共48支球队，在美国、加拿大、墨西哥三国举办。
```

---

## Context Loading

All modes: read the relevant `modes/{mode}.md` file before executing.

| Mode | File to read |
|------|-------------|
| `team` | `modes/team.md` |
| `audit` | `modes/audit.md` |
| `match` | `modes/match.md` |
| `player` | `modes/player.md` |
| `group` | `modes/group.md` |

Modes requiring research: use WebSearch + WebFetch to gather data.
