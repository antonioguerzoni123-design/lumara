# Workflow: Corrigir um Bug

## Diagnóstico

1. Reproduzir o bug — perceber exatamente o que falha
2. Ler os ficheiros relevantes (não assumir o problema sem ler o código)
3. Verificar imports e dependências
4. Identificar a causa raiz (não apenas o sintoma)

## Processo

1. **Ler** — o ficheiro com o bug e os que o chamam
2. **Entender** — o fluxo completo antes de qualquer alteração
3. **Alterar** — a menor mudança possível que corrija o problema
4. **Verificar imports** — nenhum import deve ficar quebrado
5. **Testar** — rodar `npm run lint` e `npm run build`

## Regras

- Corrigir a causa raiz, não o sintoma
- Não fazer refactor enquanto corrige bugs (manter separado)
- Não alterar comportamento não relacionado com o bug
- Não esconder erros — reportar tudo

## Após corrigir

1. Explicar: qual era o bug, onde estava, o que foi alterado e por quê
2. Verificar lint: `npm run lint`
3. Verificar build: `npm run build`
