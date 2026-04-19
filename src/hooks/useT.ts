import { useCallback } from 'react'

import * as m from '@/paraglide/messages'

export type MessageKey = keyof typeof m

/**
 * A type-safe hook for using Paraglide translations with an optional fallback.
 */
export function useT() {
  const t = useCallback((key: string, fallback?: string): string => {
    // Paraglide keys are normalized to underscores in the generated code
    const normalizedKey = key.replace(/\./g, '_') as MessageKey

    if (normalizedKey in m) {
      const messageFn = m[normalizedKey]
      if (typeof messageFn === 'function') {
        // We cast to any to avoid complex type intersection issues with Paraglide's generated functions
        // which might have different input requirements but here we call them with no inputs.
        return (messageFn as () => string)()
      }
    }

    return fallback ?? key
  }, [])

  return { t }
}
