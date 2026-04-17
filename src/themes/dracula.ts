import { FaBrain, FaChartBar, FaGlobe, FaHeartbeat, FaRobot, FaWrench } from 'react-icons/fa'

import type { CSSVarTokens, TerminalColors, ThemeDefinition } from './types'

/**
 * Dracula Official Palette
 * https://draculatheme.com/contribute
 */
export const draculaColors = {
  background: '#282a36',
  comment: '#6272a4',
  currentLine: '#44475a',
  cyan: '#8be9fd',
  foreground: '#f8f8f2',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',
}

/**
 * Dracula Light (Custom logic using Dracula accents on light background)
 */
const draculaLight = {
  accent: '#bd93f9',
  bg: '#f8f8f2',
  comment: '#6272a4',
  fg: '#282a36',
  ui: '#e6e6e6',
}

const lightCSSVars: CSSVarTokens = {
  '--accent-color': draculaLight.accent,
  '--accent-light': 'rgba(189, 147, 249, 0.1)',
  '--bg-color': draculaLight.bg,
  '--border-color': '#d1d1d1',
  '--card-bg': '#ffffff',
  '--header-bg': '#efefef',
  '--hover-color': '#efefef',
  '--secondary-text': draculaLight.comment,
  '--text-color': draculaLight.fg,
}

const darkCSSVars: CSSVarTokens = {
  '--accent-color': draculaColors.purple,
  '--accent-light': 'rgba(189, 147, 249, 0.15)',
  '--bg-color': draculaColors.background,
  '--border-color': draculaColors.currentLine,
  '--card-bg': '#343746',
  '--header-bg': '#343746',
  '--hover-color': '#44475a',
  '--secondary-text': draculaColors.comment,
  '--text-color': draculaColors.foreground,
}

const createTerminalColors = (dk: boolean): TerminalColors => ({
  bg: dk ? draculaColors.background : draculaLight.bg,
  border: dk ? draculaColors.currentLine : '#d1d1d1',
  command: dk ? draculaColors.pink : '#c2185b',
  error: dk ? draculaColors.red : '#d32f2f',
  header: dk ? '#343746' : '#efefef',
  highlight: dk ? draculaColors.yellow : '#fbc02d',
  info: dk ? draculaColors.cyan : '#0097a7',
  muted: dk ? '#44475a' : '#9e9e9e',
  param: dk ? draculaColors.orange : '#e65100',
  prompt: dk ? draculaColors.green : '#388e3c',
  secondary: dk ? draculaColors.comment : draculaLight.comment,
  success: dk ? draculaColors.green : '#388e3c',
  tabBar: dk ? '#21222c' : '#f0f0f0',
  text: dk ? draculaColors.foreground : draculaLight.fg,
  touchBar: dk ? '#1e1f29' : '#e0e0e0',
  warning: dk ? draculaColors.orange : '#ef6c00',
})

const createCategoryThemes = (dk: boolean) => ({
  data: {
    bg: dk ? 'rgba(80, 250, 123, 0.05)' : '#f0fff4',
    border: draculaColors.green,
    cmd: '$ jupyter execute',
    color: draculaColors.green,
    glow: `rgba(80, 250, 123, ${dk ? '0.25' : '0.12'})`,
    icon: FaChartBar,
    label: 'DATA / ML',
    stripe: `linear-gradient(180deg, ${draculaColors.green}, transparent)`,
  },
  healthcare: {
    bg: dk ? 'rgba(255, 85, 85, 0.05)' : '#fff1f1',
    border: draculaColors.red,
    cmd: '$ python recommend.py',
    color: draculaColors.red,
    glow: `rgba(255, 85, 85, ${dk ? '0.25' : '0.12'})`,
    icon: FaHeartbeat,
    label: 'HEALTHCARE',
    stripe: `linear-gradient(180deg, ${draculaColors.red}, transparent)`,
  },
  nlp: {
    bg: dk ? 'rgba(255, 121, 198, 0.05)' : '#fff0f7',
    border: draculaColors.pink,
    cmd: '$ python train.py',
    color: draculaColors.pink,
    glow: `rgba(255, 121, 198, ${dk ? '0.25' : '0.12'})`,
    icon: FaBrain,
    label: 'NLP / AI',
    stripe: `linear-gradient(180deg, ${draculaColors.pink}, transparent)`,
  },
  robotics: {
    bg: dk ? 'rgba(189, 147, 249, 0.05)' : '#f3eaff',
    border: draculaColors.purple,
    cmd: '$ ros2 launch planner',
    color: draculaColors.purple,
    glow: `rgba(189, 147, 249, ${dk ? '0.25' : '0.12'})`,
    icon: FaRobot,
    label: 'ROBOTICS',
    stripe: `linear-gradient(180deg, ${draculaColors.purple}, transparent)`,
  },
  tooling: {
    bg: dk ? 'rgba(255, 184, 108, 0.05)' : '#fff8f0',
    border: draculaColors.orange,
    cmd: '$ make install',
    color: draculaColors.orange,
    glow: `rgba(255, 184, 108, ${dk ? '0.25' : '0.12'})`,
    icon: FaWrench,
    label: 'TOOLING',
    stripe: `linear-gradient(180deg, ${draculaColors.orange}, transparent)`,
  },
  'web-app': {
    bg: dk ? 'rgba(139, 233, 253, 0.05)' : '#f0fdff',
    border: draculaColors.cyan,
    cmd: '$ npm run dev',
    color: draculaColors.cyan,
    glow: `rgba(139, 233, 253, ${dk ? '0.25' : '0.12'})`,
    icon: FaGlobe,
    label: 'WEB / APP',
    stripe: `linear-gradient(180deg, ${draculaColors.cyan}, transparent)`,
  },
})

