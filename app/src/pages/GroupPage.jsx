import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Controls from '../components/Controls.jsx'
import T from '../components/T.jsx'
import { useApp } from '../context/AppContext.jsx'
import styles from './GroupPage.module.css'

export default function GroupPage() {
  const { letter } = useParams()
  const group = letter.toUpperCase()
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { lang } = useApp()

  useEffect(() => {
    fetch('/world-cup-soccer/data/groups.json')
      .then(r => r.json())
      .then(async data => {
        const slugs = data.groups?.[group] || []
        if (slugs.length === 0) { setError(true); setLoading(false); return }

        const results = await Promise.all(
          slugs.map(slug =>
            fetch(`/world-cup-soccer/data/teams/${slug}.json`)
              .then(r => r.ok ? r.json() : null)
              .catch(() => null)
          )
        )
        setTeams(results.filter(Boolean))
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [group])

  const sorted = [...teams].sort((a, b) => a.team.fifa_rank - b.team.fifa_rank)

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <Controls />
        <div className={styles.spinner}>⚽</div>
      </div>
    )
  }

  if (error || teams.length === 0) {
    return (
      <div className={styles.errorPage}>
        <Controls />
        <div className={styles.errorBox}>
          <div className={styles.errorIcon}>⚽</div>
          <h1><T zh={`第 ${group} 组`} en={`Group ${group}`} /></h1>
          <p><T zh="暂无球队数据，请先生成球队 JSON" en="No team data yet — generate team JSONs first" /></p>
          <code className={styles.code}>/world-cup team {'{name}'}</code>
          <div style={{ marginTop: 24 }}>
            <Link to="/" className={styles.backLink}>← <T zh="返回首页" en="Back to Home" /></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Controls />

      <Link to="/" className={styles.backBtn}>
        ← <T zh="所有球队" en="All Teams" />
      </Link>

      {/* Header */}
      <header className={styles.hero}>
        <div className={styles.groupLabel}>
          <T zh={`第 ${group} 组`} en={`Group ${group}`} />
        </div>
        <div className={styles.flags}>
          {teams.map(t => (
            <span key={t.meta.slug} className={styles.flagEmoji}>{t.team.flag_emoji}</span>
          ))}
        </div>
        <p className={styles.subtitle}>
          <T zh="2026 FIFA 世界杯" en="2026 FIFA World Cup" />
          {' · '}
          <T zh={`${teams.length} 支球队`} en={`${teams.length} teams`} />
        </p>
      </header>

      {/* Team cards */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <T zh="本组球队" en="Teams" />
        </h2>
        <div className={styles.teamGrid}>
          {sorted.map((t, i) => (
            <Link key={t.meta.slug} to={`/teams/${t.meta.slug}`} className={styles.teamCard}>
              <div className={styles.seedNum}>{i + 1}</div>
              <div className={styles.teamFlag}>{t.team.flag_emoji}</div>
              <div className={styles.teamInfo}>
                <div className={styles.teamName}>
                  {lang === 'zh' ? t.team.name_zh : t.team.name_en}
                </div>
                <div className={styles.teamMeta}>
                  <span className={styles.metaTag}>{t.team.federation}</span>
                  <span className={styles.metaTag}>
                    FIFA #{t.team.fifa_rank}
                  </span>
                </div>
              </div>
              <div className={styles.teamStats}>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>{t.world_cup.titles}</span>
                  <span className={styles.statLabel}><T zh="冠军" en="Titles" /></span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>{t.world_cup.appearances}</span>
                  <span className={styles.statLabel}><T zh="参赛" en="Apps" /></span>
                </div>
              </div>
              <div className={styles.arrow}>→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Prediction */}
      {sorted.length >= 2 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <T zh="晋级预测" en="Predicted Qualifiers" />
          </h2>
          <p className={styles.predNote}>
            <T zh="基于 FIFA 排名，预测前两名晋级淘汰赛" en="Based on FIFA rankings — top two predicted to advance" />
          </p>
          <div className={styles.predGrid}>
            {sorted.slice(0, 2).map((t, i) => (
              <Link key={t.meta.slug} to={`/teams/${t.meta.slug}`} className={styles.predCard}>
                <div className={styles.predRank}>
                  {i === 0 ? '🥇' : '🥈'}
                </div>
                <div className={styles.predFlag}>{t.team.flag_emoji}</div>
                <div className={styles.predName}>
                  {lang === 'zh' ? t.team.name_zh : t.team.name_en}
                </div>
                <div className={styles.predFifa}>FIFA #{t.team.fifa_rank}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Group nav */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <T zh="其他分组" en="Other Groups" />
        </h2>
        <div className={styles.groupNav}>
          {'ABCDEFGHIJKL'.split('').map(g => (
            <Link
              key={g}
              to={`/groups/${g.toLowerCase()}`}
              className={`${styles.groupBtn} ${g === group ? styles.groupBtnActive : ''}`}
            >
              {g}
            </Link>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <T
          zh={`第 ${group} 组 · 2026 FIFA 世界杯 · 由 Claude Code 生成`}
          en={`Group ${group} · 2026 FIFA World Cup · Built with Claude Code`}
        />
      </footer>
    </div>
  )
}
