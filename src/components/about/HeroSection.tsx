import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { cn } from '@/lib/utils'
import { heroSocialIcons } from '@/site.config'
import { withBase } from '@/utils/asset'

import DynamicIcon from '../DynamicIcon'

const MotionBox = motion.div
const MotionText = motion.p
const MotionSpan = motion.span

interface EducationItem {
  course: string
  institution: string
  year: string
}

// Hero Section Component
interface HeroSectionProps {
  avatar: string
  education?: EducationItem[]
  educationLogos?: Record<string, string>
  research?: ResearchItem[]
  researchLogos?: Record<string, string>
}

interface ResearchItem {
  advisor?: string
  emoji: string
  focus: string
  lab: string
  link: string
}

const HeroSection = ({
  avatar,
  education = [],
  educationLogos = {},
  research = [],
  researchLogos = {},
}: HeroSectionProps) => {
  const { t } = useTranslation()
  const { siteConfig, siteOwner } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)

  const [tick, setTick] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => (t + 1) % 1000)
    }, 200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="py-4 md:py-6 lg:py-8 w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <div
          className="rounded-xl font-mono overflow-hidden w-full shadow-2xl transition-shadow duration-300 border"
          style={{
            backgroundColor: tc.bg,
            borderColor: tc.border,
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.08)',
          }}
        >
          {/* macOS-style Title Bar */}
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
              className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-[10px] md:text-xs tracking-wide font-bold"
              style={{ color: tc.secondary }}
            >
              {siteOwner.terminalUsername} — zsh — 80x24
            </p>
          </div>

          {/* RGB light bar */}
          <div className="flex h-[2px] overflow-hidden w-full">
            {Array.from({ length: 24 }, (_, i) => {
              const colorIdx = (i + tick) % terminalPalette.rainbow.length
              return (
                <div
                  className="flex-1 h-full"
                  key={i}
                  style={{
                    backgroundColor: terminalPalette.rainbow[colorIdx],
                    opacity: 0.5,
                  }}
                />
              )
            })}
          </div>

          {/* Terminal Body */}
          <div className="p-4 md:p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
              <div className="flex flex-col items-center lg:items-start flex-1 gap-4 w-full">
                <MotionText
                  animate={{ opacity: 1 }}
                  className={cn(
                    'flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start',
                    'text-xl md:text-2xl lg:text-4xl font-bold leading-tight mb-2 text-foreground w-full',
                    'text-center lg:text-left',
                  )}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <MotionSpan
                    animate={{ opacity: 1 }}
                    className="text-yellow-400 mr-2"
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    $
                  </MotionSpan>
                  <MotionSpan
                    animate={{ width: 'auto' }}
                    className="inline-block overflow-hidden whitespace-nowrap mr-2"
                    initial={{ width: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {t('hero.greeting')}
                  </MotionSpan>
                  <MotionSpan
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1 font-mono text-cyan-400"
                    initial={{ opacity: 0 }}
                    transition={{ delay: 0.6, duration: 0.2 }}
                  >
                    <MotionSpan
                      animate={{ width: 'auto' }}
                      className="inline-block overflow-hidden whitespace-nowrap"
                      initial={{ width: 0 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      {siteOwner.name.display}
                    </MotionSpan>
                  </MotionSpan>
                </MotionText>

                <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2 mb-4 w-full font-mono">
                  <p className="text-yellow-400 text-sm md:text-base">$</p>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {t('hero.sometimesI')}
                  </p>
                  <div className="h-[20px] md:h-[24px] lg:h-[30px] overflow-hidden">
                    <MotionBox
                      animate={{ y: [0, -20, -40, -60, -80, -100, 0] }}
                      transition={{
                        duration: 8,
                        ease: 'linear',
                        repeat: Infinity,
                        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
                      }}
                    >
                      {siteOwner.rotatingSubtitles.map((text, index) => (
                        <p
                          className="text-cyan-400 font-bold h-[20px] md:h-[24px] lg:h-[30px] text-sm md:text-base"
                          key={index}
                        >
                          {text}
                        </p>
                      ))}
                    </MotionBox>
                  </div>
                  <span className="inline-block w-2 h-5 bg-cyan-400 animate-blink ml-1" />
                </div>

                <div className="border-t border-dashed border-border/50 w-full my-2" />

                {/* Research & Education compact section */}
                {(research.length > 0 || education.length > 0) && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-2">
                    {research.length > 0 && (
                      <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-xs">#</span>
                          <h2 className="text-muted-foreground tracking-widest uppercase font-bold text-[10px] md:text-xs">
                            Current Research
                          </h2>
                        </div>
                        {research.map((item, index) => {
                          const logo = researchLogos[item.lab]
                          return (
                            <a
                              className="w-full no-underline hover:no-underline group"
                              href={item.link}
                              key={index}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <div className="flex flex-row items-center bg-secondary/10 group-hover:bg-secondary/30 rounded-lg gap-3 p-3 transition-all duration-200 border border-transparent hover:border-cyan-400/30">
                                {logo ? (
                                  <img
                                    alt={item.lab}
                                    className="rounded-md flex-shrink-0 h-8 w-8 object-contain bg-white/5 p-1"
                                    src={logo}
                                  />
                                ) : (
                                  <div className="flex items-center justify-center bg-accent rounded-md flex-shrink-0 h-8 w-8 text-lg">
                                    {item.emoji}
                                  </div>
                                )}
                                <div className="flex flex-col items-start flex-1 gap-0.5">
                                  <p className="text-foreground text-xs md:text-sm font-bold leading-tight group-hover:text-cyan-400 transition-colors">
                                    {item.lab}
                                  </p>
                                  <p className="text-muted-foreground text-[10px] md:text-xs leading-tight opacity-70">
                                    {item.advisor ? `w/ ${item.advisor}` : item.focus}
                                  </p>
                                </div>
                              </div>
                            </a>
                          )
                        })}
                      </div>
                    )}
                    {education.length > 0 && (
                      <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-xs">#</span>
                          <h2 className="text-muted-foreground tracking-widest uppercase font-bold text-[10px] md:text-xs">
                            Education
                          </h2>
                        </div>
                        {education.map((item, index) => {
                          const logo = educationLogos[item.institution]
                          return (
                            <div
                              className="flex flex-row items-center bg-secondary/5 rounded-lg gap-3 p-3 w-full border border-border/20"
                              key={index}
                            >
                              {logo ? (
                                <img
                                  alt={item.institution}
                                  className="rounded-md flex-shrink-0 h-8 w-8 object-contain bg-white/5 p-1"
                                  src={logo}
                                />
                              ) : (
                                <div className="flex items-center justify-center bg-accent rounded-md flex-shrink-0 h-8 w-8">
                                  <span className="text-primary font-bold text-base">
                                    {item.institution.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div className="flex flex-col items-start flex-1 gap-0.5">
                                <p className="text-foreground text-xs md:text-sm font-bold leading-tight">
                                  {item.course}
                                </p>
                                <p className="text-muted-foreground text-[10px] md:text-xs leading-tight opacity-70">
                                  {item.institution} · {item.year}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t border-dashed border-border/50 w-full my-4" />

                {/* Welcome + contact */}
                <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="text-cyan-400 font-bold text-xs mt-0.5">{'>'}</span>
                    <p className="text-muted-foreground text-[11px] md:text-xs italic leading-relaxed text-center lg:text-left opacity-80">
                      {siteConfig.tagline}
                    </p>
                  </div>
                  <div className="flex flex-row flex-shrink-0 gap-4 items-center">
                    <a
                      className="no-underline hover:no-underline group"
                      href={`mailto:${siteOwner.contact.academicEmail}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex flex-row items-center group-hover:text-cyan-400 text-muted-foreground gap-2 transition-all duration-150">
                        <DynamicIcon className="h-4 w-4" name="FaEnvelope" />
                        <span className="font-mono text-xs font-bold">email</span>
                      </div>
                    </a>
                    <span className="text-muted-foreground opacity-20">|</span>
                    <a
                      className="no-underline hover:no-underline group"
                      href={siteOwner.social.linkedin}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex flex-row items-center group-hover:text-cyan-400 text-muted-foreground gap-2 transition-all duration-150">
                        <DynamicIcon className="h-4 w-4" name="FaLinkedin" />
                        <span className="font-mono text-xs font-bold">linkedin</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <MotionBox
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative group">
                    {/* Animated glow behind avatar */}
                    <div
                      className="absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    />
                    <img
                      alt={siteOwner.name.display}
                      className="relative rounded-2xl h-[160px] w-[160px] md:h-[200px] md:w-[200px] lg:h-[260px] lg:w-[260px] object-cover border-2 border-border shadow-inner"
                      src={withBase(`images/${avatar}`)}
                    />
                  </div>
                </MotionBox>

                {/* Social icons row below avatar */}
                <div className="flex flex-row items-center gap-2 justify-center">
                  {heroSocialIcons.map((item) => (
                    <a
                      className="no-underline hover:no-underline"
                      href={item.href}
                      key={item.label}
                      rel="noopener noreferrer"
                      target="_blank"
                      title={item.label}
                    >
                      <div className="text-muted-foreground hover:text-cyan-400 hover:scale-110 cursor-pointer p-2 rounded-full hover:bg-secondary/20 transition-all duration-200">
                        <DynamicIcon className="h-4 w-4 md:h-5 md:w-5" name={item.icon} />
                      </div>
                    </a>
                  ))}
                </div>

                {(siteConfig.pets as { emoji: string; image: string; name: string }[]).length >
                  0 && (
                  <div className="flex flex-row items-center gap-6 justify-center mt-2">
                    {(siteConfig.pets as { emoji: string; image: string; name: string }[]).map(
                      (pet) => (
                        <div
                          className="flex flex-col items-center gap-2 group cursor-help"
                          key={pet.name}
                        >
                          {pet.image && (
                            <img
                              alt={pet.name}
                              className="rounded-full h-12 w-12 md:h-14 md:w-14 object-cover border-2 border-border/50 group-hover:border-cyan-400/50 transition-colors"
                              src={pet.image}
                            />
                          )}
                          <p className="text-xs font-mono font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                            {pet.name} {pet.emoji}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div
            className="px-4 py-1.5 text-[9px] md:text-[10px] font-mono border-t flex items-center justify-between"
            style={{
              backgroundColor: tc.touchBar,
              borderColor: tc.border,
              color: tc.secondary,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="text-green-400">●</span> System Online
              </span>
              <span className="opacity-40">|</span>
              <span>Load: 0.24, 0.31, 0.28</span>
            </div>
            <div className="flex items-center gap-3">
              <span>UTF-8</span>
              <span className="opacity-40">|</span>
              <span className="text-cyan-400">main*</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
