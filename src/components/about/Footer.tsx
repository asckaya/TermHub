import React from 'react'
import { useColorModeValue } from '@/color-mode'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Link
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import { SiGithub, SiCloudflare } from 'react-icons/si'

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const { siteOwner } = useLocalizedData()
  const footerBg = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box
      as="footer"
      w="full"
      bg={footerBg}
      py={[6, 8]}
      mt={[6, 8]}
      borderTop="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container maxW="7xl" px={[4, 6, 8]}>
        <VStack gap={[3, 4]} textAlign="center">
          {/* Logo */}
          {/* Icons Row */}
          <HStack gap={6} mb={2}>
            <Link
              href="https://github.com"
              target="_blank" rel="noopener noreferrer"
              color={textColor}
              _hover={{ color: 'var(--accent-color)', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <Box as={SiGithub} boxSize="20px" />
            </Link>
            <Link
              href="https://cloudflare.com"
              target="_blank" rel="noopener noreferrer"
              color={textColor}
              _hover={{ color: 'orange.500', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <Box as={SiCloudflare} boxSize="22px" />
            </Link>
          </HStack>

          <HStack gap={1} color={textColor} fontSize={['xs', 'sm']}>
            <Text>{t('footer.poweredBy')}</Text>
            <Link
              href="https://github.com/H-Freax/TermHub"
              target="_blank" rel="noopener noreferrer"
              color="cyan.500"
              fontWeight="medium"
              _hover={{ textDecoration: 'underline' }}
            >
              TermHub
            </Link>
            <Text>{t('footer.forkedBy', 'forked by')}</Text>
            <Text fontWeight="bold">Ascka</Text>
          </HStack>

          <Text fontSize={['2xs', 'xs']} color={textColor}>
            © {new Date().getFullYear()} {siteOwner.name.display}
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer
