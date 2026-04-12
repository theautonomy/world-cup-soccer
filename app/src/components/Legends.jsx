import T from './T.jsx'
import { useApp } from '../context/AppContext.jsx'
import styles from './Legends.module.css'

export default function Legends({ legends = [] }) {
  const { lang } = useApp()

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        <T zh="历史传奇球员" en="All-Time Legends" />
      </h2>

      <div className={styles.grid}>
        {legends.map((legend, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.number}>#{legend.number || i + 1}</div>
            <div className={styles.name}>
              {lang === 'zh' ? legend.name_zh : legend.name_en}
            </div>
            <div className={styles.meta}>
              <span className={styles.years}>{legend.years}</span>
              <span className={styles.position}>
                {lang === 'zh' ? legend.position_zh : legend.position_en}
              </span>
            </div>
            <p className={styles.bio}>
              {lang === 'zh' ? legend.bio_zh : legend.bio_en}
            </p>
            {legend.stat_value && (
              <div className={styles.stat}>
                <span className={styles.statValue}>{legend.stat_value}</span>
                <span className={styles.statLabel}>
                  {lang === 'zh' ? legend.stat_zh : legend.stat_en}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
