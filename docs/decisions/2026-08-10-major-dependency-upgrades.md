# Decision: Major dependency upgrades — Astro 7, Tailwind 4, and holding TypeScript at 5.9

**Date**: 2026-08-10
**Status**: Accepted
**Decision Makers**: Jon Cagle (approval), Claude (research and implementation)

## Context

Five direct dependencies had major versions available:

| Package | Installed | Latest |
|---|---|---|
| `astro` | 6.4.8 | 7.2.0 |
| `@astrojs/mdx` | 5.0.4 | 7.0.5 |
| `tailwindcss` | 3.4.19 | 4.3.3 |
| `typescript` | 5.9.3 | 7.0.2 |
| `@types/node` | 22.19.17 | 26.2.0 |

Two constraints made this more than a routine bump:

1. **`@astrojs/tailwind@6.0.2` is deprecated and source-removed upstream.** Its peer range
   (`astro ^3 || ^4 || ^5`) did not even include Astro 6, so the project was already running an
   unsatisfied peer. There is no version of it that supports Astro 7, and no Tailwind-3 path
   forward on Astro 7. The Astro upgrade therefore forces the Tailwind 4 migration.
2. **`astro-icon@1.1.5` is unmaintained** (last release 2024-12-26, no peer dependencies declared)
   and is used heavily via `icon({ include: { mdi: ['*'] } })`. Its behavior under Vite 8 / Rolldown
   was unknown before the upgrade.

## Decision

Upgrade `astro` 6→7, `@astrojs/mdx` 5→7 (adding the new `@astrojs/markdown-satteri` peer), and
`tailwindcss` 3→4 via `@tailwindcss/vite`. **Hold `typescript` at 5.9.3** and **hold `@types/node`
on the 22.x line** (bumped 22.19.17 → 22.20.1).

Delivered as three independently verifiable commits, each ending with a green
`pnpm build` and `astro check`.

Specific implementation choices:

- **Port the Tailwind theme to CSS-first `@theme` by hand**, not with `npx @tailwindcss/upgrade`.
- **Scope Tailwind sources explicitly**: `@import "tailwindcss" source(none)` + `@source "../../src"`.
- **Adopt Astro 7's new `compressHTML: 'jsx'` default** rather than pinning `compressHTML: true`.

## Rationale

**TypeScript held at 5.9.** TypeScript 7.0 is the native Go port and **ships no compiler API**;
the new API is expected in 7.1. Every Astro type-checking tool (`@astrojs/check`,
`@astrojs/language-server`, `@astrojs/ts-plugin`) embeds TypeScript's `LanguageService`
programmatically, so they cannot run at all. `@astrojs/check@0.9.10` declares
`typescript: ^5.0.0 || ^6.0.0` — the exclusion of `^7` is deliberate, and the package was
published *after* Astro 7.0 shipped. Astro itself declares no `typescript` peer and never invokes
`tsc`, so this affects only editor tooling and `astro check`, never the production build.
TypeScript 6 is permitted by the peer range but is a separate migration (it changes the `types`
default to `[]` and flips `noUncheckedSideEffectImports` to `true`), so it was not bundled here.

**`@types/node` tracks the runtime, not `latest`.** The runtime is Node 22.16.0 and `engines` is
`>=22.12.0`. `@types/node` 26 would describe APIs the runtime does not have — it type-checks clean
and fails at runtime, with no build-time signal. The 22.x line is still actively published.

