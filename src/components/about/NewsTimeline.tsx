import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { useThemeConfig } from '@/config/theme'
import { useBreakpointValue } from '@/hooks/useBreakpointValue'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { cn } from '@/lib/utils'

import { type NewsItem } from '../../types'
import { highlightData } from '../../utils/highlightData'
import DynamicIcon from '../DynamicIcon'

interface NewsTimelineProps {
  news: NewsItem[]
}

// Format date to YYYY-MM-DD
const formatDate = (dateString = '') => {
  if (!dateString) return '0000-00-00'

  // Simple conversion for dates like "Jan 2023"
  const months: Record<string, string> = {
    Apr: '04',
    Aug: '08',
    Dec: '12',
    Feb: '02',
    Jan: '01',
    Jul: '07',
    Jun: '06',
    Mar: '03',
    May: '05',
    Nov: '11',
    Oct: '10',
    Sep: '09',
  }

  const parts = dateString.split(' ')
  if (parts.length === 2 && months[parts[0]]) {
    return `${parts[1]}-${months[parts[0]]}-01`
  }

  return dateString
}

// Truncate text with ellipsis
const truncateText = (text: string, maxLength: number): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Get responsive text length based on screen size
const getResponsiveTextLength = (
  text: string,
  isVerySmallScreen: boolean | undefined,
  isMobile: boolean | undefined,
  isSmallScreen: boolean | undefined,
): string => {
  if (!text) return ''

  // Very small screens (xs): Very short text
  if (isVerySmallScreen) {
    return truncateText(text, 20)
  }

  // Mobile screens (sm): Short text
  if (isMobile) {
    return truncateText(text, 60)
  }

  // Medium screens (md): Medium length text
  if (isSmallScreen) {
    return truncateText(text, 150)
  }

  // Large screens (lg and above): Full text or longer text
  return text.length > 300 ? truncateText(text, 300) : text
}

// Terminal "processes" for status bar (like -zsh • -zsh)
const termProcesses = [
  '-research • -coffee',
  '-writing • -thinking',
  '-training • -debugging',
  '-reading • -caffeine',
]

// Research process statuses - cycles in title bar
const researchStatuses = [
  { colorKey: 'success', label: 'PAPER.ACCEPTED', suffix: '✓' },
  { colorKey: 'command', label: 'MODEL.TRAINING', suffix: '▓▓░' },
  { colorKey: 'param', label: 'IDEA.BREWING', suffix: '☕' },
  { colorKey: 'warning', label: 'DEADLINE.CRUNCH', suffix: '⚡' },
  { colorKey: 'highlight', label: 'REVIEW.PENDING', suffix: '⏳' },
  { colorKey: 'info', label: 'CODE.SHIPPING', suffix: '📦' },
]

