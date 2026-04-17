import { Box } from '@chakra-ui/react'
import { useColorMode } from '@/color-mode'
import { useSlot } from '@/templates/context'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorMode } = useColorMode()
  const Navbar = useSlot('navbar')

  return (
    <Box minH="100vh" w="full" overflowX="hidden" className={colorMode === 'dark' ? 'dark-theme' : ''}>
      <Navbar />
      <Box w="full" px={[3, 4, 6]}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout
