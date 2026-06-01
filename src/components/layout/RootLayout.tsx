import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { domAnimation, LazyMotion } from 'framer-motion'
import React from 'react'
import { Toaster } from 'sonner'

import SplashScreen from '@/components/layout/SplashScreen'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { getResolvedSlots, getTemplate, SlotProvider } from '@/templates'
import { ThemeInjector } from '@/themes/ThemeInjector'

export function RootLayout() {
  const { siteConfig } = useLocalizedData()
  const [showSplash, setShowSplash] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('splash-seen')
    }
    return true
  })

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem('splash-seen', 'true')
  }

  const cfg = siteConfig as Record<string, unknown>
  const template = getTemplate(cfg.template as string | undefined)
  const slots = getResolvedSlots(template, cfg.components as Record<string, string> | undefined)

  const { layout: TemplateLayout } = template
  const { colorMode } = useColorMode()

  return (
    <LazyMotion features={domAnimation} strict>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <ThemeInjector />
      <Toaster position="top-right" theme={colorMode === 'dark' ? 'dark' : 'light'} />
      <SlotProvider slots={slots}>
        <TemplateLayout>
          <Outlet />
        </TemplateLayout>
        <CommandPalette />
      </SlotProvider>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </LazyMotion>
  )
}
