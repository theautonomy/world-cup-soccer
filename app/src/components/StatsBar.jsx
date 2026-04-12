import T from './T.jsx'
import styles from './StatsBar.module.css'

export default function StatsBar({ worldCup, team }) {
  const stats = [
    {
      value: worldCup.titles,
      zh: '冠军次数',
      en: 'World Cup Titles',
    },
    {
      value: worldCup.appearances,
      zh: '参赛届次',
      en: 'Appearances',
    },
    {
      value: <T zh={worldCup.best_result_zh} en={worldCup.best_result_en} />,
      zh: '最佳成绩',
      en: 'Best Result',
    },
    {
      value: `#${team.fifa_rank}`,
      zh: 'FIFA 排名',
      en: 'FIFA Rank',
    },
  ]

  return (
    <div className={styles.bar}>
      {stats.map((s, i) => (
        <div key={i} className={styles.stat}>
          <div className={styles.value}>{s.value}</div>
          <div className={styles.label}>
            <T zh={s.zh} en={s.en} />
          </div>
        </div>
      ))}
    </div>
  )
}
