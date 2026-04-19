import { useQuery } from '@tanstack/react-query'
import { m } from 'framer-motion'
import { memo } from 'react'

import DynamicIcon from '@/components/ui/DynamicIcon'
import { TerminalShell } from '@/components/ui/TerminalShell'
import {
  CommandPrompt,
  StatusGroup,
  StatusSegment,
  StatusSeparator,
  TerminalDivider,
  TerminalSectionTitle,
} from '@/components/ui/TerminalSyntax'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { cn } from '@/lib/utils'
import * as messages from '@/paraglide/messages'
import { withBase } from '@/utils/asset'

const MotionBox = m.div
const MotionText = m.p
const MotionSpan = m.span

interface EducationItem {
  course: string
  institution: string
  year: string
}

interface GitHubUser {
  followers: number
  public_repos: number
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

const HeroSection = memo(
  ({
    avatar,
    education = [],
    educationLogos = {},
    research = [],
    researchLogos = {},
  }: HeroSectionProps) => {
    const { heroSocialIcons, siteConfig, siteOwner } = useLocalizedData()

    // Example of TanStack Query: Fetching GitHub info
    const { data: githubData } = useQuery<GitHubUser | null>({
      queryFn: async () => {
        const username = siteOwner.social.github.split('/').pop()
        if (!username) return null
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (!res.ok) throw new Error('GitHub fetch failed')
        return res.json() as Promise<GitHubUser>
      },
      queryKey: ['github-profile', siteOwner.social.github],
      staleTime: 1000 * 60 * 5,
    })

    return (
      <div className="py-4 md:py-6 lg:py-8 w-full">
        <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
          <TerminalShell
            bodyClassName="p-4 md:p-6 lg:p-8"
            rainbowHeight="4px"
            rainbowOpacity={0.8}
            showRainbow
            statusBar={
              <>
                <StatusGroup>
                  <StatusSegment dotColor="text-green-400" value="System Online" />
                  <StatusSeparator />
                  <StatusSegment
                    label="Github:"
                    value={
                      githubData
                        ? `${githubData.public_repos.toString()} repos · ${githubData.followers.toString()} followers`
                        : 'loading...'
                    }
                  />
                </StatusGroup>
                <StatusGroup>
                  <StatusSegment value="UTF-8" />
                  <StatusSeparator />
                  <StatusSegment value="main*" valueClassName="text-cyan-400" />
                </StatusGroup>
              </>
            }
            title={`${siteOwner.terminalUsername}@${siteOwner.terminalHostname} — zsh — 80x24`}
          >
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
                  <CommandPrompt className="md:text-2xl lg:text-4xl" />
                  <MotionSpan
                    animate={{ width: 'auto' }}
                    className="inline-block overflow-hidden whitespace-nowrap mr-2"
                    initial={{ width: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {messages.hero_greeting()}
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
                  <CommandPrompt className="text-sm md:text-base" />
                  <p className="text-muted-foreground text-sm md:text-base">
                    {messages.hero_sometimesI()}
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

                <TerminalDivider className="my-2" />

                {/* Research & Education compact section */}
                {(research.length > 0 || education.length > 0) && (
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full mt-2">
                    {research.length > 0 && (
                      <div className="flex flex-col items-start gap-3 flex-1">
                        <TerminalSectionTitle>Current Research</TerminalSectionTitle>
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
                      <div className="flex flex-col items-start gap-3 flex-1">
                        <TerminalSectionTitle>Education</TerminalSectionTitle>
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

                <TerminalDivider />

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
                      href={`mailto:${siteOwner.contact.academicEmail ?? ''}`}
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
                  {(
                    heroSocialIcons as {
                      color?: string
                      href: string
                      icon: string
                      label: string
                    }[]
                  ).map((item) => (
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
              </div>
            </div>
          </TerminalShell>
        </div>
      </div>
    )
  },
)

HeroSection.displayName = 'HeroSection'

export default HeroSection
