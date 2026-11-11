<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repo guide

Single-page Next.js 16 (App Router) + React 19 app. npm only — there's a `package-lock.json`, no lockfiles for yarn/pnpm/bun.

## Commands

- `npm run dev` — dev server (Turbopack is the default bundler in Next 16; `next.config.ts` configures Turbopack CSS rules)
- `npm run build`, `npm run lint` (bare `eslint`, lints whole project), `npx tsc --noEmit` for typecheck
- No test framework, no CI, no env vars needed

## Conventions

- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Don't add manual memoization (`useMemo`/`useCallback`/`React.memo`); the compiler handles it.
- **Tailwind v4, CSS-first**: all theme config lives in `src/app/globals.css` (`@theme`, `@plugin "daisyui"`, shadcn CSS variables). There is no `tailwind.config.*` file — don't create one. daisyUI is also active, so some class names resolve from its plugin.
- **shadcn/ui is the "base-nova" style built on Base UI (`@base-ui/react`), not Radix** — component props/API differ from classic shadcn/Radix examples. Add components via `npx shadcn add ...` (config in `components.json`; aliases map `@/*` → `src/*`).
- `cn` is re-exported from the `cn` package via `@/lib/utils` — import it from there, like generated components do.
- Layout: routes in `src/app`, page-level site components in `src/app/components`, reusable primitives in `src/components/ui`, hooks in `src/hooks`, helpers in `src/lib`.
