// SPDX-FileCopyrightText: 2026 Yaoyao(Freax) Qian <limyoonaxi@gmail.com>
// SPDX-License-Identifier: GPL-3.0-only

import type { ProjectItem } from '@/types'
import { useThemeContext } from '@/themes/ThemeContext'
import { activeTheme as staticActiveTheme } from '@/themes/index'

export type { CatTheme } from '@/themes'

// Hooks for components to get the reactive theme
export const useThemeConfig = () => {
  const { activeTheme } = useThemeContext()
  return {
    terminalPalette: activeTheme.terminal,
    buildCategoryThemes: activeTheme.categoryThemes,
    articleCategoryColors: activeTheme.articleCategoryColors,
    publicationVenueColors: activeTheme.publicationVenueColors,
  }
}

// Fallback static exports for non-React contexts or initial render
export const terminalPalette = staticActiveTheme.terminal
export const buildCategoryThemes = staticActiveTheme.categoryThemes
export const articleCategoryColors = staticActiveTheme.articleCategoryColors
export const publicationVenueColors = staticActiveTheme.publicationVenueColors

export const articleCategoryLabels: Record<ProjectItem['category'], string> = {
  robotics: 'Robotics',
  nlp: 'NLP / AI',
  'web-app': 'Web / App',
  data: 'Data / ML',
  tooling: 'Tooling',
  healthcare: 'Healthcare',
}
