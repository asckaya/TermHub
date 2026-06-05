import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import NotFound from './components/pages/NotFound'
import { ColorModeProvider } from './providers/ColorModeProvider'
import './styles/index.css'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({
  basepath: import.meta.env.BASE_URL,
  defaultNotFoundComponent: () => <NotFound />,
  defaultViewTransition: true,
  routeTree,
  scrollRestoration: true,
})

// Capture click coordinates globally for circular page transitions
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    document.documentElement.style.setProperty('--click-x', `${e.clientX}px`)
    document.documentElement.style.setProperty('--click-y', `${e.clientY}px`)
  })
}

// Register the router instance for type-safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ColorModeProvider>
          <RouterProvider router={router} />
        </ColorModeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  )
}
