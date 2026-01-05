/**
 * Template configuration
 * 
 * This file contains template-level settings that can be customized
 * for each site using this template.
 * 
 * For site-specific content, use src/content/site/settings.json
 */

/**
 * Site URL - used for sitemap generation and absolute URLs
 * 
 * Can be overridden via environment variable PUBLIC_SITE_URL
 * Falls back to localhost for development
 */
export const SITE_URL =
  import.meta.env.PUBLIC_SITE_URL ||
  import.meta.env.SITE ||
  'http://localhost:4321';

/**
 * Template metadata
 */
export const TEMPLATE_INFO = {
  name: 'Billboard Website Template',
  version: '1.0.0',
  description: 'A reusable Astro template for billboard-style websites',
} as const;

