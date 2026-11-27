import { Suspense, lazy, useEffect, useState } from 'react'
import { ThemeProvider } from './components/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Impact from './components/Impact'
import Blog from './components/Blog'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import PageIntro from './components/PageIntro'
import { useReveal } from './components/useReveal'

const Scene3D = lazy(() => import('./components/Scene3D'))

function MainContent() {
  useReveal()
  const [enable3D, setEnable3D] = useState(() => {
    if (typeof window === 'undefined') return false
    const isDesktopOrTablet = window.matchMedia('(min-width: 768px)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return isDesktopOrTablet && !reducedMotion
  })

  useEffect(() => {
    const widthQuery = window.matchMedia('(min-width: 768px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update3DState = () => {
      setEnable3D(widthQuery.matches && !motionQuery.matches)
    }

    widthQuery.addEventListener('change', update3DState)
    motionQuery.addEventListener('change', update3DState)
    return () => {
      widthQuery.removeEventListener('change', update3DState)
      motionQuery.removeEventListener('change', update3DState)
    }
  }, [])

  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-bg text-text transition-colors duration-200 relative">
      {/* 3D Scene lazy loaded behind content on tablet/desktop only */}
      {enable3D && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}

      {/* Subtle Background Grid & Glows */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-60 z-0" />
      
      {/* Ambient Top Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[64rem] h-96 bg-gradient-to-b from-accent/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Impact />
        <Blog />
        <Experience />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <PageIntro />
      <SmoothScroll>
        <MainContent />
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App
