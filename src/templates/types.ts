import type { SystemContext } from '@chakra-ui/react/styled-system'

import type { ComponentSlots } from './slots'

/** Props passed to the template's root layout component */
export interface LayoutProps {
  children: React.ReactNode
}

/**
 * Full template configuration.
 *
 * To add a new template:
 * 1. Create `src/templates/<name>/index.ts`
 * 2. Export a `TemplateConfig` from it
 * 3. Register it in `src/templates/index.ts`
 * 4. Set `"template": "<name>"` in content/site.json
 *
 * To add a new component variant:
 * 1. Create a component implementing the slot's props interface
 * 2. Register it in the template's `slots` map
 * 3. Users can override via `"components"` in content/site.json
 */
export interface TemplateConfig {
  /** Short description of the template style */
  description?: string
  /** Unique template identifier, e.g. "terminal", "academic", "minimal" */
  id: string
  /** Root layout component (nav, footer, etc.) */
  layout: React.ComponentType<LayoutProps>
  /** Human-readable display name */
  name: string
  /** Page components provided by this template */
  pages: TemplatePages
  /** Component slot implementations (navbar, hero, footer, etc.) */
  slots: ComponentSlots
  /** Chakra UI theme override for this template */
  theme: SystemContext
}

/**
 * Page component map — every template must provide `home`.
 * Other pages are optional: if omitted, the route is still
 * governed by `features` in site.json but falls back to a
 * default "page not available" placeholder.
 */
export interface TemplatePages {
  aboutPage?: React.ComponentType
  articles?: React.ComponentType
  experience?: React.ComponentType
  guide?: React.ComponentType
  guideDocs?: React.ComponentType
  home: React.ComponentType
  projects?: React.ComponentType
  publications?: React.ComponentType
}
