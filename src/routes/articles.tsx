import { createFileRoute } from '@tanstack/react-router'

import { TemplatePage } from '@/components/pages/TemplatePage'

export const Route = createFileRoute('/articles')({
  component: () => <TemplatePage pageKey="articles" />,
})
