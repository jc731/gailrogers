/**
 * Content utility functions for Astro Content Collections
 * 
 * These utilities provide consistent ways to work with content collections
 * across the codebase, reducing duplication and improving type safety.
 */

import type { CollectionEntry } from 'astro:content';

/**
 * Extract slug from a content collection entry
 * 
 * @param entry - Content collection entry
 * @returns The slug string (without file extension)
 * 
 * @example
 * ```ts
 * const slug = getSlugFromEntry(pageEntry);
 * // Returns: "contact" from "contact.md" or entry with slug: "contact"
 * ```
 */
export function getSlugFromEntry<T extends CollectionEntry<any>>(
  entry: T
): string {
  return entry.data.slug || entry.id.replace(/\.mdx?$/, '');
}

/**
 * Find a page entry by slug
 * 
 * @param pages - Array of page entries
 * @param slug - Slug to search for
 * @returns The matching page entry or undefined
 */
export function findPageBySlug<T extends CollectionEntry<'pages'>>(
  pages: T[],
  slug: string
): T | undefined {
  return pages.find(
    (page) => getSlugFromEntry(page) === slug || page.data.slug === slug
  );
}

/**
 * Get site settings from the site collection
 * 
 * @param siteEntries - Array of site collection entries
 * @returns The settings data or null if not found
 */
export function getSiteSettings<T extends CollectionEntry<'site'>>(
  siteEntries: T[]
): T['data'] | null {
  const settingsEntry = siteEntries.find((entry) => entry.id === 'settings');
  return settingsEntry?.data || null;
}