**Hand-written `@theme` over the codemod.** The codemod kebab-cases camelCase theme keys in the
generated CSS but does not rewrite markup (tailwindlabs/tailwindcss#16156), which would have
silently broken all `bg-brand-primaryDark` / `bg-brand-primaryLight` call sites. Tailwind 4
preserves camelCase verbatim in `@theme`, so hand-writing it kept every existing class name working
with zero markup churn. The codemod is also documented as unreliable on `.astro` files.

**Explicit `@source` scoping.** Tailwind 4's automatic source detection scans the whole repository
(respecting `.gitignore`, which does not exclude `docs/`). This was pulling class names out of
markdown documentation into the production bundle — `bg-maroon-900` appeared in the shipped CSS
despite being used nowhere in `src/`. `source(none)` + `@source "../../src"` restores the v3
`content` scope and cut 3.1KB from the CSS.

**Adopting `compressHTML: 'jsx'`.** Pinning `compressHTML: true` would have preserved v6 output
exactly but deferred the whitespace review indefinitely. Taking the new default surfaced the
problem immediately, and it turned out to be a single real regression plus one improvement.

## Alternatives Considered

- **Upgrade TypeScript to 7.0.2**: Rejected — breaks `astro check` outright
  (withastro/astro#17268, open, labeled *unable to fix / upstream ecosystem problem*).
- **Upgrade TypeScript to 6.0**: Deferred — permitted by the peer range and Microsoft's
  recommended stable line, but it is its own migration and should not ride along with an Astro major.
- **Track `@types/node` 26**: Rejected — silently promises APIs Node 22 lacks.
- **Keep Tailwind 3**: Not viable — `@astrojs/tailwind` is deprecated, source-removed, and has no
  Astro 6 or 7 peer support.
- **`@config "./tailwind.config.mjs"` escape hatch**: Rejected — it works (and preserves camelCase
  as of v4.1.18), but it keeps a JS config that Tailwind treats as legacy, and silently ignores
  `corePlugins`, `safelist`, and `separator`. The full port is only ~25 lines of CSS.
- **`npx @tailwindcss/upgrade` codemod**: Rejected — see Rationale.
- **Pin `compressHTML: true`**: Rejected — see Rationale.
- **Replace `astro-icon` preemptively**: Rejected — it was proven working under Vite 8 by build and
  visual verification. Replacing it is a real refactor of `IconBanner.astro` and should be its own
  decision, taken only if it actually breaks.

## Consequences

- **Positive**: Off two deprecated/unsupported packages. Production build ~2× faster (3.0s → 1.5s)
  under Rolldown. CSS bundle 3.1KB smaller. Brand theme is now a single CSS block, closer to the
  `CLAUDE.md` "single source of truth" intent. `leading-snug` on RichText `h2` now actually applies.
- **Negative**: Browser floor rises to Safari 16.4+ / Chrome 111+ / Firefox 128+ (Tailwind 4 emits
  `oklch()`, `@property`, and cascade layers). Scoped `<style>` blocks that use `@apply` now need an
  explicit `@reference` — a new authoring rule for the three RichText components.
- **Risks**: `astro-icon` remains unmaintained and declares no peer dependencies, so a future Astro
  or Vite major could break it with no upstream fix. TypeScript is now deliberately pinned behind
  `latest` and needs periodic re-checking.
- **Mitigation**: `@astrojs/check`'s published peer range is the reliable green light for
  TypeScript — do not move to 7 until it gains `^7.0.0`. For `astro-icon`, see the icon strategy
  section below.

### Verification performed

- `pnpm build` green: 16 pages + `sitemap-index.xml`; `astro check` 0 errors / 0 warnings.
- Rendered class vocabulary before/after: 232 tokens → 232 tokens, a clean 1:1 with exactly five
  renames (`rounded`→`rounded-sm`, `shadow-sm`→`shadow-xs`, `flex-shrink-0`→`shrink-0`,
  `hover:bg-opacity-90`→`hover:bg-heading-subheading/90`, `focus:rounded`→`focus:rounded-sm`).
- Homepage renders **pixel-identical** (0 of 5,918,025 px) between the Tailwind 4 build and the
  final Astro 7 build at 1440×900.
- Layout-aware `innerText` compared across all 16 routes: the only change is `/thank-you/`, where
  `217-318-0677 .` loses a stray space before the period.
- Netlify Forms contract intact (`data-netlify`, `netlify-honeypot`, `form-name`, honeypot field).
- WCAG focus indicators verified computed: 2px ring in `#6b2b1f` with offset, both light and dark
  variants. No console errors or warnings.

### Known visual change

RichText `h2` line-height changes 40px → 49.5px at `md:` and above. The `h2` `@apply` carries
`leading-snug`; in Tailwind 3 the paired line-height on `md:text-4xl` silently overrode it, and in
v4 font-size utilities defer to `--tw-leading`, so the authored `leading-snug` now wins. This is
Tailwind honoring the source as written. All non-RichText pixels are unchanged.

### Regression found and fixed

Astro 7's `compressHTML: 'jsx'` drops the newline between `{label}` and the required-field asterisk
in `FormInput.astro` / `FormTextarea.astro`, rendering `Full Name*` instead of `Full Name *`. Both
components now emit an explicit space expression.

## Addendum: icon strategy (2026-08-10)

`astro-icon` was reviewed for replacement after the upgrade. **Decision: keep it, and remove the
unused `@iconify-json/map` dependency.** No component code changes.

**Icon names in this project are content data, not code.** `src/content.config.ts:87` declares
`icon: z.string()`, and `src/content/pages/home.md` supplies `mdi:family` and
`mdi:human-male-female-child` from frontmatter. Three components consume the library:
`sections/IconBanner.astro`, `MobileMenu.astro`, and `DropdownIndicator.astro`.

That single fact disqualifies the obvious replacements:

- **Astro native SVG components** (stable since 5.7, no experimental flag in 7) are static ESM
  imports. Supporting a data-driven name needs a hand-maintained `Record<string, SvgComponent>`,
  which turns "add any MDI icon from markdown" into "edit a TypeScript map first". That breaks the
  markdown-first contract this project is built on.
- **`@iconify/tailwind4`** is the idiomatic Tailwind 4 answer in general, but generates icons as
  CSS `mask-image` + `background-color`. Three problems here: class names must be statically visible
  to the scanner, so a frontmatter-driven `icon-[mdi--x]` requires a hardcoded `@source inline(...)`
  allowlist; background graphics **do not print** by default; and the icon disappears entirely if
  CSS fails to load. Inline SVG survives all three. Against a WCAG 2.2 AA requirement that is a
  regression, not an upgrade.
- **`unplugin-icons`** has the same static-import constraint as native SVG.
- **`iconify-icon` web component** requires client-side JS and fetches icon data at runtime,
  violating the minimal-JS policy in `CLAUDE.md`.

**`include: { mdi: ['*'] }` is deliberate, not an oversight.** It is what allows a content author to
use any MDI name in markdown without a code change. Narrowing it to the five icons used today would
turn a content edit into a hard build error (`Icon.astro` throws `AstroIconError` on an unknown
name). The cost is build-time only — the whole collection is serialized into a virtual module, but
this is a static build and none of it reaches the browser.

**What was actually fixed.** `astro-icon`'s `detectInstalledCollections()` scans `package.json` and
auto-assigns `include[name] = ["*"]` to **any** installed `@iconify-json/*` package that is not
explicitly listed in config. `@iconify-json/map` (134KB, never referenced anywhere in `src/`) was
therefore being fully loaded and serialized on every build despite not appearing in
`astro.config.mjs`. Removing the dependency is pure win. Verified after removal: 66 icon instances
across 16 pages still render, all five distinct icons resolve, zero orphaned `<use>` references.

**Known risk, accepted.** `astro-icon@1.1.5` has had no commits since 2024-12-26 and declares no
`peerDependencies`, so no package manager will warn when a future Astro major breaks it. It is
verified working on Astro 7.2.0 / Vite 8. There is no v2 in progress, no blessed fork, and no
first-party Astro icon solution (`withastro/roadmap#107` was closed deferring to community
packages). Community forks exist (`@dallay/astro-icon`, `@twodft/astro-icon`) but target Astro 6 and
their maintenance quality is unverified.

**Exit path if it does break:** a local `Icon.astro` (~40 lines) wrapping `getIconData()` +
`iconToSVG()` from `@iconify/utils` (already present transitively). That preserves data-driven
names, inline SVG, print rendering, and `currentColor`, and drops the integration entirely. Cost:
three component imports, one new component, `astro.config.mjs`, `package.json`. This is the
documented fallback — do not pre-emptively migrate to native SVG or CSS-mask icons.

## References

- [Upgrade to Astro v7](https://docs.astro.build/en/guides/upgrade-to/v7/)
- [Tailwind CSS v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
- [Tailwind CSS with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [withastro/astro#17268 — astro check with TypeScript 7](https://github.com/withastro/astro/issues/17268)
- [tailwindlabs/tailwindcss#16156 — codemod camelCase theme keys](https://github.com/tailwindlabs/tailwindcss/issues/16156)
- [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
