import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './useTheme'

export const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center min-w-[2.75rem] min-h-[2.75rem] p-2.5 rounded-lg border border-border bg-surface hover:bg-surface-2 text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors backdrop-blur-sm cursor-pointer shadow-sm ${className}`}
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-accent" />
        )}
      </motion.div>
    </button>
  )
}

export default ThemeToggle
