// SPDX-FileCopyrightText: 2026 Yaoyao(Freax) Qian <limyoonaxi@gmail.com>
// SPDX-License-Identifier: GPL-3.0-only

/**
 * Terminal template — the original TermHub look & feel.
 *
 * Wraps existing components so the multi-template system works
 * without changing any component internals.
 */

import type { TemplateConfig } from '../types'
import theme from '../../theme'

// Existing page components — re-exported as the terminal template's pages
import Layout from '../../components/Layout'
import Home from '../../components/Home'
import Publications from '../../components/Publications'
import Projects from '../../components/Projects'
import Articles from '../../components/Articles'
import Experience from '../../components/Experience'
import GuideLanding from '../../components/GuideLanding'
import GuideDocs from '../../components/GuideDocs'

const terminalTemplate: TemplateConfig = {
  id: 'terminal',
  name: 'Terminal',
  description: 'Nord-inspired terminal aesthetic with monospace typography',
  theme,
  layout: Layout,
  pages: {
    home: Home,
    publications: Publications,
    projects: Projects,
    articles: Articles,
    experience: Experience,
    guide: GuideLanding,
    guideDocs: GuideDocs,
  },
}

export default terminalTemplate
