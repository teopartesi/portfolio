---
name: portfolio-frontend
description: Implement, review, or refactor frontend changes in this portfolio's Next.js App Router application. Use for work on app routes and metadata, React sections and layout components, Tailwind styling, responsive behavior, accessibility, portfolio content in lib/data.ts, or public UI assets.
---

# Portfolio frontend

Follow the repository-wide rules in `AGENTS.md`, then use this workflow for frontend work.

## Inspect before editing

1. Read `app/page.tsx`, the affected component, and its nearby shared primitives.
2. Read `lib/data.ts` when changing copy, navigation, projects, skills, or experience data.
3. Read `app/globals.css` before introducing colors, typography, or global styles.
4. Read the relevant version-matched guide in `node_modules/next/dist/docs/` before relying on a Next.js API or convention.
5. Check the layout at narrow and wide viewport widths when the change affects rendering.

## Preserve the architecture

- Keep `app/page.tsx` as the ordered composition of page sections.
- Place page chrome in `components/layout/`, full sections in `components/sections/`, and small reusable primitives in `components/ui/`.
- Keep displayable portfolio data in `lib/data.ts` when it does not need component state or markup.
- Prefer Server Components. Add `"use client"` only for actual client-side interactivity, and keep the client boundary as small as possible.
- Use the existing `@/*` alias, strict TypeScript, named component exports, and App Router default exports.
- Reuse existing patterns before introducing abstractions or dependencies.

## Maintain the visual system

- Preserve the dark neutral background, light foreground, cyan accents, restrained borders, and current spacing rhythm unless a redesign is explicitly requested.
- Build responsive behavior mobile-first and avoid fixed dimensions that cause overflow.
- Keep motion subtle and honor reduced-motion preferences when adding animation.
- Use semantic landmarks and headings, keyboard-operable controls, visible focus states, descriptive labels, and useful image alternative text.
- Avoid embedding user-facing strings in several components; centralize reusable content in `lib/data.ts`.

## Validate the result

Run after every frontend code change:

```bash
npm run lint
npm run build
```

Also inspect the changed page in a browser when visual behavior, responsiveness, navigation, or interaction changes. Report checks that could not be run; do not claim visual verification from lint or build output alone.

If the change affects setup, structure, stack, or user-visible project documentation, update `README.md` in the same change. If it affects runtime packaging or deployment, stop using this frontend-only workflow and also follow the relevant Docker, deployment, infrastructure, and production rules in `AGENTS.md`.
