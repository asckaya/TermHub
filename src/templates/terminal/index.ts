import { lazy } from 'react'

import type { TemplateConfig } from '@/templates/types'

// ── Layout & slots — eagerly loaded (always visible on every route) ──────────
import Layout from '@/components/layout/Layout'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/pages/about/Footer'
import BioSection from '@/components/sections/BioSection'
import ContactSection from '@/components/sections/ContactSection'
import HeroSection from '@/components/sections/HeroSection'
import JourneySection from '@/components/sections/JourneySection'
import MentorshipSection from '@/components/sections/MentorshipSection'
import NewsTimeline from '@/components/sections/NewsTimeline'
import SelectedPublicationsSection from '@/components/sections/SelectedPublicationsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import TalksSection from '@/components/sections/TalksSection'
import TeachingSection from '@/components/sections/TeachingSection'
import AccomplishmentsTerminal from '@/components/ui/AccomplishmentsTerminal'

// ── Pages — lazily loaded, each becomes its own JS chunk ────────────────────
const Home = lazy(() => import('@/components/pages/Home'))
const Publications = lazy(() => import('@/components/pages/Publications'))
const Projects = lazy(() => import('@/components/pages/Projects'))
const Articles = lazy(() => import('@/components/pages/Articles'))
const Experience = lazy(() => import('@/components/pages/Experience'))
const AboutPage = lazy(() => import('@/components/pages/AboutPage'))

const terminalTemplate: TemplateConfig = {
  description: 'Nord-inspired terminal aesthetic with monospace typography',
  id: 'terminal',
  layout: Layout,
  name: 'Terminal',
  pages: {
    aboutPage: AboutPage,
    articles: Articles,
    experience: Experience,
    home: Home,
    projects: Projects,
    publications: Publications,
  },
  slots: {
    accomplishments: AccomplishmentsTerminal,
    bio: BioSection,
    contact: ContactSection,
    footer: Footer,
    hero: HeroSection,
    journey: JourneySection,
    mentorship: MentorshipSection,
    navbar: Navbar,
    newsDisplay: NewsTimeline,
    selectedPublications: SelectedPublicationsSection,
    skills: SkillsSection,
    talks: TalksSection,
    teaching: TeachingSection,
  },
}

export default terminalTemplate
