import { Activity, BarChart3, Bot, Brain, Globe, Wrench } from 'lucide-react'

import type { CSSVarTokens, TerminalColors, ThemeDefinition } from './types'

/**
 * One Dark Official Palette (Atom/VS Code Pro)
 */
export const oneDarkColors = {
  background: '#282c34',
  blue: '#61afef',
  comment: '#5c6370',
  cyan: '#56b6c2',
  foreground: '#abb2bf',
  green: '#98c379',
  gutter: '#4b5263',
  orange: '#d19a66',
  purple: '#c678dd',
  red: '#e06c75',
  selection: '#3e4452',
  yellow: '#e5c07b',
}

/**
 * One Light Official Palette
 */
const oneLightColors = {
  background: '#fafafa',
  blue: '#4078f2',
  comment: '#a0a1a7',
  cyan: '#0184bc',
  foreground: '#383a42',
  green: '#50a14f',
  gutter: '#dbdbdc',
  orange: '#986801',
  purple: '#a626a4',
  red: '#e45649',
  selection: '#eaeae8',
  yellow: '#c18401',
}

const lightCSSVars: CSSVarTokens = {
  '--accent-color': oneLightColors.blue,
  '--accent-light': 'rgba(64, 120, 242, 0.1)',
  '--bg-color': oneLightColors.background,
  '--border-color': '#dbdbdc',
  '--card-bg': '#ffffff',
  '--header-bg': '#f0f0f0',
  '--hover-color': '#f0f0f0',
  '--secondary-text': oneLightColors.comment,
  '--text-color': oneLightColors.foreground,
}

const darkCSSVars: CSSVarTokens = {
  '--accent-color': oneDarkColors.blue,
  '--accent-light': 'rgba(97, 175, 239, 0.15)',
  '--bg-color': oneDarkColors.background,
  '--border-color': '#181a1f',
  '--card-bg': '#21252b',
  '--header-bg': '#21252b',
  '--hover-color': '#2c313a',
  '--secondary-text': oneDarkColors.comment,
  '--text-color': oneDarkColors.foreground,
}

const createTerminalColors = (dk: boolean): TerminalColors => ({
  bg: dk ? oneDarkColors.background : oneLightColors.background,
  border: dk ? '#181a1f' : '#dbdbdc',
  command: dk ? oneDarkColors.purple : oneLightColors.purple,
  error: dk ? oneDarkColors.red : oneLightColors.red,
  header: dk ? '#21252b' : '#f0f0f0',
  highlight: dk ? oneDarkColors.yellow : oneLightColors.yellow,
  info: dk ? oneDarkColors.cyan : oneLightColors.cyan,
  muted: dk ? oneDarkColors.gutter : oneLightColors.gutter,
  param: dk ? oneDarkColors.orange : oneLightColors.orange,
  prompt: dk ? oneDarkColors.green : oneLightColors.green,
  secondary: dk ? oneDarkColors.comment : oneLightColors.comment,
  success: dk ? oneDarkColors.green : oneLightColors.green,
  tabBar: dk ? '#181a1f' : '#fafafa',
  text: dk ? oneDarkColors.foreground : oneLightColors.foreground,
  touchBar: dk ? '#21252b' : '#f5f5f5',
  warning: dk ? oneDarkColors.orange : oneLightColors.orange,
})

