import React from 'react'

import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'

const BioSection: React.FC = () => {
  const { t } = useT()
  const { about } = useLocalizedData()

  if (!about.journey) return null

  return (
    <div className="w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-400 rounded-full flex-shrink-0 h-[2px] w-[20px]" />
          <h2 className="font-semibold text-lg md:text-xl">{t('about.bio')}</h2>
          <div className="bg-border flex-1 h-[1px]" />
        </div>
        <div className="text-muted-foreground text-sm leading-relaxed">
          {about.Content ? <about.Content /> : about.journey}
        </div>
      </div>
    </div>
  )
}

export default BioSection
