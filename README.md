# Yashodip Jejurkar — DevOps Engineer Portfolio

A modern, high-performance portfolio website for **Yashodip Jejurkar**, DevOps Engineer based in Rahata, Maharashtra, India. Built with **React (Vite)**, **Tailwind CSS v4**, and **Framer Motion**, featuring a dark terminal-inspired cloud engineering aesthetic with optional light theme toggle, interactive terminal emulator, and an animated CI/CD GitOps pipeline runner.

---

## ⚡ Tech Stack & Architecture

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom themes and dark/light mode
- **Animations**: Framer Motion (scroll reveals, animated counters, timeline pulses, pipeline flow)
- **Icons**: `react-icons` (official tech logos for Jenkins, ArgoCD, Docker, Kubernetes, AWS, PostgreSQL, etc.) and `lucide-react`
- **Typography**: `JetBrains Mono` (terminal commands, badges, headings) & `Inter` (body copy)
- **Design System**: Glassmorphism cards, cyan & emerald accents, cyber grid pattern, responsive mobile navigation

---

## 🚀 Quick Start (Run Locally)

### 1. Prerequisites
Make sure you have Node.js (v18+ recommended) and npm installed:
```bash
node -v
npm -v
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to explore the live site.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

### 6. Lint Codebase
```bash
npm run lint
```

---

## 📂 Project Structure

```text
portfolio/
├── public/
│   ├── favicon.svg             # DevOps terminal SVG favicon
│   └── resume.pdf              # Placeholder resume PDF (replace with yours)
├── src/
│   ├── assets/                 # Static assets & graphics
│   ├── components/             # Reusable UI & section components
│   │   ├── About.jsx           # Bio, DevOps principles & animated stat counters
│   │   ├── Blog.jsx            # Learning journey cards (Day 22 - Day 32)
│   │   ├── Contact.jsx         # Email copy button, SLAs & contact form
│   │   ├── Experience.jsx      # Vertical timeline (Experience, Education, Certs)
│   │   ├── Footer.jsx          # Social links, cluster health status ticker
│   │   ├── Hero.jsx            # Typing animation ($ whoami), status pills & CTAs
│   │   ├── Impact.jsx          # 4 reliability & automation highlight cards
│   │   ├── Navbar.jsx          # Sticky glassmorphism header & mobile drawer
│   │   ├── PipelineDiagram.jsx # Interactive animated CI/CD GitOps pipeline runner
│   │   ├── Projects.jsx        # Master project + PostgreSQL HA + IaC projects
│   │   ├── TechIcon.jsx        # Centralized tool & cloud logos
│   │   ├── TerminalCard.jsx    # Interactive Linux/kubectl terminal emulator
│   │   ├── ThemeContext.jsx    # Dark/Light mode theme provider
│   │   ├── ThemeContextInstance.js # React context definition
│   │   ├── ThemeToggle.jsx     # Animated Sun/Moon theme toggle button
│   │   └── useTheme.js         # Custom useTheme hook
│   ├── data/                   # ALL content lives here for easy editing
│   │   ├── personal.js         # Name, bio, contact links, stats, CLI outputs
│   │   ├── skills.js           # Grouped skills (CI/CD, K8s, Cloud, DB, Concepts)
│   │   ├── projects.js         # Project architectures, scaling plans, repos
│   │   ├── impact.js           # 4 key impact metrics & achievements
│   │   ├── blog.js             # Learning journey posts & insights
│   │   └── experience.js       # Career milestones, degrees, certifications
│   ├── App.jsx                 # Main application layout
│   ├── index.css               # Tailwind CSS v4 setup & custom animations
│   └── main.jsx                # React root mount
├── index.html                  # SEO tags, OpenGraph, Google Fonts (JetBrains Mono & Inter)
├── vite.config.js              # Vite config with @tailwindcss/vite
└── package.json
```

---

## ✏️ How to Customize Your Content

All data and personal information are separated from components and located in `src/data/*.js`. Search for `// TODO: replace` to quickly find fields you may want to update:

1. **`src/data/personal.js`**:
   - Change your name, location, role, bio paragraphs
   - Update contact email, phone, LinkedIn, GitHub, and Twitter URLs
   - Update stats (Projects, Tools, Automated Deployments, Target SLA)
   - Add your own resume to `public/resume.pdf` or change `resumeUrl`

2. **`src/data/skills.js`**:
   - Add or modify tools and technologies in CI/CD, Kubernetes, Cloud (AWS), Database (PostgreSQL), and Architectural Concepts.

3. **`src/data/projects.js`**:
   - Update repository URLs (`githubUrl`) and live documentation URLs (`liveUrl`)
   - Customize architecture highlights or scaling plan metrics

4. **`src/data/impact.js`**:
   - Adjust the 4 headline impact statistics and bullet points

5. **`src/data/blog.js`**:
   - Add new DevOps learning journey articles or update LinkedIn post links

6. **`src/data/experience.js`**:
   - Update degree names, university, grades, past work experience, and certifications

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)

#### Option A: Via Vercel Web Dashboard (Zero Configuration)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your portfolio repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

#### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

### Deploy to Netlify

#### Option A: Via Netlify Web Dashboard
1. Push your code to GitHub.
2. Log in to [Netlify](https://www.netlify.com/) and click **Add new site** > **Import an existing project**.
3. Select your repository.
4. Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy Site**.

#### Option B: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

---

## 🔍 Features & DevOps Highlights

- **Terminal-First Interactive CLI**: Live command switcher simulating `kubectl get nodes`, `kubectl get pods`, `docker ps`, and `jenkins-cli build deploy-prod`.
- **Interactive Visual Pipeline Simulator**: Full GitOps CI/CD flow from `Git Push` ➔ `Jenkins CI` ➔ `Docker Build` ➔ `Registry` ➔ `ArgoCD Sync` ➔ `k3s Cluster` with flowing particle lines and step inspector.
- **CPU-Based Autoscaling (HPA)**: Displays production-grade Horizontal Pod Autoscaler policies configured at 70% CPU threshold.
- **High-Availability PostgreSQL Setup**: Explains primary-replica streaming replication, WAL archival, and automated cron backups to AWS S3 with strict RPO (<15m) and RTO (<30m) objectives.
- **Accessible & SEO Ready**: Semantic HTML5 tags, full ARIA attributes, Twitter cards, Open Graph tags, and custom SVG favicon.

---

## 📄 License

MIT © [Yashodip Jejurkar](https://github.com/Yashodip1602)