const createCategoryThemes = (dk: boolean) => ({
  data: {
    bg: dk ? 'rgba(152, 195, 121, 0.05)' : '#fafff4',
    border: dk ? oneDarkColors.green : oneLightColors.green,
    cmd: '$ jupyter execute',
    color: dk ? oneDarkColors.green : oneLightColors.green,
    glow: `rgba(152, 195, 121, ${dk ? '0.2' : '0.1'})`,
    icon: BarChart3,
    label: 'DATA / ML',
    stripe: `linear-gradient(180deg, ${dk ? oneDarkColors.green : oneLightColors.green}, transparent)`,
  },
  healthcare: {
    bg: dk ? 'rgba(86, 182, 194, 0.05)' : '#f4fdfd',
    border: dk ? oneDarkColors.cyan : oneLightColors.cyan,
    cmd: '$ python recommend.py',
    color: dk ? oneDarkColors.cyan : oneLightColors.cyan,
    glow: `rgba(86, 182, 194, ${dk ? '0.2' : '0.1'})`,
    icon: Activity,
    label: 'HEALTHCARE',
    stripe: `linear-gradient(180deg, ${dk ? oneDarkColors.cyan : oneLightColors.cyan}, transparent)`,
  },
  nlp: {
    bg: dk ? 'rgba(224, 108, 117, 0.05)' : '#fdf3f4',
    border: dk ? oneDarkColors.red : oneLightColors.red,
    cmd: '$ python train.py',
    color: dk ? oneDarkColors.red : oneLightColors.red,
    glow: `rgba(224, 108, 117, ${dk ? '0.2' : '0.1'})`,
    icon: Brain,
    label: 'NLP / AI',
    stripe: `linear-gradient(180deg, ${dk ? oneDarkColors.red : oneLightColors.red}, transparent)`,
  },
  robotics: {
    bg: dk ? 'rgba(198, 120, 221, 0.05)' : '#f5f0f9',
    border: dk ? oneDarkColors.purple : oneLightColors.purple,
    cmd: '$ ros2 launch planner',
    color: dk ? oneDarkColors.purple : oneLightColors.purple,
    glow: `rgba(198, 120, 221, ${dk ? '0.2' : '0.1'})`,
    icon: Bot,
    label: 'ROBOTICS',
    stripe: `linear-gradient(180deg, ${dk ? oneDarkColors.purple : oneLightColors.purple}, transparent)`,
  },
  tooling: {
    bg: dk ? 'rgba(209, 154, 102, 0.05)' : '#fffaf4',
    border: dk ? oneDarkColors.orange : oneLightColors.orange,
    cmd: '$ make install',
    color: dk ? oneDarkColors.orange : oneLightColors.orange,
    glow: `rgba(209, 154, 102, ${dk ? '0.2' : '0.1'})`,
    icon: Wrench,
    label: 'TOOLING',
    stripe: `linear-gradient(180deg, ${dk ? oneDarkColors.orange : oneLightColors.orange}, transparent)`,
  },
  'web-app': {
    bg: dk ? 'rgba(97, 175, 239, 0.05)' : '#f4faff',
    border: dk ? oneDarkColors.blue : oneLightColors.blue,
    cmd: '$ npm run dev',
    color: dk ? oneDarkColors.blue : oneLightColors.blue,
    glow: `rgba(97, 175, 239, ${dk ? '0.2' : '0.1'})`,
    icon: Globe,
    label: 'WEB / APP',
    stripe: `linear-gradient(180deg, ${dk ? oneDarkColors.blue : oneLightColors.blue}, transparent)`,
  },
})

export const oneDarkTheme: ThemeDefinition = {
  articleCategoryColors: {
    data: {
      bg: (dk) => (dk ? 'rgba(152, 195, 121, 0.15)' : 'rgba(80, 161, 79, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.green : oneLightColors.green),
    },
    healthcare: {
      bg: (dk) => (dk ? 'rgba(86, 182, 194, 0.15)' : 'rgba(1, 132, 188, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.cyan : oneLightColors.cyan),
    },
    nlp: {
      bg: (dk) => (dk ? 'rgba(224, 108, 117, 0.15)' : 'rgba(228, 86, 73, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.red : oneLightColors.red),
    },
    robotics: {
      bg: (dk) => (dk ? 'rgba(198, 120, 221, 0.15)' : 'rgba(166, 38, 164, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.purple : oneLightColors.purple),
    },
    tooling: {
      bg: (dk) => (dk ? 'rgba(209, 154, 102, 0.15)' : 'rgba(152, 104, 1, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.orange : oneLightColors.orange),
    },
    'web-app': {
      bg: (dk) => (dk ? 'rgba(97, 175, 239, 0.15)' : 'rgba(64, 120, 242, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.blue : oneLightColors.blue),
    },
  },
  categoryThemes: createCategoryThemes,
  cssVars: {
    dark: darkCSSVars,
    light: lightCSSVars,
  },
  name: 'One Dark',
  publicationVenueColors: {
    conference: {
      bg: (dk) => (dk ? 'rgba(97, 175, 239, 0.15)' : 'rgba(64, 120, 242, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.blue : oneLightColors.blue),
      label: 'CONFERENCE',
    },
    demo: {
      bg: (dk) => (dk ? 'rgba(209, 154, 102, 0.15)' : 'rgba(152, 104, 1, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.orange : oneLightColors.orange),
      label: 'DEMO TRACK',
    },
    journal: {
      bg: (dk) => (dk ? 'rgba(229, 192, 123, 0.15)' : 'rgba(193, 132, 1, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.yellow : oneLightColors.yellow),
      label: 'JOURNAL',
    },
    preprint: {
      bg: (dk) => (dk ? 'rgba(152, 195, 121, 0.15)' : 'rgba(80, 161, 79, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.green : oneLightColors.green),
      label: 'PREPRINT',
    },
    workshop: {
      bg: (dk) => (dk ? 'rgba(198, 120, 221, 0.15)' : 'rgba(166, 38, 164, 0.1)'),
      fg: (dk) => (dk ? oneDarkColors.purple : oneLightColors.purple),
      label: 'WORKSHOP',
    },
  },
  terminal: {
    colors: createTerminalColors,
    rainbow: [
      oneDarkColors.red,
      oneDarkColors.orange,
      oneDarkColors.yellow,
      oneDarkColors.green,
      oneDarkColors.cyan,
      oneDarkColors.blue,
      oneDarkColors.purple,
    ] as const,
  },
}
