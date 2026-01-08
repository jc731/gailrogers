# Mobile Layout Rules for Template

**Last Updated:** 2026-01-05  
**Target Viewports:** 360-390px (mobile-first)

## Core Principles

1. **Mobile-First Defaults**: Always define base styles for mobile, then layer `sm:`, `md:`, `lg:` breakpoints
2. **Text Must Never Overflow**: All text containers must have `break-words` or equivalent
3. **No Fixed Widths on Mobile**: Use `max-w-*` instead of fixed `w-*` for containers
4. **Consistent Padding**: Use `px-4` as minimum mobile padding, scale up with breakpoints
5. **No Content Hiding**: Never hide content on mobile without explicit user action

---

## Required Mobile Padding Rules

### Section-Level Padding
```html
<!-- Minimum mobile padding, scales up -->
<section class="px-4 md:px-6 lg:px-8">
```

### Container Padding
```html
<!-- Container with responsive padding -->
<div class="container mx-auto px-4 md:px-6 lg:px-8">
```

### Form Padding
```html
<!-- Forms: outer container has padding, inner form does not double up -->
<section class="px-4 md:px-6 lg:px-8">
  <form class="..."> <!-- No px-* here -->
```

**Rule:** Never nest padding classes that both apply on mobile (e.g., `px-4` inside `px-4`).

---

## Typography Scaling

### Headings
**Mobile-first approach:**
```html
<!-- ✅ CORRECT: Start small, scale up -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl break-words">

<!-- ❌ WRONG: Large on mobile, no scaling -->
<h1 class="text-4xl md:text-5xl">
```

### Standard Heading Sizes
- **H1 (Hero/Slider)**: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- **H2 (Section Titles)**: `text-2xl sm:text-3xl`
- **H3 (Subheadings)**: `text-lg sm:text-xl`
- **Body Text**: `text-base` (16px minimum)

### Word Breaking
**Always add `break-words` to:**
- All headings
- Paragraphs in content sections
- Card content
- Form labels and help text
- Footer text
- Any user-generated or Markdown content

```html
<!-- ✅ CORRECT -->
<h2 class="text-2xl break-words">{title}</h2>
<p class="break-words">{content}</p>

<!-- ❌ WRONG -->
<h2 class="text-2xl">{title}</h2>
<p>{content}</p>
```

---

## Allowed / Discouraged Tailwind Utilities

### ✅ Allowed (Mobile-Safe)
- `px-4`, `px-6`, `px-8` (responsive padding)
- `py-8`, `py-12` (vertical spacing)
- `text-2xl`, `text-xl`, `text-lg`, `text-base` (with breakpoints)
- `max-w-*` (container widths)
- `min-h-*` (minimum heights, not fixed)
- `break-words`, `break-all` (text wrapping)
- `container mx-auto` (centered containers)
- `grid grid-cols-1 md:grid-cols-*` (responsive grids)

### ❌ Discouraged (Mobile Problems)
- `w-screen` (can overflow on mobile)
- `min-w-*` on text containers (can cause overflow)
- `max-w-none` (removes containment)
- `h-screen` for content sections (viewport height issues)
- `overflow-hidden` on text containers (clips content)
- `text-xs` for body text (too small: 12px)
- `text-sm` for body text (too small: 14px, use `text-base` minimum)
- Fixed `h-[500px]` (use `min-h-*` instead)
- `inset-0` with fixed positioning (use explicit `top/left/right/bottom`)

---

## How to Safely Add New Sections

### Step 1: Base Structure
```astro
---
interface Props {
  title: string;
  content: string;
}
const { title, content } = Astro.props;
---

<section class="py-12 px-4 md:px-6 lg:px-8">
  <div class="container mx-auto max-w-4xl">
    <h2 class="text-2xl sm:text-3xl font-bold mb-4 break-words">{title}</h2>
    <div class="prose break-words" set:html={content} />
  </div>
</section>
```

### Step 2: Test Checklist
- [ ] Text wraps on 360px viewport
- [ ] No horizontal scrolling
- [ ] Headings are readable (minimum 16px for body, 20px+ for headings)
- [ ] Padding prevents edge-to-edge text
- [ ] Long words/URLs break properly
- [ ] Touch targets are at least 44x44px

