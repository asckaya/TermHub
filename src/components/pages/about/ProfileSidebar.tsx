import React from 'react'

import { MotionHover } from '@/components/animations/MotionList'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { TerminalShell } from '@/components/ui/TerminalShell'
import { TerminalStatusBar } from '@/components/ui/TerminalStatusBar'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'
import { withBase } from '@/utils/asset'

export const ProfileSidebar: React.FC = () => {
  const { heroSocialIcons, siteConfig, siteOwner } = useLocalizedData()
  const { t } = useT()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    avatarBorder: isDark ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)',
    bg: isDark ? 'rgb(31, 41, 55)' : 'white',
    border: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
    divider: isDark ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)',
    headerBg: isDark ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)',
    heading: isDark ? 'rgb(243, 244, 246)' : 'rgb(31, 41, 55)',
    skillIcon: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
    tagBg: isDark ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)',
    tagColor: isDark ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)',
    text: isDark ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)',
  }

  type SkillItem = string | { icon?: string; name: string }
  const skills = siteOwner.skills as SkillItem[]
  const getName = (s: SkillItem) => (typeof s === 'string' ? s : s.name)
  const getIcon = (s: SkillItem) => (typeof s === 'string' ? undefined : s.icon)

  return (
    <TerminalShell
      bodyClassName="flex flex-col p-0"
      statusBar={<TerminalStatusBar compact />}
      title="whoami"
    >
      <div className="flex flex-col">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-3 pb-4 pt-6 px-5">
          <MotionHover>
            <img
              alt={siteOwner.name.full}
              className="rounded-xl object-cover h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
              src={withBase(
                siteConfig.avatar ? `images/${siteConfig.avatar}` : 'images/avatar.png',
              )}
              style={{ border: `2px solid ${tc.avatarBorder}` }}
            />
          </MotionHover>
          <div className="flex flex-col items-center gap-1">
            <div className="flex font-mono text-sm gap-1">
              <span className="text-yellow-400 font-bold">~</span>
              <span className="text-cyan-400 font-semibold">{siteOwner.name.full}</span>
            </div>
            <p className="text-xs leading-relaxed text-center" style={{ color: tc.text }}>
              {siteConfig.tagline}
            </p>
          </div>
        </div>

        <div className="h-px w-full" style={{ backgroundColor: tc.divider }} />

        {/* Meta info */}
        <div className="flex flex-col gap-2.5 px-5 py-4">
          {siteOwner.contact.location && (
            <div className="flex items-center gap-2.5">
              <DynamicIcon className="h-3 w-3 text-cyan-400" name="FaMapMarkerAlt" />
              <p className="font-mono text-xs" style={{ color: tc.text }}>
                {siteOwner.contact.location}
              </p>
            </div>
          )}
          {siteOwner.contact.email && (
            <div className="flex items-center gap-2.5">
              <DynamicIcon className="h-3 w-3 text-cyan-400" name="FaEnvelope" />
              <MotionHover>
                <a
                  className="font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap hover:text-cyan-400 no-underline"
                  href={`mailto:${siteOwner.contact.email}`}
                  style={{ color: tc.text }}
                >
                  {siteOwner.contact.email}
                </a>
              </MotionHover>
            </div>
          )}
          {siteOwner.social.github && (
            <div className="flex items-center gap-2.5">
              <DynamicIcon className="h-3 w-3 text-cyan-400" name="FaGithub" />
              <MotionHover>
                <a
                  className="font-mono text-xs hover:text-cyan-400 no-underline"
                  href={siteOwner.social.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @{siteOwner.social.github.split('/').pop()}
                </a>
              </MotionHover>
            </div>
          )}
        </div>

        <div className="h-px w-full" style={{ backgroundColor: tc.divider }} />

        {/* Social links */}
        {heroSocialIcons.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2 px-5 py-3">
              {heroSocialIcons.map((item) => (
                <MotionHover key={item.label}>
                  <a
                    className="no-underline hover:no-underline group"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div
                      className="flex items-center rounded-md border transition-all duration-200 font-mono text-xs gap-1.5 px-2.5 py-1.5 hover:-translate-y-0.5"
                      style={{
                        borderColor: tc.border,
                        color: tc.text,
                      }}
                    >
                      <DynamicIcon className="h-3 w-3" name={item.icon} />
                      <p>{item.label}</p>
                    </div>
                  </a>
                </MotionHover>
              ))}
            </div>
            <div className="h-px w-full" style={{ backgroundColor: tc.divider }} />
          </>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-cyan-400 rounded-full h-0.5 w-3" />
              <p
                className="font-mono text-xs font-semibold tracking-wider uppercase"
                style={{ color: tc.heading }}
              >
                {t('about.skills')}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <div
                  className="flex items-center rounded-sm font-mono text-[10px] gap-1 px-2 py-0.5"
                  key={getName(skill)}
                  style={{
                    backgroundColor: tc.tagBg,
                    color: tc.tagColor,
                  }}
                >
                  {(() => {
                    const iconName = getIcon(skill)
                    if (!iconName) return null
                    return (
                      <DynamicIcon
                        className="h-2.5 w-2.5"
                        name={iconName}
                        style={{ color: tc.skillIcon }}
                      />
                    )
                  })()}
                  <p>{getName(skill)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </TerminalShell>
  )
}
