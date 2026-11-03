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

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg text-text transition-colors duration-200 relative">
        {/* Subtle Background Grid & Glows */}
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-60 z-0" />
        
        {/* Ambient Top Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-accent/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none z-0" />

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
    </ThemeProvider>
  )
}

export default App
