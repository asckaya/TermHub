import React from 'react'
import { useColorModeValue } from '@/color-mode'
import { Box, VStack, Text, Badge } from '@chakra-ui/react'

interface EasterEggProps {
  trigger: React.ReactNode
  title: string
  content: string | React.ReactNode
  type?: 'info' | 'tip' | 'fun'
}

const EasterEgg: React.FC<EasterEggProps> = ({ trigger, title, content, type = 'info' }) => {
  const getBadgeProps = () => {
    switch (type) {
      case 'tip':
        return { colorPalette: 'purple', children: '💡 Pro Tip' }
      case 'fun':
        return { colorPalette: 'pink', children: '🎮 Fun Fact' }
      default:
        return { colorPalette: 'cyan', children: 'ℹ️ Did you know?' }
    }
  }

  return (
    <VStack align="start" gap={2}>
      {trigger}
      <Box
        title={`${title}: ${typeof content === 'string' ? content : ''}`}
        p={4}
        maxW="400px"
        bg={useColorModeValue('white', 'gray.800')}
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        shadow="xl"
        borderRadius="md"
      >
        <VStack align="start" gap={3}>
          <Badge {...getBadgeProps()} />
          <Text fontWeight="bold" fontSize="sm">
            {title}
          </Text>
          <Text fontSize="sm">{content}</Text>
        </VStack>
      </Box>
    </VStack>
  )
}

export default EasterEgg
