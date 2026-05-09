# Lumara

Loja online de beleza feminina para Portugal.  
Construída em Next.js 16 com App Router, TypeScript, Tailwind CSS, Shopify, Stripe e Clerk.

## Stack

| Tecnologia | Uso |
|-----------|-----|
| Next.js 16 | Framework (App Router) |
| TypeScript | Linguagem |
| Tailwind CSS 4 | Estilos |
| Shopify | Catálogo de produtos |
| Stripe | Pagamentos |
| Clerk | Autenticação |
| PostgreSQL + Prisma | Base de dados |
| Zustand | Estado global |
| Resend | Email transacional |
| Vercel | Deploy |

## Instalar e Correr

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com os valores corretos

# Correr em desenvolvimento
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev       # Desenvolvimento
npm run build     # Build de produção (inclui prisma generate + migrate)
npm run start     # Produção
npm run lint      # Verificar código
```

## Estrutura de Pastas

```
├── app/            Rotas Next.js (páginas, layouts, API handlers)
├── components/     Componentes React reutilizáveis
├── lib/            Integrações e helpers (Shopify, Stripe, Prisma)
├── hooks/          React hooks personalizados
├── store/          Estado global (Zustand)
├── types/          Tipos TypeScript globais
├── config/         Configurações estáticas
├── content/        Textos e copywriting
├── data/           Dados estáticos (bundles, preferências)
├── prisma/         Schema e migrações da base de dados
├── public/         Assets públicos
├── scripts/        Scripts utilitários
├── tests/          Testes
├── docs/           Documentação
└── .agents/        Instruções para agentes de IA
```

## Variáveis de Ambiente

Ver [docs/ENVIRONMENT_VARIABLES.md](docs/ENVIRONMENT_VARIABLES.md) para a lista completa.  
Nunca commitar `.env.local`.

## Documentação

Ver pasta [docs/](docs/) para documentação técnica e de produto.

## Para Agentes de IA

Ver [AGENTS.md](AGENTS.md) para instruções e regras de comportamento.  
Ver [.agents/](.agents/) para skills e workflows disponíveis.
