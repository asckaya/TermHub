import React, { useEffect, useState } from 'react'

import { useThemeConfig } from '@/config/theme'

interface RainbowBarProps {
  className?: string
  height?: string
  opacity?: number
}

export const RainbowBar: React.FC<RainbowBarProps> = ({
  className = '',
  height = '3px',
  opacity = 0.5,
}) => {
  const { terminalPalette } = useThemeConfig()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => (t + 1) % 1000)
    }, 80) // Faster animation (was 200ms)
    return () => clearInterval(timer)
  }, [])

  const colors = terminalPalette.rainbow

  return (
    <div className={`flex overflow-hidden w-full ${className}`} style={{ height }}>
      {Array.from({ length: 48 }, (_, i) => {
        // Higher density (was 28)
        const colorIdx = (i + tick) % colors.length
        // Subtle breathing effect on opacity
        const brightness = opacity + 0.15 * Math.abs(Math.sin((i + tick * 0.8) * 0.4))
        return (
          <div
            className="flex-1 h-full transition-colors duration-300" // Sharper transition (was 500)
            key={i}
            style={{
              backgroundColor: colors[colorIdx],
              opacity: brightness,
            }}
          />
        )
      })}
    </div>
  )
}
