import profileImg from '../assets/profile.webp'
import {
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiLinux,
  SiTerraform,
  SiPostgresql,
  SiNodedotjs,
  SiGrafana
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import './HeroOrbit.css'

const innerIcons = [
  { name: 'Docker', Icon: SiDocker, color: '#2496ED', angle: '0deg' },
  { name: 'Kubernetes', Icon: SiKubernetes, color: '#326CE5', angle: '90deg' },
  { name: 'Jenkins', Icon: SiJenkins, color: '#D24939', angle: '180deg' },
  { name: 'Linux', Icon: SiLinux, color: '#FCC624', angle: '270deg' }
]

const outerIcons = [
  { name: 'AWS', Icon: FaAws, color: '#FF9900', angle: '0deg', desktopOnly: false },
  { name: 'Terraform', Icon: SiTerraform, color: '#7B42BC', angle: '72deg', desktopOnly: false },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1', angle: '144deg', desktopOnly: false },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E', angle: '216deg', desktopOnly: true },
  { name: 'Grafana', Icon: SiGrafana, color: '#F46800', angle: '288deg', desktopOnly: true }
]

export const HeroOrbit = () => {
  return (
    <div className="hero-orbit-container">
      {/* Decorative Aura Glow */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent/20 via-emerald-500/10 to-transparent blur-2xl pointer-events-none" />

      {/* Orbit Rings (Dashed Borders) */}
      <div className="orbit-ring-outer" />
      <div className="orbit-ring-inner" />

      {/* Inner Orbit Track (25s Clockwise) */}
      <div className="orbit-track-inner">
        {innerIcons.map(({ name, Icon, color, angle }) => (
          <div
            key={name}
            className="orbit-slot"
            style={{
              '--angle': angle,
              '--radius': 'var(--inner-radius)'
            }}
          >
            <div className="orbit-counter-cw">
              <div className="relative group/orbit flex items-center justify-center">
                <div
                  className="w-11 h-11 rounded-xl bg-surface-2 border border-border flex items-center justify-center shadow-md transition-all duration-200 group-hover/orbit:scale-110 group-hover/orbit:border-accent group-hover/orbit:shadow-accent/20 cursor-pointer"
                  aria-label={name}
                >
                  <Icon
                    className="w-5 h-5 orbit-brand-icon"
                    style={{ color }}
                  />
                </div>
                {/* Tooltip */}
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] font-mono font-medium text-text shadow-lg opacity-0 pointer-events-none group-hover/orbit:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
                  {name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Outer Orbit Track (40s Counter-Clockwise) */}
      <div className="orbit-track-outer">
        {outerIcons.map(({ name, Icon, color, angle, desktopOnly }) => (
          <div
            key={name}
            className={`orbit-slot ${desktopOnly ? 'hidden md:block' : ''}`}
            style={{
              '--angle': angle,
              '--radius': 'var(--outer-radius)'
            }}
          >
            <div className="orbit-counter-ccw">
              <div className="relative group/orbit flex items-center justify-center">
                <div
                  className="w-11 h-11 rounded-xl bg-surface-2 border border-border flex items-center justify-center shadow-md transition-all duration-200 group-hover/orbit:scale-110 group-hover/orbit:border-accent group-hover/orbit:shadow-accent/20 cursor-pointer"
                  aria-label={name}
                >
                  <Icon
                    className="w-5 h-5 orbit-brand-icon"
                    style={{ color }}
                  />
                </div>
                {/* Tooltip */}
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] font-mono font-medium text-text shadow-lg opacity-0 pointer-events-none group-hover/orbit:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
                  {name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Center Profile Photo with Float Animation */}
      <div className="profile-float-anim relative z-10 flex items-center justify-center">
        <div className="relative rounded-full p-1 bg-gradient-to-b from-accent to-emerald-500/50 shadow-xl shadow-accent/15">
          <img
            src={profileImg}
            alt="Yashodip Jejurkar"
            loading="eager"
            width={200}
            height={200}
            className="rounded-full object-cover border-2 border-accent"
            style={{
              width: 'var(--photo-size)',
              height: 'var(--photo-size)',
              objectPosition: 'center 35%'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default HeroOrbit
