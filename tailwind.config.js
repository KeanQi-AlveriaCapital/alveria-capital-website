/** @type {import('tailwindcss').Config} */

// CENTRAL BREAKPOINT CONFIGURATION
// All breakpoints are defined here and can be accessed in CSS via Tailwind's utilities
const breakpoints = {
  mobile: '767px',     // Mobile (0-767px)
  tablet: '1299px',    // Tablet (768px-1299px)
  desktop: '1535px',   // Desktop (1300px-1535px)
  xl: '1920px'         // Extra large screens (1536px+)
};

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Make breakpoints available in CSS via custom properties
      '--breakpoint-mobile': breakpoints.mobile,
      '--breakpoint-tablet': breakpoints.tablet,
      '--breakpoint-desktop': breakpoints.desktop,
      '--breakpoint-xl': breakpoints.xl,
    },
    screens: {
      // These maintain standard Tailwind names for compatibility
      // But map to our semantic breakpoints
      'sm': '768px',              // Start of tablet
      'md': '1024px',             // Mid-tablet point
      'lg': '1300px',             // Start of desktop
      'xl': '1536px',             // Start of xl
      
      // Semantic screen names
      'mobile': '0px',
      'tablet': '768px',
      'desktop': '1300px',
      'extra-large': '1536px',
    },
  },
  plugins: [
    // Add this plugin to expose breakpoints as CSS variables
    function({ addBase }) {
      addBase({
        ':root': {
          '--breakpoint-mobile': breakpoints.mobile,
          '--breakpoint-tablet': breakpoints.tablet,
          '--breakpoint-desktop': breakpoints.desktop,
          '--breakpoint-xl': breakpoints.xl,
        }
      })
    }
  ],
} 