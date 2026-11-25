import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
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

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const MIN_MESSAGE_LENGTH = 10
const RATE_LIMIT_MS = 30000
const RATE_LIMIT_KEY = 'yj_contact_last_sent_at'

export const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Hidden honeypot field
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('')
  const [lastSenderName, setLastSenderName] = useState('')

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(personalData.contact.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    if (status === 'error') {
      setStatus('idle')
      setStatusMsg('')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Block double submits while a request is in flight
    if (status === 'sending') return

    // Honeypot check: silently abort if filled by automated bots
    if (formState.website.trim()) {
      setFormState({ name: '', email: '', subject: '', message: '', website: '' })
      setStatus('success')
      setStatusMsg('Message received.')
      return
    }

    const trimmedName = formState.name.trim()
    const trimmedEmail = formState.email.trim()
    const trimmedSubject = formState.subject.trim()
    const trimmedMessage = formState.message.trim()

    // Required fields & format validation
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('error')
      setStatusMsg('Please fill in your name, email address, and message.')
      return
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus('error')
      setStatusMsg('Please provide a valid email address.')
      return
    }

    if (trimmedMessage.length < MIN_MESSAGE_LENGTH) {
      setStatus('error')
      setStatusMsg(`Please enter a message of at least ${MIN_MESSAGE_LENGTH} characters.`)
      return
    }

    // Basic 30-second rate limit via localStorage
    try {
      const lastSentRaw = localStorage.getItem(RATE_LIMIT_KEY)
      if (lastSentRaw) {
        const elapsed = Date.now() - Number(lastSentRaw)
        if (!Number.isNaN(elapsed) && elapsed < RATE_LIMIT_MS) {
          const waitSec = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000)
          setStatus('error')
          setStatusMsg(`Please wait ${waitSec}s before sending another message.`)
          return
        }
      }
    } catch {
      // Ignore storage access errors in restricted environments
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error')
      setStatusMsg('Contact service is currently unavailable. Please email directly instead.')
      return
    }

    setStatus('sending')
    setStatusMsg('Sending your message...')

    const formattedMessage = trimmedSubject
      ? `Subject: ${trimmedSubject}\n\n${trimmedMessage}`
      : trimmedMessage

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: trimmedName,
          from_email: trimmedEmail,
          message: formattedMessage,
          reply_to: trimmedEmail
        },
        { publicKey }
      )

      try {
        localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()))
      } catch {
        // Ignore storage write errors
      }

      setLastSenderName(trimmedName)
      setFormState({ name: '', email: '', subject: '', message: '', website: '' })
      setStatus('success')
      setStatusMsg('Your message has been sent successfully.')
    } catch {
      setStatus('error')
      setStatusMsg('Unable to send your message right now. Please try again shortly or email directly.')
    }
  }

  const handleReset = () => {
    setFormState({ name: '', email: '', subject: '', message: '', website: '' })
    setLastSenderName('')
    setStatus('idle')
    setStatusMsg('')
  }

  const isSending = status === 'sending'

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 relative">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[min(90vw,34.375rem)] h-[18.75rem] bg-gradient-to-t from-accent/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-12">
          <div className="inline-flex flex-wrap items-center gap-2 font-mono text-xs text-accent mb-2">
            <span className="text-emerald-500">$ ping</span>
            <span>-c 4 devops.yashodip.engineer</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-extrabold tracking-tight text-text leading-tight">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="text-muted text-[clamp(1rem,0.4vw+0.9rem,1.0625rem)] max-w-[38rem] mt-2 leading-relaxed">
            Have a DevOps role, cloud architecture inquiry, or infrastructure project to collaborate on? Let's connect.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-emerald-500 rounded-full mt-3" />
        </div>

        {/* Contact Info + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            
            {/* Quick Email Card */}
            <div className="p-5 sm:p-6 rounded-2xl border border-border bg-surface shadow-sm">
              <div className="flex items-center gap-2 font-mono text-xs text-accent mb-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>ELECTRONIC MAIL</span>
              </div>
              <div className="text-base font-mono font-semibold text-text mb-4 break-all">
                {personalData.contact.email}
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full min-h-[2.75rem] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-mono text-xs font-semibold bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 shrink-0" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Response SLA */}
            <div className="p-5 sm:p-6 rounded-2xl border border-border bg-surface shadow-sm space-y-3 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 py-1 border-b border-border/60">
                <span className="text-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  Location:
                </span>
                <span className="text-text font-medium text-right">
                  {personalData.location}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 py-1 border-b border-border/60">
                <span className="text-muted flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  Response SLA:
                </span>
                <span className="text-emerald-500 font-semibold text-right">&lt; 24 Hours</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 py-1">
                <span className="text-muted flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                  Availability:
                </span>
                <span className="text-accent font-semibold text-right">{personalData.availability}</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="p-5 sm:p-6 rounded-2xl border border-border bg-surface shadow-sm">
              <span className="font-mono text-xs text-muted block mb-3 font-semibold">
                NETWORK & CODE PROFILES:
              </span>
              <div className="flex flex-col min-[375px]:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={personalData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex-1 min-h-[2.75rem] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-mono text-xs font-semibold bg-surface-2 hover:bg-surface text-text border border-border hover:border-accent transition-colors"
                >
                  <FaGithub className="w-4 h-4 shrink-0" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex-1 min-h-[2.75rem] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-mono text-xs font-semibold bg-surface-2 hover:bg-surface text-text border border-border hover:border-accent transition-colors"
                >
                  <FaLinkedin className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 min-w-0">
            <div className="p-5 sm:p-8 rounded-3xl border border-border bg-surface shadow-xl">
              
              <div className="flex items-center justify-between gap-3 border-b border-border pb-4 mb-6">
                <div className="min-w-0">
                  <h3 className="text-[clamp(1.125rem,1.2vw+0.85rem,1.25rem)] font-bold text-text font-mono">
                    Dispatch Message
                  </h3>
                  <p className="text-xs text-muted font-mono mt-0.5 break-all">
                    {status === 'sending'
                      ? 'STATUS: SENDING TRANSMISSION...'
                      : status === 'success'
                      ? 'STATUS: 200 OK — DELIVERED'
                      : status === 'error'
                      ? 'STATUS: DELIVERY ATTENTION REQUIRED'
                      : 'READY: EMAILJS RELAY'}
                  </p>
                </div>
                <Terminal className="w-5 h-5 text-accent shrink-0" />
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center font-mono space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500 flex items-center justify-center text-emerald-500 mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-emerald-500">
                      Message Dispatched Successfully!
                    </h4>
                    <p className="text-sm sm:text-base text-text max-w-sm mx-auto leading-relaxed font-sans">
                      {lastSenderName ? (
                        <>
                          Thank you for reaching out, <span className="text-accent font-bold">{lastSenderName}</span>. Your message has been sent to Yashodip's inbox.
                        </>
                      ) : (
                        statusMsg || 'Your message has been sent to Yashodip.'
                      )}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="min-h-[2.75rem] px-4 py-2 rounded-xl text-xs font-semibold bg-surface-2 hover:bg-surface text-text border border-border transition-colors cursor-pointer"
                      >
                        Send Another Transmission
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-busy={isSending}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Accessible live status region for sending & error states */}
                    <div aria-live="polite" className="min-h-0">
                      {status === 'error' && statusMsg && (
                        <div
                          role="alert"
                          className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono flex items-center gap-2"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{statusMsg}</span>
                        </div>
                      )}

                      {status === 'sending' && (
                        <div className="p-3 rounded-xl bg-accent/10 border border-accent/30 text-accent text-xs font-mono flex items-center gap-2">
                          <span>{statusMsg}</span>
                        </div>
                      )}
                    </div>

                    {/* Hidden Honeypot Field for Bot Protection */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[9999px] w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
                    >
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formState.website}
                        onChange={handleChange}
                      />
                    </div>

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
                          autoComplete="name"
                          disabled={isSending}
                          aria-invalid={status === 'error' && !formState.name.trim()}
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Morgan"
                          className="w-full min-h-[2.75rem] px-3.5 py-2.5 rounded-xl border border-border bg-surface-2 text-text placeholder:text-muted font-mono text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-60"
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
                          autoComplete="email"
                          disabled={isSending}
                          aria-invalid={status === 'error' && !EMAIL_REGEX.test(formState.email.trim())}
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="alex@company.com"
                          className="w-full min-h-[2.75rem] px-3.5 py-2.5 rounded-xl border border-border bg-surface-2 text-text placeholder:text-muted font-mono text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-60"
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
                        disabled={isSending}
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="DevOps Opportunity / Infrastructure Consultation"
                        className="w-full min-h-[2.75rem] px-3.5 py-2.5 rounded-xl border border-border bg-surface-2 text-text placeholder:text-muted font-mono text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-60"
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
                        minLength={MIN_MESSAGE_LENGTH}
                        disabled={isSending}
                        aria-invalid={status === 'error' && formState.message.trim().length < MIN_MESSAGE_LENGTH}
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Write your message here... Describe the project, position, or infrastructure topic."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface-2 text-text placeholder:text-muted font-mono text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none disabled:opacity-60"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full min-h-[2.75rem] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-accent hover:opacity-90 text-bg shadow-md shadow-accent/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <span>Encrypting & Routing Packet...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 shrink-0" />
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
