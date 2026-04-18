import { lazy } from 'react'

import type { TemplateConfig } from '../types'

import Footer from '../../components/about/Footer'
import HeroSection from '../../components/about/HeroSection'
import NewsTimeline from '../../components/about/NewsTimeline'
import AccomplishmentsTerminal from '../../components/AccomplishmentsTerminal'
// ── Layout & slots — eagerly loaded (always visible on every route) ──────────
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import BioSection from '../../components/sections/BioSection'
import ContactSection from '../../components/sections/ContactSection'
import JourneySection from '../../components/sections/JourneySection'
import MentorshipSection from '../../components/sections/MentorshipSection'
import SelectedPublicationsSection from '../../components/sections/SelectedPublicationsSection'
import SkillsSection from '../../components/sections/SkillsSection'
import TalksSection from '../../components/sections/TalksSection'
import TeachingSection from '../../components/sections/TeachingSection'

// ── Pages — lazily loaded, each becomes its own JS chunk ────────────────────
// Vite splits these at the dynamic import() boundary, so the visitor only
// downloads code for the page they actually navigate to.
const Home = lazy(() => import('../../components/Home'))
const Publications = lazy(() => import('../../components/Publications'))
const Projects = lazy(() => import('../../components/Projects'))
const Articles = lazy(() => import('../../components/Articles'))
const Experience = lazy(() => import('../../components/Experience'))
const AboutPage = lazy(() => import('../../components/AboutPage'))

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
