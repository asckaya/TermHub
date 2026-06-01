import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { ThemeKey } from '@/themes/registry'

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
        const applyTheme = () => set({ currentThemeKey: key })

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
