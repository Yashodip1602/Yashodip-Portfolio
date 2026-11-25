import { motion } from 'framer-motion'
import {
  ExternalLink,
  Server,
  ArrowUpRight,
  Activity
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import PipelineDiagram from './PipelineDiagram'
import TechIcon from './TechIcon'
import { projectsData } from '../data/projects'

export const Projects = () => {
  const featuredProject = projectsData.find(p => p.featured)
  const otherProjects = projectsData.filter(p => !p.featured)

  const getProjectMeta = (id) => {
    switch (id) {
      case 'postgres-replication-s3-backup':
        return {
          category: 'High Availability & DR',
          icon: 'postgresql',
          platform: 'EC2 + S3'
        }
      case 'blog-management-platform':
        return {
          category: 'Backend & REST APIs',
          icon: 'fastify',
          platform: 'Fastify + PG'
        }
      case 'terraform-aws-observability-stack':
      default:
        return {
          category: 'IaC & Observability',
          icon: 'terraform',
          platform: 'Terraform'
        }
    }
  }

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-28 relative">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-0 w-[min(85vw,24rem)] h-[24rem] bg-accent/5 blur-3xl pointer-events-none rounded-full" />

      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-12">
          <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-accent mb-2 max-w-full">
            <span className="text-emerald-500">$ kubectl</span>
            <span className="break-words">get deployments -A --sort-by=.metadata.creationTimestamp</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-extrabold tracking-tight text-text leading-tight">
            Featured <span className="text-accent">DevOps Projects</span>
          </h2>
          <p className="text-muted text-[clamp(1rem,0.4vw+0.9rem,1.0625rem)] max-w-[38rem] mt-2 leading-relaxed">
            Production-grade cloud architectures, container orchestration topologies, automated GitOps pipelines, and high-availability database replication.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-emerald-500 rounded-full mt-3" />
        </div>

        {/* FEATURED PROJECT: Master Project, Node.js Deployment on AWS */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16 p-5 sm:p-8 rounded-3xl border-2 border-accent/40 bg-surface shadow-xl relative overflow-hidden"
          >
            {/* Top Badge: Featured Masterpiece */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-accent/10 border border-accent/30 text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping shrink-0" />
                <span>Featured Master Project</span>
              </div>
              <div className="font-mono text-xs text-emerald-500 flex items-center gap-1.5 font-medium">
                <Server className="w-3.5 h-3.5 shrink-0" />
                <span>Multi-Node AWS EC2 • k3s • ArgoCD GitOps</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-[clamp(1.375rem,2.5vw+0.75rem,1.875rem)] font-extrabold text-text mb-2 font-mono leading-snug">
              {featuredProject.title}
            </h3>
            <p className="text-[clamp(1rem,0.3vw+0.9rem,1.0625rem)] text-accent font-mono mb-4 font-semibold">
              {featuredProject.subtitle}
            </p>

            {/* Description */}
            <p className="text-[clamp(1rem,0.3vw+0.9rem,1.0625rem)] text-muted leading-relaxed mb-6">
              {featuredProject.description}
            </p>

            {/* Architectural Highlights Checklist */}
            <div className="mb-8 space-y-2 font-mono text-xs">
              <span className="text-xs uppercase tracking-wider text-muted font-semibold block mb-2">
                Key Engineering Highlights:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {featuredProject.architectureDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-surface-2 border border-border flex items-start gap-2.5 min-w-0"
                  >
                    <span className="text-emerald-500 font-bold mt-0.5 shrink-0">✔</span>
                    <span className="text-text leading-snug">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Animated Pipeline Diagram */}
            <div className="mb-8">
              <div className="text-xs font-mono uppercase tracking-wider text-accent font-bold mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Automated GitOps CI/CD Pipeline & Architecture</span>
              </div>
              <PipelineDiagram
                steps={featuredProject.pipelineSteps}
                scalingPlan={featuredProject.scalingPlan}
              />
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {featuredProject.tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1 rounded-lg bg-surface-2 border border-border text-accent font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons: GitHub & Live */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-4 border-t border-border">
              <a
                href={featuredProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[2.75rem] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-surface hover:bg-surface-2 text-text border border-border hover:border-accent transition-all shadow-sm group cursor-pointer"
              >
                <FaGithub className="w-4 h-4 group-hover:text-accent transition-colors shrink-0" />
                <span>View GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-accent shrink-0" />
              </a>

              <a
                href={featuredProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[2.75rem] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-accent hover:opacity-90 text-bg transition-all shadow-md shadow-accent/20 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Architecture Walkthrough & Docs</span>
              </a>
            </div>
          </motion.div>
        )}

        {/* OTHER PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {otherProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-5 sm:p-7 rounded-3xl border border-border bg-surface hover:border-accent hover:shadow-md transition-all flex flex-col justify-between group shadow-sm min-w-0"
            >
              <div>
                {/* Top Badge */}
                {(() => {
                  const meta = getProjectMeta(project.id)
                  return (
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-surface-2 text-accent border border-border font-semibold">
                        {meta.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-muted text-xs font-mono">
                        <TechIcon name={meta.icon} className="w-4 h-4 shrink-0" />
                        <span>{meta.platform}</span>
                      </div>
                    </div>
                  )
                })()}

                {/* Title & Subtitle */}
                <h3 className="text-[clamp(1.25rem,1.5vw+0.75rem,1.5rem)] font-bold text-text font-mono group-hover:text-accent transition-colors mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-[clamp(0.9375rem,0.25vw+0.875rem,1rem)] text-accent font-mono mb-4 font-semibold">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-[clamp(1rem,0.25vw+0.9375rem,1.0625rem)] text-muted leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Key Metrics / RPO & RTO Breakdown */}
                {project.scalingPlan && (
                  <div className="p-4 rounded-xl bg-surface-2 border border-border font-mono text-xs space-y-2 mb-5">
                    {project.scalingPlan.rpo && (
                      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-1.5">
                        <span className="text-muted">RPO Target:</span>
                        <span className="text-emerald-500 font-bold text-right">{project.scalingPlan.rpo}</span>
                      </div>
                    )}
                    {project.scalingPlan.rto && (
                      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-1.5">
                        <span className="text-muted">RTO Target:</span>
                        <span className="text-accent font-bold text-right">{project.scalingPlan.rto}</span>
                      </div>
                    )}
                    {project.scalingPlan.alerting && (
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <span className="text-muted">Monitoring Alert:</span>
                        <span className="text-amber-500 font-medium text-right">{project.scalingPlan.alerting}</span>
                      </div>
                    )}
                    {project.scalingPlan.backupCadence && (
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <span className="text-muted">Cron Backup:</span>
                        <span className="text-text text-right">{project.scalingPlan.backupCadence}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Architecture Highlights */}
                <div className="space-y-1.5 mb-6 text-xs text-muted font-mono">
                  {project.architectureDetails.slice(0, 3).map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5 shrink-0">❯</span>
                      <span className="text-text/90 line-clamp-2">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-2 text-muted border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex flex-col min-[375px]:flex-row items-stretch min-[375px]:items-center gap-3 pt-4 border-t border-border">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[2.75rem] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-mono text-xs font-semibold bg-surface-2 hover:bg-surface text-text border border-border hover:border-accent transition-colors cursor-pointer"
                  >
                    <FaGithub className="w-3.5 h-3.5 shrink-0" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[2.75rem] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-mono text-xs font-semibold bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span>Documentation</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects
