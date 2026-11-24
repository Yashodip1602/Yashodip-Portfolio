import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from './useTheme'

// Deterministic position generation to ensure pure rendering
function generatePositions(count) {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const s1 = Math.sin(i * 12.9898) * 43758.5453
    const r1 = s1 - Math.floor(s1)
    const s2 = Math.cos(i * 78.233) * 43758.5453
    const r2 = s2 - Math.floor(s2)
    const s3 = Math.sin(i * 45.164) * 43758.5453
    const r3 = s3 - Math.floor(s3)

    const radius = 2.3 + r1 * 2.2
    const theta = r2 * Math.PI * 2
    const phi = Math.acos(r3 * 2 - 1)

    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    pos[i * 3 + 2] = radius * Math.cos(phi)
  }
  return pos
}

const DESKTOP_POSITIONS = generatePositions(90)
const MOBILE_POSITIONS = generatePositions(35)

function FloatingIcosahedron({ isDark, isMobile, prefersReducedMotion }) {
  const groupRef = useRef()
  const outerRef = useRef()
  const innerRef = useRef()
  const pointsRef = useRef()

  // Track mouse position with lerping
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  // Track vertical scroll position
  const scrollY = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion) return

    const handlePointerMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleScroll = () => {
      scrollY.current = window.scrollY || window.pageYOffset
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prefersReducedMotion])

  // Theme-aware colors derived from portfolio palette
  const colors = useMemo(() => {
    if (isDark) {
      return {
        outer: '#06b6d4',
        inner: '#38bdf8',
        particles: '#22d3ee',
        outerOpacity: 0.35,
        innerOpacity: 0.2,
        particlesOpacity: 0.55
      }
    } else {
      return {
        outer: '#0891b2',
        inner: '#0284c7',
        particles: '#0f172a',
        outerOpacity: 0.3,
        innerOpacity: 0.18,
        particlesOpacity: 0.45
      }
    }
  }, [isDark])

  const particlePositions = isMobile ? MOBILE_POSITIONS : DESKTOP_POSITIONS
  const particleCount = isMobile ? 35 : 90

  useFrame((state, delta) => {
    if (prefersReducedMotion || !groupRef.current) return

    // Smooth mouse lerping
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.05)
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.05)

    // Constant slow orbital rotation
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.12
      outerRef.current.rotation.y += delta * 0.18
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.16
      innerRef.current.rotation.z += delta * 0.14
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08
    }

    // Small tilt reacting to mouse position
    groupRef.current.rotation.x = mouse.current.y * 0.35
    groupRef.current.rotation.y = mouse.current.x * 0.35

    // Subtle scroll translation and twist
    const scrollEffect = scrollY.current * 0.001
    groupRef.current.position.y = -scrollEffect * 1.5
    groupRef.current.rotation.z = scrollEffect * 0.4
  })

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 1.5, 0, 0]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[isMobile ? 1.6 : 2.1, 1]} />
        <meshBasicMaterial
          wireframe
          color={colors.outer}
          transparent
          opacity={colors.outerOpacity}
        />
      </mesh>

      {/* Inner Wireframe Core */}
      {!isMobile && (
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.3, 0]} />
          <meshBasicMaterial
            wireframe
            color={colors.inner}
            transparent
            opacity={colors.innerOpacity}
          />
        </mesh>
      )}

      {/* Orbiting Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.04 : 0.055}
          color={colors.particles}
          transparent
          opacity={colors.particlesOpacity}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

export const Scene3D = () => {
  const { isDark } = useTheme()
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    // Accessibility: prefers-reduced-motion listener
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotionChange)

    // Mobile viewport resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Pause rendering loop when tab is hidden
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
        frameloop={isVisible && !prefersReducedMotion ? 'always' : 'never'}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        style={{ pointerEvents: 'none' }}
      >
        <FloatingIcosahedron
          isDark={isDark}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  )
}

export default Scene3D
