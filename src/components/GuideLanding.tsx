import { Box, Container, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react'

import { useColorModeValue } from '@/color-mode'

const GuideLanding = () => {
  const border = useColorModeValue('gray.200', 'gray.700')
  const muted = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box py={10} w="full">
      <Container maxW="7xl">
        <VStack align="stretch" gap={6}>
          <Heading size="lg">TermHub Guide</Heading>
          <Text color={muted}>
            The guide content is now on the docs page. Use the links below for documentation and
            repository resources.
          </Text>

          <VStack align="stretch" gap={3} maxW="3xl">
            <HStack
              border="1px solid"
              borderColor={border}
              borderRadius="md"
              justify="space-between"
              p={4}
            >
              <Text>Open documentation</Text>
              <Link color="cyan.400" href="/docs">
                /docs
              </Link>
            </HStack>

            <HStack
              border="1px solid"
              borderColor={border}
              borderRadius="md"
              justify="space-between"
              p={4}
            >
              <Text>Project repository</Text>
              <Link
                color="cyan.400"
                href="https://github.com/H-Freax/TermHub"
                rel="noopener noreferrer"
                target="_blank"
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
