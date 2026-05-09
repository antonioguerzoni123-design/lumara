# Skills — Lumara

Referência de todas as skills disponíveis no projeto. Skills são módulos que estendem as capacidades do agente com conhecimento especializado e fluxos de trabalho.

**Como invocar:** `/nome-da-skill` no prompt ou o agente as usa automaticamente quando detecta o contexto adequado.

---

## Workflow & Processo

| Skill | Quando usar |
|-------|-------------|
| `superpowers:brainstorming` | **Obrigatória** antes de qualquer trabalho criativo — criar features, componentes ou modificar comportamento. Explora intenção, requisitos e design antes da implementação. |
| `superpowers:writing-plans` | Ao ter spec ou requisitos para uma tarefa de múltiplos passos, antes de tocar o código. |
| `superpowers:executing-plans` | Ao executar um plano de implementação escrito em sessão separada, com checkpoints de revisão. |
| `superpowers:verification-before-completion` | Antes de declarar trabalho como concluído, fixado ou passando — exige rodar comandos de verificação e confirmar output antes de qualquer afirmação de sucesso. |
| `superpowers:finishing-a-development-branch` | Quando a implementação está completa e todos os testes passam — guia as opções de integração (merge, PR, cleanup). |
| `superpowers:systematic-debugging` | Ao encontrar qualquer bug, falha de teste ou comportamento inesperado, antes de propor correções. |
| `superpowers:test-driven-development` | Ao implementar qualquer feature ou bugfix, antes de escrever o código de implementação. |
| `superpowers:using-superpowers` | No início de conversas — estabelece como encontrar e usar skills. |

---

## Colaboração & Revisão

| Skill | Quando usar |
|-------|-------------|
| `superpowers:requesting-code-review` | Ao concluir tarefas, implementar features maiores ou antes de fazer merge para verificar o trabalho. |
| `superpowers:receiving-code-review` | Ao receber feedback de code review, antes de implementar sugestões — especialmente se o feedback parecer pouco claro ou tecnicamente questionável. |
| `superpowers:dispatching-parallel-agents` | Ao enfrentar 2+ tarefas independentes que podem ser trabalhadas sem estado compartilhado ou dependências sequenciais. |
| `superpowers:using-git-worktrees` | Ao iniciar trabalho em feature que precisa de isolamento do workspace atual ou antes de executar planos de implementação. |
| `superpowers:subagent-driven-development` | Ao executar planos de implementação com tarefas independentes na sessão atual. |
| `superpowers:writing-skills` | Ao criar novas skills, editar skills existentes ou verificar se funcionam antes do deploy. |

---

## Frontend & UI

| Skill | Quando usar |
|-------|-------------|
| `frontend-design:frontend-design` | Design de interfaces frontend — layout, componentes visuais, UX patterns. |
| `vercel:shadcn` | shadcn/ui — CLI, instalação de componentes, padrões de composição, registries customizados, theming, integração com Tailwind CSS. |
| `vercel:nextjs` | Next.js App Router — routing, Server Components, Server Actions, layouts, middleware, data fetching, estratégias de rendering. |
| `vercel:react-best-practices` | Boas práticas de React e Next.js do time de Engenharia da Vercel — padrões de performance, evitar waterfalls, otimização de bundle. |
| `ui-ux-pro-max` | Design intelligence para web e mobile — 50+ estilos, 161 paletas, 57 pares de fontes, 99 diretrizes UX, 25 tipos de charts. |
| `web-design-guidelines` | Revisar código de UI para conformidade com diretrizes — acessibilidade, design, auditoria de UX. |
| `3d-web-experience` | Experiências 3D na web — Three.js, React Three Fiber, Spline, WebGL, cenas interativas 3D. |

---

## Vercel & Deploy

| Skill | Quando usar |
|-------|-------------|
| `vercel:deploy` | Deploy do projeto na Vercel. Passar `prod` para produção, padrão é preview. |
| `vercel:env` | Gerenciar variáveis de ambiente da Vercel — list, pull, add, remove, diff. |
| `vercel:env-vars` | Especialista em env vars — arquivos .env, comandos `vercel env`, tokens OIDC, configuração por ambiente. |
| `vercel:bootstrap` | Bootstrap de repo com recursos Vercel — preflight checks, provisionar integrações, verificar env keys. |
| `vercel:status` | Status do projeto Vercel — deployments recentes, info do projeto vinculado, visão geral de ambiente. |
| `vercel:marketplace` | Descobrir e instalar integrações do Vercel Marketplace — databases, CMS, auth providers, outros serviços. |
| `vercel:deployments-cicd` | Deploy e CI/CD — promoção, rollback, inspeção de deployments, build com `--prebuilt`, configuração de CI. |
| `vercel:turbopack` | Turbopack — configuração do bundler Next.js, otimizar HMR, debug de builds, diferenças Turbopack vs Webpack. |
| `vercel:vercel-cli` | CLI da Vercel — comandos, flags, configuração local. |
| `vercel:vercel-functions` | Vercel Functions — Fluid Compute, runtimes (Node.js, Python, Bun, Rust), configuração de timeout. |
| `vercel:routing-middleware` | Routing Middleware — produto agnóstico de framework da Vercel, não apenas middleware do Next.js. |
| `vercel:runtime-cache` | Cache em runtime — estratégias de cache, revalidação, ISR. |
| `vercel:next-cache-components` | Cache Components do Next.js — padrões avançados de cache no App Router. |
| `vercel:next-forge` | next-forge — monorepo Turborepo para SaaS production-grade da Vercel, scaffolding com `npx next-forge init`. |
| `vercel:next-upgrade` | Upgrade do Next.js — migração entre versões, breaking changes, codemods. |
| `vercel:verification` | Verificação de deployments e domínios na Vercel. |
| `vercel:vercel-firewall` | Vercel Firewall — DDoS mitigation, WAF (regras customizadas, IP blocking, rate limiting), Attack Mode, bot management. |
| `vercel:knowledge-update` | Atualizações de conhecimento da plataforma Vercel — correções de informações desatualizadas. |

