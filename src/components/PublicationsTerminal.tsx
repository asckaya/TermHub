import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Link,
  Flex,
  Badge,
  Image,
  useDisclosure,
  Input,
  Icon,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { getPublicationStats } from '../data'
import { useLocalizedData } from '@/hooks/useLocalizedData'
import {
  FaChartBar,
  FaVideo,
  FaProjectDiagram,
  FaFileAlt,
  FaAtom,
  FaStar,
  FaRobot,
  FaGlobe,
  FaHandRock,
  FaCloudSun,
  FaFutbol,
  FaTimes,
  FaChevronRight,
} from 'react-icons/fa'
import { type IconType } from 'react-icons'
import { highlightData } from '../utils/highlightData'
import { useThemeConfig } from '@/config/theme'
import { useColorMode } from '@/color-mode'
import { Dialog, Collapsible } from '@chakra-ui/react'

/* ── Emoji → Icon mapping ─────────────────────────────────────── */
const emojiIconMap: Record<string, IconType> = {
  '🎬': FaVideo,
  '🕸️': FaProjectDiagram,
  '📝': FaFileAlt,
  '🌀': FaAtom,
  '🌟': FaStar,
  '🤖': FaRobot,
  '🌐': FaGlobe,
  '🦾': FaHandRock,
  '💭': FaCloudSun,
  '⚽': FaFutbol,
}

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const PublicationsTerminal: React.FC = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { publications, siteOwner } = useLocalizedData()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedVenue, setSelectedVenue] = useState<string>('all')
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [showStats, setShowStats] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [, setCommandHistory] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [imagePreview, setImagePreview] = useState<{ src: string; alt: string } | null>(null)
  const { open: isImageOpen, onOpen: openImageModal, onClose: closeImageModal } = useDisclosure()

  // Simplified breakpoint handling since V3 might differ
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Terminal theme colors
  const { terminalPalette, publicationVenueColors } = useThemeConfig()
  const tc = terminalPalette.colors(isDark)
  const termBg = tc.bg
  const termText = tc.text
  const termHeader = tc.header
  const termBorder = tc.border
  const termPrompt = tc.prompt
  const termCommand = tc.command
  const termParam = tc.param
  const termInfo = tc.info
  const termHighlight = tc.highlight
  const termError = tc.error
  const termSuccess = tc.success
  const termWarning = tc.warning
  const termSecondary = tc.secondary

  const venueColors = Object.fromEntries(
    Object.entries(publicationVenueColors).map(([k, v]) => [
      k,
      { bg: v.bg(isDark), fg: v.fg(isDark), label: v.label },
    ]),
  ) as Record<string, { bg: string; fg: string; label: string }>

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const stats = useMemo(() => getPublicationStats(), [publications])

  const filteredPublications = useMemo(() => {
    let filtered = [...publications]
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (pub) =>
          pub.title.toLowerCase().includes(query) ||
          pub.authors.some((author) => author.toLowerCase().includes(query)) ||
          pub.venue.toLowerCase().includes(query) ||
          pub.keywords?.some((keyword) => keyword.toLowerCase().includes(query)),
      )
    }
    if (selectedYear !== 'all') {
      filtered = filtered.filter((pub) => pub.year.toString() === selectedYear)
    }
    if (selectedVenue !== 'all') {
      filtered = filtered.filter((pub) => pub.venueType === selectedVenue)
    }
    filtered.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year
      return 0
    })
    return filtered
  }, [publications, searchQuery, selectedYear, selectedVenue])

  const availableYears = useMemo(() => {
    const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a)
    return years
  }, [publications])

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleCommand = (cmd: string) => {
    const parts = cmd.toLowerCase().split(' ')
    const command = parts[0]
    switch (command) {
      case 'search':
        setSearchQuery(parts.slice(1).join(' '))
        break
      case 'filter':
        if (parts[1] === 'year' && parts[2]) setSelectedYear(parts[2])
        else if (parts[1] === 'venue' && parts[2]) setSelectedVenue(parts[2])
        break
      case 'stats':
        setShowStats(!showStats)
        break
      case 'clear':
        setSearchQuery('')
        setSelectedYear('all')
        setSelectedVenue('all')
        break
      case 'help':
        alert(
          'Commands: search <query>, filter year <year>, filter venue <type>, stats, clear, help',
        )
        break
    }
    setCommandHistory((prev) => [...prev, cmd])
    setCurrentCommand('')
  }

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const showImagePreview = useCallback(
    (src?: string, alt?: string) => {
      if (!src) return
      setImagePreview({ src, alt: alt ?? 'publication preview' })
      openImageModal()
    },
    [openImageModal],
  )

  return (
    <Box w="full" py={8}>
      <VStack gap={6} maxW="1400px" mx="auto" px={[2, 4, 6]}>
        <Box
          w="full"
          borderRadius="md"
          fontFamily="mono"
          boxShadow={"lg"}
          border={"1px solid"}
          borderColor={termBorder}
          overflow="hidden"
        >
          {/* RGB Light Bar */}
          <Flex h="3px" w="full" overflow="hidden">
            {(() => {
              const palette = [
                '#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#88c0d0', '#5e81ac', '#b48ead',
              ]
              const total = 28
              const tick = Math.floor(currentTime.getTime() / 200)
              return Array.from({ length: total }, (_, i) => {
                const colorIdx = (i + tick) % palette.length
                const brightness = 0.6 + 0.4 * Math.abs(Math.sin((i + tick * 0.5) * 0.3))
                return <Box key={i} flex={1} h="full" bg={palette[colorIdx]} opacity={brightness} />
              })
            })()}
          </Flex>

          {/* Title Bar */}
          <Flex
            bg={termHeader}
            px={4}
            py={2}
            color={termText}
            borderBottom={`1px solid ${termBorder}`}
            justify="space-between"
            align="center"
            fontSize="xs"
            fontWeight="medium"
          >
            <HStack gap={3}>
              <HStack gap={1.5}>
                <Box w="10px" h="10px" borderRadius="full" bg="#bf616a" />
                <Box w="10px" h="10px" borderRadius="full" bg="#ebcb8b" />
                <Box w="10px" h="10px" borderRadius="full" bg="#a3be8c" />
              </HStack>
              <Text>
                <Box as="span" color={termParam}>const </Box>
                <Box as="span" color={termPrompt} fontWeight="bold">papers</Box>
                <Box as="span" color={termSecondary}> = </Box>
                <Box as="span" color={termParam}>new </Box>
                <Box as="span" color={termCommand} fontWeight="bold">Explorer</Box>
                <Box as="span" color={termSecondary}>(</Box>
                <Box as="span" color={termHighlight}>'publications'</Box>
                <Box as="span" color={termSecondary}>)</Box>
              </Text>
            </HStack>
            <Text color={termHighlight}>{formattedTime}</Text>
          </Flex>

          {/* Touch Bar */}
          <Flex
            bg={tc.touchBar}
            px={4}
            py={1}
            borderBottom={`1px solid ${termBorder}`}
            fontSize="2xs"
            align="center"
            justify="space-between"
            overflow="hidden"
          >
            <Text color={termSecondary}>
              <Text as="span" color={termPrompt} fontWeight="bold">{siteOwner.terminalUsername}</Text>
              <Text as="span" color={tc.border}> · </Text>
              <Text as="span" color={termHighlight}>{stats.total}</Text>
              <Text as="span"> papers, </Text>
              <Text as="span" color={termSuccess}>{stats.firstAuthor} first-authored</Text>
              <Text as="span"> across </Text>
              <Text as="span" color={termCommand}>{Object.keys(stats.byVenue).length} venue types</Text>
              <Text as="span" color={tc.border}> · </Text>
              <Text as="span" color={termParam}>{stats.withCode} open-source</Text>
            </Text>
            <Text color={termCommand} flexShrink={0}>~/papers</Text>
          </Flex>

          {/* Control Panel: Styled like terminal input */}
          <Box px={4} py={3} bg={termBg} borderBottom={`1px solid ${termBorder}`}>
            <Flex gap={3} align="center" flexWrap="wrap">
              <Flex
                align="center"
                px={3}
                py={1.5}
                bg={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)'}
                borderRadius="md"
                border={`1px solid ${termBorder}`}
                flex="1"
                minW="200px"
                transition="all 0.2s"
                _focusWithin={{ borderColor: termHighlight, boxShadow: `0 0 0 1px ${termHighlight}` }}
              >
                <Icon as={FaChevronRight} color={termPrompt} fontSize="xs" mr={2} />
                <Text color={termCommand} fontSize="xs" fontWeight="bold" mr={2} fontFamily="mono">grep</Text>
                <Text color={termSecondary} fontSize="xs" mr={2} fontFamily="mono">-i</Text>
                <Input
                  placeholder="'robotics' papers/*"
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                  size="xs"
                  variant="flushed"
                  border="none"
                  _focus={{ border: 'none', outline: 'none' }}
                  color={termText}
                  fontFamily="mono"
                  flex="1"
                  p={0}
                  h="auto"
                  outline="none"
                  _placeholder={{ color: termSecondary, opacity: 0.6 }}
                />
              </Flex>

              <Flex gap={2} flexShrink={0}>
                {/* Year Select */}
                <Box position="relative">
                  <select
                    value={selectedYear}
                    onChange={(e: any) => setSelectedYear(e.target.value)}
                    style={{
                      height: '34px',
                      backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'white',
                      border: `1px solid ${termBorder}`,
                      color: termParam,
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      padding: '0 28px 0 12px',
                      borderRadius: '6px',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(termParam)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>')`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 8px center',
                      backgroundSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="all">--year=ALL</option>
                    {availableYears.map((year) => (<option key={year} value={year}>--year={year}</option>))}
                  </select>
                </Box>

                {/* Venue Select */}
                <Box position="relative">
                  <select
                    value={selectedVenue}
                    onChange={(e: any) => setSelectedVenue(e.target.value)}
                    style={{
                      height: '34px',
                      backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'white',
                      border: `1px solid ${termBorder}`,
                      color: termParam,
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      padding: '0 28px 0 12px',
                      borderRadius: '6px',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(termParam)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>')`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 8px center',
                      backgroundSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="all">--type=ALL</option>
                    <option value="conference">--type=CONF</option>
                    <option value="workshop">--type=WORKSHOP</option>
                    <option value="demo">--type=DEMO</option>
                    <option value="preprint">--type=PREPRINT</option>
                  </select>
                </Box>

                {/* Stats Toggle */}
                <Box
                  as="button"
                  onClick={() => setShowStats(!showStats)}
                  bg={showStats ? termHighlight : 'transparent'}
                  color={showStats ? termBg : termInfo}
                  border={`1px solid ${showStats ? termHighlight : termBorder}`}
                  px={3}
                  height="34px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="md"
                  cursor="pointer"
                  fontSize="xs"
                  fontFamily="mono"
                  fontWeight="bold"
                  transition="all 0.2s"
                  _hover={{ opacity: 0.8 }}
                >
                  <Icon as={FaChartBar} mr={2} />
                  --stats{showStats ? ":ON" : ""}
                </Box>
              </Flex>
            </Flex>
          </Box>

          <Collapsible.Root open={showStats}>
            <Collapsible.Content>
              <Box px={4} py={3} bg={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)'} borderBottom={`1px solid ${termBorder}`}>
                <Flex gap={4} flexWrap="wrap">
                  <Box><Text color={termInfo} fontSize="xs">Total</Text><Text color={termHighlight} fontSize="lg" fontWeight="bold">{stats.total}</Text></Box>
                  <Box><Text color={termInfo} fontSize="xs">First Author</Text><Text color={termSuccess} fontSize="lg" fontWeight="bold">{stats.firstAuthor}</Text></Box>
                  <Box><Text color={termInfo} fontSize="xs">With Code</Text><Text color={termCommand} fontSize="lg" fontWeight="bold">{stats.withCode}</Text></Box>
                  <Box><Text color={termInfo} fontSize="xs">Conferences</Text><Text color={termParam} fontSize="lg" fontWeight="bold">{stats.byVenue.conference || 0}</Text></Box>
                  <Box><Text color={termInfo} fontSize="xs">Workshops</Text><Text color={termWarning} fontSize="lg" fontWeight="bold">{stats.byVenue.workshop || 0}</Text></Box>
                </Flex>
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>

          {/* List */}
          <Box bg={termBg} color={termText} maxH="70vh" overflowY="auto"
            css={{ '&::-webkit-scrollbar': { width: '8px', background: 'transparent' }, '&::-webkit-scrollbar-thumb': { background: tc.border, borderRadius: '4px' } }}
          >
            <Flex px={4} py={2} borderBottom={`1px solid ${termBorder}`} fontSize="xs" fontWeight="bold" color={termInfo}>
              {!isMobile && <Text w="320px" mr={6}>PREVIEW</Text>}
              <Text flex="1">PUBLICATION</Text>
              {!isMobile && <Text w="150px">RESOURCES</Text>}
              <Text w="50px" textAlign="center">MORE</Text>
            </Flex>

            {filteredPublications.map((pub) => (
              <Box key={pub.id} borderBottom={`1px dotted ${termBorder}`} _hover={{ bg: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                <Flex px={4} py={6} align="center" cursor="pointer" onClick={() => toggleExpanded(pub.id)} fontSize="sm" position="relative" minH="200px">
                  {pub.featuredImage && !isMobile && (
                    <Box
                      w="320px" h="180px" mr={6} flexShrink={0} display="flex" alignItems="center" justifyContent="center"
                      bg={isDark ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.8)'} borderRadius="lg" border={`1px solid ${termBorder}`}
                      overflow="hidden" cursor="zoom-in" role="button" tabIndex={0}
                      onClick={(e) => { e.stopPropagation(); showImagePreview(pub.featuredImage, `${pub.title} thumbnail`) }}
                    >
                      <Image src={pub.featuredImage} alt={pub.title} w="full" h="full" objectFit="contain" p={3} transition="transform 0.2s" _hover={{ transform: 'scale(1.05)' }} />
                    </Box>
                  )}
                  <Box flex="1" pr={2}>
                    <HStack gap={1} mb={1} flexWrap="wrap">
                      {pub.emoji && emojiIconMap[pub.emoji] && <Icon as={emojiIconMap[pub.emoji]} color={venueColors[pub.venueType]?.fg} mr={1} />}
                      <Text fontWeight="medium" flex="1">{pub.title}</Text>
                    </HStack>
                    <HStack gap={1} mb={1} flexWrap="wrap">
                      <Badge bg={venueColors[pub.venueType]?.bg} color={venueColors[pub.venueType]?.fg} fontSize="xs" px={2} py={0.5} fontWeight="bold">
                        {pub.venue && String(pub.year) && pub.venue.includes(String(pub.year)) ? pub.venue : `${pub.venue} ${pub.year}`}
                      </Badge>
                      <Badge colorPalette={pub.venueType === 'conference' ? 'blue' : pub.venueType === 'workshop' ? 'purple' : pub.venueType === 'demo' ? 'orange' : 'green'} fontSize="2xs">
                        {venueColors[pub.venueType]?.label}
                      </Badge>
                      {pub.specialBadges?.map((badge, i) => (
                         <Badge key={i} colorPalette={badge === 'Best Paper' ? 'red' : badge === 'Oral' ? 'orange' : badge === 'Spotlight' ? 'yellow' : badge === 'First Author' ? 'green' : 'gray'} fontSize="2xs">
                           {badge}
                         </Badge>
                      ))}
                    </HStack>
                    <Text fontSize="xs" color={termSecondary}>
                      {pub.authors.map((author, i) => {
                        const cleanAuthor = author.replace('*', '')
                        const hasAsterisk = author.includes('*')
                        const isOwner = (siteOwner.name.authorVariants as readonly string[]).includes(cleanAuthor)
                        return (
                          <Text as="span" key={i}>
                            {isOwner ? (
                              <Text as="span" color={termSuccess} fontWeight="bold">
                                {cleanAuthor}{hasAsterisk && <Text as="sup" color={termWarning}>*</Text>}
                                {pub.isFirstAuthor && i === 0 && !hasAsterisk && ' (1st)'}
                                {pub.isCorrespondingAuthor && ' (†)'}
                              </Text>
                            ) : (
                              <>{cleanAuthor}{hasAsterisk && <Text as="sup" color={termWarning}>*</Text>}</>
                            )}
                            {i < pub.authors.length - 1 ? ', ' : ''}
                          </Text>
                        )
                      })}
                      {pub.coFirstAuthors && pub.coFirstAuthors.length > 0 && <Text as="span" fontSize="2xs" color={termInfo} ml={2}>(* co-first)</Text>}
                    </Text>
                  </Box>

                  {!isMobile && (
                    <HStack w="150px" gap={1}>
                      {pub.links.paper && <Box title="Paper"><Link href={pub.links.paper} target="_blank" onClick={(e) => e.stopPropagation()}><Badge colorPalette="blue" fontSize="2xs">PDF</Badge></Link></Box>}
                      {pub.links.code && <Box title="Code"><Link href={pub.links.code} target="_blank" onClick={(e) => e.stopPropagation()}><Badge colorPalette="green" fontSize="2xs">CODE</Badge></Link></Box>}
                      {pub.links.projectPage && <Box title="Project"><Link href={pub.links.projectPage} target="_blank" onClick={(e) => e.stopPropagation()}><Badge colorPalette="purple" fontSize="2xs">PROJ</Badge></Link></Box>}
                    </HStack>
                  )}
                  <Text w="50px" textAlign="center" color={expandedItems[pub.id] ? termInfo : termCommand} fontWeight="bold">
                    {expandedItems[pub.id] ? '[-]' : '[+]'}
                  </Text>
                </Flex>

                <Collapsible.Root open={!!expandedItems[pub.id]}>
                  <Collapsible.Content>
                    <Box px={8} py={4} bg={isDark ? 'rgba(76, 86, 106, 0.15)' : 'rgba(203, 213, 225, 0.15)'} borderLeft={`3px solid ${venueColors[pub.venueType]?.fg || termBorder}`}>
                      <Flex gap={4} flexDirection={isMobile ? 'column' : 'row'}>
                        <Box flex="1">
                          {pub.abstract && (
                            <Box mb={3}>
                              <Text fontSize="xs" color={termInfo} mb={1}>── ABSTRACT ─────────────</Text>
                              <Text fontSize="sm" color={termText} lineHeight="tall">
                                {highlightData(pub.abstract, { num: termHighlight, kw: termCommand, str: termSuccess })}
                              </Text>
                            </Box>
                          )}
                          {pub.keywords && (
                            <Box mb={3}>
                              <Text fontSize="xs" color={termInfo} mb={1}>── KEYWORDS ─────────────</Text>
                              <HStack gap={2} flexWrap="wrap">
                                {pub.keywords.map((k, i) => <Badge key={i} colorPalette="cyan" fontSize="2xs">{k}</Badge>)}
                              </HStack>
                            </Box>
                          )}
                        </Box>
                        {pub.featuredImage && (
                          <Box w={isMobile ? 'full' : '450px'} h={isMobile ? 'auto' : '300px'} flexShrink={0} display="flex" alignItems="center" justifyContent="center"
                            bg={isDark ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.9)'} borderRadius="lg" border={`1px solid ${termBorder}`}
                            overflow="hidden" cursor="zoom-in" onClick={(e) => { e.stopPropagation(); showImagePreview(pub.featuredImage, pub.title) }}
                          >
                            <Image src={pub.featuredImage} alt={pub.title} w="full" h="full" objectFit="contain" p={4} _hover={{ transform: 'scale(1.08)' }} transition="transform 0.3s"/>
                          </Box>
                        )}
                      </Flex>
                    </Box>
                  </Collapsible.Content>
                </Collapsible.Root>
              </Box>
            ))}

            {filteredPublications.length === 0 && (
              <Box px={4} py={8} textAlign="center">
                <Text color={termError} fontSize="sm">No publications found matching criteria</Text>
              </Box>
            )}
          </Box>

          {/* Footer */}
          <Flex px={4} py={2} bg={tc.header} borderTop={`1px solid ${termBorder}`} align="center" fontSize="xs">
            <Text color={termPrompt} mr={2}>{siteOwner.terminalUsername}@research:~/papers$</Text>
            <Input
              value={currentCommand}
              onChange={(e: any) => setCurrentCommand(e.target.value)}
              onKeyDown={(e: any) => { if (e.key === 'Enter') handleCommand(currentCommand) }}
              placeholder="type 'help' for commands" size="xs" border="none" _focus={{ outline: "none" }} color={termText} fontFamily="mono" flex="1" outline="none"
            />
            <Box h="12px" w="6px" bg={termPrompt} ml={1} css={{ animation: `${blink} 1s step-end infinite` }} />
          </Flex>
        </Box>

        {imagePreview && (
          <Dialog.Root open={!!isImageOpen} onOpenChange={(e) => { if (!e.open) closeImageModal() }}>
            <Dialog.Backdrop bg="rgba(0,0,0,0.8)" />
            <Dialog.Positioner>
              <Dialog.Content bg="transparent" boxShadow="none" p={0}>
                <Flex justify="flex-end" w="full" mb={2}>
                  <Box as="button" color="white" onClick={closeImageModal}><Icon as={FaTimes} boxSize={6} /></Box>
                </Flex>
                <Dialog.Body p={0} display="flex" alignItems="center" justifyContent="center">
                  <Image src={imagePreview.src} alt={imagePreview.alt} maxH="80vh" maxW="90vw" objectFit="contain" borderRadius="lg" bg={isDark ? 'rgba(0,0,0,0.85)' : 'white'} p={4} />
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        )}

        <Flex w="full" px={4} py={2} bg={termHeader} borderRadius="md" border={`1px solid ${termBorder}`} justify="space-between" fontSize="xs" fontFamily="mono" flexWrap="wrap" gap={2}>
          <Text color={termInfo}>Showing <Text as="span" color={termHighlight} fontWeight="bold">{filteredPublications.length}</Text> of {publications.length} papers</Text>
          <HStack gap={4}>
            <Text color={termSuccess}>First Author: {filteredPublications.filter((p) => p.isFirstAuthor).length}</Text>
            <Text color={termCommand}>With Code: {filteredPublications.filter((p) => p.links.code).length}</Text>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  )
}

export default PublicationsTerminal
