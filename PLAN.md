# World Cup Soccer — Feature Plan

## Roadmap

| Step | Feature | Description | Status |
|------|---------|-------------|--------|
| 1 | `/world-cup audit` | Validate all JSON files — catch missing fields, invalid JSON, thin data | ✅ Done |
| 2 | Generate all 48 teams | Run `/world-cup team {name}` for every nation, audit each one | 🔜 Next |
| 2b | `/world-cup refine {team}` | Search for latest info (squad updates, coach changes, recent form) and update JSON | ✅ Done |
| 3 | Group stage draw | Add group (A–L) to each team JSON + show on team card and team page | ✅ Done |
| 4 | `/world-cup group {A–L}` | Full group page: all 4 teams, schedule, predictions | ✅ Done |
| 5 | `/world-cup match {t1} vs {t2}` | Head-to-head stats, historical meetings, prediction | 🔜 Planned |
| 5b | `/world-cup refine match {t1} vs {t2}` | Refresh with latest news, injuries, form ahead of the fixture | 🔜 Planned |
| 6 | `/world-cup player {name}` | Player spotlight page, linked from team pages | 🔜 Planned |
| 6b | `/world-cup refine player {name}` | Search for latest stats, form, injuries and update player JSON | 🔜 Planned |
| 7 | App features | Search, sort, filter, continent grouping on Home grid | 🔜 Planned |

### Why this order

- **Data quality first** — everything else depends on clean JSON. The validator catches silent failures (e.g. curly quotes breaking JSON.parse) before they compound.
- **All 48 teams before features** — group, match, and player pages are only compelling with full data.
- **Refine after bulk generation** — once all 48 are generated, a targeted refresh pass keeps squads current as rosters are finalized ahead of the tournament.
- **Group before match** — group draw is low effort (12 values) and unlocks the group page.
- **Match before player** — match mode naturally surfaces key players from both squads; the two features feed each other.
- **Player last (before polish)** — player data already exists in team JSONs; dedicated pages work best when linked from team pages, so build them together. 48 teams × ~26 players = 1,200+ potential pages — solid team data is the foundation.
- **App features last** — search and sort are only valuable once there are enough teams to warrant them.

---

## Backlog (no fixed order)

### Richer Team Pages
- Stadium info for the host cities
- Odds / prediction section
- Recent form (last 5–10 matches)

### Social / Sharing
- Open Graph meta tags so team pages preview nicely when shared
- Shareable URL with lang/theme preserved in query params

### App Features
- Search / filter on the Home page
- Sort by FIFA rank, continent, titles
- Comparison mode — pick 2 teams side by side
- Continent grouping on the Home grid
