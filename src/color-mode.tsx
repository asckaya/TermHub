import { ThemeProvider, useTheme } from 'next-themes'
import type { ReactNode } from 'react'

type ColorMode = 'light' | 'dark'

export function ColorModeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  const colorMode: ColorMode = resolvedTheme === 'dark' ? 'dark' : 'light'

  return {
    colorMode,
    setColorMode: (value: ColorMode) => setTheme(value),
    toggleColorMode: () => setTheme(colorMode === 'dark' ? 'light' : 'dark'),
  }
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}
