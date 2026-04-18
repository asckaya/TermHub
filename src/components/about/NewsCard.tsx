import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { type NewsItem } from '../../types'
import DynamicIcon from '../DynamicIcon'

interface NewsCardProps {
  news: NewsItem
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const getIconName = () => {
    switch (news.type) {
      case 'course':
        return 'FaYoutube'
      case 'publication':
        return 'FaCode'
      case 'talk':
        return 'SiBilibili'
      default:
        return news.icon || 'FaCode'
    }
  }

  // Helper to map Chakra colors to Tailwind colors
  // blue.400 -> bg-blue-400, text-blue-400, etc.
  const colorBase = news.iconColor.split('.')[0]
  
  return (
    <div
      aria-labelledby={`news-title-${news.title.replace(/\s+/g, '-').toLowerCase()}`}
      className="group relative bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      role="article"
    >
      {/* Top color bar */}
      <div className={cn("h-1 w-full", `bg-${colorBase}-400`)} />

      {/* Date Badge - Top Right Absolute Position */}
      {news.date && (
        <div className="absolute top-2 right-2 z-10">
          <Badge
            className={cn(
              "font-medium text-xs px-2 py-1 flex items-center gap-1",
              `bg-${colorBase}-500 hover:bg-${colorBase}-600 text-white border-none shadow-sm`
            )}
          >
            <DynamicIcon className="w-3 h-3" name="FaClock" />
            {news.date}
          </Badge>
        </div>
      )}

      {/* Content area */}
      <div className="p-4">
        {/* Title area and badges */}
        <div className="flex items-start mb-3">
          <div
            aria-hidden="true"
            className={cn(
              "flex items-center justify-center rounded-md w-8 h-8 flex-shrink-0 mr-3 p-2",
              `bg-${colorBase}-400/10 text-${colorBase}-400`
            )}
          >
            <DynamicIcon className="w-4 h-4" name={getIconName()} />
          </div>
          <div className="flex flex-col items-start gap-1 pr-12 w-full">
            <h3
              className="text-sm font-bold leading-tight"
              id={`news-title-${news.title.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {news.title}
            </h3>

            {news.badge && (
              <Badge
                className={cn(
                  "rounded-full text-[10px] px-2 py-0.5 border",
                  `border-${colorBase}-400/30 text-${colorBase}-400 bg-${colorBase}-400/5`
                )}
                variant="outline"
              >
                {news.badge}
              </Badge>
            )}
          </div>
        </div>

        {/* Description text */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          {news.description}
        </p>

        {/* Button link area */}
        <div className="flex flex-wrap gap-2 mt-2">
          {news.links.map((link, index) => {
            const LinkIcon = link.icon ? <DynamicIcon className="text-xs" name={link.icon} /> : undefined
            return (
              <a
                aria-label={`${link.text} for ${news.title}`}
                className="no-underline hover:no-underline"
                href={link.url}
                key={index}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button
                  className={cn(
                    "h-7 text-xs px-2.5 py-0 gap-1.5",
                    `border-${colorBase}-400/50 hover:bg-${colorBase}-400/10 hover:text-${colorBase}-500`
                  )}
                  size="sm"
                  variant="outline"
                >
                  {LinkIcon && <span aria-hidden="true">{LinkIcon}</span>}
                  {link.text}
                </Button>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NewsCard
