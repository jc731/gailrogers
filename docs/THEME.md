# Theme System Documentation

## Overview

The theme system provides a centralized color configuration that makes it easy to customize the website's appearance for future "billboard" template reuse.

## Color Configuration

All brand colors are defined in the `@theme` block of `src/styles/global.css`. This is the **single source of truth** for all colors used throughout the application.

Tailwind CSS 4 is CSS-first: there is no `tailwind.config.mjs` in this project. The old `theme.extend.colors` JavaScript object has been replaced by CSS custom properties inside `@theme`.

### How `@theme` Names Become Utilities

A `--color-<name>` variable generates the matching `bg-<name>`, `text-<name>`, `border-<name>`, and `ring-<name>` utilities. Two naming rules carried over from the old JS config:

- **Dot-nesting collapses to a hyphen.** `brand.primary` became `--color-brand-primary`, which generates `bg-brand-primary`.
- **camelCase is preserved verbatim, and it is case-sensitive.** `--color-brand-primaryDark` generates `bg-brand-primaryDark` — **not** `bg-brand-primary-dark`. This is the single most error-prone thing about this theme. Writing `bg-brand-primary-dark`, `text-brand-primary-light`, or `ring-focus-ring-light` will silently produce no styles, because Tailwind will not find a matching variable. Always match the casing in `global.css` exactly: `primaryDark`, `primaryLight`, `ringLight`.

Non-color namespaces follow the same pattern with a different prefix. `maxWidth` moved to the `--container-*` namespace, **not** `--max-width-*`:

```css
--container-8xl: 88rem; /* generates max-w-8xl */
```

`@theme` is **additive**. `--color-slate-dark` and `--color-slate-darker` extend Tailwind's built-in slate palette rather than replacing it, so `bg-slate-800`, `text-slate-500`, and the rest of the default scale still work alongside `bg-slate-dark`.

### Color Structure

The theme uses two color systems:

1. **Maroon/Burgundy Palette** (`maroon-*`): Full color scale from 50 (lightest) to 950 (darkest), based on the logo color #6b2b1f
2. **Brand Colors** (`brand-*`): Semantic color names for easy customization

### Brand Colors

```css
--color-brand-primary: #6b2b1f; /* Main brand color - logo burgundy/maroon */
--color-brand-primaryDark: #451a13; /* Darkest variant for depth */
--color-brand-primaryLight: #a6412a; /* Lighter burgundy variant */
--color-brand-accent: #c75133; /* Medium burgundy for accents */
--color-brand-hover: #8a3626; /* Darker hover state */
--color-brand-light: #f6d1c7; /* Light burgundy for backgrounds */
--color-brand-navy: #2b3461; /* Logo text / navy for the Rogers wordmark */
```

### Heading Colors

```css
--color-heading-main: #6b2b1f; /* Reddish-brown for main headlines (h2) */
--color-heading-subheading: #8c733d; /* Golden-brown for h3 - darkened for WCAG AA contrast */
```

These colors match the original website design and are automatically applied to headings in `richText` sections.

### Focus and Neutral Colors

```css
--color-focus-ring: #6b2b1f; /* brand-primary (burgundy) for focus rings */
--color-focus-ringLight: #ffffff; /* White for focus rings on dark backgrounds */

--color-slate-dark: #1e293b; /* slate-800 - dark slate without blue tones */
--color-slate-darker: #0f172a; /* slate-900 - very dark slate */
```

## Usage in Components

Components use semantic brand color names instead of hard-coded color values:

```astro
<!-- ✅ Good - Uses theme colors -->
<a class="text-brand-primary hover:text-brand-hover">Link</a>
<section class="bg-brand-primary text-white">Section</section>

<!-- ❌ Bad - Hard-coded colors -->
<a class="text-blue-900">Link</a>
<section class="bg-maroon-900">Section</section>

<!-- ❌ Bad - Wrong casing, generates nothing -->
<section class="bg-brand-primary-dark">Section</section>
```

### Scoped `<style>` Blocks Need `@reference`

Astro compiles each scoped `<style>` block in a `.astro` file separately, so Tailwind 4 does not automatically see the project theme there. Any scoped block that uses `@apply` with these brand tokens must begin with:

```css
@reference "../../styles/global.css";
```

Without it, `@apply text-heading-subheading` fails to build because the token is unknown. This is in place today in `RichText.astro`, `RichTextWithForm.astro`, and `RichTextWithImage.astro`.

