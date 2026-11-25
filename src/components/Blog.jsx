import { motion } from 'framer-motion'
import { Clock, ArrowUpRight } from 'lucide-react'
import { blogPosts } from '../data/blog'

export const Blog = () => {
  return (
    <section id="blog" className="py-16 sm:py-20 md:py-28 relative">
      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-12">
          <div className="inline-flex flex-wrap items-center gap-2 font-mono text-xs text-accent mb-2">
            <span className="text-emerald-500">$ git</span>
            <span>log --pretty=oneline --journey=devops</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-extrabold tracking-tight text-text leading-tight">
            DevOps Journey & <span className="text-accent">Technical Writing</span>
          </h2>
          <p className="text-muted text-[clamp(1rem,0.4vw+0.9rem,1.0625rem)] max-w-[38rem] mt-2 leading-relaxed">
            Documenting real-world engineering lessons, cluster experiments, and architectural insights from Day 22 to Day 32 and beyond.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="p-5 sm:p-6 rounded-3xl border border-border bg-surface hover:border-accent hover:shadow-md transition-all flex flex-col justify-between group shadow-sm min-w-0"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-surface-2 text-accent border border-border">
                    {post.dayBadge}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-muted">
                    <Clock className="w-3 h-3 text-accent shrink-0" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[clamp(1.0625rem,1vw+0.85rem,1.1875rem)] font-bold text-text font-mono group-hover:text-accent transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[clamp(1rem,0.25vw+0.9375rem,1.0625rem)] text-muted leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Key Takeaway Box */}
                {post.takeaway && (
                  <div className="p-3.5 rounded-xl bg-surface-2 border border-border text-xs font-mono text-text mb-4">
                    <span className="text-emerald-500 font-bold block mb-0.5">Key Insight:</span>
                    <span>"{post.takeaway}"</span>
                  </div>
                )}
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-muted border border-border/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Link to LinkedIn / Article */}
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[2.75rem] inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-mono text-xs font-semibold bg-surface-2 hover:bg-surface text-text border border-border hover:border-accent hover:text-accent transition-all cursor-pointer"
                >
                  <span>Read on LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent shrink-0" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Blog
