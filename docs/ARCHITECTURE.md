# Arquitetura — Lumara

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilos | Tailwind CSS 4 |
| Autenticação | Clerk |
| Pagamentos | Stripe |
| Catálogo | Shopify (Storefront + Admin API) |
| Base de dados | PostgreSQL via Prisma |
| Email | Resend |
| Webhooks | Svix |
| Estado global | Zustand |
| Validação | Zod |
| Animações | Framer Motion |
| 3D | Three.js + React Three Fiber |
| Deploy | Vercel |

## Estrutura de Pastas

```
lumara-BACKUP/
├── app/                  Next.js App Router (rotas, layouts, API handlers)
├── components/           Componentes React reutilizáveis
│   ├── 3d/               Componentes 3D (Three.js)
│   ├── account/          Componentes de conta do utilizador
│   ├── layout/           Navbar, Footer e estrutura global
│   ├── sections/         Secções da homepage
│   └── ui/               Componentes de UI genéricos
├── data/                 Dados estáticos (bundles, preferências)
├── hooks/                React hooks personalizados
├── lib/                  Integrações, clientes e helpers
├── prisma/               Schema e migrações da base de dados
├── public/               Assets públicos (imagens, ícones)
├── store/                Estado global (Zustand stores)
├── types/                Tipos TypeScript globais
├── config/               Configurações estáticas do projeto
├── content/              Textos, copywriting e conteúdo legal
├── scripts/              Scripts utilitários
├── tests/                Testes (unit, integration, e2e)
├── docs/                 Documentação
└── .agents/              Instruções e skills para agentes de IA
```

## Rotas Principais (App Router)

### Páginas públicas
- `/` — Homepage
- `/loja` — Listagem de produtos
- `/produto/[slug]` — Página de produto
- `/bundles/[slug]` — Bundles / kits
- `/promocoes` — Promoções
- `/rituais` — Rituais de beleza
- `/sobre-nos` — Sobre a marca
- `/faq` — Perguntas frequentes
- `/apoio` — Apoio ao cliente

### Área de conta (protegida por Clerk)
- `/conta` — Dashboard da conta
- `/conta/encomendas` — Histórico de encomendas
- `/conta/favoritos` — Produtos favoritos
- `/conta/moradas` — Endereços
- `/conta/preferencias` — Preferências

### Checkout
- `/checkout/sucesso` — Pagamento confirmado
- `/checkout/cancelado` — Pagamento cancelado

### API Routes
- `/api/checkout/create-session` — Criar sessão Stripe
- `/api/checkout/status` — Verificar estado do checkout
- `/api/webhooks/stripe` — Webhook Stripe
- `/api/webhooks/clerk` — Webhook Clerk
- `/api/account/*` — Gestão de conta
- `/api/favorites/*` — Favoritos
- `/api/support` — Suporte

## Middleware

`proxy.ts` na raiz gere autenticação via `clerkMiddleware` do Clerk.  
Rotas públicas estão explicitamente definidas; as restantes exigem sessão ativa.

## Base de dados

PostgreSQL gerido pelo Prisma. Modelos existentes:
- `CheckoutSession` — sessões de checkout
- `WebhookEvent` — eventos de webhook processados

## TODO: Expandir esta documentação

- [ ] Diagrama de arquitetura
- [ ] Fluxo de checkout detalhado
- [ ] Relações entre modelos Prisma
- [ ] Integrações externas (DSers, analytics)
