# Workflow: Rever Código

## O que verificar

### Segurança
- [ ] Nenhum secret exposto no código
- [ ] Inputs de utilizador validados (Zod ou similar)
- [ ] Sem SQL injection, XSS ou outros vetores OWASP
- [ ] Assinaturas de webhooks verificadas (Stripe, Clerk)
- [ ] Rotas da API protegidas corretamente

### TypeScript
- [ ] Sem `any` desnecessário
- [ ] Tipos definidos em `types/`
- [ ] Sem erros de tipagem

### Next.js
- [ ] Componentes Server vs Client corretamente marcados
- [ ] Sem uso desnecessário de `'use client'`
- [ ] API routes com tratamento de erro adequado
- [ ] Imagens com `next/image`

### Qualidade
- [ ] Sem código duplicado
- [ ] Sem imports desnecessários
- [ ] Sem `console.log` em produção
- [ ] Lógica de API fora de componentes

### Performance
- [ ] Sem fetch desnecessário no client
- [ ] Dados de servidor carregados server-side
- [ ] Sem re-renders desnecessários

## Após a revisão

Reportar:
- Problemas críticos (segurança, bugs)
- Problemas médios (tipagem, qualidade)
- Sugestões (sem implementar sem autorização)
