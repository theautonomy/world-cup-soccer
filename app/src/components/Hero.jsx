import T from './T.jsx'
import styles from './Hero.module.css'

export default function Hero({ team }) {
  return (
    <section className={styles.hero}>
      <div className={styles.flag}>{team.flag_emoji}</div>
      <h1 className={styles.name}>
        <T zh={team.name_zh} en={team.name_en} />
      </h1>
      <div className={styles.meta}>
        <span className={styles.federation}>{team.federation}</span>
        <span className={styles.rank}>
          <T zh="FIFA 排名" en="FIFA Rank" /> <strong>#{team.fifa_rank}</strong>
        </span>
        {team.group && (
          <span className={styles.group}>
            <T zh={`${team.group} 组`} en={`Group ${team.group}`} />
          </span>
        )}
      </div>
    </section>
  )
}
