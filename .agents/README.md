# .agents/ — Instruções para Agentes de IA

Esta pasta contém instruções, skills e workflows para agentes de IA que trabalhem no projeto Lumara.

## Estrutura

```
.agents/
├── README.md           Este ficheiro
├── skills/             Skills instaladas (cada uma com SKILL.md)
└── workflows/          Workflows de desenvolvimento
```

## Skills

Skills são capacidades especializadas que os agentes podem usar.  
Cada skill deve ter uma pasta própria com um `SKILL.md`.  
Skills com `MISSING_SKILL.md` estão vazias e precisam de ser reinstaladas.

Ver lista completa em `SKILLS.md` na raiz do projeto.

## Workflows

Processos padronizados para tarefas comuns:

| Workflow | Descrição |
|---------|-----------|
| [add-feature.md](workflows/add-feature.md) | Adicionar nova funcionalidade |
| [fix-bug.md](workflows/fix-bug.md) | Corrigir um bug |
| [review-code.md](workflows/review-code.md) | Rever código |
| [deploy-checklist.md](workflows/deploy-checklist.md) | Checklist de deploy |

## Regras Globais para Agentes

1. Ler os ficheiros relevantes antes de modificar qualquer coisa
2. Nunca apagar ficheiros sem permissão explícita
3. Nunca expor secrets ou conteúdo de `.env.local`
4. Verificar imports após mover ficheiros
5. Rodar lint/build após mudanças significativas
6. Reportar erros — nunca esconder
7. Ver `AGENTS.md` na raiz para regras completas
