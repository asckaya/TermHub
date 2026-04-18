import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { SlotName } from '@/templates/slots'

import { Badge } from '@/components/ui/badge'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useSlot } from '@/templates/hooks'
import { DEFAULT_SECTIONS } from '@/templates/slots'

function About() {
  const { t } = useTranslation()
  const { experience, institutionLogos, news, research, siteConfig } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const researchLogos = institutionLogos
  const universityLogos = institutionLogos

  const tc = {
    line: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    newsBadgeBg: isDark ? 'rgba(154, 230, 180, 0.16)' : 'rgb(220, 252, 231)', // green-900/16 : green-100
    newsBadgeColor: isDark ? 'rgb(187, 247, 208)' : 'rgb(22, 101, 52)', // green-200 : green-800
  }

  const cfg = siteConfig as Record<string, unknown>
  const sectionOrder = (cfg.sections as string[] | undefined) ?? DEFAULT_SECTIONS

  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => {
      if (!a.sortDate && !b.sortDate) return 0
      if (!a.sortDate) return 1
      if (!b.sortDate) return -1
      return b.sortDate.localeCompare(a.sortDate)
    })
  }, [news])

  const HeroSection = useSlot('hero')
  const NewsDisplay = useSlot('newsDisplay')
  const Footer = useSlot('footer')
  const Bio = useSlot('bio')
  const Skills = useSlot('skills')
  const Journey = useSlot('journey')
  const Mentorship = useSlot('mentorship')
  const SelectedPublications = useSlot('selectedPublications')
  const Talks = useSlot('talks')
  const Teaching = useSlot('teaching')
  const Accomplishments = useSlot('accomplishments')
  const Contact = useSlot('contact')

  const renderSection = (sectionId: string, index: number) => {
    const key = `${sectionId}-${index.toString()}`
    switch (sectionId as SlotName) {
      case 'accomplishments':
        return <Accomplishments key={key} />
      case 'bio':
        return <Bio key={key} />
      case 'contact':
        return <Contact key={key} />
      case 'footer':
        return <Footer key={key} />
      case 'hero':
        return (
          <HeroSection
            avatar={siteConfig.avatar}
            education={experience.education.courses}
            educationLogos={universityLogos}
            key={key}
            research={research.currentResearch}
            researchLogos={researchLogos}
          />
        )
      case 'journey':
        return <Journey filterEducation key={key} />
      case 'mentorship':
        return <Mentorship key={key} />
      case 'newsDisplay':
        return (
          <div className="w-full" key={key}>
            <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-400 rounded-full flex-shrink-0 h-0.5 w-5" />
                <h3 className="text-base md:text-lg font-semibold">
                  {t('about.recentUpdates')}
                </h3>
                <Badge
                  className="font-mono text-[10px] border-none"
                  style={{ backgroundColor: tc.newsBadgeBg, color: tc.newsBadgeColor }}
                >
                  {t('about.news')}
                </Badge>
                <div className="flex-1 h-px" style={{ backgroundColor: tc.line }} />
              </div>
              <NewsDisplay news={sortedNews} />
            </div>
          </div>
        )
      case 'selectedPublications':
        return <SelectedPublications key={key} />
      case 'skills':
        return <Skills key={key} />
      case 'talks':
        return <Talks key={key} />
      case 'teaching':
        return <Teaching key={key} />
      default:
        return null
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full">
        {sectionOrder.map((sectionId, index) => renderSection(sectionId, index))}
      </div>
    </div>
  )
}

export default About
