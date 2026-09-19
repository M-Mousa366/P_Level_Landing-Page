/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.6' }],
        'sm': ['0.875rem', { lineHeight: '1.75' }],
        'base': ['1rem', { lineHeight: '1.8' }],
        'lg': ['1.125rem', { lineHeight: '1.8' }],
        'xl': ['1.25rem', { lineHeight: '1.65' }],
        '2xl': ['1.5rem', { lineHeight: '1.5' }],
        '3xl': ['1.875rem', { lineHeight: '1.4' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['2.875rem', { lineHeight: '1.2' }],
        '6xl': ['3.5rem', { lineHeight: '1.15' }],
      },

      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
        'full': '9999px',
      },

      colors: {
        navy: {
          950: '#060d1a',
          900: '#0d1b2e',
          800: '#0f2035',
          700: '#122438',
          600: '#1e3a56',
          500: '#2a4f70',
          400: '#3d6a8a',
        },
        base: '#eef2f7',
        subtle: '#e4eaf2',
        surface: '#ffffff',
        border: {
          DEFAULT: '#e2e8f0',
          strong: '#cbd5e1',
        },
        text: {
          DEFAULT: '#0d1b2e',
          secondary: '#475569',
          muted: '#94a3b8',
        },
        brand: {
          DEFAULT: '#00c896',
          hover: '#00b585',
          dark: '#009e75',
          light: '#e6faf5',
          muted: '#b3ede0',
        },
        sys1: { bg: '#EEF2F7', border: '#C7D4E4', text: '#2D4A6E', icon: '#D4E0EF', dot: '#4A7AB5' },
        sys2: { bg: '#EDF5FA', border: '#BFD9EC', text: '#1E5272', icon: '#CBE4F4', dot: '#3D87B8' },
        sys3: { bg: '#FBF5E8', border: '#E8D5A4', text: '#7A5C1E', icon: '#F2E4BB', dot: '#C9973A' },
        sys4: { bg: '#EEF6F1', border: '#BFD9C9', text: '#285C3A', icon: '#CBE8D4', dot: '#3D8C57' },
      },

      maxWidth: {
        'wrap': '1100px',
      },

      animation: {
        'fade-up': 'fadeUp 0.4s ease-out both',
        'fade-in': 'fadeIn 0.3s ease-out both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