export const draculaTheme: ThemeDefinition = {
  articleCategoryColors: {
    data: {
      bg: (dk) => (dk ? 'rgba(80, 250, 123, 0.15)' : 'rgba(56, 142, 60, 0.1)'),
      fg: (dk) => (dk ? draculaColors.green : '#388e3c'),
    },
    healthcare: {
      bg: (dk) => (dk ? 'rgba(255, 85, 85, 0.15)' : 'rgba(211, 47, 47, 0.1)'),
      fg: (dk) => (dk ? draculaColors.red : '#d32f2f'),
    },
    nlp: {
      bg: (dk) => (dk ? 'rgba(255, 121, 198, 0.15)' : 'rgba(194, 24, 91, 0.1)'),
      fg: (dk) => (dk ? draculaColors.pink : '#c2185b'),
    },
    robotics: {
      bg: (dk) => (dk ? 'rgba(189, 147, 249, 0.15)' : 'rgba(123, 31, 162, 0.1)'),
      fg: (dk) => (dk ? draculaColors.purple : '#7b1fa2'),
    },
    tooling: {
      bg: (dk) => (dk ? 'rgba(255, 184, 108, 0.15)' : 'rgba(230, 81, 0, 0.1)'),
      fg: (dk) => (dk ? draculaColors.orange : '#e65100'),
    },
    'web-app': {
      bg: (dk) => (dk ? 'rgba(139, 233, 253, 0.15)' : 'rgba(0, 151, 167, 0.1)'),
      fg: (dk) => (dk ? draculaColors.cyan : '#0097a7'),
    },
  },
  categoryThemes: createCategoryThemes,
  cssVars: {
    dark: darkCSSVars,
    light: lightCSSVars,
  },
  name: 'Dracula',
  publicationVenueColors: {
    conference: {
      bg: (dk) => (dk ? 'rgba(139, 233, 253, 0.15)' : 'rgba(0, 151, 167, 0.1)'),
      fg: (dk) => (dk ? draculaColors.cyan : '#0097a7'),
      label: 'CONFERENCE',
    },
    demo: {
      bg: (dk) => (dk ? 'rgba(255, 184, 108, 0.15)' : 'rgba(230, 81, 0, 0.1)'),
      fg: (dk) => (dk ? draculaColors.orange : '#e65100'),
      label: 'DEMO TRACK',
    },
    journal: {
      bg: (dk) => (dk ? 'rgba(241, 250, 140, 0.15)' : 'rgba(251, 192, 45, 0.1)'),
      fg: (dk) => (dk ? draculaColors.yellow : '#f9a825'),
      label: 'JOURNAL',
    },
    preprint: {
      bg: (dk) => (dk ? 'rgba(80, 250, 123, 0.15)' : 'rgba(56, 142, 60, 0.1)'),
      fg: (dk) => (dk ? draculaColors.green : '#388e3c'),
      label: 'PREPRINT',
    },
    workshop: {
      bg: (dk) => (dk ? 'rgba(189, 147, 249, 0.15)' : 'rgba(123, 31, 162, 0.1)'),
      fg: (dk) => (dk ? draculaColors.purple : '#7b1fa2'),
      label: 'WORKSHOP',
    },
  },
  terminal: {
    colors: createTerminalColors,
    rainbow: [
      draculaColors.red,
      draculaColors.orange,
      draculaColors.yellow,
      draculaColors.green,
      draculaColors.cyan,
      draculaColors.purple,
      draculaColors.pink,
    ] as const,
  },
}
