import type { z } from 'zod'

import type { ProjectStatusSchema } from '@/schemas'

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>

/**
 * Project statuses that should be pinned to the top of the list.
 */
export const PINNED_STATUSES: ProjectStatus[] = ['ongoing']

/**
 * Localized labels for project statuses.
 */
export const STATUS_LABELS: Record<ProjectStatus, { en: string; zh: string }> = {
  archived: { en: 'Archived', zh: '已存档' },
  completed: { en: 'Completed', zh: '已完成' },
  ongoing: { en: 'In Progress', zh: '进行中' },
  planned: { en: 'Planned', zh: '计划中' },
}
