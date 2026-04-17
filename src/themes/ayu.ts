import { FaBrain, FaChartBar, FaGlobe, FaHeartbeat, FaRobot, FaWrench } from 'react-icons/fa'

import type { CSSVarTokens, TerminalColors, ThemeDefinition } from './types'

/**
 * Ayu Light colors
 */
const ayuLight = {
  accent: '#f29718',
  bg: '#fafafa',
  comment: '#abb0b6',
  constant: '#a37acc',
  entity: '#399ee6',
  error: '#ff3333',
  fg: '#5c6773',
  func: '#f29718',
  keyword: '#ff7733',
  markup: '#f07171',
  regexp: '#4cbf99',
  special: '#e6ba7e',
  string: '#86b300',
  tag: '#41a6d9',
  ui: '#8a9199',
}

/**
 * Ayu Dark colors
 */
const ayuDark = {
  accent: '#e6b450',
  bg: '#0b0e14',
  comment: '#626a73',
  constant: '#ffee99',
  entity: '#59c2ff',
  error: '#ff3333',
  fg: '#b3b1ad',
  func: '#ffb454',
  keyword: '#ff8f40',
  markup: '#f07178',
  regexp: '#95e6cb',
  special: '#e1d6b0',
  string: '#c2d94c',
  tag: '#39bae6',
  ui: '#3d424d',
}

/**
 * Ayu Mirage colors
 */
const ayuMirage = {
  accent: '#ffcc66',
  bg: '#1f2430',
  comment: '#5c6773',
  constant: '#d4bfff',
  entity: '#73d0ff',
  error: '#ff3333',
  fg: '#cbccc6',
  func: '#ffcc66',
  keyword: '#ffa759',
  markup: '#f28779',
  regexp: '#95e6cb',
  special: '#ffe6b3',
  string: '#bae67e',
  tag: '#5ccfe6',
  ui: '#707a8c',
}

const lightCSSVars: CSSVarTokens = {
  '--accent-color': ayuLight.accent,
  '--accent-light': 'rgba(242,151,24,0.1)',
  '--bg-color': ayuLight.bg,
  '--border-color': '#e0e0e0',
  '--card-bg': '#ffffff',
  '--header-bg': '#f0f0f0',
  '--hover-color': '#f0f0f0',
  '--secondary-text': ayuLight.comment,
  '--text-color': ayuLight.fg,
}

const createTerminalColors = (colors: typeof ayuDark, dk: boolean): TerminalColors => ({
  bg: dk ? colors.bg : ayuLight.bg,
  border: dk ? 'rgba(255,255,255,0.1)' : '#e0e0e0',
  command: dk ? colors.keyword : ayuLight.keyword,
  error: dk ? colors.error : ayuLight.error,
  header: dk ? colors.ui : '#f0f0f0',
  highlight: dk ? colors.special : ayuLight.special,
  info: dk ? colors.entity : ayuLight.entity,
  muted: dk ? colors.ui : ayuLight.ui,
  param: dk ? colors.constant : ayuLight.constant,
  prompt: dk ? colors.tag : ayuLight.tag,
  secondary: dk ? colors.comment : ayuLight.comment,
  success: dk ? colors.string : ayuLight.string,
  tabBar: dk ? '#1a2026' : '#fafafa',
  text: dk ? colors.fg : ayuLight.fg,
  touchBar: dk ? '#151a1e' : '#f5f5f5',
  warning: dk ? colors.func : ayuLight.func,
})

const createCategoryThemes = (colors: typeof ayuDark, dk: boolean) => ({
  data: {
    bg: dk ? 'rgba(186,230,126,0.05)' : '#f7fee7',
    border: colors.string,
    cmd: '$ jupyter execute',
    color: colors.string,
    glow: `rgba(186,230,126, ${dk ? '0.15' : '0.08'})`,
    icon: FaChartBar,
    label: 'DATA / ML',
    stripe: `linear-gradient(180deg, ${colors.string}, transparent)`,
  },
  healthcare: {
    bg: dk ? 'rgba(242,135,121,0.05)' : '#fef2f2',
    border: colors.markup,
    cmd: '$ python recommend.py',
    color: colors.markup,
    glow: `rgba(242,135,121, ${dk ? '0.15' : '0.08'})`,
    icon: FaHeartbeat,
    label: 'HEALTHCARE',
    stripe: `linear-gradient(180deg, ${colors.markup}, transparent)`,
  },
  nlp: {
    bg: dk ? 'rgba(255,167,89,0.05)' : '#fff7ed',
    border: colors.keyword,
    cmd: '$ python train.py',
    color: colors.keyword,
    glow: `rgba(255,167,89, ${dk ? '0.15' : '0.08'})`,
    icon: FaBrain,
    label: 'NLP / AI',
    stripe: `linear-gradient(180deg, ${colors.keyword}, transparent)`,
  },
  robotics: {
    bg: dk ? 'rgba(115,208,255,0.05)' : '#f0f9ff',
    border: colors.entity,
    cmd: '$ ros2 launch planner',
    color: colors.entity,
    glow: `rgba(115,208,255, ${dk ? '0.15' : '0.08'})`,
    icon: FaRobot,
    label: 'ROBOTICS',
    stripe: `linear-gradient(180deg, ${colors.entity}, transparent)`,
  },
  tooling: {
    bg: dk ? 'rgba(149,230,203,0.05)' : '#f0fdf9',
    border: colors.regexp,
    cmd: '$ make install',
    color: colors.regexp,
    glow: `rgba(149,230,203, ${dk ? '0.15' : '0.08'})`,
    icon: FaWrench,
    label: 'TOOLING',
    stripe: `linear-gradient(180deg, ${colors.regexp}, transparent)`,
  },
  'web-app': {
    bg: dk ? 'rgba(255,204,102,0.05)' : '#fffbeb',
    border: colors.accent,
    cmd: '$ npm run dev',
    color: colors.accent,
    glow: `rgba(255,204,102, ${dk ? '0.15' : '0.08'})`,
    icon: FaGlobe,
    label: 'WEB / APP',
    stripe: `linear-gradient(180deg, ${colors.accent}, transparent)`,
  },
})

