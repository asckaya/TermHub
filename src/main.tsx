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
  routeTree,
  scrollRestoration: true,
})

// Register the router instance for type-safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ColorModeProvider>
        <RouterProvider router={router} />
      </ColorModeProvider>
    </React.StrictMode>,
  )
}
