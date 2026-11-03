import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { impactData } from '../data/impact'

export const Impact = () => {
  return (
    <section id="impact" className="py-20 md:py-28 relative">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-2">
            <span className="text-emerald-500">$ devops</span>
            <span>audit --report=reliability-impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
            DevOps Impact & <span className="text-accent">Reliability Wins</span>
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-xl mt-2">
            Measurable engineering outcomes delivered through automated deployments, resilience testing, and cloud infrastructure optimization.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-emerald-500 rounded-full mt-3" />
        </div>

        {/* 4 Impact Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impactData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-7 rounded-3xl border border-border bg-surface hover:border-accent hover:shadow-md transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Header: Metric & Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-500 font-mono">
                      {item.stat}
                    </span>
                    <div className="text-xs font-mono text-muted font-medium">
                      {item.statLabel}
                    </div>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-surface-2 text-accent border border-border font-semibold">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-text font-mono group-hover:text-accent transition-colors mb-2.5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="pt-4 border-t border-border space-y-2">
                {item.highlights.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 font-mono text-xs text-text">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Impact
