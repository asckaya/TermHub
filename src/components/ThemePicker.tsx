import React, { useState, useRef, useEffect } from 'react'
import { IconButton, Box, VStack, Flex, Text } from '@chakra-ui/react'
import { FaPalette, FaCheck } from 'react-icons/fa'
import { useThemeContext, themes, type ThemeKey } from '@/themes/ThemeContext'
import { useColorModeValue, useColorMode } from '@/color-mode'

export const ThemePicker: React.FC = () => {
  const { currentThemeKey, setTheme, activeTheme } = useThemeContext()
  const iconColor = useColorModeValue('gray.600', 'gray.400')
  const iconHoverColor = useColorModeValue('gray.800', 'white')

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Terminal aesthetic colors for the dropdown
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const tc = activeTheme.terminal.colors(isDark)
  const menuBg = tc.bg
  const menuText = tc.text
  const menuBorder = tc.border
  const menuHoverBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'

  return (
    <Box position="relative" display="inline-flex" ref={menuRef}>
      <IconButton
        variant="ghost"
        size="sm"
        color={iconColor}
        _hover={{ bg: 'transparent', color: iconHoverColor }}
        aria-label="Select Theme"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaPalette />
      </IconButton>
      
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          right={0}
          mt={2}
          bg={menuBg}
          border={`1px solid ${menuBorder}`}
          borderRadius="md"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
          minW="180px"
          zIndex={1000}
          overflow="hidden"
          py={1}
        >
          <VStack gap={0} align="stretch" w="full">
            {(Object.keys(themes) as ThemeKey[]).map((key) => (
              <Flex
                key={key}
                align="center"
                justify="space-between"
                w="full"
                px={3}
                py={2}
                cursor="pointer"
                transition="background 0.2s"
                _hover={{ bg: menuHoverBg }}
                onClick={() => {
                  setTheme(key)
                  setIsOpen(false)
                }}
              >
                <Text fontSize="xs" fontWeight={currentThemeKey === key ? 'bold' : 'normal'} color={menuText} fontFamily="mono">
                  {themes[key].name}
                </Text>
                {currentThemeKey === key && <FaCheck size={10} color={tc.success} />}
              </Flex>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  )
}
