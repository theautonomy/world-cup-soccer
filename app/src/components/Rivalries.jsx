import T from './T.jsx'
import { useApp } from '../context/AppContext.jsx'
import styles from './Rivalries.module.css'

export default function Rivalries({ rivalries = [] }) {
  const { lang } = useApp()

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        <T zh="经典宿敌" en="Classic Rivalries" />
      </h2>

      <div className={styles.grid}>
        {rivalries.map((r, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.vs}>⚽</div>
            <h3 className={styles.opponent}>
              {lang === 'zh' ? r.opponent_zh : r.opponent_en}
            </h3>
            <p className={styles.desc}>
              {lang === 'zh' ? r.desc_zh : r.desc_en}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
