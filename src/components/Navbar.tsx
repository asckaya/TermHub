import { Link } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEnvelope, FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { SiGooglescholar } from 'react-icons/si'

import { Button } from '@/components/ui/button'
import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

import { MotionHover } from './animations/MotionList'
import { ThemePicker } from './ThemePicker'

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isOpen, setIsOpen] = useState(false)
  const { i18n, t } = useTranslation()
  const { navItems, siteOwner } = useLocalizedData()

  const toggleLanguage = () => {
    void i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')
  }

  const onClose = () => setIsOpen(false)
  const onToggle = () => setIsOpen((prev) => !prev)

  const socialLinks = [
    { href: `mailto:${siteOwner.contact.email}`, icon: FaEnvelope, label: 'Email' },
    { href: siteOwner.social.github, icon: FaGithub, label: 'GitHub' },
    { href: siteOwner.social.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: siteOwner.social.medium, icon: FaMedium, label: 'Medium' },
    { href: siteOwner.social.googleScholar, icon: SiGooglescholar, label: 'Google Scholar' },
  ].filter((link) => link.href)

  return (
    <nav
      className="sticky top-0 w-full z-[1000] py-4 bg-[var(--bg-color)] border-b border-[var(--border-color)]"
    >
      <div className="max-w-screen-2xl mx-auto h-full px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-full">
          {/* 1. Left Section: Mobile hamburger + Always-visible Logo */}
          <div className="flex items-center gap-2">
            <div className="block md:hidden">
              <MotionHover>
                <Button
                  aria-label={t('aria.openNav')}
                  className="text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                  onClick={onToggle}
                  size="icon"
                  variant="ghost"
                >
                  {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
                </Button>
              </MotionHover>
            </div>
            <MotionHover>
              <Link className="flex items-center" to="/">
                <img
                  alt="TermHub"
                  className="h-7 w-7 transition-opacity hover:opacity-80"
                  src={`${import.meta.env.BASE_URL}logo-icon.svg`}
                />
              </Link>
            </MotionHover>
          </div>

          {/* 2. Center: Page Navigation (Centered) */}
          <div className="hidden md:flex items-center justify-center gap-6">
            {navItems.map((item) => (
              <Link
                activeProps={{
                  style: {
                    borderBottom: '2px solid var(--accent-color)',
                    fontWeight: '600',
                  },
                }}
                className="text-[var(--text-color)] text-base no-underline transition-all duration-200"
                inactiveProps={{
                  style: {
                    borderBottom: 'none',
                    fontWeight: '400',
                  },
                }}
                key={item.path}
                to={item.path}
              >
                <MotionHover>
                  {t(item.labelKey)}
                </MotionHover>
              </Link>
            ))}
          </div>

          {/* 3. Right: Socials & Utility Icons (Right-aligned) */}
          <div className="flex items-center justify-end gap-10">
            {/* Social Links Group */}
            <div className="hidden md:flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  className="flex items-center justify-center text-[var(--secondary-text)] transition-all duration-200 hover:text-[var(--accent-color)]"
                  href={link.href}
                  key={link.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MotionHover>
                    <link.icon className="text-[1.2rem]" />
                  </MotionHover>
                </a>
              ))}
            </div>

            {/* Utility Icons Group (Language, Theme, Color Mode) */}
            <div className="flex items-center gap-1">
              <Button
                aria-label={t('aria.toggleLanguage')}
                className="px-2 text-[var(--text-color)] text-xs font-medium transition-all duration-200 hover:text-[var(--accent-color)] hover:bg-transparent"
                onClick={toggleLanguage}
                size="sm"
                variant="ghost"
              >
                <MotionHover>
                  {i18n.language === 'zh' ? 'EN' : '中'}
                </MotionHover>
              </Button>
              <ThemePicker />
              <Button
                aria-label={t('aria.toggleColorMode')}
                className="text-[var(--text-color)] transition-all duration-200 hover:text-[var(--accent-color)] hover:bg-transparent"
                onClick={(e) => toggleColorMode(e)}
                size="icon"
                variant="ghost"
              >
                <MotionHover>
                  {colorMode === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                </MotionHover>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="block md:hidden mt-3 px-4">
          <div className="flex flex-col items-stretch gap-3 bg-[var(--bg-color)]">
            {navItems.map((item) => {
              return (
                <Link
                  activeProps={{
                    style: {
                      color: 'var(--accent-color)',
                      fontWeight: 600,
                    },
                  }}
                  className="block py-1 no-underline"
                  inactiveProps={{
                    style: {
                      color: 'var(--text-color)',
                      fontWeight: 400,
                    },
                  }}
                  key={item.path}
                  onClick={onClose}
                  to={item.path}
                >
                  <MotionHover>
                    {t(item.labelKey)}
                  </MotionHover>
                </Link>
              )
            })}

            <div className="flex flex-col items-stretch gap-2">
              {socialLinks.map((link) => (
                <a
                  className="text-[var(--secondary-text)] no-underline hover:text-[var(--accent-color)]"
                  href={link.href}
                  key={link.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <link.icon className="inline-block mr-2" /> {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                className="text-[var(--text-color)] flex-1 border-[var(--border-color)]"
                onClick={toggleLanguage}
                size="sm"
                variant="outline"
              >
                {i18n.language === 'zh' ? 'English' : '中文'}
              </Button>
              <ThemePicker />
              <Button
                aria-label={t('aria.toggleColorMode')}
                className="text-[var(--text-color)] border-[var(--border-color)]"
                onClick={(e) => toggleColorMode(e)}
                size="icon"
                variant="outline"
              >
                {colorMode === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
