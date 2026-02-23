import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F3',
        espresso: {
          DEFAULT: '#5D4037',
          light: '#795548',
          dark: '#3E2723',
          50: '#EFEBE9',
        },
        caramel: {
          DEFAULT: '#D4A574',
          light: '#E8C9A8',
          dark: '#B8834A',
        },
        chocolate: '#2C1810',
        mint: {
          DEFAULT: '#7CB69D',
          light: '#E8F5E9',
        },
        foam: '#F5F0EB',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.4s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-out forwards',
        expand: 'expand 0.3s ease-out forwards',
        bounceIn: 'bounceIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        expand: {
          from: { opacity: '0', maxHeight: '0' },
          to: { opacity: '1', maxHeight: '500px' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
