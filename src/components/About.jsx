import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, MapPin } from 'lucide-react'
import { personalData } from '../data/personal'

const AnimatedCounter = ({ value, suffix = '', duration = 1.5 }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -20px 0px' })

  useEffect(() => {
    if (!isInView) return

    const isDecimal = Number.isInteger(value) === false
    const end = value
    const totalFrames = Math.round(duration * 60)
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const ease = 1 - Math.pow(2, -10 * progress)
      const current = end * ease

      if (frame >= totalFrames) {
        setDisplayValue(end)
        clearInterval(timer)
      } else {
        setDisplayValue(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="font-mono font-bold inline-block">
      {displayValue}
      {suffix}
    </span>
  )
}

export const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-2">
            <span className="text-emerald-500">$ cat</span>
            <span>~/about/profile.md</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
            About <span className="text-accent">Yashodip</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Main Bio Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-4 text-muted leading-relaxed text-sm sm:text-base"
          >
            {personalData.bioFull.map((paragraph, idx) => (
              <p key={idx} className="relative pl-4 border-l-2 border-accent/40 text-text/90">
                {paragraph}
              </p>
            ))}

            {/* Core Values / DevOps Principles */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-surface-2/70 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-text">
                    Infrastructure as Code
                  </div>
                  <div className="text-muted text-[11px]">
                    Declarative, version-controlled cluster state
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-surface-2/70 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-text">
                    GitOps Workflows
                  </div>
                  <div className="text-muted text-[11px]">
                    Continuous sync with automated drift detection
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-surface-2/70 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-text">
                    Zero-Downtime Releases
                  </div>
                  <div className="text-muted text-[11px]">
                    Rolling updates with probe verification
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-surface-2/70 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-text">
                    Disaster Preparedness
                  </div>
                  <div className="text-muted text-[11px]">
                    Strict RPO & RTO recovery planning
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location & Quick Profile Spec Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 p-6 rounded-2xl border border-border bg-surface shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                Node Specification
              </span>
              <span className="font-mono text-xs text-emerald-500 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between py-1 border-b border-border/60">
                <span className="text-muted">Engineer:</span>
                <span className="text-text font-semibold">{personalData.name}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/60">
                <span className="text-muted">Primary Role:</span>
                <span className="text-accent font-medium">DevOps Engineer</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/60">
                <span className="text-muted">Base Location:</span>
                <span className="text-text flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Rahata, Maharashtra, India
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/60">
                <span className="text-muted">Timezone:</span>
                <span className="text-text">IST (UTC +5:30)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/60">
                <span className="text-muted">Cloud Stack:</span>
                <span className="text-amber-500 font-semibold">AWS (EC2, S3, IAM, VPC)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted">Orchestrator:</span>
                <span className="text-blue-500 font-semibold">k3s / Lightweight K8s</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-semibold bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 transition-colors"
              >
                <span>Initiate Communication</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3 Animated Counters + Target SLA */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {personalData.stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 rounded-2xl border border-border bg-surface shadow-sm hover:border-accent/50 hover:shadow-md transition-all text-left group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-500 mb-1 group-hover:scale-105 transition-transform origin-left">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-text mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-muted line-clamp-2">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default About
