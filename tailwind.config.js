/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1a1a1a',
        'bg-card': '#252525',
        'border-card': '#3a3a3a',
        'text-primary': '#e8e4df',
        'text-secondary': '#9a9690',
        'accent': '#f5a623',
        'glow': 'rgba(245, 166, 35, 0.15)',
        'glow-strong': 'rgba(245, 166, 35, 0.3)',
      },
      fontFamily: {
        'digital': ['Orbitron', 'monospace'],
        'jp': ['Noto Sans JP', 'sans-serif'],
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'breath': 'breath 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 166, 35, 0.1), inset 0 0 20px rgba(245, 166, 35, 0.05)' },
          '50%': { boxShadow: '0 0 30px rgba(245, 166, 35, 0.2), inset 0 0 30px rgba(245, 166, 35, 0.1)' },
        },
        breath: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
