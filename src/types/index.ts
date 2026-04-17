// ============================================================
// Type definitions — developers only
//
// If you're just editing your portfolio content, you can
// IGNORE this file entirely. It's used internally by the
// template components for type safety.
// ============================================================

export interface About {
  bio: string
  journey: string
  journeyPhases?: JourneyPhase[]
  mentorship?: {
    description?: string
    heading: string
    mentees: {
      name: string
      note?: string
      url: string
    }[]
  }
  researchTitle?: string
  version: {
    current: string
    history: {
      features: string[]
      title: string
      version: string
    }[]
  }
}

export interface Award {
  date: string
  egg?: string
  kind?:
    | 'competition'
    | 'employment'
    | 'grant'
    | 'hackathon'
    | 'honor'
    | 'innovation'
    | 'other'
    | 'scholarship'
    | 'travel'
  link?: string
  org?: string
  title: string
}

export interface Experience {
  academic: {
    description?: string
    isCurrent?: boolean
    organization: string
    period?: string
    title: string
  }[]
  education: {
    courses: {
      course: string
      institution: string
      year: string
    }[]
  }
  professional: {
    company: string
    description?: string
    isCurrent?: boolean
    period: string
    title: string
  }[]
  reviewing?: {
    role: string
    venue: string
  }[]
}

export type ExperienceCategory = 'academic' | 'industry' | 'leadership' | 'research'

export interface ExperienceEntry {
  category: ExperienceCategory
  company: string
  companyUrl?: string
  end?: string
  highlights: string[]
  isCurrent?: boolean
  location?: string
  roleType?: RoleType
  start: string
  summary?: string
  title: string
}
export interface JourneyPhase {
  description: string
  org: string
  period: string
  tags?: string[]
  title: string
}

export interface NewsItem {
  badge: string
  date?: string
  description: string
  emoji?: string
  icon: string
  iconColor: string
  links: NewsLink[]
  sortDate?: string
  title: string
  type: string
}

export interface NewsLink {
  icon?: string
  text: string
  url: string
}

export interface ProjectItem {
  badge?: string
  category: 'data' | 'healthcare' | 'nlp' | 'robotics' | 'tooling' | 'web-app'
  date?: string
  extraLinks?: ProjectLink[]
  featured?: boolean
  featuredImage?: string
  highlights?: string[]
  isOpenSource?: boolean
  link?: string
  role?: 'independent' | 'lead' | 'maintainer' | 'tech-lead'
  story?: string
  summary: string
  tags: string[]
  title: string
}

export interface ProjectLink {
  label: string
  url: string
}

export interface Publication {
  abstract?: string
  authors: string[]
  citations?: number
  coFirstAuthors?: string[]
  emoji?: string
  featuredImage?: string
  id: string
  isCoFirst?: boolean
  isCorrespondingAuthor?: boolean
  isFirstAuthor?: boolean
  keywords?: string[]
  links: {
    arxiv?: string
    code?: string
    dataset?: string
    demo?: string
    paper?: string
    projectPage?: string
  }
  month?: string
  specialBadges?: string[]
  status: 'accepted' | 'preprint' | 'published'
  title: string
  venue: string
  venueType: 'conference' | 'demo' | 'preprint' | 'workshop'
  year: number
}

export interface Research {
  currentResearch: {
    advisor?: string
    emoji: string
    focus: string
    institution?: string
    lab: string
    link: string
  }[]
}

export type RoleType = 'leadership' | 'mle' | 'research' | 'sde' | 'teaching'

export interface Skill {
  category?: string
  level?: number
  name: string
}

export interface Talk {
  date: string
  description?: string
  event: string
  links?: { label: string; url: string }[]
  location?: string
  slidesUrl?: string
  title: string
  type?: 'invited' | 'keynote' | 'oral' | 'other' | 'panel' | 'poster' | 'tutorial' | 'workshop'
  videoUrl?: string
}

export interface TeachingEntry {
  course: string
  description?: string
  institution: string
  link?: string
  role: 'co-instructor' | 'guest-lecturer' | 'instructor' | 'other' | 'ta'
  semester: string
}
