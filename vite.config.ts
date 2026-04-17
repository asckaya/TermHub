import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import markdown from './plugins/vite-plugin-markdown'
import contentImages from './plugins/vite-plugin-content-images'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, writeFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [
    react(),
    markdown(),
    contentImages(),
    {
      name: 'spa-fallback-postbuild',
      closeBundle() {
        const outDir = resolve(__dirname, 'dist')
        try {
          mkdirSync(outDir, { recursive: true })
          copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
          writeFileSync(resolve(outDir, '.nojekyll'), '')
        } catch {
          // Build output not available (e.g. dev mode) — skip
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@content/zh': resolve(__dirname, 'content/zh'),
      '@content': resolve(__dirname, 'content'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        /**
         * Split vendor libraries into logical chunks so the browser can cache
         * them independently and visitors only download what changed.
         *
         * Groups:
         *   react-vendor  — React core + DOM + Router (rarely changes)
         *   chakra        — Chakra UI + Emotion (large, rarely changes)
         *   motion        — Framer Motion (animation engine)
         *   icons         — react-icons (tree-shaken, but still sizeable)
         *   i18n          — i18next stack
         *   markdown      — marked + gray-matter (content parsing)
         *   vendor        — everything else in node_modules
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('/react-dom/')) return 'react-dom'
          if (id.includes('/react/') || id.includes('/react-router') || id.includes('/scheduler/'))
            return 'react-core'

          if (id.includes('@chakra-ui/') || id.includes('@emotion/')) return 'chakra'

          if (id.includes('framer-motion')) return 'motion'

          if (id.includes('react-icons')) return 'icons'

          if (
            id.includes('i18next') ||
            id.includes('react-i18next') ||
            id.includes('i18next-browser-languagedetector')
          )
            return 'i18n'

          if (id.includes('/marked/') || id.includes('/gray-matter/') || id.includes('/js-yaml/'))
            return 'markdown'

          return 'vendor'
        },
      },
    },
  },
})