### Source Scanning Is Pinned to `src/`

`global.css` starts with:

```css
@import "tailwindcss" source(none);
@source "../../src";
```

`source(none)` disables Tailwind 4's automatic source detection, and `@source` restores the v3 `content` scope of `src/` only. Two consequences:

- Writing a Tailwind class name in a markdown file under `docs/` will **not** leak that class into the production bundle.
- Conversely, class names must live somewhere under `src/` to be generated at all. A class referenced only from outside `src/` will not exist in the built CSS.

## Customizing Colors for Template Reuse

To customize colors for a new "billboard" website:

1. **Open `src/styles/global.css`**
2. **Update the `brand` color values** in the `@theme` block:

```css
--color-brand-primary: #YOUR_COLOR; /* Main brand color */
--color-brand-primaryDark: #YOUR_DARK; /* Darker variant */
--color-brand-primaryLight: #YOUR_LIGHT; /* Lighter variant */
--color-brand-accent: #YOUR_ACCENT; /* Accent color */
--color-brand-hover: #YOUR_HOVER; /* Hover state */
--color-brand-light: #YOUR_LIGHT_BG; /* Light background */
--color-brand-navy: #YOUR_WORDMARK; /* Logo wordmark color */
```

3. **Optionally update the palette** if you want a full color scale:

```css
--color-maroon-50: #lightest;
--color-maroon-100: #lighter;
/* ... etc */
--color-maroon-900: #darkest;
```

4. **Keep the variable names unchanged** - including the camelCase segments - so existing utility class names keep resolving
5. **No component changes needed** - All components use `brand-*` semantic names

## Current Color Usage

### BaseLayout.astro
- `text-brand-primary`: Navigation links, active nav state, phone number
- `hover:text-brand-primary`: Navigation link hover states
- `bg-brand-light`: Mobile nav item background / hover
- `focus:bg-brand-primary`: Skip to content focus state

### Logo.astro
- `text-brand-navy` (#2b3461): Rogers wordmark and the line beneath it

### Hero.astro
- `bg-brand-primaryDark`: Base section background
- `bg-brand-primary/70`: Overlay on background images
- CTA uses the shared `Button` `white` variant: white background, `text-brand-primary`, `hover:bg-brand-light`

### Slider.astro
- `from-brand-primary to-brand-primaryDark`: Gradient background
- `bg-brand-primaryDark/70`: Overlay on slide images

### CTABand.astro
- `bg-slate-dark`: Section background
- CTAs use the shared `Button` variants (`white` = `text-brand-primary` with `hover:bg-brand-light`)

### RichText.astro
- `text-brand-primary` (#6b2b1f): Applied to `<h2>` elements - large, reddish-brown main headlines
- `text-heading-subheading` (#8C733D): Applied to `<h3>` elements - golden-brown, all-caps subheadings
- Body text: Black (#000000) for paragraphs

## Color Palette Reference

The maroon/burgundy palette provides a full range of shades based on the logo color #6b2b1f:

- `maroon-50` to `maroon-200`: Light backgrounds, subtle accents
- `maroon-300` to `maroon-500`: Medium tones
- `maroon-600` to `maroon-700`: Lighter burgundy variants
- `maroon-800` to `maroon-900`: Primary brand colors (logo color #6b2b1f is maroon-900)
- `maroon-950`: Darkest variant for depth

## Best Practices

1. **Always use `brand-*` colors** in components, never hard-coded color values
2. **Use semantic names** (`primary`, `hover`, `accent`) rather than shade numbers
3. **Keep color definitions centralized** in the `@theme` block of `src/styles/global.css`
4. **Match camelCase exactly** - `primaryDark`, not `primary-dark`
5. **Add `@reference "../../styles/global.css"`** to any scoped `<style>` block that `@apply`s a brand token
6. **Test color contrast** for accessibility (WCAG AA minimum)
7. **Document custom colors** if adding new brand color variants

## Accessibility

All color combinations should meet WCAG AA contrast requirements:
- Text on `brand-primary` background: ✅ White text (#ffffff)
- Text on white background: ✅ `brand-primary` text
- `heading-subheading` (#8C733D) on white: darkened from the original #A88B4A specifically to clear WCAG AA
- Hover states: ✅ Maintain sufficient contrast

## Future Enhancements

Potential improvements:
- Add dark mode support with theme variants
- Create theme presets for common color schemes
- Add theme validation to ensure all colors are defined
- Generate theme documentation automatically
