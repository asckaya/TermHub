import { Link, useParams } from '@tanstack/react-router'
import { Calendar, ChevronLeft, Folder, Tag } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { TerminalEntrance } from '@/components/animations/TerminalEntrance'
import { Badge } from '@/components/ui/badge'
import { TerminalShell } from '@/components/ui/TerminalShell'
import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'

const fmtDate = (v?: string) => {
  if (!v) return ''
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const PostPage: React.FC = () => {
  const { postId } = useParams({ from: '/articles/$postId' })
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { t } = useT()
  const { articles, siteOwner } = useLocalizedData()
  const [currentTime, setCurrentTime] = useState(new Date())

  const post = articles.find((a) => a.slug === postId)

  const { articleCategoryColors: categoryColors, terminalPalette } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  })

  if (!post) {
    return (
      <div
        className="min-h-screen py-8 w-full transition-colors duration-300 flex items-center justify-center"
        style={{ backgroundColor: isDark ? '#111827' : '#f9fafb' }}
      >
        <div className="max-w-md w-full px-4">
          <TerminalShell
            headerRight={formattedTime}
            title="404 Not Found"
          >
            <div className="p-6 text-center">
              <h1 className="text-xl font-mono font-bold mb-2" style={{ color: tc.highlight }}>
                err: post_not_found
              </h1>
              <p className="text-xs font-mono mb-6" style={{ color: tc.secondary }}>
                The specified article does not exist or is not available.
              </p>
              <Link
                className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs border rounded-md transition-all duration-150 no-underline"
                style={{ borderColor: tc.border, color: tc.command }}
                to="/"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>cd ..</span>
              </Link>
            </div>
          </TerminalShell>
        </div>
      </div>
    )
  }

  const ct = categoryColors[post.category]
  const PostContent = post.Content

  return (
    <div
      className="min-h-screen py-8 w-full transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#111827' : '#f9fafb' }}
    >
      <div className="flex flex-col gap-6 max-w-4xl mx-auto px-2 md:px-4">
        <TerminalEntrance path={`post/${postId}`}>
          <div className="mb-4">
            <Link
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs border rounded-md transition-all duration-150 no-underline"
              style={{
                backgroundColor: tc.bg,
                borderColor: tc.border,
                color: tc.command,
              }}
              to="/articles"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>cd ../articles</span>
            </Link>
          </div>

          <TerminalShell
            bodyClassName="p-6 md:p-8"
            headerRight={formattedTime}
            title={`cat articles/${postId}.md`}
            touchBar={
              <div className="flex items-center gap-2 text-xs font-mono" style={{ color: tc.secondary }}>
                <span className="font-bold" style={{ color: tc.prompt }}>
                  {siteOwner.terminalUsername}
                </span>
                <span>/articles/{postId}.md</span>
              </div>
            }
          >
            <article className="prose dark:prose-invert max-w-none font-mono">
              {/* Header Info */}
              <div className="border-b border-dashed pb-6 mb-6" style={{ borderColor: tc.border }}>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-4" style={{ color: tc.text }}>
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono" style={{ color: tc.secondary }}>
                  {post.date && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" style={{ color: tc.highlight }} />
                      <span>{fmtDate(post.date)}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5" style={{ color: tc.command }} />
                    <span
                      className="px-1.5 py-0.5 rounded-sm text-[10px] font-bold uppercase"
                      style={{
                        backgroundColor: ct.bg(isDark),
                        color: ct.fg(isDark),
                      }}
                    >
                      {t(`categoryLabel.${post.category}`)}
                    </span>
                  </div>

                  {post.tags.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" style={{ color: tc.info }} />
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Badge
                            className="text-[10px] py-0 px-1 border-none font-normal"
                            key={tag}
                            style={{
                              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                              color: tc.secondary,
                            }}
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* MDX Body Content */}
              <div className="text-sm md:text-base leading-relaxed break-words font-sans prose dark:prose-invert">
                {PostContent ? (
                  <PostContent />
                ) : (
                  <p className="italic opacity-80">{post.summary}</p>
                )}
              </div>
            </article>
          </TerminalShell>
        </TerminalEntrance>
      </div>
    </div>
  )
}
