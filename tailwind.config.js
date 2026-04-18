import tailwindAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  plugins: [tailwindAnimate],
  theme: {
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        blink: 'blink 1s step-end infinite',
        pulse: 'pulse 2s infinite ease-in-out',
        rainbow: 'rainbow 3s linear infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'var(--accent-light)',
          foreground: 'var(--accent-color)',
        },
        background: 'var(--bg-color)',
        border: 'var(--border-color)',
        card: {
          DEFAULT: 'var(--card-bg)',
          foreground: 'var(--text-color)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'var(--text-color)',
        input: 'var(--border-color)',
        muted: {
          DEFAULT: 'var(--hover-color)',
          foreground: 'var(--secondary-text)',
        },
        popover: {
          DEFAULT: 'var(--card-bg)',
          foreground: 'var(--text-color)',
        },
        primary: {
          DEFAULT: 'var(--accent-color)',
          foreground: 'var(--bg-color)',
        },
        ring: 'var(--accent-color)',
        secondary: {
          DEFAULT: 'var(--hover-color)',
          foreground: 'var(--text-color)',
        },
      },
      fontFamily: {
        mono: ['Maple Mono CN', 'Maple Mono', 'monospace'],
        sans: ['Maple Mono CN', 'Maple Mono', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        rainbow: {
          '0%': { color: '#bf616a' },
          '17%': { color: '#d08770' },
          '33%': { color: '#ebcb8b' },
          '50%': { color: '#a3be8c' },
          '67%': { color: '#88c0d0' },
          '83%': { color: '#b48ead' },
          '100%': { color: '#bf616a' },
        },
      },
    },
  },
}
