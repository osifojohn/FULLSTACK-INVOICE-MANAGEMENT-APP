/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      'small-text': '0.875rem',
      'extra-small-text': '0.7em',
    },
    height: {
      'nav-height': '6rem',
    },
    extend: {
      textColor: {
        grey: '#102a43',
      },
      fontFamily: {
        headingFont: ['Roboto Condensed', 'Sans-Serif'],
        bodyFont: ['Cabin', 'Sans-Serif'],
      },
      colors: {
        /* colors */
        'primary-50': '#eff6ff',
        'primary-100': '#dbeafe',
        'primary-200': '#bfdbfe',
        'primary-300': '#93c5fd',
        'primary-400': '#60a5fa',
        'primary-500': '#3b82f6',
        'primary-600': '#2563eb',
        'primary-700': '#1d4ed8',
        'primary-800': '#1e40af',
        'primary-900': '#1e3a8a',
        /* grey */
        'grey-50': '#f0f4f8',
        'grey-100': '#d9e2ec',
        'grey-200': '#bcccdc',
        'grey-300': '#9fb3c8',
        'grey-400': '#829ab1',
        'grey-500': '#627d98',
        'grey-600': '#486581',
        'grey-700': '#334e68',
        'grey-800': '#243b53',
        'grey-900': '#102a43',
        /* rest of the colors */
        black: '#222',
        white: '#fff',
        'red-light': '#f8d7da',
        'red-dark': '#842029',
        'green-light': '#d1e7dd',
        'green-dark': ' #0f5132',
        'grey-900': '#102a43',
      },
      boxShadow: {
        'shadow-1':
          '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'shadow-2':
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'shadow-3':
          '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'shadow-4':
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      screens: {
        phone: { max: '600px' },
        tabPort: { max: '900px' },
        tabLand: { max: '1200px' },
      },
    },
  },
  plugins: [],
};
