import React, { memo } from 'react'

import type { TerminalColors } from '@/themes/types'

import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { cn } from '@/lib/utils'

import { RainbowBar } from './RainbowBar'

interface TerminalShellProps {
  bodyClassName?: string
  children: React.ReactNode
  className?: string
  headerClassName?: string
  headerRight?: React.ReactNode
  rainbowHeight?: string
  rainbowOpacity?: number
  rainbowPosition?: 'bottom' | 'top'
  showRainbow?: React.ReactNode
  statusBar?: React.ReactNode
  title?: React.ReactNode
  titleAlign?: 'center' | 'left'
  touchBar?: React.ReactNode
}

export const TerminalShell = memo<TerminalShellProps>(
  ({
    bodyClassName,
    children,
    className,
    headerClassName,
    headerRight,
    rainbowHeight = '2px',
    rainbowOpacity = 0.8,
    rainbowPosition = 'top',
    showRainbow = true,
    statusBar,
    title,
    titleAlign = 'center',
    touchBar,
  }) => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const { terminalPalette } = useThemeConfig()
    const tc: TerminalColors = terminalPalette.colors(isDark)

    const renderRainbow = () => {
      if (!showRainbow) return null
      return (
        <>
          {typeof showRainbow === 'boolean' ? (
            <RainbowBar height={rainbowHeight} opacity={rainbowOpacity} />
          ) : (
            showRainbow
          )}
        </>
      )
    }

    return (
      <div
        className={cn(
          'flex flex-col rounded-md font-mono overflow-hidden w-full border transition-all duration-300',
          className,
        )}
        style={{
          backgroundColor: tc.bg,
          borderColor: tc.border,
          boxShadow: `0 8px 32px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.12)'}`,
        }}
      >
        {/* macOS-style Title Bar */}
        <div
          className={cn(
            'flex items-center justify-between px-4 py-2 text-xs font-medium border-b flex-shrink-0',
            headerClassName,
          )}
          style={{ backgroundColor: tc.header, borderColor: tc.border }}
        >
          <div className="flex items-center gap-3 w-full">
            {/* Windows-style control buttons (left) */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="bg-[#bf616a] rounded-full h-[10px] w-[10px]" />
              <div className="bg-[#ebcb8b] rounded-full h-[10px] w-[10px]" />
              <div className="bg-[#a3be8c] rounded-full h-[10px] w-[10px]" />
            </div>

            <div
              className={cn(
                'flex-1 font-bold truncate px-2',
                titleAlign === 'center' ? 'text-center' : 'text-left',
              )}
              style={{ color: tc.text }}
            >
              {title}
            </div>

            {/* Optional Right Header Content */}
            <div className="flex-shrink-0">{headerRight}</div>
          </div>
        </div>

        {/* Top Rainbow */}
        {rainbowPosition === 'top' && renderRainbow()}

        {/* Touch Bar / Metadata Bar */}
        {touchBar && (
          <div
            className="flex items-center justify-between px-4 py-1 text-[10px] border-b overflow-hidden flex-shrink-0"
            style={{ backgroundColor: tc.touchBar, borderColor: tc.border }}
          >
            {touchBar}
          </div>
        )}

        {/* Content Area */}
        <div className={cn('flex-1 overflow-auto p-4', bodyClassName)}>{children}</div>

        {/* Bottom Rainbow */}
        {rainbowPosition === 'bottom' && renderRainbow()}

        {/* Bottom Status Bar */}
        {statusBar && (
          <div
            className="px-4 py-1.5 text-[9px] md:text-[10px] border-t flex items-center justify-between"
            style={{
              backgroundColor: tc.header,
              borderColor: tc.border,
              color: tc.secondary,
            }}
          >
            {statusBar}
          </div>
        )}
      </div>
    )
  },
)

TerminalShell.displayName = 'TerminalShell'
