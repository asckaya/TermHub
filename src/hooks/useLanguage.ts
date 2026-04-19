import { useState } from 'react'

import { type AvailableLanguageTag, getLocale, setLocale } from '@/paraglide/runtime'

export function useLanguage() {
  const [locale, setLocaleState] = useState<AvailableLanguageTag>(() => getLocale())

  // Sync state if external locale changes (e.g. from setLocale in another component)
  // Doing this during render is the React-recommended way to sync state from external/props
  const current = getLocale()
  if (locale !== current) {
    setLocaleState(current)
  }

  return {
    locale,
    setLocale: (newLocale: AvailableLanguageTag) => {
      const result = setLocale(newLocale)
      if (result instanceof Promise) {
        void result.catch(() => {
          /* Silent fail or log */
        })
      }
      setLocaleState(newLocale)
    },
  }
}
