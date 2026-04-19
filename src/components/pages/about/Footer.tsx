import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { SiCloudflare } from 'react-icons/si'

import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { useT } from '@/hooks/useT'

const Footer: React.FC = () => {
  const { t } = useT()
  const { siteOwner } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    bg: isDark ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)', // gray-900 : gray-50
    border: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    text: isDark ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)', // gray-400 : gray-600
  }

  return (
    <footer
      className="w-full border-t mt-6 md:mt-8 py-6 md:py-8"
      style={{
        backgroundColor: tc.bg,
        borderColor: tc.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
          {/* Logo placeholder if needed */}

          {/* Icons Row */}
          <div className="flex items-center gap-6 mb-2">
            <a
              className="transition-all duration-200 hover:text-[var(--accent-color)] hover:-translate-y-0.5 no-underline"
              href="https://github.com"
              rel="noopener noreferrer"
              style={{ color: tc.text }}
              target="_blank"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              className="transition-all duration-200 hover:text-orange-500 hover:-translate-y-0.5 no-underline"
              href="https://cloudflare.com"
              rel="noopener noreferrer"
              style={{ color: tc.text }}
              target="_blank"
            >
              <SiCloudflare className="h-[22px] w-[22px]" />
            </a>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs md:text-sm"
            style={{ color: tc.text }}
          >
            <span>{t('footer.poweredBy')}</span>
            <a
              className="font-medium text-cyan-500 hover:underline no-underline"
              href={siteOwner.branding.repoUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {siteOwner.branding.siteName}
            </a>
            <span>{t('footer.by', 'by')}</span>
            <span className="font-bold">{siteOwner.branding.authorName}</span>
          </div>

          <p className="text-[10px] md:text-xs" style={{ color: tc.text }}>
            © {new Date().getFullYear()} {siteOwner.name.display}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
