import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type IconType } from 'react-icons'
import {
  FaChevronDown,
  FaCog,
  FaCrown,
  FaExternalLinkAlt,
  FaFolderOpen,
  FaGithub,
  FaMedium,
  FaSync,
  FaTimes,
  FaUser,
  FaYoutube,
} from 'react-icons/fa'
import { SiCsdn, SiZhihu } from 'react-icons/si'

import {
  Collapsible,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { type CatTheme, useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { cn } from '@/lib/utils'
import { withBase } from '@/utils/asset'
import { highlightData } from '@/utils/highlightData'

import type { ProjectItem } from '../types'

import { MotionHover, MotionList } from './animations/MotionList'

type CatThemeWithAnim = CatTheme & { anim: string }
type TabKey = 'all' | ProjectItem['category']
type TP = ProjectItem & { id: string }

const roleConfig: Record<
  string,
  { color: (d: boolean) => string; icon: IconType; textKey: string }
> = {
  independent: {
    color: (d) => (d ? '#ebcb8b' : '#c47d46'),
    icon: FaUser,
    textKey: 'projects.independent',
  },
  lead: { color: (d) => (d ? '#d08770' : '#b35a2e'), icon: FaCrown, textKey: 'projects.lead' },
  maintainer: {
    color: (d) => (d ? '#a3be8c' : '#36805a'),
    icon: FaSync,
    textKey: 'projects.maintainer',
  },
  'tech-lead': {
    color: (d) => (d ? '#88c0d0' : '#2a769c'),
    icon: FaCog,
    textKey: 'projects.techLead',
  },
}

const linkIcon = (url: string): IconType => {
  if (url.includes('github.com')) return FaGithub
  if (url.includes('medium.com')) return FaMedium
  if (url.includes('youtu.be') || url.includes('youtube.com')) return FaYoutube
  if (url.includes('zhihu.com')) return SiZhihu
  if (url.includes('csdn.net')) return SiCsdn
  return FaExternalLinkAlt
}

const fmtDate = (v?: string) => {
  if (!v) return '—'
  const d = new Date(v)
  return Number.isNaN(d.getTime())
    ? '—'
    : d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
const getYear = (v?: string) => {
  if (!v) return 'Unknown'
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? 'Unknown' : d.getFullYear().toString()
}

const FlowNode: React.FC<{
  ct: CatTheme
  hlc: { kw: string; num: string; str: string }
  isDark: boolean
  isLast: boolean
  item: TP
  onImageClick: (src: string, alt: string) => void
  tc: any
}> = ({ ct, hlc, isDark, item, onImageClick, tc }) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const role = roleConfig[item.role ?? 'independent']
  const hasImg = item.featuredImage !== undefined && item.featuredImage !== ''
  const res: { label: string; url: string }[] = []
  if (item.link) res.push({ label: t('projects.source'), url: item.link })
  item.extraLinks?.forEach((l) => {
    if (!res.some((r) => r.url === l.url)) res.push(l)
  })
  const hasExpandable =
    (item.highlights !== undefined && item.highlights.length > 0) || item.story !== undefined || item.Content !== undefined

  return (
    <div className="flex items-start gap-3 md:gap-4 relative py-3">
      {/* Connector line dot */}
      <div className="flex-shrink-0 mt-[6px] z-10">
        <div
          className={cn(
            "h-3.5 w-3.5 rounded-full border-2 transition-all duration-200",
            item.featured ? "shadow-[0_0_8px]" : ""
          )}
          style={{
            backgroundColor: item.featured ? ct.color : 'transparent',
            borderColor: item.featured ? ct.color : tc.border,
            boxShadow: item.featured ? `0 0 8px ${ct.color}80` : undefined
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-1">
          <div className="h-0.5 w-4 rounded-full" style={{ backgroundColor: ct.color }} />
          <div className="flex items-center gap-1" style={{ color: ct.color }}>
            {React.createElement(ct.icon, { className: "w-2.5 h-2.5" })}
            <span className="font-mono text-[10px] font-semibold tracking-wide uppercase">
              {ct.label}
            </span>
          </div>
          <span className="text-[10px]" style={{ color: tc.border }}>/</span>
          <div className="flex items-center gap-1" style={{ color: role.color(isDark) }}>
            {React.createElement(role.icon, { className: "w-[9px] h-[9px]" })}
            <span className="font-mono text-[10px] font-bold">
              {t(role.textKey)}
            </span>
          </div>
          <span className="ml-auto flex-shrink-0 font-mono text-[10px]" style={{ color: tc.muted }}>
            {fmtDate(item.date)}
          </span>
        </div>

        <h4
          className={cn(
            "text-sm md:text-base font-semibold leading-relaxed mb-1 transition-colors duration-150",
            hasExpandable ? "cursor-pointer hover:opacity-80" : ""
          )}
          onClick={hasExpandable ? () => setExpanded((p) => !p) : undefined}
          style={{ 
            color: tc.text,
            // hover color would be ct.color if I used classes, but I'll use inline styles for dynamic themes
          }}
        >
          {item.title}
          {item.featured && (
            <span className="ml-2 text-xs" style={{ color: hlc.num }}>★</span>
          )}
        </h4>

        {item.badge && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span
              className="px-2 py-0.5 font-mono text-[10px] rounded-sm border"
              style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                borderColor: ct.border,
                color: ct.color 
              }}
            >
              {item.badge}
            </span>
          </div>
        )}

        <div className={cn("flex flex-col gap-3 md:gap-4", hasImg ? "lg:flex-row" : "")}>
          {hasImg && (
            <MotionHover>
              <div
                className="flex-shrink-0 w-full lg:w-[260px] rounded-sm overflow-hidden cursor-zoom-in group"
                onClick={() => {
                  if (item.featuredImage)
                    onImageClick(withBase(item.featuredImage) ?? '', item.title)
                }}
              >
                <img
                  alt={item.title}
                  className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                  src={withBase(item.featuredImage)}
                  style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)' }}
                />
              </div>
            </MotionHover>
          )}

          <div className="flex-1 flex flex-col gap-2.5 justify-center min-w-0">
            <p className="text-xs leading-relaxed" style={{ color: tc.secondary }}>
              {highlightData(item.summary, hlc)}
            </p>
            <div className="h-px w-full opacity-40" style={{ backgroundColor: tc.border }} />

            <div className="flex flex-wrap gap-1.5">
              {res.map((r) => (
                <MotionHover key={r.url}>
                  <a
                    className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded-sm border transition-all duration-150 no-underline"
                    href={r.url}
                    onClick={(e) => e.stopPropagation()}
                    rel="noopener noreferrer"
                    style={{ 
                      borderColor: tc.border,
                      color: tc.secondary
                    }}
                    target="_blank"
                  >
                    {React.createElement(linkIcon(r.url), { className: "w-[11px] h-[11px]" })}
                    <span>{r.label}</span>
                  </a>
                </MotionHover>
              ))}
              {hasExpandable && (
                <MotionHover>
                  <button
                    className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded-sm border transition-all duration-150 cursor-pointer"
                    onClick={() => setExpanded((p) => !p)}
                    style={{ 
                      borderColor: expanded ? ct.color : tc.border,
                      color: expanded ? ct.color : tc.secondary
                    }}
                  >
                    <FaChevronDown
                      className={cn("w-2 h-2 transition-transform duration-150", expanded && "rotate-180")}
                    />
                    <span>{expanded ? t('projects.less') : t('projects.details')}</span>
                  </button>
                </MotionHover>
              )}
            </div>

            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 font-mono text-[10px] rounded-sm"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                      color: tc.muted 
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <Collapsible open={expanded}>
          <CollapsibleContent>
            <div className="flex flex-col gap-3 mt-3">
              {item.Content && (
                <div className="text-xs leading-relaxed" style={{ color: tc.secondary }}>
                  <item.Content />
                </div>
              )}
              {item.highlights && item.highlights.length > 0 && (
                <div>
                  {item.highlights.map((h, i) => (
                    <div key={i} className="text-xs leading-loose flex items-start">
                      <span className="mr-1.5 flex-shrink-0" style={{ color: ct.color }}>▸</span>
                      <span style={{ color: tc.secondary }}>{highlightData(h, hlc)}</span>
                    </div>
                  ))}
                </div>
              )}
              {item.story && (
                <div
                  className="p-3 border-l-2 rounded-md"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.02)',
                    borderColor: ct.color
                  }}
                >
                  <p className="text-xs italic leading-relaxed" style={{ color: tc.muted }}>
                    "{highlightData(item.story, hlc)}"
                  </p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

const Projects: React.FC = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { t } = useTranslation()
  const { projects: projectData, siteOwner } = useLocalizedData()

  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [imgPreview, setImgPreview] = useState<null | { alt: string; src: string }>(null)
  const [isImgOpen, setImgOpen] = useState(false)
  const [tick, setTick] = useState(0)

  const { buildCategoryThemes, terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)
  const hlc = { kw: tc.command, num: tc.highlight, str: tc.success }

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => (t + 1) % 1000)
    }, 200)
    return () => clearInterval(timer)
  }, [])

  const themes = useMemo(
    () => {
      const base = buildCategoryThemes(isDark)
      const durations: Record<string, number> = {
        data: 2.4,
        healthcare: 1.6,
        nlp: 1.8,
        robotics: 2.2,
        tooling: 2.6,
        'web-app': 2.0,
      }
      const result = {} as Record<string, CatThemeWithAnim>
      for (const [k, v] of Object.entries(base) as [string, CatTheme][]) {
        result[k] = { ...v, anim: `bob ${durations[k] || 2}s ease-in-out infinite` }
      }
      return result
    },
    [isDark, buildCategoryThemes],
  )

  const projects = useMemo<TP[]>(
    () => projectData.map((p, i) => ({ ...p, id: `p-${i.toString()}` })),
    [projectData],
  )

  const tabs = useMemo(() => {
    const cnt: Record<string, number> = { all: projects.length }
    projects.forEach((p) => {
      cnt[p.category] = (cnt[p.category] ?? 0) + 1
    })
    const cats: ProjectItem['category'][] = [
      'robotics',
      'nlp',
      'web-app',
      'data',
      'tooling',
      'healthcare',
    ]
    return [
      {
        color: tc.info,
        count: cnt.all,
        icon: FaFolderOpen,
        key: 'all' as TabKey,
        label: t('projects.all'),
      },
      ...cats
        .filter((k) => (cnt[k] ?? 0) > 0)
        .map((k) => ({
          color: themes[k].color,
          count: cnt[k],
          icon: themes[k].icon,
          key: k as TabKey,
          label: t(`category.${k}`),
        })),
    ]
  }, [projects, themes, tc.info, t])

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return projects
      .filter((p) => {
        if (activeTab !== 'all' && p.category !== activeTab) return false
        if (!q) return true
        return [p.title, p.summary, p.tags.join(' '), p.highlights?.join(' ')]
          .filter((s): s is string => s != null && s !== '')
          .some((s) => s.toLowerCase().includes(q))
      })
      .sort((a, b) => {
        const da = a.date ? Date.parse(a.date) : 0
        const db = b.date ? Date.parse(b.date) : 0
        if (da !== db) return db - da
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return (a.title || '').localeCompare(b.title || '')
      })
  }, [projects, searchQuery, activeTab])

  const yearGroups = useMemo(() => {
    const g: Record<string, TP[]> = {}
    filtered.forEach((p) => {
      const y = getYear(p.date)
      ;(g[y] ??= []).push(p)
    })
    return Object.entries(g)
      .sort(([a], [b]) => (a === 'Unknown' ? 1 : b === 'Unknown' ? -1 : Number(b) - Number(a)))
      .map(([year, items]) => ({ items, year }))
  }, [filtered])

  const totalIndep = useMemo(
    () => projects.filter((p) => !p.role || p.role === 'independent').length,
    [projects],
  )
  const filteredIndep = useMemo(
    () => filtered.filter((p) => !p.role || p.role === 'independent').length,
    [filtered],
  )

  const onImgClick = useCallback((src: string, alt: string) => {
    setImgPreview({ alt, src })
    setImgOpen(true)
  }, [])

  const promptPath = activeTab === 'all' ? '~' : `~/${activeTab}`

  return (
    <div className="py-8 w-full">
      <div className="flex flex-col gap-4 max-w-[1400px] mx-auto px-2 md:px-4 lg:px-8">
        <div
          className="rounded-md font-mono overflow-hidden w-full border transition-shadow duration-300"
          style={{
            backgroundColor: tc.bg,
            borderColor: tc.border,
            boxShadow: `0 4px 16px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
          }}
        >
          {/* RGB Light Bar */}
          <div className="flex h-[3px] overflow-hidden w-full">
            {(() => {
              const palette = [
                '#bf616a',
                '#d08770',
                '#ebcb8b',
                '#a3be8c',
                '#88c0d0',
                '#5e81ac',
                '#b48ead',
              ]
              const total = 28
              return Array.from({ length: total }, (_, i) => {
                const colorIdx = (i + tick) % palette.length
                const brightness = 0.6 + 0.4 * Math.abs(Math.sin((i + tick * 0.5) * 0.3))
                return (
                  <div
                    key={i}
                    className="flex-1 h-full"
                    style={{ backgroundColor: palette[colorIdx], opacity: brightness }}
                  />
                )
              })
            })()}
          </div>

          {/* Title Bar */}
          <div
            className="flex items-center justify-between px-4 py-2 text-xs font-medium border-b"
            style={{ backgroundColor: tc.header, borderColor: tc.border, color: tc.text }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="bg-[#bf616a] rounded-full h-[10px] w-[10px]" />
                <div className="bg-[#ebcb8b] rounded-full h-[10px] w-[10px]" />
                <div className="bg-[#a3be8c] rounded-full h-[10px] w-[10px]" />
              </div>
              <div className="flex items-center gap-1">
                <span style={{ color: tc.param }}>const </span>
                <span className="font-bold" style={{ color: tc.prompt }}>projects</span>
                <span style={{ color: tc.muted }}> = </span>
                <span style={{ color: tc.param }}>new </span>
                <span className="font-bold" style={{ color: tc.info }}>Portfolio</span>
                <span style={{ color: tc.muted }}>(</span>
                <span style={{ color: tc.highlight }}>'showcase'</span>
                <span style={{ color: tc.muted }}>)</span>
              </div>
            </div>
            <div style={{ color: tc.highlight }}>
              {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                hour12: false,
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
          </div>

          {/* Touch Bar */}
          <div
            className="flex items-center justify-between px-4 py-1 text-[10px] border-b overflow-hidden"
            style={{ backgroundColor: tc.touchBar, borderColor: tc.border }}
          >
            <div className="truncate" style={{ color: tc.secondary }}>
              <span className="font-bold" style={{ color: tc.prompt }}>
                {siteOwner.terminalUsername}
              </span>
              <span className="mx-1" style={{ color: tc.border }}>·</span>
              <span style={{ color: tc.highlight }}>{projects.length}</span>
              <span> {t('projects.projectsAcross')} </span>
              <span style={{ color: tc.prompt }}>
                {totalIndep} {t('projects.independentlyBuilt')}
              </span>
            </div>
            <div className="flex-shrink-0" style={{ color: tc.info }}>
              ~/projects/{activeTab === 'all' ? 'all' : activeTab}
            </div>
          </div>

          {/* Tab Bar */}
          <div
            className="flex overflow-x-auto border-b scrollbar-none"
            style={{ backgroundColor: tc.tabBar, borderColor: tc.border }}
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.key
              return (
                <MotionHover key={tab.key}>
                  <button
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 font-mono text-xs whitespace-nowrap border-b-2 transition-all duration-150 cursor-pointer",
                      active ? "font-bold" : "font-normal hover:bg-white/[0.03]"
                    )}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      backgroundColor: active ? tc.bg : 'transparent',
                      borderBottomColor: active ? tab.color : 'transparent',
                      color: active ? tab.color : tc.muted,
                    }}
                  >
                    <div style={active && tab.key !== 'all' ? { animation: themes[tab.key].anim } : undefined}>
                      {React.createElement(tab.icon, { className: "w-3 h-3" })}
                    </div>
                    <span>{tab.label}</span>
                    <span className="opacity-70">({tab.count})</span>
                  </button>
                </MotionHover>
              )
            })}
          </div>

          {/* Search Bar / Command Line */}
          <div
            className="flex items-center gap-2 px-4 py-2 border-b text-xs font-mono"
            style={{ backgroundColor: tc.bg, borderColor: tc.border }}
          >
            <span className="flex-shrink-0" style={{ color: tc.prompt }}>
              {siteOwner.terminalUsername}@projects:{promptPath}$
            </span>
            <input
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-xs font-mono placeholder:opacity-50"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="grep -i '...'"
              style={{ color: tc.text }}
              type="text"
              value={searchQuery}
            />
          </div>

          {/* Projects Content Area */}
          <div
            className="overflow-y-auto max-h-[75vh] scrollbar-thin scrollbar-thumb-gray-500/50"
            style={{ backgroundColor: tc.bg, color: tc.text }}
          >
            <div className="px-3 md:px-4 lg:px-5 py-4">
              <MotionList staggerDelay={0.15}>
                {yearGroups.map((group, gi) => (
                  <div key={group.year} className={cn("relative", gi < yearGroups.length - 1 ? "mb-6" : "")}>
                    {/* Year group header */}
                    <div className="flex items-center gap-2 mb-2 pl-0.5">
                      <span className="font-mono text-[10px] font-semibold tracking-wide" style={{ color: tc.highlight }}>
                        {group.year}
                      </span>
                      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: tc.border }} />
                      <span className="font-mono text-[10px]" style={{ color: tc.muted }}>
                        {group.items.length} {t('projects.projects')}
                      </span>
                    </div>

                    {/* Node list with connector line */}
                    <div className="relative">
                      {/* Vertical connector line */}
                      <div
                        className="absolute left-[7px] top-3 bottom-3 w-px opacity-30 z-0"
                        style={{ backgroundColor: tc.border }}
                      />
                      
                      <div className="flex flex-col gap-0">
                        {group.items.map((item, idx) => (
                          <FlowNode
                            key={item.id}
                            ct={themes[item.category]}
                            hlc={hlc}
                            isDark={isDark}
                            isLast={idx === group.items.length - 1}
                            item={item}
                            onImageClick={onImgClick}
                            tc={tc}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </MotionList>
            </div>

            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-sm" style={{ color: tc.highlight }}>
                  {t('projects.noMatches')}
                </p>
                <p className="text-xs mt-1" style={{ color: tc.secondary }}>
                  {t('projects.tryAdjustingSearch')}
                </p>
              </div>
            )}
          </div>

          {/* Footer Status Bar */}
          <div
            className="flex flex-wrap items-center justify-between gap-2 px-4 py-1.5 border-t text-[10px] font-mono"
            style={{ backgroundColor: tc.header, borderColor: tc.border, color: tc.muted }}
          >
            <div className="flex items-center gap-3">
              <span>{filtered.length}/{projects.length} {t('projects.shown')}</span>
              <div className="flex items-center gap-1 font-bold" style={{ color: tc.success }}>
                <FaUser className="w-[9px] h-[9px]" />
                <span>{filteredIndep} {t('projects.independent')}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span style={{ color: tc.prompt }}>
                {siteOwner.terminalUsername}@projects:{promptPath}$
              </span>
              <div
                className="w-1.5 h-3 animate-pulse"
                style={{ backgroundColor: tc.prompt }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog onOpenChange={setImgOpen} open={isImgOpen}>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm z-[100]" />
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none z-[101]">
          <DialogTitle className="sr-only">Project Preview</DialogTitle>
          <div className="relative">
            {imgPreview && (
              <img
                alt={imgPreview.alt}
                className="max-h-[85vh] w-auto mx-auto rounded-lg shadow-2xl"
                src={imgPreview.src}
              />
            )}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
              onClick={() => setImgOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
      `}} />
    </div>
  )
}

export default Projects
