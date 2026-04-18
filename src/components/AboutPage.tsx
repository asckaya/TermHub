import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/ui/badge'
import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { heroSocialIcons } from '@/site.config'
import { withBase } from '@/utils/asset'

import { MotionBox, MotionHover } from './animations/MotionList'
import DynamicIcon from './DynamicIcon'
import BioSection from './sections/BioSection'
import JourneySection from './sections/JourneySection'
import MentorshipSection from './sections/MentorshipSection'

/* ── Typewriter Terminal ──────────────────────────────────── */

const TYPING_SPEED = 65
const DELETING_SPEED = 32
const PAUSE_AFTER_TYPE = 2200
const PAUSE_AFTER_DELETE = 450

type TypePhase = 'deleting' | 'pausing' | 'typing' | 'waiting'

const TerminalTypewriter: React.FC = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)

  const { about, siteOwner } = useLocalizedData()
  const phrases = useMemo(() => siteOwner.rotatingSubtitles, [siteOwner.rotatingSubtitles])
  const username = siteOwner.terminalUsername
  const fullName = siteOwner.name.full

  const paragraphs = about.bio
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)

  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [phase, setPhase] = useState<TypePhase>('typing')

  // State machine
  useEffect(() => {
    if (!phrases.length) return
    const current = phrases[phraseIndex]

    if (phase === 'typing') {
      if (displayText.length < current.length) {
        const t = setTimeout(
          () => {
            setDisplayText(current.slice(0, displayText.length + 1))
          },
          TYPING_SPEED + Math.random() * 25,
        ) // slight jitter feels natural
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('pausing'), 80)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (displayText.length > 0) {
        const t = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
        }, DELETING_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % phrases.length)
          setPhase('typing')
        }, PAUSE_AFTER_DELETE)
        return () => clearTimeout(t)
      }
    }
  }, [displayText, phase, phraseIndex, phrases])

  const prompt = `[${username}@portfolio ~]$`

  // Static history lines shown above the animated line
  const historyLines: { cmd: string; output?: string; prompt: string }[] = [
    {
      cmd: 'whoami',
      output: fullName,
      prompt,
    },
  ]

  const fadeInStyle = (delay: number) => ({
    animation: `fadeIn 0.4s ease ${delay.toString()}s forwards`,
    opacity: 0,
  })

  return (
    <div
      className="font-mono overflow-hidden rounded-xl"
      style={{
        backgroundColor: tc.bg,
        border: `1px solid ${tc.border}`,
        boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.08)',
        fontSize: '0.875rem',
      }}
    >
      {/* macOS-style title bar */}
      <div
        className="relative flex items-center px-4 py-2.5"
        style={{
          backgroundColor: tc.header,
          borderBottom: `1px solid ${tc.border}`,
        }}
      >
        <div className="flex items-center gap-1.5">
          <div className="bg-[#ff5f57] rounded-full flex-shrink-0 h-[11px] w-[11px]" />
          <div className="bg-[#febc2e] rounded-full flex-shrink-0 h-[11px] w-[11px]" />
          <div className="bg-[#28c840] rounded-full flex-shrink-0 h-[11px] w-[11px]" />
        </div>
        <p
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-xs tracking-wide"
          style={{ color: tc.secondary }}
        >
          {username} — zsh
        </p>
      </div>

      {/* Terminal body */}
      <div className="leading-relaxed px-4 md:px-5 lg:px-6 py-4 md:py-5">
        {/* Login hint */}
        <p className="text-xs mb-4" style={{ color: tc.muted }}>
          Last login: {new Date().toDateString()} on ttys001
        </p>

        {/* Static history */}
        {historyLines.map((line, i) => (
          <div className="mb-3" key={i}>
            <div className="flex flex-wrap gap-2 items-center">
              <p className="flex-shrink-0" style={{ color: tc.prompt }}>
                {line.prompt}
              </p>
              <p style={{ color: tc.command }}>{line.cmd}</p>
            </div>
            {line.output && (
              <p className="mt-0.5" style={{ color: tc.text }}>
                {line.output}
              </p>
            )}
          </div>
        ))}

        {/* cat profile.md */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <p className="flex-shrink-0" style={{ color: tc.prompt }}>
              {prompt}
            </p>
            <p style={{ color: tc.command }}>cat</p>
            <p style={{ color: tc.param }}>profile.md</p>
          </div>

          <div className="text-xs pl-1">
            {/* Comment header — staggered */}
            <p
              className="font-semibold mb-0.5"
              style={{ ...fadeInStyle(0.05), color: tc.highlight }}
            >
              {'# ── '}
              {siteOwner.name.full}
              {' · M.S. Student @ NUAA ──────────────'}
            </p>
            {about.researchTitle && (
              <p className="mb-3" style={{ ...fadeInStyle(0.18), color: tc.secondary }}>
                {`# ${about.researchTitle}`}
              </p>
            )}

            {/* Bio paragraphs — each fades in with increasing delay */}
            <div className="flex flex-col gap-2">
              {paragraphs.map((para, i) => (
                <p
                  className="leading-relaxed"
                  key={i}
                  style={{ ...fadeInStyle(0.35 + i * 0.22), color: tc.text }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Live typewriter line */}
        <div>
          <div className="flex flex-wrap gap-2 items-center">
            <p className="flex-shrink-0" style={{ color: tc.prompt }}>
              {prompt}
            </p>
            <p style={{ color: tc.command }}>echo</p>
            <p style={{ color: tc.param }}>$INTRO</p>
          </div>

          {/* Output line with cursor */}
          <div className="flex items-center gap-0 min-h-[1.5em] mt-0.5">
            <p className="whitespace-pre" style={{ color: tc.text }}>
              {displayText}
            </p>
            {/* Block cursor */}
            <div
              className="inline-block rounded-[1px] h-[1.15em] ml-[1px] transition-opacity duration-75 w-[0.58em]"
              style={{
                backgroundColor: tc.text,
                opacity: 1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Profile Sidebar ──────────────────────────────────────── */

const ProfileSidebar: React.FC = () => {
  const { siteConfig, siteOwner } = useLocalizedData()
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    avatarBorder: isDark ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)', // gray-600 : gray-200
    bg: isDark ? 'rgb(31, 41, 55)' : 'white', // gray-800 : white
    border: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    divider: isDark ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)', // gray-700 : gray-100
    headerBg: isDark ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)', // gray-900 : gray-50
    heading: isDark ? 'rgb(243, 244, 246)' : 'rgb(31, 41, 55)', // gray-100 : gray-800
    skillIcon: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)', // gray-400 : gray-500
    tagBg: isDark ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)', // gray-700 : gray-100
    tagColor: isDark ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)', // gray-300 : gray-600
    text: isDark ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)', // gray-400 : gray-600
  }

  type SkillItem = string | { icon?: string; name: string }
  const skills = siteOwner.skills as SkillItem[]
  const getName = (s: SkillItem) => (typeof s === 'string' ? s : s.name)
  const getIcon = (s: SkillItem) => (typeof s === 'string' ? undefined : s.icon)

  return (
    <div
      className="overflow-hidden rounded-xl sticky top-20"
      style={{
        backgroundColor: tc.bg,
        border: `1px solid ${tc.border}`,
      }}
    >
      {/* Terminal title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          backgroundColor: tc.headerBg,
          borderBottom: `1px solid ${tc.border}`,
        }}
      >
        <div className="flex items-center gap-1.5">
          <div className="bg-red-400 rounded-full h-2.5 w-2.5" />
          <div className="bg-yellow-400 rounded-full h-2.5 w-2.5" />
          <div className="bg-green-400 rounded-full h-2.5 w-2.5" />
        </div>
        <p className="font-mono text-xs ml-2" style={{ color: tc.text }}>
          whoami
        </p>
      </div>

      <div className="flex flex-col">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-3 pb-4 pt-6 px-5">
          <MotionHover>
            <img
              alt={siteOwner.name.full}
              className="rounded-xl object-cover h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
              src={withBase(`images/${siteConfig.avatar}`)}
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
                  style={{ color: tc.text }}
                  target="_blank"
                >
                  {siteOwner.social.github.replace('https://github.com/', '@')}
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
                    className="no-underline"
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
              <p className="font-mono text-xs font-semibold tracking-wider uppercase" style={{ color: tc.heading }}>
                {t('about.skills', 'Skills')}
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
                  {getIcon(skill) && (
                    <DynamicIcon className="h-2.5 w-2.5" name={getIcon(skill)} style={{ color: tc.skillIcon }} />
                  )}
                  <p>{getName(skill)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Page Header ──────────────────────────────────────────── */

const PageHeader: React.FC = () => {
  const { t } = useTranslation()
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
        <h2 className="text-xl md:text-2xl font-bold">
          {t('nav.about', 'About')}
        </h2>
        <Badge className="font-mono text-[10px] px-2 bg-cyan-400/10 text-cyan-400 border-none" variant="secondary">
          {siteOwner.name.full}
        </Badge>
      </div>
      <p className="font-mono text-xs mt-1" style={{ color: tc.text }}>
        # {t('about.aboutDescription', 'Personal background, experience & skills')}
      </p>
    </div>
  )
}

/* ── About Page ───────────────────────────────────────────── */

const AboutPage: React.FC = () => {
  return (
    <div className="py-4 md:py-6 lg:py-8 w-full">
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-8">
        <PageHeader />

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] items-start gap-6 lg:gap-8 mt-6">
          {/* Sidebar */}
          <div>
            <MotionBox delay={0.1}>
              <ProfileSidebar />
            </MotionBox>
          </div>

          {/* Main content */}
          <div>
            <MotionBox delay={0.2}>
              <div className="flex flex-col gap-6 md:gap-7 lg:gap-8">
                {/* Typewriter terminal — self intro */}
                <TerminalTypewriter />

                {/* Bio */}
                <BioSection />
              </div>
            </MotionBox>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
