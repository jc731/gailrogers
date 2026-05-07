# Backlog

Issues and improvements to address in future sessions.

---

## Mobile

### MobileMenu: logo hide/show on open
**Current behavior:** `top-[73px]` hardcoded offset positions the mobile menu panel below the nav bar.
**Proposed behavior:** On menu open, hide the logo in the top nav bar and show it at the top of the mobile menu panel instead. Animate both transitions.
**Files:** `src/components/MobileMenu.astro`, `src/layouts/BaseLayout.astro`

### RichTextWithImage: review aspect-ratio on mobile
`aspect-ratio: 5/7` inline style on the image wrapper was set for portrait headshots. Works fine now but should be reviewed if other image types (landscapes, square) are ever used in this component.
**File:** `src/components/sections/RichTextWithImage.astro:30`

---

## Astro / Performance

### Upgrade to Astro Image component
Native `<img>` tags are used throughout — no automatic optimization, lazy loading, or sizing. Astro's `<Image>` component provides these for free. Requires an Astro version update first, then convert components one at a time.
**Files to convert (in order):**
1. `src/components/sections/RichTextWithImage.astro`
2. `src/components/sections/Slider.astro`
3. `src/components/Logo.astro` (touchmark PNG)
4. Any `<img>` in page content
**Prerequisite:** Run `pnpm update astro` and verify no breaking changes before starting.

### Create /og-image.jpg for Open Graph
`src/components/Head.astro` references `/og-image.jpg` as the default OG image. This file does not yet exist. Create a 1200×630 branded image and place it in `public/og-image.jpg`.

### is:inline scripts — convert to is:module
Two components use `<script is:inline>` which bypasses Astro's module bundling and tree-shaking:

- **`src/components/sections/Slider.astro`** — uses `is:inline` with `define:vars={{ autoplay, autoplayInterval }}`. `define:vars` *requires* `is:inline` in Astro. To convert: remove `define:vars`, read values from `data-*` attributes on the slider element instead.
- **`src/components/MobileMenu.astro`** — uses `is:inline` (was changed from default to fix menu initialization timing bugs — exact bug not documented). To convert: change to plain `<script>` and test that menu opens/closes correctly on all pages including SPAs with view transitions.

### set:html sanitization
`src/components/sections/RichText.astro`, `RichTextWithImage.astro`, and `RichTextWithForm.astro` all use `set:html={content}` which renders unescaped HTML. Current risk is low because content comes only from local markdown files in `src/content/`. If a CMS or user-supplied content source is ever added, sanitize with DOMPurify or similar before rendering.

---

## SEO / Tracking

### Add tracking IDs to Head.astro
Placeholders are in `src/components/Head.astro` for both Google Tag Manager and Meta Pixel. When ready:
- Replace `GTM-XXXXXXX` with the real GTM container ID and uncomment the block
- Replace `PIXEL_ID` with the real Facebook Pixel ID and uncomment the block

---

## Architecture

### Extract nav/header to SiteHeader component
`src/layouts/BaseLayout.astro` still contains the full desktop nav markup and inline keyboard navigation script (~130 lines). A `SiteHeader.astro` component would mirror `SiteFooter.astro` and reduce BaseLayout to pure layout scaffolding.
