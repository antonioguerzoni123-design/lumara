# Testes — Lumara

Estrutura de testes do projeto. Ainda não implementados.

## Estrutura

```
tests/
├── unit/           Testes unitários (funções, helpers, utils)
├── integration/    Testes de integração (API routes, Stripe, Shopify)
└── e2e/            Testes end-to-end (fluxos completos de utilizador)
```

## TODO

- [ ] Escolher framework de testes (Jest, Vitest, Playwright)
- [ ] Configurar testes unitários para `lib/`
- [ ] Configurar testes de integração para `app/api/`
- [ ] Configurar testes e2e para fluxo de checkout
- [ ] Adicionar CI com execução automática de testes
