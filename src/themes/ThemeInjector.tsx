import { useEffect } from 'react'

import { useUiStore } from '@/hooks/uiStore'
import { useColorMode } from '@/hooks/useColorMode'

import { useThemeContext } from './hooks'

/**
 * Renderless component — mounts once inside ThemeProvider and keeps the
 * document element's class list and style variables in sync with the active theme.
 *
 * Place it as a direct child of ThemeProvider.
 *
 * Example:
 *   <ThemeProvider>
 *     <ThemeInjector />
 *     <App />
 *   </ThemeProvider>
 *
 * Switching colour schemes is done in `src/themes/index.ts` — no changes are
 * needed here.
 */
export function ThemeInjector() {
  const { colorMode } = useColorMode()
  const { activeTheme } = useThemeContext()
  const isCrtActive = useUiStore((state) => state.isCrtActive)

  useEffect(() => {
    const tokens = activeTheme.cssVars[colorMode === 'dark' ? 'dark' : 'light']
    const root = document.documentElement

    for (const [property, value] of Object.entries(tokens) as [string, string][]) {
      root.style.setProperty(property, value)
    }

    // Inject prompt & success colors from active theme's terminal configuration
    const tc = activeTheme.terminal.colors(colorMode === 'dark')
    root.style.setProperty('--prompt-color', tc.prompt)
    root.style.setProperty('--success-color', tc.success)
  }, [colorMode, activeTheme])

  useEffect(() => {
    const root = document.documentElement
    if (isCrtActive) {
      root.classList.add('crt-active')
    } else {
      root.classList.remove('crt-active')
    }
  }, [isCrtActive])

  return null
}
