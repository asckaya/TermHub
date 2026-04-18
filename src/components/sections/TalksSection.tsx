import React from 'react'
import { useTranslation } from 'react-i18next'

import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

import DynamicIcon from '../DynamicIcon'

const typeLabels: Record<string, { color: string; icon: string }> = {
  invited: { color: 'rgb(192, 132, 252)', icon: 'FaUserTie' }, // purple-400
  keynote: { color: 'rgb(250, 204, 21)', icon: 'FaStar' }, // yellow-400
  oral: { color: 'rgb(34, 211, 238)', icon: 'FaMicrophone' }, // cyan-400
  other: { color: 'rgb(156, 163, 175)', icon: 'FaComments' }, // gray-400
  panel: { color: 'rgb(244, 114, 182)', icon: 'FaUsers' }, // pink-400
  poster: { color: 'rgb(74, 222, 128)', icon: 'FaImage' }, // green-400
  tutorial: { color: 'rgb(251, 146, 60)', icon: 'FaChalkboardTeacher' }, // orange-400
  workshop: { color: 'rgb(96, 165, 250)', icon: 'FaTools' }, // blue-400
}

const TalksSection: React.FC = () => {
  const { t } = useTranslation()
  const { talks } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    border: isDark ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)', // gray-800 : gray-100
    line: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    muted: isDark ? 'rgb(107, 114, 128)' : 'rgb(156, 163, 175)', // gray-500 : gray-400
    text: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)', // gray-400 : gray-500
    title: isDark ? 'rgb(243, 244, 246)' : 'rgb(31, 41, 55)', // gray-100 : gray-800
  }

  if (talks.length === 0) return null

  return (
    <section className="w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-400 rounded-full flex-shrink-0 h-0.5 w-5" />
          <h3 className="text-lg font-semibold">
            {t('about.talks', 'Talks')}
          </h3>
          <div className="flex-1 h-px" style={{ backgroundColor: tc.line }} />
        </div>
        <div className="flex flex-col">
          {talks.map((talk, i) => {
            const meta = typeLabels[talk.type ?? 'other'] ?? typeLabels.other
            return (
              <div
                className="flex items-start gap-3 border-b py-2.5"
                key={i}
                style={{ borderColor: tc.border }}
              >
                <div className="flex-shrink-0 mt-[2px]">
                  <DynamicIcon
                    className="h-3.5 w-3.5"
                    name={meta.icon}
                    style={{ color: meta.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-xs font-medium leading-short"
                    style={{ color: tc.title }}
                  >
                    {talk.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="text-[10px]" style={{ color: tc.text }}>
                      {talk.event}
                    </span>
                    {talk.location && (
                      <span className="text-[10px]" style={{ color: tc.muted }}>
                        · {talk.location}
                      </span>
                    )}
                  </div>
                  {(talk.slidesUrl ?? talk.videoUrl) && (
                    <div className="flex items-center gap-2 mt-1">
                      {talk.slidesUrl && (
                        <a
                          className="font-mono text-[10px] text-cyan-400 underline hover:no-underline"
                          href={talk.slidesUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          slides
                        </a>
                      )}
                      {talk.videoUrl && (
                        <a
                          className="font-mono text-[10px] text-cyan-400 underline hover:no-underline"
                          href={talk.videoUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          video
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <span
                  className="flex-shrink-0 font-mono text-[10px] whitespace-nowrap"
                  style={{ color: tc.muted }}
                >
                  {talk.date}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TalksSection
