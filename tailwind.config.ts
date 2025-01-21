import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        gold: {
          400: '#D4AF37',
          500: '#C5A028',
        },
        primary: {
          900: '#1a1a1a',
          800: '#2d2d2d',
        }
      },
      scale: {
        '102': '1.02',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      transitionProperty: {
        'transform': 'transform',
      },
    },
  },
    animation: {
      'fade-up': 'fadeUp 0.5s ease-out forwards',
      'line-move': 'lineMove 3s infinite',
    },
    keyframes: {
      fadeUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      lineMove: {
        '0%': { 
          opacity: '0',
          transform: 'translateY(100%)'
        },
        '20%': {
          opacity: '0.5',
        },
        '80%': {
          opacity: '0.5',
        },
        '100%': { 
          opacity: '0',
          transform: 'translateY(-100%)'
        },
      },
    },
  plugins: [
    require('@tailwindcss/typography'),
    // Note: @tailwindcss/line-clamp is now included in tailwindcss core as 'line-clamp'
    function({ addUtilities }: { addUtilities: (utilities: Record<string, any>, variants?: string[]) => void }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
} satisfies Config;

export default config;