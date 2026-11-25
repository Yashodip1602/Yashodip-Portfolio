# File Responsibilities: Yashodip Jejurkar Portfolio

This reference document defines the specific role, exports, dependencies, and modification guidelines for every important file in the project.

---

## 1. Application Root & Configuration

### `index.html`
- **Role**: HTML5 entry point.
- **Responsibilities**: Sets viewport, document title (`Yashodip Jejurkar | DevOps & Cloud Engineer`), meta descriptions, preconnects to Google Fonts (JetBrains Mono & Inter), and mounts `<div id="root">`.
- **Modification Rule**: Do not modify font imports or root mounting structure without verifying typography in `index.css`.

### `vite.config.js`
- **Role**: Vite bundler configuration.
- **Responsibilities**: Integrates `@vitejs/plugin-react` and `@tailwindcss/vite`.
- **Modification Rule**: Only modify when adding new build-level plugins or altering asset bundling options.

### `package.json`
- **Role**: Project manifests and dependencies.
- **Responsibilities**: Defines build scripts (`dev`, `build`, `lint`, `preview`), production dependencies (`lenis`, `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `lucide-react`, `react-icons`), and devDependencies.
- **Modification Rule**: Only install authorized libraries; verify peer dependency support with React 19 before adding dependencies.

### `src/main.jsx`
- **Role**: React client bootstrapping.
- **Responsibilities**: Mounts `<App />` into DOM element `#root` using `react-dom/client` `createRoot`.
- **Modification Rule**: Keep strictly minimal. Do not add page-level state or layout styles here.

### `src/App.jsx`
- **Role**: Top-level application layout controller.
- **Responsibilities**:
  - Wraps tree in `<ThemeProvider>` and `<SmoothScroll>`.
  - Mounts `<PageIntro>` and `<Navbar>`.
  - Lazy loads `<Scene3D>` with `<Suspense fallback={null}>`.
  - Initializes `useReveal()` hook for ScrollTrigger animations.
  - Sequentially renders all main page sections and `<Footer>`.
- **Modification Rule**: When adding or reordering page sections, update only within `<main className="relative z-10">`.

### `src/index.css`
- **Role**: Global design tokens and styles.
- **Responsibilities**:
  - Tailwind CSS v4 `@import "tailwindcss";`.
  - Semantic CSS variables (`:root` and `.dark` palettes).
  - Custom scrollbar styling and terminal keyframe utilities (`animate-blink`, `animate-pipeline-flow`).
- **Modification Rule**: Always use CSS variables (`var(--bg)`, `var(--text)`, `var(--accent)`) instead of hardcoded hex colors to maintain dark/light theme consistency.

---

## 2. Motion & 3D Visuals

### `src/components/SmoothScroll.jsx`
- **Role**: Smooth momentum scroll provider.
- **Responsibilities**:
  - Initializes Lenis smooth scrolling.
  - Syncs scroll updates with `ScrollTrigger.update` and drives `lenis.raf()` via `gsap.ticker`.
  - Intercepts clicks on internal anchor links (`href^="#"`) for smooth gliding.
  - Bypasses momentum on touch devices and respects `prefers-reduced-motion`.
- **Modification Rule**: Ensure all ticker callbacks and event listeners are cleaned up in the `useEffect` return statement.

### `src/components/Scene3D.jsx`
- **Role**: Fixed 3D WebGL background experience.
- **Responsibilities**:
  - Renders a floating wireframe icosahedron and constellation particle cloud using Three.js and `@react-three/fiber`.
  - Lerps 3D rotation based on mouse coordinates and vertical scroll offset.
  - Adapts colors to `isDark` theme reactively.
  - Pauses rendering loop (`frameloop="never"`) when tab is hidden or when reduced motion is requested.
  - Caps DPR at 2 for mobile and retina performance.
- **Modification Rule**: Keep particle count lightweight (<=90 on desktop, <=35 on mobile). Do not load heavy 3D GLTF models.

### `src/components/useReveal.js`
- **Role**: Centralized scroll reveal animation manager.
- **Responsibilities**:
  - Uses `gsap.context()` to scope animations.
  - Parallaxes hero text with subtle scroll scrubbing.
  - Fades and slides sections into view when entering the viewport.
  - Staggers child cards in grid containers (`stagger: 0.07`).
  - Scales section accent divider lines.
  - Reverts and kills all ScrollTriggers on unmount.
- **Modification Rule**: Always keep triggers within `ctx.revert()` cleanup. Respect `prefers-reduced-motion`.

### `src/components/PageIntro.jsx`
- **Role**: Initial page loading experience.
- **Responsibilities**:
  - Displays a terminal boot sequence and 0% to 100% counter (~0.85s).
  - Curtain-wipes up with `ease: 'power3.inOut'` and triggers hero element entrance.
  - Self-unmounts from DOM upon completion.
  - Instantly skipped if `prefers-reduced-motion` is active.
- **Modification Rule**: Keep total duration under 1.2 seconds to avoid blocking user interaction.

### `src/components/HeroOrbit.jsx` & `HeroOrbit.css`
- **Role**: Hero 3D planetary toolchain centerpiece replacing the legacy terminal.
- **Responsibilities**:
  - Centers flat circular profile photo (`src/assets/profile.webp`) with a subtle 6s float animation.
  - Three 3D tilted dashed rings (`rotateX(65deg)` within `perspective: 1200px`):
    - Inner (`25s` CW, `--r1`): Docker, Kubernetes, Jenkins, Linux, Git (4 on `< 640px`).
    - Middle (`38s` CCW, `--r2`): AWS, Terraform, PostgreSQL, Redis, Node.js (4 on `< 640px`).
    - Outer (`55s` CW, `--r3`): Grafana, Prometheus, GitHub, GitLab, SonarQube, Trivy (5 on `< 640px`).
  - Icons-only cards (no labels or tooltips) with billboard counter-rotation and depth scaling/opacity (`translateZ`, `scale`, `opacity`).
  - Responsive CSS variables (`--size`, `--r1`, `--r2`, `--r3`, `--icon`, `--photo`) with `>= 20px` photo-to-ring gap at all breakpoints.
  - Subtle `requestAnimationFrame` mouse tilt (`<= 10deg`) on desktop (`>= 1024px`, hover-capable), continuous rotation without hover pause, pause when tab is hidden, and full `prefers-reduced-motion` guard.
- **Modification Rule**: Animate strictly with `transform` and `opacity` (`will-change: transform`), keep `--a` angle variables and shared keyframes outside media queries, and preserve theme CSS variables.

---

## 3. UI & Page Sections

### `src/components/Hero.jsx`
- **Role**: Landing fold introduction.
- **Responsibilities**: Renders availability badge, Yashodip Jejurkar title, typewriter roles, tech pills, CTAs, and mounts `<HeroOrbit />`.
- **Modification Rule**: Do not alter typewriter timer intervals or text pills without verifying responsive height.

### `src/components/About.jsx`
- **Role**: Personal biography and DevOps philosophy.
- **Responsibilities**: Renders summary narrative, location pill, and animated metric counters (`AnimatedCounter`).
- **Modification Rule**: Numeric metric values should stay synchronized with `src/data/impact.js`.

### `src/components/Skills.jsx`
- **Role**: Filterable skills and toolchain matrix.
- **Responsibilities**: Displays category filter buttons (`All Disciplines`, `CI/CD`, `Containers & K8s`, etc.) and renders filterable cards from `skillsData`.
- **Modification Rule**: Do not hardcode skill cards in JSX; add or edit entries in `src/data/skills.js`.

### `src/components/Projects.jsx`
- **Role**: Featured engineering projects showcase.
- **Responsibilities**:
  - Highlights featured project with architectural walkthrough and quick tags.
  - Displays secondary projects in a responsive grid.
  - Mounts `<PipelineDiagram />` for CI/CD visualization.
- **Modification Rule**: External links must always retain `target="_blank"` and `rel="noopener noreferrer"`.

### `src/components/Impact.jsx`
- **Role**: Quantitative engineering metrics.
- **Responsibilities**: Renders high-availability uptime (99.9%), deployment frequency, RPO/RTO metrics, and engineering achievements.
- **Modification Rule**: Data sourced from `src/data/impact.js`.

### `src/components/Blog.jsx`
- **Role**: Technical writing and engineering articles.
- **Responsibilities**: Displays engineering case studies, key takeaways, tags, and direct links to LinkedIn technical publications.
- **Modification Rule**: Data sourced from `src/data/blog.js`.

### `src/components/Experience.jsx`
- **Role**: Professional career history.
- **Responsibilities**: Displays interactive timeline with company, role, milestones, and technologies used.
- **Modification Rule**: Data sourced from `src/data/experience.js`.

### `src/components/Contact.jsx`
- **Role**: Contact section and interactive form.
- **Responsibilities**: Direct email, phone, location details, social profile buttons, and contact inquiry form.
- **Modification Rule**: Reads contact coordinates dynamically from `personalData.contact`.

### `src/components/Footer.jsx`
- **Role**: Site footer.
- **Responsibilities**: Copyright text, status badge, navigation links, and social links with `rel="noopener noreferrer"`.
- **Modification Rule**: Keep social links synced with `personalData.contact`.

### `src/components/Navbar.jsx`
- **Role**: Global header navigation.
- **Responsibilities**: Sticky glassmorphic navbar with anchor links, mobile slide-out menu, and `<ThemeToggle />`.
- **Modification Rule**: Ensure all navigation links match section IDs in `App.jsx`.

### `src/components/TechIcon.jsx`
- **Role**: Unified brand and system icon resolver.
- **Responsibilities**: Maps technology string keys (`docker`, `aws`, `terraform`, `redis`, etc.) to brand-colored SVG icons from Simple Icons, FontAwesome 6, or Lucide.
- **Modification Rule**: When adding new tools to `skills.js` or `projects.js`, add a corresponding `case` in `TechIcon.jsx`.

### `src/components/PipelineDiagram.jsx`
- **Role**: Architectural visualization of GitOps pipeline.
- **Responsibilities**: Interactive diagram demonstrating Code -> Build -> Docker -> k3s -> ArgoCD workflow with flow animations.
- **Modification Rule**: Preserve SVG viewBox and responsive container constraints.

---

## 4. Theme System

### `src/components/ThemeContext.jsx` & `ThemeContextInstance.js`
- **Role**: Theme provider and React context.
- **Responsibilities**: Manages `'dark' | 'light'` state, syncs with `localStorage`, and updates `class="dark"` on `document.documentElement`.
- **Modification Rule**: Do not introduce alternative theme mechanisms; all components should consume `useTheme()`.

### `src/components/ThemeToggle.jsx`
- **Role**: UI toggle button for light/dark mode.
- **Responsibilities**: Sun/Moon icon toggle with smooth transition and accessibility labels.
- **Modification Rule**: Keep button dimensions aligned with navbar layout.

### `src/components/useTheme.js`
- **Role**: Convenience hook.
- **Responsibilities**: Returns `{ theme, isDark, toggleTheme }` from `ThemeContext`.
- **Modification Rule**: Use this hook whenever a component or canvas requires theme state.

---

## 5. Data Layer (`src/data/`)

| File | Primary Responsibility |
| :--- | :--- |
| `personal.js` | Bio, title typewriter list, location (`Rahata, Maharashtra, India`), phone, email, and social profiles. |
| `skills.js` | Category taxonomy (`skillCategories`) and 18 toolchain skill definitions (`skillsData`). |
| `projects.js` | 4 in-depth DevOps projects with architectures, live links, and GitHub repositories. |
| `experience.js` | Professional experience timeline and company responsibilities. |
| `impact.js` | Key quantifiable impact statistics and SLAs. |
| `blog.js` | 5 DevOps engineering write-ups with takeaways and LinkedIn links. |

---

## 6. Static & Media Assets

- **`src/assets/profile.webp`**: Optimized 600x600 circular photo used in `HeroOrbit.jsx`.
- **`public/resume.pdf`**: Production PDF resume downloaded via the Hero CTA.
- **`public/favicon.svg`**: Vector browser tab icon.
