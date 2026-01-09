# Lighthouse Accessibility Issues Investigation

**Date:** 2026-01-05  
**Tool:** Lighthouse  
**Scope:** ARIA, Color Contrast, and Heading Hierarchy Issues

## Summary

This document investigates three categories of accessibility issues reported by Lighthouse:
1. ARIA: `[aria-hidden="true"]` elements containing focusable descendents
2. Contrast: Background and foreground colors with insufficient contrast ratio
3. Navigation: Heading elements not in sequentially-descending order

---

## 1. ARIA Issues: `[aria-hidden="true"]` Elements with Focusable Descendents

### Problem
Elements with `aria-hidden="true"` should not contain focusable elements (buttons, links, form controls, etc.) because screen readers will hide the element, but keyboard users can still focus elements inside it, creating confusion.

### Findings

#### ✅ **SAFE** - No Issues Found:
1. **BaseLayout.astro (line 95)**
   - `<span aria-hidden="true">` wrapping `<DropdownIndicator>`
   - **Status:** Safe - DropdownIndicator is just an icon, not focusable

2. **MobileMenu.astro (lines 35, 40)**
   - `<Icon aria-hidden="true">` inside button
   - **Status:** Safe - Icons are decorative, button itself is focusable (which is correct)

3. **Logo.astro (line 32)**
   - `<Icon aria-hidden="true">` inside link
   - **Status:** Safe - Icon is decorative, link is focusable

4. **DropdownIndicator.astro (line 20)**
   - `<Icon aria-hidden="true">`
   - **Status:** Safe - Just a decorative icon

5. **IconBanner.astro (line 52)**
   - `<Icon aria-hidden="true">` inside link
   - **Status:** Safe - Icon is decorative, link is focusable

6. **FormInput.astro & FormTextarea.astro (line 30)**
   - `<span aria-hidden="true">*</span>` for required indicator
   - **Status:** Safe - Just decorative text

#### 🔴 **ISSUE FOUND** - Requires Fix:

**Slider.astro (line 43)**
- **Location:** `src/components/sections/Slider.astro:40-71`
- **Problem:** Slide divs use `aria-hidden={index !== 0}` to hide inactive slides, but each slide contains focusable buttons (previous/next controls and indicators)
- **Code:**
```40:71:src/components/sections/Slider.astro
          <div
            class={`slide ${index === 0 ? "active" : ""}`}
            data-slide-index={index}
            aria-hidden={index !== 0}
          >
            <div class="relative bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white">
              <img
                src={slide.image}
                alt={slide.alt || slide.heading}
                class="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div class="absolute inset-0 bg-brand-primaryDark/70" />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="container mx-auto px-14 md:px-6 lg:px-8 text-center relative z-10">
                  <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 break-words">
                    {slide.heading}
                  </h1>
                  {slide.subheading && (
                    <p class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 break-words">
                      {slide.subheading}
                    </p>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <Button href={slide.ctaLink} variant="white">
                      {slide.ctaText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
```
- **Impact:** When a slide is hidden with `aria-hidden="true"`, the CTA Button inside it could potentially be focused via keyboard navigation, but screen readers won't announce it
- **Note:** The slider controls (prev/next buttons) are positioned outside the slide divs, so they're not affected. However, the CTA button inside each slide is the concern.
- **Recommendation:** 
  - Option 1: Use `inert` attribute on hidden slides (if browser support is acceptable)
  - Option 2: Move controls outside slides or use `pointer-events: none` and `tabindex="-1"` on focusable elements in hidden slides
  - Option 3: Use CSS `visibility: hidden` or `display: none` on slides instead of/in addition to `aria-hidden`

---

## 2. Color Contrast Issues

### Problem
Text and background color combinations must meet WCAG AA contrast ratios:
- **Normal text (16px+):** Minimum 4.5:1
- **Large text (18pt+ or 14pt+ bold):** Minimum 3:1

