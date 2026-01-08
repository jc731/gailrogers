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
        // Using Tailwind red-900 (#991b1b) for warmer, darker reds
        brand: {
          primary: '#991b1b',    // red-900 - warmer, darker primary
          primaryDark: '#7f1d1d', // darker than red-900 for depth
          primaryLight: '#dc2626', // red-600 - lighter variant
          accent: '#dc2626',      // red-600
          hover: '#7f1d1d',        // darker hover state
          light: '#fecaca',        // red-200 - light variant
        },
        // Heading colors matching original design
        heading: {
          main: '#6B2B1F',        // Reddish-brown for main headlines (h2)
          subheading: '#A88B4A',  // Golden-brown for subheadings (h3)
        },
        // Accessible focus colors - high contrast for visibility
        focus: {
          ring: '#991b1b',        // brand-primary (red-900) for focus rings (high contrast)
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

