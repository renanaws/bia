# Task 003 — fix — Remover cards Ambiente e Cache da tela /versao

## Modelo de Trabalho

- **Branch:** `003-fix-remover-ambiente-cache-tela-versao`
- **Derivado de:** `ia-main`
- **Agente responsável:** `dev`

### Instruções de início para o agente

1. Verificar se está no branch `ia-main`. Caso contrário, informar e perguntar se pode retornar a ele antes de iniciar.
2. Após autorizado: mover este arquivo para `doing/`, fazer commit e push no branch `ia-main`.
3. Criar o branch `003-fix-remover-ambiente-cache-tela-versao` a partir de `ia-main` e iniciar a implementação.

---

## Descrição

Na tela `/versao` (componente `Versao.jsx`), ao clicar em "Informações da API", são exibidos três cards:
- Versão da Aplicação ✅ (manter)
- Ambiente ❌ (remover)
- Cache ❌ (remover)

O objetivo é remover os cards de **Ambiente** e **Cache**, deixando apenas o card **Versão da Aplicação** com suas informações (Versão, Status da API e Última verificação).

---

## Critérios de Aceite

- [ ] O card **Ambiente** não deve mais aparecer na tela `/versao`
- [ ] O card **Cache** não deve mais aparecer na tela `/versao`
- [ ] O card **Versão da Aplicação** deve continuar exibindo: Versão, Status da API e Última verificação
- [ ] Os botões de ação (Atualizar e /api/versao) devem continuar funcionando
- [ ] Não deve haver erros no console do browser após a alteração
- [ ] Imports e funções que se tornarem órfãs após a remoção devem ser limpos do arquivo

---

## Arquivos Envolvidos

| Arquivo | Tipo de alteração |
|---|---|
| `client/src/components/Versao.jsx` | Remover JSX dos cards Ambiente e Cache, limpar imports/funções não utilizados |

---

## Contexto Técnico

No `Versao.jsx` atual:

- **Card Ambiente:** usa a função `getEnvironmentInfo()` e variável `envInfo` — devem ser removidos junto com o card
- **Card Cache:** usa o estado `cacheConfig` e a chamada `fetch` para `/api/cache-config` — devem ser removidos junto com o card
- **Imports a remover** (caso não sejam mais usados após a limpeza): `FaHome`, `FaGlobe`, `FaLock`, `FaQuestionCircle`, `FaBalanceScale`, `FaBolt`, `FaDatabase`

---

## Observações

- Manter o código limpo: remover tudo que for órfão após a alteração (funções, estados, imports)
- Não alterar outros componentes, apenas `Versao.jsx`
- A API `/api/cache-config` pode continuar existindo no backend — apenas a exibição no frontend deve ser removida
