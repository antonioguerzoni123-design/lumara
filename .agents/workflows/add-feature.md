# Workflow: Adicionar Nova Funcionalidade

## Antes de começar

1. Ler `AGENTS.md` na raiz
2. Ler `docs/ARCHITECTURE.md` para entender a estrutura
3. Ler os ficheiros relevantes à funcionalidade
4. Verificar se já existe código reutilizável em `lib/`, `hooks/`, `components/`
5. Verificar imports e dependências existentes

## Processo

1. **Planear** — listar ficheiros a criar/modificar e imports necessários
2. **Criar tipos** — adicionar em `types/` se necessário
3. **Criar lógica** — em `lib/` (integrações) ou `hooks/` (React)
4. **Criar componentes** — em `components/` organizados por categoria
5. **Criar rota** — em `app/` (página ou API route)
6. **Verificar imports** — nenhum import deve ficar quebrado
7. **Testar** — rodar `npm run lint` e `npm run build`

## Regras

- Não criar ficheiros desnecessários
- Não duplicar lógica existente
- Não misturar lógica de API dentro de componentes
- Não alterar checkout, webhooks ou autenticação sem necessidade clara
- Tipar tudo em TypeScript

## Após implementar

1. Verificar lint: `npm run lint`
2. Verificar build: `npm run build`
3. Reportar o que foi criado, modificado e por quê
