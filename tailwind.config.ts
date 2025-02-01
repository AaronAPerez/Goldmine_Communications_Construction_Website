import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'


const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
        // Primary brand colors
        primary: {
          50: '#F7F7F7',
          100: '#E3E3E3',
          200: '#C8C8C8',
          300: '#A4A4A4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#222222',
        } as const,
        // Gold accent colors
        gold: {
          50: '#FFF9E6',
          100: '#FFF2CC',
          200: '#FFE699',
          300: '#FFD966',
          400: '#D4AF37', // Main brand gold
          500: '#BF9B30',
          600: '#A68729',
          700: '#8C7322',
          800: '#735F1C',
          900: '#594A15',
        } as const,
        // Additional accent colors
        accent: {
          success: '#10B981', // Green
          warning: '#F59E0B', // Amber
          error: '#EF4444',   // Red
          info: '#3B82F6',    // Blue
        } as const,
  		},
  		backgroundColor: {
  			dark: '#1A1A1A',
  			light: '#FAFAFA'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
                    ...defaultTheme.fontFamily.sans
                ],
  			heading: [
  				'Inter',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		boxShadow: {
  			gold: '0 4px 14px 0 rgba(212, 175, 55, 0.25)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'fade-up': 'fadeUp 0.5s ease-in-out'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config