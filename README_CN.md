<p align="right">
  <a href="README.md">English</a> | <a href="README_CN.md">中文</a>
</p>

<p align="center">
  <img src="public/logo.svg" alt="Echo" width="520" />
</p>

<p align="center">
  <strong>终端的倒影 | The shell's reflection</strong><br/>
  <sub>面向开发者、研究者和创作者的终端风格个人作品集。</sub>
</p>

<p align="center">
  <a href="https://github.com/asckaya/Echo"><img src="https://img.shields.io/badge/许可证-GPL_v3-a3be8c?style=flat-square" alt="License" /></a>
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <a href="#ai-集成--支持-mcp"><img src="https://img.shields.io/badge/NEW-支持_MCP-bf616a?style=flat-square&logo=openai&logoColor=white" alt="支持 MCP" /></a>
</p>

---

## ⚡ 现代化重构 (v2.0) — Echo 项目

本项目已完成大规模的技术重构，重点在于提升性能、稳定性及开发体验：

- **框架全面升级**：迁移至 **React 19**、**Vite 8** 和 **TypeScript 6**。
- **现代化 UI 栈**：使用 **Shadcn UI** 和 **Tailwind CSS v4** 替代了 Chakra UI，基于 Radix 原生组件和 CSS 驱动的配置。
- **纯 CSS 响应式**：布局现在完全由 Tailwind 的响应式类驱动，确保零布局抖动。
- **响应式国际化**：基于 **Paraglide JS** 重新设计了国际化逻辑，实现全站数据的无刷新实时响应切换。
- **默认 Mocha 主题**：终端默认配色已更新为更具动感的 **Catppuccin Mocha**，并支持波纹转场特效。

<br/>

## 功能特性

- 终端美学设计，支持多种配色方案 (Mocha, Nord, Catppuccin 等)
- 完全**响应式**（手机 → 桌面），基于纯 Tailwind CSS 的布局逻辑
- **无需编码** — 只需编辑 `content/` 中的 JSON/MDX 文件
- **MCP 驱动** — 简历 → AI → 作品集，分钟级完成
- **智能 i18n** — 中英文双语支持，基于 Paraglide JS 的实时语言响应

**内容类型：** 论文 · 项目 · 经历 · 文章 · 获奖 · 动态

<br/>

## 快速开始

```bash
# 1. 克隆
git clone https://github.com/asckaya/Echo.git
cd Echo && pnpm install

# 2. 运行设置向导 — 生成你的配置
pnpm setup

# 3. 启动开发服务器
pnpm dev
```

> 打开 **http://localhost:5173** —— 你的网站已经运行。
> 编辑 `content/` 中的文件，保存后浏览器会自动刷新。

<br/>

## 技术栈

React 19 · TypeScript 6 · Vite 8 · Shadcn UI · Tailwind CSS v4 · Motion (Framer) · Paraglide JS

<br/>

## 许可证

**GPL-3.0-only** · 版权所有 © 2026 [asckaya](https://github.com/asckaya)
<br/>
_Echo 是基于原 [TermHub](https://github.com/asckaya/TermHub) 架构的衍生作品。_
