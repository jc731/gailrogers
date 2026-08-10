# Rogers Law Office Website

A markdown-first Astro website for Rogers Law Office, built as a reusable template for "billboard" style websites.

## Project Overview

This project uses Astro with Content Collections to manage all page content in Markdown files. The architecture is designed to be easily templatable for future projects with minimal code changes - just update content files and theme colors.

### Key Features

- **Markdown-First Content**: All page content is stored in Markdown files
- **Content Collections**: Organized content with type-safe Zod schemas
- **Section-Based Templates**: Reusable section components for flexible page layouts
- **Dynamic Routing**: Automatic page generation from content files
- **Theme System**: Centralized color configuration for easy customization
- **Tailwind CSS**: Modern, responsive styling with consistent padding
- **WCAG 2.2 AA Compliant**: Full accessibility support with keyboard navigation, focus indicators, and screen reader optimization
- **Type-Safe**: Full TypeScript coverage with proper Astro Content Collection types
- **Template-Ready**: Configurable site settings, no hard-coded assumptions
- **Performance Optimized**: Static site generation, minimal JavaScript

## Getting Started

### Prerequisites

- Node.js 22.12+ (required by Astro 7; pinned via `engines` and `NODE_VERSION` in `netlify.toml`)
- pnpm 10+ (package manager) - **Important: Use pnpm, NOT npm**

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Visit `http://localhost:4321` to view the site.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Content Management

### How to Update Content

All content is stored in Markdown files. **No code changes are needed** to update most content.

#### Site Settings

Edit `src/content/site/settings.json` to update:
- Brand name
- Phone numbers
- Address
- Business hours
- Legal disclaimer
- Global CTAs
- Navigation structure

#### Pages

Pages are stored in `src/content/pages/`. Each page is a Markdown file with frontmatter and sections.

**Example: Editing the Home Page**

1. Open `src/content/pages/home.md`
2. Update the frontmatter (title, SEO fields)
3. Modify sections in the `sections` array
4. Save the file - changes appear automatically in dev mode

**Available Section Types:**

- `hero`: Hero banner with heading, subheading, and optional CTA
- `slider`: Image slider with multiple slides, autoplay, and navigation
- `iconBanner`: Three-column icon banner with icons and text
- `richText`: Rich HTML content (use HTML tags in the content field)
- `faq`: FAQ section with question/answer pairs
- `ctaBand`: Call-to-action band with primary/secondary buttons
- `cardGrid`: Grid of cards (e.g., practice areas)
- `linkButtons`: Section with multiple buttons/links in various layouts
- `contactForm`: Contact form with Name, Email, Phone, and Message fields

#### Practice Areas

Practice areas are stored in `src/content/practiceAreas/`. They follow the same structure as pages but include:
- `summary`: Brief description
- `faqs`: Optional FAQ array
- `order`: Display order

**Example: Adding a New Practice Area**

1. Create `src/content/practiceAreas/your-area.md`
2. Copy the structure from an existing practice area
3. Update the frontmatter and sections
4. The page will be available at `/practice/your-area`

### Section Configuration

Each section type has specific fields. Here's a complete reference:

**Hero Section:**
```yaml
- type: hero
  heading: "Your Heading"
  subheading: "Optional subheading"
  ctaText: "Button Text"
  ctaLink: "/contact"
  backgroundImage: "/path/to/image.jpg"  # Optional
```

**Slider Section:**
```yaml
- type: slider
  slides:
    - heading: "Slide Heading"
      subheading: "Optional subheading"
      image: "/images/slide-1.webp"
      ctaText: "Button Text"
      ctaLink: "/contact"
      alt: "Image description"
  autoplay: true  # Optional, default true
  autoplayInterval: 5000  # Optional, default 5000ms
  showIndicators: true  # Optional, default true
  showControls: true  # Optional, default true
```

**Icon Banner Section:**
```yaml
- type: iconBanner
  items:
    - icon: account-group  # Icon name (without mdi: prefix)
      text: "Family Law"
      link: "/practice/family-law"  # Optional
  backgroundColor: gray-800  # Optional, default gray-800
```

**Rich Text Section:**
```yaml
- type: richText
  content: |
    <h2>Main Headline</h2>
    <h3>Subheading in All Caps</h3>
    <p>Your HTML content here</p>
  className: "optional-css-class"  # Optional
```

