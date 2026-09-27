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

## Checklist de Atividades

### DEV
- [x] Mover este arquivo para `doing/`, commitar e fazer push no `ia-main`
- [x] Criar branch `003-fix-remover-ambiente-cache-tela-versao` a partir de `ia-main`
- [x] Remover o card **Ambiente** do JSX do `Versao.jsx`
- [x] Remover o card **Cache** do JSX do `Versao.jsx`
- [x] Remover a função `getEnvironmentInfo()` e a variável `envInfo`
- [x] Remover o estado `cacheConfig` e o `setCacheConfig`
- [x] Remover o fetch para `/api/cache-config` dentro de `checkApiHealth`
- [x] Limpar imports não utilizados: `FaHome`, `FaGlobe`, `FaLock`, `FaQuestionCircle`, `FaBalanceScale`, `FaBolt`, `FaDatabase`
- [x] Rebuild da aplicação (`docker compose build`)
- [x] Validar que `/api/versao` responde corretamente após o rebuild
- [x] Commitar e fazer push do branch `003-fix-remover-ambiente-cache-tela-versao`
- [ ] Informar ao PO que a task está pronta para encerramento

### QA
- [ ] Acessar a tela `/versao` e confirmar que o card **Ambiente** não aparece
- [ ] Acessar a tela `/versao` e confirmar que o card **Cache** não aparece
- [ ] Confirmar que o card **Versão da Aplicação** exibe: Versão, Status da API e Última verificação
- [ ] Confirmar que o botão **Atualizar** funciona corretamente
- [ ] Confirmar que o botão **/api/versao** abre o endpoint em nova aba
- [ ] Verificar no console do browser que não há erros após a alteração
- [ ] Informar ao PO que a validação foi concluída

### PO — Encerramento
- [ ] Verificar se todos os itens do checklist estão marcados
- [ ] Confirmar com o usuário que a entrega está aprovada
- [ ] Mover este arquivo para `done/`
- [ ] Fazer commit e push final no `ia-main`

---

## Critérios de Aceite

- [x] O card **Ambiente** não deve mais aparecer na tela `/versao`
- [x] O card **Cache** não deve mais aparecer na tela `/versao`
- [x] O card **Versão da Aplicação** deve continuar exibindo: Versão, Status da API e Última verificação
- [x] Os botões de ação (Atualizar e /api/versao) devem continuar funcionando
- [ ] Não deve haver erros no console do browser após a alteração
- [x] Imports e funções que se tornarem órfãs após a remoção devem ser limpos do arquivo

---

## Arquivos Envolvidos

| Arquivo | Tipo de alteração |
|---|---|
| `client/src/components/Versao.jsx` | Remover JSX dos cards Ambiente e Cache, limpar imports/funções não utilizados |

---

## Contexto Técnico

No `Versao.jsx` original:

- **Card Ambiente:** usava a função `getEnvironmentInfo()` e variável `envInfo` — removidos
- **Card Cache:** usava o estado `cacheConfig` e a chamada `fetch` para `/api/cache-config` — removidos
- **Imports removidos:** `FaHome`, `FaGlobe`, `FaLock`, `FaQuestionCircle`, `FaBalanceScale`, `FaBolt`, `FaDatabase`

---

## Observações

- Manter o código limpo: remover tudo que for órfão após a alteração (funções, estados, imports)
- Não alterar outros componentes, apenas `Versao.jsx`
- A API `/api/cache-config` pode continuar existindo no backend — apenas a exibição no frontend foi removida
