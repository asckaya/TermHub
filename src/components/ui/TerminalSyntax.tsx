import React, { memo } from 'react'

import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { cn } from '@/lib/utils'

/**
 * Terminal Prompt Component ($ or >)
 */
export const CommandPrompt = memo<{
  className?: string
  type?: 'arrow' | 'dollar' | 'hash'
}>(({ className, type = 'dollar' }) => {
  const chars = { arrow: '>', dollar: '$', hash: '#' }
  const colors = { arrow: 'text-cyan-400', dollar: 'text-yellow-400', hash: 'text-pink-400' }

  return (
    <span className={cn('font-mono font-bold mr-2 select-none', colors[type], className)}>
      {chars[type]}
    </span>
  )
})

CommandPrompt.displayName = 'CommandPrompt'

/**
 * Syntax Highlighting for Terminal Titles/Text
 */
interface SyntaxTextProps {
  children: React.ReactNode
  className?: string
  type: 'comment' | 'function' | 'keyword' | 'property' | 'punctuation' | 'string' | 'variable'
}

export const SyntaxText = memo<SyntaxTextProps>(({ children, className, type }) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)

  const colorMap = {
    comment: tc.secondary, // opacity managed via CSS usually
    function: tc.highlight, // e.g., Terminal
    keyword: tc.command, // e.g., const, new
    property: tc.param, // e.g., .name
    punctuation: tc.secondary, // e.g., =, (, )
    string: tc.success, // e.g., 'research'
    variable: tc.prompt, // e.g., siteOwner
  }

  return (
    <span className={cn('font-mono', className)} style={{ color: colorMap[type] }}>
      {children}
    </span>
  )
})

SyntaxText.displayName = 'SyntaxText'

/**
 * Terminal Internal Divider
 */
export const TerminalDivider = memo<{
  className?: string
  variant?: 'dashed' | 'solid'
}>(({ className, variant = 'dashed' }) => (
  <div
    className={cn(
      'w-full my-4 border-border/50',
      variant === 'dashed' ? 'border-t border-dashed' : 'border-t',
      className,
    )}
  />
))

TerminalDivider.displayName = 'TerminalDivider'

/**
 * Section Header inside Terminal
 */
export const TerminalSectionTitle = memo<{
  children: React.ReactNode
  className?: string
}>(({ children, className }) => (
  <div className={cn('flex items-center gap-2 mb-4', className)}>
    <CommandPrompt className="text-xs" type="hash" />
    <h2 className="text-muted-foreground tracking-widest uppercase font-bold text-[10px] md:text-xs">
      {children}
    </h2>
  </div>
))

TerminalSectionTitle.displayName = 'TerminalSectionTitle'

/**
 * Terminal Status Bar Segments (tmux-style)
 */
export const StatusGroup = memo<{
  children: React.ReactNode
  className?: string
}>(({ children, className }) => (
  <div className={cn('flex items-center gap-3', className)}>{children}</div>
))

StatusGroup.displayName = 'StatusGroup'

export const StatusSegment = memo<{
  className?: string
  dotColor?: string
  icon?: React.ReactNode
  label?: React.ReactNode
  value?: React.ReactNode
  valueClassName?: string
}>(({ className, dotColor, icon, label, value, valueClassName }) => (
  <div className={cn('flex items-center gap-1.5', className)}>
    {dotColor && <span className={cn('text-[8px] animate-pulse', dotColor)}>●</span>}
    {icon && <span className="opacity-70">{icon}</span>}
    {label && <span className="opacity-60">{label}</span>}
    {value && <span className={cn('font-bold', valueClassName)}>{value}</span>}
  </div>
))

StatusSegment.displayName = 'StatusSegment'

export const StatusSeparator = memo<{
  children?: React.ReactNode
  className?: string
}>(({ children = '|', className }) => (
  <span className={cn('opacity-20 select-none px-1', className)}>{children}</span>
))

StatusSeparator.displayName = 'StatusSeparator'

export interface TerminalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  size?: 'md' | 'sm' | 'xs'
  variant?: 'ghost' | 'outline' | 'solid'
}

export const TerminalButton = memo<TerminalButtonProps>(
  ({ children, className, icon, size = 'xs', variant = 'ghost', ...props }) => {
    const sizeClasses = {
      md: 'px-3 py-1.5 text-sm',
      sm: 'px-2 py-1 text-[11px]',
      xs: 'px-1.5 py-0.5 text-[9px]',
    }

    const variantClasses = {
      ghost: 'bg-black/10 dark:bg-black/20 hover:bg-black/30 border border-white/5',
      outline: 'border border-border hover:border-primary/50',
      solid: 'bg-primary text-primary-foreground hover:opacity-90',
    }

    return (
      <button
        className={cn(
          'inline-flex items-center gap-1.5 rounded uppercase tracking-widest font-bold transition-all active:scale-95 select-none',
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {icon}
        {children}
      </button>
    )
  },
)

TerminalButton.displayName = 'TerminalButton'

export interface TerminalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prompt?: string
  promptClassName?: string
}

export const TerminalInput = memo<TerminalInputProps>(
  ({ className, prompt, promptClassName, ...props }) => {
    const { siteOwner } = useLocalizedData()
    const activePrompt = prompt ?? siteOwner.terminalPrompt

    return (
      <div className={cn('flex items-center w-full font-mono text-xs', className)}>
        <span className={cn('mr-2 flex-shrink-0 opacity-70', promptClassName)}>{activePrompt}</span>
        <input
          className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-xs font-mono placeholder:opacity-40"
          {...props}
        />
        <div className="ml-1 h-3.5 w-1.5 bg-primary/80 animate-blink flex-shrink-0" />
      </div>
    )
  },
)

TerminalInput.displayName = 'TerminalInput'

export interface TerminalBadgeProps {
  bg?: string
  children: React.ReactNode
  className?: string
  color?: string
  icon?: React.ReactNode
  variant?: 'outline' | 'solid' | 'subtle'
}

export const TerminalBadge = memo<TerminalBadgeProps>(
  ({ bg, children, className, color, icon, variant = 'subtle' }) => {
    return (
      <div
        className={cn(
          'inline-flex items-center rounded-sm font-bold gap-1 px-1.5 py-0.5 uppercase tracking-wide whitespace-nowrap',
          variant === 'subtle' ? 'bg-opacity-15' : '',
          className,
        )}
        style={{
          backgroundColor: variant === 'subtle' ? (bg ?? (color ? `${color}26` : undefined)) : bg,
          color: color,
          fontSize: '9px',
        }}
      >
        {icon}
        {children}
      </div>
    )
  },
)

TerminalBadge.displayName = 'TerminalBadge'
