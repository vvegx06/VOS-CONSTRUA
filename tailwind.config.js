/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B91C1C',
          dark: '#991B1B',
          light: '#FEE2E2',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F8FAFC',
          hover: '#F1F5F9',
        },
        border: {
          DEFAULT: '#E2E8F0',
          light: '#F1F5F9',
        },
        text: {
          DEFAULT: '#333333',
          secondary: '#333333',
          muted: '#9B9B9B',
        },
        success: {
          DEFAULT: '#059669',
          bg: '#ECFDF5',
        },
        warning: {
          DEFAULT: '#D97706',
          bg: '#FFFBEB',
        },
        danger: {
          DEFAULT: '#DC2626',
          bg: '#FEF2F2',
        },
        info: {
          DEFAULT: '#9B9B9B',
          bg: '#F3F3F3',
        },
      },
      fontFamily: {
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0,0,0,0.04)',
        sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        md: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '14px',
        xl: '20px',
      },
    },
  },
  plugins: [],
}
