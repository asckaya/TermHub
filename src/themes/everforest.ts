import { FaBrain, FaChartBar, FaGlobe, FaHeartbeat, FaRobot, FaWrench } from 'react-icons/fa'

import type { CSSVarTokens, TerminalColors, ThemeDefinition } from './types'

/**
 * Everforest Official Palette (Dark Hard)
 * https://github.com/sainnhe/everforest
 */
export const everforestDarkColors = {
  aqua: '#83c092',
  bg0: '#272e33',
  bg1: '#2e383c',
  bg2: '#374145',
  bg3: '#414b50',
  bg4: '#495156',
  bg5: '#4f5b58',
  bg_dim: '#1e2326',
  blue: '#7fbbb3',
  fg: '#d3c6aa',
  green: '#a7c080',
  grey0: '#7a8478',
  grey1: '#859289',
  grey2: '#9da9a0',
  orange: '#e69875',
  purple: '#d699b6',
  red: '#e67e80',
  yellow: '#dbbc7f',
}

/**
 * Everforest Official Palette (Light Hard)
 */
const everforestLightColors = {
  aqua: '#35a77c',
  bg0: '#fffbef',
  bg1: '#f8f5e4',
  bg2: '#f2efdf',
  bg3: '#edeada',
  bg4: '#e8e5d5',
  blue: '#3a94c5',
  fg: '#5c6a72',
  green: '#8da101',
  grey0: '#a6b0a0',
  grey1: '#939f91',
  orange: '#f57d26',
  purple: '#df69ba',
  red: '#f85552',
  yellow: '#dfa000',
}

const lightCSSVars: CSSVarTokens = {
  '--accent-color': everforestLightColors.green,
  '--accent-light': 'rgba(141, 161, 1, 0.1)',
  '--bg-color': everforestLightColors.bg0,
  '--border-color': everforestLightColors.bg4,
  '--card-bg': '#ffffff',
  '--header-bg': everforestLightColors.bg1,
  '--hover-color': everforestLightColors.bg1,
  '--secondary-text': everforestLightColors.grey1,
  '--text-color': everforestLightColors.fg,
}

const darkCSSVars: CSSVarTokens = {
  '--accent-color': everforestDarkColors.green,
  '--accent-light': 'rgba(167, 192, 128, 0.15)',
  '--bg-color': everforestDarkColors.bg0,
  '--border-color': 'rgba(0,0,0,0.2)',
  '--card-bg': everforestDarkColors.bg_dim,
  '--header-bg': everforestDarkColors.bg1,
  '--hover-color': everforestDarkColors.bg1,
  '--secondary-text': everforestDarkColors.grey1,
  '--text-color': everforestDarkColors.fg,
}

const createTerminalColors = (dk: boolean): TerminalColors => ({
  bg: dk ? everforestDarkColors.bg0 : everforestLightColors.bg0,
  border: dk ? 'rgba(0,0,0,0.2)' : everforestLightColors.bg4,
  command: dk ? everforestDarkColors.green : everforestLightColors.green,
  error: dk ? everforestDarkColors.red : everforestLightColors.red,
  header: dk ? everforestDarkColors.bg1 : everforestLightColors.bg1,
  highlight: dk ? everforestDarkColors.yellow : everforestLightColors.yellow,
  info: dk ? everforestDarkColors.blue : everforestLightColors.blue,
  muted: dk ? everforestDarkColors.grey0 : everforestLightColors.grey0,
  param: dk ? everforestDarkColors.orange : everforestLightColors.orange,
  prompt: dk ? everforestDarkColors.aqua : everforestLightColors.aqua,
  secondary: dk ? everforestDarkColors.grey1 : everforestLightColors.grey1,
  success: dk ? everforestDarkColors.green : everforestLightColors.green,
  tabBar: dk ? '#272e33' : '#fffbef',
  text: dk ? everforestDarkColors.fg : everforestLightColors.fg,
  touchBar: dk ? '#1e2326' : '#f2efdf',
  warning: dk ? everforestDarkColors.orange : everforestLightColors.orange,
})

