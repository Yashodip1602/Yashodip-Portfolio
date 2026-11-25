# AI Assistant Rules (`AGENTS.md`)

All AI coding assistants working on this repository **MUST** follow these mandatory rules on every task.

---

## 1. Mandatory Starting Prompt Context (`docs/` First)

Before planning or editing any file, **ALWAYS** read the project documentation in `docs/` to understand the system architecture, file roles, and conventions:

1. [`docs/PROJECT_MAP.md`](docs/PROJECT_MAP.md) — Directory structure and file categories.
2. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — High-level architecture, theme pipeline, and motion/3D lifecycle.
3. [`docs/FILE_RESPONSIBILITIES.md`](docs/FILE_RESPONSIBILITIES.md) — Exact responsibilities, dependencies, and modification rules per file.

---

## 2. Mandatory Documentation Updates (Always Write Docs)

Every code change **MUST** keep `docs/` synchronized with the codebase:

- Whenever you add, remove, rename, or significantly change a file, component, hook, CSS architecture, or dependency:
  - Update [`docs/PROJECT_MAP.md`](docs/PROJECT_MAP.md) if the file tree or component descriptions changed.
  - Update [`docs/FILE_RESPONSIBILITIES.md`](docs/FILE_RESPONSIBILITIES.md) with the updated roles and modification rules.
  - Update [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) if data flow, theme handling, or animation/3D behavior changed.
- Do not consider a task complete until both the code and `docs/` are updated and verified (`npm run lint && npm run build`).

---

## 3. Core Engineering Guardrails

- **Theme System**: Preserve the existing `.dark` class mechanism on `document.documentElement` (`ThemeContext.jsx`) and semantic CSS variables (`--bg`, `--surface`, `--surface-2`, `--border`, `--text`, `--muted`, `--accent`).
- **Performance & Motion**: Animate only `transform` and `opacity`, respect `prefers-reduced-motion: reduce`, and pause background/3D loops when the tab is hidden (`visibilitychange`).
- **No Unrequested Dependencies**: Do not add new npm packages without explicit user approval.
- **Language**: Keep all code, comments, and documentation in English.
