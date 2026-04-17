import React, { createContext, useContext, useEffect, useState } from 'react'

import type { ThemeDefinition } from './types'

import { ayuDarkTheme, ayuMirageTheme } from './ayu'
import {
  catppuccinoFrappeTheme,
  catppuccinoMacchiatoTheme,
  catppuccinoMochaTheme,
} from './catppuccin'
import { draculaTheme } from './dracula'
import { everforestTheme } from './everforest'
import { githubTheme } from './github'
import { nordTheme } from './nord'
import { oneDarkTheme } from './onedark'

export const themes = {
  'ayu-dark': ayuDarkTheme,
  'ayu-mirage': ayuMirageTheme,
  'catppuccin-frappe': catppuccinoFrappeTheme,
  'catppuccin-macchiato': catppuccinoMacchiatoTheme,
  'catppuccin-mocha': catppuccinoMochaTheme,
  dracula: draculaTheme,
  everforest: everforestTheme,
  github: githubTheme,
  nord: nordTheme,
  'one-dark': oneDarkTheme,
}

export type ThemeKey = keyof typeof themes

interface ThemeContextValue {
  activeTheme: ThemeDefinition
  currentThemeKey: ThemeKey
  setTheme: (key: ThemeKey) => void
}

const ThemeContext = createContext<null | ThemeContextValue>(null)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>('catppuccin-mocha')

  useEffect(() => {
    const saved = localStorage.getItem('termhub-theme') as ThemeKey
    if (saved && themes[saved]) {
      setThemeKey(saved)
    }
  }, [])

  const handleSetTheme = (key: ThemeKey) => {
    setThemeKey(key)
    localStorage.setItem('termhub-theme', key)
  }

  return (
    <ThemeContext.Provider value={{ activeTheme: themes[themeKey], currentThemeKey: themeKey, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider')
  return context
}
