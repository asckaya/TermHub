import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type ThemeKey, themes } from '@/themes/registry'

interface DocumentWithTransition {
  startViewTransition?: (callback: () => Promise<void> | void) => { ready: Promise<void> }
}

interface UiState {
  currentThemeKey: ThemeKey
  isCrtActive: boolean
  setTheme: (key: ThemeKey) => void
  toggleCrt: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      currentThemeKey: 'catppuccin-mocha',
      isCrtActive: true, // Default to true for the retro terminal vibe
      setTheme: (key: ThemeKey) => {
        const doc = document as DocumentWithTransition
        
        const applyTheme = () => {
          set({ currentThemeKey: key })
          
          // Apply new theme CSS variables synchronously so the View Transition captures them
          const isDark = document.documentElement.classList.contains('dark')
          const theme = themes[key]
          if (theme) {
            const tokens = theme.cssVars[isDark ? 'dark' : 'light']
            for (const [property, value] of Object.entries(tokens)) {
              document.documentElement.style.setProperty(property, value)
            }
            const tc = theme.terminal.colors(isDark)
            document.documentElement.style.setProperty('--prompt-color', tc.prompt)
            document.documentElement.style.setProperty('--success-color', tc.success)
          }
        }

        if (!doc.startViewTransition) {
          applyTheme()
          return
        }

        doc.startViewTransition(async () => {
          applyTheme()
          await Promise.resolve()
        })
      },
      toggleCrt: () => set((state) => ({ isCrtActive: !state.isCrtActive })),
    }),
    {
      name: 'ui-settings-store', // LocalStorage key name
    },
  ),
)
