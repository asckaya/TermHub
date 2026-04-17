// Re-export site config (primary config lives in src/site.config.ts)
export { githubUsername, heroSocialIcons, navItems, siteConfig, siteOwner } from '../site.config'

// Theme config
export {
  articleCategoryColors,
  articleCategoryLabels,
  buildCategoryThemes,
  publicationVenueColors,
  terminalPalette,
} from './theme'
export type { CatTheme } from './theme'
