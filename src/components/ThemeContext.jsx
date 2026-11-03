import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContextInstance'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('yj_devops_theme')
        if (stored === 'light' || stored === 'dark') return stored
      } catch {
        // Fallback to dark if localStorage is restricted
      }
      return 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('yj_devops_theme', theme)
    } catch {
      // Ignore storage write errors
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const isDark = theme === 'dark'

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
