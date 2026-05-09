# Workflow: Checklist de Deploy

## Pré-deploy

### Código
- [ ] `npm run lint` passa sem erros
- [ ] `npm run build` passa sem erros
- [ ] Sem `console.log` de debug no código
- [ ] Sem ficheiros `.env.local` committados
- [ ] Sem secrets expostos no código

### Variáveis de Ambiente (Vercel)
- [ ] `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` configurada
- [ ] `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` configurada
- [ ] `SHOPIFY_ADMIN_ACCESS_TOKEN` configurada
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` configurada
- [ ] `CLERK_SECRET_KEY` configurada
- [ ] `CLERK_WEBHOOK_SECRET` configurada
- [ ] `STRIPE_SECRET_KEY` configurada
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` configurada
- [ ] `STRIPE_WEBHOOK_SECRET` configurada
- [ ] `DATABASE_URL` configurada
- [ ] `NEXT_PUBLIC_APP_URL` configurada (URL de produção)
- [ ] `ADMIN_RETRY_SECRET` configurada

### Serviços externos
- [ ] Webhooks Stripe configurados para URL de produção
- [ ] Webhooks Clerk configurados para URL de produção
- [ ] Base de dados migrada (`prisma migrate deploy`)
- [ ] Shopify Storefront API activa

## Deploy

1. Push para branch `main`
2. Vercel faz deploy automático
3. Verificar logs do deploy na dashboard Vercel

## Pós-deploy

- [ ] Testar fluxo de checkout completo
- [ ] Testar login/registo com Clerk
- [ ] Testar webhook Stripe (com Stripe CLI ou evento de teste)
- [ ] Verificar que rotas protegidas redirecionam corretamente
- [ ] Verificar que imagens carregam (CDN Shopify, Google Drive)
