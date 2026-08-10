import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    icon({
      include: {
        'mdi': ['*'],
      }
    }),
    // /thank-you/ is a noindex form-confirmation page; keep it out of the sitemap.
    sitemap({
      filter: (page) => !page.includes('/thank-you'),
    })
  ],
  output: 'static',
  // Tailwind v4 ships as a Vite plugin, not an Astro integration. The
  // @astrojs/tailwind integration it replaces was v3-only and is deprecated.
  vite: {
    plugins: [tailwindcss()],
  },
  // Production canonical origin. Drives canonical URLs, og:url and the sitemap.
  // NOTE: astro.config.mjs runs in Node before Vite, so `import.meta.env` is NOT
  // populated here - only `process.env` is. Override via PUBLIC_SITE_URL when
  // building for a preview domain.
  site: process.env.PUBLIC_SITE_URL || 'https://www.gailrogerslaw.com'
});

