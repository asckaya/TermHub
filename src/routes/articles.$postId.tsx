import { createFileRoute } from '@tanstack/react-router'

import { PostPage } from '@/components/pages/PostPage'

export const Route = createFileRoute('/articles/$postId')({
  component: PostPage,
})
