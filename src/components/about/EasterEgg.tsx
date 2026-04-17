import { Badge, Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import { useColorModeValue } from '@/color-mode'

interface EasterEggProps {
  content: React.ReactNode | string
  title: string
  trigger: React.ReactNode
  type?: 'fun' | 'info' | 'tip'
}

const EasterEgg: React.FC<EasterEggProps> = ({ content, title, trigger, type = 'info' }) => {
  const getBadgeProps = () => {
    switch (type) {
      case 'fun':
        return { children: '🎮 Fun Fact', colorPalette: 'pink' }
      case 'tip':
        return { children: '💡 Pro Tip', colorPalette: 'purple' }
      default:
        return { children: 'ℹ️ Did you know?', colorPalette: 'cyan' }
    }
  }

  return (
    <VStack align="start" gap={2}>
      {trigger}
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        borderRadius="md"
        maxW="400px"
        p={4}
        shadow="xl"
        title={`${title}: ${typeof content === 'string' ? content : ''}`}
      >
        <VStack align="start" gap={3}>
          <Badge {...getBadgeProps()} />
          <Text fontSize="sm" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm">{content}</Text>
        </VStack>
      </Box>
    </VStack>
  )
}

export default EasterEgg
