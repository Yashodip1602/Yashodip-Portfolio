import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  AlertCircle
} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { personalData } from '../data/personal'

export const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(personalData.contact.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg('')
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Simple frontend validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMsg('Please complete all required fields.')
      return
    }

    if (!/\S+@\S+\.\S+/.test(formState.email)) {
      setErrorMsg('Please provide a valid email address.')
      return
    }

    setIsSubmitting(true)
    setErrorMsg('')

    // Simulate network latency / dispatch
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 900)
  }

  const handleReset = () => {
    setFormState({ name: '', email: '', subject: '', message: '' })
    setIsSubmitted(false)
  }

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-gradient-to-t from-accent/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-2">
            <span className="text-emerald-500">$ ping</span>
            <span>-c 4 devops.yashodip.engineer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-xl mt-2">
            Have a DevOps role, cloud architecture inquiry, or infrastructure project to collaborate on? Let's connect.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Contact Info + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Email Card */}
            <div className="p-6 rounded-2xl border border-border bg-surface shadow-sm">
              <div className="flex items-center gap-2 font-mono text-xs text-accent mb-2">
                <Mail className="w-4 h-4" />
                <span>ELECTRONIC MAIL</span>
              </div>
              <div className="text-sm sm:text-base font-mono font-semibold text-text mb-4 break-all">
                {personalData.contact.email}
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-mono text-xs font-semibold bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Response SLA */}
            <div className="p-6 rounded-2xl border border-border bg-surface shadow-sm space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between py-1 border-b border-border/60">
                <span className="text-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Location:
                </span>
                <span className="text-text font-medium">
                  {personalData.location}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-border/60">
                <span className="text-muted flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  Response SLA:
                </span>
                <span className="text-emerald-500 font-semibold">&lt; 24 Hours</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-muted flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  Availability:
                </span>
                <span className="text-accent font-semibold">{personalData.availability}</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="p-6 rounded-2xl border border-border bg-surface shadow-sm">
              <span className="font-mono text-xs text-muted block mb-3 font-semibold">
                NETWORK & CODE PROFILES:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={personalData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-mono text-xs font-semibold bg-surface-2 hover:bg-surface text-text border border-border hover:border-accent transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-mono text-xs font-semibold bg-surface-2 hover:bg-surface text-text border border-border hover:border-accent transition-colors"
                >
                  <FaLinkedin className="w-4 h-4 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl border border-border bg-surface shadow-xl">
              
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-text font-mono">
                    Dispatch Message
                  </h3>
                  <p className="text-xs text-muted font-mono mt-0.5">
                    POST /api/v1/messages/yashodip
                  </p>
                </div>
                <Terminal className="w-5 h-5 text-accent" />
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center font-mono space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500 flex items-center justify-center text-emerald-500 mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-emerald-500">
                      HTTP 200 OK — Message Dispatched!
                    </h4>
                    <p className="text-xs text-text max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out, <span className="text-accent font-bold">{formState.name}</span>. Your message has been routed to Yashodip's inbox. Expect a response shortly!
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface-2 hover:bg-surface text-text border border-border transition-colors cursor-pointer"
                      >
                        Send Another Transmission
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-mono text-text font-medium mb-1.5"
                        >
                          Your Name <span className="text-accent">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface-2 text-text placeholder:text-muted font-mono text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        />
                      </div>

                      {/* Email input */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-mono text-text font-medium mb-1.5"
                        >
                          Email Address <span className="text-accent">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface-2 text-text placeholder:text-muted font-mono text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject input */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-mono text-text font-medium mb-1.5"
                      >
                        Subject / Objective
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="DevOps Opportunity / Infrastructure Consultation"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface-2 text-text placeholder:text-muted font-mono text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      />
                    </div>

                    {/* Message textarea */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-mono text-text font-medium mb-1.5"
                      >
                        Message Payload <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Write your message here... Describe the project, position, or infrastructure topic."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface-2 text-text placeholder:text-muted font-mono text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-accent hover:opacity-90 text-bg shadow-md shadow-accent/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Encrypting & Routing Packet...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Dispatch Transmission</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Contact
