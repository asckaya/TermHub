import React from 'react'
import { useTranslation } from 'react-i18next'

import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

import DynamicIcon from '../DynamicIcon'

const roleIcons: Record<string, string> = {
  'co-instructor': 'FaUsers',
  'guest-lecturer': 'FaMicrophone',
  instructor: 'FaChalkboardTeacher',
  other: 'FaBook',
  ta: 'FaUserGraduate',
}

const TeachingSection: React.FC = () => {
  const { t } = useTranslation()
  const { teaching } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    border: isDark ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)', // gray-800 : gray-100
    line: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    muted: isDark ? 'rgb(107, 114, 128)' : 'rgb(156, 163, 175)', // gray-500 : gray-400
    text: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)', // gray-400 : gray-500
    title: isDark ? 'rgb(243, 244, 246)' : 'rgb(31, 41, 55)', // gray-100 : gray-800
  }

  if (teaching.length === 0) return null

  return (
    <section className="w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-400 rounded-full flex-shrink-0 h-0.5 w-5" />
          <h3 className="text-lg font-semibold">{t('about.teaching', 'Teaching')}</h3>
          <div className="flex-1 h-px" style={{ backgroundColor: tc.line }} />
        </div>
        <div className="flex flex-col">
          {teaching.map((entry, i) => (
            <div
              className="flex items-start gap-3 border-b py-2.5"
              key={i}
              style={{ borderColor: tc.border }}
            >
              <div className="flex-shrink-0 mt-[2px]">
                <DynamicIcon
                  className="h-3.5 w-3.5"
                  name={roleIcons[entry.role] || roleIcons.other}
                  style={{ color: 'rgb(34, 211, 238)' }} // cyan-400
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-medium leading-short" style={{ color: tc.title }}>
                  {entry.link ? (
                    <a
                      className="transition-colors hover:text-cyan-400"
                      href={entry.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {entry.course}
                    </a>
                  ) : (
                    entry.course
                  )}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  <span className="text-[10px]" style={{ color: tc.text }}>
                    {entry.institution}
                  </span>
                  <span className="text-[10px]" style={{ color: tc.muted }}>
                    · {entry.role}
                  </span>
                </div>
                {entry.description && (
                  <p className="text-[10px] mt-1" style={{ color: tc.text }}>
                    {entry.description}
                  </p>
                )}
              </div>
              <span
                className="flex-shrink-0 font-mono text-[10px] whitespace-nowrap"
                style={{ color: tc.muted }}
              >
                {entry.semester}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeachingSection
