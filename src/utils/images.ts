/**
 * Image utility functions for responsive images
 */

/**
 * Generate srcset string for responsive images
 * 
 * Takes an image path and generates a srcset with multiple sizes.
 * Assumes images follow the pattern: base-640w.webp, base-768w.webp, etc.
 * 
 * @param baseImagePath - Base image path (e.g., "/images/home-banner-slide-1.webp")
 * @param widths - Array of widths to include in srcset (default: [640, 768, 1024, 1280, 1920])
 * @returns srcset string or empty string if baseImagePath is invalid
 * 
 * @example
 * ```ts
 * const srcset = generateSrcset("/images/home-banner-slide-1.webp");
 * // Returns: "/images/home-banner-slide-1-640w.webp 640w, /images/home-banner-slide-1-768w.webp 768w, ..."
 * ```
 */
export function generateSrcset(
  baseImagePath: string,
  widths: number[] = [640, 768, 1024, 1280, 1920]
): string {
  if (!baseImagePath) return '';
  
  // Extract path parts
  const lastDotIndex = baseImagePath.lastIndexOf('.');
  if (lastDotIndex === -1) return baseImagePath; // No extension, return as-is
  
  const basePath = baseImagePath.substring(0, lastDotIndex);
  const extension = baseImagePath.substring(lastDotIndex);
  
  // Generate srcset entries
  const srcsetEntries = widths.map(width => {
    // Check if path already has a width suffix (e.g., -640w)
    // If so, replace it; otherwise add it
    const widthSuffix = `-${width}w`;
    let pathWithWidth = basePath;
    
    // Remove existing width suffix if present
    const widthSuffixPattern = /-\d+w$/;
    if (widthSuffixPattern.test(pathWithWidth)) {
      pathWithWidth = pathWithWidth.replace(widthSuffixPattern, '');
    }
    
    return `${pathWithWidth}${widthSuffix}${extension} ${width}w`;
  });
  
  return srcsetEntries.join(', ');
}
