# World Cup Soccer — 2026 FIFA World Cup Agent Skill

## What this is

An AI agent skill that generates stunning bilingual (Simplified Chinese / English) HTML profile pages for all 48 nations competing in the 2026 FIFA World Cup, hosted across the USA, Canada, and Mexico.

Invoke with: `/world-cup team {name}`

## Project Structure

```
world-cup-soccer/
  .claude/skills/world-cup/SKILL.md   — skill router
  modes/team.md                        — team page mode (research + generation)
  templates/team-template.html         — bilingual HTML template
  output/teams/                        — generated pages (gitignored)
  CLAUDE.md                            — this file
```

## Skill Entry Point

`.claude/skills/world-cup/SKILL.md` — routes `/world-cup {mode}` commands.

Current modes:
| Command | Mode | Status |
|---------|------|--------|
| `/world-cup team {name}` | `team` | ✅ Ready |
| `/world-cup match {t1} vs {t2}` | `match` | 🔜 Planned |
| `/world-cup player {name}` | `player` | 🔜 Planned |
| `/world-cup group {A-L}` | `group` | 🔜 Planned |

## How team mode works

1. **Research** — WebSearch for country info, WC history, 2026 squad, legends, rivalries, fun facts
2. **Generate** — fill all `{{PLACEHOLDER}}` tokens in `templates/team-template.html`
3. **Write** — save to `output/teams/{slug}.html`

## Template Design

- Style: vibrant fan energy — saturated colors, animated flag, glowing gradients
- Colors: CSS variables (`--color-primary/secondary/accent`) set per team from kit colors
- Font: `Noto Sans SC` (Chinese) + `Inter` (English) — switches with language toggle
- Language toggle: fixed pill button (中文 / EN), top-right, saves preference to localStorage
- Sections: Hero → Stats Bar → Country Profile → WC History → 2026 Squad → Legends → Rivalries → Fun Facts

## Bilingual Implementation

Every text element has two versions:
```html
<span class="zh">中文内容</span>
<span class="en">English content</span>
```

CSS on `<html data-lang="zh|en">` shows/hides the appropriate spans.
All dynamic placeholders have `_ZH` and `_EN` variants for narrative content.

## Output Naming

`output/teams/{slug}.html` where slug = lowercase English team name, spaces → hyphens.

Examples: `brazil.html`, `south-korea.html`, `united-states.html`

## Adding New Modes

1. Create `modes/{mode}.md` with research and generation instructions
2. Add routing entry to `.claude/skills/world-cup/SKILL.md`
3. Add template to `templates/` if needed
4. Update the modes table above

## 2026 World Cup Facts

- 48 teams (expanded from 32)
- 3 host nations: USA, Canada, Mexico
- 16 groups of 3 teams
- Dates: June 11 – July 19, 2026
- FIFA ranking cutoff for seeding: March 2026
