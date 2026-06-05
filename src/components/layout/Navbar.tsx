import { Link } from '@tanstack/react-router'
import { BookOpen, Briefcase, Code, Compass, FileText, Languages, Menu, Monitor, Moon, Sun, Terminal, User, X } from 'lucide-react'
import React, { useState } from 'react'

import { MotionHover } from '@/components/animations/MotionList'
import { ThemePicker } from '@/components/layout/ThemePicker'
import { Button } from '@/components/ui/button'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { useUiStore } from '@/hooks/uiStore'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'
import { getLocale, setLocale } from '@/paraglide/runtime'

const getNavIcon = (path: string) => {
  switch (path) {
    case '/':
      return Terminal
    case '/about':
      return User
    case '/articles':
      return FileText
    case '/experience':
      return Briefcase
    case '/guide':
      return Compass
    case '/projects':
      return Code
    case '/publications':
      return BookOpen
    default:
      return Terminal
  }
}

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isCrtActive, toggleCrt } = useUiStore()
  const [isOpen, setIsOpen] = useState(false)
  const { navItems, siteOwner } = useLocalizedData()
  const currentLang = getLocale()
  const { t } = useT()

  const toggleLanguage = () => {
    const nextLang = currentLang === 'zh' ? 'en' : 'zh'
    const result = setLocale(nextLang)
    if (result instanceof Promise) {
      result.catch(() => {
        /* Handle error */
      })
    }
  }

  const onClose = () => setIsOpen(false)
  const onToggle = () => setIsOpen((prev) => !prev)

  const socialLinks = [
    {
      href: siteOwner.contact.email ? `mailto:${siteOwner.contact.email}` : undefined,
      icon: 'fa6-solid:envelope',
      label: 'Email',
    },
    { href: siteOwner.social.github, icon: 'fa6-brands:github', label: 'GitHub' },
    { href: siteOwner.social.linkedin, icon: 'fa6-brands:linkedin', label: 'LinkedIn' },
    { href: siteOwner.social.medium, icon: 'simple-icons:medium', label: 'Medium' },
    { href: siteOwner.social.googleScholar, icon: 'simple-icons:googlescholar', label: 'Google Scholar' },
  ].filter((link) => link.href)

  return (
    <nav className="sticky top-0 w-full z-[1000] py-2 md:py-3 bg-[var(--bg-color)]/80 backdrop-blur-md border-b border-[var(--border-color)] transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <MotionHover>
                <Button
                  aria-label={t('aria.openNav')}
                  className="text-[var(--text-color)] hover:bg-[var(--hover-color)] -ml-2"
                  onClick={onToggle}
                  size="icon"
                  variant="ghost"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </MotionHover>
            </div>
            <MotionHover>
              <Link className="flex items-center gap-2 font-mono text-sm md:text-base font-bold no-underline" onClick={onClose} to="/">
                <img
                  alt={siteOwner.branding.siteName}
                  className="h-7 w-7 transition-opacity hover:opacity-80"
                  src={`${import.meta.env.BASE_URL}logo-icon.svg`}
                />
                <span className="hidden sm:inline" style={{ color: 'var(--accent-color)' }}>
                  {siteOwner.terminalUsername}@{siteOwner.branding.siteName.toLowerCase()}:~$
                </span>
              </Link>
            </MotionHover>
          </div>

          {/* Center: Desktop Navigation (Hidden on small screens) */}
          <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-4 mx-4">
            {navItems.map((item) => (
              <Link
                activeProps={{
                  className:
                    'text-[var(--accent-color)] font-semibold border-b-2 border-[var(--accent-color)]',
                }}
                className="px-3 py-2 text-[var(--text-color)] text-sm xl:text-base no-underline transition-all duration-200 hover:text-[var(--accent-color)]"
                inactiveProps={{
                  className: 'text-[var(--text-color)] font-normal border-b-2 border-transparent',
                }}
                key={item.path}
                to={item.path}
              >
                <MotionHover>
                  <span className="flex items-center gap-1.5 font-mono">
                    {React.createElement(getNavIcon(item.path), { className: 'h-4 w-4 opacity-70' })}
                    <span>{t(item.labelKey)}</span>
                  </span>
                </MotionHover>
              </Link>
            ))}
          </div>

          {/* Right: Socials & Utilities */}
          <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
            {/* Social Links (Hidden on small screens) */}
            <div className="hidden xl:flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  className="flex items-center justify-center text-[var(--secondary-text)] transition-all duration-200 hover:text-[var(--accent-color)]"
                  href={link.href}
                  key={link.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MotionHover>
                    <DynamicIcon className="text-lg" name={link.icon} />
                  </MotionHover>
                </a>
              ))}
            </div>

            {/* Utility Icons (Always visible or adaptive) */}
            <div className="flex items-center gap-1 border-l border-[var(--border-color)] pl-2 md:pl-4">
              <Button
                aria-label={t('aria.toggleLanguage')}
                className="hidden sm:flex items-center text-[var(--text-color)] transition-all duration-200 hover:text-[var(--accent-color)] hover:bg-transparent"
                onClick={toggleLanguage}
                size="icon"
                variant="ghost"
              >
                <MotionHover>
                  <Languages className="h-5 w-5" />
                </MotionHover>
              </Button>

              <ThemePicker />

              <Button
                aria-label="Toggle CRT Mode"
                className={`text-[var(--text-color)] transition-all duration-200 hover:bg-transparent ${isCrtActive ? 'text-[var(--accent-color)]' : 'text-[var(--text-color)] hover:text-[var(--accent-color)]'}`}
                onClick={toggleCrt}
                size="icon"
                variant="ghost"
              >
                <MotionHover>
                  <Monitor className="h-5 w-5" />
                </MotionHover>
              </Button>

              <Button
                aria-label={t('aria.toggleColorMode')}
                className="text-[var(--text-color)] transition-all duration-200 hover:text-[var(--accent-color)] hover:bg-transparent"
                onClick={() => toggleColorMode()}
                size="icon"
                variant="ghost"
              >
                <MotionHover>
                  {colorMode === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </MotionHover>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-3 px-4 border-t border-[var(--border-color)] pt-4 animate-fade-in-down animate-duration-300">
          <div className="flex flex-col items-stretch gap-2 bg-[var(--bg-color)]">
            {navItems.map((item) => (
              <Link
                activeProps={{
                  className: 'bg-[var(--hover-color)] text-[var(--accent-color)] font-semibold',
                }}
                className="block px-4 py-3 rounded-md no-underline text-[var(--text-color)] transition-colors hover:bg-[var(--hover-color)]"
                key={item.path}
                onClick={onClose}
                to={item.path}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-sm">
                    {React.createElement(getNavIcon(item.path), { className: 'h-4 w-4 opacity-70 text-[var(--accent-color)]' })}
                    <span>{t(item.labelKey)}</span>
                  </span>
                  <span className="text-[var(--secondary-text)] opacity-30">→</span>
                </div>
              </Link>
            ))}

            <div className="h-px bg-[var(--border-color)] my-2" />

            <div className="flex flex-wrap items-center justify-center gap-2 px-2 py-2">
              {socialLinks.map((link) => (
                <a
                  className="flex-1 flex items-center justify-center min-w-[50px] p-3 rounded-md bg-[var(--hover-color)] text-[var(--secondary-text)] hover:text-[var(--accent-color)] transition-colors"
                  href={link.href}
                  key={link.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <DynamicIcon className="text-xl" name={link.icon} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-4 pb-4">
              <Button
                className="flex-1 h-10 flex items-center justify-center border-[var(--border-color)] text-[var(--text-color)]"
                onClick={toggleLanguage}
                variant="outline"
              >
                <Languages className="h-5 w-5" />
              </Button>
              <div className="flex-1 h-10 flex items-center justify-center border border-[var(--border-color)] rounded-md">
                <ThemePicker />
              </div>
              <Button
                className={`flex-1 h-10 flex items-center justify-center border-[var(--border-color)] ${isCrtActive ? 'text-[var(--accent-color)] border-[var(--accent-color)]' : 'text-[var(--text-color)]'}`}
                onClick={toggleCrt}
                variant="outline"
              >
                <Monitor className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
