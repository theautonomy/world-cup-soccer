import { useApp } from '../context/AppContext.jsx'
import styles from './Controls.module.css'

export default function Controls() {
  const { lang, theme, toggleLang, toggleTheme } = useApp()

  return (
    <div className={styles.controls}>
      <button className={styles.themeBtn} onClick={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <button className={styles.langToggle} onClick={toggleLang}>
        {lang === 'zh' ? 'EN' : '中文'}
      </button>
    </div>
  )
}
