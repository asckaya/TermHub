import { Cpu, GitBranch, Layers, Wifi } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa'

import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

export const TerminalStatusBar: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)
  const { siteOwner } = useLocalizedData()

  const [load, setLoad] = useState('0.85')
  const [stars, setStars] = useState<number | string>('...')

  useEffect(() => {
    // Simulate system load variations
    const interval = setInterval(() => {
      setLoad((0.7 + Math.random() * 0.4).toFixed(2))
    }, 3000)

    // Fetch GitHub stars if possible
    if (siteOwner.social.github) {
      const username = siteOwner.social.github.split('/').pop()
      if (username) {
        fetch(`https://api.github.com/users/${username}`)
          .then((res) => res.json())
          .then((data: { public_repos?: number }) => {
            if (typeof data.public_repos === 'number') {
              setStars(data.public_repos)
            }
          })
          .catch(() => setStars('--'))
      }
    }

    return () => clearInterval(interval)
  }, [siteOwner.social.github])

  return (
    <div className="flex items-center justify-between w-full font-mono text-[9px] md:text-[10px] whitespace-nowrap overflow-hidden">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Branch / Env */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <GitBranch className="w-2.5 h-2.5" style={{ color: tc.command }} />
          <span className="font-bold" style={{ color: tc.text }}>
            main
          </span>
        </div>

        {/* GitHub Stats */}
        {!compact && (
          <div className="hidden sm:flex items-center gap-1.5">
            <FaGithub className="w-3 h-3" style={{ color: tc.secondary }} />
            <span style={{ color: tc.secondary }}>repos:</span>
            <span className="font-bold" style={{ color: tc.highlight }}>
              {stars}
            </span>
          </div>
        )}

        {/* Layout Status */}
        {!compact && (
          <div className="hidden md:flex items-center gap-1.5">
            <Layers className="w-3 h-3" style={{ color: tc.info }} />
            <span style={{ color: tc.secondary }}>nodes:</span>
            <span className="font-bold" style={{ color: tc.highlight }}>
              1,244
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* CPU/Load */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Cpu className="w-2.5 h-2.5" style={{ color: tc.warning }} />
          {!compact && (
            <span className="hidden sm:inline" style={{ color: tc.secondary }}>
              load:
            </span>
          )}
          <span className="font-bold" style={{ color: tc.warning }}>
            {load}
          </span>
        </div>

        {/* Network Status */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Wifi className="w-2.5 h-2.5" style={{ color: tc.success }} />
          {!compact && (
            <span className="hidden sm:inline" style={{ color: tc.secondary }}>
              status:
            </span>
          )}
          <span className="font-bold animate-pulse" style={{ color: tc.success }}>
            {compact ? 'ON' : 'ONLINE'}
          </span>
        </div>

        {/* Encoding */}
        {!compact && (
          <div
            className="hidden lg:flex items-center gap-1.5 border-l pl-3"
            style={{ borderColor: tc.border }}
          >
            <span style={{ color: tc.secondary }}>UTF-8</span>
          </div>
        )}
      </div>
    </div>
  )
}
