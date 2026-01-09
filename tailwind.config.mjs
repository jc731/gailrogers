/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Custom burgundy/maroon color palette based on logo color #6b2b1f
        // This is the single source of truth for brand colors
        maroon: {
          50: '#fdf4f2',
          100: '#fbe8e3',
          200: '#f6d1c7',
          300: '#efb3a3',
          400: '#e58d75',
          500: '#d96b4d',
          600: '#c75133',
          700: '#a6412a', // Base burgundy - close to #6b2b1f
          800: '#8a3626', // Slightly darker
          900: '#6b2b1f', // Logo color - primary brand color
          950: '#451a13', // Darkest variant
        },
        // Brand colors - easily customizable for template reuse
        // Using custom burgundy palette based on logo color #6b2b1f
        brand: {
          primary: '#6b2b1f',    // Logo color - main brand burgundy
          primaryDark: '#451a13', // Darkest variant for depth
          primaryLight: '#a6412a', // Lighter burgundy variant
          accent: '#c75133',      // Medium burgundy for accents
          hover: '#8a3626',        // Darker hover state
          light: '#f6d1c7',        // Light burgundy for backgrounds
        },
        // Heading colors matching original design
        heading: {
          main: '#6B2B1F',        // Reddish-brown for main headlines (h2)
          subheading: '#A88B4A',  // Golden-brown for subheadings (h3)
        },
        // Accessible focus colors - high contrast for visibility
        focus: {
          ring: '#6b2b1f',        // brand-primary (burgundy) for focus rings (high contrast)
          ringLight: '#ffffff',   // White for focus rings on dark backgrounds
        },
        // Dark slate for icon banners and dark sections
        slate: {
          dark: '#1e293b',        // slate-800 - dark slate without blue tones
          darker: '#0f172a',     // slate-900 - very dark slate
        },
      },
    },
  },
  plugins: [],
}

