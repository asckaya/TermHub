import { Activity, BarChart3, Bot, Brain, Globe, Wrench } from 'lucide-react'

import type { CSSVarTokens, TerminalColors, ThemeDefinition } from './types'

/**
 * GitHub Official Primer Palette
 * https://primer.style/primitives/colors
 */
export const githubDarkColors = {
  accent: {
    emphasis: '#1f6feb',
    fg: '#58a6ff',
    subtle: 'rgba(56,139,253,0.15)',
  },
  attention: {
    emphasis: '#9e6a03',
    fg: '#d29922',
  },
  border: {
    default: '#30363d',
    muted: '#21262d',
    subtle: 'rgba(240,246,252,0.1)',
  },
  canvas: {
    default: '#0d1117',
    inset: '#010409',
    overlay: '#161b22',
    subtle: '#161b22',
  },
  danger: {
    emphasis: '#da3633',
    fg: '#f85149',
  },
  done: {
    emphasis: '#8957e5',
    fg: '#a371f7',
  },
  fg: {
    default: '#c9d1d9',
    muted: '#8b949e',
    onEmphasis: '#ffffff',
    subtle: '#6e7681',
  },
  severe: {
    emphasis: '#bd5300',
    fg: '#db6d28',
  },
  sponsors: {
    emphasis: '#bf4b8a',
    fg: '#db61a2',
  },
  success: {
    emphasis: '#238636',
    fg: '#3fb950',
  },
}

/**
 * GitHub Official Light Palette
 */
const githubLightColors = {
  accent: {
    emphasis: '#0550ae',
    fg: '#0969da',
    subtle: '#ddf4ff',
  },
  attention: {
    emphasis: '#7d4e00',
    fg: '#9a6700',
  },
  border: {
    default: '#d0d7de',
    muted: 'hsl(210deg 18% 87%)',
  },
  canvas: {
    default: '#ffffff',
    inset: '#eff1f3',
    subtle: '#f6f8fa',
  },
  danger: {
    emphasis: '#a0111f',
    fg: '#cf222e',
  },
  done: {
    emphasis: '#6e40c9',
    fg: '#8250df',
  },
  fg: {
    default: '#24292f',
    muted: '#57606a',
    subtle: '#6e7781',
  },
  success: {
    emphasis: '#116329',
    fg: '#1a7f37',
  },
}

const lightCSSVars: CSSVarTokens = {
  '--accent-color': githubLightColors.accent.fg,
  '--accent-light': githubLightColors.accent.subtle,
  '--bg-color': githubLightColors.canvas.default,
  '--border-color': githubLightColors.border.default,
  '--card-bg': '#ffffff',
  '--header-bg': githubLightColors.canvas.subtle,
  '--hover-color': githubLightColors.canvas.subtle,
  '--secondary-text': githubLightColors.fg.muted,
  '--text-color': githubLightColors.fg.default,
}

const darkCSSVars: CSSVarTokens = {
  '--accent-color': githubDarkColors.accent.fg,
  '--accent-light': githubDarkColors.accent.subtle,
  '--bg-color': githubDarkColors.canvas.default,
  '--border-color': githubDarkColors.border.default,
  '--card-bg': githubDarkColors.canvas.subtle,
  '--header-bg': githubDarkColors.canvas.subtle,
  '--hover-color': '#1f242c',
  '--secondary-text': githubDarkColors.fg.muted,
  '--text-color': githubDarkColors.fg.default,
}

