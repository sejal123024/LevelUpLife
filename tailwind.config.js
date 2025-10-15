/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C63FF',
          light: '#A78BFA',
          dark: '#5B54D6',
        },
        secondary: {
          DEFAULT: '#FFD43B',
          light: '#FFE066',
          dark: '#E6BF22',
        },
        success: '#00C851',
        error: '#FF3B30',
        background: {
          light: '#F9FAFB',
          dark: '#1C1C1E',
        },
        card: {
          light: '#FFFFFF',
          dark: '#2C2C2E',
        },
        text: {
          primary: '#1C1C1E',
          secondary: '#6E6E73',
          dark: '#E5E5EA',
        },
        navbar: '#F2F2F7',
      },
      fontFamily: {
        display: ['Poppins', 'SF Pro Display', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 30px rgba(108, 99, 255, 0.15)',
      },
      borderRadius: {
        'xl': '20px',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
