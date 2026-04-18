import { useTheme } from 'next-themes'

export function useColorModeValue<T>(light: T, dark: T): T {
  const { resolvedTheme, theme } = useTheme()
  const activeTheme = resolvedTheme ?? theme
  return activeTheme === 'dark' ? dark : light
}
