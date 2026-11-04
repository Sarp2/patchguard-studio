# AGENTS.md

## Project overview

Patchguard Studio is a Next.js application for security autopatching across OAuth, XSS, and authentication flows.

## Tech stack

- Next.js 15 with the App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS
- shadcn/ui and Radix UI primitives
- Zod and React Hook Form for validation and forms

## Repository layout

- `src/app/` — routes, layouts, and global styles
- `src/components/ui/` — reusable shadcn/ui components
- `src/lib/` — shared helpers
- `src/config/` — application configuration
- `src/utils/` — general utilities

Use the `@/` alias for imports from `src/`.

## Development commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run format
```

## Working conventions

- Keep TypeScript strict; do not introduce `any` unless there is a documented reason.
- Prefer React Server Components. Add `"use client"` only when browser APIs, state, effects, or event handlers require it.
- Reuse components from `src/components/ui/` before creating new primitives.
- Use Tailwind utilities and existing design tokens instead of adding one-off inline styles.
- Keep environment-variable access centralized in `src/config/env.ts`.
- Do not expose secrets or server-only values to client components.
- Keep changes focused on the requested task and preserve unrelated user changes.

## Validation

Before handing off a change:

1. Run the most relevant checks for the files changed.
2. Run `npm run build` for changes that affect application behavior or production compilation.
3. Run `npm run lint` when the configured lint command is available.
4. Manually verify affected UI flows for visual or interaction changes.

If a check cannot be run or fails for a pre-existing reason, report that clearly in the handoff.
