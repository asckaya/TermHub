import React from 'react'

import { Badge } from '@/components/ui/badge'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'

export const AboutPageHeader: React.FC = () => {
  const { t } = useT()
  const { siteOwner } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    border: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    cmd: isDark ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)', // gray-200 : gray-700
    text: 'rgb(107, 114, 128)', // gray-500
  }

  return (
    <div className="border-b mb-2 pb-6" style={{ borderColor: tc.border }}>
      <div className="flex items-center font-mono text-sm md:text-base gap-2 mb-2">
        <span className="text-yellow-400 font-bold">$</span>
        <span className="text-cyan-400">cat</span>
        <span style={{ color: tc.cmd }}>about.md</span>
        <div className="inline-block bg-cyan-400 h-[1em] w-0.5 animate-blink" />
      </div>
      <div className="flex items-center gap-3 mt-3">
        <div className="bg-cyan-400 rounded-full h-0.5 w-8" />
        <h2 className="text-xl md:text-2xl font-bold">{t('nav.about')}</h2>
        <Badge
          className="font-mono text-[10px] px-2 bg-cyan-400/10 text-cyan-400 border-none"
          variant="secondary"
        >
          {siteOwner.name.full}
        </Badge>
      </div>
      <p className="font-mono text-xs mt-1" style={{ color: tc.text }}>
        # {t('about.aboutDescription')}
      </p>
    </div>
  )
}