const createTerminalColors = (dk: boolean): TerminalColors => ({
  bg: dk ? githubDarkColors.canvas.default : githubLightColors.canvas.default,
  border: dk ? githubDarkColors.border.default : githubLightColors.border.default,
  command: dk ? githubDarkColors.accent.fg : githubLightColors.accent.fg,
  error: dk ? githubDarkColors.danger.fg : githubLightColors.danger.fg,
  header: dk ? githubDarkColors.canvas.subtle : githubLightColors.canvas.subtle,
  highlight: dk ? githubDarkColors.attention.fg : githubLightColors.attention.fg,
  info: dk ? githubDarkColors.accent.fg : githubLightColors.accent.fg,
  muted: dk ? githubDarkColors.fg.subtle : githubLightColors.fg.subtle,
  param: dk ? githubDarkColors.done.fg : githubLightColors.done.fg,
  prompt: dk ? githubDarkColors.success.fg : githubLightColors.success.fg,
  secondary: dk ? githubDarkColors.fg.muted : githubLightColors.fg.muted,
  success: dk ? githubDarkColors.success.fg : githubLightColors.success.fg,
  tabBar: dk ? '#0d1117' : '#ffffff',
  text: dk ? githubDarkColors.fg.default : githubLightColors.fg.default,
  touchBar: dk ? '#010409' : '#f6f8fa',
  warning: dk ? githubDarkColors.severe.fg : githubLightColors.attention.fg,
})

const createCategoryThemes = (dk: boolean) => ({
  data: {
    bg: dk ? 'rgba(63, 185, 80, 0.05)' : '#f0fff4',
    border: dk ? githubDarkColors.success.fg : githubLightColors.success.fg,
    cmd: '$ jupyter execute',
    color: dk ? githubDarkColors.success.fg : githubLightColors.success.fg,
    glow: `rgba(63, 185, 80, ${dk ? '0.2' : '0.1'})`,
    icon: BarChart3,
    label: 'DATA / ML',
    stripe: `linear-gradient(180deg, ${dk ? githubDarkColors.success.fg : githubLightColors.success.fg}, transparent)`,
  },
  healthcare: {
    bg: dk ? 'rgba(248, 81, 73, 0.05)' : '#fff1f0',
    border: dk ? githubDarkColors.danger.fg : githubLightColors.danger.fg,
    cmd: '$ python recommend.py',
    color: dk ? githubDarkColors.danger.fg : githubLightColors.danger.fg,
    glow: `rgba(248, 81, 73, ${dk ? '0.2' : '0.1'})`,
    icon: Activity,
    label: 'HEALTHCARE',
    stripe: `linear-gradient(180deg, ${dk ? githubDarkColors.danger.fg : githubLightColors.danger.fg}, transparent)`,
  },
  nlp: {
    bg: dk ? 'rgba(219, 97, 162, 0.05)' : '#fff0f7',
    border: dk ? githubDarkColors.sponsors.fg : '#bf4b8a',
    cmd: '$ python train.py',
    color: dk ? githubDarkColors.sponsors.fg : '#bf4b8a',
    glow: `rgba(219, 97, 162, ${dk ? '0.2' : '0.1'})`,
    icon: Brain,
    label: 'NLP / AI',
    stripe: `linear-gradient(180deg, ${dk ? githubDarkColors.sponsors.fg : '#bf4b8a'}, transparent)`,
  },
  robotics: {
    bg: dk ? 'rgba(163, 113, 247, 0.05)' : '#f5f0ff',
    border: dk ? githubDarkColors.done.fg : githubLightColors.done.fg,
    cmd: '$ ros2 launch planner',
    color: dk ? githubDarkColors.done.fg : githubLightColors.done.fg,
    glow: `rgba(163, 113, 247, ${dk ? '0.2' : '0.1'})`,
    icon: Bot,
    label: 'ROBOTICS',
    stripe: `linear-gradient(180deg, ${dk ? githubDarkColors.done.fg : githubLightColors.done.fg}, transparent)`,
  },
  tooling: {
    bg: dk ? 'rgba(210, 153, 34, 0.05)' : '#fffbf0',
    border: dk ? githubDarkColors.attention.fg : githubLightColors.attention.fg,
    cmd: '$ make install',
    color: dk ? githubDarkColors.attention.fg : githubLightColors.attention.fg,
    glow: `rgba(210, 153, 34, ${dk ? '0.2' : '0.1'})`,
    icon: Wrench,
    label: 'TOOLING',
    stripe: `linear-gradient(180deg, ${dk ? githubDarkColors.attention.fg : githubLightColors.attention.fg}, transparent)`,
  },
  'web-app': {
    bg: dk ? 'rgba(88, 166, 255, 0.05)' : '#f0f7ff',
    border: dk ? githubDarkColors.accent.fg : githubLightColors.accent.fg,
    cmd: '$ npm run dev',
    color: dk ? githubDarkColors.accent.fg : githubLightColors.accent.fg,
    glow: `rgba(88, 166, 255, ${dk ? '0.2' : '0.1'})`,
    icon: Globe,
    label: 'WEB / APP',
    stripe: `linear-gradient(180deg, ${dk ? githubDarkColors.accent.fg : githubLightColors.accent.fg}, transparent)`,
  },
})

