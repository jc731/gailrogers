# Astro Architecture Review & Improvements

**Date:** 2026-01-05  
**Reviewer:** Senior Astro Reviewer  
**Status:** ✅ Complete

## Findings by Priority

### 🔴 MUST FIX

#### 1. TypeScript `any` Types Throughout Codebase
**Severity:** High  
**Impact:** Loss of type safety, poor DX, potential runtime errors

**Locations:**
- `src/pages/[...slug].astro` - Lines 10, 42, 56-58, 77, 95
- `src/pages/index.astro` - Line 19
- `src/components/SectionRenderer.astro` - Line 15

**Issue:** Using `any` defeats TypeScript's purpose. Should use proper types from `astro:content`.

**Fix:** Import and use `CollectionEntry` types from `astro:content`.

---

#### 2. Duplicated Slug Resolution Logic
**Severity:** High  
**Impact:** Code duplication, maintenance burden, potential inconsistencies

**Locations:**
- `src/pages/index.astro` - Line 7: `page.id.replace(/\.mdx?$/, '')`
- `src/pages/[...slug].astro` - Lines 14, 28, 53: Same pattern repeated

**Issue:** Slug extraction logic is duplicated across multiple files.

**Fix:** Create a utility function `getSlugFromEntry()`.

---

#### 3. No 404 Page
**Severity:** High  
**Impact:** Poor UX when users hit invalid URLs

**Location:** `src/pages/index.astro` - Line 10 redirects to `/404` but no 404.astro exists

**Issue:** Redirects to non-existent 404 page.

**Fix:** Create `src/pages/404.astro` with proper error handling.

---

#### 4. Site-Specific Configuration Hard-Coded
**Severity:** High  
**Impact:** Not template-ready, requires code changes for new sites

**Location:** `astro.config.mjs` - Line 20: `site: 'https://www.gailrogerslaw.com'`

**Issue:** Site URL is hard-coded, making template reuse difficult.

**Fix:** Move to environment variable or site settings, with fallback.

---

#### 5. Unused `layout` Field in Schema
**Severity:** Medium  
**Impact:** Confusion, unused code

**Location:** `src/content/config.ts` - Line 159: `layout: z.string().optional().default('default')`

**Issue:** Field is defined but never used anywhere in the codebase.

**Fix:** Remove from schema or implement layout system.

---

#### 6. BaseLayout Loads Site Settings on Every Render
**Severity:** Medium  
**Impact:** Unnecessary work, potential performance impact

**Location:** `src/layouts/BaseLayout.astro` - Lines 14-21

**Issue:** Site settings are loaded in every layout render, even though they're static.

**Fix:** Load once in `getStaticPaths` or use a shared utility.

---

#### 7. Contact Page Special Handling Hard-Coded
**Severity:** Medium  
**Impact:** Not template-friendly, hard to extend

**Location:** `src/pages/[...slug].astro` - Lines 52-70

**Issue:** Special layout logic for contact page is hard-coded, not configurable.

**Fix:** Make layout configurable via content frontmatter or section metadata.

---

#### 8. TypeScript Config Has React Settings (No React Used)
**Severity:** Medium  
**Impact:** Confusion, incorrect type checking

**Location:** `tsconfig.json` - Lines 4-5

**Issue:** Config includes React JSX settings but project uses Astro components only.

**Fix:** Remove React-specific config.

---

### 🟠 SHOULD FIX

#### 9. SectionRenderer Uses `any` for Section Props
**Severity:** Medium  
**Impact:** Type safety loss

**Location:** `src/components/SectionRenderer.astro` - Line 15

**Issue:** Section props use `any` instead of discriminated union type.

**Fix:** Use proper section type from content config.

---

#### 10. No Error Handling for Missing Content
**Severity:** Medium  
**Impact:** Runtime errors, poor UX

**Locations:**
- `src/pages/index.astro` - Only redirects, no fallback UI
- `src/pages/[...slug].astro` - No error handling if page is missing

**Issue:** Missing content causes runtime errors instead of graceful fallbacks.

**Fix:** Add proper error boundaries and fallback UI.

---

#### 11. Duplicate ContactForm Component
**Severity:** Low  
**Impact:** Confusion, maintenance burden

**Locations:**
- `src/components/sections/ContactForm.astro`
- `src/components/forms/ContactForm.astro`

**Issue:** Two ContactForm components exist. The sections version just wraps the forms version.

**Fix:** Remove duplicate, use forms version directly in SectionRenderer.

---

#### 12. Slider Script Could Use `is:inline`
**Severity:** Low  
**Impact:** Minor performance improvement

**Location:** `src/components/sections/Slider.astro` - Line 141

**Issue:** Script uses `define:vars` but could benefit from `is:inline` for better performance.

**Fix:** Add `is:inline` directive.

---

### 🟢 NICE TO HAVE

#### 13. Utility Functions for Common Operations
**Severity:** Low  
**Impact:** Better code organization

**Issue:** Common operations (slug resolution, content loading) are scattered.

**Fix:** Create `src/utils/content.ts` with shared utilities.

---

#### 14. Better TypeScript Types Throughout
**Severity:** Low  
**Impact:** Improved DX

**Issue:** Some components could benefit from more specific types.

**Fix:** Add proper interfaces for all component props.

---

#### 15. Template Configuration File
**Severity:** Low  
**Impact:** Easier template customization

**Issue:** No central place for template-level configuration.

**Fix:** Create `src/config/template.ts` for template settings.

---

## Implementation Plan

### Phase 1: Critical Fixes (Must Fix)
1. ✅ Fix TypeScript `any` types
2. ✅ Create utility functions for slug resolution
3. ✅ Create 404 page
4. ✅ Fix site-specific config
5. ✅ Remove unused layout prop
6. ✅ Fix tsconfig.json
7. ✅ Optimize BaseLayout site settings loading
8. ✅ Make contact page layout configurable

### Phase 2: Important Fixes (Should Fix)
9. ✅ Fix SectionRenderer types
10. ✅ Add error handling
11. ✅ Remove duplicate ContactForm
12. ✅ Optimize Slider script

### Phase 3: Enhancements (Nice to Have)
13. ✅ Create utility functions module
14. ✅ Improve TypeScript types
15. ✅ Create template config

---

## Files to Modify

### Core Files
- `src/pages/[...slug].astro` - Fix types, add utilities, error handling
- `src/pages/index.astro` - Fix types, add utilities
- `src/pages/404.astro` - **NEW** - Create 404 page
- `src/layouts/BaseLayout.astro` - Optimize site settings loading
- `src/components/SectionRenderer.astro` - Fix types
- `src/content/config.ts` - Remove unused layout field
- `astro.config.mjs` - Make site URL configurable
- `tsconfig.json` - Remove React config

### New Files
- `src/utils/content.ts` - Utility functions
- `src/config/template.ts` - Template configuration
- `docs/ASTRO_CONVENTIONS.md` - Documentation

### Files to Remove
- `src/components/sections/ContactForm.astro` - Duplicate, use forms version

---

## Expected Outcomes

After these improvements:
- ✅ Full TypeScript type safety
- ✅ No code duplication
- ✅ Template-ready configuration
- ✅ Proper error handling
- ✅ Better performance
- ✅ Clear documentation
- ✅ Easier maintenance and extension

