/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        fg: 'var(--fg)',
        card: 'var(--card)',
        border: 'var(--border)',
        bg: 'var(--bg)',
        text: 'var(--text)',
        'text-h': 'var(--text-h)',
        'code-bg': 'var(--code-bg)',
      },
    },
  },
  plugins: [],
}