export const ayuDarkTheme: ThemeDefinition = {
  articleCategoryColors: {
    data: {
      bg: (dk) => (dk ? 'rgba(194,217,76,0.15)' : 'rgba(134,179,0,0.1)'),
      fg: (dk) => (dk ? ayuDark.string : ayuLight.string),
    },
    healthcare: {
      bg: (dk) => (dk ? 'rgba(240,113,120,0.15)' : 'rgba(240,113,113,0.1)'),
      fg: (dk) => (dk ? ayuDark.markup : ayuLight.markup),
    },
    nlp: {
      bg: (dk) => (dk ? 'rgba(255,143,64,0.15)' : 'rgba(255,119,51,0.1)'),
      fg: (dk) => (dk ? ayuDark.keyword : ayuLight.keyword),
    },
    robotics: {
      bg: (dk) => (dk ? 'rgba(57,186,230,0.15)' : 'rgba(65,166,217,0.1)'),
      fg: (dk) => (dk ? ayuDark.tag : ayuLight.tag),
    },
    tooling: {
      bg: (dk) => (dk ? 'rgba(149,230,203,0.15)' : 'rgba(76,191,153,0.1)'),
      fg: (dk) => (dk ? ayuDark.regexp : ayuLight.regexp),
    },
    'web-app': {
      bg: (dk) => (dk ? 'rgba(230,180,80,0.15)' : 'rgba(242,151,24,0.1)'),
      fg: (dk) => (dk ? ayuDark.accent : ayuLight.accent),
    },
  },
  categoryThemes: (dk) => createCategoryThemes(ayuDark, dk),
  cssVars: {
    dark: {
      '--accent-color': ayuDark.accent,
      '--accent-light': 'rgba(230,180,80,0.15)',
      '--bg-color': ayuDark.bg,
      '--border-color': 'rgba(255,255,255,0.1)',
      '--card-bg': '#0f131a',
      '--header-bg': '#0f131a',
      '--hover-color': '#151a24',
      '--secondary-text': ayuDark.comment,
      '--text-color': ayuDark.fg,
    },
    light: lightCSSVars,
  },
  name: 'Ayu Dark',
  publicationVenueColors: {
    conference: {
      bg: (dk) => (dk ? 'rgba(89,194,255,0.15)' : 'rgba(57,158,230,0.1)'),
      fg: (dk) => (dk ? ayuDark.entity : ayuLight.entity),
      label: 'CONFERENCE',
    },
    demo: {
      bg: (dk) => (dk ? 'rgba(255,180,84,0.15)' : 'rgba(242,151,24,0.1)'),
      fg: (dk) => (dk ? ayuDark.func : ayuLight.func),
      label: 'DEMO TRACK',
    },
    journal: {
      bg: (dk) => (dk ? 'rgba(255,238,153,0.15)' : 'rgba(230,186,126,0.1)'),
      fg: (dk) => (dk ? ayuDark.constant : ayuLight.special),
      label: 'JOURNAL',
    },
    preprint: {
      bg: (dk) => (dk ? 'rgba(194,217,76,0.15)' : 'rgba(134,179,0,0.1)'),
      fg: (dk) => (dk ? ayuDark.string : ayuLight.string),
      label: 'PREPRINT',
    },
    workshop: {
      bg: (dk) => (dk ? 'rgba(255,238,153,0.15)' : 'rgba(163,122,204,0.1)'),
      fg: (dk) => (dk ? ayuDark.constant : ayuLight.constant),
      label: 'WORKSHOP',
    },
  },
  terminal: {
    colors: (dk) => createTerminalColors(ayuDark, dk),
    rainbow: ['#ff3333', '#f29718', '#ff7733', '#86b300', '#41a6d9', '#399ee6', '#a37acc'] as const,
  },
}

export const ayuMirageTheme: ThemeDefinition = {
  articleCategoryColors: ayuDarkTheme.articleCategoryColors, // Can reuse logic or customize
  categoryThemes: (dk) => createCategoryThemes(ayuMirage, dk),
  cssVars: {
    dark: {
      '--accent-color': ayuMirage.accent,
      '--accent-light': 'rgba(255,204,102,0.15)',
      '--bg-color': ayuMirage.bg,
      '--border-color': 'rgba(255,255,255,0.1)',
      '--card-bg': '#242936',
      '--header-bg': '#242936',
      '--hover-color': '#2a313d',
      '--secondary-text': ayuMirage.comment,
      '--text-color': ayuMirage.fg,
    },
    light: lightCSSVars,
  },
  name: 'Ayu Mirage',
  publicationVenueColors: ayuDarkTheme.publicationVenueColors,
  terminal: {
    colors: (dk) => createTerminalColors(ayuMirage, dk),
    rainbow: ['#ff3333', '#f29718', '#ff7733', '#86b300', '#41a6d9', '#399ee6', '#a37acc'] as const,
  },
}
