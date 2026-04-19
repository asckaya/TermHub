import React, { useState } from 'react'

import type { ThemeKey } from './registry'

import { themes } from './registry'
import { ThemeContext } from './ThemeContextCore'

export { ThemeContext }

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>(() => {
    if (typeof window === 'undefined') return 'catppuccin-mocha'
    const saved = localStorage.getItem('echo-theme')
    if (saved && saved in themes) return saved as ThemeKey
    return 'catppuccin-mocha'
  })

  const handleSetTheme = (key: ThemeKey) => {
    if (!('startViewTransition' in document)) {
      setThemeKey(key)
      localStorage.setItem('echo-theme', key)
      return
    }

    document.startViewTransition(() => {
      setThemeKey(key)
      localStorage.setItem('echo-theme', key)
    })
  }

  return (
    <ThemeContext.Provider
      value={{ activeTheme: themes[themeKey], currentThemeKey: themeKey, setTheme: handleSetTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