---

## AI & SDK

| Skill | Quando usar |
|-------|-------------|
| `vercel:ai-sdk` | Vercel AI SDK — streaming, tool calling, providers, padrões de geração de texto e UI. |
| `vercel:ai-gateway` | Vercel AI Gateway — roteamento de modelos, fallback entre providers, observabilidade, zero data retention. |
| `vercel:chat-sdk` | Chat SDK da Vercel — construção de interfaces de chat com AI. |
| `vercel:workflow` | Vercel Workflow DevKit (WDK) — workflows duráveis, pause/resume, retries, execução baseada em steps. |
| `vercel:vercel-agent` | Vercel Agent — code review com AI, investigação de incidentes, instalação de SDK. |
| `vercel:vercel-sandbox` | Vercel Sandbox — microVMs Firecracker efêmeras para executar código não confiável com segurança. |
| `claude-api` | Anthropic SDK / Claude API — construção e debug de apps, prompt caching, tool use, modelos (Opus/Sonnet/Haiku). |

---

## Auth & Storage

| Skill | Quando usar |
|-------|-------------|
| `vercel:auth` | Autenticação — padrões de auth na Vercel, integração com providers, sessions. |
| `vercel:vercel-storage` | Vercel Storage — Blob (público e privado), databases via Marketplace. |

---

## Backend & Database

| Skill | Quando usar |
|-------|-------------|
| `supabase-postgres-best-practices` | Otimização de performance Postgres e boas práticas do Supabase — queries, schema design, RLS, indexes. |
| `stripe-best-practices` | Decisões de integração Stripe — Checkout Sessions vs PaymentIntents, Connect platform, Accounts v2. |
| `stripe-projects` | Configuração de novo app com Stripe Projects, provisionamento de stack, bootstrapping do Projects CLI. |
| `upgrade-stripe` | Guia para upgrade de versões da API e SDK do Stripe. |
| `vercel:react-best-practices` | 40+ regras de otimização de performance React/Next.js da Vercel Engineering — waterfalls, bundle size, patterns avançados. |

---

## Ferramentas de Projeto

| Skill | Quando usar |
|-------|-------------|
| `find-skills` | Descobrir e instalar skills do ecossistema de agent skills — buscar por `npx skills find [query]`. |
| `mcp-builder` | Criar servidores MCP (Model Context Protocol) de alta qualidade — Python (FastMCP) ou Node/TypeScript (MCP SDK). |
| `update-config` | Configurar o harness do Claude Code via settings.json — hooks, permissões, env vars. |
| `simplify` | Revisar código alterado para reuso, qualidade e eficiência, corrigindo problemas encontrados. |
| `fewer-permission-prompts` | Reduzir prompts de permissão adicionando allowlist ao settings.json do projeto. |
| `schedule` | Criar, atualizar e listar agentes remotos agendados (rotinas) que executam em schedule cron. |
| `loop` | Executar um prompt ou comando em intervalo recorrente. |

---

## Plugins Instalados no Projeto

Instalados via `installed_plugins.json` (project-scope):

| Plugin | Escopo |
|--------|--------|
| `vercel` | user |
| `superpowers` | user |
| `frontend-design` | user |
| `context7` | project |
| `code-review` | project |
| `code-simplifier` | project |
| `github` | project |
| `skill-creator` | project |
| `playwright` | project |

---

## Adicionar novas skills

Para descobrir e instalar novas skills:

```bash
# Buscar uma skill
npx skills find <nome>

# Instalar no projeto (local)
npx skills add <owner/repo@skill> -y

# Instalar globalmente
npx skills add <owner/repo@skill> -g -y
```

Explore o catálogo completo em: **https://skills.sh/**

### Skills locais do projeto

Skills instaladas em `.agents/skills/` (disponíveis neste projeto):

```
.agents/skills/
├── 3d-web-experience/       via sickn33/antigravity-awesome-skills
├── mcp-builder/             copiada do projeto base
├── shadcn/                  copiada do projeto base
├── stripe-best-practices/   copiada do projeto base
├── stripe-projects/         escrita localmente
├── supabase-postgres-best-practices/  copiada do projeto base
├── ui-ux-pro-max/           copiada do projeto base
├── upgrade-stripe/          escrita localmente
└── web-design-guidelines/   escrita localmente
```
