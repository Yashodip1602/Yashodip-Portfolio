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

  // Close mobile menu on Escape key and lock body scroll while open
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-surface/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="site-container h-16 flex items-center justify-between gap-2">
        {/* Logo "YJ" */}
        <a
          href="#"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg px-1.5 py-1 min-h-[2.75rem] shrink-0"
          aria-label="Yashodip Jejurkar Home"
        >
          <div className="w-9 h-9 rounded-lg bg-surface-2 border border-accent/40 flex items-center justify-center text-accent group-hover:border-accent group-hover:shadow-[0_0_12px_rgba(6,182,212,0.35)] transition-all shrink-0">
            <span className="font-mono font-bold text-sm tracking-tight text-accent">
              YJ
            </span>
          </div>
          <div className="hidden min-[360px]:flex flex-col text-left">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-text group-hover:text-accent transition-colors">
              yashodip.dev
            </span>
            <span className="font-mono text-[10px] text-emerald-500 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              DevOps Node
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs" aria-label="Main Navigation">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-2.5 xl:px-3 py-2 min-h-[2.75rem] inline-flex items-center rounded-md transition-colors whitespace-nowrap ${
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Status Indicator Pill - stays visible across all screens */}
          <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 whitespace-nowrap">
            <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 animate-pulse shrink-0" />
            <span className="font-medium">Open to roles</span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            type="button"
            className="lg:hidden min-w-[2.75rem] min-h-[2.75rem] inline-flex items-center justify-center p-2.5 rounded-lg border border-border bg-surface text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Slide-In Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] bg-bg/80 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Slide-in Drawer Panel */}
            <motion.nav
              aria-label="Mobile Navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.24, ease: 'easeOut' }}
              className="lg:hidden fixed right-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] w-[min(100vw,22rem)] bg-surface border-l border-border shadow-2xl z-50 overflow-y-auto px-4 py-6 pb-[calc(2rem+env(safe-area-inset-bottom))] flex flex-col justify-between"
            >
              <div className="flex flex-col gap-2 font-mono text-base">
                {navLinks.map(link => {
                  const isActive = activeSection === link.href.replace('#', '')
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`min-h-[2.75rem] px-3.5 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                        isActive
                          ? 'text-accent font-semibold bg-accent/10 border border-accent/30'
                          : 'text-text hover:text-accent hover:bg-surface-2'
                      }`}
                    >
                      <span>
                        <span className="text-accent mr-2">$ cd</span>
                        {link.name.toLowerCase()}
                      </span>
                      <span className="text-xs text-muted">→</span>
                    </a>
                  )
                })}
              </div>

              <div className="pt-4 mt-6 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span>{personalData.availability}</span>
                </span>
                <span className="text-muted font-mono">Rahata, IN</span>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
