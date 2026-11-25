# Project Map: Yashodip Jejurkar Portfolio

> High-performance DevOps & Cloud Engineering Portfolio built with React 19, Vite 8, Tailwind CSS v4, Three.js, GSAP, and Lenis.

---

## Directory Tree

```
portfolio/
├── .github/                   # CI/CD Workflows
│   └── workflows/
│       └── deploy.yml         # GitHub Pages build & deploy with EmailJS secrets
├── .env.example               # Template for EmailJS environment variables
├── docs/                      # Codebase Intelligence & Architecture Documentation
│   ├── ARCHITECTURE.md        # System architecture, data flow, & motion design
│   ├── FILE_RESPONSIBILITIES.md # Exact roles, imports, and exports of all files
│   └── PROJECT_MAP.md         # Directory structure & navigational map (this file)
├── public/                    # Static public assets served at root
│   ├── favicon.svg            # Browser tab favicon
│   ├── icons.svg              # SVG sprite/icon definitions
│   └── resume.pdf             # Downloadable resume document
├── src/
│   ├── assets/                # Bundled media and image assets
│   │   ├── profile.webp       # 600x600 circular profile photo used in HeroOrbit
│   │   ├── profile.jpg        # Fallback profile photograph
│   │   ├── react.svg          # React brand asset
│   │   └── vite.svg           # Vite brand asset
│   ├── components/            # React UI components & motion controllers
│   │   ├── About.jsx          # Profile summary, stats counters, DevOps philosophy
│   │   ├── Blog.jsx           # Engineering articles & LinkedIn technical write-ups
│   │   ├── Contact.jsx        # Contact form, direct links, social icons
│   │   ├── Experience.jsx     # Career timeline, milestones, responsibilities
│   │   ├── Footer.jsx         # Site footer, copyright, system status, social links
│   │   ├── Hero.jsx           # Landing hero section with typewriter text & HeroOrbit
│   │   ├── HeroOrbit.jsx      # Center photo surrounded by 3 tilted 3D toolchain rings
│   │   ├── HeroOrbit.css      # CSS 3D planetary orbit transforms, depth & billboard keyframes
│   │   ├── Impact.jsx         # Key metrics, uptime stats, deployment frequency
│   │   ├── Navbar.jsx         # Sticky navigation bar with anchor links & theme toggle
│   │   ├── PageIntro.jsx      # 1s terminal boot sequence & counter curtain wipe
│   │   ├── PipelineDiagram.jsx # Interactive CI/CD pipeline architectural diagram
│   │   ├── Projects.jsx       # Featured architecture projects & repository links
│   │   ├── Scene3D.jsx        # Lazy-loaded Three.js/R3F wireframe icosahedron & particles
│   │   ├── Skills.jsx         # Filterable DevOps skills & toolchain grid
│   │   ├── SmoothScroll.jsx   # Lenis smooth-scroll provider synced with GSAP
│   │   ├── TechIcon.jsx       # Unified tech icon mapper (Simple Icons / Lucide / FontAwesome)
│   │   ├── TerminalCard.jsx   # Standalone interactive terminal component
│   │   ├── ThemeContext.jsx   # ThemeProvider context managing dark/light modes
│   │   ├── ThemeContextInstance.js # React createContext instance
│   │   ├── ThemeToggle.jsx    # Sun/Moon mode toggle switch button
│   │   ├── useReveal.js       # GSAP ScrollTrigger hook for section/card entrances
│   │   └── useTheme.js        # Custom hook consuming ThemeContext
│   ├── data/                  # Decoupled content & configuration data
│   │   ├── blog.js            # Published articles, takeaways, tags, external URLs
│   │   ├── experience.js      # Work history, roles, achievements, company details
│   │   ├── impact.js          # Quantitative engineering metrics & impact stats
│   │   ├── personal.js        # Contact details, bio, roles, social links, location
│   │   ├── projects.js        # Deep-dive DevOps projects, architectures, GitHub URLs
│   │   └── skills.js          # Toolchain categories and detailed skill cards
│   ├── App.jsx                # Application root mounting providers, sections, & 3D canvas
│   ├── index.css              # Tailwind CSS v4 directives, semantic variables, global styles
│   └── main.jsx               # React DOM entry point rendering <App />
├── AGENTS.md                  # Mandatory AI instructions (read & update docs/)
├── CNAME                      # Custom domain configuration (yashodip.me)
├── eslint.config.js           # Flat ESLint configuration rules
├── index.html                 # HTML shell, viewport, metadata, fonts
├── package.json               # Dependencies, scripts, package metadata
├── package-lock.json          # Deterministic dependency lockfile
├── README.md                  # Project documentation & deployment guide
└── vite.config.js             # Vite build & Tailwind plugin configuration
```

---

## File Categories

| Category | Primary Directory | Description |
| :--- | :--- | :--- |
| **Configuration** | `/` | Vite, ESLint, npm, and domain configuration files. |
| **Core Entry** | `src/` | `main.jsx`, `App.jsx`, `index.css`, `index.html`. |
| **Page Sections** | `src/components/` | `Hero`, `About`, `Skills`, `Projects`, `Impact`, `Blog`, `Experience`, `Contact`, `Footer`. |
| **Motion & 3D** | `src/components/` | `Scene3D`, `SmoothScroll`, `PageIntro`, `useReveal`, `HeroOrbit`. |
| **Theme & UI** | `src/components/` | `ThemeContext`, `ThemeToggle`, `TechIcon`, `Navbar`. |
| **Data Layer** | `src/data/` | Structured JavaScript objects separating content from UI code. |
| **Assets** | `src/assets/`, `public/` | Optimized WebP images, SVGs, and downloadable PDF resume. |
| **Documentation** | `docs/` | Codebase architecture, project mapping, and file roles. |
