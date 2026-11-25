import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Respect prefers-reduced-motion and preserve native scroll on mobile (< 768px)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches
    if (prefersReducedMotion || isMobileViewport) {
      return
    }

    // Touch device detection to preserve responsive native touch scrolling if laggy
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: isTouch ? 1 : 1.8,
    })
    lenisRef.current = lenis

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    // Smooth scroll for anchor navigation links (#about, #skills, #projects, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(targetElement, { offset: -70, duration: 1.2 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return children || null
}

export default SmoothScroll
