/**
 * Component slot definitions.
 *
 * Each slot has a well-defined props interface.
 * Templates provide default implementations; users can
 * override individual slots via `components` in site.json.
 */

import type { NewsItem } from '../types'

/* ── Slot prop interfaces ──────────────────────────────────── */

export interface AccomplishmentsSlotProps {}

export interface BioSlotProps {}

export interface ComponentSlots {
  accomplishments: React.ComponentType<AccomplishmentsSlotProps>
  bio: React.ComponentType<BioSlotProps>
  contact: React.ComponentType<ContactSlotProps>
  footer: React.ComponentType<FooterSlotProps>
  hero: React.ComponentType<HeroSlotProps>
  journey: React.ComponentType<JourneySlotProps>
  mentorship: React.ComponentType<MentorshipSlotProps>
  navbar: React.ComponentType<NavbarSlotProps>
  newsDisplay: React.ComponentType<NewsDisplaySlotProps>
  selectedPublications: React.ComponentType<SelectedPublicationsSlotProps>
  skills: React.ComponentType<SkillsSlotProps>
  talks: React.ComponentType<TalksSlotProps>
  teaching: React.ComponentType<TeachingSlotProps>
}

export interface ContactSlotProps {}

export interface FooterSlotProps {}
export interface HeroSlotProps {
  avatar: string
  education?: { course: string; institution: string; year: string }[]
  educationLogos?: Record<string, string>
  research?: { advisor?: string; emoji: string; focus: string; lab: string; link: string }[]
  researchLogos?: Record<string, string>
  title: string
}
export interface JourneySlotProps {}
export interface MentorshipSlotProps {}
export interface NavbarSlotProps {
  children?: React.ReactNode
}
export interface NewsDisplaySlotProps {
  news: NewsItem[]
  showHeader?: boolean
}
export interface SelectedPublicationsSlotProps {}
export interface SkillsSlotProps {}
export type SlotName = keyof ComponentSlots

/* ── Slot map type ─────────────────────────────────────────── */

export interface TalksSlotProps {}

export interface TeachingSlotProps {}

/**
 * Default section order for the home page.
 * Users can override via `"sections"` in site.json.
 */
export const DEFAULT_SECTIONS: SlotName[] = [
  'hero',
  'bio',
  'newsDisplay',
  'selectedPublications',
  'journey',
  'skills',
  'mentorship',
  'talks',
  'teaching',
  'accomplishments',
  'contact',
  'footer',
]

/** Sections that are rendered as home page sections (not layout-level) */
export const SECTION_SLOTS: SlotName[] = [
  'hero',
  'bio',
  'skills',
  'newsDisplay',
  'selectedPublications',
  'journey',
  'mentorship',
  'talks',
  'teaching',
  'accomplishments',
  'contact',
  'footer',
]
