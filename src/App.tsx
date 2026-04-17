import { ChakraProvider } from '@chakra-ui/react'
import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { useLocalizedData } from './hooks/useLocalizedData'
import { getResolvedSlots, getTemplate, SlotProvider } from './templates'
import { ThemeProvider } from './themes/ThemeContext'
import { ThemeInjector } from './themes/ThemeInjector'
import './styles/globals.css'
import './i18n'

function App() {
  const { siteConfig } = useLocalizedData()
  const features = siteConfig.features as Record<string, boolean>
  const cfg = siteConfig as Record<string, unknown>
  const template = getTemplate(cfg.template as string | undefined)
  const slots = getResolvedSlots(template, cfg.components as Record<string, string> | undefined)

  const { layout: TemplateLayout, pages, theme } = template

  return (
    <ThemeProvider>
      <ChakraProvider value={theme}>
        <ThemeInjector />
        <SlotProvider slots={slots}>
          <Router basename={import.meta.env.BASE_URL}>
            <TemplateLayout>
              <Suspense fallback={null}>
                <Routes>
                  <Route element={<pages.home />} path="/" />
                  {features.publications && pages.publications && (
                    <Route element={<pages.publications />} path="/publications" />
                  )}
                  {features.projects && pages.projects && (
                    <Route element={<pages.projects />} path="/projects" />
                  )}
                  {features.articles && pages.articles && (
                    <Route element={<pages.articles />} path="/articles" />
                  )}
                  {features.experience && pages.experience && (
                    <Route element={<pages.experience />} path="/experience" />
                  )}
                  {features.about && pages.aboutPage && (
                    <Route element={<pages.aboutPage />} path="/about" />
                  )}
                  {features.guide !== false && pages.guide && (
                    <Route element={<pages.guide />} path="/guide" />
                  )}
                  {features.guide !== false && pages.guideDocs && (
                    <Route element={<pages.guideDocs />} path="/docs" />
                  )}
                </Routes>
              </Suspense>
            </TemplateLayout>
          </Router>
        </SlotProvider>
      </ChakraProvider>
    </ThemeProvider>
  )
}

export default App
