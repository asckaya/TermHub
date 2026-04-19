import type { z } from 'zod'

import type { About, ProjectItem, Publication } from '@/types'

import {
  AboutFrontmatterSchema,
  AwardsJsonSchema,
  ExperienceJsonSchema,
  LogosJsonSchema,
  NewsJsonSchema,
  ProjectFrontmatterSchema,
  PublicationFrontmatterSchema,
  ResearchSchema,
  SiteConfigSchema,
  TalksJsonSchema,
  TeachingJsonSchema,
} from '@/schemas'

// --- Content Globbing (Must use static string literals for Vite) ---
const enGlobs = {
  about: import.meta.glob('@content/about.mdx', { eager: true }),
  articles: import.meta.glob('@content/articles/*.mdx', { eager: true }),
  projects: import.meta.glob('@content/projects/*.mdx', { eager: true }),
  pubs: import.meta.glob('@content/publications/*.mdx', { eager: true }),
}

const zhGlobs = {
  about: import.meta.glob('@content/zh/about.mdx', { eager: true }),
  articles: import.meta.glob('@content/zh/articles/*.mdx', { eager: true }),
  projects: import.meta.glob('@content/zh/projects/*.mdx', { eager: true }),
  pubs: import.meta.glob('@content/zh/publications/*.mdx', { eager: true }),
}

interface MdxModule {
  default: React.ComponentType
  frontmatter?: Record<string, unknown>
}

function collectMd<T extends Record<string, unknown>>(
  modules: Record<string, unknown>,
  schema: z.ZodType<T>,
  label: string,
): (T & { Content?: React.ComponentType })[] {
  return Object.entries(modules).map(([path, m]) => {
    const mod = m as MdxModule
    const raw = mod.frontmatter ?? {}
    const fileLabel = `${label} (${path.split('/').pop() ?? path})`

    // Strict validation via Zod
    const parsed = parseContent(schema, raw, fileLabel)
    return { ...parsed, Content: mod.default }
  })
}

/**
 * Parse `data` against `schema`.  Throws on validation failure so content
 * errors are surfaced immediately rather than silently propagating invalid data.
 */
function parseContent<T>(schema: z.ZodType<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new Error(
      `[TermHub] Content validation failed — ${label}:\n${JSON.stringify(result.error.issues, null, 2)}`,
    )
  }
  return result.data
}

// --- JSON Static Imports ---
import awardsEn from '@content/awards.json'
import expEn from '@content/experience.json'
import logosEn from '@content/logos.json'
import newsEn from '@content/news.json'
import resEn from '@content/research.json'
import siteEn from '@content/site.json'
import talksEn from '@content/talks.json'
import teachEn from '@content/teaching.json'
import awardsZh from '@content/zh/awards.json'
import expZh from '@content/zh/experience.json'
import logosZh from '@content/zh/logos.json'
import newsZh from '@content/zh/news.json'
import resZh from '@content/zh/research.json'
import siteZh from '@content/zh/site.json'
import talksZh from '@content/zh/talks.json'
import teachZh from '@content/zh/teaching.json'

const build = (lang: 'en' | 'zh') => {
  const globs = lang === 'en' ? enGlobs : zhGlobs
  const isZh = lang === 'zh'

  const raw = {
    awards: isZh ? awardsZh : awardsEn,
    exp: isZh ? expZh : expEn,
    logos: isZh ? logosZh : logosEn,
    news: isZh ? newsZh : newsEn,
    res: isZh ? resZh : resEn,
    site: isZh ? siteZh : siteEn,
    talks: isZh ? talksZh : talksEn,
    teach: isZh ? teachZh : teachEn,
  }

  const label = lang.toUpperCase()
  const expParsed = parseContent(ExperienceJsonSchema, raw.exp, `experience.json [${label}]`)

  return {
    about: collectMd(globs.about, AboutFrontmatterSchema, `about.mdx [${label}]`)[0] as About,
    articles: collectMd(
      globs.articles,
      ProjectFrontmatterSchema,
      `articles [${label}]`,
    ) as ProjectItem[],
    awards: parseContent(AwardsJsonSchema, raw.awards, `awards.json [${label}]`),
    experience: {
      education: expParsed.education,
      reviewing: expParsed.reviewing,
    },
    experienceTimeline: expParsed.timeline,
    institutionLogos: parseContent(LogosJsonSchema, raw.logos, `logos.json [${label}]`),
    news: parseContent(NewsJsonSchema, raw.news, `news.json [${label}]`),
    projects: collectMd(
      globs.projects,
      ProjectFrontmatterSchema,
      `projects [${label}]`,
    ) as ProjectItem[],
    publications: collectMd(
      globs.pubs,
      PublicationFrontmatterSchema,
      `publications [${label}]`,
    ) as Publication[],
    research: parseContent(ResearchSchema, raw.res, `research.json [${label}]`),
    siteConfig: parseContent(SiteConfigSchema, raw.site, `site.json [${label}]`),
    talks: parseContent(TalksJsonSchema, raw.talks, `talks.json [${label}]`),
    teaching: parseContent(TeachingJsonSchema, raw.teach, `teaching.json [${label}]`),
  }
}

const cache = { en: build('en'), zh: build('zh') }
export const getLocalizedData = (l: string) => (l === 'zh' ? cache.zh : cache.en)

export interface PublicationStats {
  byVenue: Record<string, number>
  byYear: Record<number | string, number>
  firstAuthor: number
  total: number
  withCode: number
}

export const getPublicationStats = (p: Publication[]): PublicationStats => {
  const stats: PublicationStats = {
    byVenue: {},
    byYear: {},
    firstAuthor: 0,
    total: p.length,
    withCode: 0,
  }
  p.forEach((x) => {
    stats.byYear[x.year] = (stats.byYear[x.year] ?? 0) + 1
    stats.byVenue[x.venueType] = (stats.byVenue[x.venueType] ?? 0) + 1
    if (x.isFirstAuthor) stats.firstAuthor++
    if (x.links.code) stats.withCode++
  })
  return stats
}
