export const withBase = (path?: string) => {
  if (!path) return path
  const clean = path.startsWith('/') ? path.slice(1) : path
  const baseEnv = import.meta.env.BASE_URL as string | undefined
  const base = baseEnv && baseEnv !== '' ? baseEnv : '/'
  const normalized = base.endsWith('/') ? base : base + '/'
  return normalized + clean
}

export const linkIcon = (url: string): string => {
  if (!url) return 'lucide:external-link'
  if (url.includes('github.com')) return 'mdi:github'
  if (url.includes('medium.com')) return 'simple-icons:medium'
  if (url.includes('youtu.be') || url.includes('youtube.com')) return 'simple-icons:youtube'
  if (url.includes('zhihu.com')) return 'simple-icons:zhihu'
  if (url.includes('csdn.net')) return 'simple-icons:csdn'
  return 'lucide:external-link'
}
