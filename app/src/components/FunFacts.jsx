import T from './T.jsx'
import { useApp } from '../context/AppContext.jsx'
import styles from './FunFacts.module.css'

export default function FunFacts({ facts = [] }) {
  const { lang } = useApp()

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        <T zh="你知道吗？" en="Did You Know?" />
      </h2>

      <div className={styles.grid}>
        {facts.map((f, i) => (
          <div key={i} className={styles.card}>
            <span className={styles.icon}>{f.icon}</span>
            <p className={styles.text}>
              {lang === 'zh' ? f.text_zh : f.text_en}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
