import React, { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/ui/collapsible'

import type { ProjectItem } from '../types'

interface ProjectCardProps {
  project: ProjectItem
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { category, date, extraLinks, highlights, link, summary, tags, title } = project

  const primaryLinks = [] as { label: string; url: string }[]
  if (link) primaryLinks.push({ label: 'Project', url: link })
  if (extraLinks && extraLinks.length > 0) {
    extraLinks.forEach((entry) => {
      if (!primaryLinks.some((item) => item.url === entry.url)) {
        primaryLinks.push({ label: entry.label, url: entry.url })
      }
    })
  }

  return (
    <div className="p-4 md:p-5 lg:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border bg-card text-card-foreground">
      <div className="flex flex-col gap-3 md:gap-4 items-start w-full">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">
            {category.replace('_', ' ')}
          </Badge>
          {date && (
            <Badge variant="secondary" className="text-[10px]">
              {date}
            </Badge>
          )}
        </div>

        <h3 className="text-lg md:text-xl font-bold leading-tight">
          {title}
        </h3>

        <p className="text-sm md:text-base opacity-70 leading-relaxed">
          {summary}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] opacity-80">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {primaryLinks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {primaryLinks.map(({ label, url }) => (
              <a
                key={`${label}-${url}`}
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity no-underline"
              >
                {label} →
              </a>
            ))}
          </div>
        )}

        {highlights && highlights.length > 0 && (
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-bold px-2.5 py-1 rounded-md border bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
            >
              {isOpen ? 'Hide Highlights' : 'Show Highlights'}
            </button>
            <Collapsible open={isOpen}>
              <CollapsibleContent>
                <div
                  className="mt-2 p-4 rounded-md border-l-4 bg-muted/50 w-full"
                  style={{ borderLeftColor: 'var(--accent-color, #3b82f6)' }}
                >
                  <ul className="text-sm space-y-2 pl-2 opacity-80 list-disc list-inside">
                    {highlights.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
