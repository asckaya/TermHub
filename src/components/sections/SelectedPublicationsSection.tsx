import { X } from 'lucide-react'
import React, { useMemo, useState } from 'react'

import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'
import { selectedPublicationIds } from '@/site.config'
import { withBase } from '@/utils/asset'

const PubLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    border: isDark ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)', // gray-600 : gray-200
    hoverBg: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgb(249, 250, 251)', // whiteAlpha.50 : gray-50
    text: isDark ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)', // gray-400 : gray-600
  }

  return (
    <a className="no-underline" href={href} rel="noopener noreferrer" target="_blank">
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border font-mono text-xs transition-all duration-150 hover:border-cyan-400 hover:text-cyan-400"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = tc.hoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        style={{
          backgroundColor: 'transparent',
          borderColor: tc.border,
          color: tc.text,
        }}
      >
        <DynamicIcon className="h-3 w-3" name={icon} />
        <span>{label}</span>
      </div>
    </a>
  )
}

interface Publication {
  abstract?: string
  authors: string[]
  coFirstAuthors?: string[]
  featuredImage?: string
  id: string
  isCoFirst?: boolean
  keywords?: string[]
  links: {
    arxiv?: string
    code?: string
    dataset?: string
    demo?: string
    paper?: string
    projectPage?: string
  }
  specialBadges?: string[]
  title: string
  venue?: string
  venueType?: string
  year: number | string
}

