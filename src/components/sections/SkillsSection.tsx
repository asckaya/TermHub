import { useTranslation } from 'react-i18next'

import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

import DynamicIcon from '../DynamicIcon'

type SkillItem = string | { category?: string; icon?: string; name: string }

const SkillsSection: React.FC = () => {
  const { t } = useTranslation()
  const { siteOwner } = useLocalizedData()
  const skills = siteOwner.skills as SkillItem[]
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    icon: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)', // gray-400 : gray-500
    line: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    tagBg: isDark ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)', // gray-800 : gray-100
    tagColor: isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)', // gray-300 : gray-700
  }

  if (skills.length === 0) return null

  const getName = (s: SkillItem) => (typeof s === 'string' ? s : s.name)
  const getIcon = (s: SkillItem) => (typeof s === 'string' ? undefined : s.icon)

  return (
    <section className="w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-400 rounded-full flex-shrink-0 h-0.5 w-5" />
          <h3 className="text-base md:text-lg font-semibold">
            {t('about.skills', 'Skills')}
          </h3>
          <div className="flex-1 h-px" style={{ backgroundColor: tc.line }} />
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              className="inline-flex items-center rounded-sm font-mono text-xs gap-1.5 px-2.5 py-1"
              key={getName(skill)}
              style={{ backgroundColor: tc.tagBg, color: tc.tagColor }}
            >
              {getIcon(skill) && (
                <DynamicIcon
                  boxSize={3}
                  name={getIcon(skill)}
                  style={{ color: tc.icon }}
                />
              )}
              <span>{getName(skill)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
