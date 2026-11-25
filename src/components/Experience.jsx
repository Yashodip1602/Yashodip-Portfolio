import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { experienceData, educationData, certificationsData } from '../data/experience'

export const Experience = () => {
  const [activeTab, setActiveTab] = useState('all') // all, experience, education

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-28 relative">
      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-12">
          <div className="inline-flex flex-wrap items-center gap-2 font-mono text-xs text-accent mb-2">
            <span className="text-emerald-500">$ crontab</span>
            <span>-l --timeline=career</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-extrabold tracking-tight text-text leading-tight">
            Experience & <span className="text-accent">Education</span>
          </h2>
          <p className="text-muted text-[clamp(1rem,0.4vw+0.9rem,1.0625rem)] max-w-[38rem] mt-2 leading-relaxed">
            My engineering trajectory, practical DevOps projects, academic foundation, and ongoing cloud certifications.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 mb-10 font-mono text-xs overflow-x-auto pb-2 scrollbar-none max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`min-h-[2.75rem] shrink-0 whitespace-nowrap px-3.5 py-2 rounded-lg transition-all cursor-pointer inline-flex items-center ${
              activeTab === 'all'
                ? 'bg-accent text-bg font-bold shadow-md shadow-accent/20'
                : 'bg-surface-2 text-muted hover:text-text hover:bg-surface border border-border'
            }`}
          >
            All Milestones
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`min-h-[2.75rem] shrink-0 whitespace-nowrap px-3.5 py-2 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === 'experience'
                ? 'bg-accent text-bg font-bold shadow-md shadow-accent/20'
                : 'bg-surface-2 text-muted hover:text-text hover:bg-surface border border-border'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span>Experience</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`min-h-[2.75rem] shrink-0 whitespace-nowrap px-3.5 py-2 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === 'education'
                ? 'bg-accent text-bg font-bold shadow-md shadow-accent/20'
                : 'bg-surface-2 text-muted hover:text-text hover:bg-surface border border-border'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>Education</span>
          </button>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-5 sm:pl-8 border-l-2 border-border space-y-10 sm:space-y-12 ml-1.5 sm:ml-4">
          
          {/* EXPERIENCE SECTION */}
          {(activeTab === 'all' || activeTab === 'experience') && (
            <div className="space-y-8">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent font-bold">
                <Briefcase className="w-4 h-4 text-accent shrink-0" />
                <span>Professional Experience & Hands-On Engineering</span>
              </div>

              {experienceData.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Glowing Timeline Marker */}
                  <div className="absolute -left-[29px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-accent flex items-center justify-center group-hover:border-emerald-500 group-hover:scale-125 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-emerald-500" />
                  </div>

                  {/* Timeline Card */}
                  <div className="p-4 sm:p-6 rounded-2xl border border-border bg-surface hover:border-accent hover:shadow-md transition-all shadow-sm min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-[clamp(1.125rem,1.2vw+0.85rem,1.25rem)] font-bold text-text font-mono">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 font-mono text-xs text-accent shrink-0">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted mb-4">
                      <span className="text-emerald-500 font-semibold">{item.organization}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1 text-muted">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        {item.location}
                      </span>
                    </div>

                    <p className="text-[clamp(1rem,0.25vw+0.9375rem,1.0625rem)] text-muted leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="space-y-2 mb-5">
                      {item.bulletPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-text">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                          <span className="leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                      {item.skills.map(s => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-muted border border-border/50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* EDUCATION SECTION */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <div className="space-y-8 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-500 font-bold">
                <GraduationCap className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Education Background</span>
              </div>

              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Glowing Timeline Marker */}
                  <div className="absolute -left-[29px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-emerald-500 flex items-center justify-center group-hover:scale-125 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>

                  {/* Card */}
                  <div className="p-4 sm:p-6 rounded-2xl border border-border bg-surface hover:border-emerald-500 transition-all shadow-sm min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-[clamp(1.0625rem,1vw+0.85rem,1.1875rem)] font-bold text-text font-mono">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-2 font-mono text-xs text-emerald-500 shrink-0">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted mb-3">
                      <span className="text-text font-semibold">{edu.institution}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{edu.location}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-accent font-semibold">{edu.grade}</span>
                    </div>

                    <div className="space-y-1.5 text-sm sm:text-base text-text/90">
                      {edu.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <span className="text-accent shrink-0">❯</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS HIGHLIGHT */}
          {activeTab === 'all' && (
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-500 font-bold">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Certifications & Continuous Learning</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {certificationsData.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border bg-surface font-mono text-xs space-y-1 hover:border-amber-500 transition-colors shadow-sm min-w-0"
                  >
                    <div className="font-bold text-text">
                      {cert.name}
                    </div>
                    <div className="text-muted text-[11px]">{cert.issuer}</div>
                    <div className="text-[10px] text-amber-500 font-semibold pt-1">
                      {cert.status} • {cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  )
}

export default Experience
