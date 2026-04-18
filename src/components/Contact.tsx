import { useTranslation } from 'react-i18next'

import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

import { MotionBox, MotionHover, MotionList } from './animations/MotionList'

const Contact = () => {
  const { t } = useTranslation()
  const { githubUsername, siteOwner } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)

  const contactLinks = [
    {
      display: siteOwner.contact.email,
      href: `mailto:${siteOwner.contact.email}`,
      label: t('contact.email'),
      value: siteOwner.contact.email,
    },
    {
      display: `@${siteOwner.social.linkedin.split('/').filter(Boolean).pop() ?? ''}`,
      href: siteOwner.social.linkedin,
      label: t('contact.linkedin'),
      value: siteOwner.social.linkedin,
    },
    {
      display: `@${githubUsername}`,
      href: siteOwner.social.github,
      label: t('contact.github'),
      value: siteOwner.social.github,
    },
    {
      display: `@${siteOwner.social.medium.split('@').pop() ?? ''}`,
      href: siteOwner.social.medium,
      label: t('contact.medium'),
      value: siteOwner.social.medium,
    },
    {
      display: t('contact.viewProfile'),
      href: siteOwner.social.googleScholar,
      label: t('contact.googleScholar'),
      value: siteOwner.social.googleScholar,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 items-stretch">
        <MotionBox delay={0.1}>
          <h1 className="text-3xl font-bold mb-6">
            {t('contact.title')}
          </h1>
          <div className="flex items-center gap-2 mb-4" style={{ color: tc.secondary }}>
            <i className="fa-solid fa-clock text-sm" />
            <span className="text-sm">{t('contact.responseTime')}</span>
          </div>

          <MotionBox delay={0.2}>
            <pre
              className="font-mono text-sm mb-6 p-4 rounded-md border shadow-inner overflow-x-auto"
              style={{ 
                backgroundColor: tc.header,
                borderColor: tc.border,
                color: tc.text
              }}
            >
              {`# ${t('contact.contactInfo')}
EMAIL    = "${siteOwner.contact.email}"
LINKEDIN = "${siteOwner.social.linkedin}"
GITHUB   = "${siteOwner.social.github}"
LOCATION = "${siteOwner.contact.location}"`}
            </pre>
          </MotionBox>

          <MotionBox delay={0.3}>
            <div
              className="rounded-md border shadow-lg mt-8 p-6"
              style={{ 
                backgroundColor: tc.bg,
                borderColor: tc.border
              }}
            >
              <h2
                className="font-mono text-sm font-bold tracking-widest mb-6"
                style={{ color: tc.highlight }}
              >
                // {t('contact.quickLinks').toUpperCase()}
              </h2>

              <MotionList staggerDelay={0.1}>
                {contactLinks.map((link) => (
                  <MotionBox key={link.label}>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <span
                        className="font-mono text-sm font-bold w-[120px]"
                        style={{ color: tc.prompt }}
                      >
                        {link.label}:
                      </span>
                      <MotionHover>
                        <div className="flex-1">
                          <a
                            className="font-mono text-[0.9rem] no-underline transition-all duration-200 border-b border-transparent hover:border-current"
                            href={link.href}
                            rel="noopener noreferrer"
                            style={{
                              color: tc.command
                            }}
                            target="_blank"
                          >
                            {link.display}
                          </a>
                        </div>
                      </MotionHover>
                    </div>
                  </MotionBox>
                ))}
              </MotionList>
            </div>
          </MotionBox>
        </MotionBox>
      </div>
    </div>
  )
}

export default Contact
