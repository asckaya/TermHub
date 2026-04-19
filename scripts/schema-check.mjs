import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

/**
 * Deep Data Validation for Terminal Portfolio.
 * Uses Zod v4 to strictly validate JSON content structures.
 */

const NameSchema = z.object({
  authorVariants: z.array(z.string()).optional(),
  display: z.string().optional(),
  first: z.string().optional(),
  full: z.string(),
  last: z.string().optional(),
  nickname: z.string().optional(),
})

const SiteConfigSchema = z.object({
  avatar: z.string().optional(),
  contact: z
    .object({
      academicEmail: z.email().optional(),
      email: z.email().optional(),
      hiringEmail: z.email().optional(),
      location: z.string().optional(),
    })
    .optional(),
  features: z.any().optional(),
  name: NameSchema,
  sections: z.array(z.string()).optional(),
  selectedPublicationIds: z.array(z.string()).optional(),
  social: z.any().optional(),
  tagline: z.string().optional(),
  terminal: z
    .object({
      rotatingSubtitles: z.array(z.string()).optional(),
      skills: z.array(z.string()).optional(),
      timezone: z.string().optional(),
      username: z.string(),
    })
    .optional(),
})

const NewsItemSchema = z.object({
  badge: z.string().optional(),
  date: z.string(),
  description: z.string().optional(),
  sortDate: z.string().optional(),
  title: z.string(),
  url: z.url().optional(),
})

const NewsJsonSchema = z.array(NewsItemSchema)

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')

async function run() {
  console.log('--- Deep Data Validation (Zod v4 Ready) ---')
  let allValid = true

  allValid &= validateJson('content/site.json', SiteConfigSchema)
  allValid &= validateJson('content/zh/site.json', SiteConfigSchema)
  allValid &= validateJson('content/news.json', NewsJsonSchema)
  allValid &= validateJson('content/zh/news.json', NewsJsonSchema)

  if (!allValid) {
    console.log('\n\x1b[31mValidation failed!\x1b[0m')
    process.exit(1)
  } else {
    console.log('\n\x1b[32mAll core data schemas are valid!\x1b[0m')
  }
}

function validateJson(path, schema) {
  const absPath = resolve(ROOT, path)
  if (!existsSync(absPath)) {
    console.log(`\x1b[33m⚠\x1b[0m Skipping ${path} (not found)`)
    return true
  }

  try {
    const rawData = readFileSync(absPath, 'utf-8')
    const data = JSON.parse(rawData)
    const result = schema.safeParse(data)

    if (!result.success) {
      console.log(`\x1b[31m✗\x1b[0m ${path} validation failed:`)
      result.error.issues.forEach((issue) => {
        console.log(`  - [${issue.path.join('.')}] ${issue.message} (${issue.code})`)
      })
      return false
    }
    console.log(`\x1b[32m✓\x1b[0m ${path} is valid`)
    return true
  } catch (e) {
    console.error(e)
    console.log(`\x1b[31m✗\x1b[0m ${path} error: ${e.message}`)
    return false
  }
}

run()
