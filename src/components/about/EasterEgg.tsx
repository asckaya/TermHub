import React from 'react'

import { Badge } from '@/components/ui/badge'

interface EasterEggProps {
  content: React.ReactNode | string
  title: string
  trigger: React.ReactNode
  type?: 'fun' | 'info' | 'tip'
}

const EasterEgg: React.FC<EasterEggProps> = ({ content, title, trigger, type = 'info' }) => {
  const getBadgeProps = () => {
    switch (type) {
      case 'fun':
        return {
          children: '🎮 Fun Fact',
          className: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
        }
      case 'tip':
        return {
          children: '💡 Pro Tip',
          className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        }
      default:
        return {
          children: 'ℹ️ Did you know?',
          className: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
        }
    }
  }

  const badge = getBadgeProps()

  return (
    <div className="flex flex-col items-start gap-2 group relative">
      {trigger}
      {/* 
          This component seems to be a tooltip-like box. 
          The original code had it always rendered below trigger.
          I'll maintain that but make it look nicer.
      */}
      <div
        className="max-w-[400px] p-4 rounded-md border shadow-xl bg-card text-card-foreground transition-all duration-200"
        title={`${title}: ${typeof content === 'string' ? content : ''}`}
      >
        <div className="flex flex-col items-start gap-3">
          <Badge className={badge.className}>{badge.children}</Badge>
          <div className="text-sm font-bold">{title}</div>
          <div className="text-sm opacity-90">{content}</div>
        </div>
      </div>
    </div>
  )
}

export default EasterEgg
