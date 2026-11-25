import { useEffect, useRef, useState } from 'react'
import profileImg from '../assets/profile.webp'
import {
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiLinux,
  SiGit,
  SiTerraform,
  SiPostgresql,
  SiRedis,
  SiNodedotjs,
  SiGrafana,
  SiPrometheus,
  SiGitlab,
  SiSonarqubeserver,
  SiTrivy
} from 'react-icons/si'
import { FaAws, FaGithub } from 'react-icons/fa6'
import './HeroOrbit.css'

const RINGS = [
  {
    id: 'inner',
    radiusVar: 'var(--r1)',
    durationSec: 25,
    direction: 'cw',
    mobileCount: 4,
    icons: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Kubernetes', Icon: SiKubernetes, color: '#326CE5' },
      { name: 'Jenkins', Icon: SiJenkins, color: '#D24939' },
      { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
      { name: 'Git', Icon: SiGit, color: '#F05032' }
    ]
  },
  {
    id: 'middle',
    radiusVar: 'var(--r2)',
    durationSec: 38,
    direction: 'ccw',
    mobileCount: 4,
    icons: [
      { name: 'AWS', Icon: FaAws, color: '#FF9900' },
      { name: 'Terraform', Icon: SiTerraform, color: '#7B42BC' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Redis', Icon: SiRedis, color: '#DC382D' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' }
    ]
  },
  {
    id: 'outer',
    radiusVar: 'var(--r3)',
    durationSec: 55,
    direction: 'cw',
    mobileCount: 5,
    icons: [
      { name: 'Grafana', Icon: SiGrafana, color: '#F46800' },
      { name: 'Prometheus', Icon: SiPrometheus, color: '#E6522C' },
      { name: 'GitHub', Icon: FaGithub, color: 'var(--text)' },
      { name: 'GitLab', Icon: SiGitlab, color: '#FC6D26' },
      { name: 'SonarQube', Icon: SiSonarqubeserver, color: '#4E9BCD' },
      { name: 'Trivy', Icon: SiTrivy, color: '#38BDF8' }
    ]
  }
]

const MAX_TILT_DEG = 10

export const HeroOrbit = () => {
  const containerRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640
    }
    return false
  })

  // Track mobile (< 640px) breakpoint for 4/4/5 vs 5/5/6 icon counts
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Pause animations when browser tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.visibilityState === 'hidden')
    }
    handleVisibility()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Subtle desktop mouse tilt up to 10deg via requestAnimationFrame
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktopHoverQuery = window.matchMedia('(min-width: 1024px) and (hover: hover)')

    if (motionQuery.matches || !desktopHoverQuery.matches) {
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
      return
    }

    const state = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 }
    let rafId = null

    const tick = () => {
      state.currentX += (state.targetX - state.currentX) * 0.08
      state.currentY += (state.targetY - state.currentY) * 0.08

      el.style.setProperty('--tilt-x', `${state.currentX.toFixed(3)}deg`)
      el.style.setProperty('--tilt-y', `${state.currentY.toFixed(3)}deg`)

      if (
        Math.abs(state.targetX - state.currentX) > 0.01 ||
        Math.abs(state.targetY - state.currentY) > 0.01
      ) {
        rafId = requestAnimationFrame(tick)
      } else {
        rafId = null
      }
    }

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const handlePointerMove = (e) => {
      if (motionQuery.matches || !desktopHoverQuery.matches) return
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1))
      const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1))
      state.targetY = nx * MAX_TILT_DEG
      state.targetX = -ny * MAX_TILT_DEG
      startLoop()
    }

    const handlePointerLeave = () => {
      state.targetX = 0
      state.targetY = 0
      startLoop()
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    el.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerleave', handlePointerLeave)
      if (rafId !== null) cancelAnimationFrame(rafId)
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`hero-orbit-container ${isPaused ? 'is-paused' : ''}`}
    >
      {/* Decorative Aura Glow */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent/20 via-emerald-500/10 to-transparent blur-2xl pointer-events-none" />

      <div className="orbit-stage">
        {/* Center Profile Photo (flat, with float animation) */}
        <div className="orbit-center-photo">
          <div className="profile-float-anim">
            <div className="relative rounded-full p-1 bg-gradient-to-b from-accent to-emerald-500/50 shadow-xl shadow-accent/15">
              <img
                src={profileImg}
                alt="Yashodip Jejurkar"
                loading="eager"
                width={190}
                height={190}
                className="orbit-photo-img rounded-full object-cover border-2 border-accent"
              />
            </div>
          </div>
        </div>

        {/* Three 3D Tilted Orbital Rings */}
        {RINGS.map((ring) => {
          const visibleIcons = isMobile ? ring.icons.slice(0, ring.mobileCount) : ring.icons
          const count = visibleIcons.length
          const isCw = ring.direction === 'cw'
          const spinName = isCw ? 'orbit-spin-cw' : 'orbit-spin-ccw'
          const counterName = isCw ? 'orbit-spin-ccw' : 'orbit-spin-cw'

          return (
            <div
              key={ring.id}
              className="orbit-plane"
              style={{
                '--r': ring.radiusVar,
                '--duration': `${ring.durationSec}s`,
                '--spin-name': spinName,
                '--counter-name': counterName
              }}
            >
              <div className="orbit-ring-line" />

              <div className="orbit-spinner">
                {visibleIcons.map(({ name, Icon, color }, idx) => {
                  const angle = (360 / count) * idx
                  const depthDelay = isCw
                    ? -((ring.durationSec * idx) / count)
                    : -((ring.durationSec * (count - idx)) / count)

                  return (
                    <div
                      key={name}
                      className="orbit-slot"
                      style={{ '--a': `${angle}deg` }}
                    >
                      <div className="orbit-counter-spin">
                        <div className="orbit-billboard">
                          <div
                            className="orbit-depth"
                            style={{ '--depth-delay': `${depthDelay.toFixed(2)}s` }}
                          >
                            <div className="orbit-icon-card" aria-label={name}>
                              <Icon
                                className="orbit-icon-svg"
                                style={{ color }}
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HeroOrbit
