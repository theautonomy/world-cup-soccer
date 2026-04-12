/**
 * T — bilingual text component
 * <T zh="中文" en="English" />
 */
import { useApp } from '../context/AppContext.jsx'

export default function T({ zh, en, className }) {
  const { lang } = useApp()
  return <span className={className}>{lang === 'zh' ? zh : en}</span>
}
