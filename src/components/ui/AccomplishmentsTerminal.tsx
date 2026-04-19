import React from 'react'
import { useTranslation } from 'react-i18next'

import type { Award } from '@/types'

import DynamicIcon from '@/components/ui/DynamicIcon'
import { TerminalShell } from '@/components/ui/TerminalShell'
import { SyntaxText } from '@/components/ui/TerminalSyntax'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

const iconFor = (a: Award): string => {
  if (a.kind === 'grant') return 'FaCoins'
  if (a.kind === 'hackathon') return 'FaTrophy'
  if (a.kind === 'travel') return 'FaPlane'
  if (a.kind === 'scholarship') return 'FaGraduationCap'
  if (a.kind === 'honor') return 'FaMedal'
  if (a.kind === 'employment') return 'FaBriefcase'
  if (a.kind === 'innovation') return 'FaLightbulb'
  if (a.kind === 'competition') {
    const t = (a.title + ' ' + (a.org ?? '')).toLowerCase()
    if (t.includes('first')) return 'FaTrophy'
    if (t.includes('second')) return 'FaMedal'
    if (t.includes('third')) return 'FaAward'
    if (t.includes('meritorious')) return 'FaStar'
    if (t.includes('honorable')) return 'FaAward'
    return 'FaChartBar'
  }
  return 'FaCoins'
}

const kindMeta: Record<string, { color: [string, string]; labelKey: string }> = {
  competition: {
    color: ['rgb(251, 146, 60)', 'rgb(253, 186, 116)'],
    labelKey: 'awards.competition',
  }, // orange-400 : orange-300
  employment: { color: ['rgb(59, 130, 246)', 'rgb(147, 197, 253)'], labelKey: 'awards.employment' }, // blue-500 : blue-300
  grant: { color: ['rgb(234, 179, 8)', 'rgb(253, 224, 71)'], labelKey: 'awards.grant' }, // yellow-500 : yellow-300
  hackathon: { color: ['rgb(168, 85, 247)', 'rgb(216, 180, 254)'], labelKey: 'awards.hackathon' }, // purple-500 : purple-300
  honor: { color: ['rgb(34, 197, 94)', 'rgb(134, 239, 172)'], labelKey: 'awards.honor' }, // green-500 : green-300
  innovation: { color: ['rgb(6, 182, 212)', 'rgb(103, 232, 249)'], labelKey: 'awards.innovation' }, // cyan-500 : cyan-300
  other: { color: ['rgb(156, 163, 175)', 'rgb(107, 114, 128)'], labelKey: 'awards.other' }, // gray-400 : gray-500
  scholarship: {
    color: ['rgb(168, 85, 247)', 'rgb(216, 180, 254)'],
    labelKey: 'awards.scholarship',
  }, // purple-500 : purple-300
  travel: { color: ['rgb(96, 165, 250)', 'rgb(147, 197, 253)'], labelKey: 'awards.travel' }, // blue-400 : blue-300
}

const AwardRow = React.memo(function AwardRow({ award }: { award: Award }) {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    border: isDark ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)', // gray-800 : gray-100
    egg: isDark ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)', // gray-300 : gray-600
    muted: isDark ? 'rgb(107, 114, 128)' : 'rgb(156, 163, 175)', // gray-500 : gray-400
    title: isDark ? 'rgb(243, 244, 246)' : 'rgb(31, 41, 55)', // gray-100 : gray-800
  }

  const meta = kindMeta[award.kind ?? 'other']
  const kindColor = isDark ? meta.color[1] : meta.color[0]

  const content = (
    <div
      className={`flex items-start gap-3 py-2.5 transition-all duration-150 border-b ${award.egg ? 'hover:pl-1 cursor-pointer' : 'cursor-default'}`}
      style={{ borderColor: tc.border }}
    >
      <div className="flex-shrink-0 mt-0.5">
        <DynamicIcon className="h-3.5 w-3.5" name={iconFor(award)} style={{ color: kindColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium leading-tight" style={{ color: tc.title }}>
          {award.title}
        </p>
        <div className="flex flex-wrap gap-2 mt-0.5">
          {award.org && (
            <p className="text-[10px]" style={{ color: tc.muted }}>
              {award.org}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
        <p className="font-mono text-[10px] whitespace-nowrap" style={{ color: tc.muted }}>
          {award.date}
        </p>
        <p className="font-mono text-[10px] tracking-wide uppercase" style={{ color: kindColor }}>
          {t(meta.labelKey)}
        </p>
      </div>
    </div>
  )

  if (award.egg) {
    return (
      <div className="flex flex-col items-stretch gap-1" title={award.egg}>
        {content}
        <p className="text-xs pl-8" style={{ color: tc.egg }}>
          {award.egg}
        </p>
      </div>
    )
  }

  return content
})

const AccomplishmentsTerminal: React.FC = () => {
  const { awards } = useLocalizedData()

  return (
    <div className="w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <TerminalShell
          title={
            <div className="flex items-center gap-1">
              <SyntaxText type="keyword">cat </SyntaxText>
              <SyntaxText type="string">achievements.log</SyntaxText>
            </div>
          }
          titleAlign="left"
        >
          <div className="flex flex-col items-stretch">
            {awards.map((a) => (
              <AwardRow award={a} key={`${a.title}-${a.date}`} />
            ))}
          </div>
        </TerminalShell>
      </div>
    </div>
  )
}

export default AccomplishmentsTerminal
