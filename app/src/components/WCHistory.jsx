import T from './T.jsx'
import { useApp } from '../context/AppContext.jsx'
import styles from './WCHistory.module.css'

const ROW_CLASS_LABELS = {
  champion: { zh: '冠军', en: 'Champion', color: '#FFD700' },
  final: { zh: '亚军', en: 'Runner-up', color: '#C0C0C0' },
  'runner-up': { zh: '亚军', en: 'Runner-up', color: '#C0C0C0' },
  semifinal: { zh: '四强', en: 'Semi-final', color: '#4ade80' },
  quarterfinal: { zh: '八强', en: 'Quarter-final', color: '#60a5fa' },
  'round-of-16': { zh: '十六强', en: 'Round of 16', color: '#a78bfa' },
  group: { zh: '小组赛', en: 'Group Stage', color: '#94a3b8' },
  'did-not-qualify': { zh: '未参赛', en: 'Did Not Qualify', color: '#475569' },
}

const WC_HOSTS = {
  1930: { zh: '乌拉圭', en: 'Uruguay' },
  1934: { zh: '意大利', en: 'Italy' },
  1938: { zh: '法国', en: 'France' },
  1950: { zh: '巴西', en: 'Brazil' },
  1954: { zh: '瑞士', en: 'Switzerland' },
  1958: { zh: '瑞典', en: 'Sweden' },
  1962: { zh: '智利', en: 'Chile' },
  1966: { zh: '英格兰', en: 'England' },
  1970: { zh: '墨西哥', en: 'Mexico' },
  1974: { zh: '西德', en: 'West Germany' },
  1978: { zh: '阿根廷', en: 'Argentina' },
  1982: { zh: '西班牙', en: 'Spain' },
  1986: { zh: '墨西哥', en: 'Mexico' },
  1990: { zh: '意大利', en: 'Italy' },
  1994: { zh: '美国', en: 'USA' },
  1998: { zh: '法国', en: 'France' },
  2002: { zh: '韩/日', en: 'Korea/Japan' },
  2006: { zh: '德国', en: 'Germany' },
  2010: { zh: '南非', en: 'South Africa' },
  2014: { zh: '巴西', en: 'Brazil' },
  2018: { zh: '俄罗斯', en: 'Russia' },
  2022: { zh: '卡塔尔', en: 'Qatar' },
  2026: { zh: '美/加/墨', en: 'USA/CAN/MEX' },
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
        {Object.entries(ROW_CLASS_LABELS).filter(([k]) => k !== 'runner-up').map(([key, val]) => (
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
              const host = WC_HOSTS[row.year] || {}
              // Support both result_zh/en (new schema) and stage_zh/en (our generated schema)
              const resultZh = row.result_zh || row.stage_zh || ''
              const resultEn = row.result_en || row.stage_en || ''
              const hostZh = row.host_zh || host.zh || ''
              const hostEn = row.host_en || host.en || ''
              return (
                <tr key={row.year} className={styles[row.row_class] || ''} style={{ '--row-color': meta.color }}>
                  <td className={styles.year}>{row.year}</td>
                  <td>{lang === 'zh' ? hostZh : hostEn}</td>
                  <td>
                    <span className={styles.resultBadge} style={{ background: `${meta.color}22`, color: meta.color, borderColor: `${meta.color}44` }}>
                      {lang === 'zh' ? resultZh : resultEn}
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
