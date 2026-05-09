@AGENTS.md

# Lumara — CLAUDE.md

## Project Overview

**Lumara** é uma loja de e-commerce portuguesa (B2C) que vende equipamentos profissionais de cabelo, skincare e acessórios de cuidado capilar. A interface está em português; a moeda é EUR; os países servidos são PT, ES, FR, DE, IT, NL, BE, GB, AT, CH.

**Estado atual (Maio 2026):** MVP funcional com checkout completo (Stripe → Shopify), autenticação (Clerk), área de conta, e catálogo de 14 produtos. Deployment em Vercel.

**Objetivo final:** Loja auto-suficiente em produção — sem carrinho Shopify nativo, gerido inteiramente pela stack Next.js + Stripe + Shopify Admin.

---

## Architecture & Stack

| Camada | Tecnologia | Versão | Notas |
|--------|-----------|--------|-------|
| Framework | Next.js (App Router) | 16.2.4 | **Tem breaking changes vs. versões anteriores — ler docs antes de escrever código** |
| UI | React | 19.2.4 | Server + Client Components |
| Linguagem | TypeScript + JS | 5 | Mix: .ts/.tsx para novas features, .js/.jsx em ficheiros legados |
| Styling | Tailwind CSS | 4 | PostCSS; tokens `--lumara-*` definidos em globals.css |
| Animações | Framer Motion | 12.38.0 | |
| Icons | Lucide React | 1.8.0 | |
| Auth | Clerk | 7.2.8 | ClerkProvider no root layout |
| Pagamentos | Stripe | 22.1.0 | API version: `2026-04-22.dahlia` |
| E-commerce | Shopify | API 2026-04 | Dual: Storefront (público) + Admin (servidor) |
| ORM | Prisma | 7.8.0 | Com `@prisma/adapter-pg` (driver nativo PostgreSQL) |
| Base de dados | PostgreSQL | — | Via Vercel/Neon ou equivalente |
| Estado cliente | Zustand | 5.0.12 | Persistência localStorage |
| Email | Resend | 6.12.2 | Configurado mas ainda não implementado |
| Webhooks | Svix | 1.92.2 | Para validação de webhooks Clerk |
| Validação | Zod | 4.4.2 | |
| Hosting | Vercel | — | `.vercel/` presente |

**Fontes:** Nunito (headings, `--font-nunito`) + DM Sans (body, `--font-dm-sans`).

---

## File Structure

```
lumara/
├── app/                         # App Router — tudo aqui (sem src/)
│   ├── layout.tsx               # Root: ClerkProvider + fontes Google
│   ├── page.tsx                 # Homepage — Server Component
│   ├── globals.css              # Tailwind + tokens CSS --lumara-*
│   ├── api/
│   │   ├── checkout/
│   │   │   ├── route.ts         # POST checkout simples (legacy/não usado)
│   │   │   ├── create-session/  # POST — criar sessão Stripe (fluxo principal)
│   │   │   └── status/          # GET — polling de status pelo frontend
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts  # Webhook Stripe: cria ordem Shopify
│   │   │   └── clerk/           # Webhook Clerk: sync de utilizadores
│   │   ├── admin/
│   │   │   └── retry-shopify-order/  # POST protegido por ADMIN_RETRY_SECRET
│   │   ├── account/             # me, addresses, orders, update
│   │   ├── favorites/           # sync de favoritos
│   │   ├── preferences/
│   │   └── support/
│   ├── loja/
│   │   ├── page.tsx             # Server Component (fetch)
│   │   └── LojaClient.tsx       # Client Component (filtros/sort)
│   ├── produto/[slug]/
│   │   ├── page.tsx             # Server, ISR revalidate: 60
│   │   └── ProductDetail.tsx    # Client Component (carrinho, variantes)
│   ├── bundles/[slug]/
│   ├── checkout/sucesso/        # Polling de status + exibição de ordem
│   ├── checkout/cancelado/
│   ├── conta/                   # Protegido por Clerk
│   └── [login, criar-conta, promocoes, rituais, sobre-nos, faq, apoio]/
├── components/
│   ├── layout/                  # Navbar, Footer, CartDrawer, LikesDrawer,
│   │                            # SearchDrawer, ProfileDrawer
│   ├── sections/                # Hero, FeaturedProducts, CategoryGrid,
│   │                            # Testimonials, Newsletter, TrustRow, etc.
│   ├── account/                 # AccountMenu, AddressCard, OrderCard, SupportForm
│   └── ui/                      # Button, Badge, ProductCard, SectionLabel, StatBar
├── lib/
│   ├── prisma.ts                # Singleton PrismaClient com PrismaPg adapter
│   ├── stripe.ts                # Singleton Stripe client
│   ├── shopify.js               # Shopify Storefront API (público)
│   ├── shopifyAdmin.js          # Shopify Admin API (servidor, token secreto)
│   ├── shopifyCheckout.ts       # validateCartItems + createShopifyOrder
│   ├── products.ts              # Catálogo local + sync Shopify (handle mapping)
│   ├── cart.ts                  # Zustand store: lumara-cart (localStorage)
│   ├── likes.ts                 # Zustand store: lumara-likes (localStorage)
│   └── types/checkout.ts        # CartLineInput, ValidatedLine, ShopifyOrderInput, etc.
├── hooks/                       # useCustomer.js, useFavorites.js, usePreferences.js
├── data/                        # bundles.ts (estático), favorites.json, preferences.json
├── prisma/schema.prisma         # Modelos: CheckoutSession, WebhookEvent
├── public/                      # products/ (~130 imgs), banners/, bundles/, logo.png
├── lumara_all/                  # Assets de design (LOGO, PRODUTOS, ADS) — não commit
├── proxy.ts                     # ⚠️ Este é o middleware do Next.js 16 (era middleware.ts)
├── prisma.config.ts             # Carrega .env.local para CLI Prisma
├── next.config.ts               # Security headers + remote image patterns
└── package.json                 # Scripts: dev | build (prisma generate + migrate deploy + next build)
```

