import {
  Box,
  VStack,
  Heading,
  Text,
  Badge,
  HStack,
  Button,
  Link,
  Collapsible,
  useDisclosure,
} from '@chakra-ui/react'
import { useColorModeValue } from '@/color-mode'
import type { ProjectItem } from '../types'

const categoryColors: Record<ProjectItem['category'], string> = {
  robotics: 'purple',
  nlp: 'pink',
  'web-app': 'orange',
  data: 'green',
  tooling: 'cyan',
  healthcare: 'red',
}

const linkColor = (label: string) => {
  const lower = label.toLowerCase()
  if (lower.includes('code') || lower.includes('github')) return 'green'
  if (lower.includes('project')) return 'cyan'
  if (lower.includes('demo')) return 'orange'
  if (lower.includes('article') || lower.includes('tutorial') || lower.includes('write'))
    return 'purple'
  if (lower.includes('dataset')) return 'teal'
  return 'blue'
}

interface ProjectCardProps {
  project: ProjectItem
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { open: isOpen, onToggle } = useDisclosure()
  const cardBg = useColorModeValue('white', 'gray.800')
  const chipBg = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  const { title, summary, tags = [], link, extraLinks, highlights, category, date } = project

  const primaryLinks = [] as { label: string; url: string }[]
  if (link) primaryLinks.push({ label: 'Project', url: link })
  if (extraLinks && extraLinks.length > 0) {
    extraLinks.forEach((entry) => {
      if (!primaryLinks.some((item) => item.url === entry.url)) {
        primaryLinks.push({ label: entry.label, url: entry.url })
      }
    })
  }

  return (
    <Box
      p={[4, 5, 6]}
      bg={cardBg}
      borderRadius="lg"
      shadow="md"
      transition="box-shadow 0.2s ease"
      _hover={{ shadow: 'lg' }}
    >
      <VStack align="start" gap={[3, 4]} w="full">
        <HStack gap={2} flexWrap="wrap">
          <Badge colorPalette={categoryColors[category]} fontSize="xs">
            {category.replace('_', ' ').toUpperCase()}
          </Badge>
          {date && (
            <Badge colorPalette="gray" fontSize="xs">
              {date}
            </Badge>
          )}
        </HStack>

        <Heading size={['sm', 'md']} lineHeight="tall">
          {title}
        </Heading>

        <Text fontSize={['sm', 'md']} color={textColor}>
          {summary}
        </Text>

        {tags.length > 0 && (
          <HStack gap={2} flexWrap="wrap">
            {tags.map((tag) => (
              <Badge key={tag} fontSize="xs" colorPalette="blue" variant="subtle">
                {tag}
              </Badge>
            ))}
          </HStack>
        )}

        {primaryLinks.length > 0 && (
          <HStack gap={2} flexWrap="wrap">
            {primaryLinks.map(({ label, url }) => (
              <Link key={`${label}-${url}`} href={url} target="_blank" rel="noopener noreferrer">
                <Button size="xs" colorPalette={linkColor(label)} variant="solid">
                  {label} →
                </Button>
              </Link>
            ))}
          </HStack>
        )}

        {highlights && highlights.length > 0 && (
          <>
            <Button size="xs" variant="outline" colorPalette="gray" onClick={onToggle}>
              {isOpen ? 'Hide Highlights' : 'Show Highlights'}
            </Button>
            <Collapsible.Root open={isOpen}>
              <Collapsible.Content>
                <Box
                  mt={2}
                  w="full"
                  p={4}
                  bg={chipBg}
                  borderRadius="md"
                  borderLeft="4px solid"
                  borderLeftColor={useColorModeValue('blue.400', 'blue.600')}
                >
                  <VStack as="ul" align="start" gap={2} fontSize="sm" color={textColor} pl={2}>
                    {highlights.map((item, idx) => (
                      <Box as="li" key={idx}>
                        {item}
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Collapsible.Content>
            </Collapsible.Root>
          </>
        )}
      </VStack>
    </Box>
  )
}

export default ProjectCard
