import { useQuery } from '@tanstack/react-query'
import { Cpu, GitBranch, Layers, Wifi } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa'

import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

interface GitHubUser {
  followers: number
  public_repos: number
}

export const TerminalStatusBar: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)
  const { siteOwner } = useLocalizedData()

  const [load, setLoad] = useState('0.85')

  // Use TanStack Query to fetch and cache GitHub data, matching HeroSection query key for automatic deduplication
  const { data: githubData } = useQuery<GitHubUser | null>({
    queryFn: async () => {
      const username = siteOwner.social.github.split('/').pop()
      if (!username) return null
      const res = await fetch(`https://api.github.com/users/${username}`)
      if (!res.ok) throw new Error('GitHub fetch failed')
      return res.json() as Promise<GitHubUser>
    },
    queryKey: ['github-profile', siteOwner.social.github],
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    // Simulate system load variations
    const interval = setInterval(() => {
      setLoad((0.7 + Math.random() * 0.4).toFixed(2))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const stars = githubData ? githubData.public_repos : '...'

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
