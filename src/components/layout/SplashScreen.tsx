import { AnimatePresence, m } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'

import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'

const BOOT_LOGS = [
  '[  0.000000] Initializing Ascka Kernel...',
  '[  0.082431] Checking Hardware: CPU @ 5.0GHz... [ OK ]',
  '[  0.151923] Detecting Memory... 16GB Found [ OK ]',
  '[  0.212891] Loading Ascka Core Subsystems...',
  '[  0.282182] Initializing React-Terminal layer... [ OK ]',
  '[  0.352318] Checking I18n Locales... [ zh, en ]',
  '[  0.422932] Mounting Virtual File System... [ OK ]',
  '[  0.498124] Starting Network Stack... [ OK ]',
  '[  0.552831] Ascka Protocol: Initialized',
  '[  0.612841] User Authenticated: Ascka',
  '[  0.682912] System Ready. Starting UI...',
]

const ASCII_LOGO = `
   _      ____     ____   _  __     _
  / \\    / ___|   / ___| | |/ /    / \\
 / _ \\   \\___ \\  | |     | ' /    / _ \\
/ ___ \\   ___) | | |___  | . \\   / ___ \\
/_/   \\_\\ |____/   \\____| |_|\\_\\ /_/   \\_\\
`

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)

  // Rapid log printing
  useEffect(() => {
    if (currentLogIndex < BOOT_LOGS.length) {
      const delay = Math.random() * 80 + 20
      const timeout = setTimeout(() => {
        setCurrentLogIndex((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    } else {
      // Show logo after logs finish
      const timeout = setTimeout(() => setShowLogo(true), 200)
      return () => clearTimeout(timeout)
    }
  }, [currentLogIndex])

  // Finish splash screen
  useEffect(() => {
    if (showLogo) {
      const timeout = setTimeout(() => {
        setIsExiting(true)
        setTimeout(onComplete, 800) // Match exit animation duration
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [showLogo, onComplete])

  const visibleLogs = useMemo(() => BOOT_LOGS.slice(0, currentLogIndex), [currentLogIndex])

  return (
    <AnimatePresence>
      {!isExiting && (
        <m.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          exit={{ filter: 'blur(20px)', opacity: 0, scale: 1.1 }}
          initial={{ opacity: 1 }}
          style={{ backgroundColor: 'var(--bg-color)', transition: 'background-color 0.3s ease' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="flex items-center justify-center h-full p-6">
            <div className="flex flex-col items-start gap-0 max-w-[800px] w-full">
              {/* Boot Logs */}
              <div className="flex flex-col items-start gap-1 mb-6 w-full">
                {visibleLogs.map((log, i) => (
                  <div
                    className="font-mono text-[10px] md:text-xs lg:text-sm opacity-90"
                    key={i}
                    style={{ color: tc.prompt }}
                  >
                    {log}
                  </div>
                ))}
              </div>

              {/* Logo Reveal */}
              <AnimatePresence>
                {showLogo && (
                  <m.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <pre
                      className="font-mono text-[10px] md:text-xs lg:text-sm leading-[1.1] bg-transparent"
                      style={{ color: tc.highlight }}
                    >
                      {ASCII_LOGO}
                    </pre>
                    <p
                      className="font-mono text-xs mt-4 opacity-80"
                      style={{ color: tc.secondary }}
                    >
                      Welcome to Ascka Personal System v1.0
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CRT Scanline Effect for Splash */}
          <div
            className="absolute inset-0 pointer-events-none z-[10000]"
            style={{
              background: isDark
                ? 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)'
                : 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.03) 50%)',
              backgroundSize: '100% 4px',
            }}
          />
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen
