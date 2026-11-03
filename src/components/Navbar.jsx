import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Radio } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { personalData } from '../data/personal'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Impact', href: '#impact' },
  { name: 'Blog', href: '#blog' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Reset to hero if near the top
      if (window.scrollY < 200) {
        setActiveSection('hero')
        return
      }

      // Check if user has scrolled near the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80

      if (isAtBottom) {
        setActiveSection('contact')
        return
      }

      // Determine active section using viewport positions
      const sections = ['about', 'skills', 'projects', 'impact', 'blog', 'experience', 'contact']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Section is active if top is within upper half of viewport and bottom is below header
          if (rect.top <= 260 && rect.bottom >= 120) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo "YJ" */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg px-2 py-1"
          aria-label="Yashodip Jejurkar Home"
        >
          <div className="w-9 h-9 rounded-lg bg-surface-2 border border-accent/40 flex items-center justify-center text-accent group-hover:border-accent group-hover:shadow-[0_0_12px_rgba(6,182,212,0.35)] transition-all">
            <span className="font-mono font-bold text-sm tracking-tight text-accent">
              YJ
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-sm font-semibold tracking-tight text-text group-hover:text-accent transition-colors">
              yashodip.dev
            </span>
            <span className="font-mono text-[10px] text-emerald-500 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              DevOps Node
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs" aria-label="Main Navigation">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? 'text-accent font-semibold bg-accent/10 border border-accent/30'
                    : 'text-muted hover:text-text hover:bg-surface-2'
                }`}
              >
                <span className="text-accent/70 mr-0.5">/</span>
                {link.name.toLowerCase()}
              </a>
            )
          })}
        </nav>

        {/* Right side controls: Availability badge, Theme Toggle & Mobile hamburger */}
        <div className="flex items-center gap-3">
          {/* Status Indicator Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium">Open to roles</span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            type="button"
            className="md:hidden p-2 rounded-lg border border-border bg-surface text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-surface/98 backdrop-blur-xl px-4 py-4 shadow-lg"
          >
            <div className="flex flex-col gap-2 font-mono text-sm">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-text hover:text-accent hover:bg-surface-2 transition-colors flex items-center justify-between"
                >
                  <span>
                    <span className="text-accent mr-2">$ cd</span>
                    {link.name.toLowerCase()}
                  </span>
                  <span className="text-xs text-muted">→</span>
                </a>
              ))}
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-emerald-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {personalData.availability}
                </span>
                <span className="text-muted font-mono">Nashik, IN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
