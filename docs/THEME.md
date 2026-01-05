# Theme System Documentation

## Overview

The theme system provides a centralized color configuration that makes it easy to customize the website's appearance for future "billboard" template reuse.

## Color Configuration

All brand colors are defined in `tailwind.config.mjs` in the `theme.extend.colors` section. This is the **single source of truth** for all colors used throughout the application.

### Color Structure

The theme uses two color systems:

1. **Maroon Palette** (`maroon-*`): Full color scale from 50 (lightest) to 950 (darkest)
2. **Brand Colors** (`brand-*`): Semantic color names for easy customization

### Brand Colors

```javascript
brand: {
  primary: '#7f1d1d',      // Main brand color (maroon-900)
  primaryDark: '#991b1b',   // Darker variant (maroon-800)
  primaryLight: '#b91c1c',  // Lighter variant (maroon-700)
  accent: '#dc2626',        // Accent color (maroon-600)
  hover: '#991b1b',         // Hover state (maroon-800)
  light: '#fecaca',         // Light background (maroon-200)
}
```

### Heading Colors

```javascript
heading: {
  main: '#6B2B1F',        // Reddish-brown for main headlines (h2)
  subheading: '#A88B4A',  // Golden-brown for subheadings (h3)
}
```

These colors match the original website design and are automatically applied to headings in `richText` sections.

## Usage in Components

Components use semantic brand color names instead of hard-coded color values:

```astro
<!-- ✅ Good - Uses theme colors -->
<a class="text-brand-primary hover:text-brand-hover">Link</a>
<section class="bg-brand-primary text-white">Section</section>

<!-- ❌ Bad - Hard-coded colors -->
<a class="text-blue-900">Link</a>
<section class="bg-maroon-900">Section</section>
```

## Customizing Colors for Template Reuse

To customize colors for a new "billboard" website:

1. **Open `tailwind.config.mjs`**
2. **Update the `brand` color values** in `theme.extend.colors`:

```javascript
brand: {
  primary: '#YOUR_COLOR',      // Main brand color
  primaryDark: '#YOUR_DARK',  // Darker variant
  primaryLight: '#YOUR_LIGHT', // Lighter variant
  accent: '#YOUR_ACCENT',      // Accent color
  hover: '#YOUR_HOVER',        // Hover state
  light: '#YOUR_LIGHT_BG',     // Light background
}
```

3. **Optionally update the palette** if you want a full color scale:

```javascript
maroon: {
  50: '#lightest',
  100: '#lighter',
  // ... etc
  900: '#darkest',
}
```

4. **No component changes needed** - All components use `brand-*` semantic names

## Current Color Usage

### BaseLayout.astro
- `text-brand-primary`: Brand name, navigation links, phone number
- `hover:text-brand-primary`: Navigation link hover states
- `bg-brand-primary`: Skip to content focus state

### Hero.astro
- `from-brand-primary to-brand-primaryDark`: Gradient background
- `bg-brand-primary/70`: Overlay on background images
- `text-brand-primary`: CTA button text
- `hover:bg-brand-light`: CTA button hover

### CTABand.astro
- `bg-brand-primary`: Section background
- `text-brand-primary`: Primary CTA button text
- `hover:bg-brand-light`: Primary CTA button hover

### RichText.astro
- `heading-main` (#6B2B1F): Applied to `<h2>` elements - large, reddish-brown main headlines
- `heading-subheading` (#A88B4A): Applied to `<h3>` elements - golden-brown, all-caps subheadings
- Body text: Black (#000000) for paragraphs

## Color Palette Reference

The maroon palette provides a full range of shades:

- `maroon-50` to `maroon-200`: Light backgrounds, subtle accents
- `maroon-300` to `maroon-500`: Medium tones
- `maroon-600` to `maroon-800`: Primary brand colors
- `maroon-900` to `maroon-950`: Dark accents, text

## Best Practices

1. **Always use `brand-*` colors** in components, never hard-coded color values
2. **Use semantic names** (`primary`, `hover`, `accent`) rather than shade numbers
3. **Keep color definitions centralized** in `tailwind.config.mjs`
4. **Test color contrast** for accessibility (WCAG AA minimum)
5. **Document custom colors** if adding new brand color variants

## Accessibility

All color combinations should meet WCAG AA contrast requirements:
- Text on `brand-primary` background: ✅ White text (#ffffff)
- Text on white background: ✅ `brand-primary` text
- Hover states: ✅ Maintain sufficient contrast

## Future Enhancements

Potential improvements:
- Add dark mode support with theme variants
- Create theme presets for common color schemes
- Add theme validation to ensure all colors are defined
- Generate theme documentation automatically

