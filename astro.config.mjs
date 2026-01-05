import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(), 
    tailwind(), 
    icon({
      include: {
        'mdi': ['*'],
      }
    }),
    sitemap()
  ],
  output: 'static',
  // Site URL can be set via environment variable PUBLIC_SITE_URL
  // Falls back to site settings or localhost for development
  site: import.meta.env.PUBLIC_SITE_URL || import.meta.env.SITE || 'http://localhost:4321'
});

