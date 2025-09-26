/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#fff',
        },
        secondary: {
          DEFAULT: '#64748b',
          foreground: '#fff',
        },
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#fff',
        },
        accent: {
          DEFAULT: '#fbbf24',
          foreground: '#1e293b',
        },
        // Colores para badges y estados de tablas
        'chart-1': {
          DEFAULT: '#2563eb',
          foreground: '#fff',
        },
        'chart-2': {
          DEFAULT: '#22d3ee',
          foreground: '#0e172a',
        },
        'chart-3': {
          DEFAULT: '#22c55e',
          foreground: '#fff',
        },
        'chart-4': {
          DEFAULT: '#fbbf24',
          foreground: '#1e293b',
        },
        'chart-5': {
          DEFAULT: '#a78bfa',
          foreground: '#fff',
        },
        background: '#18181b',
        'sidebar': '#18181b',
        'sidebar-border': '#27272a',
        'sidebar-foreground': '#a1a1aa',
        'card': '#23232b',
        'card-foreground': '#f4f4f5',
        'muted-foreground': '#71717a',
        ring: '#2563eb',
        input: '#27272a',
      },
      borderColor: {
        DEFAULT: '#27272a',
        input: '#27272a',
        'sidebar-border': '#27272a',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

