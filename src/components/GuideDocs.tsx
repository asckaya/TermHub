import { Box, Container, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '@/color-mode'

const GuideDocs = () => {
  const muted = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box w="full" py={10}>
      <Container maxW="7xl">
        <VStack align="stretch" gap={6} maxW="3xl">
          <Heading size="lg">Documentation</Heading>
          <Text color={muted}>
            Documentation is being migrated to Chakra UI v3 component patterns. In the meantime, use
            the project README and source for setup/configuration details.
          </Text>
          <Link
            href="https://github.com/H-Freax/TermHub"
            target="_blank"
            rel="noopener noreferrer"
            color="cyan.400"
          >
            Open repository
          </Link>
        </VStack>
      </Container>
    </Box>
  )
}

export default GuideDocs