### Findings

#### Colors to Verify (Need actual contrast calculations):

1. **Footer Text (BaseLayout.astro, line 246)**
   - **Text:** `text-white` (#ffffff)
   - **Background:** `bg-brand-primaryDark` (#451a13)
   - **Location:** Footer section
   - **Status:** ✅ Likely OK - White on very dark background should meet contrast
   - **Note:** Previously fixed (was `text-brand-light`, changed to `text-white` per ACCESSIBILITY_IMPLEMENTATION_SUMMARY.md)

2. **Heading Colors (RichText.astro)**
   - **H2 Text:** `heading-main` (#6B2B1F) - Reddish-brown
   - **Background:** White (#ffffff)
   - **Location:** `src/components/sections/RichText.astro:28-38`
   - **Status:** ⚠️ **NEEDS VERIFICATION** - Dark brown on white should be OK, but verify 4.5:1 ratio

   - **H3 Text:** `heading-subheading` (#A88B4A) - Golden-brown
   - **Background:** White (#ffffff)
   - **Location:** `src/components/sections/RichText.astro:40-51`
   - **Status:** 🔴 **LIKELY ISSUE** - Golden-brown (#A88B4A) on white may not meet 4.5:1 contrast ratio

3. **Brand Light Background (BaseLayout.astro, MobileMenu.astro)**
   - **Text:** `text-brand-primary` (#6b2b1f) or `text-gray-700`
   - **Background:** `bg-brand-light` (#f6d1c7) - Light burgundy
   - **Location:** Navigation dropdown menus, mobile menu active states
   - **Status:** ⚠️ **NEEDS VERIFICATION** - Light background with darker text should verify contrast

4. **Slider Desktop Controls (Slider.astro, line 121, 140)**
   - **Background:** `bg-white/80` (80% opacity white)
   - **Text/Icon:** `text-brand-primary` (#6b2b1f)
   - **Location:** Desktop slider navigation buttons
   - **Status:** ⚠️ **NEEDS VERIFICATION** - Semi-transparent background may reduce contrast

5. **CTA Band Text (CTABand.astro, line 24)**
   - **Text:** `text-white`
   - **Background:** `bg-slate-dark` (#1e293b)
   - **Status:** ✅ Likely OK - White on dark slate should meet contrast

6. **Icon Banner (IconBanner.astro)**
   - **Text:** `text-white`
   - **Background:** `bg-slate-dark` (#1e293b)
   - **Status:** ✅ Likely OK - White on dark slate should meet contrast

7. **Hero Section (Hero.astro, line 22)**
   - **Text:** `text-white`
   - **Background:** `bg-brand-primaryDark` (#451a13)
   - **Status:** ✅ Likely OK - White on very dark background should meet contrast

### Recommended Actions:
1. **Verify contrast ratios** using a contrast checker tool (e.g., WebAIM Contrast Checker)
2. **Primary concern:** Golden-brown heading-subheading color (#A88B4A) on white
3. **Secondary concern:** Text on `bg-brand-light` (#f6d1c7) backgrounds
4. **Tertiary concern:** Semi-transparent white backgrounds in slider controls

---

## 3. Heading Hierarchy Issues

### Problem
Headings must be in sequential order (H1 → H2 → H3, etc.) without skipping levels. This helps screen reader users navigate by headings.

### Findings

#### Current Heading Structure Analysis:

**Home Page (home.md):**
1. **Slider.astro** (line 55): `<h1>` - "Accomplished. Experienced. Knowledgeable."
2. **RichText section 1** (home.md line 42): `<h2>` - "Experienced Champaign Family Law Attorney"
3. **RichText section 1** (home.md line 43): `<h3>` - "Illinois firm provides valuable legal advice..."
4. **RichText section 1** (home.md line 45): `<h3>` - "Knowledgeable attorney develops..."
5. **CardGrid.astro** (line 22): `<h2>` - "Practice Areas" ✅ (follows H1)
6. **RichText section 2** (home.md line 73): `<h2>` - "Serving Champaign, Urbana..."
7. **RichText section 2** (home.md line 75): `<h3>` - "Dedicated to your success"
8. **FAQ.astro** (line 18): `<h2>` - "Frequently Asked Questions"

**Status:** ✅ Home page structure looks correct - H1 → H2 → H3

**Practice Area Pages (e.g., divorce.md):**
1. **Hero.astro** (line 28): `<h1>` - "Divorce Services"
2. **RichText section** (divorce.md line 14): `<h2>` - "Divorce Representation"
3. **RichText section** (divorce.md line 16): `<h3>` - "Uncontested Divorce"
4. **RichText section** (divorce.md line 25): `<h3>` - "Contested Divorce"
5. **RichText section** (divorce.md line 27): `<h3>` - "Simplified Divorce"

**Status:** ✅ Practice area structure looks correct - H1 → H2 → H3

### Potential Issues to Investigate Further:

1. **Multiple H1s on Home Page**
   - **Issue:** Slider can have multiple slides, each with an `<h1>` tag
   - **Location:** `src/components/sections/Slider.astro:55`
   - **Status:** ⚠️ **POTENTIAL ISSUE** - Multiple H1s on one page (though only one is visible at a time)
   - **Recommendation:** Consider using H2 for slider headings, or ensure only the first/active slide's H1 is in the DOM

2. **Footer Headings (BaseLayout.astro)**
   - **Location:** Lines 251, 267, 304
   - **Headings:** All `<h3>` tags
   - **Context:** Footer section (after main content)
   - **Status:** ⚠️ **POTENTIAL ISSUE** - Footer H3s might not follow page's heading hierarchy
   - **Recommendation:** Footer headings are typically acceptable as H3/H4, but verify they don't break the page hierarchy

3. **CardGrid Titles (CardGrid.astro, line 22)**
   - **Heading:** `<h2>`
   - **Status:** ✅ Should be fine if it follows an H1

4. **FAQ Titles (FAQ.astro, line 18)**
   - **Heading:** `<h2>`
   - **Status:** ✅ Should be fine if it follows an H1

### Recommended Actions:
1. **Verify with Lighthouse** which specific pages have heading hierarchy issues
2. **Check if multiple H1s in slider** are the issue (only one visible at a time, but all in DOM)
3. **Review footer heading levels** - consider if they should be H4 instead of H3 to maintain hierarchy
4. **Audit all content pages** to ensure proper heading order

---

## Summary of Issues Requiring Attention

### 🔴 High Priority:
1. **Slider.astro** - `aria-hidden="true"` slides contain focusable CTA buttons
2. **Heading-subheading color (#A88B4A)** - May not meet contrast requirements on white background

### 🟡 Medium Priority:
3. **Multiple H1s in Slider** - All slides have H1, even hidden ones
4. **Text on bg-brand-light** - Verify contrast ratios
5. **Footer heading hierarchy** - Verify H3s don't break page structure

### 🟢 Low Priority:
6. **Semi-transparent backgrounds** - Verify contrast on slider controls
7. **Other color combinations** - Verify all text/background pairs meet WCAG AA

---

## Next Steps

1. **Run contrast checker** on identified color combinations
2. **Fix Slider.astro ARIA issue** - Remove focusability from hidden slides
3. **Verify heading hierarchy** on all pages using Lighthouse or accessibility tools
4. **Update heading-subheading color** if contrast is insufficient
5. **Review footer heading levels** and adjust if needed

---

## Tools for Verification

- **Color Contrast:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **ARIA:** [WAVE Browser Extension](https://wave.webaim.org/extension/)
- **Headings:** Browser DevTools → Accessibility Tree, or Lighthouse report
- **General:** [axe DevTools](https://www.deque.com/axe/devtools/)
