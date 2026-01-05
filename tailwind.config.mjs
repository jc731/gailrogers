/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Maroon color palette for theme customization
        // This is the single source of truth for brand colors
        maroon: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c', // Primary maroon
          800: '#991b1b',
          900: '#7f1d1d', // Dark maroon
          950: '#450a0a',
        },
        // Brand colors - easily customizable for template reuse
        brand: {
          primary: '#7f1d1d',    // maroon-900
          primaryDark: '#991b1b', // maroon-800
          primaryLight: '#b91c1c', // maroon-700
          accent: '#dc2626',      // maroon-600
          hover: '#991b1b',        // maroon-800
          light: '#fecaca',        // maroon-200
        },
        // Heading colors matching original design
        heading: {
          main: '#6B2B1F',        // Reddish-brown for main headlines (h2)
          subheading: '#A88B4A',  // Golden-brown for subheadings (h3)
        },
      },
    },
  },
  plugins: [],
}

