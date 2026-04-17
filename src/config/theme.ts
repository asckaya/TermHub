import type { ProjectItem } from '@/types'

import { activeTheme as staticActiveTheme } from '@/themes/index'
import { useThemeContext } from '@/themes/ThemeContext'

export type { CatTheme } from '@/themes'

// Hooks for components to get the reactive theme
export const useThemeConfig = () => {
  const { activeTheme } = useThemeContext()
  return {
    articleCategoryColors: activeTheme.articleCategoryColors,
    buildCategoryThemes: activeTheme.categoryThemes,
    publicationVenueColors: activeTheme.publicationVenueColors,
    terminalPalette: activeTheme.terminal,
  }
}

// Fallback static exports for non-React contexts or initial render
export const terminalPalette = staticActiveTheme.terminal
export const buildCategoryThemes = staticActiveTheme.categoryThemes
export const articleCategoryColors = staticActiveTheme.articleCategoryColors
export const publicationVenueColors = staticActiveTheme.publicationVenueColors

export const articleCategoryLabels: Record<ProjectItem['category'], string> = {
  data: 'Data / ML',
  healthcare: 'Healthcare',
  nlp: 'NLP / AI',
  robotics: 'Robotics',
  tooling: 'Tooling',
  'web-app': 'Web / App',
}
