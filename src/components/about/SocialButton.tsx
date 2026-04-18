import React from 'react'

import DynamicIcon from '../DynamicIcon'

interface SocialButtonProps {
  colorPalette?: string
  hoverBg?: string
  href: string
  icon?: string
  label: string
  shadowColor?: string
}

const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  icon,
  label,
  shadowColor = 'rgba(156, 163, 175, 0.5)',
}) => {
  return (
    <a
      className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-sm border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 active:shadow-none bg-transparent hover:text-white group"
      href={href}
      rel="noopener noreferrer"
      style={{
        borderColor: 'var(--border-color, #e5e7eb)',
        // Shadow and hover bg can be complex with dynamic themes,
        // I'll use CSS variables or common defaults
      }}
      target="_blank"
      title={label}
    >
      <div className="flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
        <DynamicIcon className="w-3 md:w-3.5 h-3 md:h-3.5" name={icon} />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        a[title="${label}"]:hover {
          background-color: var(--accent-color, #06b6d4);
          border-color: var(--accent-color, #06b6d4) !important;
          box-shadow: 0 4px 12px ${shadowColor};
        }
      `,
        }}
      />
    </a>
  )
}

export default SocialButton
