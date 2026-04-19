import React, { useMemo } from 'react'

import type { ExperienceEntry, JourneyPhase } from '@/types'

import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'

const renderBoldText = (text: string, color: string, boldColor: string) => {
  if (!text) return null
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} style={{ color: boldColor, fontWeight: 600 }}>
          {part.slice(2, -2)}
        </span>
      )
    }
    return (
      <span key={i} style={{ color }}>
        {part}
      </span>
    )
  })
}

interface JourneySectionProps {
  filterEducation?: boolean
}

const JourneySection: React.FC<JourneySectionProps> = ({ filterEducation = false }) => {
  const { t } = useT()
  const { experienceTimeline } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const phases = useMemo<JourneyPhase[]>(() => {
    // Map experience timeline to journey phases structure
    const mapped: JourneyPhase[] = experienceTimeline.map((entry: ExperienceEntry) => ({
      description: entry.summary ?? entry.highlights.join(' · '),
      kind: entry.category === 'academic' ? 'education' : 'work',
      org: entry.company,
      period: `${entry.start} - ${entry.isCurrent ? t('experience.present') : (entry.end ?? '')}`,
      tags: entry.highlights,
      title: entry.title,
    }))

    if (filterEducation) {
      return mapped.filter((p) => p.kind !== 'education')
    }
    return mapped
  }, [experienceTimeline, filterEducation, t])

  const tc = {
    bold: isDark ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)', // gray-200 : gray-700
    border: isDark ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)', // gray-600 : gray-300
    dotBg: isDark ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)', // gray-800 : white
    heading: isDark ? 'rgb(243, 244, 246)' : 'rgb(31, 41, 55)', // gray-100 : gray-800
    line: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    org: isDark ? 'rgb(107, 114, 128)' : 'rgb(156, 163, 175)', // gray-500 : gray-400
    slash: isDark ? 'rgb(75, 85, 99)' : 'rgb(156, 163, 175)', // gray-600 : gray-400
    tagBg: isDark ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)', // gray-800 : gray-100
    text: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)', // gray-400 : gray-500
  }

  if (phases.length === 0) return null

  return (
    <section className="w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <div className="flex items-center gap-3 mb-4 w-full">
          <div className="bg-cyan-400 rounded-full flex-shrink-0 h-0.5 w-5" />
          <h3 className="text-base md:text-lg font-semibold">{t('about.myJourney')}</h3>
          <div className="flex-1 h-px" style={{ backgroundColor: tc.line }} />
        </div>

        <div className="relative w-full">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-[7px] top-[12px] bottom-[12px] w-px"
            style={{ backgroundColor: tc.line }}
          />

          <div className="flex flex-col gap-0">
            {phases.map((phase: JourneyPhase, index: number) => (
              <div className="relative flex items-start gap-3 md:gap-4 py-3" key={index}>
                <div className="flex-shrink-0 mt-[6px]">
                  <div
                    className="h-3.5 w-3.5 rounded-full border-2"
                    style={{
                      backgroundColor: index === 0 ? 'rgb(34, 211, 238)' : tc.dotBg, // Top item (latest) is highlighted
                      borderColor: index === 0 ? 'rgb(34, 211, 238)' : tc.border,
                    }}
                  />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-semibold tracking-wide uppercase text-cyan-400">
                      {phase.period}
                    </span>
                    <span className="text-[10px]" style={{ color: tc.slash }}>
                      /
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: tc.org }}>
                      {phase.org}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: tc.heading }}>
                    {phase.title}
                  </h4>
                  <div className="text-xs leading-relaxed mb-2">
                    {renderBoldText(phase.description, tc.text, tc.bold)}
                  </div>
                  {phase.tags && phase.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {phase.tags.map((tag: string) => (
                        <span
                          className="rounded-sm font-mono text-[10px] px-1.5 py-0.5"
                          key={tag}
                          style={{ backgroundColor: tc.tagBg, color: tc.text }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* View all link */}
            <div className="relative flex items-start gap-3 md:gap-4 py-3">
              <div className="flex-shrink-0 mt-[6px]">
                <div
                  className="h-3.5 w-3.5 rounded-full border-2 border-dashed"
                  style={{ borderColor: tc.border }}
                />
              </div>
              <a className="no-underline hover:no-underline group" href="/experience">
                <div
                  className="flex items-center gap-2 mt-[3px] font-mono text-xs transition-colors group-hover:text-cyan-400"
                  style={{ color: tc.text }}
                >
                  <span>{t('about.viewAllExperience')}</span>
                  <span>→</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneySection
