# Mobile Layout & Readability Audit

**Date:** 2026-01-05  
**Viewport Focus:** 360-390px (mobile-first)  
**Framework:** Astro + Tailwind CSS

## Findings by Severity

### 🔴 BLOCKER Issues

#### 1. Large Typography Without Mobile Scaling
**Severity:** Blocker  
**Impact:** Text may overflow or be unreadable on small screens

**Locations:**
- `src/components/sections/Hero.astro` - Line 21: `text-4xl` (36px) on mobile
- `src/components/sections/Slider.astro` - Line 47: `text-4xl` (36px) on mobile, Line 49: `text-xl` (20px) on mobile
- `src/components/sections/CTABand.astro` - Line 21: `text-3xl` (30px) on mobile, Line 23: `text-xl` (20px) on mobile
- `src/components/Logo.astro` - Line 39: `text-2xl` (24px) on mobile - may be too large for 360px

**Issue:** Large font sizes without mobile-first scaling can cause text to overflow or wrap awkwardly on 360px screens.

**Fix:** Add smaller base sizes, then scale up with breakpoints.

---

#### 2. RichText Content Missing Word Breaking
**Severity:** Blocker  
**Impact:** Long words or URLs in Markdown content can overflow

**Location:** `src/components/sections/RichText.astro`

**Issue:** No `break-words` utility on content container. User-generated or Markdown content with long words/URLs will overflow.

**Fix:** Add `break-words` to content container.

---

#### 3. Slider Fixed Heights May Clip Content
**Severity:** Blocker  
**Impact:** Fixed height may cause text to be clipped on small screens

**Location:** `src/components/sections/Slider.astro` - Line 41: `h-[500px] md:h-[600px]`

**Issue:** Fixed height on mobile may not accommodate all text content, especially with long headings/subheadings.

**Fix:** Use `min-h-` instead of fixed `h-` or make it responsive.

---

### 🟠 HIGH Priority Issues

#### 4. Mobile Menu Fixed Position May Cause Viewport Issues
**Severity:** High  
**Impact:** Fixed menu may cause content to be hidden or inaccessible

**Location:** `src/components/MobileMenu.astro` - Line 45: `fixed inset-0 top-[73px]`

**Issue:** Fixed positioning with `inset-0` may cause viewport height calculation issues on mobile browsers.

**Fix:** Use `fixed top-[73px] left-0 right-0 bottom-0` instead of `inset-0`.

---

#### 5. Contact Form Nested Padding
**Severity:** High  
**Impact:** Double padding on mobile may reduce usable space

**Location:** `src/components/forms/ContactForm.astro` - Lines 18, 20

**Issue:** Section has `px-4` and inner div also has `px-4 md:px-6 lg:px-8`, causing double padding on mobile.

**Fix:** Remove outer padding, keep inner padding only.

---

#### 6. Logo Text May Overflow on Small Screens
**Severity:** High  
**Impact:** Logo text may overflow on very small screens (360px)

**Location:** `src/components/Logo.astro` - Line 39: `text-2xl` (24px) for brand name

**Issue:** "ROGERS" and "LAW OFFICE" may be too large for 360px screens, especially with serif font.

**Fix:** Reduce base size, ensure proper wrapping.

---

### 🟡 MEDIUM Priority Issues

#### 7. CardGrid Cards May Have Wide Text
**Severity:** Medium  
**Impact:** Card content may have long lines on mobile

**Location:** `src/components/sections/CardGrid.astro` - Line 31: Card content text

**Issue:** No word breaking on card content, long words may overflow.

**Fix:** Add `break-words` to card content.

---

#### 8. Footer Text Sizing
**Severity:** Medium  
**Impact:** Footer text may be small on mobile

**Location:** `src/layouts/BaseLayout.astro` - Line 277: `text-sm` for disclaimer

**Issue:** `text-sm` (14px) may be too small for readability on mobile.

**Fix:** Use `text-base` on mobile, `text-sm` on larger screens.

---

#### 9. 404 Page Large Heading
**Severity:** Medium  
**Impact:** `text-6xl` may be too large even on mobile

**Location:** `src/pages/404.astro` - Line 17: `text-6xl`

**Issue:** 60px font size may cause layout issues on 360px screens.

**Fix:** Scale down on mobile: `text-4xl md:text-6xl`.

---

### 🟢 LOW Priority Issues

#### 10. Prose Typography May Need Overrides
**Severity:** Low  
**Impact:** Prose defaults may not be optimal for mobile

**Location:** `src/components/sections/RichText.astro` - Line 10: `prose prose-lg`

**Issue:** Prose typography plugin may have defaults that aren't mobile-optimized.

**Fix:** Add mobile-specific prose overrides if needed.

---

## Implementation Plan

### Phase 1: Critical Fixes (Blockers)
1. ✅ Fix large typography - add mobile-first scaling
2. ✅ Add word breaking to RichText content
3. ✅ Fix slider fixed heights

### Phase 2: High Priority Fixes
4. ✅ Fix mobile menu viewport positioning
5. ✅ Fix contact form nested padding
6. ✅ Fix logo text sizing

### Phase 3: Medium Priority Fixes
7. ✅ Add word breaking to card content
8. ✅ Improve footer text sizing
9. ✅ Fix 404 page heading

### Phase 4: Polish
10. ✅ Review prose typography defaults



