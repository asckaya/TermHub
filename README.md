<p align="right">
  <a href="README.md">English</a> | <a href="README_CN.md">中文</a>
</p>

<p align="center">
  <img src="public/logo.svg" alt="Echo" width="520" />
</p>

<p align="center">
  <strong>The shell's reflection.</strong><br/>
  <sub>Terminal-themed portfolio for developers, researchers, and creatives.</sub>
</p>

<p align="center">
  <a href="https://github.com/asckaya/Echo"><img src="https://img.shields.io/badge/License-GPL_v3-a3be8c?style=flat-square" alt="License" /></a>
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <a href="#ai-integration--supports-mcp"><img src="https://img.shields.io/badge/NEW-Supports_MCP-bf616a?style=flat-square&logo=openai&logoColor=white" alt="Supports MCP" /></a>
</p>

---

## ⚡ Modernized Refactoring (v2.0) — Project Echo

This version represents a significant technical overhaul focusing on performance, reliability, and developer experience:

- **Framework Upgrade**: Migrated to **React 19**, **Vite 8**, and **TypeScript 6**.
- **Modern UI Stack**: Replaced Chakra UI with **Shadcn UI** and **Tailwind CSS v4**, leveraging Radix primitives and CSS-driven configuration.
- **Pure CSS Responsiveness**: Layouts now use declarative Tailwind responsive classes, ensuring zero layout shift and standard media query behavior.
- **Reactive i18n**: Redesigned the localization logic using **Paraglide JS**. Content updates instantly across the entire site without page refreshes.
- **Mocha by Default**: The terminal now defaults to the vibrant **Catppuccin Mocha** palette with circular ripple transitions.

<br/>

## Features

- Terminal aesthetic with multiple themes (Mocha, Nord, Catppuccin, etc.)
- Fully **responsive** (mobile → desktop) using pure Tailwind CSS logic
- **No code needed** — just edit JSON/MDX files in `content/`
- **MCP-powered** — resume → AI → portfolio in minutes
- **Bilingual i18n** — English / Chinese powered by Paraglide JS

**Content types:** Publications · Projects · Experience · Articles · Awards · News

<br/>

## Quick Start

```bash
# 1. Clone
git clone https://github.com/asckaya/Echo.git
cd Echo && pnpm install

# 2. Run the setup wizard — generates your config
pnpm setup

# 3. Start dev server
pnpm dev
```

> Open **http://localhost:5173** — your site is running.
> Edit files in `content/`, save, and the browser refreshes automatically.

<br/>

## Tech Stack

React 19 · TypeScript 6 · Vite 8 · Shadcn UI · Tailwind CSS v4 · Motion (Framer) · Paraglide JS

<br/>

## License

**GPL-3.0-only** · Copyright © 2026 [asckaya](https://github.com/asckaya)
<br/>
_Echo is a derivative work based on the original [TermHub](https://github.com/asckaya/TermHub) architecture._