const NewsTimeline: React.FC<NewsTimelineProps> = ({ news }) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { t } = useTranslation()
  const { siteOwner } = useLocalizedData()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [hoveredItem, setHoveredItem] = useState<null | number>(null)

  // Responsive check
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const isSmallScreen = useBreakpointValue({ base: true, md: false })
  const isVerySmallScreen = useBreakpointValue({ base: true, xs: false })
  const dateColumnWidth = useBreakpointValue({ base: '70px', md: '120px', sm: '100px', xs: '75px' })
  const typeColumnWidth = useBreakpointValue({ base: '60px', md: '100px', sm: '80px', xs: '65px' })
  const idColumnWidth = useBreakpointValue({ base: '60px', md: '80px', sm: '70px' })
  const linksColumnWidth = useBreakpointValue({ base: '80px', md: '130px', sm: '100px' })
  const controlColumnWidth = useBreakpointValue({ base: '30px', md: '50px', sm: '40px' })

  // Check if narrow screen
  // Simplified to two modes: narrow (mobile) and wide
  const isNarrowScreen = useBreakpointValue({ base: true, md: false })

  // Check if screen is wide enough - only show details at lg breakpoint and above
  // Medium widths also use simplified layout to avoid awkward positioning
  const isWideEnough = useBreakpointValue({ base: false, lg: true })

  // Interactive elements state
  const [researchStatusIndex, setResearchStatusIndex] = useState(0)
  const [processIndex, setProcessIndex] = useState(0)
  const [interactions, setInteractions] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(() => 65 + Math.floor(Math.random() * 20))

  // Handle system interaction
  const handleSystemInteraction = useCallback(() => {
    setInteractions((prev) => {
      const next = prev + 1
      if (next % 3 === 0) {
        setResearchStatusIndex((p) => (p + 1) % researchStatuses.length)
        setMemoryUsage((p) => Math.min(95, p + 5))
      }
      return next
    })
  }, [])

  // Update time every second - Boston time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Cycle research process status every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setResearchStatusIndex((prev) => (prev + 1) % researchStatuses.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Cycle terminal "processes" every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessIndex((prev) => (prev + 1) % termProcesses.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Toggle expanded state for an item
  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))

    // Trigger system interaction when expanding/collapsing
    handleSystemInteraction()
  }

  // Terminal palette from centralized config
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)
  const termBg = tc.bg
  const termText = tc.text
  const termHeader = tc.header
  const termBorder = tc.border
  const termPrompt = tc.prompt
  const termCommand = tc.command
  const termParam = tc.param
  const termInfo = tc.info
  const termHighlight = tc.highlight
  const termError = tc.error
  const termSuccess = tc.success
  const termWarning = tc.warning
  const termSecondary = tc.secondary

  // Type colors (for ANSI-like color coding)
  interface TypeColorEntry {
    bg: string
    fg: string
    icon: string
  }
  const typeColors: Record<string, TypeColorEntry | undefined> & { default: TypeColorEntry } = {
    course: {
      bg: isDark ? 'rgba(180, 142, 173, 0.15)' : 'rgba(154, 86, 162, 0.1)',
      fg: tc.param,
      icon: 'FaGraduationCap',
    },
    default: {
      bg: isDark ? 'rgba(163, 190, 140, 0.15)' : 'rgba(54, 128, 90, 0.1)',
      fg: tc.prompt,
      icon: 'FaCode',
    },
    publication: {
      bg: isDark ? 'rgba(136, 192, 208, 0.15)' : 'rgba(42, 118, 156, 0.1)',
      fg: tc.command,
      icon: 'FaFileAlt',
    },
    release: {
      bg: isDark ? 'rgba(163, 190, 140, 0.15)' : 'rgba(54, 128, 90, 0.1)',
      fg: tc.prompt,
      icon: 'FaRocket',
    },
    talk: {
      bg: isDark ? 'rgba(208, 135, 112, 0.15)' : 'rgba(179, 90, 46, 0.1)',
      fg: tc.warning,
      icon: 'FaChalkboardTeacher',
    },
  }

  // Format the time as HH:MM:SS in the configured timezone
  const bostonTime = new Date(currentTime.toLocaleString('en-US', { timeZone: siteOwner.timezone }))
  const formattedTime = bostonTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  })

  // Status bar: date + scrolling sparkline
  const bostonDateStr = `${(bostonTime.getMonth() + 1).toString()}/${bostonTime.getDate().toString()}`
  const sparkChars = '▁▂▃▅▆▇▆▅▃▂▁▃▅▇▅▃'
  const sparkOffset = Math.floor(currentTime.getTime() / 1000) % sparkChars.length
  const sparkDisplay = (sparkChars + sparkChars).slice(sparkOffset, sparkOffset + 8)

  // Based on browser width, decide whether to show description
  // Higher threshold: only show on wide enough screens (lg and above)
  const showDescription = useMemo(() => {
    return isWideEnough
  }, [isWideEnough])

  // Based on browser width, decide how much description text to show
  const getDescriptionLength = (description: string) => {
    if (!description) return ''

    // Not wide enough, hide description
    if (!isWideEnough) return ''

    // Limit display length on wide screens too, keep around 60 chars
    // Account for the [+more] indicator taking some space
    const maxLength = 60

    if (description.length > maxLength) {
      const truncated = truncateText(description, maxLength)
      // Remove trailing ellipsis since we add a custom [+more] indicator
      const withoutEllipsis = truncated.endsWith('...') ? truncated.slice(0, -3) : truncated

      return (
        <>
          {withoutEllipsis}{' '}
          <span className="inline font-medium" style={{ color: termCommand }}>
            {t('newsTimeline.more')}
          </span>
        </>
      )
    }

    return description
  }

  // Based on browser width, decide category display
  const getCategoryLength = useCallback(
    (type: string) => {
      if (!type) return ''

      // Narrow screen: show only 3 characters
      if (isNarrowScreen) {
        return type.substring(0, 3)
      }

      // Wide screen: show full category name
      return type
    },
    [isNarrowScreen],
  )

  // Interaction tier for title bar right side
  const interactionTier =
    interactions >= 25
      ? { color: termHighlight, isRainbow: true, label: t('interactionTier.singularity') }
      : interactions >= 18
        ? { color: termWarning, isRainbow: false, label: t('interactionTier.overclocked') }
        : interactions >= 12
          ? { color: termParam, isRainbow: false, label: t('interactionTier.deepFocus') }
          : interactions >= 8
            ? { color: termSuccess, isRainbow: false, label: t('interactionTier.engaged') }
            : interactions >= 5
              ? { color: termCommand, isRainbow: false, label: t('interactionTier.curious') }
              : interactions >= 2
                ? { color: termInfo, isRainbow: false, label: t('interactionTier.scanning') }
                : { color: termSecondary, isRainbow: false, label: t('interactionTier.idle') }

  // Current research status with resolved color
  const currentResearch = researchStatuses[researchStatusIndex]
  const researchColor =
    currentResearch.colorKey === 'success'
      ? termSuccess
      : currentResearch.colorKey === 'command'
        ? termCommand
        : currentResearch.colorKey === 'param'
          ? termParam
          : currentResearch.colorKey === 'warning'
            ? termWarning
            : currentResearch.colorKey === 'highlight'
              ? termHighlight
              : termInfo

  return (
    <div
      className="flex flex-col font-mono tracking-tight overflow-hidden w-full rounded-md shadow-[0_0_0_1px_var(--border-color),0_2px_8px_rgba(0,0,0,0.1)]"
      style={{
        boxShadow: `0 0 0 1px ${termBorder}, 0 2px 8px ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      {/* ═══ Pixel RGB light bar (dynamic chase) ═══ */}
      <div className="flex rounded-t-md flex-shrink-0 h-1 overflow-hidden w-full">
        {(() => {
          const total = 28
          const tick = Math.floor(currentTime.getTime() / 200)
          return Array.from({ length: total }, (_, i) => {
            const colorIdx = (i + tick) % terminalPalette.rainbow.length
            const brightness = 0.6 + 0.4 * Math.abs(Math.sin((i + tick * 0.5) * 0.3))
            return (
              <div
                className="flex-1 h-full transition-all duration-200"
                key={i}
                style={{
                  backgroundColor: terminalPalette.rainbow[colorIdx],
                  opacity: brightness,
                }}
              />
            )
          })
        })()}
      </div>

      {/* ═══ Title bar: syntax-highlighted title + interaction tier ═══ */}
      <div
        className="flex flex-wrap lg:flex-nowrap items-center justify-between bg-[var(--header-bg)] border-b border-border text-foreground flex-shrink-0 text-[10px] md:text-xs font-medium gap-1 lg:gap-0 px-1.5 md:px-2 py-1 md:py-1.5"
        style={{ backgroundColor: termHeader, borderBottomColor: termBorder, color: termText }}
      >
        {/* Left: traffic lights + syntax-highlighted title */}
        <div className="flex items-center flex-1 lg:flex-auto gap-1">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="bg-[#bf616a] rounded-full h-2.5 w-2.5" />
            <div className="bg-[#ebcb8b] rounded-full h-2.5 w-2.5" />
            <div className="bg-[#a3be8c] rounded-full h-2.5 w-2.5" />
          </div>
          <DynamicIcon className="h-2.5 md:h-3 w-2.5 md:w-3 text-primary" name="FaTerminal" style={{ color: termCommand }} />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span style={{ color: termParam }}>const </span>
            <span className="font-bold" style={{ color: termPrompt }}>{siteOwner.terminalUsername}</span>
            <span style={{ color: termSecondary }}> = </span>
            <span className="hidden sm:inline" style={{ color: termParam }}>new </span>
            <span className="hidden sm:inline font-bold" style={{ color: termCommand }}>Terminal</span>
            <span className="hidden sm:inline" style={{ color: termSecondary }}>(</span>
            <span className="hidden sm:inline" style={{ color: termHighlight }}>'research'</span>
            <span className="hidden sm:inline" style={{ color: termSecondary }}>)</span>
          </p>
        </div>

        {/* Middle: research process status */}
        <div className="flex items-center">
          <div
            className="rounded-sm flex-shrink-0 px-1.5 bg-black/5 dark:bg-black/30"
          >
            <p style={{ color: researchColor }}>
              {currentResearch.label} {currentResearch.suffix}
            </p>
          </div>
        </div>

        {/* Right: time + interaction tier */}
        <div className="flex items-center gap-1 md:gap-2">
          <p className="hidden md:inline" style={{ color: termHighlight }}>
            {formattedTime}
          </p>
          <div
            className={cn(
              "flex items-center gap-1",
              interactionTier.isRainbow ? "animate-rainbow" : ""
            )}
            style={{ color: interactionTier.isRainbow ? undefined : interactionTier.color }}
          >
            <span className="inline-block animate-pulse">◉</span>
            <p>{interactionTier.label}</p>
          </div>
        </div>
      </div>

      {/* ═══ Status bar: tmux-style segments ═══ */}
      <div
        className="flex items-center justify-between bg-secondary/10 border-b border-border flex-shrink-0 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 overflow-hidden"
        style={{ backgroundColor: tc.touchBar, borderBottomColor: termBorder }}
      >
        {/* Left segments */}
        <div className="flex items-center gap-0 overflow-hidden">
          <div className="flex items-center flex-shrink-0 gap-1 px-1 md:px-1.5">
            <DynamicIcon className="h-2 md:h-2.5 w-2 md:w-2.5" name="FaUser" style={{ color: termPrompt }} />
            <p className="font-bold" style={{ color: termText }}>{siteOwner.terminalUsername}</p>
          </div>
          <span style={{ color: tc.border }}>│</span>
          <div className="flex items-center flex-shrink-0 gap-1 px-1 md:px-1.5">
            <DynamicIcon className="h-2 md:h-2.5 w-2 md:w-2.5" name="FaClock" style={{ color: termHighlight }} />
            <p style={{ color: termSecondary }}>{bostonDateStr}</p>
          </div>
          <span className="hidden md:inline" style={{ color: tc.border }}>│</span>
          <div className="hidden md:flex items-center flex-shrink-0 gap-1 px-1.5">
            <DynamicIcon className="h-2 md:h-2.5 w-2 md:w-2.5" name="FaFolder" style={{ color: termCommand }} />
            <p style={{ color: termCommand }}>~/cortex/papers</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center flex-shrink-0 px-1 md:px-2">
          <DynamicIcon className="h-2 md:h-2.5 w-2 md:w-2.5" name="FaArrowRight" style={{ color: termSecondary }} />
        </div>

        {/* Right segments */}
        <div className="flex items-center gap-0 overflow-hidden">
          <div className="hidden sm:flex lg:flex items-center flex-shrink-0 gap-1 px-1.5">
            <DynamicIcon className="h-2 md:h-2.5 w-2 md:w-2.5" name="FaCodeBranch" style={{ color: termInfo }} />
            <p style={{ color: termInfo }}>{termProcesses[processIndex]}</p>
          </div>
          <span className="hidden sm:inline lg:inline" style={{ color: tc.border }}>│</span>
          <div className="flex items-center flex-shrink-0 gap-1 px-1 md:px-1.5">
            <DynamicIcon className="h-2 md:h-2.5 w-2 md:w-2.5" name="FaBrain" style={{ color: termParam }} />
            <p
              style={{ color: memoryUsage > 90 ? termError : memoryUsage > 80 ? termWarning : termSuccess }}
            >
              {memoryUsage}%
            </p>
            <div
              className="hidden md:block bg-header rounded-full h-1 w-[30px] overflow-hidden"
              style={{ backgroundColor: tc.header }}
            >
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  backgroundColor: memoryUsage > 90 ? termError : memoryUsage > 80 ? termWarning : termSuccess,
                  width: `${String(memoryUsage)}%`,
                }}
              />
            </div>
          </div>
          <span style={{ color: tc.border }}>│</span>
          <div className="flex items-center flex-shrink-0 gap-1 px-1 md:px-1.5">
            <DynamicIcon className="h-2 md:h-2.5 w-2 md:w-2.5" name="FaBolt" style={{ color: termHighlight }} />
          </div>
          <span className="hidden md:inline" style={{ color: tc.border }}>│</span>
          <div className="hidden md:flex items-center flex-shrink-0 gap-1 px-1.5">
            <DynamicIcon className="h-2 md:h-2.5 w-2 md:w-2.5" name="FaCoffee" style={{ color: termWarning }} />
            <p style={{ color: termWarning }}>∞</p>
            <p className="text-[8px] tracking-tighter" style={{ color: termSecondary }}>{sparkDisplay}</p>
          </div>
        </div>
      </div>

      {/* ═══ Scrollable content area ═══ */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          backgroundColor: termBg,
          color: termText,
          maxHeight: isVerySmallScreen ? '350px' : isMobile ? '450px' : '550px',
        }}
      >
        {/* Hint line - zsh-style syntax highlighting */}
        <div
          className={cn(
            "border-b border-dotted text-info px-2 md:px-3 py-0.5 md:py-1",
            isVerySmallScreen ? "hidden" : "block"
          )}
          style={{ borderBottomColor: termBorder, color: termInfo, fontSize: isMobile ? '8px' : '10px' }}
        >
          <div className="flex items-center gap-1 md:gap-2">
            <DynamicIcon className="h-1.5 md:h-2 w-1.5 md:w-2" name="FaChevronRight" style={{ color: termPrompt }} />
            <span className="font-bold" style={{ color: termSuccess }}>grep</span>
            <span style={{ color: termCommand }}>-riI</span>
            <span style={{ color: termHighlight }}>"knowledge"</span>
            <span style={{ color: termParam }}>--context</span>
            <span style={{ color: termSecondary }}>=</span>
            <span style={{ color: termWarning }}>3</span>
            <span className="hidden sm:inline" style={{ color: termSecondary }}>|</span>
            <span className="hidden sm:inline font-bold" style={{ color: termSuccess }}>sort</span>
            <span className="hidden sm:inline" style={{ color: termCommand }}>-r</span>
            <span
              className="hidden lg:inline italic opacity-70"
              style={{ color: tc.command }}
            >
              {t('newsTimeline.clickToExpand')}
            </span>
          </div>
        </div>

        {/* Table header — syntax highlighted */}
        <div className="p-0.5 md:p-1 lg:p-2">
          <div
            className="flex items-center border-b font-bold py-0.5 md:py-1"
            style={{ borderBottomColor: termBorder, fontSize: isVerySmallScreen ? '8px' : isMobile ? '10px' : '12px' }}
          >
            <p
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ color: termHighlight, width: dateColumnWidth }}
            >
              {isVerySmallScreen ? t('newsTimeline.time') : t('newsTimeline.timestamp')}
            </p>
            <p
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ color: termParam, width: typeColumnWidth }}
            >
              {isVerySmallScreen ? t('newsTimeline.cat') : t('newsTimeline.category')}
            </p>
            <p className="hidden md:block" style={{ color: termInfo, width: idColumnWidth }}>
              {t('newsTimeline.pid')}
            </p>
            <div className="flex-1">
              <span style={{ color: termSuccess }}>MEMORY</span>
              <span style={{ color: termSecondary }}>.</span>
              <span style={{ color: termCommand }}>DUMP</span>
            </div>
            <p className="hidden sm:block" style={{ color: termWarning, width: linksColumnWidth }}>
              {t('newsTimeline.links')}
            </p>
            <p className="text-center" style={{ color: termPrompt, width: controlColumnWidth }}>
              {isVerySmallScreen ? '+' : t('newsTimeline.ctrl')}
            </p>
          </div>

          {/* Table rows */}
          {news.map((item, index) => (
            <div
              className="group border-b border-dotted"
              key={index}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ borderBottomColor: termBorder }}
            >
              <div
                className={cn(
                  'flex items-center cursor-pointer transition-colors px-0 md:px-0.5 py-0.5 md:py-1 lg:py-1.5',
                  expandedItems[index]
                    ? isDark
                      ? 'bg-[#4c566a]/20'
                      : 'bg-slate-200/30'
                    : 'hover:bg-white/5 dark:hover:bg-white/5',
                )}
                onClick={() => toggleExpanded(index)}
                style={{
                  backgroundColor: expandedItems[index]
                    ? isDark
                      ? 'rgba(76,86,106,0.2)'
                      : 'rgba(203,213,225,0.3)'
                    : undefined,
                  fontSize: isVerySmallScreen ? '8px' : isMobile ? '10px' : '12px',
                }}
              >
                <p
                  className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{ color: termHighlight, width: dateColumnWidth }}
                >
                  {formatDate(item.date)}
                </p>
                <div style={{ width: typeColumnWidth }}>
                  <div
                    className="inline-flex items-center rounded-sm font-bold gap-1 px-0.5 md:px-1 lg:px-1.5 uppercase"
                    style={{
                      backgroundColor: typeColors[item.type.toLowerCase()]?.bg ?? typeColors.default.bg,
                      color: typeColors[item.type.toLowerCase()]?.fg ?? typeColors.default.fg,
                      fontSize: isVerySmallScreen ? '6px' : isMobile ? '8px' : '10px',
                    }}
                  >
                    {!isNarrowScreen && (
                      <DynamicIcon
                        className="h-2 md:h-2.5 w-2 md:w-2.5"
                        name={typeColors[item.type.toLowerCase()]?.icon ?? typeColors.default.icon}
                      />
                    )}
                    {getCategoryLength(item.type)}
                  </div>
                </div>
                <p
                  className={cn('hidden md:block font-mono', isWideEnough ? 'block' : 'hidden')}
                  style={{ color: termInfo, width: idColumnWidth }}
                >
                  <span style={{ color: termSecondary }}>0x</span>
                  {index.toString(16).padStart(4, '0')}
                </p>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    {item.badge && (
                      <span
                        className="rounded-sm font-bold px-0.5 md:px-1 whitespace-nowrap"
                        style={{
                          backgroundColor: typeColors[item.type.toLowerCase()]?.bg ?? typeColors.default.bg,
                          color: typeColors[item.type.toLowerCase()]?.fg ?? typeColors.default.fg,
                          fontSize: isVerySmallScreen ? '6px' : '8px',
                        }}
                      >
                        {item.badge
                          .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu, '')
                          .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
                          .replace(/\u{200D}/gu, '')
                          .replace(/\u{20E3}/gu, '')
                          .replace(' Accepted', '')
                          .replace('!', '')
                          .trim()}
                      </span>
                    )}
                    <p
                      className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ color: termText, fontSize: isMobile ? '10px' : '12px' }}
                    >
                      {isNarrowScreen ? truncateText(item.title, 60) : item.title}
                    </p>
                  </div>
                  {showDescription && (
                    <p
                      className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ color: termSecondary, fontSize: isMobile ? '8px' : '10px' }}
                    >
                      {getDescriptionLength(item.description)}
                    </p>
                  )}
                </div>
                <div
                  className="hidden lg:flex items-center justify-start"
                  style={{ width: linksColumnWidth }}
                >
                  {item.links.length > 0 ? (
                    <div className="flex items-center gap-1">
                      {item.links.slice(0, isSmallScreen ? 2 : 3).map((link, i) => (
                        <a
                          className="hover:text-foreground"
                          href={link.url}
                          key={i}
                          onClick={(e) => e.stopPropagation()}
                          rel="noopener noreferrer"
                          style={{ color: termCommand }}
                          target="_blank"
                        >
                          <div>
                            [
                            <DynamicIcon
                              className="h-2 md:h-2.5 lg:h-3 w-2 md:w-2.5 lg:w-3 inline"
                              name={link.icon ?? 'FaExternalLinkAlt'}
                            />
                            ]
                          </div>
                        </a>
                      ))}
                      {item.links.length > (isSmallScreen ? 2 : 3) && (
                        <p style={{ color: termInfo }}>+{item.links.length - (isSmallScreen ? 2 : 3)}</p>
                      )}
                    </div>
                  ) : (
                    <p style={{ color: termInfo }}>{t('newsTimeline.devNull')}</p>
                  )}
                </div>
                <div className="flex items-center justify-center" style={{ width: controlColumnWidth }}>
                  <div
                    className={cn(
                      'rounded-sm font-bold text-center px-0.5 md:px-1 py-0.5 min-w-[20px] md:min-w-[26px] transition-colors',
                      expandedItems[index]
                        ? 'text-info'
                        : 'text-command hover:bg-white/10 dark:hover:bg-white/5',
                    )}
                    style={{ color: expandedItems[index] ? termInfo : termCommand }}
                  >
                    {expandedItems[index] ? '[-]' : '[+]'}
                  </div>
                </div>
              </div>
              <Collapsible open={expandedItems[index]}>
                <CollapsibleContent>
                  <div
                    className="pl-2 md:px-3 lg:pl-10 pr-2 md:pr-3 py-1.5 md:py-2"
                    style={{
                      backgroundColor: isDark ? 'rgba(76,86,106,0.1)' : 'rgba(203,213,225,0.15)',
                      borderLeft: `2px solid ${typeColors[item.type.toLowerCase()]?.fg ?? typeColors.default.fg}`,
                    }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div
                        className="hidden md:flex items-center justify-center rounded-md flex-shrink-0 mt-0.5 p-1.5"
                        style={{
                          backgroundColor:
                            typeColors[item.type.toLowerCase()]?.bg ?? typeColors.default.bg,
                        }}
                      >
                        <DynamicIcon
                          className="h-3 md:h-4 w-3 md:w-4"
                          name={typeColors[item.type.toLowerCase()]?.icon ?? typeColors.default.icon}
                          style={{
                            color: typeColors[item.type.toLowerCase()]?.fg ?? typeColors.default.fg,
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-bold mb-0.5"
                          style={{ color: termText, fontSize: isMobile ? '10px' : '12px' }}
                        >
                          {item.title}
                        </p>
                        <div
                          className="flex items-center flex-wrap gap-1 md:gap-2"
                          style={{ fontSize: isMobile ? '8px' : '10px' }}
                        >
                          <p
                            className="font-bold uppercase"
                            style={{
                              color: typeColors[item.type.toLowerCase()]?.fg ?? typeColors.default.fg,
                            }}
                          >
                            {item.type}
                          </p>
                          <p style={{ color: termSecondary }}>·</p>
                          <p style={{ color: termHighlight }}>{item.date}</p>
                          {item.badge && (
                            <>
                              <p style={{ color: termSecondary }}>·</p>
                              <p className="font-medium" style={{ color: termSuccess }}>
                                {item.badge
                                  .replace(
                                    /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu,
                                    '',
                                  )
                                  .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
                                  .replace(/\u{200D}/gu, '')
                                  .replace(/\u{20E3}/gu, '')
                                  .trim()}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {item.description && (
                      <div
                        className={cn(
                          'text-xs leading-relaxed mb-2 whitespace-pre-line',
                          isVerySmallScreen || isMobile ? 'overflow-y-auto' : 'visible',
                        )}
                        style={{
                          color: tc.secondary,
                          fontSize: isMobile ? '10px' : '12px',
                          maxHeight: isVerySmallScreen ? '100px' : isMobile ? '200px' : 'none',
                        }}
                      >
                        {highlightData(item.description, {
                          kw: termCommand,
                          num: termHighlight,
                          str: termSuccess,
                        })}
                      </div>
                    )}
                    {item.links.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1">
                        {item.links.map((link, i) => (
                          <a
                            className="no-underline hover:no-underline"
                            href={link.url}
                            key={i}
                            onClick={(e) => e.stopPropagation()}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <div
                              className="flex items-center rounded-md border border-border transition-all duration-150 px-1.5 md:px-2 py-0.5 md:py-1 gap-1"
                              style={{
                                backgroundColor: isDark
                                  ? 'rgba(136,192,208,0.08)'
                                  : 'rgba(42,118,156,0.06)',
                                color: termCommand,
                                fontSize: isMobile ? '8px' : '10px',
                              }}
                            >
                              <DynamicIcon
                                className="h-2 md:h-2.5 w-2 md:w-2.5"
                                name={link.icon ?? 'FaExternalLinkAlt'}
                              />
                              <p>
                                {getResponsiveTextLength(
                                  link.text,
                                  isVerySmallScreen,
                                  isMobile,
                                  isSmallScreen,
                                )}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
          </div>
        </div>

      {/* ═══ Footer prompt: FIXED at bottom, never scrolls ═══ */}
      <div
        className="relative flex items-center bg-[var(--header-bg)] border-t border-border flex-shrink-0 px-2 md:px-3 py-1 md:py-1.5"
        style={{
          backgroundColor: termHeader,
          borderTopColor: termBorder,
          fontSize: isVerySmallScreen ? '8px' : isMobile ? '10px' : '12px',
        }}
      >
        <div className="flex items-center flex-shrink-0 gap-1 mr-1.5">
          <DynamicIcon className="h-1.5 md:h-2 w-1.5 md:w-2" name="FaChevronRight" style={{ color: termPrompt }} />
          {!isVerySmallScreen && (
            <DynamicIcon className="h-1.5 md:h-2 w-1.5 md:w-2" name="FaChevronRight" style={{ color: termCommand }} />
          )}
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: termSecondary }}>
          {hoveredItem !== null ? (
            <>
              <span className="font-bold" style={{ color: termSuccess }}>cat</span>{' '}
              <span style={{ color: termParam }}>./brain/memories/</span>
              <span style={{ color: termHighlight }}>
                {truncateText(news[hoveredItem]?.title, isVerySmallScreen ? 12 : 25)
                  .replace(/\s+/g, '_')
                  .toLowerCase()}
              </span>
            </>
          ) : (
            <>
              <span className="font-bold" style={{ color: termSuccess }}>find</span>{' '}
              <span style={{ color: termHighlight }}>./brain</span>{' '}
              <span style={{ color: termCommand }}>-type</span>{' '}
              <span style={{ color: termWarning }}>f</span>{' '}
              <span style={{ color: termCommand }}>-name</span>{' '}
              <span style={{ color: termHighlight }}>"*.memory"</span>{' '}
              <span className="hidden sm:inline" style={{ color: termSecondary }}>|</span>{' '}
              <span className="hidden sm:inline font-bold" style={{ color: termSuccess }}>sort</span>{' '}
              <span className="hidden sm:inline" style={{ color: termCommand }}>-r</span>{' '}
              <span className="hidden sm:inline" style={{ color: termSecondary }}>|</span>{' '}
              <span className="hidden sm:inline font-bold" style={{ color: termSuccess }}>head</span>{' '}
              <span className="hidden sm:inline" style={{ color: termWarning }}>-10</span>
            </>
          )}
        </p>
        <div
          className="rounded-[1px] h-2.5 md:h-3.5 w-1 md:w-1.5 ml-1.5 animate-blink"
          style={{ backgroundColor: termPrompt }}
        />
        {/* Easter egg: changes with interaction count */}
        {!isMobile && (
          <p
            className="absolute right-2 md:right-3 italic opacity-50 text-[6px] md:text-[8px]"
            style={{ color: termInfo }}
          >
            {interactions >= 6
              ? t('newsTimeline.easterEgg3')
              : interactions >= 3
                ? t('newsTimeline.easterEgg2')
                : t('newsTimeline.easterEgg1')}
          </p>
        )}
      </div>
    </div>
  )
}

export default NewsTimeline