**Note:** The RichText component automatically styles headings:
- `<h2>`: Large, reddish-brown (#6B2B1F) main headlines
- `<h3>`: Golden-brown (#A88B4A), all-caps subheadings
- `<p>`: Regular black body text

**FAQ Section:**
```yaml
- type: faq
  title: "Frequently Asked Questions"  # Optional
  items:
    - question: "What is...?"
      answer: "The answer is..."
```

**CTA Band:**
```yaml
- type: ctaBand
  heading: "Call to Action"
  text: "Supporting text"  # Optional
  primaryCTA:
    text: "Primary Button"
    link: "/contact"
  secondaryCTA:  # Optional
    text: "Secondary Button"
    link: "/about"
```

**Card Grid:**
```yaml
- type: cardGrid
  title: "Practice Areas"  # Optional
  columns: 3  # Optional, default is 3
  cards:
    - title: "Card Title"
      content: "Card description"
      link: "/practice/area"  # Optional
      image: "/path/to/image.jpg"  # Optional
```

**Link Buttons:**
```yaml
- type: linkButtons
  title: "Quick Links"  # Optional
  buttons:
    - text: "Contact Us"
      link: "/contact"
      style: "primary"  # Optional: primary, secondary, or outline
  layout: "horizontal"  # Optional: horizontal, vertical, or grid
```

**Contact Form:**
```yaml
- type: contactForm
  title: "Contact us"  # Optional, defaults to "Contact us"
  introText: "Please fill out the form below..."  # Optional
  className: "optional-css-class"  # Optional
```

**Note:** The contact form includes Name, Email, Phone, and Message fields. Form submission handling will be implemented in a future update. The form features gold-brown borders matching the original design and is fully accessible with proper ARIA attributes.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Logo.astro              # Logo component
│   │   ├── SectionRenderer.astro   # Renders sections based on type
│   │   ├── forms/                   # Reusable form components
│   │   │   ├── FormInput.astro     # Reusable input field
│   │   │   ├── FormTextarea.astro  # Reusable textarea field
│   │   │   └── ContactForm.astro   # Contact form component
│   │   └── sections/               # Reusable section components
│   │       ├── Hero.astro
│   │       ├── Slider.astro
│   │       ├── IconBanner.astro
│   │       ├── RichText.astro
│   │       ├── FAQ.astro
│   │       ├── CTABand.astro
│   │       ├── CardGrid.astro
│   │       └── LinkButtons.astro
│   ├── content.config.ts            # Content collection schemas
│   ├── content/
│   │   ├── site/
│   │   │   └── settings.json       # Site-wide settings & navigation
│   │   ├── pages/                  # Regular pages
│   │   │   ├── home.md
│   │   │   ├── contact.md
│   │   │   ├── attorney-profile.md
│   │   │   ├── blog.md
│   │   │   ├── reviews-and-ratings.md
│   │   │   ├── map-and-directions.md
│   │   │   └── video-faq.md
│   │   └── practiceAreas/          # Practice area pages
│   │       ├── family-law.md
│   │       ├── divorce.md
│   │       ├── spousal-support.md
│   │       ├── child-custody.md
│   │       ├── child-support.md
│   │       └── child-support-modification.md
│   ├── layouts/
│   │   └── BaseLayout.astro         # Main layout template
│   ├── pages/
│   │   ├── index.astro              # Home page route
│   │   ├── [...slug].astro          # Dynamic routing
│   │   └── 404.astro                # 404 error page
│   ├── styles/
│   │   └── global.css                # Tailwind entry + @theme brand tokens + focus utilities
│   ├── utils/
│   │   └── content.ts                # Content utility functions
│   ├── config/
│   │   └── template.ts               # Template-level configuration
│   └── env.d.ts                      # TypeScript environment types
├── public/
│   ├── favicon.svg                  # SVG favicon
│   ├── favicons/                    # Favicon files directory
│   ├── images/                      # Image assets
│   ├── robots.txt                   # SEO robots file
│   ├── site.webmanifest             # PWA manifest
│   └── worker.js                    # Service worker (empty, ready for use)
├── docs/
│   ├── THEME.md                     # Theme system documentation
│   ├── ACCESSIBILITY_AUDIT.md       # Accessibility audit findings
│   ├── ACCESSIBILITY_CHECKLIST.md   # Content author accessibility guide
│   ├── ACCESSIBILITY_IMPLEMENTATION_SUMMARY.md  # A11y improvements summary
│   ├── ASTRO_ARCHITECTURE_REVIEW.md # Astro architecture review
│   ├── ASTRO_CONVENTIONS.md         # Astro conventions and best practices
│   ├── ASTRO_IMPROVEMENTS_SUMMARY.md # Astro improvements summary
│   └── decisions/                   # Architecture decision records
│       └── 2026-08-10-major-dependency-upgrades.md  # Astro 7 / Tailwind 4 / MDX 7 upgrade
├── astro.config.mjs                 # Astro configuration (incl. @tailwindcss/vite plugin)
├── tsconfig.json                    # TypeScript configuration
└── package.json
```

## Theme System

The project uses a centralized theme system for easy customization. See `docs/THEME.md` for detailed documentation.

Tailwind 4 is CSS-first: there is no `tailwind.config.mjs`. The theme lives in the
`@theme` block of `src/styles/global.css`.

**Quick Theme Customization:**

1. Open `src/styles/global.css`
2. Update the `--color-brand-*` custom properties in the `@theme` block:
```css
@theme {
  --color-brand-primary: #YOUR_COLOR;      /* Main brand color */
  --color-brand-primaryDark: #YOUR_DARK;   /* Darker variant */
  --color-brand-primaryLight: #YOUR_LIGHT; /* Lighter variant */
  --color-brand-accent: #YOUR_ACCENT;      /* Accent color */
  --color-brand-hover: #YOUR_HOVER;        /* Hover state */
  --color-brand-light: #YOUR_LIGHT_BG;     /* Light background */
}
```

3. No component changes needed - all components use semantic color names

**Naming rules that matter:**

- Dot-nesting collapses to a hyphen: `brand.primary` becomes `--color-brand-primary`
- camelCase is **preserved verbatim**, so `--color-brand-primaryDark` still yields
  `bg-brand-primaryDark` / `text-brand-primaryDark` - existing markup keeps working
- `maxWidth` lives in the `--container-*` namespace, not `--max-width-*`
- `@theme` is additive, so `--color-slate-dark` extends the built-in slate palette
  rather than replacing `slate-50..950`

## Customization for Future Projects

To use this as a template for another "billboard" website:

1. **Update Site Settings**: Edit `src/content/site/settings.json`
   - Update brand name, contact info, address
   - Modify navigation structure
   - Update legal disclaimer

2. **Update Branding**: 
   - Modify colors in the `@theme` block of `src/styles/global.css` (see Theme System above)
   - Update logo in `src/components/Logo.astro` if needed
   - Replace favicon files in `public/favicons/`

3. **Update Content**: 
   - Replace all markdown files in `src/content/pages/` and `src/content/practiceAreas/`
   - Update images in `public/images/`

4. **Customize Layout**: 
   - Edit `src/layouts/BaseLayout.astro` for header/footer changes
   - Modify `src/components/Logo.astro` for logo changes

5. **Add/Remove Sections**: 
   - Modify section components in `src/components/sections/` as needed
   - Update `src/content.config.ts` to add new section types

## Dependency Maintenance

### Completed: Astro 7 / Tailwind 4 / MDX 7 (2026-08-10)

The major upgrades previously listed here as deferred have **landed**. See
`docs/decisions/2026-08-10-major-dependency-upgrades.md` for the full ADR
(rationale, alternatives, and the verification performed).

| Package | From | To | Note |
| --- | --- | --- | --- |
| `astro` | 6.4.8 | 7.2.0 | Major. |
| `@astrojs/mdx` | 5.0.4 | 7.0.5 | Adds the new required peer `@astrojs/markdown-satteri` (0.3.5) - Astro 7 replaced remark/rehype with Satteri as the default Markdown processor. |
| `tailwindcss` | 3.4.19 | 4.3.3 | `@astrojs/tailwind` **removed entirely** (deprecated and source-removed upstream), replaced by `@tailwindcss/vite` wired into `vite.plugins` in `astro.config.mjs`. |
| `tailwind.config.mjs` | - | deleted | Theme moved to the `@theme` block of `src/styles/global.css`. |
| `@types/node` | 22.19.17 | 22.20.1 | Deliberately stays on the 22.x line - see below. |

Two related changes:

- `tsconfig.json` no longer sets `baseUrl` (deprecated in TS 6, removed in TS 7).
  It was already a no-op because the `paths` values are `./`-prefixed.
- **Browser floor rises to Safari 16.4+ / Chrome 111+ / Firefox 128+.** Tailwind 4
  emits `oklch()`, `@property`, and cascade layers.

### Still deferred

| Package | Held at | Latest | Why |
| --- | --- | --- | --- |
| `typescript` | 5.9.3 | 7.0.2 | TypeScript 7.0 is the native Go port and ships **no compiler API** (the new API is expected in 7.1). `@astrojs/check`, `@astrojs/language-server` and `@astrojs/ts-plugin` embed TypeScript's `LanguageService` programmatically, so `astro check` fails outright - see [withastro/astro#17268](https://github.com/withastro/astro/issues/17268) (open, labeled *unable to fix / upstream*). `@astrojs/check@0.9.10` declares `typescript: ^5.0.0 \|\| ^6.0.0`, deliberately excluding `^7`. |
| `@types/node` | 22.20.1 | 26.2.0 | Must match the Node runtime major (22.16.0), not track latest. v26 typings would type-check clean and fail at runtime, with no build-time signal. |

**The green light for TypeScript** is `@astrojs/check`'s published peer range gaining
`^7.0.0` - do not move before that. TypeScript **6** is permitted by the current peer
range, but it is its own migration (it changes the `types` default to `[]` and flips
`noUncheckedSideEffectImports` to `true`), so it should be its own branch.

### Watch list

`astro-icon` (1.1.5) is **unmaintained** - last release 2024-12-26, and it declares no
`peerDependencies`, so nothing warns when it falls out of support. It was verified
working under Astro 7 / Vite 8 during the upgrade. If it breaks in future, the fallback
is Astro's native SVG imports via `astro:assets`, scoped to `IconBanner.astro`.

### Applying updates

```bash
pnpm outdated          # review
pnpm audit             # advisories (most hits are build-time transitives)
```

Use pnpm only. The lockfile is `lockfileVersion: 9.0` and the pnpm version is
pinned by the `packageManager` field in `package.json`.

## Technologies

- [Astro](https://astro.build/) 7.x - Web framework
- [Tailwind CSS](https://tailwindcss.com/) 4.x - Styling, via `@tailwindcss/vite`
- [TypeScript](https://www.typescriptlang.org/) 5.9.x - Type safety (held; see Dependency Maintenance)
- [Zod](https://zod.dev/) - Schema validation (via Astro)
- [astro-icon](https://github.com/natemoo-re/astro-icon) - Icon integration

## Accessibility

This site is **WCAG 2.2 AA compliant** with comprehensive accessibility features:

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Indicators**: Visible focus rings on all interactive components
- **Screen Reader Support**: Proper ARIA labels, landmarks, and semantic HTML
- **Color Contrast**: All text meets WCAG AA contrast requirements
- **Reduced Motion**: Respects user motion preferences
- **Form Accessibility**: Proper labels, error handling, and autocomplete attributes

See `docs/ACCESSIBILITY_CHECKLIST.md` for content author guidelines.

## Astro Best Practices

This template follows Astro best practices:

- **Type Safety**: Full TypeScript coverage with proper `CollectionEntry` types
- **Static by Default**: Minimal JavaScript, server-side rendering
- **Content Collections**: Type-safe content with Zod validation
- **Utility Functions**: Reusable utilities for common operations
- **Error Handling**: Graceful fallbacks and 404 page
- **Template Configuration**: Configurable via environment variables

See `docs/ASTRO_CONVENTIONS.md` for detailed conventions and best practices.

## Responsive Design

The site uses responsive padding that adapts to screen size:
- **Mobile**: `px-4` (16px)
- **Tablet**: `md:px-6` (24px)
- **Desktop**: `lg:px-8` (32px)

All sections and containers include responsive padding to prevent content from touching viewport edges.

## Development Workflow

This project follows org-control workflow principles. See `.cursorrules` for detailed workflow guidelines.

### Key Principles

- **Explicit Acceptance Criteria**: All work must have clear, testable criteria
- **Markdown-First**: No hard-coded marketing copy in components
- **Decision Records**: Architectural decisions documented in `docs/decisions/`
- **Testing**: Code should be testable and verified
- **Type Safety**: Full TypeScript coverage, no `any` types
- **Accessibility First**: WCAG compliance is a requirement, not optional

## License

Private project for Rogers Law Office.
