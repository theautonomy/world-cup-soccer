import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import T from '../components/T.jsx'
import Controls from '../components/Controls.jsx'
import { useApp } from '../context/AppContext.jsx'
import styles from './Home.module.css'

const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L']

export default function Home() {
  const [teams, setTeams] = useState([])
  const [groupMap, setGroupMap] = useState({})  // slug → group letter
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeGroup = searchParams.get('group') || 'ALL'
  function setActiveGroup(g) {
    if (g === 'ALL') setSearchParams({})
    else setSearchParams({ group: g })
  }
  const { lang } = useApp()

  useEffect(() => {
    Promise.all([
      fetch('/world-cup-soccer/data/teams/index.json').then(r => r.json()).catch(() => []),
      fetch('/world-cup-soccer/data/groups.json').then(r => r.json()).catch(() => ({})),
    ]).then(([teamsData, groupsData]) => {
      setTeams(teamsData)
      // Build reverse map: slug → group letter
      const map = {}
      for (const [letter, slugs] of Object.entries(groupsData.groups || {})) {
        for (const slug of slugs) map[slug] = letter
      }
      setGroupMap(map)
      setLoading(false)
    })
  }, [])

  const visibleTeams = activeGroup === 'ALL'
    ? teams
    : teams.filter(t => groupMap[t.slug] === activeGroup)

  // Which groups actually have generated teams?
  const populatedGroups = GROUPS.filter(g =>
    teams.some(t => groupMap[t.slug] === g)
  )

  return (
    <div className={styles.page}>
      <Controls />

      <header className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.year}>2026</span>
          <span>FIFA World Cup</span>
        </h1>
        <p className={styles.subtitle}>
          <T zh="美国 · 加拿大 · 墨西哥 · 2026年6月11日 — 7月19日" en="USA · Canada · Mexico · June 11 – July 19, 2026" />
        </p>
        <div className={styles.badge}>
          {teams.length} / 48 <T zh="支球队" en="teams" />
        </div>
      </header>

      {!loading && teams.length > 0 && (
        <div className={styles.filterBar}>
          <button
            className={`${styles.filterBtn} ${activeGroup === 'ALL' ? styles.active : ''}`}
            onClick={() => setActiveGroup('ALL')}
          >
            <T zh="全部" en="All" />
          </button>
          {populatedGroups.map(g => (
            <button
              key={g}
              className={`${styles.filterBtn} ${activeGroup === g ? styles.active : ''}`}
              onClick={() => setActiveGroup(g)}
            >
              <T zh={`${g}组`} en={`Group ${g}`} />
            </button>
          ))}
          {activeGroup !== 'ALL' && (
            <Link to={`/groups/${activeGroup.toLowerCase()}`} className={styles.groupPageLink}>
              <T zh={`查看第${activeGroup}组详情 →`} en={`View Group ${activeGroup} page →`} />
            </Link>
          )}
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>
          <T zh="加载中…" en="Loading…" />
        </div>
      ) : teams.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>
            <T zh="暂无球队数据" en="No teams generated yet" />
          </p>
          <p className={styles.emptyHint}>
            <T
              zh="在 Claude Code 中运行 /world-cup team Brazil 开始生成"
              en="Run /world-cup team Brazil in Claude Code to get started"
            />
          </p>
          <code className={styles.code}>/world-cup team Brazil</code>
        </div>
      ) : (
        <div className={styles.grid}>
          {visibleTeams.map(t => (
            <Link key={t.slug} to={`/teams/${t.slug}`} className={styles.card}>
              {groupMap[t.slug] && (
                <div className={styles.groupBadge}>
                  <T zh={`${groupMap[t.slug]}组`} en={`Group ${groupMap[t.slug]}`} />
                </div>
              )}
              <div className={styles.flag}>{t.flag_emoji}</div>
              <div className={styles.teamName}>
                {lang === 'zh' ? t.name_zh : t.name_en}
              </div>
              {t.fifa_rank && (
                <div className={styles.rank}>#{t.fifa_rank}</div>
              )}
            </Link>
          ))}
        </div>
      )}

      <footer className={styles.footer}>
        <T
          zh="2026 FIFA 世界杯 · AI 生成球队资料 · 由 Claude Code 驱动"
          en="2026 FIFA World Cup · AI-generated profiles · Built with Claude Code"
        />
      </footer>
    </div>
  )
}
