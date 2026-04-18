import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/ui/badge'
import { useLocalizedData } from '@/hooks/useLocalizedData'

import type { NewsItem } from '../types'

const sortNews = (arr: NewsItem[]) =>
  [...arr].sort((a, b) => {
    if (!a.sortDate && !b.sortDate) return 0
    if (!a.sortDate) return 1
    if (!b.sortDate) return -1
    return b.sortDate.localeCompare(a.sortDate)
  })

const News = () => {
  const { t } = useTranslation()
  const { news: dataNews } = useLocalizedData()
  const news = useMemo(() => sortNews(dataNews), [dataNews])
  const lastUpdated = news.length > 0 ? (news[0].date ?? 'N/A') : 'N/A'

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-8 items-stretch">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">{t('news.title')}</h1>
          <div className="flex items-center gap-4 mb-6 text-sm opacity-70">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span>
                {t('news.lastUpdated')} {lastUpdated}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-sort"></i>
              <span>{t('news.sortedByDate')}</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {news.map((item, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-md border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                key={item.title}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">
                    {item.date}
                  </code>
                  {item.badge !== '' && (
                    <Badge className="font-bold" variant="secondary">
                      {item.badge}
                    </Badge>
                  )}
                  <span className="font-bold ml-1">{item.title}</span>
                </div>
                <p className="text-sm leading-relaxed opacity-90">{item.description}</p>
                {item.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {item.links.map((l) => (
                      <a
                        className="text-primary hover:underline font-medium text-sm"
                        href={l.url}
                        key={l.url}
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent-color)' }}
                        target="_blank"
                      >
                        {l.text} →
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">{t('news.currentFocus')}</h2>
          <pre
            className="p-4 rounded-md font-mono text-sm overflow-x-auto"
            style={{ backgroundColor: 'var(--header-bg)', color: 'var(--text-color)' }}
          >
            {`# Active Projects (2024-Q4)
- ThinkGrasp extensions    // Working on improved vision-language integration
- Equivariant Models       // Refining SE(2) models for grasping
- Technical blog series    // Writing about LLMs and robotics
- PyTorch upgrades         // Maintaining open source contributions`}
          </pre>
        </motion.div>
      </div>
    </div>
  )
}

export default News
