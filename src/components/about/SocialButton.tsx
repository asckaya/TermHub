import { IconButton, Link } from '@chakra-ui/react'
import { useColorModeValue } from '@/color-mode'
import DynamicIcon from '../DynamicIcon'
import React from 'react'

interface SocialButtonProps {
  icon?: string
  label: string
  href: string
  colorPalette?: string
  hoverBg?: string
  shadowColor?: string
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  label,
  href,
  hoverBg = 'gray.100',
  shadowColor = 'gray.500',
}) => {
  const borderColor = useColorModeValue('gray.300', 'gray.600')
  const hoverBorderColor = useColorModeValue('cyan.400', 'cyan.300')

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      _hover={{ textDecoration: 'none' }}
    >
      <IconButton
        aria-label={label}
        size={['xs', 'sm']}
        variant="ghost"
        borderRadius="sm"
        border="1px solid"
        borderColor={borderColor}
        fontFamily="mono"
        css={{
          transition: 'all 0.2s ease',
          '&:hover': {
            bg: hoverBg,
            color: 'white',
            borderColor: hoverBorderColor,
            transform: 'translateY(-2px)',
            boxShadow: `0 2px 8px ${shadowColor}`,
          },
          '&:active': {
            transform: 'scale(0.95)',
            boxShadow: 'none',
          },
        }}
      >
        <DynamicIcon name={icon} boxSize={[3, 3.5]} />
      </IconButton>
    </Link>
  )
}

export default SocialButton
