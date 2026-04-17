import { IconButton, Link } from '@chakra-ui/react'
import React from 'react'

import { useColorModeValue } from '@/color-mode'

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
  hoverBg = 'gray.100',
  href,
  icon,
  label,
  shadowColor = 'gray.500',
}) => {
  const borderColor = useColorModeValue('gray.300', 'gray.600')
  const hoverBorderColor = useColorModeValue('cyan.400', 'cyan.300')

  return (
    <Link
      _hover={{ textDecoration: 'none' }}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={label}
    >
      <IconButton
        aria-label={label}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="sm"
        css={{
          '&:active': {
            boxShadow: 'none',
            transform: 'scale(0.95)',
          },
          '&:hover': {
            bg: hoverBg,
            borderColor: hoverBorderColor,
            boxShadow: `0 2px 8px ${shadowColor}`,
            color: 'white',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s ease',
        }}
        fontFamily="mono"
        size={['xs', 'sm']}
        variant="ghost"
      >
        <DynamicIcon boxSize={[3, 3.5]} name={icon} />
      </IconButton>
    </Link>
  )
}

export default SocialButton
