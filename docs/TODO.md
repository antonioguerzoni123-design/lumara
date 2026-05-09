# TODO — Lumara

Lista de pendentes técnicos e de produto. Atualizar regularmente.

## Crítico (bloqueante)

- [ ] Implementar todos os `route.ts` em `app/api/` (todos vazios atualmente)
- [ ] Implementar todas as páginas em rotas portuguesas (`app/loja/page.tsx`, etc.)
- [ ] Configurar variáveis de ambiente no Vercel
- [ ] Testar webhook Stripe em produção
- [ ] Testar webhook Clerk em produção

## Alta Prioridade

- [ ] Implementar página `/loja` (listagem de produtos)
- [ ] Implementar página `/produto/[slug]` (produto individual)
- [ ] Implementar fluxo de checkout completo (Stripe → Shopify)
- [ ] Implementar área de conta (`/conta/*`)
- [ ] Implementar sistema de favoritos
- [ ] Configurar Prisma em produção (migrações automáticas no build)

## Média Prioridade

- [ ] Implementar página `/bundles/[slug]`
- [ ] Implementar página `/rituais`
- [ ] Implementar página `/promocoes`
- [ ] Implementar página `/faq`
- [ ] Implementar página `/apoio`
- [ ] Implementar página `/sobre-nos`
- [ ] Adicionar testes (unit, integration, e2e)
- [ ] Converter ficheiros `.js` em `hooks/` e `lib/` para `.ts`
- [ ] Reorganizar `lib/` em subdirectórios (shopify/, stripe/, clerk/)

## Baixa Prioridade / Futuro

- [ ] Integração DSers (dropshipping)
- [ ] Analytics e marketing automations
- [ ] Sistema de reviews de produtos
- [ ] Newsletter integration
- [ ] SEO avançado (sitemap, structured data)
- [ ] Internacionalização (PT/EN)
- [ ] Dark mode
- [ ] PWA

## Infraestrutura

- [ ] Configurar CI/CD
- [ ] Configurar monitoring (Sentry ou similar)
- [ ] Configurar rate limiting nas API routes
- [ ] Auditoria de segurança
- [ ] Configurar backups da base de dados

## Documentação

- [ ] Completar docs/ARCHITECTURE.md com diagramas
- [ ] Criar docs/BRAND.md
- [ ] Criar docs/DESIGN_SYSTEM.md
- [ ] Criar docs/SHOPIFY.md
- [ ] Criar docs/STRIPE.md
- [ ] Criar docs/AUTH_CLERK.md
- [ ] Criar docs/DATABASE.md
- [ ] Criar docs/DEPLOYMENT.md
