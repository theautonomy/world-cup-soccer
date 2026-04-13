import T from './T.jsx'
import { useApp } from '../context/AppContext.jsx'
import styles from './Squad.module.css'

const POSITION_COLORS = {
  GK: { bg: '#FFA500', label: 'GK' },
  DEF: { bg: '#3b82f6', label: 'DEF' },
  MID: { bg: '#22c55e', label: 'MID' },
  FWD: { bg: '#ef4444', label: 'FWD' },
}

const POSITION_ORDER = ['GK', 'DEF', 'MID', 'FWD']

// Map detailed position strings (our JSON schema) to the 4 display categories
function getPositionCategory(p) {
  if (p.position && POSITION_ORDER.includes(p.position)) return p.position
  const raw = (p.position_en || p.position || '').toUpperCase()
  if (raw.includes('GK') || raw.includes('GOALKEEPER')) return 'GK'
  if (raw.includes('CB') || raw.includes('LB') || raw.includes('RB') || raw.includes('DEF') || raw.includes('SW') || raw.includes('WB')) return 'DEF'
  if (raw.includes('DM') || raw.includes('CM') || raw.includes('MID')) return 'MID'
  if (raw.includes('AM') || raw.includes('FWD') || raw.includes('ST') || raw.includes('CF') || raw.includes('LW') || raw.includes('RW')) return 'FWD'
  return 'MID'
}

export default function Squad({ squad }) {
  const { lang } = useApp()
  const { coach, players = [] } = squad

  const grouped = POSITION_ORDER.reduce((acc, pos) => {
    acc[pos] = players.filter(p => getPositionCategory(p) === pos)
    return acc
  }, {})

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        <T zh="2026 世界杯阵容" en="2026 World Cup Squad" />
      </h2>

      {coach && (
        <div className={styles.coachCard}>
          <span className={styles.coachIcon}>🧑‍💼</span>
          <div>
            <div className={styles.coachLabel}>
              <T zh="主教练" en="Head Coach" />
            </div>
            <div className={styles.coachName}>
              {coach.name || (lang === 'zh' ? coach.name_zh : coach.name_en)}
            </div>
            <div className={styles.coachNat}>
              {lang === 'zh' ? coach.nationality_zh : coach.nationality_en}
            </div>
          </div>
        </div>
      )}

      {POSITION_ORDER.map(pos => {
        const group = grouped[pos]
        if (!group || group.length === 0) return null
        const meta = POSITION_COLORS[pos]
        return (
          <div key={pos} className={styles.posGroup}>
            <div className={styles.posLabel} style={{ '--pos-color': meta.bg }}>
              {pos}
            </div>
            <div className={styles.playerGrid}>
              {group.map((p, i) => (
                <div key={i} className={styles.playerCard}>
                  <div className={styles.playerPos} style={{ background: meta.bg }}>
                    {p.position_en ? p.position_en.replace(/\s*\(.*\)/, '') : pos}
                  </div>
                  <div className={styles.playerInfo}>
                    <div className={styles.playerName}>
                      {p.name || (lang === 'zh' ? p.name_zh : p.name_en)}
                    </div>
                    <div className={styles.playerMeta}>
                      <span className={styles.club}>{p.club}</span>
                      {p.caps != null && (
                        <span className={styles.caps}>
                          {p.caps} <T zh="出场次数" en="caps" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
