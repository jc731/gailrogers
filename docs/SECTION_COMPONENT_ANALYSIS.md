# Section Component Analysis

**Date:** 2026-01-08  
**Purpose:** Analysis of section component patterns to design a reusable Section wrapper component

## Current Section Components

1. **Hero** - `src/components/sections/Hero.astro`
2. **RichText** - `src/components/sections/RichText.astro`
3. **CardGrid** - `src/components/sections/CardGrid.astro`
4. **CTABand** - `src/components/sections/CTABand.astro`
5. **FAQ** - `src/components/sections/FAQ.astro`
6. **LinkButtons** - `src/components/sections/LinkButtons.astro`
7. **IconBanner** - `src/components/sections/IconBanner.astro`
8. **Slider** - `src/components/sections/Slider.astro` (special case - full width)
9. **ContactForm** - `src/components/forms/ContactForm.astro` (special case - unique styling)

## Common Patterns Identified

### Vertical Padding (py)
- **Most common:** `py-12` (RichText, CardGrid, FAQ, LinkButtons, IconBanner)
- **Hero:** `py-20` (larger vertical padding)
- **CTABand:** `py-12` with `my-8` (has margin in addition)
- **404 page:** `py-20`

### Horizontal Padding (px)
- **Most common:** `px-4 md:px-6 lg:px-8` (RichText, FAQ, LinkButtons, IconBanner, Hero)
- **CardGrid:** None (removed in recent refactor)
- **ContactForm:** `px-4 md:px-6 lg:px-8` on inner div

### Container Widths
- **max-w-4xl:** Hero, FAQ, CTABand
- **max-w-6xl:** RichText, CardGrid, LinkButtons, IconBanner
- **max-w-7xl:** Two-column layout wrapper (special case)
- **max-w-2xl:** 404 page (special case)

### Background Colors
- **Default:** Transparent/white
- **bg-gray-50:** FAQ
- **bg-brand-primaryDark:** CTABand
- **bg-gradient-to-r from-brand-primary to-brand-primaryDark:** Hero
- **Configurable:** IconBanner (supports multiple options)

### Text Alignment
- **Default:** Left
- **text-center:** CTABand content, FAQ title, LinkButtons title

### Vertical Margins (my)
- **CTABand:** `my-8` (addition to padding)

### Special Cases
- **Slider:** Full-width, no standard section wrapper needed
- **ContactForm:** Unique border styling, no container wrapper
- **Hero:** Has overlay div for background images
- **RichText:** Has `prose prose-lg max-w-none` classes on section element

## Proposed Section Component Interface

```typescript
interface SectionProps {
  // Content
  children: any;
  
  // Padding
  paddingY?: '8' | '12' | '20' | 'none'; // default: '12'
  paddingX?: boolean; // default: true (px-4 md:px-6 lg:px-8)
  marginY?: string; // optional margin classes (e.g., 'my-8')
  
  // Container
  container?: boolean; // default: true
  maxWidth?: '4xl' | '6xl' | '7xl' | 'full' | 'none'; // default: '4xl'
  
  // Styling
  backgroundColor?: string; // Tailwind class or custom
  textColor?: string; // Tailwind class
  className?: string; // Additional classes for section element
  
  // Content alignment
  centerContent?: boolean; // default: false (adds text-center to container)
  
  // Special
  fullWidth?: boolean; // default: false (removes container, full width)
}
```

## Migration Strategy

1. Create `Section.astro` component with all props
2. Update components one at a time (starting with simpler ones):
   - FAQ (simple case)
   - LinkButtons (simple case)
   - IconBanner (configurable background)
   - CardGrid (no horizontal padding)
   - CTABand (has margin, background, centered)
   - RichText (has prose classes)
   - Hero (has gradient, overlay, larger padding)
3. Test each migration
4. Keep ContactForm and Slider as-is (special cases)

## Benefits

- Single source of truth for section layout
- Consistent spacing across the site
- Easy to update layout globally
- Maintains flexibility for special cases
- Follows Astro component philosophy
