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
    <Box className={colorMode === 'dark' ? 'dark-theme' : ''} minH="100vh" overflowX="hidden" w="full">
      <Navbar />
      <Box px={[3, 4, 6]} w="full">
        {children}
      </Box>
    </Box>
  )
}

export default Layout
