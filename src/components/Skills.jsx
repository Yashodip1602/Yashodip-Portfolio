import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TechIcon from './TechIcon'
import { skillCategories, skillsData } from '../data/skills'

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredSkills =
    activeCategory === 'all'
      ? skillsData
      : skillsData.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      {/* Background accent glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-2">
            <span className="text-emerald-500">$ devops-cli</span>
            <span>skills list --format=matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
            Skills & <span className="text-accent">Toolchain</span>
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-xl mt-2">
            Field-tested tools and architectural disciplines powering automated delivery pipelines, container clusters, and zero-downtime infrastructure.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              type="button"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-accent text-bg font-bold shadow-md shadow-accent/20'
                  : 'bg-surface-2 text-muted hover:text-text hover:bg-surface border border-border'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map(skill => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative p-5 rounded-2xl border border-border bg-surface hover:border-accent hover:bg-surface-2/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Header: Icon, Name & Category Badge */}
                <div>
                  <div className="flex items-start justify-between mb-3.5">
                    <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center p-2.5 group-hover:scale-105 group-hover:border-accent/50 transition-all shadow-inner">
                      <TechIcon name={skill.iconType || skill.name} className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-surface-2 text-muted border border-border">
                      {skill.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-text font-mono group-hover:text-accent transition-colors mb-1.5 flex items-center justify-between">
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-wider font-semibold">
                      {skill.level}
                    </span>
                  </h3>

                  <p className="text-xs text-muted leading-relaxed mb-4">
                    {skill.highlight}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-3 border-t border-border flex flex-wrap gap-1.5">
                  {skill.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-muted group-hover:text-accent transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}

export default Skills
