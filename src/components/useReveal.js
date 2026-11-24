import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useReveal = () => {
  useEffect(() => {
    // Respect accessibility reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Hero light parallax on scroll (subtle scrub)
      const heroContent = document.querySelector('#hero .grid')
      if (heroContent) {
        gsap.to(heroContent, {
          y: 45,
          opacity: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          }
        })
      }

      // 2. Sections fade & slide up when entering viewport
      const sections = document.querySelectorAll('section:not(#hero)')
      sections.forEach((section) => {
        // Section container entry
        gsap.fromTo(
          section,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        )

        // Headings reveal
        const heading = section.querySelector('h2')
        if (heading) {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 88%',
                toggleActions: 'play none none none',
              }
            }
          )
        }

        // Section transition divider accent line wipe
        const divider = section.querySelector('.w-16.h-1')
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: divider,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          )
        }

        // Cards staggered entrance in card grids (Skills, Projects, Impact, Blog, etc.)
        const grids = section.querySelectorAll('.grid')
        grids.forEach((grid) => {
          if (grid.children.length > 1) {
            gsap.fromTo(
              grid.children,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.07,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: grid,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            )
          }
        })
      })
    })

    return () => {
      ctx.revert() // Clean up all listeners and ScrollTriggers on unmount
    }
  }, [])
}

export default useReveal