const PublicationCard = ({ pub }: { pub: Publication }) => {
  const { t } = useT()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const [isAbstractOpen, setAbstractOpen] = useState(false)
  const [isImageOpen, setImageOpen] = useState(false)

  const tc = {
    abstractBg: isDark ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)', // gray-900 : gray-50
    abstractBorder: isDark ? 'rgb(8, 145, 178)' : 'rgb(103, 232, 249)', // cyan-600 : cyan-300
    abstractText: isDark ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)', // gray-400 : gray-600
    author: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)', // gray-400 : gray-500
    bg: isDark ? 'rgb(31, 41, 55)' : 'white', // gray-800 : white
    border: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    highlightAuthor: isDark ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)', // gray-200 : gray-700
    hoverBorder: isDark ? 'rgb(8, 145, 178)' : 'rgb(103, 232, 249)', // cyan-600 : cyan-300
    imageBg: isDark ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)', // gray-900 : gray-50
    imagePreviewBg: isDark ? 'rgb(17, 24, 39)' : 'white', // gray-900 : white
    meta: isDark ? 'rgb(107, 114, 128)' : 'rgb(156, 163, 175)', // gray-500 : gray-400
    separator: isDark ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)', // gray-700 : gray-100
    title: isDark ? 'rgb(243, 244, 246)' : 'rgb(31, 41, 55)', // gray-100 : gray-800
  }

  return (
    <div
      className="group rounded-md border p-4 md:p-5 lg:p-6 transition-all duration-200"
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = tc.hoverBorder)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = tc.border)}
      style={{
        backgroundColor: tc.bg,
        borderColor: tc.border,
      }}
    >
      <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-6">
        {pub.featuredImage && (
          <div
            className="rounded-sm flex-shrink-0 min-h-[200px] md:min-h-[220px] lg:min-h-0 overflow-hidden cursor-zoom-in w-full lg:w-[300px]"
            onClick={() => setImageOpen(true)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setImageOpen(true)
              }
            }}
            role="button"
            style={{ backgroundColor: tc.imageBg }}
            tabIndex={0}
          >
            <img
              alt={pub.title}
              className="h-full w-full object-contain p-1 transition-transform duration-300 hover:scale-[1.03]"
              loading="lazy"
              src={withBase(pub.featuredImage)}
            />
          </div>
        )}
        <div className="flex flex-col flex-1 gap-2.5 justify-center">
          <div className="flex items-center flex-wrap gap-2">
            <div className="bg-cyan-400 rounded-full h-0.5 w-4" />
            <p className="text-cyan-400 font-mono text-xs font-semibold tracking-wide uppercase">
              {pub.venue?.includes(pub.year.toString())
                ? pub.venue
                : `${pub.venue ?? ''} ${pub.year.toString()}`}
            </p>
            {pub.venueType && (
              <p className="font-mono text-[10px]" style={{ color: tc.meta }}>
                / {pub.venueType}
              </p>
            )}
          </div>
          <h3 className="text-sm font-semibold leading-relaxed" style={{ color: tc.title }}>
            {pub.title}
          </h3>
          <div className="flex flex-col gap-1.5 w-full">
            <p className="text-xs leading-normal line-clamp-2" style={{ color: tc.author }}>
              {pub.authors.map((author: string, idx: number) => {
                const isHighlighted = pub.isCoFirst && pub.coFirstAuthors?.includes(author)
                return (
                  <span
                    className={isHighlighted ? 'font-semibold' : ''}
                    key={idx}
                    style={{ color: isHighlighted ? tc.highlightAuthor : undefined }}
                  >
                    {author}
                    {isHighlighted && <sup className="text-cyan-400 text-[10px] ml-0.5">*</sup>}
                    {idx < pub.authors.length - 1 && ', '}
                  </span>
                )
              })}
            </p>
            {pub.specialBadges && pub.specialBadges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                {pub.specialBadges.map((badge: string) => {
                  const isPrimary = badge === 'First Author' || badge === 'Co-First'
                  const isHighlight =
                    badge === 'Oral' || badge === 'Spotlight' || badge === 'Best Paper'

                  let badgeBg = 'transparent'
                  let badgeBorder = isDark ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)' // gray-600 : gray-200
                  let badgeText = isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' // gray-400 : gray-500

                  if (isPrimary) {
                    badgeBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgb(236, 254, 255)' // whiteAlpha.50 : cyan-50
                    badgeBorder = isDark ? 'rgb(14, 116, 144)' : 'rgb(165, 243, 252)' // cyan-700 : cyan-200
                    badgeText = isDark ? 'rgb(103, 232, 249)' : 'rgb(8, 145, 178)' // cyan-300 : cyan-600
                  } else if (isHighlight) {
                    badgeBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgb(255, 247, 237)' // whiteAlpha.50 : orange-50
                    badgeBorder = isDark ? 'rgb(194, 65, 12)' : 'rgb(254, 215, 170)' // orange-700 : orange-200
                    badgeText = isDark ? 'rgb(253, 186, 116)' : 'rgb(194, 65, 12)' // orange-300 : orange-600
                  }

                  return (
                    <span
                      className="rounded-sm border font-mono text-[10px] px-2 py-0.5"
                      key={badge}
                      style={{
                        backgroundColor: badgeBg,
                        borderColor: badgeBorder,
                        color: badgeText,
                      }}
                    >
                      {badge}
                    </span>
                  )
                })}
                {pub.isCoFirst && (
                  <p className="text-[10px] italic" style={{ color: tc.meta }}>
                    {t('about.equalContribution')}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="h-px w-full" style={{ backgroundColor: tc.separator }} />
          <div className="flex flex-wrap gap-1.5 items-center">
            {pub.links.paper && (
              <PubLink href={pub.links.paper} icon="FaFileAlt" label={t('about.paper')} />
            )}
            {pub.links.arxiv && (
              <PubLink href={pub.links.arxiv} icon="SiArxiv" label={t('about.arXiv')} />
            )}
            {pub.links.projectPage && (
              <PubLink href={pub.links.projectPage} icon="FaGlobe" label={t('about.project')} />
            )}
            {pub.links.code && (
              <PubLink href={pub.links.code} icon="FaGithub" label={t('about.code')} />
            )}
            {pub.links.demo && (
              <PubLink href={pub.links.demo} icon="FaPlay" label={t('about.demo')} />
            )}
            {pub.links.dataset && (
              <PubLink href={pub.links.dataset} icon="FaDatabase" label={t('about.dataset')} />
            )}
            {pub.abstract && (
              <button
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border font-mono text-xs transition-all duration-150 hover:border-cyan-400 hover:text-cyan-400"
                onClick={() => setAbstractOpen(!isAbstractOpen)}
                style={{
                  borderColor: isAbstractOpen ? tc.abstractBorder : tc.border,
                  color: isAbstractOpen ? 'rgb(34, 211, 238)' : tc.abstractText, // cyan-400
                }}
              >
                <DynamicIcon
                  className={`h-2.5 w-2.5 transition-transform duration-150 ${isAbstractOpen ? 'rotate-90' : ''}`}
                  name="FaChevronRight"
                />
                <span>{t('about.abstract')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {pub.abstract && (
        <Collapsible open={isAbstractOpen}>
          <CollapsibleContent>
            <div
              className="mt-4 p-4 rounded-md border-l-2 border-cyan-400"
              style={{ backgroundColor: tc.abstractBg }}
            >
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: tc.author }}>
                {pub.abstract}
              </p>
              {pub.keywords && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {pub.keywords.map((keyword: string) => (
                    <span
                      className="rounded-sm font-mono text-[10px] px-1.5 py-0.5"
                      key={keyword}
                      style={{ backgroundColor: tc.separator, color: tc.meta }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {pub.featuredImage && (
        <Dialog onOpenChange={setImageOpen} open={isImageOpen}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none flex flex-col items-center justify-center">
            <div className="flex justify-end w-full mb-2">
              <button
                className="text-white hover:text-cyan-400 transition-colors"
                onClick={() => setImageOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <img
              alt={`${pub.title} large preview`}
              className="rounded-lg max-h-[80vh] max-w-full object-contain p-4"
              src={withBase(pub.featuredImage)}
              style={{ backgroundColor: tc.imagePreviewBg }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

const SelectedPublicationsSection: React.FC = () => {
  const { t } = useT()
  const { publications } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    line: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    viewAll: isDark ? 'rgb(107, 114, 128)' : 'rgb(156, 163, 175)', // gray-500 : gray-400
  }

  const selectedPubs = useMemo(
    () => publications.filter((pub) => selectedPublicationIds.has(pub.id)),
    [publications],
  )

  if (selectedPubs.length === 0) return null

  return (
    <section className="py-6 w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <div className="bg-cyan-400 rounded-full flex-shrink-0 h-0.5 w-5" />
          <h3 className="text-base md:text-lg font-semibold">{t('about.selectedPublications')}</h3>
          <div className="flex-1 h-px" style={{ backgroundColor: tc.line }} />
        </div>
        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
          {selectedPubs.map((pub) => (
            <PublicationCard key={pub.id} pub={pub as unknown as Publication} />
          ))}
          <div className="pt-2 text-center">
            <a className="no-underline group" href="/publications">
              <div
                className="flex items-center justify-center gap-2 font-mono text-sm transition-all duration-150 group-hover:text-cyan-400"
                style={{ color: tc.viewAll }}
              >
                <span>{t('about.viewAllPublications')}</span>
                <span className="transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SelectedPublicationsSection
