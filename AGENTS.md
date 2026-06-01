# Agent Notes

## Welcome

This document tracks project-specific constraints and patterns to ensure consistency across AI agent sessions. **Do not commit this file.**

---

## Repo Shape & Architecture

### Modern Web Stack

- **Core**: **Vite 8** + **React 19** (Strict Mode).
- **Routing**: **TanStack Router** (`@tanstack/react-router`) with type-safe routing.
- **Data Fetching**: **TanStack Query v5** (`@tanstack/react-query`) for all async data. Use `useQuery` with `staleTime` and explicit types.
- **UI Components**: **Shadcn UI** (Radix-based) + **Lucide React** for icons.
- **Styling**: **Tailwind CSS v4** (CSS-driven configuration) + Vanilla CSS Variables.
- **Animation**: **Motion v12+** (`framer-motion`). Prefer `useAnimate` for complex sequences and spring-based transitions for tactile feedback.
- **`mcp-server/`**: Standalone Node.js MCP server providing academic management tools.

### The Data Pipeline (Reactive Content)

Strict **Content-First** architecture:

1. **Source**: `content/` contains JSON/MDX files.
   - Root files = English.
   - `content/zh/` = Chinese counterparts (mirrored structure).
2. **Aggregation**: `src/data/index.ts` uses `import.meta.glob` (eager) to load all content at build time. Zod schemas in `src/schemas/index.ts` validate every file — **throws on mismatch**, no silent fallback.
3. **Consumption**: Components **MUST ONLY** access site/content data via the `getLocalizedData` helper or `useLocalizedData` hook.
   - Never import `siteConfig` or static data directly into components.

---

## Theme & Aesthetic System

### 1. Custom Theme Engine

Themes (Nord, Catppuccin, etc.) are defined in `src/themes/`.

- **Variable-Driven**: Components use Tailwind color tokens (e.g., `bg-primary`) mapped to CSS variables in `index.css`.
- **`ThemeInjector`**: Injects color-scheme-specific variables into `:root` based on active theme and `colorMode`.
- **Switching themes**: Managed via `ThemeContext` using the View Transitions API for a circular ripple effect.

### 2. Terminal Aesthetics

- **Typography**: Primary font is `Maple Mono` (monospaced) with CN support.
- **Visual Atoms**: CRT scanlines overlay (`body::before` in `index.css`), RGB light bars, prompt syntax prefix (`username@projects:~$`).
- **Transitions**: Theme switching uses circular ripple transitions via `::view-transition`.

---

## Animation System

All micro-interactions and entrances use `src/components/animations/MotionList.tsx`:

- **`MotionList`**: Staggered entrance for lists/grids. Use `staggerDelay={0.1}`.
- **`MotionBox`**: Fade + slide-up entrance wrapper for single items.
- **`MotionHover`**: Spring-physics scaling (1.05x) and lift (-2px) on hover/tap.

---

## Coding Standards & Linting

### Strict ESLint Configuration

The project uses **ESLint 10** with `typescript-eslint` strict type-checked rules:

- **Type Imports**: Use `@typescript-eslint/consistent-type-imports` with `fixStyle: 'inline-type-imports'`.
- **Sorting**: `eslint-plugin-perfectionist` enforces natural sorting for imports, objects, and types.
- **Banned Patterns**:
  - `no-explicit-any`: **Error**. Always define interfaces in `src/types/` or use Zod types.
  - `no-console`: **Error** (except `warn` and `error`).
  - Underscore-prefixed variables (`_var`): **Banned**.
- **Hooks**: `react-hooks/exhaustive-deps` is an **Error**, not a warning.

### Responsiveness & Performance

- **Tailwind-First**: Use Tailwind responsive prefixes (`md:`, `lg:`, etc.). Avoid JS-based breakpoints.
- **Purity**: Hooks and components must be pure. Impure calls (`Date.now()`, `Math.random()`) inside component bodies are banned.

### Localization (i18n)

- **UI & Content**: Powered by **Paraglide JS**.
  - Use `getLocale()` and `setLocale()` from `@/paraglide/runtime`.
  - Import translation functions from `@/paraglide/messages`.
  - For dynamic keys or fallbacks, use the custom `useT()` hook.
- **Strict Typing**: Paraglide's generated JS uses JSDoc; we maintain manual `.d.ts` files in `src/paraglide/` to ensure zero `any` types in components.
- **Parity**: Maintain 1:1 parity between `content/` and `content/zh/`.

---

## Branding & Compliance

- **Attribution**: The **footer** and **navbar logo** should reflect the "Echo" project name.
- **Repo Links**: All Echo references in source point to `https://github.com/asckaya/Echo`.

---

## Tooling & Validation

- **`pnpm validate`**: Checks basic content integrity.
- **`pnpm validate:deep`**: Performs deep schema validation for all content files.
- **MCP Server**: Use specialized tools like `add_publication` or `add_project` for content management.

---

_Last Updated: 2026-04-19_
