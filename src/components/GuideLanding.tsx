import { Box, Container, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '@/color-mode'

const GuideLanding = () => {
  const border = useColorModeValue('gray.200', 'gray.700')
  const muted = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box w="full" py={10}>
      <Container maxW="7xl">
        <VStack align="stretch" gap={6}>
          <Heading size="lg">TermHub Guide</Heading>
          <Text color={muted}>
            The guide content is now on the docs page. Use the links below for documentation and
            repository resources.
          </Text>

          <VStack align="stretch" gap={3} maxW="3xl">
            <HStack
              justify="space-between"
              border="1px solid"
              borderColor={border}
              borderRadius="md"
              p={4}
            >
              <Text>Open documentation</Text>
              <Link href="/docs" color="cyan.400">
                /docs
              </Link>
            </HStack>

            <HStack
              justify="space-between"
              border="1px solid"
              borderColor={border}
              borderRadius="md"
              p={4}
            >
              <Text>Project repository</Text>
              <Link
                href="https://github.com/H-Freax/TermHub"
                target="_blank"
                rel="noopener noreferrer"
                color="cyan.400"
              >
                GitHub
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default GuideLanding
