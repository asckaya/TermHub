import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { TerminalShell } from '@/components/ui/TerminalShell'
import {
  StatusGroup,
  StatusSegment,
  StatusSeparator,
  SyntaxText,
  TerminalBadge,
} from '@/components/ui/TerminalSyntax'
import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'
import { cn } from '@/lib/utils'
import { type NewsItem } from '@/types'
import { highlightData } from '@/utils/highlightData'

interface NewsTimelineProps {
  news: NewsItem[]
}

// Format date to YYYY-MM-DD
const formatDate = (dateString = '') => {
  if (!dateString) return '0000-00-00'

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
const getResponsiveTextLength = (text: string): string => {
  if (!text) return ''
  return text.length > 200 ? truncateText(text, 200) : text
}

// Terminal "processes" for status bar
const termProcesses = [
  '-research • -coffee',
  '-writing • -thinking',
  '-training • -debugging',
  '-reading • -caffeine',
]

// Research process statuses
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
  const { t } = useT()
  const { siteOwner } = useLocalizedData()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [hoveredItem, setHoveredItem] = useState<null | number>(null)

  // Interactive elements state
  const [researchStatusIndex, setResearchStatusIndex] = useState(0)
  const [processIndex, setProcessIndex] = useState(0)
  const [interactions, setInteractions] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(() => 65 + Math.floor(Math.random() * 20))

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

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setResearchStatusIndex((prev) => (prev + 1) % researchStatuses.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessIndex((prev) => (prev + 1) % termProcesses.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => ({ ...prev, [index]: !prev[index] }))
    handleSystemInteraction()
  }

  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)

  interface TypeColorEntry {
    bg: string
    fg: string
    icon: string
  }
  const typeColors = useMemo<
    Record<string, TypeColorEntry | undefined> & { default: TypeColorEntry }
  >(
    () => ({
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
    }),
    [isDark, tc.param, tc.prompt, tc.command, tc.warning],
  )

  const bostonTime = new Date(currentTime.toLocaleString('en-US', { timeZone: siteOwner.timezone }))
  const formattedTime = bostonTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  })

  const bostonDateStr = `${(bostonTime.getMonth() + 1).toString()}/${bostonTime.getDate().toString()}`
  const sparkChars = '▁▂▃▅▆▇▆▅▃▂▁▃▅▇▅▃'
  const sparkOffset = Math.floor(currentTime.getTime() / 1000) % sparkChars.length
  const sparkDisplay = (sparkChars + sparkChars).slice(sparkOffset, sparkOffset + 8)

  const getDescriptionLength = (description: string) => {
    if (!description) return ''
    const maxLength = 60
    if (description.length > maxLength) {
      const truncated = truncateText(description, maxLength)
      const withoutEllipsis = truncated.endsWith('...') ? truncated.slice(0, -3) : truncated
      return (
        <>
          {withoutEllipsis} <SyntaxText type="keyword">{t('newsTimeline.more')}</SyntaxText>
        </>
      )
    }
    return description
  }

  const getCategoryLength = (type: string) => {
    if (!type) return ''
    return (
      <>
        <span className="md:inline hidden">{type}</span>
        <span className="md:hidden inline">{type.substring(0, 3)}</span>
      </>
    )
  }

  const interactionTier =
    interactions >= 25
      ? { color: tc.highlight, isRainbow: true, label: t('interactionTier.singularity') }
      : interactions >= 18
        ? { color: tc.warning, isRainbow: false, label: t('interactionTier.overclocked') }
        : interactions >= 12
          ? { color: tc.param, isRainbow: false, label: t('interactionTier.deepFocus') }
          : interactions >= 8
            ? { color: tc.success, isRainbow: false, label: t('interactionTier.engaged') }
            : interactions >= 5
              ? { color: tc.command, isRainbow: false, label: t('interactionTier.curious') }
              : interactions >= 2
                ? { color: tc.info, isRainbow: false, label: t('interactionTier.scanning') }
                : { color: tc.secondary, isRainbow: false, label: t('interactionTier.idle') }

  const currentResearch = researchStatuses[researchStatusIndex]
  const researchColorMap: Record<string, string> = {
    command: tc.command,
    highlight: tc.highlight,
    info: tc.info,
    param: tc.param,
    success: tc.success,
    warning: tc.warning,
  }
  const researchColor = researchColorMap[currentResearch.colorKey] ?? tc.info

  return (
    <TerminalShell
      bodyClassName="p-0"
      headerRight={
        <div className="flex items-center gap-2">
          <p className="hidden md:inline" style={{ color: tc.highlight }}>
            {formattedTime}
          </p>
          <div
            className={cn(
              'flex items-center gap-1',
              interactionTier.isRainbow ? 'animate-rainbow' : '',
            )}
            style={{ color: interactionTier.isRainbow ? undefined : interactionTier.color }}
          >
            <span className="inline-block animate-pulse">◉</span>
            <p className="text-[10px] md:text-xs">{interactionTier.label}</p>
          </div>
        </div>
      }
      statusBar={
        <div className="relative flex items-center w-full">
          <div className="flex items-center gap-1 mr-2">
            <DynamicIcon className="h-2 w-2" name="FaChevronRight" style={{ color: tc.prompt }} />
            <DynamicIcon
              className="h-2 w-2 hidden sm:block"
              name="FaChevronRight"
              style={{ color: tc.command }}
            />
          </div>
          <p className="truncate opacity-70 text-[10px] md:text-xs" style={{ color: tc.secondary }}>
            {hoveredItem !== null ? (
              <>
                <SyntaxText type="keyword">cat </SyntaxText>
                <SyntaxText type="variable">./memories/</SyntaxText>
                <SyntaxText type="string">
                  {truncateText(news[hoveredItem]?.title, 25).replace(/\s+/g, '_').toLowerCase()}
                </SyntaxText>
              </>
            ) : (
              <>
                <SyntaxText type="keyword">find </SyntaxText>
                <SyntaxText type="string">./brain </SyntaxText>
                <SyntaxText type="keyword">-type </SyntaxText>
                <SyntaxText type="variable">f </SyntaxText>
                <SyntaxText type="keyword">-name </SyntaxText>
                <SyntaxText type="string">"*.memory"</SyntaxText>
                <span className="hidden lg:inline">
                  {' '}
                  <SyntaxText type="punctuation">| </SyntaxText>
                  <SyntaxText type="keyword">sort </SyntaxText>
                  <SyntaxText type="variable">-r</SyntaxText>
                </span>
              </>
            )}
          </p>
          <div className="h-3.5 w-1.5 ml-2 animate-blink" style={{ backgroundColor: tc.prompt }} />
          <p className="absolute right-0 italic opacity-30 text-[8px] hidden sm:block">
            {interactions >= 6
              ? t('newsTimeline.easterEgg3')
              : interactions >= 3
                ? t('newsTimeline.easterEgg2')
                : t('newsTimeline.easterEgg1')}
          </p>
        </div>
      }
      title={
        <div className="flex items-center gap-1">
          <SyntaxText type="keyword">const </SyntaxText>
          <SyntaxText className="font-bold" type="variable">
            {siteOwner.terminalUsername}
          </SyntaxText>
          <SyntaxText type="punctuation"> = </SyntaxText>
          <SyntaxText className="hidden sm:inline" type="keyword">
            new{' '}
          </SyntaxText>
          <SyntaxText className="hidden sm:inline font-bold" type="function">
            Terminal
          </SyntaxText>
          <SyntaxText className="hidden sm:inline" type="punctuation">
            (
          </SyntaxText>
          <SyntaxText className="hidden sm:inline" type="string">
            'research'
          </SyntaxText>
          <SyntaxText className="hidden sm:inline" type="punctuation">
            )
          </SyntaxText>
          <div className="ml-2 rounded-sm px-1.5 bg-black/5 dark:bg-black/30 hidden sm:block">
            <p className="text-[10px]" style={{ color: researchColor }}>
              {currentResearch.label} {currentResearch.suffix}
            </p>
          </div>
        </div>
      }
      titleAlign="left"
      touchBar={
        <div className="flex items-center justify-between w-full">
          <StatusGroup className="gap-0">
            <StatusSegment
              className="px-1 md:px-1.5"
              icon={<DynamicIcon className="h-2 w-2" name="FaUser" style={{ color: tc.prompt }} />}
              value={siteOwner.terminalUsername}
              valueClassName="font-bold"
            />
            <StatusSeparator>│</StatusSeparator>
            <StatusSegment
              className="px-1 md:px-1.5"
              icon={
                <DynamicIcon className="h-2 w-2" name="FaClock" style={{ color: tc.highlight }} />
              }
              value={bostonDateStr}
              valueClassName="opacity-70"
            />
            <StatusSeparator className="hidden md:inline">│</StatusSeparator>
            <StatusSegment
              className="hidden md:flex px-1.5"
              icon={
                <DynamicIcon className="h-2 w-2" name="FaFolder" style={{ color: tc.command }} />
              }
              value="~/cortex/papers"
              valueClassName="opacity-70"
            />
          </StatusGroup>

          <div className="hidden md:flex items-center flex-shrink-0 px-2">
            <DynamicIcon
              className="h-2 md:h-2.5 w-2 md:w-2.5"
              name="FaArrowRight"
              style={{ color: tc.secondary }}
            />
          </div>

          <StatusGroup className="gap-0">
            <StatusSegment
              className="hidden sm:flex lg:flex px-1.5"
              icon={
                <DynamicIcon className="h-2 w-2" name="FaCodeBranch" style={{ color: tc.info }} />
              }
              value={termProcesses[processIndex]}
              valueClassName="opacity-70"
            />
            <StatusSeparator className="hidden sm:inline lg:inline">│</StatusSeparator>
            <StatusSegment
              className="px-1 md:px-1.5"
              icon={<DynamicIcon className="h-2 w-2" name="FaBrain" style={{ color: tc.param }} />}
              value={
                <div className="flex items-center gap-1.5">
                  <span
                    className={
                      memoryUsage > 90
                        ? 'text-red-400'
                        : memoryUsage > 80
                          ? 'text-yellow-400'
                          : 'text-green-400'
                    }
                  >
                    {memoryUsage}%
                  </span>
                  <div
                    className="hidden md:block bg-header rounded-full h-1 w-[30px] overflow-hidden"
                    style={{ backgroundColor: tc.header }}
                  >
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        backgroundColor:
                          memoryUsage > 90 ? tc.error : memoryUsage > 80 ? tc.warning : tc.success,
                        width: `${String(memoryUsage)}%`,
                      }}
                    />
                  </div>
                </div>
              }
            />
            <StatusSeparator>│</StatusSeparator>
            <StatusSegment
              className="px-1 md:px-1.5"
              icon={
                <DynamicIcon className="h-2 w-2" name="FaCoffee" style={{ color: tc.warning }} />
              }
              value={
                <div className="flex items-center gap-1">
                  <span style={{ color: tc.warning }}>∞</span>
                  <span className="text-[8px] tracking-tighter opacity-60">{sparkDisplay}</span>
                </div>
              }
            />
            <StatusSeparator>│</StatusSeparator>
            <button
              className="px-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1"
              onClick={() => setProcessIndex((p) => (p + 1) % termProcesses.length)}
              title="cycle process"
            >
              <DynamicIcon className="h-2 w-2" name="FaSync" style={{ color: tc.info }} />
              <span style={{ color: tc.info }}>refresh</span>
            </button>
          </StatusGroup>
        </div>
      }
    >
      <div
        className="flex-1 overflow-y-auto max-h-[350px] sm:max-h-[450px] md:max-h-[550px]"
        style={{
          backgroundColor: tc.bg,
          color: tc.text,
        }}
      >
        <div
          className="border-b border-dotted px-2 md:px-3 py-1 hidden xs:block"
          style={{
            borderBottomColor: tc.border,
            color: tc.info,
          }}
        >
          <div className="flex items-center gap-1 md:gap-2">
            <DynamicIcon
              className="h-1.5 md:h-2 w-1.5 md:w-2"
              name="FaChevronRight"
              style={{ color: tc.prompt }}
            />
            <SyntaxText className="font-bold" type="keyword">
              grep{' '}
            </SyntaxText>
            <SyntaxText type="variable">-riI </SyntaxText>
            <SyntaxText type="string">"knowledge" </SyntaxText>
            <SyntaxText type="variable">--context</SyntaxText>
            <SyntaxText type="punctuation">=</SyntaxText>
            <SyntaxText type="function">3</SyntaxText>
            <span className="hidden sm:inline opacity-20"> | </span>
            <SyntaxText className="hidden sm:inline font-bold" type="keyword">
              sort{' '}
            </SyntaxText>
            <SyntaxText className="hidden sm:inline" type="variable">
              -r
            </SyntaxText>
            <span className="hidden lg:inline italic opacity-50 ml-auto">
              {t('newsTimeline.clickToExpand')}
            </span>
          </div>
        </div>

        <div className="p-0.5 md:p-1 lg:p-2">
          <div
            className="flex items-center border-b font-bold py-1 text-[8px] xs:text-[10px] md:text-[12px]"
            style={{
              borderBottomColor: tc.border,
            }}
          >
            <p
              className="w-[75px] md:w-[120px] sm:w-[100px] xs:w-[75px]"
              style={{ color: tc.highlight }}
            >
              <span className="xs:hidden inline">{t('newsTimeline.time')}</span>
              <span className="xs:inline hidden">{t('newsTimeline.timestamp')}</span>
            </p>
            <p
              className="w-[65px] md:w-[100px] sm:w-[80px] xs:w-[65px]"
              style={{ color: tc.param }}
            >
              <span className="xs:hidden inline">{t('newsTimeline.cat')}</span>
              <span className="xs:inline hidden">{t('newsTimeline.category')}</span>
            </p>
            <p className="hidden md:block w-[80px]" style={{ color: tc.info }}>
              {t('newsTimeline.pid')}
            </p>
            <div className="flex-1">
              <SyntaxText type="keyword">MEMORY</SyntaxText>
              <SyntaxText type="punctuation">.</SyntaxText>
              <SyntaxText type="variable">DUMP</SyntaxText>
            </div>
            <p className="hidden sm:block w-[100px] md:w-[130px]" style={{ color: tc.warning }}>
              {t('newsTimeline.links')}
            </p>
            <p
              className="text-center w-[30px] md:w-[50px] sm:w-[40px]"
              style={{ color: tc.prompt }}
            >
              <span className="xs:hidden inline">+</span>
              <span className="xs:inline hidden">{t('newsTimeline.ctrl')}</span>
            </p>
          </div>

          {news.map((item, index) => {
            const typeConfig = typeColors[item.type.toLowerCase()] ?? typeColors.default
            return (
              <div
                className="group border-b border-dotted"
                key={`${item.type}-${item.date ?? ''}-${String(index)}`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ borderBottomColor: tc.border }}
              >
                <div
                  className={cn(
                    'flex items-center cursor-pointer transition-colors px-0 md:px-0.5 py-1 md:py-1.5 text-[8px] xs:text-[10px] md:text-[12px]',
                    expandedItems[index]
                      ? isDark
                        ? 'bg-[#4c566a]/20'
                        : 'bg-slate-200/30'
                      : 'hover:bg-white/5',
                  )}
                  onClick={() => toggleExpanded(index)}
                >
                  <p
                    className="font-medium w-[75px] md:w-[120px] sm:w-[100px] xs:w-[75px]"
                    style={{ color: tc.highlight }}
                  >
                    {formatDate(item.date)}
                  </p>
                  <div className="w-[65px] md:w-[100px] sm:w-[80px] xs:w-[65px]">
                    <TerminalBadge
                      bg={typeConfig.bg}
                      color={typeConfig.fg}
                      icon={<DynamicIcon className="h-2 md:h-2.5" name={typeConfig.icon} />}
                    >
                      {getCategoryLength(item.type)}
                    </TerminalBadge>
                  </div>
                  <p className="hidden md:block font-mono w-[80px]" style={{ color: tc.info }}>
                    <span className="opacity-50">0x</span>
                    {index.toString(16).padStart(4, '0')}
                  </p>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      {item.badge && (
                        <TerminalBadge
                          bg={typeConfig.bg}
                          className="scale-[0.8] origin-left"
                          color={typeConfig.fg}
                        >
                          {item.badge.replace(/[\u{1F300}-\u{1FAFF}]/gu, '').trim()}
                        </TerminalBadge>
                      )}
                      <p
                        className="font-medium truncate text-[10px] md:text-[12px]"
                        style={{ color: tc.text }}
                      >
                        {item.title}
                      </p>
                    </div>
                    <div className="hidden lg:block mt-0.5 opacity-60 truncate text-[10px]">
                      {getDescriptionLength(item.description)}
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center w-[100px] md:w-[130px]">
                    {item.links.length > 0 ? (
                      <div className="flex gap-1">
                        {item.links.slice(0, 3).map((link) => (
                          <a
                            href={link.url}
                            key={link.url}
                            rel="noopener noreferrer"
                            style={{ color: tc.command }}
                            target="_blank"
                          >
                            [
                            {
                              <DynamicIcon
                                className="h-2.5 inline"
                                name={link.icon ?? 'FaExternalLinkAlt'}
                              />
                            }
                            ]
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="opacity-30">{t('newsTimeline.devNull')}</p>
                    )}
                  </div>
                  <div className="text-center w-[30px] md:w-[50px] sm:w-[40px]">
                    <div
                      className={cn(
                        'font-bold',
                        expandedItems[index] ? 'text-info' : 'text-command',
                      )}
                    >
                      {expandedItems[index] ? '[-]' : '[+]'}
                    </div>
                  </div>
                </div>
                <Collapsible open={expandedItems[index]}>
                  <CollapsibleContent>
                    <div
                      className="pl-4 md:pl-10 pr-2 md:pr-4 py-3"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        borderLeft: `2px solid ${typeConfig.fg}`,
                      }}
                    >
                      <p className="font-bold mb-1" style={{ color: tc.text }}>
                        {item.title}
                      </p>
                      <div className="flex gap-2 text-[10px] mb-2 opacity-70">
                        <span className="font-bold uppercase" style={{ color: typeConfig.fg }}>
                          {item.type}
                        </span>
                        <span>·</span>
                        <span style={{ color: tc.highlight }}>{item.date}</span>
                      </div>
                      {item.description && (
                        <div className="text-xs opacity-80 whitespace-pre-line leading-relaxed mb-3">
                          {highlightData(item.description, {
                            kw: tc.command,
                            num: tc.highlight,
                            str: tc.success,
                          })}
                        </div>
                      )}
                      {item.links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.links.map((link) => (
                            <a
                              className="no-underline"
                              href={link.url}
                              key={link.url}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <div
                                className="flex items-center rounded border border-border px-2 py-1 gap-1 text-[10px]"
                                style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: tc.command }}
                              >
                                <DynamicIcon
                                  className="h-3 w-3"
                                  name={link.icon ?? 'FaExternalLinkAlt'}
                                />
                                <span>{getResponsiveTextLength(link.text)}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )
          })}
        </div>
      </div>
    </TerminalShell>
  )
}

export default NewsTimeline
