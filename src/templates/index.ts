// SPDX-FileCopyrightText: 2026 Yaoyao(Freax) Qian <limyoonaxi@gmail.com>
// SPDX-License-Identifier: GPL-3.0-only

/**
 * Template registry — single entry point for all templates.
 *
 * To register a new template:
 * 1. Create `src/templates/<name>/index.ts` exporting a TemplateConfig
 * 2. Import it here and add to `templates`
 * 3. Users set `"template": "<name>"` in content/site.json
 */

import type { TemplateConfig } from './types'
import terminalTemplate from './terminal'

/** All registered templates keyed by id */
const templates: Record<string, TemplateConfig> = {
  terminal: terminalTemplate,
}

/** Default template id when none is specified in site.json */
const DEFAULT_TEMPLATE = 'terminal'

/**
 * Resolve a template by id.
 * Falls back to the default template if the id is unknown.
 */
export function getTemplate(id?: string): TemplateConfig {
  if (id && templates[id]) {
    return templates[id]
  }
  return templates[DEFAULT_TEMPLATE]
}

/** List all available template ids */
export function getTemplateIds(): string[] {
  return Object.keys(templates)
}

/** List all available templates */
export function getTemplates(): TemplateConfig[] {
  return Object.values(templates)
}

export type { TemplateConfig, TemplatePages, LayoutProps } from './types'
export default templates
