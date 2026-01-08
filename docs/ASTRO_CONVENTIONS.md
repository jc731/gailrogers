# Astro Conventions for This Template

This document explains how this Astro template is structured and how to work with it effectively.

## Table of Contents

1. [How Pages Work](#how-pages-work)
2. [How Content is Added](#how-content-is-added)
3. [How Sections are Rendered](#how-sections-are-rendered)
4. [What NOT to Do](#what-not-to-do)
5. [Extension Points](#extension-points)

---

## How Pages Work

### Page Structure

This template uses **two types of pages**:

1. **Static Pages** (`src/pages/index.astro`) - Handles the home page
2. **Dynamic Pages** (`src/pages/[...slug].astro`) - Handles all other pages via catch-all routing

### Page Rendering Flow

```
User Request → Astro Router → Page Component → BaseLayout → SectionRenderer → Section Components
```

1. **Routing**: Astro's file-based routing determines which page to render
2. **Content Loading**: Page loads content from Content Collections
3. **Layout Application**: `BaseLayout.astro` wraps the page content
4. **Section Rendering**: Each section in the page's `sections` array is rendered via `SectionRenderer`

### Key Principles

- ✅ **Pages are renderers only** - No hard-coded content in page files
- ✅ **All content lives in Markdown/MDX** - Pages read from Content Collections
- ✅ **Sections are declarative** - Defined in frontmatter, rendered by components

### Example: Adding a New Page

1. Create a markdown file in `src/content/pages/`:
   ```markdown
   ---
   title: About Us
   slug: about
   seoTitle: About Our Company
   seoDescription: Learn more about our company.
   sections:
     - type: hero
       heading: About Us
       subheading: Learn more about our company
     - type: richText
       content: |
         <h2>Our Story</h2>
         <p>Content here...</p>
   ---
   ```

2. The page is automatically available at `/about` (no code changes needed)

---

## How Content is Added

### Content Collections

This template uses **Astro Content Collections** for type-safe content management:

- **`site`** - Site-wide settings (brand name, contact info, navigation)
- **`pages`** - Regular pages (about, contact, etc.)
- **`practiceAreas`** - Practice area pages (or any category pages)

### Adding Content

#### 1. Site Settings (`src/content/site/settings.json`)

```json
{
  "brandName": "Your Site Name",
  "primaryPhone": "555-1234",
  "address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zip": "12345"
  },
  "navigation": [
    {
      "label": "Home",
      "href": "/"
    }
  ]
}
```

#### 2. Regular Pages (`src/content/pages/`)

Create a `.md` or `.mdx` file:

```markdown
---
title: Page Title
slug: page-slug
seoTitle: SEO Title
seoDescription: SEO description
sections:
  - type: hero
    heading: Hero Heading
---
```

#### 3. Practice Areas (`src/content/practiceAreas/`)

Same structure as pages, but with additional fields:

```markdown
---
title: Service Name
slug: service-slug
summary: Brief summary
faqs:
  - question: "Question?"
    answer: "Answer."
sections:
  - type: hero
    heading: Service Name
---
```

### Content Rules

- ✅ **Use Markdown for most content** - Simpler, easier to edit
- ✅ **Use MDX only when needed** - For embedded components
- ✅ **All content in frontmatter** - No hard-coded content in components
- ✅ **Sections are arrays** - Define multiple sections per page

---

## How Sections are Rendered

### Section System

Sections are **declarative components** defined in page frontmatter and rendered by `SectionRenderer.astro`.

### Available Section Types

1. **`hero`** - Hero banner with heading, subheading, CTA
2. **`richText`** - Rich text content with HTML
3. **`faq`** - FAQ section with questions/answers
4. **`ctaBand`** - Call-to-action band
5. **`cardGrid`** - Grid of cards
6. **`slider`** - Image/text slider
7. **`linkButtons`** - Group of styled buttons/links
8. **`iconBanner`** - Three-column icon banner
9. **`contactForm`** - Contact form

### Section Rendering Flow

```
Page Frontmatter → SectionRenderer → Section Component → HTML Output
```

1. Page defines sections in frontmatter
2. `SectionRenderer` receives section object
3. `SectionRenderer` switches on `section.type`
4. Appropriate section component is rendered

### Example Section Definition

```yaml
sections:
  - type: hero
    heading: Welcome
    subheading: To our site
    ctaText: Get Started
    ctaLink: /contact
  - type: richText
    content: |
      <h2>About</h2>
      <p>Content here...</p>
```

### Adding a New Section Type

1. **Define schema** in `src/content/config.ts`:
   ```typescript
   const mySection = z.object({
     type: z.literal('mySection'),
     title: z.string(),
     // ... other fields
   });
   ```

2. **Add to sectionSchema union**:
   ```typescript
   export const sectionSchema = z.discriminatedUnion('type', [
     // ... existing sections
     mySection,
   ]);
   ```

3. **Create component** in `src/components/sections/MySection.astro`

4. **Add to SectionRenderer**:
   ```astro
   {section.type === 'mySection' && (
     <MySection title={section.title} />
   )}
   ```

---

## What NOT to Do

### ❌ Don't Hard-Code Content in Components

**Bad:**
```astro
<h1>Welcome to Rogers Law Office</h1>
```

**Good:**
```astro
<h1>{heading}</h1>
```

### ❌ Don't Use `any` Types

**Bad:**
```typescript
const page: any = await getCollection('pages');
```

**Good:**
```typescript
import type { CollectionEntry } from 'astro:content';
const pages = await getCollection('pages');
const page: CollectionEntry<'pages'> = pages[0];
```

### ❌ Don't Duplicate Logic

**Bad:**
```typescript
// In multiple files
const slug = page.id.replace(/\.mdx?$/, '');
```

**Good:**
```typescript
import { getSlugFromEntry } from '../utils/content';
const slug = getSlugFromEntry(page);
```

### ❌ Don't Add Client-Side JS Unnecessarily

**Bad:**
```astro
<script>
  // Heavy client-side logic
</script>
```

**Good:**
```astro
<!-- Use server-side rendering when possible -->
<!-- Only add client JS for interactive features (sliders, forms) -->
<script is:inline>
  // Minimal, necessary client-side code
</script>
```

### ❌ Don't Hard-Code Site-Specific Values

**Bad:**
```typescript
const siteUrl = 'https://www.gailrogerslaw.com';
```

**Good:**
```typescript
import { SITE_URL } from '../config/template';
// Or use environment variable
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
```

### ❌ Don't Skip Error Handling

**Bad:**
```typescript
const page = pages.find(p => p.slug === slug);
// page might be undefined!
```

**Good:**
```typescript
const page = pages.find(p => p.slug === slug);
if (!page) {
  return Astro.redirect('/404');
}
```

---

## Extension Points

### Adding a New Content Collection

1. **Define in `src/content/config.ts`**:
   ```typescript
   const myCollection = defineCollection({
     type: 'content',
     schema: z.object({
       title: z.string(),
       // ... fields
     }),
   });
   
   export const collections = {
     // ... existing
     myCollection,
   };
   ```

2. **Create content files** in `src/content/myCollection/`

3. **Use in pages**:
   ```typescript
   const items = await getCollection('myCollection');
   ```

### Adding a New Layout

1. **Create layout file** in `src/layouts/MyLayout.astro`

2. **Use in pages**:
   ```astro
   ---
   import MyLayout from '../layouts/MyLayout.astro';
   ---
   <MyLayout>
     <!-- content -->
   </MyLayout>
   ```

### Customizing Site Settings

Edit `src/content/site/settings.json` - no code changes needed.

### Adding Environment Variables

1. **Create `.env` file**:
   ```
   PUBLIC_SITE_URL=https://yoursite.com
   ```

2. **Use in code**:
   ```typescript
   const siteUrl = import.meta.env.PUBLIC_SITE_URL;
   ```

---

## Best Practices Summary

1. ✅ **Content in Markdown** - All page content in Content Collections
2. ✅ **Components are Props-Driven** - No hard-coded content
3. ✅ **Type Safety** - Use TypeScript types from `astro:content`
4. ✅ **Utility Functions** - Reuse common operations
5. ✅ **Error Handling** - Graceful fallbacks for missing content
6. ✅ **Static by Default** - Minimize client-side JavaScript
7. ✅ **Template-Ready** - No site-specific assumptions

---

## Quick Reference

### File Structure
```
src/
  pages/          # Page renderers (routing)
  layouts/        # Layout templates
  components/     # Reusable components
    sections/     # Section components
    forms/        # Form components
  content/        # Content Collections
    pages/        # Page content (Markdown)
    practiceAreas/# Practice area content
    site/         # Site settings (JSON)
  utils/          # Utility functions
  config/         # Template configuration
```

### Common Tasks

**Add a page:** Create `.md` file in `src/content/pages/`

**Add a section:** Define in page frontmatter `sections` array

**Add a section type:** Update `src/content/config.ts` and create component

**Change site settings:** Edit `src/content/site/settings.json`

**Customize layout:** Edit `src/layouts/BaseLayout.astro` or create new layout

---

## Questions?

- See `docs/ASTRO_ARCHITECTURE_REVIEW.md` for detailed architecture notes
- See `README.md` for project overview
- Check Astro docs: https://docs.astro.build



