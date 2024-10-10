/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class', // Enable dark mode by adding the 'dark' class
  theme: {
    extend: {
      fontFamily: {
        sans: ['El Messiri', 'ui-sans-serif', 'system-ui'],
      },
      fontWeight: {
        thin: 300,
        normal: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
      },
      boxShadow: {
        'custom': '0 6px 20px 0 rgba(0, 0, 0, 0.19)', 
      },
      colors: {
        dark: {
          900: '#121212', // Dark background  2nd// Choice '#1a222c' 
          800: '#1E1E1E', // Slightly lighter 2nd// Choice '#24303f'  background bg-dark-800 dark:
          700: '#242424', // Card background  2nd// Choice '#313d4a'
        },
        light: {
          100: '#FAFAFA', // Main light background
          200: '#F5F5F5', // Secondary background
          300: '#E0E0E0', // Light card background
        },
        text: {
          primary: '#333333', // Primary text color
          secondary: '#666666', // Secondary text color text-text-primary dark:
          forDark: '#E0E0E0', // Text color for dark mode
        },
        accent: {
          blue: '#007BFF', // Accent blue
          green: '#4CAF50', // Accent green
          red: '#F44336', // Accent red
          yellow: '#FFC107', // Accent yellow
        },
        border: {
          light: '#DDDDDD', // Border for light mode
          dark: '#444444',  // Border for dark mode
        },
      },
    },
  },
  plugins: [],
}
