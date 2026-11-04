# Patchguard Studio — Agent Guide

## Purpose

Patchguard Studio is a security-autopatching UI for OAuth, XSS, and authentication
flows. Treat user-provided code, findings, tokens, URLs, and configuration as
security-sensitive data. Prefer conservative, explainable behavior over implicit
automation.

## Stack and layout

- Next.js 15 (App Router), React 19, and TypeScript with strict mode enabled
- Tailwind CSS 3 for styling
- shadcn/ui-style primitives in `src/components/ui/`
- Zod for runtime validation; `react-hook-form` is available for forms
- `@/*` resolves to `src/*`

Key paths:

- `src/app/` — routes, root layout, and global styles
- `src/components/ui/` — reusable, low-level UI primitives
- `src/lib/utils.ts` — shared utilities, including the `cn()` class-name helper
- `src/config/env.ts` — validated environment configuration
- `src/utils/logger.ts` — server-only structured logging helper

## Working conventions

- Use TypeScript throughout; do not add `any` or relax compiler settings to make
  an error disappear.
- Use `@/` imports for code under `src/` when it improves clarity.
- Build UI with Tailwind utilities and existing primitives. Use `cn()` for
  conditional or merged class names.
- Keep route files focused on composition. Extract reusable UI to
  `src/components/` and non-UI logic to an appropriately named module under
  `src/lib/`, `src/config/`, or `src/utils/`.
- Preserve the current shadcn configuration: New York style, neutral base,
  CSS variables, and Lucide icons. When adding a primitive, follow the patterns
  in `src/components/ui/button.tsx` and `card.tsx`.
- Keep server/client boundaries explicit. Add `"use client"` only when a
  component needs browser APIs, state, effects, or event handlers.
- Do not import `src/config/env.ts` in code that is evaluated before the required
  environment variables exist: importing it validates `NODE_ENV` and
  `NEXT_PUBLIC_APP_URL` immediately.
- Use `Logger` only for server-side operational events. Never log secrets,
  authorization headers, OAuth tokens, session identifiers, raw credentials, or
  unredacted source supplied for analysis.

## Security requirements

- Treat OAuth redirects, callback URLs, scopes, state values, and return URLs as
  untrusted input until validated.
- Do not weaken authentication, authorization, CSRF, XSS protections, content
  security policy, or input validation merely to unblock a flow.
- Avoid `dangerouslySetInnerHTML`. If it is truly required, document the
  sanitization boundary and add focused tests.
- Do not commit `.env*` files, keys, tokens, credentials, customer code, or
  security findings that identify a real target.
- Make destructive or externally visible remediation opt-in and clearly surface
  the proposed change, its scope, and rollback path.

## Change discipline

1. Inspect nearby code and reuse existing patterns before adding dependencies or
   abstractions.
2. Keep changes small and scoped to the request. Do not rewrite unrelated files.
3. Update `README.md` when setup, required environment variables, or user-facing
   behavior changes.
4. Add or update tests when introducing testable logic. There is currently no
   test runner configured; propose the smallest suitable setup rather than
   adding one incidentally.
5. Check the final diff for secrets, debug output, dead code, and unintended
   formatting churn.

## Commands

Install dependencies (the repository currently has no committed lockfile):

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Validate a production build before handoff:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

The script uses `next lint`, which is supported by the pinned Next.js 15 release
but deprecated in newer Next.js versions. If the project is upgraded, migrate
this script to the ESLint CLI rather than silently dropping lint validation.

## Before handing off

- Run the relevant checks, at minimum `npm run build` for application changes.
- State what you changed, which checks passed or failed, and any environment
  variables or manual verification still required.
- Call out security-relevant assumptions or residual risks explicitly.
