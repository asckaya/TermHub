import { useEffect, useState } from 'react'

// Match Chakra UI default breakpoints
const breakpoints = {
  '2xl': 1536,
  base: 0,
  lg: 992,
  md: 768,
  sm: 480,
  xl: 1280,
  xs: 360,
}

type Breakpoint = keyof typeof breakpoints

export function useBreakpointValue<T>(values: Partial<Record<Breakpoint, T>> & { base: T }): T {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('base')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= breakpoints['2xl']) setCurrentBreakpoint('2xl')
      else if (width >= breakpoints.xl) setCurrentBreakpoint('xl')
      else if (width >= breakpoints.lg) setCurrentBreakpoint('lg')
      else if (width >= breakpoints.md) setCurrentBreakpoint('md')
      else if (width >= breakpoints.sm) setCurrentBreakpoint('sm')
      else if (width >= breakpoints.xs) setCurrentBreakpoint('xs')
      else setCurrentBreakpoint('base')
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Find the largest breakpoint that is <= currentBreakpoint and has a value
  const sortedBreakpoints: Breakpoint[] = ['base', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
  const currentIndex = sortedBreakpoints.indexOf(currentBreakpoint)

  for (let i = currentIndex; i >= 0; i--) {
    const bp = sortedBreakpoints[i]
    if (values[bp] !== undefined) {
      return values[bp] as T
    }
  }

  return values.base
}
