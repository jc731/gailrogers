# CLAUDE.md — Rogers Law Office (gailrogers)

Astro 7 + Tailwind 4 + TypeScript markdown-first website for Rogers Law Office. Billboard-style template with content collections.

## Commands

```bash
pnpm dev        # dev server (port 4321)
pnpm build      # production build
pnpm preview    # preview production build
```

**Package manager**: pnpm only. Never use npm or yarn.

## Project Structure

```
src/
  components/
    sections/       # Hero, Slider, IconBanner, RichText, FAQ, CTABand, CardGrid, LinkButtons
    forms/          # FormInput, FormTextarea, ContactForm
    Logo.astro
    SectionRenderer.astro
  content.config.ts              # Zod schemas + glob/file loaders for all content types
  content/
    site/settings.json           # Brand, phone, address, nav, global CTAs
    pages/                       # Regular page markdown files
    practiceAreas/               # Practice area markdown files (route: /practice/[slug])
  layouts/BaseLayout.astro
  pages/
    index.astro                  # Home
    [...slug].astro              # Dynamic routing from content
    404.astro
  utils/content.ts
  config/template.ts             # Template-level config
  styles/global.css              # Tailwind entry + `@theme` brand tokens + focus-ring utilities
docs/decisions/                  # Architecture Decision Records (ADRs)
```

## Content Management

- **Markdown-first**: All page/practice area content lives in `src/content/`. No hard-coded marketing copy in components — only UI labels like "Skip to content" belong in `.astro` files.
- Edit `src/content/site/settings.json` for brand name, phone, address, nav, and global CTAs.
- Pages use a `sections` array in frontmatter. Available section types: `hero`, `slider`, `iconBanner`, `richText`, `faq`, `ctaBand`, `cardGrid`, `linkButtons`, `contactForm`.
- Practice areas route to `/practice/[slug]` automatically via `[...slug].astro`.

## Theme

Brand colors are defined in the `@theme` block of `src/styles/global.css` as `--color-brand-*` custom properties (`primary`, `primaryDark`, `primaryLight`, `accent`, `hover`, `light`, `navy`). All components use these semantic names — never hardcode hex values in components.

Tailwind 4 notes:
- There is no `tailwind.config.mjs`. Theme tokens are CSS-first; a `--color-x-y` variable produces the `bg-x-y` / `text-x-y` utilities. camelCase is preserved verbatim, so `--color-brand-primaryDark` → `bg-brand-primaryDark`.
- Source scanning is pinned to `src/` via `@import "tailwindcss" source(none)` + `@source`. Without this, Tailwind scans the whole repo and pulls class names out of `docs/*.md` into the production bundle.
- Scoped `<style>` blocks compile separately, so any block using `@apply` with brand tokens must start with `@reference "../../styles/global.css";`.

## Code Standards

- TypeScript strict mode — no `any` types
- WCAG 2.2 AA accessibility is required, not optional
- Minimal JavaScript — prefer SSR/static over client-side logic
- Mobile-first Tailwind: base classes = mobile, `md:` = tablet, `lg:` = desktop
- **Fix warnings, never suppress them** — warnings indicate real issues; address the root cause

## Workflow Rules

### Escalate and get explicit approval before proceeding when the request involves:
- Breaking changes (API changes, behavior changes affecting existing functionality)
- Security-sensitive work (auth, data handling, secrets)
- Schema/content-schema migrations
- Unclear or ambiguous requirements

### Acceptance criteria
Every non-trivial task needs clear, testable acceptance criteria before implementation begins. If missing, ask for them.

### Decision records
Architectural decisions go in `docs/decisions/` as ADR files, not in conversation. Format:

```markdown
# Decision: [Title]
**Date**: [Date]
**Status**: Proposed | Accepted | Rejected | Superseded

## Context
## Decision
## Rationale
## Alternatives Considered
## Consequences
```

### Code review format
When reviewing diffs or PRs:
1. **Summary of Changes**
2. **Risk Assessment**
3. **Actionable Feedback** — prefix as `Critical:`, `Suggestion:`, or `Nice-to-have:`
4. **Approval Status**