const createCategoryThemes = (dk: boolean) => ({
  data: {
    bg: dk ? 'rgba(167, 192, 128, 0.05)' : '#f7faf2',
    border: dk ? everforestDarkColors.green : everforestLightColors.green,
    cmd: '$ jupyter execute',
    color: dk ? everforestDarkColors.green : everforestLightColors.green,
    glow: `rgba(167, 192, 128, ${dk ? '0.2' : '0.1'})`,
    icon: FaChartBar,
    label: 'DATA / ML',
    stripe: `linear-gradient(180deg, ${dk ? everforestDarkColors.green : everforestLightColors.green}, transparent)`,
  },
  healthcare: {
    bg: dk ? 'rgba(131, 192, 146, 0.05)' : '#f2faf4',
    border: dk ? everforestDarkColors.aqua : everforestLightColors.aqua,
    cmd: '$ python recommend.py',
    color: dk ? everforestDarkColors.aqua : everforestLightColors.aqua,
    glow: `rgba(131, 192, 146, ${dk ? '0.2' : '0.1'})`,
    icon: FaHeartbeat,
    label: 'HEALTHCARE',
    stripe: `linear-gradient(180deg, ${dk ? everforestDarkColors.aqua : everforestLightColors.aqua}, transparent)`,
  },
  nlp: {
    bg: dk ? 'rgba(230, 126, 128, 0.05)' : '#fef4f4',
    border: dk ? everforestDarkColors.red : everforestLightColors.red,
    cmd: '$ python train.py',
    color: dk ? everforestDarkColors.red : everforestLightColors.red,
    glow: `rgba(230, 126, 128, ${dk ? '0.2' : '0.1'})`,
    icon: FaBrain,
    label: 'NLP / AI',
    stripe: `linear-gradient(180deg, ${dk ? everforestDarkColors.red : everforestLightColors.red}, transparent)`,
  },
  robotics: {
    bg: dk ? 'rgba(214, 153, 182, 0.05)' : '#fdf4f8',
    border: dk ? everforestDarkColors.purple : everforestLightColors.purple,
    cmd: '$ ros2 launch planner',
    color: dk ? everforestDarkColors.purple : everforestLightColors.purple,
    glow: `rgba(214, 153, 182, ${dk ? '0.2' : '0.1'})`,
    icon: FaRobot,
    label: 'ROBOTICS',
    stripe: `linear-gradient(180deg, ${dk ? everforestDarkColors.purple : everforestLightColors.purple}, transparent)`,
  },
  tooling: {
    bg: dk ? 'rgba(230, 152, 117, 0.05)' : '#fff6f2',
    border: dk ? everforestDarkColors.orange : everforestLightColors.orange,
    cmd: '$ make install',
    color: dk ? everforestDarkColors.orange : everforestLightColors.orange,
    glow: `rgba(230, 152, 117, ${dk ? '0.2' : '0.1'})`,
    icon: FaWrench,
    label: 'TOOLING',
    stripe: `linear-gradient(180deg, ${dk ? everforestDarkColors.orange : everforestLightColors.orange}, transparent)`,
  },
  'web-app': {
    bg: dk ? 'rgba(127, 187, 179, 0.05)' : '#f4fbf9',
    border: dk ? everforestDarkColors.blue : everforestLightColors.blue,
    cmd: '$ npm run dev',
    color: dk ? everforestDarkColors.blue : everforestLightColors.blue,
    glow: `rgba(127, 187, 179, ${dk ? '0.2' : '0.1'})`,
    icon: FaGlobe,
    label: 'WEB / APP',
    stripe: `linear-gradient(180deg, ${dk ? everforestDarkColors.blue : everforestLightColors.blue}, transparent)`,
  },
})

export const everforestTheme: ThemeDefinition = {
  articleCategoryColors: {
    data: {
      bg: (dk) => (dk ? 'rgba(167, 192, 128, 0.15)' : 'rgba(141, 161, 1, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.green : everforestLightColors.green),
    },
    healthcare: {
      bg: (dk) => (dk ? 'rgba(131, 192, 146, 0.15)' : 'rgba(53, 167, 124, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.aqua : everforestLightColors.aqua),
    },
    nlp: {
      bg: (dk) => (dk ? 'rgba(230, 126, 128, 0.15)' : 'rgba(248, 85, 82, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.red : everforestLightColors.red),
    },
    robotics: {
      bg: (dk) => (dk ? 'rgba(214, 153, 182, 0.15)' : 'rgba(223, 105, 186, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.purple : everforestLightColors.purple),
    },
    tooling: {
      bg: (dk) => (dk ? 'rgba(230, 152, 117, 0.15)' : 'rgba(245, 125, 38, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.orange : everforestLightColors.orange),
    },
    'web-app': {
      bg: (dk) => (dk ? 'rgba(127, 187, 179, 0.15)' : 'rgba(58, 148, 197, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.blue : everforestLightColors.blue),
    },
  },
  categoryThemes: createCategoryThemes,
  cssVars: {
    dark: darkCSSVars,
    light: lightCSSVars,
  },
  name: 'Everforest',
  publicationVenueColors: {
    conference: {
      bg: (dk) => (dk ? 'rgba(127, 187, 179, 0.15)' : 'rgba(58, 148, 197, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.blue : everforestLightColors.blue),
      label: 'CONFERENCE',
    },
    demo: {
      bg: (dk) => (dk ? 'rgba(230, 152, 117, 0.15)' : 'rgba(245, 125, 38, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.orange : everforestLightColors.orange),
      label: 'DEMO TRACK',
    },
    journal: {
      bg: (dk) => (dk ? 'rgba(219, 188, 127, 0.15)' : 'rgba(223, 160, 0, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.yellow : everforestLightColors.yellow),
      label: 'JOURNAL',
    },
    preprint: {
      bg: (dk) => (dk ? 'rgba(167, 192, 128, 0.15)' : 'rgba(141, 161, 1, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.green : everforestLightColors.green),
      label: 'PREPRINT',
    },
    workshop: {
      bg: (dk) => (dk ? 'rgba(214, 153, 182, 0.15)' : 'rgba(223, 105, 186, 0.1)'),
      fg: (dk) => (dk ? everforestDarkColors.purple : everforestLightColors.purple),
      label: 'WORKSHOP',
    },
  },
  terminal: {
    colors: createTerminalColors,
    rainbow: [
      everforestDarkColors.red,
      everforestDarkColors.orange,
      everforestDarkColors.yellow,
      everforestDarkColors.green,
      everforestDarkColors.blue,
      everforestDarkColors.purple,
      everforestDarkColors.aqua,
    ] as const,
  },
}
