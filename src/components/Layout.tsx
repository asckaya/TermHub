import React from 'react'

import { useColorMode } from '@/hooks/useColorMode'
import { useSlot } from '@/templates/hooks'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorMode } = useColorMode()
  const NavbarSlot = useSlot('navbar')

  return (
    <div
      className={colorMode === 'dark' ? 'dark-theme min-h-screen w-full overflow-x-hidden' : 'min-h-screen w-full overflow-x-hidden'}
    >
      {React.createElement(NavbarSlot)}
      <main className="w-full px-3 md:px-4 lg:px-6">
        {children}
      </main>
    </div>
  )
}

export default Layout
