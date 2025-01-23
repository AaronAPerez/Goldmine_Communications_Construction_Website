import { ButtonVariant, SectionVariant } from "@/types/theme";


export const buttonStyles: ButtonVariant = {
  primary: `
    bg-gold-400 hover:bg-gold-500 
    text-primary-900 font-medium 
    px-6 py-3 rounded-full 
    transition-all duration-200 
    hover:shadow-gold hover:scale-105
  `,
  secondary: `
    border-2 border-white 
    text-white hover:bg-white hover:text-primary-900 
    px-6 py-3 rounded-full 
    transition-all duration-200 
    hover:shadow-lg hover:scale-105
  `,
  outline: `
    border-2 border-gold-400 
    text-gold-400 hover:bg-gold-400 hover:text-primary-900 
    px-6 py-3 rounded-full 
    transition-all duration-200 
    hover:shadow-gold hover:scale-105
  `,
} as const;

export const sectionStyles: SectionVariant = {
  default: `py-16 md:py-24`,
  dark: `bg-primary-900 text-white`,
  light: `bg-light text-primary-900`,
  gradient: `bg-gradient-to-b from-white to-gray-50`,
} as const;
