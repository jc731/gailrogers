/**
 * Spacing constants for consistent padding patterns across the codebase.
 * 
 * These constants provide a single source of truth for section padding,
 * making it easier to maintain consistent spacing and update global spacing values.
 */

// Standard horizontal padding pattern (mobile-first responsive)
export const PADDING_X_STANDARD = 'px-4 md:px-6 lg:px-8';

// Compact horizontal padding pattern (for tighter layouts)
export const PADDING_X_COMPACT = 'px-2 md:px-3 lg:px-4';

// Vertical padding patterns
export const PADDING_Y_STANDARD = 'py-12';
export const PADDING_Y_COMPACT = 'py-6';
export const PADDING_Y_LARGE = 'py-20';

// Combined padding patterns (most common)
export const PADDING_STANDARD = `${PADDING_Y_STANDARD} ${PADDING_X_STANDARD}`;
export const PADDING_COMPACT = `${PADDING_Y_COMPACT} ${PADDING_X_COMPACT}`;
export const PADDING_STANDARD_COMPACT_X = `${PADDING_Y_STANDARD} ${PADDING_X_COMPACT}`; // py-12 with compact horizontal padding
export const PADDING_STANDARD_Y_ONLY = PADDING_Y_STANDARD;
export const PADDING_X_ONLY = PADDING_X_STANDARD;
