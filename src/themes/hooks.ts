import { useUiStore } from '@/hooks/uiStore'

import { themes } from './registry'

export { type ThemeKey, themes } from './registry'

export const useThemeContext = () => {
  const currentThemeKey = useUiStore((state) => state.currentThemeKey)
  const setTheme = useUiStore((state) => state.setTheme)

  return {
    activeTheme: themes[currentThemeKey],
    currentThemeKey,
    setTheme,
  }
}
