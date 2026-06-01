import { Icon } from '@iconify/react'
import React from 'react'

import { cn } from '@/lib/utils'

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  name: string
}

/**
 * Maps legacy react-icons naming conventions (like FaGithub, SiGooglescholar)
 * dynamically to their modern Iconify equivalent.
 */
const mapIconName = (name: string): string => {
  if (name.includes(':')) return name

  const lowerName = name.toLowerCase()

  // Specific simple-icons mapping
  if (lowerName === 'sigooglescholar') return 'simple-icons:googlescholar'
  if (lowerName === 'simedium') return 'simple-icons:medium'
  if (lowerName === 'sizhihu') return 'simple-icons:zhihu'
  if (lowerName === 'sicsdn') return 'simple-icons:csdn'

  if (name.startsWith('Fa')) {
    // Convert FaExternalLinkAlt -> external-link-alt
    const kebabName = name
      .slice(2)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '')

    // Brand lists mapping
    const brands = ['github', 'linkedin', 'youtube', 'medium', 'zhihu', 'csdn', 'google-scholar']
    const cleanBrandCheck = kebabName.replace(/-alt$/, '').replace(/-branch$/, '')

    if (brands.includes(cleanBrandCheck)) {
      return `fa6-brands:${cleanBrandCheck}`
    }

    // FontAwesome 6 name remappings
    let finalName = kebabName
    if (kebabName === 'external-link-alt') finalName = 'arrow-up-right-from-square'
    if (kebabName === 'file-alt') finalName = 'file-lines'
    if (kebabName === 'code-branch') finalName = 'code-fork'
    if (kebabName === 'map-marker-alt') finalName = 'location-dot'
    if (kebabName === 'graduation-cap') finalName = 'user-graduate'
    if (kebabName === 'sync') finalName = 'rotate'

    return `fa6-solid:${finalName}`
  }

  // Fallback icon
  return 'fa6-solid:circle-question'
}

/**
 * A flexible, tree-shakeable icon component resolving icons from Iconify datasets.
 */
const DynamicIcon: React.FC<DynamicIconProps> = ({ className, name, ...props }) => {
  const iconName = mapIconName(name)

  return (
    <Icon
      className={cn('h-4 w-4 flex-shrink-0 inline-block', className)}
      icon={iconName}
      {...(props as any)}
    />
  )
}

export default DynamicIcon
