# AI Agent Guide

## Project overview

Patchguard Studio is a Next.js 15 application for security-autopatching
workflows (OAuth, XSS, and authentication flows). It uses React 19,
TypeScript, Tailwind CSS, and shadcn/ui-style components.

## Repository layout

- `src/app/` — App Router routes, root layout, and global styles.
- `src/components/ui/` — reusable UI primitives.
- `src/lib/` — shared frontend utilities.
- `src/config/` — application configuration and environment validation.
- `src/utils/` — cross-cutting helpers such as logging.

Use the `@/` alias for imports from `src/` (for example,
`import { cn } from "@/lib/utils"`).

## Working conventions

- Write TypeScript with strict types; avoid `any` and unsafe type assertions.
- Keep React components small, focused, and accessible. Use semantic HTML and
  preserve keyboard and screen-reader behavior when changing interactive UI.
- App Router files are Server Components by default. Add `"use client"` only
  when browser APIs, event handlers, or client-side hooks are required.
- Prefer existing UI primitives in `src/components/ui/` and the `cn` utility
  for conditional Tailwind class names.
- Keep secrets out of source control. Read runtime configuration through
  `src/config/env.ts`; do not expose server-only values to client components.
- Make the smallest scoped change that satisfies the request. Do not rewrite
  unrelated code or generated files.

## Commands

```bash
npm install            # install dependencies
npm run dev            # start local development server
npm run build          # production build and type validation
npx tsc --noEmit       # standalone TypeScript check
npm run format         # format JS, TS, JSON, and Markdown files
```

Run the most relevant validation after changes. For UI work, also inspect the
affected route in the browser at `http://localhost:3000`.

## Change checklist

- Follow the existing Tailwind visual language and responsive patterns.
- Handle loading, empty, error, and disabled states where applicable.
- Verify no credentials, tokens, or sensitive request data reach logs or the
  client bundle.
- Update the README when setup, commands, or the application architecture
  changes.
