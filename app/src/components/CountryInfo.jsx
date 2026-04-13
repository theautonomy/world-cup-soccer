import T from './T.jsx'
import { useApp } from '../context/AppContext.jsx'
import styles from './CountryInfo.module.css'

export default function CountryInfo({ country }) {
  const { lang } = useApp()

  // Support both flat string fields and zh/en bilingual fields
  const capital = country.capital || (lang === 'zh' ? country.capital_zh : country.capital_en)
  const population = (() => {
    if (country.population_zh || country.population_en)
      return lang === 'zh' ? country.population_zh : country.population_en
    if (typeof country.population === 'number')
      return lang === 'zh'
        ? country.population.toLocaleString('zh-CN') + ' 人'
        : country.population.toLocaleString('en-US') + ' people'
    return country.population
  })()
  const area = typeof country.area === 'number'
    ? country.area.toLocaleString() + ' km²'
    : country.area

  const stats = [
    { icon: '🏛️', label: { zh: '首都', en: 'Capital' }, value: capital },
    { icon: '👥', label: { zh: '人口', en: 'Population' }, value: population },
    { icon: '📐', label: { zh: '面积', en: 'Area' }, value: area },
    {
      icon: '🗣️',
      label: { zh: '语言', en: 'Language' },
      value: lang === 'zh' ? country.language_zh : country.language_en,
    },
    {
      icon: '🌍',
      label: { zh: '洲际', en: 'Continent' },
      value: lang === 'zh' ? country.continent_zh : country.continent_en,
    },
    {
      icon: '💰',
      label: { zh: '货币', en: 'Currency' },
      value: lang === 'zh' ? country.currency_zh : country.currency_en,
    },
    {
      icon: '🎵',
      label: { zh: '国歌', en: 'Anthem' },
      value: lang === 'zh' ? country.anthem_zh : country.anthem_en,
    },
  ]

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        <T zh="国家概况" en="Country Profile" />
      </h2>

      <div className={styles.grid}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statCard}>
            <span className={styles.icon}>{s.icon}</span>
            <div className={styles.statBody}>
              <div className={styles.statLabel}>
                <T zh={s.label.zh} en={s.label.en} />
              </div>
              <div className={styles.statValue}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.descGrid}>
        <div className={styles.descCard}>
          <h3 className={styles.descTitle}>
            <T zh="地理与文化" en="Geography & Culture" />
          </h3>
          <p className={styles.descText}>
            <T zh={country.desc_zh} en={country.desc_en} />
          </p>
        </div>
        <div className={styles.descCard}>
          <h3 className={styles.descTitle}>
            <T zh="足球文化" en="Football Culture" />
          </h3>
          <p className={styles.descText}>
            <T zh={country.football_desc_zh} en={country.football_desc_en} />
          </p>
        </div>
      </div>
    </section>
  )
}