export const githubTheme: ThemeDefinition = {
  articleCategoryColors: {
    data: {
      bg: (dk) => (dk ? 'rgba(63, 185, 80, 0.15)' : 'rgba(26, 127, 55, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.success.fg : githubLightColors.success.fg),
    },
    healthcare: {
      bg: (dk) => (dk ? 'rgba(248, 81, 73, 0.15)' : 'rgba(207, 34, 46, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.danger.fg : githubLightColors.danger.fg),
    },
    nlp: {
      bg: (dk) => (dk ? 'rgba(219, 97, 162, 0.15)' : 'rgba(191, 75, 138, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.sponsors.fg : '#bf4b8a'),
    },
    robotics: {
      bg: (dk) => (dk ? 'rgba(163, 113, 247, 0.15)' : 'rgba(130, 80, 223, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.done.fg : githubLightColors.done.fg),
    },
    tooling: {
      bg: (dk) => (dk ? 'rgba(210, 153, 34, 0.15)' : 'rgba(154, 103, 0, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.attention.fg : githubLightColors.attention.fg),
    },
    'web-app': {
      bg: (dk) => (dk ? 'rgba(88, 166, 255, 0.15)' : 'rgba(9, 105, 218, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.accent.fg : githubLightColors.accent.fg),
    },
  },
  categoryThemes: createCategoryThemes,
  cssVars: {
    dark: darkCSSVars,
    light: lightCSSVars,
  },
  name: 'GitHub',
  publicationVenueColors: {
    conference: {
      bg: (dk) => (dk ? 'rgba(88, 166, 255, 0.15)' : 'rgba(9, 105, 218, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.accent.fg : githubLightColors.accent.fg),
      label: 'CONFERENCE',
    },
    demo: {
      bg: (dk) => (dk ? 'rgba(210, 153, 34, 0.15)' : 'rgba(154, 103, 0, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.attention.fg : githubLightColors.attention.fg),
      label: 'DEMO TRACK',
    },
    journal: {
      bg: (dk) => (dk ? 'rgba(219, 97, 162, 0.15)' : 'rgba(191, 75, 138, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.sponsors.fg : '#bf4b8a'),
      label: 'JOURNAL',
    },
    preprint: {
      bg: (dk) => (dk ? 'rgba(63, 185, 80, 0.15)' : 'rgba(26, 127, 55, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.success.fg : githubLightColors.success.fg),
      label: 'PREPRINT',
    },
    workshop: {
      bg: (dk) => (dk ? 'rgba(163, 113, 247, 0.15)' : 'rgba(130, 80, 223, 0.1)'),
      fg: (dk) => (dk ? githubDarkColors.done.fg : githubLightColors.done.fg),
      label: 'WORKSHOP',
    },
  },
  terminal: {
    colors: createTerminalColors,
    rainbow: [
      githubDarkColors.danger.fg,
      githubDarkColors.severe.fg,
      githubDarkColors.attention.fg,
      githubDarkColors.success.fg,
      githubDarkColors.accent.fg,
      githubDarkColors.done.fg,
      githubDarkColors.sponsors.fg,
    ] as const,
  },
}
