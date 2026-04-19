import React from 'react'
import { useTranslation } from 'react-i18next'

import DynamicIcon from '@/components/ui/DynamicIcon'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

const ContactSection: React.FC = () => {
  const { t } = useTranslation()
  const { siteOwner } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    line: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    link: isDark ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)', // gray-200 : gray-700
    text: isDark ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)', // gray-400 : gray-600
  }

  const items = [
    siteOwner.contact.email && {
      href: `mailto:${siteOwner.contact.email}`,
      icon: 'FaEnvelope',
      label: t('contact.email', 'Email'),
      value: siteOwner.contact.email,
    },
    siteOwner.contact.academicEmail && {
      href: `mailto:${siteOwner.contact.academicEmail}`,
      icon: 'FaGraduationCap',
      label: t('contact.academicEmail', 'Academic'),
      value: siteOwner.contact.academicEmail,
    },
    siteOwner.contact.location && {
      icon: 'FaMapMarkerAlt',
      label: t('contact.location', 'Location'),
      value: siteOwner.contact.location,
    },
    siteOwner.social.github && {
      href: siteOwner.social.github,
      icon: 'FaGithub',
      label: 'GitHub',
      value: siteOwner.social.github,
    },
    siteOwner.social.linkedin && {
      href: siteOwner.social.linkedin,
      icon: 'FaLinkedin',
      label: 'LinkedIn',
      value: 'LinkedIn',
    },
    siteOwner.social.googleScholar && {
      href: siteOwner.social.googleScholar,
      icon: 'SiGooglescholar',
      label: 'Scholar',
      value: 'Google Scholar',
    },
  ].filter(Boolean) as { href?: string; icon: string; label: string; value: string }[]

  if (items.length === 0) return null

  return (
    <section className="w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-400 rounded-full flex-shrink-0 h-0.5 w-5" />
          <h3 className="text-base md:text-lg font-semibold">{t('about.contact', 'Contact')}</h3>
          <div className="flex-1 h-px" style={{ backgroundColor: tc.line }} />
        </div>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div className="flex items-center gap-3" key={item.label}>
              <DynamicIcon
                className="h-3.5 w-3.5"
                name={item.icon}
                style={{ color: 'rgb(34, 211, 238)' }} // cyan-400
              />
              <span className="text-xs min-w-[60px]" style={{ color: tc.text }}>
                {item.label}
              </span>
              {item.href ? (
                <a
                  className="font-mono text-xs no-underline transition-colors hover:text-cyan-400"
                  href={item.href}
                  rel="noopener noreferrer"
                  style={{ color: tc.link }}
                  target="_blank"
                >
                  {item.value}
                </a>
              ) : (
                <span className="font-mono text-xs" style={{ color: tc.link }}>
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
