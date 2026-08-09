/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        taupe: '#8b7355',   // brun chaud — élégant sur lin
        mocha: '#6b4c3b',   // brun profond — très lisible
        sage: '#7a8c6e',   // vert doux — harmonie avec l'olive sans être trop foncé
        moka: '#5c4a3a',   // chocolat chaud — raffiné
        basmala: '#8a7a45', 
        burgundy: {
          light: '#a23e48',
          DEFAULT: '#800020',
          dark: '#5a0016',
        },
        olive: {
          light: '#a9ba9d',
          DEFAULT: '#556b2f',
          dark: '#394e18',
          yellow: '#4f4e02',
        },
        cream: {
          light: '#fdfbf7',
          DEFAULT: '#f5f2eb',
          dark: '#e8e2d5',
        },
        gold: {
          light: '#f3e5ab',
          DEFAULT: '#d4af37',
          dark: '#aa8c2c',
        }
      },
      spacing: {
        'rsvp-offset': 'clamp(-100px, -8vw, -80px)'
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        title: ['"Playfair Display"', 'serif'],
        roundhand: ['Roundhand', 'cursive'],
        bogue: ['Bogue', 'serif'],
        'great': ['Great Vibes', 'cursive'],

        // Variantes de Bogue par poids
        'bogue-normal': ['Bogue', 'serif'],
        'bogue-medium': ['Bogue', 'serif'],
        'bogue-semibold': ['Bogue', 'serif'],
        'bogue-bold': ['Bogue', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
