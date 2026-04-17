// ============================================================
// Data loader (bilingual)
//
// Loads content from two sources per language:
//   - Markdown files (content/**/*.md, content/zh/**/*.md)
//   - JSON files (content/*.json, content/zh/*.json)
//
// At build time, both languages are loaded eagerly.
// At runtime, getLocalizedData(lang) selects the right set.
// ============================================================

import type {
  About,
  Award,
  Experience,
  ExperienceEntry,
  NewsItem,
  ProjectItem,
  Publication,
  Research,
  Talk,
  TeachingEntry,
} from '../types'

// ── Markdown glob imports (each .md → { frontmatter..., body: html }) ──

// English (default)
const projectMdsEn = import.meta.glob('/content/projects/*.md', { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>
const articleMdsEn = import.meta.glob('/content/articles/*.md', { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>
const publicationMdsEn = import.meta.glob('/content/publications/*.md', { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>
const aboutMdEn = import.meta.glob('/content/about.md', { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>

// Chinese
const projectMdsZh = import.meta.glob('/content/zh/projects/*.md', { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>
const articleMdsZh = import.meta.glob('/content/zh/articles/*.md', { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>
const publicationMdsZh = import.meta.glob('/content/zh/publications/*.md', {
  eager: true,
}) as Record<string, { default: Record<string, unknown> }>
const aboutMdZh = import.meta.glob('/content/zh/about.md', { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>

function collectMd(
  modules: Record<string, { default: Record<string, unknown> }>,
): Record<string, unknown>[] {
  return Object.values(modules).map((m) => {
    const { body, ...frontmatter } = m.default
    return { ...frontmatter, _body: body }
  })
}

function decodeEntities(str: string) {
  return str.replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

function mdToAbout(raw: Record<string, unknown>): About {
  const { _body, bio, ...rest } = raw
  const bodyStr = (_body as string) || ''
  const journey = decodeEntities(bodyStr.replace(/<[^>]+>/g, '').trim())
  return { 
    bio: (bio as string) || '', 
    journey,
    ...rest 
  } as unknown as About
}

// Convert Markdown body into the fields components expect
function mdToProject(raw: Record<string, unknown>): ProjectItem {
  const { _body, ...rest } = raw
  const bodyStr = (_body as string) || ''

  const highlights: string[] = []
  const lines = bodyStr.replace(/<[^>]+>/g, '').split('\n')
  for (const line of lines) {
    const m = line.match(/^[-*]\s+(.+)/)
    if (m) highlights.push(decodeEntities(m[1].trim()))
  }

  const summary = decodeEntities(
    lines
      .filter((l) => l.trim() && !l.match(/^[-*#]/) && !l.match(/^</))
      .map((l) => l.trim())
      .join(' ')
  )

  return {
    highlights: highlights.length > 0 ? highlights : undefined,
    summary,
    ...rest,
  } as unknown as ProjectItem
}

function mdToPublication(raw: Record<string, unknown>): Publication {
  const { _body, ...rest } = raw
  const bodyStr = (_body as string) || ''
  const abstract = decodeEntities(bodyStr.replace(/<[^>]+>/g, '').trim())
  return { abstract, ...rest } as unknown as Publication
}

// ── JSON imports (both languages) ──

import awardsJsonEn from '@content/awards.json'
import experienceJsonEn from '@content/experience.json'
import logosJsonEn from '@content/logos.json'
import newsJsonEn from '@content/news.json'
import researchJsonEn from '@content/research.json'
import siteJsonEn from '@content/site.json'
import talksJsonEn from '@content/talks.json'
import teachingJsonEn from '@content/teaching.json'
import awardsJsonZh from '@content/zh/awards.json'
import experienceJsonZh from '@content/zh/experience.json'
import logosJsonZh from '@content/zh/logos.json'
import newsJsonZh from '@content/zh/news.json'
import researchJsonZh from '@content/zh/research.json'
import siteJsonZh from '@content/zh/site.json'
import talksJsonZh from '@content/zh/talks.json'
import teachingJsonZh from '@content/zh/teaching.json'

// ── Build both language datasets ──

const enData = {
  about: mdToAbout(collectMd(aboutMdEn)[0] ?? {}),
  articles: collectMd(articleMdsEn).map(mdToProject),
  awards: awardsJsonEn as Award[],
  experience: { ...experienceJsonEn, academic: [], professional: [] } as Experience,
  experienceTimeline: experienceJsonEn.timeline as ExperienceEntry[],
  institutionLogos: logosJsonEn as Record<string, string>,
  news: newsJsonEn as NewsItem[],
  projects: collectMd(projectMdsEn).map(mdToProject),
  publications: collectMd(publicationMdsEn).map(mdToPublication),
  research: researchJsonEn as Research,
  siteConfig: siteJsonEn,
  talks: talksJsonEn as Talk[],
  teaching: teachingJsonEn as TeachingEntry[],
}

const zhData = {
  about: mdToAbout(collectMd(aboutMdZh)[0] ?? {}),
  articles: collectMd(articleMdsZh).map(mdToProject),
  awards: awardsJsonZh as Award[],
  experience: { ...experienceJsonZh, academic: [], professional: [] } as Experience,
  experienceTimeline: experienceJsonZh.timeline as ExperienceEntry[],
  institutionLogos: logosJsonZh as Record<string, string>,
  news: newsJsonZh as NewsItem[],
  projects: collectMd(projectMdsZh).map(mdToProject),
  publications: collectMd(publicationMdsZh).map(mdToPublication),
  research: researchJsonZh as Research,
  siteConfig: siteJsonZh,
  talks: talksJsonZh as Talk[],
  teaching: teachingJsonZh as TeachingEntry[],
}

const dataByLang: Record<string, typeof enData> = { en: enData, zh: zhData }

/** Get content data for a specific language (falls back to English) */
export function getLocalizedData(lang: string) {
  return dataByLang[lang] ?? enData
}

// ── Default exports (English, for backward compatibility) ──

export const projects = enData.projects
export const articles = enData.articles
export const publications = enData.publications
export const about = enData.about
export const research = enData.research
export const experience = enData.experience
export const experienceTimeline = enData.experienceTimeline
export const news = enData.news
export const awards = enData.awards
export const talks = enData.talks
export const teaching = enData.teaching
export const institutionLogos = enData.institutionLogos

// ── Helper functions ──

export const getPublicationsByYear = (year: number) =>
  publications.filter((pub) => pub.year === year)

export const getPublicationsByVenue = (venueType: string) =>
  publications.filter((pub) => pub.venueType === venueType)

export const getFirstAuthorPublications = () => publications.filter((pub) => pub.isFirstAuthor)

export const getPublicationStats = () => {
  const stats = {
    byVenue: {} as Record<string, number>,
    byYear: {} as Record<number, number>,
    correspondingAuthor: 0,
    firstAuthor: 0,
    total: publications.length,
    withCode: 0,
    withDataset: 0,
  }
  publications.forEach((pub) => {
    stats.byYear[pub.year] = (stats.byYear[pub.year] || 0) + 1
    stats.byVenue[pub.venueType] = (stats.byVenue[pub.venueType] || 0) + 1
    if (pub.isFirstAuthor) stats.firstAuthor++
    if (pub.isCorrespondingAuthor) stats.correspondingAuthor++
    if (pub.links.code) stats.withCode++
    if (pub.links.dataset) stats.withDataset++
  })
  return stats
}
