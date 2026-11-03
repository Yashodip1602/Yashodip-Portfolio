import { useState, useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import { Terminal as TerminalIcon, Copy, Check, RefreshCw } from 'lucide-react'
import { personalData } from '../data/personal'

export const TerminalCard = memo(() => {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedLines, setDisplayedLines] = useState([])
  const intervalRef = useRef(null)

  const currentCmd = personalData.terminalCommands[activeTab]

  // Animate lines printing when command tab changes
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    let currentLine = 0
    let cancelled = false

    const initTimeout = setTimeout(() => {
      if (cancelled) return
      setDisplayedLines([])
      setIsTyping(true)

      intervalRef.current = setInterval(() => {
        if (cancelled) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return
        }
        if (currentLine < currentCmd.output.length) {
          const lineToAdd = currentCmd.output[currentLine]
          setDisplayedLines(prev => [...prev, lineToAdd])
          currentLine++
        } else {
          setIsTyping(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }, 160)
    }, 30)

    return () => {
      cancelled = true
      clearTimeout(initTimeout)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [currentCmd])

  const handleCopy = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const textToCopy = currentCmd.command
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(() => {
        fallbackCopy(textToCopy)
      })
    } else {
      fallbackCopy(textToCopy)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fallbackCopy = text => {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    } catch {
      // Ignore copy error
    }
  }

  const handleRerun = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setDisplayedLines([])
    setIsTyping(true)
    let currentLine = 0
    intervalRef.current = setInterval(() => {
      if (currentLine < currentCmd.output.length) {
        setDisplayedLines(prev => [...prev, currentCmd.output[currentLine]])
        currentLine++
      } else {
        setIsTyping(false)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, 150)
  }

  // Color syntax highlight for terminal output lines using semantic tokens
  const renderFormattedLine = line => {
    // Header lines
    if (line.includes('NAME') || line.includes('NAMES') || line.includes('Stage')) {
      if (line.includes('Stage')) {
        const isPassed = line.includes('PASSED') || line.includes('SUCCESS') || line.includes('HEALTHY')
        return (
          <span className="text-accent font-mono flex items-center gap-1.5 font-medium">
            <span className={isPassed ? 'text-emerald-500' : 'text-accent'}>✔</span> {line}
          </span>
        )
      }
      return <span className="text-muted font-semibold uppercase tracking-wider">{line}</span>
    }
    
    // Success / running states
    if (line.includes('Running') || line.includes('Ready') || line.includes('Up 3 weeks') || line.includes('SUCCESSFUL')) {
      const parts = line.split(/(Running|Ready|Up 3 weeks|SUCCESSFUL)/g)
      return (
        <span className="font-mono">
          {parts.map((p, i) =>
            ['Running', 'Ready', 'Up 3 weeks', 'SUCCESSFUL'].includes(p) ? (
              <span key={i} className="text-emerald-500 font-semibold px-1 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                {p}
              </span>
            ) : (
              <span key={i} className="text-text">{p}</span>
            )
          )}
        </span>
      )
    }

    return <span className="text-text font-mono">{line}</span>
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-surface shadow-xl overflow-hidden font-mono transition-all duration-300 hover:border-accent/50 group relative z-10">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-2 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity" />
          <span className="text-xs text-muted ml-2 font-mono flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-accent" />
            yashodip@bastion-ec2:~
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={e => handleRerun(e)}
            title="Refresh terminal output (Terminal only)"
            aria-label="Refresh terminal output"
            type="button"
            className="p-1 rounded text-muted hover:text-accent hover:bg-surface transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTyping ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={e => handleCopy(e)}
            title="Copy command to clipboard"
            aria-label="Copy command"
            type="button"
            className="p-1 rounded text-muted hover:text-accent hover:bg-surface transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Command Selector Pills */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-surface-2/60 border-b border-border overflow-x-auto text-[11px] scrollbar-none">
        {personalData.terminalCommands.map((cmd, idx) => (
          <button
            key={cmd.id || idx}
            onClick={e => {
              if (e) {
                e.preventDefault()
                e.stopPropagation()
              }
              setActiveTab(idx)
            }}
            type="button"
            className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === idx
                ? 'bg-accent/15 text-accent border border-accent/40 font-semibold'
                : 'text-muted hover:text-text hover:bg-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {cmd.label || cmd.command.split(' ').slice(0, 3).join(' ')}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 text-xs sm:text-sm min-h-[260px] flex flex-col justify-between overflow-x-auto bg-surface">
        <div className="space-y-3">
          {/* Active Command Prompt */}
          <div className="flex items-start gap-2 text-accent">
            <span className="text-emerald-500 select-none font-bold">➜</span>
            <span className="text-accent select-none">aws-k3s-prod</span>
            <span className="text-muted select-none">:</span>
            <span className="text-amber-500 select-none">~</span>
            <span className="text-muted select-none">$</span>
            <span className="text-text font-semibold tracking-wide flex-1 break-all">
              {currentCmd.command}
            </span>
          </div>

          {/* Rendered Command Output */}
          <div className="space-y-1.5 pt-1 pl-2 border-l-2 border-accent/30">
            {displayedLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="leading-relaxed whitespace-pre font-mono text-[11px] sm:text-xs text-text"
              >
                {renderFormattedLine(line)}
              </motion.div>
            ))}

            {isTyping && (
              <div className="inline-block w-2 h-4 bg-accent animate-blink align-middle ml-1" />
            )}
          </div>
        </div>

        {/* Terminal Footer Status Bar */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[10px] text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              STATUS: HEALTHY
            </span>
            <span>AWS-EC2: 2 Nodes</span>
            <span>k3s: v1.28</span>
          </div>
          <span className="text-accent font-mono">GitOps: ArgoCD Synced</span>
        </div>
      </div>
    </div>
  )
})

TerminalCard.displayName = 'TerminalCard'

export default TerminalCard
