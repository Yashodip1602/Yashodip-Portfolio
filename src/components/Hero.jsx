import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Download,
  MapPin
} from 'lucide-react'
import HeroOrbit from './HeroOrbit'
import { personalData } from '../data/personal'

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
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-accent/15 via-emerald-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Hero Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status & Location Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-accent/30 bg-accent/10 text-accent mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Rahata, Maharashtra, India</span>
              <span className="text-muted">•</span>
              <span className="text-emerald-500 font-medium">{personalData.availability}</span>
            </div>

            {/* Name Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text leading-[1.1] mb-3">
              {personalData.name}
            </h1>

            {/* Typewriter Role Title */}
            <div className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal-400 to-emerald-400 min-h-[40px] mb-5">
              <span>{displayText || '\u00A0'}</span>
              <span className="inline-block w-2.5 h-7 bg-accent animate-blink" />
            </div>

            {/* One-line Bio */}
            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mb-6">
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
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              {/* View Projects Button */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-accent hover:opacity-90 text-bg shadow-md shadow-accent/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Download Resume Button */}
              <a
                href={personalData.contact.resumeUrl}
                download="Yashodip_Jejurkar_DevOps_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-surface border border-border text-text hover:border-accent hover:text-accent shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                title="Download Yashodip's DevOps Resume (PDF)"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Download Resume</span>
              </a>

              {/* Contact Quick Link */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-xs sm:text-sm text-muted hover:text-accent hover:bg-surface-2 transition-colors"
              >
                <span>$ ping me</span>
              </a>
            </div>
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
