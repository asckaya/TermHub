import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeKey } from '@/themes/registry'

interface DocumentWithTransition {
  startViewTransition?: (callback: () => Promise<void> | void) => { ready: Promise<void> }
}

interface UiState {
  isCrtActive: boolean
  toggleCrt: () => void
  currentThemeKey: ThemeKey
  setTheme: (key: ThemeKey) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isCrtActive: true, // Default to true for the retro terminal vibe
      toggleCrt: () => set((state) => ({ isCrtActive: !state.isCrtActive })),
      currentThemeKey: 'catppuccin-mocha',
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
    }),
    {
      name: 'ui-settings-store', // LocalStorage key name
    },
  ),
)
