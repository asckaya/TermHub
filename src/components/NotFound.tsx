import { Link, useRouter } from '@tanstack/react-router'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { cn } from '@/lib/utils'

import { MotionHover } from './animations/MotionList'

const TYPING_SPEED = 20
const LOG_SPEED = 15

const ASCII_404 = `
  _  _    ___   _  _
 | || |  / _ \\ | || |
 | || |_| | | || || |_
 |__   _| |_| ||__   _|
    |_|  \\___/    |_|
`

const NotFound: React.FC = () => {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)
  const { siteOwner } = useLocalizedData()
  const router = useRouter()

  const username = siteOwner.terminalUsername
  const prompt = `[${username}@portfolio ~]$`

  const [commandText, setCommandText] = useState('')
  const [showLogs, setShowLogs] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [showFinalResponse, setShowFinalResponse] = useState(false)
  const [cursorOn, setCursorOn] = useState(true)

  const command = t('notFound.command', 'curl -i https://404.com')

  const connectionLogs = useMemo(
    () => [
      '*   Trying 127.0.0.1:443...',
      '* Connected to 404.com (127.0.0.1) port 443 (#0)',
      '* ALPN: offers h2, http/1.1',
      '* TLSv1.3 handshake initiated...',
      '* SSL connection using TLSv1.3 / AEAD-CHACHA20-POLY1305',
      '> GET / HTTP/2',
      '> Host: 404.com',
      '> user-agent: ascka-client/1.0.0',
      '* HTTP/2 404 Not Found',
    ],
    [],
  )

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Stage 1: Type command
  useEffect(() => {
    if (commandText.length < command.length) {
      const timeout = setTimeout(() => {
        setCommandText(command.slice(0, commandText.length + 1))
      }, TYPING_SPEED)
      return () => clearTimeout(timeout)
    } else if (!showLogs) {
      const timeout = setTimeout(() => setShowLogs(true), 200)
      return () => clearTimeout(timeout)
    }
  }, [commandText, command, showLogs])

  // Stage 2: Show logs
  useEffect(() => {
    if (showLogs && logs.length < connectionLogs.length) {
      const timeout = setTimeout(
        () => {
          setLogs((prev) => [...prev, connectionLogs[prev.length]])
        },
        LOG_SPEED + Math.random() * 40,
      )
      return () => clearTimeout(timeout)
    } else if (showLogs && logs.length === connectionLogs.length && !showFinalResponse) {
      const timeout = setTimeout(() => setShowFinalResponse(true), 300)
      return () => clearTimeout(timeout)
    }
  }, [showLogs, logs, connectionLogs, showFinalResponse])

  const currentDate = useMemo(() => new Date().toUTCString(), [])

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] p-4 relative">
      {/* Background Glow */}
      <div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[120px] pointer-events-none -z-10"
        style={{
          backgroundColor: tc.highlight,
          opacity: isDark ? 0.15 : 0.05
        }}
      />

      <div className="flex flex-col gap-10 max-w-[640px] w-full items-center">
        <div
          className="w-full rounded-xl border font-mono text-xs md:text-sm overflow-hidden relative transition-shadow duration-300"
          style={{
            backgroundColor: tc.bg,
            borderColor: tc.border,
            boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.1)',
            animation: 'flicker 0.15s infinite alternate'
          }}
        >
          {/* CRT Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))',
              backgroundSize: '100% 3px, 2px 100%'
            }}
          />
          <div
            className="absolute left-0 -top-[100px] w-full h-[100px] pointer-events-none z-[11]"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(32, 255, 32, 0.02) 50%, transparent 100%)',
              animation: 'scanline 8s linear infinite'
            }}
          />

          {/* macOS-style title bar */}
          <div
            className="flex items-center px-4 py-2.5 border-b relative"
            style={{ backgroundColor: tc.header, borderColor: tc.border }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] flex-shrink-0" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e] flex-shrink-0" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#28c840] flex-shrink-0" />
            </div>
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs tracking-wide pointer-events-none whitespace-nowrap"
              style={{ color: tc.secondary }}
            >
              {username} — 404.sh
            </div>
          </div>

          {/* Terminal body */}
          <div className="px-4 md:px-6 py-4 md:py-5 leading-relaxed">
            <div className={cn("flex flex-wrap items-center gap-2", showLogs ? "mb-2" : "mb-0")}>
              <span style={{ color: tc.prompt }}>{prompt}</span>
              <span className="whitespace-pre" style={{ color: tc.text }}>{commandText}</span>
              {!showLogs && (
                <div
                  className="inline-block w-[0.58em] h-[1.15em] ml-0.5 rounded-[1px] transition-opacity duration-75"
                  style={{ 
                    backgroundColor: tc.text,
                    opacity: cursorOn ? 0.85 : 0
                  }}
                />
              )}
            </div>

            {showLogs && (
              <div className="mb-4">
                {logs.map((log, i) => (
                  <div key={i} className="text-xs" style={{ color: tc.muted }}>
                    {log}
                  </div>
                ))}
              </div>
            )}

            {showFinalResponse && (
              <div className="text-xs">
                <div className="animate-fade-in" style={{ color: tc.secondary, animationDelay: '0.05s' }}>
                  HTTP/1.1 404 Not Found
                </div>
                <div className="animate-fade-in" style={{ color: tc.secondary, animationDelay: '0.1s' }}>
                  {t('notFound.date', 'Date:')} {currentDate}
                </div>
                <div className="animate-fade-in" style={{ color: tc.secondary, animationDelay: '0.15s' }}>
                  {t('notFound.contentType', 'Content-Type: text/plain')}
                </div>
                <div className="h-4" />

                {/* ASCII Art 404 */}
                <div
                  className="whitespace-pre font-mono animate-fade-in"
                  style={{ color: tc.error, animationDelay: '0.3s' }}
                >
                  {ASCII_404}
                </div>

                <div className="h-4" />
                <div
                  className="font-bold animate-fade-in"
                  style={{ color: tc.error, animationDelay: '0.5s' }}
                >
                  {t('notFound.errorMessage', 'Error: 404 Page Not Found')}
                </div>
                <div
                  className="mt-2 animate-fade-in"
                  style={{ color: tc.muted, animationDelay: '0.7s' }}
                >
                  {t('notFound.description', 'The requested URL was not found on this server.')}
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <span style={{ color: tc.prompt }}>{prompt}</span>
                  <div
                    className="inline-block w-[0.58em] h-[1.15em] ml-0.5 rounded-[1px] transition-opacity duration-75"
                    style={{ 
                      backgroundColor: tc.text,
                      opacity: cursorOn ? 0.85 : 0
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div
          className={cn(
            "flex items-center gap-6 transition-opacity duration-500",
            showFinalResponse ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: '0.6s' }}
        >
          <MotionHover>
            <Link
              className="flex items-center gap-2 px-4 py-2 bg-transparent border rounded-md font-mono text-sm transition-all duration-200 hover:-translate-y-0.5 no-underline"
              style={{
                backgroundColor: tc.bg,
                borderColor: tc.border,
                color: tc.secondary,
              }}
              to="/"
            >
              <span className="font-bold" style={{ color: tc.prompt }}>~</span>
              <span>{t('notFound.returnHome', 'cd ~')}</span>
            </Link>
          </MotionHover>

          <MotionHover>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-transparent border rounded-md font-mono text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              onClick={() => router.history.back()}
              style={{
                backgroundColor: tc.bg,
                borderColor: tc.border,
                color: tc.secondary,
              }}
            >
              <span className="font-bold" style={{ color: tc.muted }}>←</span>
              <span>{t('notFound.goBack', 'history -1')}</span>
            </button>
          </MotionHover>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flicker {
          0% { opacity: 0.97; }
          5% { opacity: 0.95; }
          10% { opacity: 0.9; }
          15% { opacity: 0.95; }
          30% { opacity: 0.98; }
          45% { opacity: 0.93; }
          50% { opacity: 0.97; }
          65% { opacity: 0.94; }
          80% { opacity: 0.98; }
          100% { opacity: 0.99; }
        }
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease forwards;
          opacity: 0;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  )
}

export default NotFound