---

## Development Workflow

```bash
# Instalar dependências
npm install

# Desenvolvimento local
npm run dev          # next dev (porta 3000)

# Build de produção (inclui migrate automático)
npm run build        # prisma generate && prisma migrate deploy && next build

# Lint
npm run lint

# Prisma (usar diretamente com .env.local carregado via prisma.config.ts)
npx prisma studio
npx prisma migrate dev --name <name>
npx prisma generate
```

**Variáveis de ambiente obrigatórias** (ver `.env.example`):
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
SHOPIFY_ADMIN_ACCESS_TOKEN          # shpat_...
SHOPIFY_STOREFRONT_API_VERSION      # 2026-04
SHOPIFY_ADMIN_API_VERSION           # 2026-04
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET
NEXT_PUBLIC_CLERK_SIGN_IN_URL       # /login
NEXT_PUBLIC_CLERK_SIGN_UP_URL       # /criar-conta
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
DATABASE_URL                        # PostgreSQL connection string
NEXT_PUBLIC_APP_URL
ADMIN_RETRY_SECRET                  # Para /api/admin/retry-shopify-order
```

---

## Conventions & Style

### Server vs Client Components
- **Server** (default): pages que só fazem fetch e renderizam — `app/page.tsx`, `app/loja/page.tsx`
- **Client** (`'use client'`): qualquer coisa com state, eventos, Zustand, Framer Motion
- **Padrão dominante**: Server Component → passa props → Client Component filho
  ```
  app/produto/[slug]/page.tsx (Server, ISR) → ProductDetail.tsx (Client)
  app/loja/page.tsx (Server) → LojaClient.tsx (Client)
  ```

### Nomenclatura
- Componentes: `PascalCase.tsx` ou `.jsx` (legado)
- Rotas API: `route.ts` (Next.js convention)
- Utilitários: `camelCase.ts`
- Zustand stores / hooks: `use*.ts` ou `use*.js`
- CSS tokens: `--lumara-warm-black`, `--lumara-gold` (#E0689F), `--lumara-offwhite` (#faf8fb)

### Estilo de código
- TypeScript estrito (`"strict": true` em tsconfig)
- Alias `@/*` → raiz do projeto (ex: `@/lib/stripe`, `@/components/ui/Button`)
- Zod para validar todos os POST bodies nas API routes
- Sem comentários genéricos — apenas WHY não óbvio

### Padrões de erro em API routes
```typescript
try { ... }
catch (err) { return Response.json({ error: msg }, { status: 500 }) }
```

### Dados de produto: híbrido local + Shopify
- `lib/products.ts` define catálogo completo localmente (editorial: headline, benefits, stats)
- Se `shopifyHandle` definido, enriquece automaticamente com preço/imagens/variantes do Shopify
- Fallback para dados locais se Shopify indisponível
- ISR com `revalidate: 60` nas páginas de produto

---

## Key Decisions & Context

### ⚠️ Breaking Changes Next.js 16
- **`middleware.ts` → `proxy.ts`**: O middleware do Clerk foi renomeado porque Next.js 16 mudou a convenção. **Não renomear de volta**.
- APIs, convenções de ficheiros e behavior podem diferir do treino do modelo. **Ler `node_modules/next/dist/docs/` antes de escrever código novo**.

### Checkout: Stripe-first, não Shopify-native
- O carrinho é 100% client-side (Zustand localStorage)
- O checkout **não usa** o carrinho nativo do Shopify — o fluxo é:
  1. Criar sessão Stripe com itens validados
  2. Confirmar pagamento no Stripe
  3. Criar ordem em Shopify via Admin API no webhook
- O endpoint `/api/checkout/route.ts` (checkout Shopify simples) existe mas está deprecated.

### Prisma 7 com Driver Nativo
- Usar `PrismaPg` adapter com `Pool` do `pg` — não o Prisma padrão sem adapter
- `prisma.config.ts` carrega `.env.local` para a CLI funcionar localmente
- `DATABASE_URL` é obrigatório para build (inclui `migrate deploy`)

### Shopify Admin API: Ordens com `financialStatus: PAID`
- Ordens são criadas com pagamento já confirmado no Stripe
- `sourceIdentifier` = Stripe session ID (para rastreamento)
- Custom attributes incluem: `stripe_session_id`, `stripe_payment_intent_id`, `clerk_user_id`
- Tags: `['External Store', 'Stripe Checkout', 'DSers', 'Clerk']`

### Deduplicação de Webhooks Stripe
- Modelo `WebhookEvent` com `stripeEventId` único previne processamento duplo
- Verificar sempre antes de processar `checkout.session.completed`

### Status `PAID_BUT_SHOPIFY_FAILED`
- Se Stripe confirma mas Shopify falha, o status fica `PAID_BUT_SHOPIFY_FAILED`
- Admin pode reprocessar via `POST /api/admin/retry-shopify-order` (Bearer token)
- **Nunca marcar como FAILED se o Stripe já processou** — cliente pagou

### Prisma Schema minimalista (intencional)
- Apenas 2 modelos: `CheckoutSession` e `WebhookEvent`
- User profiles ficam no Clerk + Shopify — não duplicar em PostgreSQL
- Só persistir o que é necessário para reconciliação de pagamentos

### Segurança (não alterar sem discussão)
- Security headers em `next.config.ts` são aplicados globalmente — não remover
- `proxy.ts` (middleware): rotas protegidas por Clerk; `/api/webhooks/*` é público intencionalmente
- Webhooks Stripe validados com `stripe.webhooks.constructEvent()` — nunca fazer skip

---

## Tools & Agents

**MCP Servers configurados** (Claude Code):
- **Shopify MCP**: Acesso direto ao Shopify Admin (produtos, ordens, clientes, GraphQL)
- **Stripe MCP**: Acesso direto ao Stripe (sessões, pagamentos, subscrições)
- **Google Drive MCP**: Acesso a assets e documentação no Drive

**Claude Code skills disponíveis:**
- `vercel:deploy`, `vercel:env`, `vercel:status` — gestão de deployments Vercel
- `stripe-best-practices`, `upgrade-stripe` — guidance Stripe
- `vercel:nextjs`, `vercel:auth`, `vercel:shadcn` — guidance Next.js/UI

**Vercel**: Projeto linked em `.vercel/`. Deploy automático em push para `main`.

---

## Current Focus & Next Steps

**Integração de checkout** concluída (commit `0b0937e`). Possíveis próximos passos:
- Implementar envio de emails transacionais (Resend — dependência já instalada)
- Adicionar página de rastreamento de encomendas (integrar com dados Shopify)
- Completar área de conta (`/conta`) — ordens históricas, endereços
- Melhorar UX da página `/checkout/sucesso` com dados completos da ordem
- Testes de integração do fluxo checkout (Stripe test mode → Shopify)
- Avaliar se `unoptimized: true` em imagens deve ser removido para performance

---

## Preferences

- **Língua de resposta:** Português (PT) — código em inglês, comunicação em português
- **Nível de detalhe:** Alto. Incluir ficheiros e line numbers nas respostas.
- **Tom:** Direto, sem frases genéricas. Preferir factos concretos do projeto.
- **Commits:** Só criar quando explicitamente pedido. Mensagens em português.
- **Comentários no código:** Apenas quando o WHY não é óbvio — sem docstrings multi-linha.
- **Exploração antes de implementar:** Ler ficheiros relevantes antes de escrever código novo.
- **Não inventar URLs** nem fazer suposições sobre APIs externas sem verificar.
