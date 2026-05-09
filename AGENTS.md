<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

In Next.js 16, the middleware file is `proxy.ts` (not `middleware.ts`). Do not rename it.
<!-- END:nextjs-agent-rules -->

---

# Lumara — Agent Instructions

## Project

Lumara is a feminine beauty e-commerce brand for Portugal.

The project uses:
- Next.js App Router (v16)
- TypeScript
- TailwindCSS
- Shopify
- Stripe Checkout
- Clerk
- Future DSers integration
- Future analytics and marketing automations

## Core Rules

- Do not delete files without explicit permission.
- Do not expose secrets.
- Do not edit `.env.local` unless explicitly asked.
- Do not change checkout logic without checking Stripe and Shopify flows.
- Do not change webhook logic without validating signature handling.
- Do not move App Router files unless necessary.
- Prefer small, safe changes.
- Explain risky changes before making them.
- Keep code clean, typed and maintainable.

## Folder Meaning

- `app/`: Next.js routes, layouts and API route handlers.
- `components/`: reusable UI and page components.
- `lib/`: integrations, clients, helpers and business logic.
- `hooks/`: React hooks.
- `store/`: state management (Zustand stores).
- `types/`: shared TypeScript types.
- `config/`: static project configuration.
- `content/`: copywriting, markdown and legal content.
- `data/`: static data files (bundles, preferences).
- `docs/`: project documentation.
- `.agents/`: agent instructions, workflows and skills.
- `public/`: public assets.
- `scripts/`: utility scripts.
- `tests/`: tests.
- `prisma/`: database schema and migrations.

## Brand Direction

Lumara should feel:
- feminine
- elegant
- clean
- premium but accessible
- intentional
- trustworthy

Avoid:
- cheap dropshipping look
- messy layouts
- random colors
- overcomplicated UI
- fake urgency
- generic beauty-store language

## Agent Behavior

Before changing files:
1. Read the relevant files.
2. Understand the current structure.
3. Check imports.
4. Check risks.
5. Make the smallest safe change.

After changing files:
1. Check imports.
2. Check TypeScript errors.
3. Run lint/build if possible.
4. Report exactly what changed.

## Key Files

| File | Purpose |
|------|---------|
| `proxy.ts` | Clerk middleware — do NOT rename, do NOT modify without understanding Clerk flow |
| `app/layout.tsx` | Root layout — affects every page |
| `lib/shopifyCheckout.ts` | Shopify + Stripe integration — high risk |
| `lib/stripe.ts` | Stripe client — high risk |
| `lib/prisma.ts` | Database client — high risk |
| `next.config.ts` | Next.js config with security headers |
| `.env.local` | Secrets — NEVER read, NEVER modify, NEVER commit |
| `prisma/schema.prisma` | Database schema |

## Skills

Reusable agent skills are stored in:

.agents/skills/

Every skill folder should contain a `SKILL.md`.  
Folders with only `MISSING_SKILL.md` are broken — reinstall the skill, do not invent content.
