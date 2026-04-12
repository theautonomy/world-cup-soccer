import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('wc-lang') || 'zh')
  const [theme, setTheme] = useState(() => localStorage.getItem('wc-theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('wc-lang', lang)
    document.documentElement.setAttribute('data-lang', lang)
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  useEffect(() => {
    localStorage.setItem('wc-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleLang() {
    setLang(l => l === 'zh' ? 'en' : 'zh')
  }

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <AppContext.Provider value={{ lang, theme, toggleLang, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
