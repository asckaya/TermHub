import React, { useEffect, useMemo, useState } from 'react'

import { TerminalShell } from '@/components/ui/TerminalShell'
import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

const TYPING_SPEED = 65
const DELETING_SPEED = 32
const PAUSE_AFTER_TYPE = 2200
const PAUSE_AFTER_DELETE = 450

type TypePhase = 'deleting' | 'pausing' | 'typing' | 'waiting'

export const TerminalTypewriter: React.FC = () => {
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
    <TerminalShell
      bodyClassName="px-4 md:px-5 lg:px-6 py-4 md:py-5 leading-relaxed"
      className="font-mono text-sm"
      title={`${username} — zsh`}
    >
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
          <p className="font-semibold mb-0.5" style={{ ...fadeInStyle(0.05), color: tc.highlight }}>
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
          <div
            className="inline-block rounded-[1px] h-[1.15em] ml-[1px] transition-opacity duration-75 w-[0.58em]"
            style={{
              backgroundColor: tc.text,
              opacity: 1,
            }}
          />
        </div>
      </div>
    </TerminalShell>
  )
}
