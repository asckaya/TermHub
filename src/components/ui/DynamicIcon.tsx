import React from 'react'
import {
  FaBrain,
  FaChevronRight,
  FaClock,
  FaCode,
  FaCodeBranch,
  FaCoffee,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFolder,
  FaGithub,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaSync,
  FaUser,
} from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'

import { cn } from '@/lib/utils'

/**
 * A curated map of icons used across the project.
 * This approach ensures that ONLY the icons we actually use are included
 * in the final bundle, dropping the size from ~18MB to a few KB.
 */
const iconMap: Record<string, React.ElementType | undefined> = {
  FaBrain,
  FaChevronRight,
  FaClock,
  FaCode,
  FaCodeBranch,
  FaCoffee,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFolder,
  FaGithub,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaSync,
  FaUser,
  SiGooglescholar,
}

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  name: string
}

/**
 * A flexible icon component that resolves icons from a curated map.
 * To add new icons, simply import them from react-icons and add to iconMap.
 */
const DynamicIcon: React.FC<DynamicIconProps> = ({ className, name, ...props }) => {
  const IconComponent = iconMap[name]

  if (!IconComponent) {
    // If not found in the map, we show a small placeholder
    return (
      <div
        className={cn('h-4 w-4 bg-muted/20 rounded-sm animate-pulse inline-block', className)}
        title={`Icon "${name}" not found in curated list`}
      />
    )
  }

  const ResolvedIcon = IconComponent

  return <ResolvedIcon className={cn('h-4 w-4 flex-shrink-0', className)} {...props} />
}

export default DynamicIcon
