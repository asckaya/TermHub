import { useNavigate } from '@tanstack/react-router'
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
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const { locale, setLocale } = useLanguage()
  const { activeTheme, setTheme } = useThemeContext()
  const { siteOwner } = useLocalizedData()
  const { t } = useT()

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
    const args = cmdStr.trim().split(/\s+/)
    const baseCmd = args[0].toLowerCase()

    if (baseCmd === 'exit') {
      setOpen(false)
      setSearch('')
      return
    }

    if (baseCmd === 'clear') {
      setSearch('')
      return
    }

    if (baseCmd === 'cd') {
      const target = (args[1] ?? '').toLowerCase().replace(/^\/+|\/+$/g, '')
      if (target === '~' || target === 'home' || target === '') {
        void navigate({ to: '/' })
      } else if (['about', 'articles', 'experience', 'projects', 'publications'].includes(target)) {
        void navigate({ to: `/${target}` })
      } else {
        alert(`cd: no such file or directory: ${args[1] || ''}`)
        return
      }
      setOpen(false)
      setSearch('')
      return
    }

    if (baseCmd === 'theme' && args[1]) {
      const targetTheme = args[1] as ThemeKey
      if (targetTheme in themes) {
        setTheme(targetTheme)
        setSearch('')
      } else {
        alert(`theme: theme not found: ${args[1]}. Try 'theme dracula', 'theme nord', etc.`)
      }
      return
    }
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
          style={{
            backgroundColor: `color-mix(in srgb, var(--bg-color), transparent 20%)`,
            borderColor: `var(--border-color)`,
          }}
        >
          <div className="flex items-center border-b border-[var(--border-color)] px-4 py-3 gap-2">
            <span className="text-xs font-bold text-[var(--accent-color)] flex-shrink-0 font-mono select-none">
              {siteOwner.terminalUsername}@{siteOwner.terminalHostname}:~$
            </span>
            <Command.Input
              className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-color)] placeholder:text-[var(--secondary-text)] font-mono"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  e.stopPropagation()
                  const cmd = search.trim()
                  handleShellCommand(cmd)
                }
              }}
              onValueChange={setSearch}
              placeholder="type 'help' or navigate..."
              value={search}
            />
            <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--hover-color)] text-[10px] text-[var(--secondary-text)] font-sans opacity-60">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[380px] overflow-y-auto p-2 scrollbar-none">
            <Command.Empty className="px-4 py-8 text-center text-sm text-zinc-500">
              No results found.
            </Command.Empty>

            {/* Custom Interactive Shell Command Displays */}
            {search.trim().toLowerCase() === 'neofetch' && (
              <Command.Group heading="neofetch">
                <div className="p-4 rounded-lg bg-[var(--hover-color)]/20 border border-[var(--border-color)] font-mono text-xs text-[var(--text-color)] leading-relaxed flex gap-6 select-none animate-in fade-in zoom-in duration-200">
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
              </Command.Group>
            )}

            {search.trim().toLowerCase() === 'help' && (
              <Command.Group heading="Shell Commands Help">
                <div className="p-4 rounded-lg bg-[var(--hover-color)]/20 border border-[var(--border-color)] font-mono text-xs text-[var(--secondary-text)] leading-loose select-none animate-in fade-in zoom-in duration-200">
                  <div><span className="text-[var(--accent-color)] font-bold">ls</span> - list all site sections/pages</div>
                  <div><span className="text-[var(--accent-color)] font-bold">cd &lt;page&gt;</span> - navigate to page (e.g. <span className="text-[var(--text-color)]">cd projects</span>, <span className="text-[var(--text-color)]">cd articles</span>)</div>
                  <div><span className="text-[var(--accent-color)] font-bold">theme &lt;name&gt;</span> - change theme (e.g. <span className="text-[var(--text-color)]">theme dracula</span>, <span className="text-[var(--text-color)]">theme catppuccin</span>)</div>
                  <div><span className="text-[var(--accent-color)] font-bold">neofetch</span> - show cute system & author info card</div>
                  <div><span className="text-[var(--accent-color)] font-bold">clear</span> - clear search / command input</div>
                  <div><span className="text-[var(--accent-color)] font-bold">exit</span> - close command palette</div>
                </div>
              </Command.Group>
            )}

            {search.trim().toLowerCase() === 'ls' && (
              <Command.Group heading="ls">
                <div className="p-4 rounded-lg bg-[var(--hover-color)]/20 border border-[var(--border-color)] font-mono text-xs text-[var(--text-color)] flex gap-4 select-none animate-in fade-in zoom-in duration-200">
                  <span className="text-[var(--accent-color)] font-bold">home/</span>
                  <span className="text-[var(--accent-color)] font-bold">projects/</span>
                  <span className="text-[var(--accent-color)] font-bold">publications/</span>
                  <span className="text-[var(--accent-color)] font-bold">experience/</span>
                  <span className="text-[var(--accent-color)] font-bold">articles/</span>
                  <span className="text-[var(--accent-color)] font-bold">about/</span>
                </div>
              </Command.Group>
            )}

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
            <span>{siteOwner.branding.siteName}</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
