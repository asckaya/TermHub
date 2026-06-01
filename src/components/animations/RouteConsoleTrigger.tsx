import { useLocation } from '@tanstack/react-router'
import { AnimatePresence, m } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

interface RouteConsoleTriggerProps {
  children: React.ReactNode
}

export const RouteConsoleTrigger: React.FC<RouteConsoleTriggerProps> = ({ children }) => {
  const location = useLocation()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)
  const { siteOwner } = useLocalizedData()

  const [activePath, setActivePath] = useState(location.pathname)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionLogs, setTransitionLogs] = useState<string[]>([])

  useEffect(() => {
    if (location.pathname !== activePath) {
      setIsTransitioning(true)
      const username = siteOwner.terminalUsername || 'user'
      const hostname = siteOwner.terminalHostname || 'projects'
      
      const cleanPath = location.pathname === '/' ? 'home' : location.pathname.replace(/^\//, '')
      
      setTransitionLogs([
        `${username}@${hostname}:~$ cd /${cleanPath}`,
        `[   0.00] Initializing route change: ${location.pathname}...`,
        `[   0.08] Fetching localized MDX components... [ OK ]`,
        `[   0.15] Loading styles and system assets... [ OK ]`,
        `[   0.22] Executing paint sequence... [ DONE ]`,
      ])

      const timer = setTimeout(() => {
        setActivePath(location.pathname)
        setIsTransitioning(false)
      }, 500) // Brief and snappy transition to keep UX smooth

      return () => clearTimeout(timer)
    }
  }, [location.pathname, activePath, siteOwner])

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <m.div
            animate={{ opacity: 1 }}
            className="w-full flex items-center min-h-[40vh] p-6 font-mono"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key="console-loader"
            transition={{ duration: 0.15 }}
          >
            <div className="flex flex-col gap-1.5 max-w-[800px] w-full text-xs md:text-sm">
              {transitionLogs.map((log, i) => (
                <div
                  className="opacity-95"
                  key={i}
                  style={{
                    color: i === 0 ? tc.prompt : i === transitionLogs.length - 1 ? tc.success : tc.text,
                  }}
                >
                  {log}
                </div>
              ))}
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-3 animate-blink" style={{ backgroundColor: tc.prompt }} />
              </div>
            </div>
          </m.div>
        ) : (
          <m.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 8 }}
            key={activePath}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
