import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Activity,
  RefreshCw
} from 'lucide-react'
import TechIcon from './TechIcon'

export const PipelineDiagram = ({ steps = [], scalingPlan }) => {
  const [selectedStep, setSelectedStep] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulatedStep, setSimulatedStep] = useState(-1)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Interactive pipeline simulation
  const startSimulation = () => {
    if (isSimulating || !steps.length) return
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setIsSimulating(true)
    setSimulatedStep(0)
    setSelectedStep(0)

    const totalSteps = steps.length
    let current = 0

    intervalRef.current = setInterval(() => {
      current++
      if (current < totalSteps) {
        setSimulatedStep(current)
        setSelectedStep(current)
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        timeoutRef.current = setTimeout(() => {
          setIsSimulating(false)
          setSimulatedStep(-1)
        }, 1200)
      }
    }, 900)
  }

  const activeStepData = steps[selectedStep] || steps[0] || { step: 1, title: 'Pipeline Stage', desc: '' }

  return (
    <div className="w-full rounded-2xl border border-border bg-surface-2/60 p-5 sm:p-6 shadow-xl space-y-6">
      
      {/* Top Bar with Title & Simulation Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-accent">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
            <span>LIVE ARCHITECTURE & PIPELINE RUNNER</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-text font-mono mt-0.5">
            Git Push ➔ Jenkins CI ➔ Docker ➔ Registry ➔ ArgoCD ➔ k3s Multi-Node
          </h4>
        </div>

        <button
          onClick={startSimulation}
          disabled={isSimulating}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 hover:border-emerald-500 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Pipeline Running... [{simulatedStep + 1}/{steps.length}]</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-emerald-500" />
              <span>Simulate Pipeline Flow</span>
            </>
          )}
        </button>
      </div>

      {/* Visual Pipeline Flow Grid */}
      <div className="relative">
        {/* Desktop Pipeline Horizontal Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((step, idx) => {
            const isCurrentSimulated = simulatedStep === idx
            const isSimulatedDone = simulatedStep > idx || simulatedStep === steps.length - 1
            const isSelected = selectedStep === idx

            return (
              <div key={step.step} className="relative flex flex-col items-center">
                {/* Node Box */}
                <button
                  type="button"
                  onClick={() => setSelectedStep(idx)}
                  className={`w-full p-3.5 rounded-xl border text-center transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'border-accent bg-accent/15 shadow-md shadow-accent/20 ring-1 ring-accent'
                      : isCurrentSimulated
                      ? 'border-emerald-500 bg-emerald-500/15 shadow-md shadow-emerald-500/20'
                      : isSimulatedDone
                      ? 'border-emerald-500/40 bg-surface'
                      : 'border-border bg-surface hover:border-accent/40 hover:bg-surface-2'
                  }`}
                >
                  {/* Glowing line animation for active simulated node */}
                  {isCurrentSimulated && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-emerald-500/10 animate-pulse pointer-events-none"
                    />
                  )}

                  {/* Stage Number & Status */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-2 text-muted">
                      0{step.step}
                    </span>
                    {isSimulatedDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-border group-hover:bg-accent transition-colors" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 mx-auto rounded-lg bg-surface-2 border border-border flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <TechIcon name={step.icon} className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <div className="font-mono text-xs font-bold text-text group-hover:text-accent transition-colors">
                    {step.title}
                  </div>
                </button>

                {/* Animated Arrow Connector */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-accent">
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-4 h-4 text-accent drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
                    </motion.span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Animated Flowing Dashes SVG Track */}
        <div className="hidden lg:block w-full mt-3">
          <svg className="w-full h-2" viewBox="0 0 1000 8" fill="none">
            <line
              x1="0"
              y1="4"
              x2="1000"
              y2="4"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-pipeline-flow stroke-accent text-accent"
            />
          </svg>
        </div>
      </div>

      {/* Stage Detail Drawer / Card */}
      <div className="p-4 rounded-xl border border-border bg-surface font-mono text-xs shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-2 mb-3">
          <div className="flex items-center gap-2 text-accent font-bold">
            <span className="text-emerald-500">Stage 0{activeStepData.step}:</span>
            <span>{activeStepData.title}</span>
          </div>
          <span className="text-[11px] text-muted">
            Click on any stage above to inspect operation parameters
          </span>
        </div>
        <p className="text-text text-xs sm:text-sm leading-relaxed mb-3">
          {activeStepData.desc}
        </p>

        {/* Specific Stage Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-[11px] text-muted border-t border-border">
          <div className="p-2.5 rounded-lg bg-surface-2 border border-border">
            <span className="text-muted block text-[10px]">Trigger Mechanism:</span>
            <span className="text-accent font-semibold">
              {selectedStep === 0
                ? 'git push origin main'
                : selectedStep === 1
                ? 'GitHub Webhook ➔ Jenkins'
                : selectedStep === 2
                ? 'Multi-Stage Dockerfile'
                : selectedStep === 3
                ? 'Image Digest Push'
                : selectedStep === 4
                ? 'ArgoCD Reconciliation Loop'
                : 'k3s Ingress & Deployment Sync'}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-2 border border-border">
            <span className="text-muted block text-[10px]">SLA / Execution:</span>
            <span className="text-emerald-500 font-semibold">
              {selectedStep === 0
                ? '< 1s instantaneous'
                : selectedStep === 1
                ? '~45s automated'
                : selectedStep === 2
                ? '~28s multi-stage cached'
                : selectedStep === 3
                ? '~12s layer push'
                : selectedStep === 4
                ? '~15s drift auto-heal'
                : 'Zero-Downtime Rolling'}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-2 border border-border">
            <span className="text-muted block text-[10px]">Cluster Target:</span>
            <span className="text-amber-500 font-semibold">
              {selectedStep === 5
                ? 'AWS EC2 Master + Worker Nodes'
                : 'Production CI/CD Runner'}
            </span>
          </div>
        </div>
      </div>

      {/* Scaling Plan Highlights (CPU-based Autoscaling) */}
      {scalingPlan && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 font-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-500 font-bold mb-2">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <span>CPU-BASED HORIZONTAL POD AUTOSCALING (HPA) PLAN</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
            <div>
              <span className="text-muted block">Target Metric:</span>
              <span className="text-text font-semibold">{scalingPlan.metric}</span>
            </div>
            <div>
              <span className="text-muted block">Autoscale Threshold:</span>
              <span className="text-emerald-500 font-bold">{scalingPlan.threshold}</span>
            </div>
            <div>
              <span className="text-muted block">Replica Boundaries:</span>
              <span className="text-accent font-semibold">
                Min: {scalingPlan.minReplicas} / Max: {scalingPlan.maxReplicas} Pods
              </span>
            </div>
            <div>
              <span className="text-muted block">Deployment Strategy:</span>
              <span className="text-text font-semibold">{scalingPlan.strategy}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default PipelineDiagram
