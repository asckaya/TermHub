import { createRootRoute } from '@tanstack/react-router'

import { RootLayout } from '@/components/layout/RootLayout'

import '../i18n'

export const Route = createRootRoute({
  component: RootLayout,
})
