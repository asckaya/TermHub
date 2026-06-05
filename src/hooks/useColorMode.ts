import { useTheme } from '@wrksz/themes/client'

export type ColorMode = 'dark' | 'light'

interface DocumentWithTransition {
  startViewTransition?: (callback: () => Promise<void>) => ViewTransition
}

interface ViewTransition {
  ready: Promise<void>
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  const colorMode: ColorMode = resolvedTheme === 'dark' ? 'dark' : 'light'

  const toggleColorMode = () => {
    const doc = document as DocumentWithTransition

    if (!doc.startViewTransition) {
      setTheme(colorMode === 'dark' ? 'light' : 'dark')
      return
    }

    doc.startViewTransition(async () => {
      setTheme(colorMode === 'dark' ? 'light' : 'dark')
      await Promise.resolve()
    })
  }

  return {
    colorMode,
    setColorMode: (value: ColorMode) => setTheme(value),
    toggleColorMode,
  }
}
