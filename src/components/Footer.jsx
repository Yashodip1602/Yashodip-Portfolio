import { ArrowUp } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { personalData } from '../data/personal'

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface py-12 transition-colors relative">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-border">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-surface-2 border border-accent/40 flex items-center justify-center text-accent font-mono font-bold text-xs">
                YJ
              </div>
              <span className="font-mono text-base font-bold text-text">
                {personalData.name}
              </span>
            </div>
            <p className="text-xs font-mono text-muted max-w-sm">
              DevOps Engineer • Automating cloud pipelines, container orchestrations, and high-availability database architectures.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted">
            <a href="#about" className="hover:text-accent transition-colors">/about</a>
            <a href="#skills" className="hover:text-accent transition-colors">/skills</a>
            <a href="#projects" className="hover:text-accent transition-colors">/projects</a>
            <a href="#impact" className="hover:text-accent transition-colors">/impact</a>
            <a href="#blog" className="hover:text-accent transition-colors">/blog</a>
            <a href="#experience" className="hover:text-accent transition-colors">/experience</a>
            <a href="#contact" className="hover:text-accent transition-colors">/contact</a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-3">
            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg bg-surface-2 border border-border text-muted hover:text-accent hover:border-accent transition-colors cursor-pointer"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg bg-surface-2 border border-border text-muted hover:text-[#0A66C2] hover:border-accent transition-colors cursor-pointer"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Scroll to top of page"
              className="p-2 rounded-lg bg-surface-2 border border-border text-muted hover:text-accent hover:border-accent transition-colors ml-2 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Ticker & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
            <span>•</span>
            <span>Cluster: HEALTHY</span>
            <span>•</span>
            <span>SLA: 99.9%</span>
          </div>

          <div>
            © {currentYear} {personalData.name}. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
