declare module '@/paraglide/runtime' {
  export type AvailableLanguageTag = 'en' | 'zh'
  export const baseLocale: AvailableLanguageTag
  export const locales: readonly AvailableLanguageTag[]
  export function getLocale(): AvailableLanguageTag
  export function getTextDirection(locale?: AvailableLanguageTag): 'ltr' | 'rtl'
  export function isLocale(locale: unknown): locale is AvailableLanguageTag
  export function setLocale(
    locale: AvailableLanguageTag,
    options?: { reload?: boolean },
  ): Promise<void> | void
  export function toLocale(locale: unknown): AvailableLanguageTag | undefined
}

declare module '@/paraglide/messages' {
  export type MessageFunction = (inputs?: MessageInputs, options?: MessageOptions) => string

  export type MessageInputs = Record<string, number | string | undefined>

  export interface MessageOptions {
    locale?: 'en' | 'zh'
  }

  export const nav_home: MessageFunction
  export const nav_about: MessageFunction
  export const nav_publications: MessageFunction
  export const nav_experience: MessageFunction
  export const nav_projects: MessageFunction
  export const nav_articles: MessageFunction
  export const nav_guide: MessageFunction
  export const nav_navigation: MessageFunction
  export const aria_openNav: MessageFunction
  export const aria_toggleColorMode: MessageFunction
  export const aria_toggleLanguage: MessageFunction
  export const about_recentUpdates: MessageFunction
  export const about_news: MessageFunction
  export const about_skills: MessageFunction
  export const about_aboutDescription: MessageFunction
  export const about_bio: MessageFunction
  export const about_selectedPublications: MessageFunction
  export const about_viewAllPublications: MessageFunction
  export const about_myJourney: MessageFunction
  export const about_viewAllExperience: MessageFunction
  export const about_equalContribution: MessageFunction
  export const about_abstract: MessageFunction
  export const about_paper: MessageFunction
  export const about_arXiv: MessageFunction
  export const about_project: MessageFunction
  export const about_code: MessageFunction
  export const about_demo: MessageFunction
  export const about_dataset: MessageFunction
  export const about_awardsAndHonors: MessageFunction
  export const about_awardsSpanning: MessageFunction
  export const about_categories: MessageFunction
  export const home_recentUpdates: MessageFunction
  export const home_news: MessageFunction
  export const home_awardsAndHonors: MessageFunction
  export const home_awards: MessageFunction
  export const hero_greeting: MessageFunction
  export const hero_sometimesI: MessageFunction
  export const experience_education: MessageFunction
  export const experience_academicReviewing: MessageFunction
  export const experience_present: MessageFunction
  export const experience_rolesAcross: MessageFunction
  export const experience_currentlyActive: MessageFunction
  export const experience_research: MessageFunction
  export const experience_industry: MessageFunction
  export const experience_filterAll: MessageFunction
  export const experience_filterAcademic: MessageFunction
  export const experience_filterIndustry: MessageFunction
  export const experience_active: MessageFunction
  export const experience_noPositions: MessageFunction
  export const experience_typeHelp: MessageFunction
  export const experience_roleResearch: MessageFunction
  export const experience_roleMLE: MessageFunction
  export const experience_roleSDE: MessageFunction
  export const experience_roleTeaching: MessageFunction
  export const experience_roleLeadership: MessageFunction
  export const projects_all: MessageFunction
  export const projects_projectsAcross: MessageFunction
  export const projects_independentlyBuilt: MessageFunction
  export const projects_independent: MessageFunction
  export const projects_lead: MessageFunction
  export const projects_techLead: MessageFunction
  export const projects_maintainer: MessageFunction
  export const projects_source: MessageFunction
  export const projects_details: MessageFunction
  export const projects_less: MessageFunction
  export const projects_noMatches: MessageFunction
  export const projects_tryAdjustingSearch: MessageFunction
  export const projects_projects: MessageFunction
  export const projects_shown: MessageFunction
  export const articles_allTopics: MessageFunction
  export const articles_article: MessageFunction
  export const articles_articles: MessageFunction
  export const articles_technicalArticles: MessageFunction
  export const articles_domains: MessageFunction
  export const articles_noMatches: MessageFunction
  export const articles_tryAdjustingFilter: MessageFunction
  export const articles_shown: MessageFunction
}
