import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export const PageIntro = () => {
  const [isFinished, setIsFinished] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })
  const overlayRef = useRef(null)
  const counterRef = useRef(null)
  const progressLineRef = useRef(null)

  useEffect(() => {
    if (isFinished) return

    const overlay = overlayRef.current
    const counterEl = counterRef.current
    const progressLine = progressLineRef.current

    if (!overlay || !counterEl) return

    const countObj = { value: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true)
        // Animate hero elements in after page intro finishes
        const heroElements = document.querySelectorAll('#hero h1, #hero p, #hero a, #hero .font-mono')
        if (heroElements.length) {
          gsap.fromTo(
            heroElements,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.07, ease: 'power3.out' }
          )
        }
      }
    })

    // 1. Counter animation 0% -> 100% in ~0.85s
    tl.to(countObj, {
      value: 100,
      duration: 0.85,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterEl) {
          counterEl.textContent = `${Math.round(countObj.value)}%`
        }
      }
    })

    // Progress bar line grows simultaneously
    if (progressLine) {
      tl.to(progressLine, {
        scaleX: 1,
        duration: 0.85,
        ease: 'power2.inOut'
      }, '<')
    }

    // 2. Wipe up overlay smoothly with power3.inOut
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.65,
      ease: 'power3.inOut',
      delay: 0.05
    })

    return () => {
      tl.kill()
    }
  }, [isFinished])

  if (isFinished) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 min-h-[100dvh] flex flex-col items-center justify-center bg-bg text-text select-none px-4"
      style={{ willChange: 'transform' }}
    >
      <div className="w-full max-w-[24rem] px-4 flex flex-col items-center">
        {/* Terminal Title */}
        <div className="flex items-center gap-2 mb-4 font-mono text-xs text-accent">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>system.boot // yashodip.me</span>
        </div>

        {/* Counter Display */}
        <div
          ref={counterRef}
          className="font-mono text-[clamp(2.75rem,8vw,3.75rem)] font-extrabold tracking-tighter text-text mb-6"
        >
          0%
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-surface-2 rounded-full overflow-hidden border border-border">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-gradient-to-r from-accent to-emerald-500 origin-left scale-x-0"
          />
        </div>

        {/* Status Subtitle */}
        <div className="flex justify-between w-full mt-3 font-mono text-[10px] text-muted gap-2">
          <span>INITIALIZING INFRASTRUCTURE</span>
          <span>READY</span>
        </div>
      </div>
    </div>
  )
}

export default PageIntro
