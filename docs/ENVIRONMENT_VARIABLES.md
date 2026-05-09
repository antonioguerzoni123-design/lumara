# Variáveis de Ambiente — Lumara

Todas as variáveis necessárias para correr o projeto. Ver `.env.example` para os nomes corretos.  
**Nunca commitar `.env.local`. Nunca expor secrets.**

## Shopify

| Variável | Descrição | Obrigatória |
|---------|-----------|:-----------:|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Domínio da loja (ex: `loja.myshopify.com`) | ✅ |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Token público da Storefront API | ✅ |
| `SHOPIFY_ADMIN_ACCESS_TOKEN` | Token privado da Admin API (`shpat_...`) | ✅ |
| `SHOPIFY_STOREFRONT_API_VERSION` | Versão da API (ex: `2026-04`) | ✅ |
| `SHOPIFY_ADMIN_API_VERSION` | Versão da Admin API (ex: `2026-04`) | ✅ |

## Clerk (Autenticação)

| Variável | Descrição | Obrigatória |
|---------|-----------|:-----------:|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Chave pública do Clerk (`pk_...`) | ✅ |
| `CLERK_SECRET_KEY` | Chave secreta do Clerk (`sk_...`) | ✅ |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | URL da página de login | ✅ |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | URL da página de registo | ✅ |
| `CLERK_WEBHOOK_SECRET` | Secret para validar webhooks Clerk (`whsec_...`) | ✅ |

## Stripe (Pagamentos)

| Variável | Descrição | Obrigatória |
|---------|-----------|:-----------:|
| `STRIPE_SECRET_KEY` | Chave secreta Stripe (`sk_test_...` / `sk_live_...`) | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Chave pública Stripe (`pk_test_...` / `pk_live_...`) | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Secret para validar webhooks Stripe (`whsec_...`) | ✅ |

## Base de Dados

| Variável | Descrição | Obrigatória |
|---------|-----------|:-----------:|
| `DATABASE_URL` | Connection string PostgreSQL | ✅ |

## App

| Variável | Descrição | Obrigatória |
|---------|-----------|:-----------:|
| `NEXT_PUBLIC_APP_URL` | URL base da app (ex: `http://localhost:3000`) | ✅ |
| `ADMIN_RETRY_SECRET` | Secret para endpoint de retry manual de pedidos | ✅ |

## Setup Local

1. Copiar `.env.example` para `.env.local`
2. Preencher todos os valores
3. **Nunca commitar `.env.local`** — está protegido no `.gitignore`
