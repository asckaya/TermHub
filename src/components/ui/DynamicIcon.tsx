import { Icon, type IconProps } from '@iconify/react'
import React from 'react'

import { cn } from '@/lib/utils'

interface DynamicIconProps extends Omit<IconProps, 'icon'> {
  className?: string
  name: string
}

/**
 * A flexible, tree-shakeable icon component resolving icons directly from Iconify datasets.
 */
const DynamicIcon: React.FC<DynamicIconProps> = ({ className, name, ...props }) => {
  return (
    <Icon
      className={cn('h-4 w-4 flex-shrink-0 inline-block', className)}
      icon={name}
      {...props}
    />
  )
}

export default DynamicIcon
