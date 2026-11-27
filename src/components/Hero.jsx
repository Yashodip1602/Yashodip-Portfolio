import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Download,
  Loader2,
  MapPin
} from 'lucide-react'
import HeroOrbit from './HeroOrbit'
import { personalData } from '../data/personal'
import { downloadResume, triggerStaticResumeFallback } from '../lib/downloadResume'

const titles = [
  'Backend Developer',
  'Node.js Developer',
  'DevOps Engineer',
  'Cloud Engineer',
  '$ whoami'
]

export const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [resumeState, setResumeState] = useState('idle')
  const resumeTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
      }
    }
  }, [])

  const handleDownloadResume = async () => {
    if (resumeState === 'generating') return
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
    }

    setResumeState('generating')
    try {
      await downloadResume()
      setResumeState('done')
      resumeTimerRef.current = setTimeout(() => {
        setResumeState('idle')
      }, 2500)
    } catch {
      setResumeState('error')
      triggerStaticResumeFallback()
      resumeTimerRef.current = setTimeout(() => {
        setResumeState('idle')
      }, 5000)
    }
  }

  // Infinite looping typewriter effect
  useEffect(() => {
    const currentTitle = titles[titleIndex]
    let timer

    if (!isDeleting) {
      if (displayText.length < currentTitle.length) {
        timer = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1))
        }, 80)
      } else {
        // Pause at full word for 2s
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length - 1))
        }, 40)
      } else {
        // Pause at empty, then switch to next title
        timer = setTimeout(() => {
          setIsDeleting(false)
          setTitleIndex(prev => (prev + 1) % titles.length)
        }, 350)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, titleIndex])

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-[calc(5.5rem+env(safe-area-inset-top))] pb-14 md:pt-28 md:pb-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,37.5rem)] h-[22rem] bg-gradient-to-tr from-accent/15 via-emerald-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[min(60vw,18rem)] h-[18rem] bg-accent/5 blur-3xl pointer-events-none rounded-full" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Hero Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left min-w-0"
          >
            {/* Status & Location Pill */}
            <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-1.5 rounded-2xl sm:rounded-full text-xs font-mono border border-accent/30 bg-accent/10 text-accent mb-6 backdrop-blur-sm max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block shrink-0" />
              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>Rahata, Maharashtra, India</span>
              <span className="text-muted hidden sm:inline">•</span>
              <span className="text-emerald-500 font-medium">{personalData.availability}</span>
            </div>

            {/* Name Heading */}
            <h1 className="text-[clamp(2.125rem,5vw+1rem,3.75rem)] font-extrabold tracking-tight text-text leading-[1.1] mb-3">
              {personalData.name}
            </h1>

            {/* Typewriter Role Title */}
            <div className="flex items-center gap-2 text-[clamp(1.25rem,2.5vw+0.75rem,1.875rem)] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal-400 to-emerald-400 min-h-[2.5rem] mb-5">
              <span>{displayText || '\u00A0'}</span>
              <span className="inline-block w-2.5 h-[1.4em] bg-accent animate-blink shrink-0" />
            </div>

            {/* One-line Bio */}
            <p className="text-[clamp(1rem,0.5vw+0.875rem,1.125rem)] text-muted leading-relaxed max-w-[42rem] mb-6">
              {personalData.bioShort}
            </p>

            {/* DevOps Tech Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
              {['AWS (EC2 & S3)', 'k3s Kubernetes', 'ArgoCD GitOps', 'Docker', 'Jenkins CI/CD', 'PostgreSQL HA'].map(
                (tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-surface-2 border border-border text-text hover:border-accent hover:text-accent transition-colors"
                  >
                    <span className="text-accent mr-1.5">#</span>
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* View Projects Button */}
              <a
                href="#projects"
                className="w-full sm:w-auto min-h-[2.75rem] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-accent hover:opacity-90 text-bg shadow-md shadow-accent/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Download Resume Button */}
              <button
                type="button"
                onClick={handleDownloadResume}
                disabled={resumeState === 'generating'}
                className="w-full sm:w-auto min-h-[2.75rem] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-surface border border-border text-text hover:border-accent hover:text-accent shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                title="Download Yashodip's DevOps Resume (PDF)"
              >
                {resumeState === 'generating' ? (
                  <>
                    <Loader2 className="w-4 h-4 text-accent animate-spin" />
                    <span>Preparing...</span>
                  </>
                ) : resumeState === 'done' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Download Resume</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-accent" />
                    <span>Download Resume</span>
                  </>
                )}
              </button>

              {/* Contact Quick Link */}
              <a
                href="#contact"
                className="w-full sm:w-auto min-h-[2.75rem] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-xs sm:text-sm text-muted hover:text-accent hover:bg-surface-2 transition-colors"
              >
                <span>$ ping me</span>
              </a>
            </div>
            {resumeState === 'error' && (
              <p role="status" aria-live="polite" className="mt-2.5 text-xs font-mono text-muted">
                Could not generate live PDF; downloading static resume instead.
              </p>
            )}
          </motion.div>

          {/* Right Column: Profile Photo with Orbiting Tool Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 w-full flex items-center justify-center relative z-20 py-4 lg:py-0"
          >
            <HeroOrbit />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
