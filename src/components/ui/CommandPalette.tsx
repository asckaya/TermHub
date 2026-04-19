import { useNavigate } from '@tanstack/react-router'
import { Command } from 'cmdk'
import {
  BookOpen,
  Briefcase,
  Command as CommandIcon,
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
import { themes } from '@/themes/registry'
import { ThemeContext } from '@/themes/ThemeContext'

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const { locale, setLocale } = useLanguage()
  const themeCtx = React.useContext(ThemeContext)
  const { siteOwner } = useLocalizedData()
  const { t } = useT()

  const setTheme = themeCtx?.setTheme

  useEffect(() => {
    if (!themeCtx) return
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [themeCtx])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
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
          <div className="flex items-center border-b border-[var(--border-color)] px-4 py-3 gap-3">
            <CommandIcon className="w-4 h-4 text-[var(--secondary-text)]" />
            <Command.Input
              className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-color)] placeholder:text-[var(--secondary-text)]"
              placeholder={t('nav.navigation')}
            />
            <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--hover-color)] text-[10px] text-[var(--secondary-text)] font-sans opacity-60">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[350px] overflow-y-auto p-2 scrollbar-none">
            <Command.Empty className="px-4 py-8 text-center text-sm text-zinc-500">
              No results found.
            </Command.Empty>

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
                      onSelect={() => runCommand(() => setTheme?.(id as ThemeKey))}
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
