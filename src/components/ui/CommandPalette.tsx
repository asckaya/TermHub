import { Link, useNavigate } from '@tanstack/react-router'
import { Command } from 'cmdk'
import {
  BookOpen,
  Briefcase,
  FileText,
  FolderCode,
  Home,
  Languages,
  Moon,
  Palette,
  Sun,
  Terminal,
  User,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

import type { ThemeKey } from '@/themes/registry'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useColorMode } from '@/hooks/useColorMode'
import { useLanguage } from '@/hooks/useLanguage'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'
import { useThemeContext } from '@/themes/hooks'
import { themes } from '@/themes/registry'

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [history, setHistory] = useState<{ cmd: string; content: React.ReactNode; type: 'cmd' | 'error' | 'output' }[]>([])
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const { locale, setLocale } = useLanguage()
  const { activeTheme, setTheme } = useThemeContext()
  const { articles, siteOwner } = useLocalizedData()
  const { t } = useT()

  const [terminalMode, setTerminalMode] = useState(false)
  const logEndRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    setSearch('')
    command()
  }

  const handleShellCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim()
    if (!trimmed) return

    const args = trimmed.split(/\s+/)
    const baseCmd = args[0].toLowerCase()

    // Add command itself to history
    const cmdLine = `${siteOwner.terminalUsername}@${siteOwner.terminalHostname}:~$ ${trimmed}`
    
    if (baseCmd === 'clear') {
      setHistory([])
      setSearch('')
      return
    }

    if (baseCmd === 'exit') {
      setOpen(false)
      setSearch('')
      return
    }

    if (baseCmd === 'help') {
      setHistory((prev) => [
        ...prev,
        { cmd: trimmed, content: cmdLine, type: 'cmd' },
        {
          cmd: trimmed,
          content: (
            <div className="text-[var(--secondary-text)] leading-loose select-none">
              <div><span className="text-[var(--accent-color)] font-bold">ls</span> - list all site sections/pages</div>
              <div><span className="text-[var(--accent-color)] font-bold">cd &lt;page&gt;</span> - navigate to page (e.g. <span className="text-[var(--text-color)]">cd projects</span>, <span className="text-[var(--text-color)]">cd articles</span>)</div>
              <div><span className="text-[var(--accent-color)] font-bold">find &lt;keyword&gt;</span> - search articles by title, tags or summary</div>
              <div><span className="text-[var(--accent-color)] font-bold">theme &lt;name&gt;</span> - change theme (e.g. <span className="text-[var(--text-color)]">theme dracula</span>, <span className="text-[var(--text-color)]">theme catppuccin</span>)</div>
              <div><span className="text-[var(--accent-color)] font-bold">neofetch</span> - show cute system & author info card</div>
              <div><span className="text-[var(--accent-color)] font-bold">clear</span> - clear search / command input</div>
              <div><span className="text-[var(--accent-color)] font-bold">exit</span> - close command palette</div>
            </div>
          ),
          type: 'output'
        }
      ])
      setSearch('')
      return
    }

    if (baseCmd === 'find') {
      const keyword = args.slice(1).join(' ').toLowerCase().trim()
      if (!keyword) {
        setHistory((prev) => [
          ...prev,
          { cmd: trimmed, content: cmdLine, type: 'cmd' },
          {
            cmd: trimmed,
            content: <div className="text-yellow-500 font-bold">Usage: find &lt;keyword&gt; (e.g. find react)</div>,
            type: 'error'
          }
        ])
        setSearch('')
        return
      }

      const matches = (articles as { category: string; description?: string; slug: string; summary?: string; tags: string[]; title: string }[]).filter(
        (art) =>
          art.title.toLowerCase().includes(keyword) ||
          (art.description ?? '').toLowerCase().includes(keyword) ||
          (art.summary ?? '').toLowerCase().includes(keyword) ||
          art.tags.some((t) => t.toLowerCase().includes(keyword))
      )

      setHistory((prev) => [
        ...prev,
        { cmd: trimmed, content: cmdLine, type: 'cmd' },
        {
          cmd: trimmed,
          content: (
            <div className="flex flex-col gap-2">
              {matches.length === 0 ? (
                <div className="text-[var(--secondary-text)]">No articles found matching "{keyword}".</div>
              ) : (
                <>
                  <div className="text-[var(--accent-color)] font-bold">Found {matches.length} matching article(s):</div>
                  <div className="flex flex-col gap-1.5 pl-2">
                    {matches.map((art) => (
                      <div className="flex items-center gap-2" key={art.slug}>
                        <span className="text-[var(--secondary-text)]">-</span>
                        <Link
                          className="text-[var(--text-color)] hover:text-[var(--accent-color)] underline cursor-pointer"
                          onClick={() => setOpen(false)}
                          params={{ postId: art.slug }}
                          to="/articles/$postId"
                        >
                          {art.title}
                        </Link>
                        <span className="text-[10px] opacity-55">({art.category})</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ),
          type: 'output'
        }
      ])
      setSearch('')
      return
    }

    if (baseCmd === 'ls') {
      setHistory((prev) => [
        ...prev,
        { cmd: trimmed, content: cmdLine, type: 'cmd' },
        {
          cmd: trimmed,
          content: (
            <div className="flex gap-4 select-none">
              <span className="text-[var(--accent-color)] font-bold">home/</span>
              <span className="text-[var(--accent-color)] font-bold">projects/</span>
              <span className="text-[var(--accent-color)] font-bold">publications/</span>
              <span className="text-[var(--accent-color)] font-bold">experience/</span>
              <span className="text-[var(--accent-color)] font-bold">articles/</span>
              <span className="text-[var(--accent-color)] font-bold">about/</span>
            </div>
          ),
          type: 'output'
        }
      ])
      setSearch('')
      return
    }

    if (baseCmd === 'neofetch') {
      setHistory((prev) => [
        ...prev,
        { cmd: trimmed, content: cmdLine, type: 'cmd' },
        {
          cmd: trimmed,
          content: (
            <div className="leading-relaxed flex gap-6 select-none animate-in fade-in zoom-in duration-200">
              <div className="text-[var(--accent-color)] font-bold whitespace-pre">
{`   /\\_/\\
  ( o.o )
   > ^ <
  /     \\
 |       |
  \\__/\\_/`}
              </div>
              <div>
                <div className="font-bold text-[var(--accent-color)]">{siteOwner.terminalUsername}@{siteOwner.terminalHostname}</div>
                <div className="opacity-50">-------------------------</div>
                <div><span className="text-[var(--secondary-text)]">OS:</span> TermHub OS v1.0.0</div>
                <div><span className="text-[var(--secondary-text)]">Host:</span> React 19 + Vite 8</div>
                <div><span className="text-[var(--secondary-text)]">Router:</span> TanStack Router</div>
                <div><span className="text-[var(--secondary-text)]">Theme:</span> {activeTheme.name}</div>
                <div><span className="text-[var(--secondary-text)]">Locale:</span> {locale === 'zh' ? 'zh-CN (Chinese)' : 'en-US (English)'}</div>
                <div><span className="text-[var(--secondary-text)]">Time:</span> {new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          ),
          type: 'output'
        }
      ])
      setSearch('')
      return
    }

    if (baseCmd === 'cd') {
      const target = (args[1] ?? '').toLowerCase().replace(/^\/+|\/+$/g, '')
      if (target === '~' || target === 'home' || target === '') {
        setOpen(false)
        setSearch('')
        void navigate({ to: '/' })
      } else if (['about', 'articles', 'experience', 'projects', 'publications'].includes(target)) {
        setOpen(false)
        setSearch('')
        void navigate({ to: `/${target}` })
      } else {
        setHistory((prev) => [
          ...prev,
          { cmd: trimmed, content: cmdLine, type: 'cmd' },
          {
            cmd: trimmed,
            content: <div className="text-red-500 font-bold">cd: no such file or directory: {args[1] || ''}</div>,
            type: 'error'
          }
        ])
        setSearch('')
      }
      return
    }

    if (baseCmd === 'theme') {
      const targetTheme = args[1]
      if (targetTheme && targetTheme in themes) {
        setTheme(targetTheme as ThemeKey)
        setHistory((prev) => [
          ...prev,
          { cmd: trimmed, content: cmdLine, type: 'cmd' },
          { cmd: trimmed, content: <div>Successfully switched theme to {targetTheme}</div>, type: 'output' }
        ])
        setSearch('')
      } else {
        setHistory((prev) => [
          ...prev,
          { cmd: trimmed, content: cmdLine, type: 'cmd' },
          {
            cmd: trimmed,
            content: (
              <div className="text-red-500">
                theme: theme not found: {args[1] || ''}. Try `theme dracula`, `theme nord`.
              </div>
            ),
            type: 'error'
          }
        ])
        setSearch('')
      }
      return
    }

    // Default: Command not found
    setHistory((prev) => [
      ...prev,
      { cmd: trimmed, content: cmdLine, type: 'cmd' },
      {
        cmd: trimmed,
        content: <div className="text-red-500">shell: command not found: {baseCmd}. Type 'help' for options.</div>,
        type: 'error'
      }
    ])
    setSearch('')
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent
        className="p-0 overflow-hidden border-none bg-transparent shadow-none max-w-2xl top-[20%] translate-y-0"
        hideClose
      >
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <Command
          className="relative rounded-xl border shadow-2xl bg-[var(--bg-color)]/80 backdrop-blur-xl border-[var(--border-color)] overflow-hidden font-mono"
          label="Command Palette"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && terminalMode) {
              const trimmed = search.trim()
              if (trimmed) {
                e.preventDefault()
                e.stopPropagation()
                handleShellCommand(trimmed)
              }
            }
          }}
          style={{
            backgroundColor: `color-mix(in srgb, var(--bg-color), transparent 20%)`,
            borderColor: `var(--border-color)`,
          }}
        >
          <div className="flex items-center border-b border-[var(--border-color)] px-4 py-3 gap-2">
            {terminalMode ? (
              <span className="text-xs font-bold text-[var(--accent-color)] flex-shrink-0 font-mono select-none animate-in fade-in duration-200">
                {siteOwner.terminalUsername}@{siteOwner.terminalHostname}:~$
              </span>
            ) : (
              <Palette className="w-4 h-4 text-[var(--secondary-text)] flex-shrink-0" />
            )}
            <Command.Input
              className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-color)] placeholder:text-[var(--secondary-text)] font-mono"
              onValueChange={setSearch}
              placeholder={terminalMode ? "type 'help' or navigate..." : t('nav.navigation')}
              value={search}
            />
            <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--hover-color)] text-[10px] text-[var(--secondary-text)] font-sans opacity-60">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[380px] overflow-y-auto p-2 scrollbar-none">
            {/* Interactive Shell Output logs (only in terminalMode) */}
            {terminalMode && history.length > 0 && (
              <div className="px-4 py-2 flex flex-col gap-2 font-mono text-xs border-b border-[var(--border-color)]/40 max-h-[200px] overflow-y-auto">
                {history.map((log, index) => (
                  <div className="flex flex-col gap-1" key={index}>
                    {log.type === 'cmd' ? (
                      <div className="font-bold text-[var(--accent-color)]">{log.content}</div>
                    ) : (
                      <div className="pl-4">{log.content}</div>
                    )}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            )}

            <Command.Empty className="px-4 py-8 text-center text-sm text-zinc-500">
              No results found.
            </Command.Empty>

            {!terminalMode && (
              <>
                <Command.Group
                  className="px-2 py-1.5 text-[10px] font-bold text-[var(--secondary-text)] uppercase tracking-widest"
                  heading="Navigation"
                >
                  <Command.Item
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--text-color)] aria-selected:bg-[var(--accent-color)] aria-selected:text-[var(--bg-color)] cursor-pointer transition-colors"
                    onSelect={() =>
                      runCommand(() => {
                        void navigate({ to: '/' })
                      })
                    }
                  >
                    <Home className="w-4 h-4" />
                    <span>{t('nav.home')}</span>
                  </Command.Item>
                  <Command.Item
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--text-color)] aria-selected:bg-[var(--accent-color)] aria-selected:text-[var(--bg-color)] cursor-pointer transition-colors"
                    onSelect={() =>
                      runCommand(() => {
                        void navigate({ to: '/projects' })
                      })
                    }
                  >
                    <FolderCode className="w-4 h-4" />
                    <span>{t('nav.projects')}</span>
                  </Command.Item>
                  <Command.Item
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--text-color)] aria-selected:bg-[var(--accent-color)] aria-selected:text-[var(--bg-color)] cursor-pointer transition-colors"
                    onSelect={() =>
                      runCommand(() => {
                        void navigate({ to: '/publications' })
                      })
                    }
                  >
                    <FileText className="w-4 h-4" />
                    <span>{t('nav.publications')}</span>
                  </Command.Item>
                  <Command.Item
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--text-color)] aria-selected:bg-[var(--accent-color)] aria-selected:text-[var(--bg-color)] cursor-pointer transition-colors"
                    onSelect={() =>
                      runCommand(() => {
                        void navigate({ to: '/experience' })
                      })
                    }
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>{t('nav.experience')}</span>
                  </Command.Item>
                  <Command.Item
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--text-color)] aria-selected:bg-[var(--accent-color)] aria-selected:text-[var(--bg-color)] cursor-pointer transition-colors"
                    onSelect={() =>
                      runCommand(() => {
                        void navigate({ to: '/articles' })
                      })
                    }
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{t('nav.articles')}</span>
                  </Command.Item>
                  <Command.Item
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--text-color)] aria-selected:bg-[var(--accent-color)] aria-selected:text-[var(--bg-color)] cursor-pointer transition-colors"
                    onSelect={() =>
                      runCommand(() => {
                        void navigate({ to: '/about' })
                      })
                    }
                  >
                    <User className="w-4 h-4" />
                    <span>{t('nav.about')}</span>
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="h-px bg-[var(--border-color)] my-2" />

                <Command.Group
                  className="px-2 py-1.5 text-[10px] font-bold text-[var(--secondary-text)] uppercase tracking-widest"
                  heading="Appearance"
                >
                  <Command.Item
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--text-color)] aria-selected:bg-[var(--accent-color)] aria-selected:text-[var(--bg-color)] cursor-pointer transition-colors"
                    onSelect={() => runCommand(() => toggleColorMode())}
                  >
                    {colorMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>Toggle {colorMode === 'dark' ? 'Light' : 'Dark'} Mode</span>
                  </Command.Item>

                  <Command.Group heading="Switch Theme">
                    <div className="grid grid-cols-2 gap-1 p-1">
                      {Object.entries(themes).map(([id, themeItem]) => (
                        <Command.Item
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--text-color)] aria-selected:bg-[var(--accent-color)] aria-selected:text-[var(--bg-color)] cursor-pointer transition-colors"
                          key={id}
                          onSelect={() => runCommand(() => setTheme(id as ThemeKey))}
                        >
                          <Palette
                            className="w-4 h-4"
                            style={{ color: themeItem.terminal.colors(true).prompt }}
                          />
                          <span>{themeItem.name}</span>
                        </Command.Item>
                      ))}
                    </div>
                  </Command.Group>
                </Command.Group>

                <Command.Separator className="h-px bg-white/10 my-2" />

                <Command.Group
                  className="px-2 py-1.5 text-[10px] font-bold text-[var(--secondary-text)] uppercase tracking-widest"
                  heading="Language"
                >
                  <Command.Item
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--text-color)] aria-selected:bg-[var(--accent-color)] aria-selected:text-[var(--bg-color)] cursor-pointer transition-colors"
                    onSelect={() => runCommand(() => setLocale(locale === 'en' ? 'zh' : 'en'))}
                  >
                    <Languages className="w-4 h-4" />
                    <span>Switch to {locale === 'en' ? 'Chinese' : 'English'}</span>
                  </Command.Item>
                </Command.Group>
              </>
            )}
          </Command.List>

          <div className="border-t border-[var(--border-color)] px-4 py-2 flex items-center justify-between text-[10px] text-[var(--secondary-text)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1 rounded border border-[var(--border-color)] bg-[var(--hover-color)]">
                  ↑↓
                </kbd>{' '}
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 rounded border border-[var(--border-color)] bg-[var(--hover-color)]">
                  ↵
                </kbd>{' '}
                Select
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1.5 px-2 py-1 rounded border border-[var(--border-color)] bg-[var(--hover-color)] hover:bg-[var(--accent-color)] hover:text-[var(--bg-color)] cursor-pointer select-none transition-colors"
                onClick={() => setTerminalMode((prev) => !prev)}
                type="button"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{terminalMode ? 'Normal Mode' : 'Terminal Mode'}</span>
              </button>
              <span>{siteOwner.branding.siteName}</span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