### Step 3: Responsive Enhancements
```astro
<!-- Add responsive features AFTER mobile works -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- Mobile: 1 column, Desktop: 2 columns -->
</div>
```

---

## Common Failure Patterns to Avoid

### ❌ Pattern 1: Desktop-First Typography
```html
<!-- ❌ BAD -->
<h1 class="text-4xl md:text-5xl">Title</h1>
<!-- Problem: 36px on mobile may overflow -->

<!-- ✅ GOOD -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl break-words">Title</h1>
```

### ❌ Pattern 2: Fixed Heights
```html
<!-- ❌ BAD -->
<div class="h-[500px]">Content</div>
<!-- Problem: May clip content on small screens -->

<!-- ✅ GOOD -->
<div class="min-h-[400px] sm:min-h-[500px]">Content</div>
```

### ❌ Pattern 3: Missing Word Breaking
```html
<!-- ❌ BAD -->
<p>{longUserGeneratedContent}</p>
<!-- Problem: Long words/URLs overflow -->

<!-- ✅ GOOD -->
<p class="break-words">{longUserGeneratedContent}</p>
```

### ❌ Pattern 4: Nested Padding
```html
<!-- ❌ BAD -->
<section class="px-4">
  <div class="px-4">Content</div>
</section>
<!-- Problem: Double padding reduces usable space -->

<!-- ✅ GOOD -->
<section class="px-4">
  <div>Content</div>
</section>
```

### ❌ Pattern 5: Overflow Hidden on Text
```html
<!-- ❌ BAD -->
<div class="overflow-hidden">
  <p>Long text that might be clipped</p>
</div>

<!-- ✅ GOOD -->
<div class="overflow-x-auto"> <!-- Only if horizontal scroll is intentional -->
  <p class="break-words">Long text</p>
</div>
```

---

## Testing Checklist

Before committing any layout changes:

### Viewport Tests
- [ ] Test at 360px width (iPhone SE)
- [ ] Test at 390px width (iPhone 12/13)
- [ ] Test at 768px width (tablet)
- [ ] Test at 1024px+ width (desktop)

### Content Tests
- [ ] Long headings wrap properly
- [ ] Long URLs break and don't overflow
- [ ] Long words break properly
- [ ] No horizontal scrolling appears
- [ ] Text is not clipped by containers
- [ ] Text is not hidden behind fixed elements

### Interaction Tests
- [ ] Touch targets are at least 44x44px
- [ ] Forms are usable on mobile
- [ ] Navigation works on mobile
- [ ] No content relies on hover states

---

## Quick Reference: Mobile Typography Scale

| Element | Mobile (360px) | Tablet (768px) | Desktop (1024px+) |
|---------|----------------|----------------|-------------------|
| Hero H1 | 24px (text-2xl) | 30px (text-3xl) | 36px+ (text-4xl+) |
| Section H2 | 24px (text-2xl) | 30px (text-3xl) | 30px (text-3xl) |
| Subheading H3 | 18px (text-lg) | 20px (text-xl) | 20px (text-xl) |
| Body Text | 16px (text-base) | 16px (text-base) | 16px (text-base) |
| Small Text | 14px (text-sm) | 14px (text-sm) | 14px (text-sm) |

**Note:** Never use `text-xs` (12px) for body text. Use `text-sm` (14px) as absolute minimum.

---

## CSS Utilities for Mobile

### Word Breaking
```html
<!-- Break long words -->
<div class="break-words">Content</div>

<!-- Break at any character (for URLs) -->
<div class="break-all">URL</div>
```

### Responsive Containers
```html
<!-- Mobile: full width, Desktop: max-width -->
<div class="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
```

### Responsive Grids
```html
<!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## Questions?

If you're unsure about a layout decision:
1. Test at 360px viewport first
2. Add `break-words` to text containers
3. Use mobile-first responsive classes
4. Verify no horizontal scrolling
5. Check touch target sizes (44x44px minimum)



