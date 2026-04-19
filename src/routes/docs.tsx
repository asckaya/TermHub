import { createFileRoute } from '@tanstack/react-router'

import { TemplatePage } from '@/components/pages/TemplatePage'

export const Route = createFileRoute('/docs')({
  component: () => <TemplatePage pageKey="docs" />,
})
