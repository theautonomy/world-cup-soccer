import T from './T.jsx'
import { useApp } from '../context/AppContext.jsx'
import styles from './WCHistory.module.css'

const ROW_CLASS_LABELS = {
  champion: { zh: '冠军', en: 'Champion', color: '#FFD700' },
  'runner-up': { zh: '亚军', en: 'Runner-up', color: '#C0C0C0' },
  semifinal: { zh: '四强', en: 'Semi-final', color: '#4ade80' },
  quarterfinal: { zh: '八强', en: 'Quarter-final', color: '#60a5fa' },
  'round-of-16': { zh: '十六强', en: 'Round of 16', color: '#a78bfa' },
  group: { zh: '小组赛', en: 'Group Stage', color: '#94a3b8' },
  'did-not-qualify': { zh: '未参赛', en: 'Did Not Qualify', color: '#475569' },
}

export default function WCHistory({ worldCup }) {
  const { lang } = useApp()

  const sorted = [...(worldCup.history || [])].sort((a, b) => b.year - a.year)

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        <T zh="世界杯历史" en="World Cup History" />
      </h2>

      <div className={styles.legend}>
        {Object.entries(ROW_CLASS_LABELS).map(([key, val]) => (
          <span key={key} className={styles.legendItem} style={{ '--dot': val.color }}>
            {lang === 'zh' ? val.zh : val.en}
          </span>
        ))}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th><T zh="年份" en="Year" /></th>
              <th><T zh="举办国" en="Host" /></th>
              <th><T zh="成绩" en="Result" /></th>
              <th><T zh="备注" en="Notes" /></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const meta = ROW_CLASS_LABELS[row.row_class] || {}
              return (
                <tr key={row.year} className={styles[row.row_class] || ''} style={{ '--row-color': meta.color }}>
                  <td className={styles.year}>{row.year}</td>
                  <td>{lang === 'zh' ? row.host_zh : row.host_en}</td>
                  <td>
                    <span className={styles.resultBadge} style={{ background: `${meta.color}22`, color: meta.color, borderColor: `${meta.color}44` }}>
                      {lang === 'zh' ? row.result_zh : row.result_en}
                    </span>
                  </td>
                  <td className={styles.note}>{lang === 'zh' ? row.note_zh : row.note_en}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
